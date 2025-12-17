/**
 * Lives System - Système de vies complet avec récupération
 * Feature Anti-Duolingo : 5 SRS reviews = +1 vie gratuite
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORTANT: Ces clés doivent être cohérentes avec storage.js
const STORAGE_KEYS = {
  LIVES: 'japaneseApp_lives', // Unifié avec storage.js
  LIVES_LAST_RECHARGE: 'lives_last_recharge',
  LIVES_RECOVERY_COUNT: 'lives_recovery_count',
  LIVES_LAST_RECOVERY: 'lives_last_recovery',
  SRS_RECOVERY_PROGRESS: 'srs_recovery_progress',
};

export const CONFIG = {
  MAX_LIVES: 7, // Stratégie : plus généreux que Duolingo (5)
  RECHARGE_TIME: 3 * 60 * 60 * 1000, // 3 heures en ms (frustration contrôlée)
  SRS_REVIEWS_FOR_LIFE: 5, // Feature Anti-Duolingo : 5 SRS = +1 vie GRATUITE
  MAX_RECOVERIES_PER_DAY: 3, // Équilibrage : max 3 récupérations/jour
  RECOVERY_COOLDOWN: 30 * 60 * 1000, // 30 minutes entre récupérations
};

/**
 * Récupère le nombre de vies actuel
 */
export const getLives = async () => {
  try {
    const lives = await AsyncStorage.getItem(STORAGE_KEYS.LIVES);
    return lives ? parseInt(lives, 10) : CONFIG.MAX_LIVES;
  } catch (error) {
    console.error('Error getting lives:', error);
    return CONFIG.MAX_LIVES;
  }
};

/**
 * Sauvegarde le nombre de vies
 */
export const saveLives = async (lives) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.LIVES, lives.toString());
  } catch (error) {
    console.error('Error saving lives:', error);
  }
};

/**
 * Retire une vie
 */
export const loseLife = async () => {
  const currentLives = await getLives();
  const newLives = Math.max(0, currentLives - 1);
  await saveLives(newLives);

  // Si on passe à 0, enregistrer le moment pour la recharge
  if (newLives === 0 && currentLives > 0) {
    await AsyncStorage.setItem(
      STORAGE_KEYS.LIVES_LAST_RECHARGE,
      Date.now().toString()
    );
  }

  return newLives;
};

/**
 * Ajoute une vie (max 7)
 */
export const gainLife = async () => {
  const currentLives = await getLives();
  const newLives = Math.min(CONFIG.MAX_LIVES, currentLives + 1);
  await saveLives(newLives);
  return newLives;
};

/**
 * Vérifie si une vie a été rechargée automatiquement
 * Une vie se recharge toutes les 3h
 */
export const checkAutoRecharge = async () => {
  const currentLives = await getLives();

  // Si déjà max, pas besoin de recharger
  if (currentLives >= CONFIG.MAX_LIVES) {
    return currentLives;
  }

  const lastRecharge = await AsyncStorage.getItem(STORAGE_KEYS.LIVES_LAST_RECHARGE);
  if (!lastRecharge) {
    // Première fois, on initialise
    await AsyncStorage.setItem(
      STORAGE_KEYS.LIVES_LAST_RECHARGE,
      Date.now().toString()
    );
    return currentLives;
  }

  const timeSinceRecharge = Date.now() - parseInt(lastRecharge, 10);
  const livesToRecharge = Math.floor(timeSinceRecharge / CONFIG.RECHARGE_TIME);

  if (livesToRecharge > 0) {
    const newLives = Math.min(CONFIG.MAX_LIVES, currentLives + livesToRecharge);
    await saveLives(newLives);

    // Mettre à jour le timestamp
    const newTimestamp = parseInt(lastRecharge, 10) + (livesToRecharge * CONFIG.RECHARGE_TIME);
    await AsyncStorage.setItem(
      STORAGE_KEYS.LIVES_LAST_RECHARGE,
      newTimestamp.toString()
    );

    return newLives;
  }

  return currentLives;
};

/**
 * Calcule le temps restant avant la prochaine recharge (en ms)
 */
export const getTimeUntilNextRecharge = async () => {
  const currentLives = await getLives();

  // Si déjà max, pas de recharge nécessaire
  if (currentLives >= CONFIG.MAX_LIVES) {
    return 0;
  }

  const lastRecharge = await AsyncStorage.getItem(STORAGE_KEYS.LIVES_LAST_RECHARGE);
  if (!lastRecharge) {
    return 0;
  }

  const timeSinceRecharge = Date.now() - parseInt(lastRecharge, 10);
  const timeUntilNext = CONFIG.RECHARGE_TIME - (timeSinceRecharge % CONFIG.RECHARGE_TIME);

  return Math.max(0, timeUntilNext);
};

/**
 * Récupère une vie gratuitement via SRS (Anti-Duolingo feature)
 * Requiert 5 reviews SRS pour débloquer
 */
