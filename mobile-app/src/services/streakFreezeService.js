/**
 * Streak Freeze Service - Protection du streak
 *
 * IMPACT REVENUE: C'est l'un des plus gros générateurs de revenus de Duolingo
 * - Les utilisateurs DÉTESTENT perdre leur streak
 * - Prêts à payer pour le protéger
 * - Crée un sentiment d'urgence
 *
 * Fonctionnalités:
 * - Achat de Streak Freeze (XP, gems, ou argent réel)
 * - Maximum 2 freezes actifs en même temps
 * - Protection automatique si jour manqué
 * - Notification quand freeze utilisé
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  STREAK_FREEZES: 'streak_freezes',
  FREEZE_HISTORY: 'freeze_history',
  FREEZE_USED_DATES: 'freeze_used_dates',
};

// Configuration
export const FREEZE_CONFIG = {
  // Maximum de freezes qu'on peut avoir
  maxFreezes: 2,
  // Prix en XP pour acheter un freeze
  xpPrice: 200,
  // Prix en gems (si implémenté)
  gemsPrice: 10,
  // Réduction pour les abonnés premium
  premiumDiscount: 0.5, // 50% de réduction
};

// Prix IAP pour les freezes (RevenueCat)
export const FREEZE_IAP = {
  single: {
    id: 'streak_freeze_1',
    price: 0.99,
    quantity: 1,
    label: '1 Streak Freeze',
  },
  pack3: {
    id: 'streak_freeze_3',
    price: 1.99,
    quantity: 3,
    label: '3 Streak Freezes',
    savings: '33%',
  },
  pack5: {
    id: 'streak_freeze_5',
    price: 2.99,
    quantity: 5,
    label: '5 Streak Freezes',
    savings: '40%',
    popular: true,
  },
};

/**
 * Obtient le nombre de freezes disponibles
 */
export const getFreezeCount = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.STREAK_FREEZES);
    return data ? parseInt(data, 10) : 0;
  } catch (error) {
    console.error('Error getting freeze count:', error);
    return 0;
  }
};

/**
 * Ajoute des freezes
 */
