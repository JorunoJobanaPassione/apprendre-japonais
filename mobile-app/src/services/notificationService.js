/**
 * Notification Service - Push Notifications pour la rétention
 *
 * IMPACT RETENTION: Les notifications augmentent la rétention D7 de 40%+
 *
 * Types de notifications:
 * - Streak en danger (23h sans activité)
 * - Rappel quotidien (heure personnalisée)
 * - Nouveau défi disponible
 * - Badge presque débloqué
 * - Inactivité (après 3 jours)
 *
 * INSTALLATION REQUISE:
 * npx expo install expo-notifications expo-device expo-constants
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Essayer d'importer expo-notifications (peut échouer si pas installé)
let Notifications = null;
let Device = null;

try {
  Notifications = require('expo-notifications');
  Device = require('expo-device');
} catch (e) {
  console.log('expo-notifications not installed. Run: npx expo install expo-notifications expo-device');
}

const STORAGE_KEYS = {
  NOTIFICATION_SETTINGS: 'notification_settings',
  PUSH_TOKEN: 'push_token',
  LAST_NOTIFICATION: 'last_notification',
  SCHEDULED_NOTIFICATIONS: 'scheduled_notifications',
};

// Configuration par défaut
export const DEFAULT_SETTINGS = {
  enabled: true,
  streakReminder: true,
  dailyReminder: true,
  dailyReminderTime: { hour: 19, minute: 0 }, // 19h00 par défaut
  inactivityReminder: true,
  badgeAlerts: true,
  soundEnabled: true,
};

// Types de notifications
export const NOTIFICATION_TYPES = {
  STREAK_DANGER: 'streak_danger',
  DAILY_REMINDER: 'daily_reminder',
  NEW_CHALLENGE: 'new_challenge',
  BADGE_PROGRESS: 'badge_progress',
  INACTIVITY: 'inactivity',
  LEVEL_UP: 'level_up',
  WELCOME_BACK: 'welcome_back',
};

// Messages de notifications
const NOTIFICATION_MESSAGES = {
  [NOTIFICATION_TYPES.STREAK_DANGER]: {
    title: '🔥 Ton streak est en danger !',
    body: 'Plus que quelques heures pour maintenir ton streak de {streak} jours !',
  },
  [NOTIFICATION_TYPES.DAILY_REMINDER]: {
    titles: [
      '🇯🇵 C\'est l\'heure du japonais !',
      '📚 Ta leçon quotidienne t\'attend',
      '⭐ 5 minutes pour progresser ?',
      '🎯 Objectif du jour : apprendre !',
    ],
    bodies: [
      'Quelques minutes suffisent pour progresser.',
      'Garde ton streak vivant !',
      'Ton cerveau te remerciera.',
      'Les petits pas font les grands voyages.',
    ],
  },
  [NOTIFICATION_TYPES.NEW_CHALLENGE]: {
    title: '🎌 Nouveau défi disponible !',
    body: 'Découvre le proverbe japonais du jour.',
  },
  [NOTIFICATION_TYPES.BADGE_PROGRESS]: {
    title: '🏆 Badge presque débloqué !',
    body: 'Plus que {remaining} pour débloquer "{badge}" !',
  },
  [NOTIFICATION_TYPES.INACTIVITY]: {
    title: '👋 Tu nous manques !',
    body: 'Ça fait {days} jours... Reviens apprendre le japonais !',
  },
  [NOTIFICATION_TYPES.WELCOME_BACK]: {
    title: '🎉 Content de te revoir !',
    body: 'Prêt(e) à reprendre ton apprentissage ?',
  },
};

/**
 * Configure les handlers de notifications
 */
export const configureNotifications = () => {
  if (!Notifications) {
    console.warn('Notifications not available');
    return;
  }

  // Handler pour les notifications reçues en foreground
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
};

/**
 * Demande la permission pour les notifications
 */
export const requestPermissions = async () => {
  if (!Notifications || !Device) {
    return { granted: false, reason: 'not_installed' };
  }

  // Vérifier si on est sur un vrai device
  if (!Device.isDevice) {
    return { granted: false, reason: 'simulator' };
  }

  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return { granted: false, reason: 'denied' };
    }

    // Récupérer le push token
    const token = await Notifications.getExpoPushTokenAsync();
    await AsyncStorage.setItem(STORAGE_KEYS.PUSH_TOKEN, token.data);

    return { granted: true, token: token.data };
  } catch (error) {
    console.error('Error requesting notification permissions:', error);
    return { granted: false, reason: 'error', error: error.message };
  }
};

