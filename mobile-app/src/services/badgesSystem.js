/**
 * Badges System - Système d'achievements et badges
 *
 * IMPACT RETENTION: Les badges donnent un sentiment d'accomplissement
 * et encouragent les utilisateurs à continuer pour débloquer plus
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import haptic from './hapticService';

const STORAGE_KEYS = {
  BADGES_UNLOCKED: 'badges_unlocked',
  BADGES_STATS: 'badges_stats',
  BADGES_LAST_CHECK: 'badges_last_check',
};

/**
 * Configuration des badges disponibles
 * Organisés par catégorie pour faciliter l'affichage
 */
/**
 * BADGES - Système d'achievements focalisé sur la maîtrise réelle
 *
 * 12 badges essentiels orientés apprentissage :
 * - Progression (leçons complétées)
 * - Maîtrise (syllabaires, kanji)
 * - Constance (streaks raisonnables)
 * - Précision (exercices parfaits)
 * - Mémorisation (SRS long terme)
 */
export const BADGES = {
  // === PROGRESSION (Voie du Ninja) ===
  FIRST_STEP: {
    id: 'first_step',
    name: 'Éveil du Chakra',
    description: 'Complète ta première leçon',
    icon: '🌸',
    category: 'progression',
    condition: (stats) => stats.lessonsCompleted >= 1,
    reward: { xp: 50 },
    rarity: 'common',
  },
  LESSON_MASTER: {
    id: 'lesson_master',
    name: 'Maîtrise du Jutsu',
    description: 'Complète 25 leçons',
    icon: '🥷',
    category: 'progression',
    condition: (stats) => stats.lessonsCompleted >= 25,
    reward: { xp: 300, lives: 1 },
    rarity: 'rare',
  },
  SCHOLAR: {
    id: 'scholar',
    name: 'Sage du Mont Myōboku',
    description: 'Complète toutes les leçons (47)',
    icon: '🐸',
    category: 'progression',
    condition: (stats) => stats.lessonsCompleted >= 47,
    reward: { xp: 1000, lives: 3 },
    rarity: 'legendary',
  },

  // === CONSTANCE (Flamme) ===
  WEEK_WARRIOR: {
    id: 'week_warrior',
    name: 'Volonté du Feu',
    description: '7 jours de flamme',
    icon: '🔥',
    category: 'streak',
    condition: (stats) => stats.currentStreak >= 7,
    reward: { xp: 100, lives: 1 },
    rarity: 'common',
  },
  MONTH_MASTER: {
    id: 'month_master',
    name: 'Détermination de Rock Lee',
    description: '30 jours de flamme',
    icon: '💪',
    category: 'streak',
    condition: (stats) => stats.currentStreak >= 30,
    reward: { xp: 500, lives: 2 },
    rarity: 'rare',
  },

  // === PRÉCISION (Entraînement) ===
  CENTURION: {
    id: 'centurion',
    name: 'Cent Batailles',
    description: 'Complète 100 exercices',
    icon: '💯',
    category: 'exercises',
    condition: (stats) => stats.exercisesCompleted >= 100,
    reward: { xp: 200 },
    rarity: 'common',
  },
  PERFECTIONIST: {
    id: 'perfectionist',
    name: 'Sharingan Éveillé',
    description: '10 exercices parfaits de suite',
    icon: '👁️',
    category: 'exercises',
    condition: (stats) => stats.perfectStreak >= 10,
    reward: { xp: 150, lives: 1 },
    rarity: 'uncommon',
  },

  // === MÉMORISATION (SRS) ===
  SRS_BEGINNER: {
    id: 'srs_beginner',
    name: 'Clone de l\'Ombre',
    description: 'Révise 50 cartes',
    icon: '👥',
    category: 'srs',
    condition: (stats) => stats.srsReviews >= 50,
    reward: { xp: 100 },
    rarity: 'common',
  },
  MEMORY_PALACE: {
    id: 'memory_palace',
    name: 'Temple Shaolin',
    description: '50 cartes en statut "mature"',
    icon: '🏯',
    category: 'srs',
    condition: (stats) => stats.matureCards >= 50,
    reward: { xp: 500, lives: 2 },
    rarity: 'rare',
  },

  // === MAÎTRISE (Syllabaires & Kanji) ===
  HIRAGANA_MASTER: {
    id: 'hiragana_master',
    name: 'Calligraphe Hiragana',
    description: 'Complète toutes les leçons Hiragana',
    icon: 'あ',
    category: 'mastery',
    condition: (stats) => stats.hiraganaLessonsCompleted >= 10,
    reward: { xp: 300, lives: 1 },
    rarity: 'rare',
  },
  KATAKANA_MASTER: {
    id: 'katakana_master',
    name: 'Calligraphe Katakana',
    description: 'Complète toutes les leçons Katakana',
    icon: 'ア',
    category: 'mastery',
    condition: (stats) => stats.katakanaLessonsCompleted >= 10,
    reward: { xp: 300, lives: 1 },
    rarity: 'rare',
  },
  KANJI_MASTER: {
    id: 'kanji_master',
    name: 'Rinnegan des Kanji',
    description: 'Apprends 100 kanji (N5 complet)',
    icon: '👁️‍🗨️',
    category: 'mastery',
    condition: (stats) => stats.kanjiLearned >= 100,
    reward: { xp: 1000, lives: 3 },
    rarity: 'legendary',
  },
};

