/**
 * Level System - Système de progression par niveaux
 *
 * IMPACT RETENTION: La progression visible motive les utilisateurs
 * Le level up donne un sentiment d'accomplissement
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProgress, saveProgress } from './storage';
import haptic from './hapticService';

const STORAGE_KEYS = {
  LEVEL_DATA: 'user_level_data',
  LEVEL_HISTORY: 'level_history',
};

/**
 * Configuration des niveaux - Inspirés des rangs ninja de Naruto
 *
 * Genin → Chūnin → Jōnin → Sannin → Kage
 * https://naruto.fandom.com/wiki/Shinobi_Organisational_System
 */
export const LEVELS = [
  { level: 1, title: 'Genin', subtitle: '下忍', minXP: 0, emoji: '🥷', color: '#9CA3AF' },
  { level: 2, title: 'Chūnin', subtitle: '中忍', minXP: 500, emoji: '📜', color: '#22C55E' },
  { level: 3, title: 'Tokubetsu Jōnin', subtitle: '特別上忍', minXP: 1000, emoji: '⚔️', color: '#22C55E' },
  { level: 4, title: 'Jōnin', subtitle: '上忍', minXP: 2000, emoji: '🎖️', color: '#3B82F6' },
  { level: 5, title: 'Anbu', subtitle: '暗部', minXP: 4000, emoji: '🎭', color: '#3B82F6' },
  { level: 6, title: 'Sannin', subtitle: '伝説の三忍', minXP: 8000, emoji: '🐉', color: '#A855F7' },
  { level: 7, title: 'Kage', subtitle: '影', minXP: 15000, emoji: '🔥', color: '#A855F7' },
  { level: 8, title: 'Hokage', subtitle: '火影', minXP: 30000, emoji: '👑', color: '#F59E0B' },
];

/**
 * Récompenses par niveau - Messages thématiques Naruto
 */
export const LEVEL_REWARDS = {
  2: { lives: 1, message: 'Tu as passé l\'examen Chūnin ! +1 cœur' },
  3: { lives: 1, message: 'Tes compétences spéciales sont reconnues !' },
  4: { lives: 2, message: 'Tu es maintenant un ninja d\'élite !' },
  5: { lives: 2, message: 'Bienvenue dans les forces spéciales Anbu !' },
  6: { lives: 3, message: 'Tu rejoins les légendaires Sannin !' },
  7: { lives: 3, premiumDays: 3, message: 'Le village te reconnaît comme Kage !' },
  8: { lives: 5, premiumDays: 7, message: '火影 - Tu es le Hokage ! Légende vivante !' },
};

/**
 * Calcule le niveau basé sur XP
 */
export const calculateLevel = (xp) => {
  let currentLevel = LEVELS[0];

  for (const level of LEVELS) {
    if (xp >= level.minXP) {
      currentLevel = level;
    } else {
      break;
    }
  }

  return currentLevel;
};

/**
 * Calcule les infos complètes du niveau
 */
export const getLevelInfo = (xp) => {
  const currentLevel = calculateLevel(xp);
  const currentIndex = LEVELS.findIndex((l) => l.level === currentLevel.level);
  const nextLevel = LEVELS[currentIndex + 1] || null;

  // Calculer la progression vers le niveau suivant
  let progress = 100;
  let xpToNext = 0;
  let xpInLevel = 0;

  if (nextLevel) {
    const xpForCurrentLevel = currentLevel.minXP;
    const xpForNextLevel = nextLevel.minXP;
    const xpRange = xpForNextLevel - xpForCurrentLevel;
    xpInLevel = xp - xpForCurrentLevel;
    xpToNext = xpForNextLevel - xp;
    progress = Math.min(100, Math.round((xpInLevel / xpRange) * 100));
  }

  return {
    ...currentLevel,
    xp,
    nextLevel,
    progress,
    xpToNext,
    xpInLevel,
    isMaxLevel: !nextLevel,
  };
};

/**
 * Récupère les données de niveau de l'utilisateur
 */
export const getUserLevelData = async () => {
  try {
    const progress = await getProgress();
    const xp = progress?.totalPoints || 0;
    return getLevelInfo(xp);
  } catch (error) {
    console.error('Error getting user level data:', error);
    return getLevelInfo(0);
  }
};

/**
 * Ajoute de l'XP et vérifie le level up
 */
