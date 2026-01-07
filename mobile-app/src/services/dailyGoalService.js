/**
 * Daily Goal Service - Suivi de l'objectif quotidien
 *
 * IMPACT RETENTION: Le daily goal est le coeur de Duolingo
 * - Augmente le temps passé dans l'app
 * - Crée une habitude quotidienne
 * - Motivation par la progression visible
 *
 * Fonctionnalités:
 * - Track le temps d'étude en temps réel
 * - Compare avec l'objectif choisi
 * - Récompenses XP bonus quand objectif atteint
 * - Historique jour par jour
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserGoal, DAILY_GOALS } from './onboardingService';

const STORAGE_KEYS = {
  DAILY_PROGRESS: 'daily_progress',
  STUDY_HISTORY: 'study_history',
  CURRENT_SESSION: 'current_session',
  GOAL_STREAK: 'goal_streak',
};

// Récompenses pour l'objectif quotidien
export const GOAL_REWARDS = {
  dailyComplete: {
    xp: 25,
    message: 'Objectif du jour atteint !',
  },
  weekStreak: {
    xp: 100,
    message: '7 jours d\'objectifs atteints !',
  },
  monthStreak: {
    xp: 500,
    message: '30 jours d\'objectifs atteints !',
  },
};

/**
 * Obtient la clé de date pour aujourd'hui
 */
const getTodayKey = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
    now.getDate()
  ).padStart(2, '0')}`;
};

/**
 * Obtient les données du jour
 */
export const getDailyProgress = async () => {
  try {
    const todayKey = getTodayKey();
    const data = await AsyncStorage.getItem(STORAGE_KEYS.DAILY_PROGRESS);
    const progress = data ? JSON.parse(data) : {};

    // Si pas de données pour aujourd'hui, initialiser
    if (!progress[todayKey]) {
      progress[todayKey] = {
        date: todayKey,
        minutesStudied: 0,
        lessonsCompleted: 0,
        exercisesCompleted: 0,
        xpEarned: 0,
        goalReached: false,
        goalReachedAt: null,
      };
    }

    const goal = await getUserGoal();

    return {
      today: progress[todayKey],
      goal,
      percentage: Math.min(100, Math.round((progress[todayKey].minutesStudied / goal.minutes) * 100)),
      remaining: Math.max(0, goal.minutes - progress[todayKey].minutesStudied),
      isComplete: progress[todayKey].goalReached,
    };
  } catch (error) {
    console.error('Error getting daily progress:', error);
    const goal = await getUserGoal();
    return {
      today: { minutesStudied: 0, lessonsCompleted: 0, exercisesCompleted: 0, xpEarned: 0 },
      goal,
      percentage: 0,
      remaining: goal.minutes,
      isComplete: false,
    };
  }
};

/**
 * Met à jour la progression du jour
 */
const updateDailyProgress = async (updates) => {
  try {
    const todayKey = getTodayKey();
    const data = await AsyncStorage.getItem(STORAGE_KEYS.DAILY_PROGRESS);
    const progress = data ? JSON.parse(data) : {};

    if (!progress[todayKey]) {
      progress[todayKey] = {
        date: todayKey,
        minutesStudied: 0,
        lessonsCompleted: 0,
        exercisesCompleted: 0,
        xpEarned: 0,
        goalReached: false,
        goalReachedAt: null,
      };
    }

    progress[todayKey] = { ...progress[todayKey], ...updates };

    // Vérifier si l'objectif est atteint
    const goal = await getUserGoal();
    if (!progress[todayKey].goalReached && progress[todayKey].minutesStudied >= goal.minutes) {
      progress[todayKey].goalReached = true;
      progress[todayKey].goalReachedAt = new Date().toISOString();

      // Mettre à jour le streak d'objectifs
      await updateGoalStreak();
    }

    await AsyncStorage.setItem(STORAGE_KEYS.DAILY_PROGRESS, JSON.stringify(progress));

    return progress[todayKey];
  } catch (error) {
    console.error('Error updating daily progress:', error);
    return null;
  }
};

/**
 * Démarre une session d'étude
 */
export const startStudySession = async () => {
  try {
    const session = {
      startTime: Date.now(),
      type: 'study',
    };
    await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_SESSION, JSON.stringify(session));
    return { success: true, session };
  } catch (error) {
    console.error('Error starting study session:', error);
    return { success: false };
  }
};

/**
 * Termine une session d'étude et enregistre le temps
 */
export const endStudySession = async (additionalData = {}) => {
  try {
    const sessionData = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_SESSION);
    if (!sessionData) {
      return { success: false, reason: 'no_session' };
    }

    const session = JSON.parse(sessionData);
    const endTime = Date.now();
    const durationMs = endTime - session.startTime;
    const durationMinutes = Math.round(durationMs / 60000);

    // Mettre à jour la progression
    const currentProgress = await getDailyProgress();
    const wasComplete = currentProgress.isComplete;

    const updated = await updateDailyProgress({
      minutesStudied: currentProgress.today.minutesStudied + Math.max(1, durationMinutes),
      lessonsCompleted: currentProgress.today.lessonsCompleted + (additionalData.lessonCompleted ? 1 : 0),
      exercisesCompleted: currentProgress.today.exercisesCompleted + (additionalData.exercisesCount || 0),
      xpEarned: currentProgress.today.xpEarned + (additionalData.xpEarned || 0),
    });

    // Nettoyer la session
    await AsyncStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);

    // Vérifier si l'objectif vient d'être atteint
    const newProgress = await getDailyProgress();
    const justReachedGoal = !wasComplete && newProgress.isComplete;

    return {
      success: true,
      duration: durationMinutes,
      progress: newProgress,
      justReachedGoal,
      reward: justReachedGoal ? GOAL_REWARDS.dailyComplete : null,
    };
  } catch (error) {
    console.error('Error ending study session:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Ajoute du temps d'étude directement (sans session)
 */
export const addStudyTime = async (minutes, additionalData = {}) => {
  try {
    const currentProgress = await getDailyProgress();
    const wasComplete = currentProgress.isComplete;

    await updateDailyProgress({
      minutesStudied: currentProgress.today.minutesStudied + minutes,
      lessonsCompleted: currentProgress.today.lessonsCompleted + (additionalData.lessonCompleted ? 1 : 0),
      exercisesCompleted: currentProgress.today.exercisesCompleted + (additionalData.exercisesCount || 0),
      xpEarned: currentProgress.today.xpEarned + (additionalData.xpEarned || 0),
    });

    const newProgress = await getDailyProgress();
    const justReachedGoal = !wasComplete && newProgress.isComplete;

    return {
      success: true,
      progress: newProgress,
      justReachedGoal,
      reward: justReachedGoal ? GOAL_REWARDS.dailyComplete : null,
    };
  } catch (error) {
    console.error('Error adding study time:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Met à jour le streak d'objectifs quotidiens
 */
const updateGoalStreak = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.GOAL_STREAK);
    const streak = data ? JSON.parse(data) : { current: 0, highest: 0, lastDate: null };

    const today = getTodayKey();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(yesterday.getDate()).padStart(2, '0')}`;

    // Si le dernier objectif était hier, continuer le streak
    if (streak.lastDate === yesterdayKey) {
      streak.current += 1;
    } else if (streak.lastDate !== today) {
      // Sinon, recommencer à 1 (sauf si déjà fait aujourd'hui)
      streak.current = 1;
    }

    streak.highest = Math.max(streak.highest, streak.current);
    streak.lastDate = today;

    await AsyncStorage.setItem(STORAGE_KEYS.GOAL_STREAK, JSON.stringify(streak));

    return streak;
  } catch (error) {
    console.error('Error updating goal streak:', error);
    return { current: 1, highest: 1 };
  }
};