/**
 * Catégories de badges pour l'affichage - Thème Ninja
 * Simplifié : 5 catégories focalisées sur la maîtrise
 */
export const BADGE_CATEGORIES = {
  progression: { name: 'Voie du Ninja', icon: '🥷' },
  streak: { name: 'Constance', icon: '🔥' },
  exercises: { name: 'Précision', icon: '⚔️' },
  srs: { name: 'Mémorisation', icon: '🌀' },
  mastery: { name: 'Maîtrise', icon: '🖌️' },
};

/**
 * Couleurs par rareté
 */
export const RARITY_COLORS = {
  common: '#9CA3AF',      // Gris
  uncommon: '#22C55E',    // Vert
  rare: '#3B82F6',        // Bleu
  legendary: '#A855F7',   // Violet
  mythic: '#F59E0B',      // Or
};

/**
 * Récupère tous les badges débloqués
 */
export const getUnlockedBadges = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.BADGES_UNLOCKED);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting unlocked badges:', error);
    return [];
  }
};

/**
 * Sauvegarde les badges débloqués
 */
const saveUnlockedBadges = async (badges) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.BADGES_UNLOCKED, JSON.stringify(badges));
  } catch (error) {
    console.error('Error saving unlocked badges:', error);
  }
};

/**
 * Récupère les stats pour le système de badges
 */
export const getBadgeStats = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.BADGES_STATS);
    return data ? JSON.parse(data) : getDefaultStats();
  } catch (error) {
    console.error('Error getting badge stats:', error);
    return getDefaultStats();
  }
};

/**
 * Stats par défaut
 */
const getDefaultStats = () => ({
  // Progression
  lessonsCompleted: 0,
  hiraganaLessonsCompleted: 0,
  katakanaLessonsCompleted: 0,
  vocabularyLessonsCompleted: 0,
  kanjiLessonsCompleted: 0,

  // Exercices
  exercisesCompleted: 0,
  perfectStreak: 0,
  bestPerfectStreak: 0,

  // SRS
  srsReviews: 0,
  matureCards: 0,
  kanjiLearned: 0,

  // Streak
  currentStreak: 0,
  highestStreak: 0,

  // Quêtes
  questsCompleted: 0,
  perfectDays: 0,

  // Culture
  dailyChallengesCompleted: 0,

  // Spécial
  earlyBirdSessions: 0,
  nightOwlSessions: 0,
  comebacks: 0,

  // Meta
  lastUpdated: Date.now(),
});

/**
 * Met à jour les stats du système de badges
 */
export const updateBadgeStats = async (updates) => {
  try {
    const currentStats = await getBadgeStats();
    const newStats = {
      ...currentStats,
      ...updates,
      lastUpdated: Date.now(),
    };

    await AsyncStorage.setItem(STORAGE_KEYS.BADGES_STATS, JSON.stringify(newStats));

    // Vérifier les nouveaux badges débloqués
    const newBadges = await checkNewBadges(newStats);

    return { stats: newStats, newBadges };
  } catch (error) {
    console.error('Error updating badge stats:', error);
    return { stats: null, newBadges: [] };
  }
};

/**
 * Incrémente une stat spécifique
 */
export const incrementBadgeStat = async (statName, amount = 1) => {
  try {
    const currentStats = await getBadgeStats();
    const currentValue = currentStats[statName] || 0;

    return await updateBadgeStats({
      [statName]: currentValue + amount,
    });
  } catch (error) {
    console.error('Error incrementing badge stat:', error);
    return { stats: null, newBadges: [] };
  }
};

/**
 * Vérifie et débloque les nouveaux badges
 */