/**
 * Récupère les paramètres de notification
 */
export const getNotificationSettings = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATION_SETTINGS);
    if (data) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(data) };
    }
    return DEFAULT_SETTINGS;
  } catch (error) {
    console.error('Error getting notification settings:', error);
    return DEFAULT_SETTINGS;
  }
};

/**
 * Sauvegarde les paramètres de notification
 */
export const saveNotificationSettings = async (settings) => {
  try {
    const newSettings = { ...DEFAULT_SETTINGS, ...settings };
    await AsyncStorage.setItem(
      STORAGE_KEYS.NOTIFICATION_SETTINGS,
      JSON.stringify(newSettings)
    );

    // Reprogrammer les notifications avec les nouveaux paramètres
    await scheduleAllNotifications();

    return { success: true, settings: newSettings };
  } catch (error) {
    console.error('Error saving notification settings:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Programme une notification locale
 */
export const scheduleNotification = async (type, data = {}, trigger = null) => {
  if (!Notifications) {
    console.warn('Notifications not available');
    return null;
  }

  const settings = await getNotificationSettings();
  if (!settings.enabled) return null;

  try {
    const message = NOTIFICATION_MESSAGES[type];
    if (!message) return null;

    let title = message.title;
    let body = message.body;

    // Messages aléatoires pour le rappel quotidien
    if (type === NOTIFICATION_TYPES.DAILY_REMINDER) {
      const titleIndex = Math.floor(Math.random() * message.titles.length);
      const bodyIndex = Math.floor(Math.random() * message.bodies.length);
      title = message.titles[titleIndex];
      body = message.bodies[bodyIndex];
    }

    // Remplacer les placeholders
    if (data.streak) {
      body = body.replace('{streak}', data.streak);
    }
    if (data.remaining) {
      body = body.replace('{remaining}', data.remaining);
    }
    if (data.badge) {
      body = body.replace('{badge}', data.badge);
    }
    if (data.days) {
      body = body.replace('{days}', data.days);
    }

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: settings.soundEnabled,
        data: { type, ...data },
      },
      trigger: trigger || null, // null = immédiat
    });

    return notificationId;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    return null;
  }
};

/**
 * Programme le rappel quotidien
 */
export const scheduleDailyReminder = async () => {
  if (!Notifications) return null;

  const settings = await getNotificationSettings();
  if (!settings.enabled || !settings.dailyReminder) return null;

  try {
    // Annuler l'ancien rappel
    await cancelNotificationsByType(NOTIFICATION_TYPES.DAILY_REMINDER);

    const { hour, minute } = settings.dailyReminderTime;

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: NOTIFICATION_MESSAGES[NOTIFICATION_TYPES.DAILY_REMINDER].titles[0],
        body: NOTIFICATION_MESSAGES[NOTIFICATION_TYPES.DAILY_REMINDER].bodies[0],
        sound: settings.soundEnabled,
        data: { type: NOTIFICATION_TYPES.DAILY_REMINDER },
      },
      trigger: {
        hour,
        minute,
        repeats: true,
      },
    });

    // Sauvegarder l'ID
    await saveScheduledNotification(NOTIFICATION_TYPES.DAILY_REMINDER, notificationId);

    return notificationId;
  } catch (error) {
    console.error('Error scheduling daily reminder:', error);
    return null;
  }
};

/**
 * Programme la notification de streak en danger
 * À appeler après chaque session d'étude
 */
export const scheduleStreakDangerNotification = async (currentStreak) => {
  if (!Notifications) return null;

  const settings = await getNotificationSettings();
  if (!settings.enabled || !settings.streakReminder) return null;

  try {
    // Annuler l'ancienne notification
    await cancelNotificationsByType(NOTIFICATION_TYPES.STREAK_DANGER);

    // Programmer pour 23h après maintenant (1h avant minuit)
    const trigger = new Date();
    trigger.setHours(23, 0, 0, 0);

    // Si on est déjà après 23h, programmer pour demain
    if (new Date() >= trigger) {
      trigger.setDate(trigger.getDate() + 1);
    }

    const notificationId = await scheduleNotification(
      NOTIFICATION_TYPES.STREAK_DANGER,
      { streak: currentStreak },
      { date: trigger }
    );

    await saveScheduledNotification(NOTIFICATION_TYPES.STREAK_DANGER, notificationId);

    return notificationId;
  } catch (error) {
    console.error('Error scheduling streak danger notification:', error);
    return null;
  }
};

