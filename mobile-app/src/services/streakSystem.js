/**
 * Streak System - Système de jours consécutifs avec protection gratuite
 * Feature Anti-Duolingo : Jours de grâce GRATUITS (pas de paywall)
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  STREAK_CURRENT: 'streak_current',
  STREAK_LAST_DATE: 'streak_last_date',
  STREAK_GRACE_DAYS: 'streak_grace_days',
  STREAK_VACATION_MODE: 'streak_vacation_mode',
  STREAK_VACATION_DAYS_USED: 'streak_vacation_days_used',
  STREAK_VACATION_YEAR: 'streak_vacation_year',
  STREAK_MILESTONES: 'streak_milestones',
  STREAK_HIGHEST: 'streak_highest',
};

export const CONFIG = {
  // Jours de grâce GRATUITS (Anti-Duolingo)
  GRACE_DAYS: {
    TIER_0_7: { minStreak: 0, maxStreak: 6, graceDays: 0 },      // Débutants : 0 jour
    TIER_7_30: { minStreak: 7, maxStreak: 29, graceDays: 1 },    // 7+ jours : 1 jour
    TIER_30_100: { minStreak: 30, maxStreak: 99, graceDays: 3 }, // 30+ jours : 3 jours
    TIER_100_PLUS: { minStreak: 100, maxStreak: Infinity, graceDays: 7 }, // 100+ : 7 jours
  },

  // Mode vacances GRATUIT (vs Duolingo paywall)
  VACATION_MODE: {
    MAX_DAYS_PER_YEAR: 14, // 14 jours/an gratuits
    FREE: true,             // 100% gratuit
  },

  // Milestones
  MILESTONES: [
    { days: 7, name: 'Une semaine', emoji: '🔥', reward: { xp: 100 } },
    { days: 14, name: 'Deux semaines', emoji: '💪', reward: { xp: 200 } },
    { days: 30, name: 'Un mois', emoji: '⭐', reward: { xp: 500, lives: 1 } },
    { days: 50, name: '50 jours', emoji: '🎯', reward: { xp: 750 } },
    { days: 100, name: '100 jours', emoji: '💎', reward: { xp: 1500, lives: 2 } },
    { days: 200, name: '200 jours', emoji: '🏆', reward: { xp: 3000 } },
    { days: 365, name: 'Une année', emoji: '👑', reward: { xp: 10000, lives: 5 } },
  ],
};

/**
 * Obtient le streak actuel
 */
export const getCurrentStreak = async () => {
  try {
    const streak = await AsyncStorage.getItem(STORAGE_KEYS.STREAK_CURRENT);
    return streak ? parseInt(streak, 10) : 0;
  } catch (error) {
    console.error('Error getting current streak:', error);
    return 0;
  }
};

/**
 * Obtient le streak le plus élevé
 */
export const getHighestStreak = async () => {
  try {
    const highest = await AsyncStorage.getItem(STORAGE_KEYS.STREAK_HIGHEST);
    return highest ? parseInt(highest, 10) : 0;
  } catch (error) {
    console.error('Error getting highest streak:', error);
    return 0;
  }
};

/**
 * Calcule le nombre de jours de grâce disponibles
 * Basé sur le palier actuel
 */
export const getAvailableGraceDays = async () => {
  const currentStreak = await getCurrentStreak();

  // Déterminer le palier
  if (currentStreak >= CONFIG.GRACE_DAYS.TIER_100_PLUS.minStreak) {
    return CONFIG.GRACE_DAYS.TIER_100_PLUS.graceDays;
  } else if (currentStreak >= CONFIG.GRACE_DAYS.TIER_30_100.minStreak) {
    return CONFIG.GRACE_DAYS.TIER_30_100.graceDays;
  } else if (currentStreak >= CONFIG.GRACE_DAYS.TIER_7_30.minStreak) {
    return CONFIG.GRACE_DAYS.TIER_7_30.graceDays;
  } else {
    return CONFIG.GRACE_DAYS.TIER_0_7.graceDays;
  }
};

/**
 * Obtient les jours de grâce actuellement utilisés
 */
