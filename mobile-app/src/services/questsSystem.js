/**
 * Quests System - Système de quêtes quotidiennes
 *
 * STRATÉGIE ANTI-DUOLINGO:
 * - Quêtes donnent des VIES gratuitement (pas de paywall)
 * - Récompenses généreuses (XP + vies)
 * - 3 quêtes variées par jour (engagement sans pression)
 * - Reset minuit (timezone user)
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  QUESTS_DATA: 'user_quests_data',
  QUESTS_LAST_RESET: 'quests_last_reset',
  QUESTS_STATS: 'quests_stats',
};

/**
 * Types de quêtes disponibles
 */
const QUEST_TYPES = {
  // Leçons
  COMPLETE_LESSONS: {
    id: 'complete_lessons',
    title: 'Apprendre du nouveau',
    description: 'Complète {target} leçons',
    icon: '📚',
    target: 3,
    reward: { xp: 50, lives: 1 },
    check: (progress) => progress.lessonsCompleted >= 3,
  },

  // SRS Reviews
  SRS_REVIEWS: {
    id: 'srs_reviews',
    title: 'Réviser et mémoriser',
    description: 'Révise {target} cartes SRS',
    icon: '🔄',
    target: 10,
    reward: { xp: 30 },
    check: (progress) => progress.srsReviews >= 10,
  },

  // Perfect exercises
  PERFECT_EXERCISES: {
    id: 'perfect_exercises',
    title: 'Maîtrise parfaite',
    description: 'Fais {target} exercices sans erreur',
    icon: '⭐',
    target: 5,
    reward: { xp: 100, lives: 2 },
    check: (progress) => progress.perfectExercises >= 5,
  },

  // Daily Challenge
  DAILY_CHALLENGE: {
    id: 'daily_challenge',
    title: 'Défi culturel',
    description: 'Complète le défi du jour',
    icon: '🎯',
    target: 1,
    reward: { xp: 20, lives: 1 },
    check: (progress) => progress.dailyChallengeCompleted,
  },

  // Streak maintenance
  MAINTAIN_STREAK: {
    id: 'maintain_streak',
    title: 'Régularité',
    description: 'Garde ton streak vivant aujourd\'hui',
    icon: '🔥',
    target: 1,
    reward: { xp: 25 },
    check: (progress) => progress.studiedToday,
  },
};

/**
 * Génère 3 quêtes quotidiennes (rotation variée)
 */
export const generateDailyQuests = () => {
  const today = new Date().toDateString();
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);

  // Rotation basée sur jour de l'année (cohérent pour tous les users)
  const questPool = Object.values(QUEST_TYPES);
  const selectedIndices = [
    dayOfYear % questPool.length,
    (dayOfYear + 2) % questPool.length,
    (dayOfYear + 4) % questPool.length,
  ];

  // S'assurer que les 3 quêtes sont différentes
  const uniqueIndices = [...new Set(selectedIndices)];
  while (uniqueIndices.length < 3) {
    const randomIndex = Math.floor(Math.random() * questPool.length);
    if (!uniqueIndices.includes(randomIndex)) {
      uniqueIndices.push(randomIndex);
    }
  }

  const dailyQuests = uniqueIndices.slice(0, 3).map((index, position) => ({
    ...questPool[index],
    position,
    completed: false,
    progress: 0,
    date: today,
  }));

  return dailyQuests;
};

/**
 * Récupère les quêtes du jour (génère si nouvelle journée)
 */
export const getDailyQuests = async () => {
  try {
    const today = new Date().toDateString();
    const data = await AsyncStorage.getItem(STORAGE_KEYS.QUESTS_DATA);

    if (data) {
      const questsData = JSON.parse(data);

      // Si même jour, retourner les quêtes existantes
      if (questsData.date === today) {
        return questsData.quests;
      }
    }

    // Nouvelle journée : générer nouvelles quêtes
    const newQuests = generateDailyQuests();
    await AsyncStorage.setItem(
      STORAGE_KEYS.QUESTS_DATA,
      JSON.stringify({
        date: today,
        quests: newQuests,
      })
    );

    return newQuests;
  } catch (error) {
    console.error('Error getting daily quests:', error);
    return generateDailyQuests();
  }
};

/**
 * Met à jour la progression d'une quête
 */
