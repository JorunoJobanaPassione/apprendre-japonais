import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  PROGRESS: '@japonais_progress',
  STATS: '@japonais_stats',
  CURRENT_LESSON: '@japonais_current_lesson',
  BADGES: '@japonais_badges',
  STREAK: '@japonais_streak',
  DAILY_ACTIVITY: '@japonais_daily_activity'
};

/**
 * Sauvegarde la progression de l'utilisateur
 */
export const saveProgress = async (lessonId, stepIndex, score) => {
  try {
    const progressData = {
      lessonId,
      stepIndex,
      score,
      lastUpdated: new Date().toISOString()
    };
    await AsyncStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progressData));
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
    return false;
  }
};

/**
 * Récupère la progression de l'utilisateur
 */
export const loadProgress = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.PROGRESS);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Erreur lors du chargement:', error);
    return null;
  }
};

/**
 * Sauvegarde les statistiques globales
 */
export const saveStats = async (stats) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des stats:', error);
    return false;
  }
};

/**
 * Récupère les statistiques globales
 */
export const loadStats = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.STATS);
    return data ? JSON.parse(data) : {
      lessonsCompleted: [],
      totalScore: 0,
      averageScore: 0
    };
  } catch (error) {
    console.error('Erreur lors du chargement des stats:', error);
    return {
      lessonsCompleted: [],
      totalScore: 0,
      averageScore: 0
    };
  }
};

/**
 * Sauvegarde les badges débloqués
 */
export const saveBadges = async (badges) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(badges));
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des badges:', error);
    return false;
  }
};

/**
 * Récupère les badges débloqués
 */
export const loadBadges = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.BADGES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erreur lors du chargement des badges:', error);
    return [];
  }
};

/**
 * Sauvegarde la série (streak)
 */
export const saveStreak = async (streakData) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streakData));
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la série:', error);
    return false;
  }
};

/**
 * Récupère la série (streak)
 */
export const loadStreak = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.STREAK);
    return data ? JSON.parse(data) : {
      currentStreak: 0,
      longestStreak: 0,
      lastStudyDate: null
    };
  } catch (error) {
    console.error('Erreur lors du chargement de la série:', error);
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastStudyDate: null
    };
  }
};

/**
 * Met à jour la série quotidienne
 */
export const updateStreak = async () => {
  try {
    const streakData = await loadStreak();
    const today = new Date().toDateString();
    const lastDate = streakData.lastStudyDate ? new Date(streakData.lastStudyDate).toDateString() : null;

    if (lastDate === today) {
      // Déjà étudié aujourd'hui
      return streakData;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    let newStreak;
    if (lastDate === yesterdayStr) {
      // Continue la série
      newStreak = streakData.currentStreak + 1;
    } else if (lastDate === null) {
      // Première étude
      newStreak = 1;
    } else {
      // Série perdue
      newStreak = 1;
    }

    const updatedData = {
      currentStreak: newStreak,
      longestStreak: Math.max(newStreak, streakData.longestStreak),
      lastStudyDate: new Date().toISOString()
    };

    await saveStreak(updatedData);
    return updatedData;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la série:', error);
    return null;
  }
};

/**
 * Sauvegarde l'activité quotidienne
 */
export const saveDailyActivity = async (date, lessonsCompleted) => {
  try {
    const activities = await loadDailyActivities();
    const dateStr = new Date(date).toDateString();

    activities[dateStr] = {
      date: dateStr,
      lessonsCompleted,
      timestamp: new Date().toISOString()
    };

    await AsyncStorage.setItem(STORAGE_KEYS.DAILY_ACTIVITY, JSON.stringify(activities));
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de l\'activité:', error);
    return false;
  }
};

/**
 * Récupère toutes les activités quotidiennes
 */
export const loadDailyActivities = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.DAILY_ACTIVITY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Erreur lors du chargement des activités:', error);
    return {};
  }
};

/**
 * Récupère les statistiques avancées
 */
export const getAdvancedStats = async () => {
  try {
    const stats = await loadStats();
    const badges = await loadBadges();
    const streak = await loadStreak();
    const activities = await loadDailyActivities();

    return {
      // Stats de base
      completedLessons: stats.lessonsCompleted?.length || 0,
      averageScore: stats.averageScore || 0,
      totalScore: stats.totalScore || 0,
      bestScore: Math.max(...(stats.lessonsCompleted?.map(l => l.score) || [0])),

      // Badges
      unlockedBadges: badges.length,
      totalBadges: 20, // Total de badges disponibles

      // Streak
      currentStreak: streak.currentStreak || 0,
      longestStreak: streak.longestStreak || 0,
      lastStudyDate: streak.lastStudyDate,

      // Statistiques spéciales
      perfectScores: stats.lessonsCompleted?.filter(l => l.score === 100).length || 0,
      studiedAtNight: false, // À implémenter
      studiedEarlyMorning: false, // À implémenter
      studiedBothWeekendDays: false, // À implémenter
      lessonsInOneDay: 0, // À calculer depuis activities
      fastestLessonTime: Infinity, // À implémenter
      triedAllExerciseTypes: false, // À implémenter
      comebackAfter30Days: false // À implémenter
    };
  } catch (error) {
    console.error('Erreur lors du chargement des stats avancées:', error);
    return null;
  }
};

/**
 * Réinitialise toutes les données
 */
export const clearAllData = async () => {
  try {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
    return true;
  } catch (error) {
    console.error('Erreur lors de la réinitialisation:', error);
    return false;
  }
};