export const getUsedGraceDays = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.STREAK_GRACE_DAYS);
    if (!data) return 0;

    const { used, resetDate } = JSON.parse(data);
    const lastDate = await getLastActivityDate();

    // Reset si on a complété une session depuis
    if (lastDate && new Date(lastDate) > new Date(resetDate)) {
      await AsyncStorage.setItem(
        STORAGE_KEYS.STREAK_GRACE_DAYS,
        JSON.stringify({ used: 0, resetDate: new Date().toISOString() })
      );
      return 0;
    }

    return used;
  } catch (error) {
    console.error('Error getting used grace days:', error);
    return 0;
  }
};

/**
 * Obtient la date de la dernière activité
 */
export const getLastActivityDate = async () => {
  try {
    const date = await AsyncStorage.getItem(STORAGE_KEYS.STREAK_LAST_DATE);
    return date;
  } catch (error) {
    console.error('Error getting last activity date:', error);
    return null;
  }
};

/**
 * Vérifie si l'utilisateur est en mode vacances
 */
export const isVacationModeActive = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.STREAK_VACATION_MODE);
    if (!data) return false;

    const { active, startDate, endDate } = JSON.parse(data);
    const now = new Date();

    if (active && new Date(endDate) > now) {
      return true;
    }

    // Désactiver si la période est terminée
    if (active && new Date(endDate) <= now) {
      await AsyncStorage.setItem(
        STORAGE_KEYS.STREAK_VACATION_MODE,
        JSON.stringify({ active: false, startDate: null, endDate: null })
      );
    }

    return false;
  } catch (error) {
    console.error('Error checking vacation mode:', error);
    return false;
  }
};

/**
 * Active le mode vacances
 */
export const activateVacationMode = async (days) => {
  try {
    // Vérifier les jours disponibles cette année
    const daysUsedThisYear = await getVacationDaysUsedThisYear();
    const remainingDays = CONFIG.VACATION_MODE.MAX_DAYS_PER_YEAR - daysUsedThisYear;

    if (days > remainingDays) {
      return {
        success: false,
        reason: 'insufficient_days',
        message: `Vous avez ${remainingDays} jours de vacances restants cette année`,
        remainingDays,
      };
    }

    if (days < 1 || days > 14) {
      return {
        success: false,
        reason: 'invalid_duration',
        message: 'La durée doit être entre 1 et 14 jours',
      };
    }

    // Activer le mode vacances
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + days);

    await AsyncStorage.setItem(
      STORAGE_KEYS.STREAK_VACATION_MODE,
      JSON.stringify({
        active: true,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        daysUsed: days,
      })
    );

    // Mettre à jour le compteur annuel
    await updateVacationDaysUsed(daysUsedThisYear + days);

    return {
      success: true,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      daysUsed: days,
      message: `Mode vacances activé pour ${days} jour(s)`,
    };
  } catch (error) {
    console.error('Error activating vacation mode:', error);
    return {
      success: false,
      reason: 'error',
      message: 'Erreur lors de l\'activation du mode vacances',
    };
  }
};

/**
 * Obtient les jours de vacances utilisés cette année
 */
export const getVacationDaysUsedThisYear = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.STREAK_VACATION_DAYS_USED);
    if (!data) return 0;

    const { daysUsed, year } = JSON.parse(data);
    const currentYear = new Date().getFullYear();

    // Reset si nouvelle année
    if (year !== currentYear) {
      await AsyncStorage.setItem(
        STORAGE_KEYS.STREAK_VACATION_DAYS_USED,
        JSON.stringify({ daysUsed: 0, year: currentYear })
      );
      return 0;
    }

    return daysUsed;
  } catch (error) {
    console.error('Error getting vacation days used:', error);
    return 0;
  }
};

/**
 * Met à jour le compteur de jours de vacances utilisés
 */
const updateVacationDaysUsed = async (days) => {
  try {
    const currentYear = new Date().getFullYear();
    await AsyncStorage.setItem(
      STORAGE_KEYS.STREAK_VACATION_DAYS_USED,
      JSON.stringify({ daysUsed: days, year: currentYear })
    );
  } catch (error) {
    console.error('Error updating vacation days:', error);
  }
};

/**
 * Obtient les stats du mode vacances
 */