export const updateQuestProgress = async (questId, newProgress) => {
  try {
    const today = new Date().toDateString();
    const data = await AsyncStorage.getItem(STORAGE_KEYS.QUESTS_DATA);

    if (!data) return null;

    const questsData = JSON.parse(data);

    // Vérifier que c'est bien aujourd'hui
    if (questsData.date !== today) return null;

    // Mettre à jour la quête
    const updatedQuests = questsData.quests.map((quest) => {
      if (quest.id === questId) {
        const wasCompleted = quest.completed;
        const progress = Math.min(newProgress, quest.target);
        const completed = progress >= quest.target;

        return {
          ...quest,
          progress,
          completed,
          justCompleted: !wasCompleted && completed, // Pour animation
        };
      }
      return quest;
    });

    // Sauvegarder
    await AsyncStorage.setItem(
      STORAGE_KEYS.QUESTS_DATA,
      JSON.stringify({
        date: today,
        quests: updatedQuests,
      })
    );

    // Si quête vient d'être complétée, incrémenter stats
    const justCompleted = updatedQuests.find((q) => q.id === questId && q.justCompleted);
    if (justCompleted) {
      await incrementQuestStats();
      return {
        quests: updatedQuests,
        reward: justCompleted.reward,
        questTitle: justCompleted.title,
      };
    }

    return { quests: updatedQuests };
  } catch (error) {
    console.error('Error updating quest progress:', error);
    return null;
  }
};

/**
 * Incrémente la progression basée sur type d'action
 */
export const incrementQuestProgress = async (actionType, amount = 1) => {
  try {
    const quests = await getDailyQuests();

    // Mapping action → quest ID
    const actionToQuestMap = {
      lesson_completed: 'complete_lessons',
      srs_review: 'srs_reviews',
      perfect_exercise: 'perfect_exercises',
      daily_challenge: 'daily_challenge',
      studied_today: 'maintain_streak',
    };

    const questId = actionToQuestMap[actionType];
    if (!questId) return null;

    const quest = quests.find((q) => q.id === questId);
    if (!quest || quest.completed) return null;

    const newProgress = quest.progress + amount;
    return await updateQuestProgress(questId, newProgress);
  } catch (error) {
    console.error('Error incrementing quest progress:', error);
    return null;
  }
};

/**
 * Vérifie si toutes les quêtes du jour sont complétées
 */
export const areAllQuestsCompleted = async () => {
  try {
    const quests = await getDailyQuests();
    return quests.every((quest) => quest.completed);
  } catch (error) {
    console.error('Error checking all quests:', error);
    return false;
  }
};

/**
 * Récupère les stats globales des quêtes
 */
export const getQuestStats = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.QUESTS_STATS);

    if (!data) {
      return {
        totalQuestsCompleted: 0,
        perfectDays: 0, // Jours avec 3/3 quêtes
        currentStreak: 0,
        bestStreak: 0,
      };
    }

    return JSON.parse(data);
  } catch (error) {
    console.error('Error getting quest stats:', error);
    return {
      totalQuestsCompleted: 0,
      perfectDays: 0,
      currentStreak: 0,
      bestStreak: 0,
    };
  }
};

/**
 * Incrémente les stats de quêtes
 */
const incrementQuestStats = async () => {
  try {
    const stats = await getQuestStats();
    const allCompleted = await areAllQuestsCompleted();

    const newStats = {
      totalQuestsCompleted: stats.totalQuestsCompleted + 1,
      perfectDays: allCompleted ? stats.perfectDays + 1 : stats.perfectDays,
      currentStreak: stats.currentStreak,
      bestStreak: stats.bestStreak,
    };

    await AsyncStorage.setItem(STORAGE_KEYS.QUESTS_STATS, JSON.stringify(newStats));

    return newStats;
  } catch (error) {
    console.error('Error incrementing quest stats:', error);
  }
};

/**
 * Récupère la progression actuelle pour check
 * (Appelé par les écrans pour update en temps réel)
 */
export const getCurrentProgress = async () => {
  try {
    // Ces données viendront d'autres services (exerciseService, srsSystem, etc.)
    // Pour l'instant, on retourne un objet vide qui sera rempli par les écrans
    return {
      lessonsCompleted: 0,
      srsReviews: 0,
      perfectExercises: 0,
      dailyChallengeCompleted: false,
      studiedToday: false,
    };
  } catch (error) {
    console.error('Error getting current progress:', error);
    return {};
  }
};

/**
 * Reset les quêtes (pour debug)
 */
export const resetQuests = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.QUESTS_DATA);
    await AsyncStorage.removeItem(STORAGE_KEYS.QUESTS_STATS);
    console.log('✅ Quests reset');
  } catch (error) {
    console.error('Error resetting quests:', error);
  }
};

export default {
  generateDailyQuests,
  getDailyQuests,
  updateQuestProgress,
  incrementQuestProgress,
  areAllQuestsCompleted,
  getQuestStats,
  getCurrentProgress,
  resetQuests,
};