/**
 * Obtient le streak d'objectifs
 */
export const getGoalStreak = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.GOAL_STREAK);
    return data ? JSON.parse(data) : { current: 0, highest: 0 };
  } catch (error) {
    console.error('Error getting goal streak:', error);
    return { current: 0, highest: 0 };
  }
};

/**
 * Obtient l'historique d'étude (7 derniers jours)
 */
export const getStudyHistory = async (days = 7) => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.DAILY_PROGRESS);
    const progress = data ? JSON.parse(data) : {};
    const goal = await getUserGoal();

    const history = [];
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
        date.getDate()
      ).padStart(2, '0')}`;

      const dayData = progress[key] || {
        date: key,
        minutesStudied: 0,
        goalReached: false,
      };

      history.push({
        ...dayData,
        dayName: getDayName(date),
        goalMinutes: goal.minutes,
        percentage: Math.min(100, Math.round((dayData.minutesStudied / goal.minutes) * 100)),
      });
    }

    return history;
  } catch (error) {
    console.error('Error getting study history:', error);
    return [];
  }
};

/**
 * Obtient le nom du jour
 */
const getDayName = (date) => {
  const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  return days[date.getDay()];
};

/**
 * Obtient les stats de la semaine
 */
export const getWeeklyStats = async () => {
  try {
    const history = await getStudyHistory(7);
    const goal = await getUserGoal();

    const totalMinutes = history.reduce((sum, day) => sum + day.minutesStudied, 0);
    const daysCompleted = history.filter((day) => day.goalReached).length;
    const averageMinutes = Math.round(totalMinutes / 7);

    return {
      totalMinutes,
      daysCompleted,
      averageMinutes,
      weeklyGoal: goal.minutes * 7,
      weeklyPercentage: Math.min(100, Math.round((totalMinutes / (goal.minutes * 7)) * 100)),
      history,
    };
  } catch (error) {
    console.error('Error getting weekly stats:', error);
    return {
      totalMinutes: 0,
      daysCompleted: 0,
      averageMinutes: 0,
      weeklyGoal: 70,
      weeklyPercentage: 0,
      history: [],
    };
  }
};

/**
 * Change l'objectif quotidien
 */
export const updateDailyGoal = async (goalId) => {
  const { saveUserGoal } = await import('./onboardingService');
  return await saveUserGoal(goalId);
};

/**
 * Obtient un message motivationnel basé sur la progression
 */
export const getMotivationalMessage = (percentage) => {
  if (percentage === 0) {
    return { emoji: '🎯', message: 'Prêt(e) à commencer ?' };
  }
  if (percentage < 25) {
    return { emoji: '🌱', message: 'Bon début, continue !' };
  }
  if (percentage < 50) {
    return { emoji: '💪', message: 'Tu avances bien !' };
  }
  if (percentage < 75) {
    return { emoji: '🔥', message: 'Plus que la moitié !' };
  }
  if (percentage < 100) {
    return { emoji: '⚡', message: 'Presque là !' };
  }
  return { emoji: '🎉', message: 'Objectif atteint !' };
};

export default {
  getDailyProgress,
  startStudySession,
  endStudySession,
  addStudyTime,
  getGoalStreak,
  getStudyHistory,
  getWeeklyStats,
  updateDailyGoal,
  getMotivationalMessage,
  GOAL_REWARDS,
  DAILY_GOALS,
};