export const getVacationStats = async () => {
  const daysUsed = await getVacationDaysUsedThisYear();
  const isActive = await isVacationModeActive();
  let vacationInfo = null;

  if (isActive) {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.STREAK_VACATION_MODE);
    if (data) {
      vacationInfo = JSON.parse(data);
    }
  }

  return {
    maxDaysPerYear: CONFIG.VACATION_MODE.MAX_DAYS_PER_YEAR,
    daysUsedThisYear: daysUsed,
    remainingDays: CONFIG.VACATION_MODE.MAX_DAYS_PER_YEAR - daysUsed,
    isActive,
    vacationInfo,
  };
};

/**
 * Vérifie et met à jour le streak quotidien
 * Appeler cette fonction lors de la première activité de la journée
 */
export const updateStreak = async () => {
  try {
    const lastDateStr = await getLastActivityDate();
    const currentStreak = await getCurrentStreak();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Si mode vacances actif, ne rien faire
    const vacationActive = await isVacationModeActive();
    if (vacationActive) {
      return {
        success: true,
        streak: currentStreak,
        status: 'vacation_mode',
        message: '🏖️ Mode vacances actif',
      };
    }

    // Première utilisation
    if (!lastDateStr) {
      await AsyncStorage.setItem(STORAGE_KEYS.STREAK_CURRENT, '1');
      await AsyncStorage.setItem(STORAGE_KEYS.STREAK_LAST_DATE, today.toISOString());
      await AsyncStorage.setItem(STORAGE_KEYS.STREAK_HIGHEST, '1');

      return {
        success: true,
        streak: 1,
        status: 'started',
        message: '🔥 Streak commencé !',
      };
    }

    const lastDate = new Date(lastDateStr);
    lastDate.setHours(0, 0, 0, 0);

    const daysDifference = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

    // Même jour - déjà complété
    if (daysDifference === 0) {
      return {
        success: true,
        streak: currentStreak,
        status: 'already_completed',
        message: '✅ Déjà complété aujourd\'hui',
      };
    }

    // Jour consécutif - incrémenter
    if (daysDifference === 1) {
      const newStreak = currentStreak + 1;
      await AsyncStorage.setItem(STORAGE_KEYS.STREAK_CURRENT, newStreak.toString());
      await AsyncStorage.setItem(STORAGE_KEYS.STREAK_LAST_DATE, today.toISOString());

      // Mettre à jour le record si nécessaire
      const highestStreak = await getHighestStreak();
      if (newStreak > highestStreak) {
        await AsyncStorage.setItem(STORAGE_KEYS.STREAK_HIGHEST, newStreak.toString());
      }

      // Vérifier les milestones
      const milestone = await checkMilestone(newStreak);

      // Reset les jours de grâce utilisés
      await AsyncStorage.setItem(
        STORAGE_KEYS.STREAK_GRACE_DAYS,
        JSON.stringify({ used: 0, resetDate: new Date().toISOString() })
      );

      return {
        success: true,
        streak: newStreak,
        status: 'incremented',
        message: `🔥 ${newStreak} jours de suite !`,
        milestone,
      };
    }

    // Manqué un ou plusieurs jours - vérifier jours de grâce
    if (daysDifference > 1) {
      const availableGraceDays = await getAvailableGraceDays();
      const usedGraceDays = await getUsedGraceDays();
      const remainingGraceDays = availableGraceDays - usedGraceDays;
      const missedDays = daysDifference - 1;

      // Si assez de jours de grâce, utiliser
      if (missedDays <= remainingGraceDays) {
        const newUsedGraceDays = usedGraceDays + missedDays;
        await AsyncStorage.setItem(
          STORAGE_KEYS.STREAK_GRACE_DAYS,
          JSON.stringify({ used: newUsedGraceDays, resetDate: new Date().toISOString() })
        );

        // Incrémenter le streak normalement
        const newStreak = currentStreak + 1;
        await AsyncStorage.setItem(STORAGE_KEYS.STREAK_CURRENT, newStreak.toString());
        await AsyncStorage.setItem(STORAGE_KEYS.STREAK_LAST_DATE, today.toISOString());

        return {
          success: true,
          streak: newStreak,
          status: 'grace_used',
          message: `🛡️ Jour(s) de grâce utilisé(s) (${newUsedGraceDays}/${availableGraceDays})`,
          graceDaysUsed: newUsedGraceDays,
          graceDaysAvailable: availableGraceDays,
        };
      }

      // Pas assez de jours de grâce - streak perdu
      await AsyncStorage.setItem(STORAGE_KEYS.STREAK_CURRENT, '1');
      await AsyncStorage.setItem(STORAGE_KEYS.STREAK_LAST_DATE, today.toISOString());
      await AsyncStorage.setItem(
        STORAGE_KEYS.STREAK_GRACE_DAYS,
        JSON.stringify({ used: 0, resetDate: new Date().toISOString() })
      );

      return {
        success: true,
        streak: 1,
        status: 'lost',
        previousStreak: currentStreak,
        message: `💔 Streak perdu (${currentStreak} jours)`,
      };
    }

    return {
      success: false,
      streak: currentStreak,
      status: 'error',
      message: 'Erreur inconnue',
    };
  } catch (error) {
    console.error('Error updating streak:', error);
    return {
      success: false,
      streak: 0,
      status: 'error',
      message: 'Erreur lors de la mise à jour du streak',
    };
  }
};