export const checkNewBadges = async (stats) => {
  try {
    const unlockedBadges = await getUnlockedBadges();
    const newlyUnlocked = [];

    // Vérifier chaque badge
    for (const badge of Object.values(BADGES)) {
      // Skip si déjà débloqué
      if (unlockedBadges.includes(badge.id)) continue;

      // Vérifier la condition
      if (badge.condition(stats)) {
        newlyUnlocked.push({
          ...badge,
          unlockedAt: Date.now(),
        });
        unlockedBadges.push(badge.id);
      }
    }

    // Sauvegarder si nouveaux badges
    if (newlyUnlocked.length > 0) {
      await saveUnlockedBadges(unlockedBadges);
      // Haptic feedback pour badge débloqué
      haptic.badgeUnlocked();
    }

    return newlyUnlocked;
  } catch (error) {
    console.error('Error checking new badges:', error);
    return [];
  }
};

/**
 * Force une vérification complète des badges
 */
export const forceCheckAllBadges = async () => {
  const stats = await getBadgeStats();
  return await checkNewBadges(stats);
};

/**
 * Récupère tous les badges avec leur statut
 */
export const getAllBadgesWithStatus = async () => {
  try {
    const unlockedBadges = await getUnlockedBadges();
    const stats = await getBadgeStats();

    return Object.values(BADGES).map(badge => ({
      ...badge,
      unlocked: unlockedBadges.includes(badge.id),
      progress: getBadgeProgress(badge, stats),
    }));
  } catch (error) {
    console.error('Error getting all badges:', error);
    return [];
  }
};

/**
 * Calcule la progression vers un badge
 */
const getBadgeProgress = (badge, stats) => {
  // Extraire le target de la condition (simplifié)
  const conditionStr = badge.condition.toString();

  // Patterns pour les 12 badges essentiels
  const patterns = [
    { stat: 'lessonsCompleted', targets: [1, 25, 47] },
    { stat: 'currentStreak', targets: [7, 30] },
    { stat: 'exercisesCompleted', targets: [100] },
    { stat: 'perfectStreak', targets: [10] },
    { stat: 'srsReviews', targets: [50] },
    { stat: 'matureCards', targets: [50] },
    { stat: 'hiraganaLessonsCompleted', targets: [10] },
    { stat: 'katakanaLessonsCompleted', targets: [10] },
    { stat: 'kanjiLearned', targets: [100] },
  ];

  for (const pattern of patterns) {
    if (conditionStr.includes(pattern.stat)) {
      const currentValue = stats[pattern.stat] || 0;
      const target = pattern.targets.find(t => conditionStr.includes(t.toString()));
      if (target) {
        return {
          current: Math.min(currentValue, target),
          target,
          percentage: Math.min(100, Math.round((currentValue / target) * 100)),
        };
      }
    }
  }

  return { current: 0, target: 1, percentage: 0 };
};

/**
 * Récupère les badges par catégorie
 */
export const getBadgesByCategory = async () => {
  const allBadges = await getAllBadgesWithStatus();

  const byCategory = {};
  for (const category of Object.keys(BADGE_CATEGORIES)) {
    byCategory[category] = allBadges.filter(b => b.category === category);
  }

  return byCategory;
};

/**
 * Récupère les stats du profil badges
 */
export const getBadgeProfileStats = async () => {
  const unlockedBadges = await getUnlockedBadges();
  const totalBadges = Object.keys(BADGES).length;

  // Compter par rareté
  const byRarity = {
    common: 0,
    uncommon: 0,
    rare: 0,
    legendary: 0,
    mythic: 0,
  };

  for (const badgeId of unlockedBadges) {
    const badge = Object.values(BADGES).find(b => b.id === badgeId);
    if (badge) {
      byRarity[badge.rarity]++;
    }
  }

  return {
    unlocked: unlockedBadges.length,
    total: totalBadges,
    percentage: Math.round((unlockedBadges.length / totalBadges) * 100),
    byRarity,
  };
};

/**
 * Vérifie les badges spéciaux basés sur l'heure
 * @deprecated Les badges temporels ont été supprimés pour focus sur la maîtrise
 */
export const checkTimeBasedBadges = async () => {
  // Fonction conservée pour compatibilité mais ne fait plus rien
  return { stats: null, newBadges: [] };
};

/**
 * Reset complet (pour debug)
 */
export const resetBadges = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.BADGES_UNLOCKED);
    await AsyncStorage.removeItem(STORAGE_KEYS.BADGES_STATS);
    console.log('Badges reset');
  } catch (error) {
    console.error('Error resetting badges:', error);
  }
};

export default {
  BADGES,
  BADGE_CATEGORIES,
  RARITY_COLORS,
  getUnlockedBadges,
  getBadgeStats,
  updateBadgeStats,
  incrementBadgeStat,
  checkNewBadges,
  forceCheckAllBadges,
  getAllBadgesWithStatus,
  getBadgesByCategory,
  getBadgeProfileStats,
  checkTimeBasedBadges,
  resetBadges,
};
