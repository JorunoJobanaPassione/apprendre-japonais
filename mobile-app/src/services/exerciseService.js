/**
 * Exercise Service - Gestion des exercices et validation des réponses
 * Gère MCQ, Transcription, Intruder avec scoring et feedback
 *
 * Intègre le système de feedback cognitif pour des retours personnalisés
 */

import confusionTracker from './confusionTracker';

/**
 * Types d'exercices supportés
 */
export const EXERCISE_TYPES = {
  MCQ: 'mcq',
  TRANSCRIPTION: 'transcription',
  INTRUDER: 'intruder',
  SENTENCE: 'sentence',
  DICTATION: 'dictation',
  // Nouveaux types pour les kanji
  KANJI_RECOGNITION: 'kanji_recognition',   // Quelle est la signification ?
  KANJI_READING: 'kanji_reading',           // Comment se lit ce kanji ?
  KANJI_MEANING: 'kanji_meaning',           // Que signifie ce mot ?
};

/**
 * Points gagnés par type d'exercice
 */
const POINTS = {
  MCQ: 10,
  TRANSCRIPTION: 15,
  INTRUDER: 12,
  SENTENCE: 10,
  DICTATION: 20,
  // Points pour les exercices kanji
  KANJI_RECOGNITION: 12,
  KANJI_READING: 15,
  KANJI_MEANING: 12,
};

/**
 * Normalise une chaîne pour la comparaison (romaji)
 * Enlève espaces, accents, met en minuscules
 */
export const normalizeString = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Enlever accents
    .replace(/\s+/g, ''); // Enlever espaces
};

/**
 * Vérifie si une réponse MCQ est correcte
 */
export const validateMCQ = (userAnswer, correctAnswer) => {
  return normalizeString(userAnswer) === normalizeString(correctAnswer);
};

/**
 * Vérifie si une réponse de transcription est correcte
 * Supporte les alternatives (ex: "wa" et "ha" pour は)
 */
export const validateTranscription = (userAnswer, correctAnswer, alternatives = []) => {
  const normalizedUser = normalizeString(userAnswer);
  const normalizedCorrect = normalizeString(correctAnswer);

  // Vérifier réponse exacte
  if (normalizedUser === normalizedCorrect) {
    return true;
  }

  // Vérifier alternatives
  return alternatives.some(alt => normalizeString(alt) === normalizedUser);
};

/**
 * Vérifie si une réponse "intrus" est correcte
 */
export const validateIntruder = (userAnswer, correctAnswer) => {
  return userAnswer === correctAnswer;
};

/**
 * Calcule les points gagnés pour un exercice
 */
export const calculatePoints = (exerciseType, isCorrect, streak = 0) => {
  if (!isCorrect) return 0;

  const basePoints = POINTS[exerciseType] || 10;

  // Bonus de streak (max +50%)
  const streakBonus = Math.min(streak * 0.1, 0.5);

  return Math.floor(basePoints * (1 + streakBonus));
};

/**
 * Génère un feedback approprié selon le résultat
 */
export const getFeedback = (isCorrect, exerciseType) => {
  if (isCorrect) {
    const correctMessages = [
      'Correct',
      'Exact',
      'Bien joué',
      'Parfait',
    ];
    return correctMessages[Math.floor(Math.random() * correctMessages.length)];
  } else {
    return 'Incorrect';
  }
};

/**
 * Génère un feedback enrichi avec analyse cognitive
 * @param {boolean} isCorrect - Si la réponse est correcte
 * @param {string} expected - La réponse attendue
 * @param {string} userAnswer - La réponse de l'utilisateur
 * @param {string} charType - Type de caractère (hiragana, katakana, kanji)
 * @returns {Promise<{message: string, cognitive: string|null}>}
 */
export const getEnrichedFeedback = async (isCorrect, expected, userAnswer, charType = 'unknown') => {
  const basicMessage = getFeedback(isCorrect);

  if (isCorrect) {
    return { message: basicMessage, cognitive: null };
  }

  // Tracker l'erreur et obtenir le feedback cognitif
  await confusionTracker.trackError(expected, userAnswer, charType);
  const cognitiveFeedback = await confusionTracker.getCognitiveFeedback(expected, userAnswer);

  return {
    message: basicMessage,
    cognitive: cognitiveFeedback,
    correctAnswer: expected,
  };
};

/**
 * Récupère les points faibles de l'utilisateur pour affichage
 */
export const getUserWeakPoints = async () => {
  return await confusionTracker.getWeakPoints();
};

/**
 * Mélange un tableau (Fisher-Yates shuffle)
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Prépare les exercices d'une leçon
 * Mélange les exercices et les options des MCQ
 */
export const prepareExercises = (exercises) => {
  if (!exercises || exercises.length === 0) {
    return [];
  }

  // Mélanger les exercices
  const shuffledExercises = shuffleArray(exercises);

  // Pour chaque MCQ, mélanger les options
  return shuffledExercises.map(exercise => {
    if (exercise.type === EXERCISE_TYPES.MCQ && exercise.options) {
      return {
        ...exercise,
        options: shuffleArray(exercise.options),
      };
    }
    return exercise;
  });
};

/**
 * Valide une réponse selon le type d'exercice
 */
export const validateAnswer = (exercise, userAnswer) => {
  switch (exercise.type) {
    case EXERCISE_TYPES.MCQ:
      return validateMCQ(userAnswer, exercise.correct);

    case EXERCISE_TYPES.TRANSCRIPTION:
      return validateTranscription(
        userAnswer,
        exercise.correct,
        exercise.alternatives || []
      );

    case EXERCISE_TYPES.INTRUDER:
      return validateIntruder(userAnswer, exercise.correct);

    case EXERCISE_TYPES.SENTENCE:
    case EXERCISE_TYPES.DICTATION:
      return validateTranscription(
        userAnswer,
        exercise.correct,
        exercise.alternatives || []
      );

    // Exercices Kanji (tous MCQ-like)
    case EXERCISE_TYPES.KANJI_RECOGNITION:
    case EXERCISE_TYPES.KANJI_READING:
    case EXERCISE_TYPES.KANJI_MEANING:
      return validateMCQ(userAnswer, exercise.correct);

    default:
      console.warn(`Unknown exercise type: ${exercise.type}`);
      return false;
  }
};

/**
 * Calcule les statistiques de session
 */
export const calculateSessionStats = (results) => {
  const total = results.length;
  const correct = results.filter(r => r.isCorrect).length;
  const incorrect = total - correct;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
  const totalPoints = results.reduce((sum, r) => sum + (r.points || 0), 0);

  return {
    total,
    correct,
    incorrect,
    accuracy,
    totalPoints,
  };
};

/**
 * Détermine si l'utilisateur perd une vie (sur 3 erreurs consécutives)
 */
export const shouldLoseLife = (recentResults, threshold = 3) => {
  if (recentResults.length < threshold) {
    return false;
  }

  // Vérifier les X dernières réponses
  const lastAnswers = recentResults.slice(-threshold);
  const allIncorrect = lastAnswers.every(result => !result.isCorrect);

  return allIncorrect;
};

/**
 * Service d'export par défaut
 */
export default {
  EXERCISE_TYPES,
  normalizeString,
  validateMCQ,
  validateTranscription,
  validateIntruder,
  validateAnswer,
  calculatePoints,
  getFeedback,
  getEnrichedFeedback,
  getUserWeakPoints,
  shuffleArray,
  prepareExercises,
  calculateSessionStats,
  shouldLoseLife,
};