/**
 * Vérifie si un milestone a été atteint
 */
export const checkMilestone = async (currentStreak) => {
  try {
    const milestonesData = await AsyncStorage.getItem(STORAGE_KEYS.STREAK_MILESTONES);
    const unlockedMilestones = milestonesData ? JSON.parse(milestonesData) : [];

    // Trouver les milestones atteints
    const milestone = CONFIG.MILESTONES.find(m => m.days === currentStreak);

    if (milestone && !unlockedMilestones.includes(milestone.days)) {
      // Débloquer le milestone
      unlockedMilestones.push(milestone.days);
      await AsyncStorage.setItem(
        STORAGE_KEYS.STREAK_MILESTONES,
        JSON.stringify(unlockedMilestones)
      );

      return {
        unlocked: true,
        milestone,
      };
    }

    return null;
  } catch (error) {
    console.error('Error checking milestone:', error);
    return null;
  }
};

/**
 * Obtient tous les milestones débloqués
 */
export const getUnlockedMilestones = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.STREAK_MILESTONES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting unlocked milestones:', error);
    return [];
  }
};

/**
 * Obtient le prochain milestone
 */
export const getNextMilestone = async () => {
  const currentStreak = await getCurrentStreak();
  const unlockedMilestones = await getUnlockedMilestones();

  const nextMilestone = CONFIG.MILESTONES.find(
    m => m.days > currentStreak && !unlockedMilestones.includes(m.days)
  );

  return nextMilestone || null;
};

/**
 * Obtient les stats complètes du streak
 */
export const getStreakStats = async () => {
  const currentStreak = await getCurrentStreak();
  const highestStreak = await getHighestStreak();
  const availableGraceDays = await getAvailableGraceDays();
  const usedGraceDays = await getUsedGraceDays();
  const vacationStats = await getVacationStats();
  const unlockedMilestones = await getUnlockedMilestones();
  const nextMilestone = await getNextMilestone();

  return {
    currentStreak,
    highestStreak,
    graceDays: {
      available: availableGraceDays,
      used: usedGraceDays,
      remaining: availableGraceDays - usedGraceDays,
    },
    vacation: vacationStats,
    milestones: {
      unlocked: unlockedMilestones,
      next: nextMilestone,
    },
  };
};

/**
 * Formatte le streak pour l'affichage
 */
export const formatStreak = (streak) => {
  if (streak === 0) return 'Commencez votre streak !';
  if (streak === 1) return '1 jour';
  return `${streak} jours`;
};

/**
 * Obtient l'emoji du palier actuel
 */
export const getStreakTierEmoji = (streak) => {
  if (streak >= 365) return '👑';
  if (streak >= 200) return '🏆';
  if (streak >= 100) return '💎';
  if (streak >= 50) return '🎯';
  if (streak >= 30) return '⭐';
  if (streak >= 14) return '💪';
  if (streak >= 7) return '🔥';
  return '🌱';
};

export default {
  CONFIG,
  getCurrentStreak,
  getHighestStreak,
  getAvailableGraceDays,
  getUsedGraceDays,
  getLastActivityDate,
  isVacationModeActive,
  activateVacationMode,
  getVacationDaysUsedThisYear,
  getVacationStats,
  updateStreak,
  checkMilestone,
  getUnlockedMilestones,
  getNextMilestone,
  getStreakStats,
  formatStreak,
  getStreakTierEmoji,
};