export const addFreezes = async (count) => {
  try {
    const current = await getFreezeCount();
    const newCount = Math.min(current + count, FREEZE_CONFIG.maxFreezes);
    await AsyncStorage.setItem(STORAGE_KEYS.STREAK_FREEZES, String(newCount));

    // Logger l'achat
    await logFreezeEvent('purchased', { count, newTotal: newCount });

    return { success: true, newCount };
  } catch (error) {
    console.error('Error adding freezes:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Utilise un freeze pour protéger le streak
 */
export const useFreeze = async () => {
  try {
    const current = await getFreezeCount();

    if (current <= 0) {
      return { success: false, reason: 'no_freezes' };
    }

    // Vérifier si déjà utilisé aujourd'hui
    const today = getTodayKey();
    const usedDates = await getUsedDates();
    if (usedDates.includes(today)) {
      return { success: false, reason: 'already_used_today' };
    }

    // Utiliser le freeze
    const newCount = current - 1;
    await AsyncStorage.setItem(STORAGE_KEYS.STREAK_FREEZES, String(newCount));

    // Marquer comme utilisé
    usedDates.push(today);
    await AsyncStorage.setItem(STORAGE_KEYS.FREEZE_USED_DATES, JSON.stringify(usedDates));

    // Logger l'utilisation
    await logFreezeEvent('used', { date: today, remaining: newCount });

    return { success: true, remaining: newCount, date: today };
  } catch (error) {
    console.error('Error using freeze:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Vérifie si un freeze peut être utilisé pour protéger le streak
 * À appeler lors de la vérification du streak
 */
export const checkAndUseFreeze = async (lastActiveDate) => {
  try {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = formatDateKey(yesterday);

    // Si le dernier jour actif était hier, pas besoin de freeze
    if (lastActiveDate === yesterdayKey) {
      return { needed: false };
    }

    // Si le dernier jour actif était avant-hier ou plus, vérifier si on peut utiliser un freeze
    const freezeCount = await getFreezeCount();
    if (freezeCount <= 0) {
      return { needed: true, used: false, reason: 'no_freezes' };
    }

    // Utiliser le freeze
    const result = await useFreeze();
    if (result.success) {
      return { needed: true, used: true, remaining: result.remaining };
    }

    return { needed: true, used: false, reason: result.reason };
  } catch (error) {
    console.error('Error checking freeze:', error);
    return { needed: true, used: false, error: error.message };
  }
};

/**
 * Achète un freeze avec des XP
 */
export const purchaseFreezeWithXP = async (userXP, deductXP) => {
  try {
    const currentFreezes = await getFreezeCount();

    // Vérifier le maximum
    if (currentFreezes >= FREEZE_CONFIG.maxFreezes) {
      return {
        success: false,
        reason: 'max_reached',
        message: `Tu as déjà ${FREEZE_CONFIG.maxFreezes} freezes (maximum)`,
      };
    }

    // Vérifier les XP
    const price = FREEZE_CONFIG.xpPrice;
    if (userXP < price) {
      return {
        success: false,
        reason: 'not_enough_xp',
        message: `Il te faut ${price} XP (tu en as ${userXP})`,
        needed: price - userXP,
      };
    }

    // Déduire les XP (callback fourni par l'appelant)
    if (deductXP) {
      await deductXP(price);
    }

    // Ajouter le freeze
    const result = await addFreezes(1);

    return {
      success: true,
      newCount: result.newCount,
      xpSpent: price,
      message: 'Streak Freeze acheté !',
    };
  } catch (error) {
    console.error('Error purchasing freeze:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Vérifie si un freeze a été utilisé à une date donnée
 */
export const wasFreezeUsedOn = async (dateKey) => {
  try {
    const usedDates = await getUsedDates();
    return usedDates.includes(dateKey);
  } catch (error) {
    return false;
  }
};

/**
 * Obtient les dates où des freezes ont été utilisés
 */
const getUsedDates = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.FREEZE_USED_DATES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

/**
 * Obtient l'historique des freezes
 */
export const getFreezeHistory = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.FREEZE_HISTORY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

/**
 * Logger un événement freeze
 */
const logFreezeEvent = async (type, data) => {
  try {
    const history = await getFreezeHistory();
    history.push({
      type,
      date: new Date().toISOString(),
      ...data,
    });
    // Garder seulement les 50 derniers événements
    const trimmed = history.slice(-50);
    await AsyncStorage.setItem(STORAGE_KEYS.FREEZE_HISTORY, JSON.stringify(trimmed));
  } catch (error) {
    console.error('Error logging freeze event:', error);
  }
};

/**
 * Obtient les stats de freeze
 */
export const getFreezeStats = async () => {
  try {
    const [count, history, usedDates] = await Promise.all([
      getFreezeCount(),
      getFreezeHistory(),
      getUsedDates(),
    ]);

    const purchased = history.filter((h) => h.type === 'purchased').length;
    const used = history.filter((h) => h.type === 'used').length;

    return {
      available: count,
      maxFreezes: FREEZE_CONFIG.maxFreezes,
      canBuyMore: count < FREEZE_CONFIG.maxFreezes,
      totalPurchased: purchased,
      totalUsed: used,
      xpPrice: FREEZE_CONFIG.xpPrice,
      recentlyUsed: usedDates.slice(-5),
    };
  } catch (error) {
    console.error('Error getting freeze stats:', error);
    return {
      available: 0,
      maxFreezes: FREEZE_CONFIG.maxFreezes,
      canBuyMore: true,
      totalPurchased: 0,
      totalUsed: 0,
      xpPrice: FREEZE_CONFIG.xpPrice,
    };
  }
};

/**
 * Réinitialise les freezes (pour tests)
 */
export const resetFreezes = async () => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.STREAK_FREEZES,
      STORAGE_KEYS.FREEZE_HISTORY,
      STORAGE_KEYS.FREEZE_USED_DATES,
    ]);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Helpers
const getTodayKey = () => {
  return formatDateKey(new Date());
};

const formatDateKey = (date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate()
  ).padStart(2, '0')}`;
};

export default {
  getFreezeCount,
  addFreezes,
  useFreeze,
  checkAndUseFreeze,
  purchaseFreezeWithXP,
  wasFreezeUsedOn,
  getFreezeStats,
  resetFreezes,
  FREEZE_CONFIG,
  FREEZE_IAP,
};