export const addXP = async (amount, source = 'unknown') => {
  try {
    const progress = await getProgress();
    const oldXP = progress?.totalPoints || 0;
    const newXP = oldXP + amount;

    const oldLevel = calculateLevel(oldXP);
    const newLevel = calculateLevel(newXP);

    // Mettre à jour la progression
    const newProgress = {
      ...progress,
      totalPoints: newXP,
      level: newLevel.level,
    };
    await saveProgress(newProgress);

    // Enregistrer l'historique
    await logXPGain(amount, source, oldXP, newXP);

    // Vérifier si level up
    const leveledUp = newLevel.level > oldLevel.level;

    if (leveledUp) {
      // Enregistrer le level up
      await logLevelUp(oldLevel.level, newLevel.level);

      // Haptic feedback pour level up
      haptic.levelUp();

      // Récupérer les récompenses
      const reward = LEVEL_REWARDS[newLevel.level] || null;

      return {
        success: true,
        xpGained: amount,
        totalXP: newXP,
        leveledUp: true,
        oldLevel: oldLevel.level,
        newLevel: newLevel.level,
        levelInfo: getLevelInfo(newXP),
        reward,
      };
    }

    return {
      success: true,
      xpGained: amount,
      totalXP: newXP,
      leveledUp: false,
      levelInfo: getLevelInfo(newXP),
    };
  } catch (error) {
    console.error('Error adding XP:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Enregistre un gain d'XP dans l'historique
 */
const logXPGain = async (amount, source, oldXP, newXP) => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.LEVEL_HISTORY);
    const history = data ? JSON.parse(data) : { gains: [], levelUps: [] };

    // Garder seulement les 100 derniers gains
    history.gains = [
      {
        amount,
        source,
        oldXP,
        newXP,
        timestamp: Date.now(),
      },
      ...history.gains.slice(0, 99),
    ];

    await AsyncStorage.setItem(STORAGE_KEYS.LEVEL_HISTORY, JSON.stringify(history));
  } catch (error) {
    console.error('Error logging XP gain:', error);
  }
};

/**
 * Enregistre un level up
 */
const logLevelUp = async (oldLevel, newLevel) => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.LEVEL_HISTORY);
    const history = data ? JSON.parse(data) : { gains: [], levelUps: [] };

    history.levelUps.push({
      oldLevel,
      newLevel,
      timestamp: Date.now(),
    });

    await AsyncStorage.setItem(STORAGE_KEYS.LEVEL_HISTORY, JSON.stringify(history));
  } catch (error) {
    console.error('Error logging level up:', error);
  }
};

/**
 * Récupère l'historique de niveau
 */
export const getLevelHistory = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.LEVEL_HISTORY);
    return data ? JSON.parse(data) : { gains: [], levelUps: [] };
  } catch (error) {
    console.error('Error getting level history:', error);
    return { gains: [], levelUps: [] };
  }
};

/**
 * Calcule l'XP gagné aujourd'hui
 */
export const getTodayXP = async () => {
  try {
    const history = await getLevelHistory();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime();

    const todayGains = history.gains.filter((g) => g.timestamp >= todayTimestamp);
    const totalToday = todayGains.reduce((sum, g) => sum + g.amount, 0);

    return {
      total: totalToday,
      count: todayGains.length,
      gains: todayGains,
    };
  } catch (error) {
    console.error('Error getting today XP:', error);
    return { total: 0, count: 0, gains: [] };
  }
};

/**
 * Calcule l'XP de cette semaine
 */
export const getWeekXP = async () => {
  try {
    const history = await getLevelHistory();
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;

    const weekGains = history.gains.filter((g) => g.timestamp >= weekAgo);
    const totalWeek = weekGains.reduce((sum, g) => sum + g.amount, 0);

    // Grouper par jour
    const byDay = {};
    for (const gain of weekGains) {
      const date = new Date(gain.timestamp).toDateString();
      byDay[date] = (byDay[date] || 0) + gain.amount;
    }

    return {
      total: totalWeek,
      count: weekGains.length,
      byDay,
    };
  } catch (error) {
    console.error('Error getting week XP:', error);
    return { total: 0, count: 0, byDay: {} };
  }
};

/**
 * Obtient les statistiques de niveau complètes
 */
export const getLevelStats = async () => {
  try {
    const levelInfo = await getUserLevelData();
    const todayXP = await getTodayXP();
    const weekXP = await getWeekXP();
    const history = await getLevelHistory();

    return {
      current: levelInfo,
      today: todayXP,
      week: weekXP,
      totalLevelUps: history.levelUps.length,
      lastLevelUp: history.levelUps[history.levelUps.length - 1] || null,
    };
  } catch (error) {
    console.error('Error getting level stats:', error);
    return null;
  }
};

/**
 * Formate l'affichage XP
 */
export const formatXP = (xp) => {
  if (xp >= 1000000) {
    return `${(xp / 1000000).toFixed(1)}M`;
  }
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}K`;
  }
  return xp.toString();
};

/**
 * Reset (pour debug)
 */
export const resetLevelData = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.LEVEL_HISTORY);
    const progress = await getProgress();
    await saveProgress({
      ...progress,
      totalPoints: 0,
      level: 1,
    });
    console.log('Level data reset');
  } catch (error) {
    console.error('Error resetting level data:', error);
  }
};

export default {
  LEVELS,
  LEVEL_REWARDS,
  calculateLevel,
  getLevelInfo,
  getUserLevelData,
  addXP,
  getLevelHistory,
  getTodayXP,
  getWeekXP,
  getLevelStats,
  formatXP,
  resetLevelData,
};
