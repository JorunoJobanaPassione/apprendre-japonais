/**
 * Confusion Tracker - Système de feedback cognitif
 *
 * Track les erreurs de l'utilisateur pour identifier les confusions fréquentes
 * et générer des feedbacks personnalisés comme "Tu confonds souvent し et ち"
 *
 * PHILOSOPHIE: Aider l'utilisateur à comprendre SES erreurs spécifiques
 * plutôt que de simplement dire "Incorrect"
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'confusion_tracker';
const MAX_HISTORY = 200; // Garder les 200 dernières erreurs

/**
 * Structure des données stockées:
 * {
 *   errors: [
 *     { expected: 'し', userAnswer: 'ち', timestamp: 123456, type: 'hiragana' },
 *     ...
 *   ],
 *   confusions: {
 *     'し_ち': { count: 5, lastSeen: 123456 },
 *     'は_ほ': { count: 3, lastSeen: 123456 },
 *     ...
 *   }
 * }
 */

/**
 * Confusions connues en japonais (pour enrichir les messages)
 */
const KNOWN_CONFUSIONS = {
  // Hiragana visuellement similaires
  'し_ち': { reason: 'forme similaire avec une courbe' },
  'は_ほ': { reason: 'même base avec variation' },
  'ね_れ': { reason: 'boucle similaire' },
  'め_ぬ': { reason: 'forme arrondie similaire' },
  'わ_れ': { reason: 'structure proche' },
  'る_ろ': { reason: 'même début, fin différente' },
  'あ_お': { reason: 'voyelles avec boucle' },
  'さ_き': { reason: 'traits horizontaux similaires' },

  // Katakana visuellement similaires
  'シ_ツ': { reason: 'orientation des traits' },
  'ソ_ン': { reason: 'angle des traits' },
  'ウ_ワ': { reason: 'forme du haut' },
  'ク_タ': { reason: 'angle similaire' },

  // Confusions romaji
  'tsu_su': { reason: 'prononciation proche' },
  'shi_si': { reason: 'romanisation alternative' },
  'chi_ti': { reason: 'romanisation alternative' },
  'fu_hu': { reason: 'romanisation alternative' },
};

/**
 * Récupère les données de confusion
 */
const getConfusionData = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { errors: [], confusions: {} };
  } catch (error) {
    console.error('Error getting confusion data:', error);
    return { errors: [], confusions: {} };
  }
};

/**
 * Sauvegarde les données de confusion
 */
const saveConfusionData = async (data) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving confusion data:', error);
  }
};

/**
 * Génère une clé de confusion normalisée (toujours dans le même ordre)
 */
const getConfusionKey = (char1, char2) => {
  return [char1, char2].sort().join('_');
};

/**
 * Enregistre une erreur
 * @param {string} expected - La réponse attendue
 * @param {string} userAnswer - La réponse de l'utilisateur
 * @param {string} type - Type de caractère (hiragana, katakana, kanji, romaji)
 */
export const trackError = async (expected, userAnswer, type = 'unknown') => {
  if (!expected || !userAnswer || expected === userAnswer) return;

  const data = await getConfusionData();
  const timestamp = Date.now();

  // Ajouter l'erreur à l'historique
  data.errors.push({
    expected,
    userAnswer,
    timestamp,
    type,
  });

  // Limiter la taille de l'historique
  if (data.errors.length > MAX_HISTORY) {
    data.errors = data.errors.slice(-MAX_HISTORY);
  }

  // Mettre à jour le compteur de confusion
  const key = getConfusionKey(expected, userAnswer);
  if (!data.confusions[key]) {
    data.confusions[key] = { count: 0, lastSeen: 0, chars: [expected, userAnswer] };
  }
  data.confusions[key].count++;
  data.confusions[key].lastSeen = timestamp;

  await saveConfusionData(data);

  return data.confusions[key];
};

/**
 * Récupère les confusions les plus fréquentes
 * @param {number} limit - Nombre max de confusions à retourner
 */
export const getTopConfusions = async (limit = 5) => {
  const data = await getConfusionData();

  return Object.entries(data.confusions)
    .map(([key, value]) => ({
      key,
      ...value,
      knownReason: KNOWN_CONFUSIONS[key]?.reason || null,
    }))
    .filter(c => c.count >= 2) // Au moins 2 occurrences
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

/**
 * Génère un message de feedback cognitif personnalisé
 * @param {string} expected - La réponse attendue
 * @param {string} userAnswer - La réponse de l'utilisateur
 */
export const getCognitiveFeedback = async (expected, userAnswer) => {
  if (!expected || !userAnswer) return null;

  const data = await getConfusionData();
  const key = getConfusionKey(expected, userAnswer);
  const confusion = data.confusions[key];

  if (!confusion || confusion.count < 2) {
    return null; // Pas assez de données
  }

  const knownInfo = KNOWN_CONFUSIONS[key];

  // Générer le message
  if (confusion.count >= 5) {
    // Confusion très fréquente
    if (knownInfo) {
      return `⚠️ Tu confonds souvent ${expected} et ${userAnswer} (${knownInfo.reason})`;
    }
    return `⚠️ Tu confonds souvent ${expected} et ${userAnswer}`;
  } else if (confusion.count >= 2) {
    // Confusion occasionnelle
    return `💡 Attention : ${expected} ≠ ${userAnswer}`;
  }

  return null;
};

/**
 * Récupère un résumé des points faibles de l'utilisateur
 */
export const getWeakPoints = async () => {
  const topConfusions = await getTopConfusions(3);

  if (topConfusions.length === 0) {
    return null;
  }

  return {
    title: 'Points à travailler',
    confusions: topConfusions.map(c => ({
      chars: c.chars,
      count: c.count,
      reason: c.knownReason,
      message: `${c.chars[0]} / ${c.chars[1]}` + (c.knownReason ? ` (${c.knownReason})` : ''),
    })),
  };
};

/**
 * Récupère des statistiques de confusion pour le profil
 */
export const getConfusionStats = async () => {
  const data = await getConfusionData();

  const totalErrors = data.errors.length;
  const uniqueConfusions = Object.keys(data.confusions).length;
  const frequentConfusions = Object.values(data.confusions).filter(c => c.count >= 3).length;

  return {
    totalErrors,
    uniqueConfusions,
    frequentConfusions,
    topConfusions: await getTopConfusions(3),
  };
};

/**
 * Réinitialise les données de confusion (pour debug)
 */
export const resetConfusionData = async () => {
  await AsyncStorage.removeItem(STORAGE_KEY);
};

export default {
  trackError,
  getTopConfusions,
  getCognitiveFeedback,
  getWeakPoints,
  getConfusionStats,
  resetConfusionData,
};