/**
 * Programme une notification d'inactivité
 * À appeler au lancement de l'app
 */
export const scheduleInactivityNotification = async () => {
  if (!Notifications) return null;

  const settings = await getNotificationSettings();
  if (!settings.enabled || !settings.inactivityReminder) return null;

  try {
    // Annuler l'ancienne
    await cancelNotificationsByType(NOTIFICATION_TYPES.INACTIVITY);

    // Programmer pour dans 3 jours
    const trigger = new Date();
    trigger.setDate(trigger.getDate() + 3);
    trigger.setHours(18, 0, 0, 0);

    const notificationId = await scheduleNotification(
      NOTIFICATION_TYPES.INACTIVITY,
      { days: 3 },
      { date: trigger }
    );

    await saveScheduledNotification(NOTIFICATION_TYPES.INACTIVITY, notificationId);

    return notificationId;
  } catch (error) {
    console.error('Error scheduling inactivity notification:', error);
    return null;
  }
};

/**
 * Programme toutes les notifications
 */
export const scheduleAllNotifications = async () => {
  await scheduleDailyReminder();
  await scheduleInactivityNotification();
};

/**
 * Annule une notification par ID
 */
export const cancelNotification = async (notificationId) => {
  if (!Notifications) return;

  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  } catch (error) {
    console.error('Error canceling notification:', error);
  }
};

/**
 * Annule toutes les notifications d'un type
 */
export const cancelNotificationsByType = async (type) => {
  try {
    const scheduled = await getScheduledNotifications();
    const notificationId = scheduled[type];

    if (notificationId) {
      await cancelNotification(notificationId);
      delete scheduled[type];
      await AsyncStorage.setItem(
        STORAGE_KEYS.SCHEDULED_NOTIFICATIONS,
        JSON.stringify(scheduled)
      );
    }
  } catch (error) {
    console.error('Error canceling notifications by type:', error);
  }
};

/**
 * Annule toutes les notifications
 */
export const cancelAllNotifications = async () => {
  if (!Notifications) return;

  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await AsyncStorage.removeItem(STORAGE_KEYS.SCHEDULED_NOTIFICATIONS);
  } catch (error) {
    console.error('Error canceling all notifications:', error);
  }
};

/**
 * Sauvegarde une notification programmée
 */
const saveScheduledNotification = async (type, notificationId) => {
  try {
    const scheduled = await getScheduledNotifications();
    scheduled[type] = notificationId;
    await AsyncStorage.setItem(
      STORAGE_KEYS.SCHEDULED_NOTIFICATIONS,
      JSON.stringify(scheduled)
    );
  } catch (error) {
    console.error('Error saving scheduled notification:', error);
  }
};

/**
 * Récupère les notifications programmées
 */
const getScheduledNotifications = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.SCHEDULED_NOTIFICATIONS);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error getting scheduled notifications:', error);
    return {};
  }
};

/**
 * Envoie une notification immédiate (pour tests)
 */
export const sendTestNotification = async () => {
  return await scheduleNotification(NOTIFICATION_TYPES.DAILY_REMINDER);
};

/**
 * Vérifie si les notifications sont disponibles
 */
export const isNotificationAvailable = () => {
  return Notifications !== null;
};

/**
 * Obtient le statut des permissions
 */
export const getPermissionStatus = async () => {
  if (!Notifications) {
    return { status: 'unavailable' };
  }

  try {
    const { status } = await Notifications.getPermissionsAsync();
    return { status };
  } catch (error) {
    return { status: 'error', error: error.message };
  }
};

export default {
  configureNotifications,
  requestPermissions,
  getNotificationSettings,
  saveNotificationSettings,
  scheduleNotification,
  scheduleDailyReminder,
  scheduleStreakDangerNotification,
  scheduleInactivityNotification,
  scheduleAllNotifications,
  cancelNotification,
  cancelNotificationsByType,
  cancelAllNotifications,
  sendTestNotification,
  isNotificationAvailable,
  getPermissionStatus,
  DEFAULT_SETTINGS,
  NOTIFICATION_TYPES,
};