export const recoverLifeWithSRS = async (srsReviewsCount) => {
  const currentLives = await getLives();

  // Vérifier si déjà max
  if (currentLives >= CONFIG.MAX_LIVES) {
    return {
      success: false,
      reason: 'already_max',
      message: 'Vous avez déjà le maximum de vies !',
    };
  }

  // Vérifier si assez de reviews SRS
  if (srsReviewsCount < CONFIG.SRS_REVIEWS_FOR_LIFE) {
    return {
      success: false,
      reason: 'not_enough_reviews',
      message: `Il vous faut encore ${CONFIG.SRS_REVIEWS_FOR_LIFE - srsReviewsCount} révisions SRS`,
      remaining: CONFIG.SRS_REVIEWS_FOR_LIFE - srsReviewsCount,
    };
  }

  // Vérifier le cooldown
  const lastRecovery = await AsyncStorage.getItem(STORAGE_KEYS.LIVES_LAST_RECOVERY);
  if (lastRecovery) {
    const timeSinceRecovery = Date.now() - parseInt(lastRecovery, 10);
    if (timeSinceRecovery < CONFIG.RECOVERY_COOLDOWN) {
      const remainingTime = CONFIG.RECOVERY_COOLDOWN - timeSinceRecovery;
      return {
        success: false,
        reason: 'cooldown',
        message: 'Attendez avant de récupérer une autre vie',
        remainingTime,
      };
    }
  }

  // Vérifier limite quotidienne
  const recoveriesToday = await getRecoveryCountToday();
  if (recoveriesToday >= CONFIG.MAX_RECOVERIES_PER_DAY) {
    return {
      success: false,
      reason: 'daily_limit',
      message: `Limite quotidienne atteinte (${CONFIG.MAX_RECOVERIES_PER_DAY}/jour)`,
    };
  }

  // Récupérer la vie !
  const newLives = await gainLife();

  // Enregistrer la récupération
  await AsyncStorage.setItem(
    STORAGE_KEYS.LIVES_LAST_RECOVERY,
    Date.now().toString()
  );
  await incrementRecoveryCount();

  return {
    success: true,
    newLives,
    message: '💝 Vie récupérée gratuitement !',
  };
};

/**
 * Compte le nombre de récupérations aujourd'hui
 */
const getRecoveryCountToday = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.LIVES_RECOVERY_COUNT);
    if (!data) return 0;

    const { count, date } = JSON.parse(data);
    const today = new Date().toDateString();

    // Reset si jour différent
    if (date !== today) {
      await AsyncStorage.setItem(
        STORAGE_KEYS.LIVES_RECOVERY_COUNT,
        JSON.stringify({ count: 0, date: today })
      );
      return 0;
    }

    return count;
  } catch (error) {
    console.error('Error getting recovery count:', error);
    return 0;
  }
};

/**
 * Incrémente le compteur de récupérations
 */
const incrementRecoveryCount = async () => {
  try {
    const count = await getRecoveryCountToday();
    const today = new Date().toDateString();

    await AsyncStorage.setItem(
      STORAGE_KEYS.LIVES_RECOVERY_COUNT,
      JSON.stringify({ count: count + 1, date: today })
    );
  } catch (error) {
    console.error('Error incrementing recovery count:', error);
  }
};

/**
 * Obtient les stats de récupération
 */
export const getRecoveryStats = async () => {
  const recoveriesToday = await getRecoveryCountToday();
  const lastRecovery = await AsyncStorage.getItem(STORAGE_KEYS.LIVES_LAST_RECOVERY);

  return {
    recoveriesToday,
    maxRecoveriesPerDay: CONFIG.MAX_RECOVERIES_PER_DAY,
    remainingRecoveries: CONFIG.MAX_RECOVERIES_PER_DAY - recoveriesToday,
    lastRecoveryTime: lastRecovery ? parseInt(lastRecovery, 10) : null,
  };
};

/**
 * Obtient la progression SRS pour récupération de vie (0-5)
 */
export const getSRSRecoveryProgress = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.SRS_RECOVERY_PROGRESS);
    if (!data) return 0;

    const { progress, date } = JSON.parse(data);
    const today = new Date().toDateString();

    // Reset si jour différent
    if (date !== today) {
      await AsyncStorage.setItem(
        STORAGE_KEYS.SRS_RECOVERY_PROGRESS,
        JSON.stringify({ progress: 0, date: today })
      );
      return 0;
    }

    return Math.min(progress, CONFIG.SRS_REVIEWS_FOR_LIFE);
  } catch (error) {
    console.error('Error getting SRS recovery progress:', error);
    return 0;
  }
};

/**
 * Incrémente la progression SRS pour récupération
 */
export const incrementSRSRecoveryProgress = async () => {
  try {
    const currentProgress = await getSRSRecoveryProgress();
    const today = new Date().toDateString();

    const newProgress = Math.min(
      currentProgress + 1,
      CONFIG.SRS_REVIEWS_FOR_LIFE
    );

    await AsyncStorage.setItem(
      STORAGE_KEYS.SRS_RECOVERY_PROGRESS,
      JSON.stringify({ progress: newProgress, date: today })
    );

    return newProgress;
  } catch (error) {
    console.error('Error incrementing SRS recovery progress:', error);
    return 0;
  }
};

/**
 * Réinitialise la progression SRS après récupération de vie
 */
export const resetSRSRecoveryProgress = async () => {
  try {
    const today = new Date().toDateString();
    await AsyncStorage.setItem(
      STORAGE_KEYS.SRS_RECOVERY_PROGRESS,
      JSON.stringify({ progress: 0, date: today })
    );
  } catch (error) {
    console.error('Error resetting SRS recovery progress:', error);
  }
};

/**
 * Formatte le temps restant en format lisible
 */
export const formatTime = (ms) => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
};

export default {
  CONFIG,
  getLives,
  saveLives,
  loseLife,
  gainLife,
  checkAutoRecharge,
  getTimeUntilNextRecharge,
  recoverLifeWithSRS,
  getRecoveryStats,
  getSRSRecoveryProgress,
  incrementSRSRecoveryProgress,
  resetSRSRecoveryProgress,
  formatTime,
};
