/**
 * SRS System - Spaced Repetition System (Algorithme SM-2)
 * Système de mémorisation espacée pour optimiser l'apprentissage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORTANT: Cette clé doit être cohérente avec storage.js
const STORAGE_KEY = 'srs_cards_v1';

// Facteurs de difficulté selon la réponse
const DIFFICULTY_FACTORS = {
  AGAIN: 0, // Oublié
  HARD: 1, // Difficile
  GOOD: 2, // Bien
  EASY: 3, // Facile
  PERFECT: 4, // Parfait
};

/**
 * Structure d'une carte SRS
 * {
 *   id: string,
 *   character: string,
 *   romaji: string,
 *   meaning: string,
 *   type: 'hiragana' | 'katakana' | 'kanji',
 *   easinessFactor: number (2.5 par défaut),
 *   interval: number (jours),
 *   repetitions: number,
 *   nextReview: timestamp,
 *   lastReview: timestamp,
 *   created: timestamp,
 *   totalReviews: number,
 *   correctStreak: number,
 * }
 */

/**
 * Récupère toutes les cartes SRS
 */
export const getAllCards = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting SRS cards:', error);
    return [];
  }
};

/**
 * Sauvegarde toutes les cartes SRS
 */
export const saveAllCards = async (cards) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  } catch (error) {
    console.error('Error saving SRS cards:', error);
  }
};

/**
 * Ajoute une nouvelle carte SRS
 */
export const addCard = async (character, romaji, meaning, type) => {
  const cards = await getAllCards();

  // Vérifier si la carte existe déjà
  const existing = cards.find(
    (card) => card.character === character && card.type === type
  );
  if (existing) {
    return existing;
  }

  const newCard = {
    id: `${type}_${character}_${Date.now()}`,
    character,
    romaji,
    meaning: meaning || '',
    type,
    easinessFactor: 2.5,
    interval: 0,
    repetitions: 0,
    nextReview: Date.now(),
    lastReview: null,
    created: Date.now(),
    totalReviews: 0,
    correctStreak: 0,
  };

  cards.push(newCard);
  await saveAllCards(cards);
  return newCard;
};

/**
 * Ajoute plusieurs cartes depuis une leçon
 */
export const addCardsFromLesson = async (lesson) => {
  const cards = [];

  if (lesson.characters && lesson.characters.length > 0) {
    for (const char of lesson.characters) {
      const type = lesson.category; // 'hiragana', 'katakana', etc.
      const character = char.hiragana || char.katakana || char.kanji;
      const card = await addCard(
        character,
        char.romaji,
        char.meaning || '',
        type
      );
      cards.push(card);
    }
  }

  return cards;
};

/**
 * Calcule la prochaine révision selon l'algorithme SM-2
 * @param {object} card - La carte actuelle
 * @param {number} difficulty - 0=Again, 1=Hard, 2=Good, 3=Easy, 4=Perfect
 */
export const calculateNextReview = (card, difficulty) => {
  let { easinessFactor, interval, repetitions } = card;

  // Réponse incorrecte (Again)
  if (difficulty === DIFFICULTY_FACTORS.AGAIN) {
    interval = 0;
    repetitions = 0;
    easinessFactor = Math.max(1.3, easinessFactor - 0.2);
  } else {
    // Ajuster l'easinessFactor selon la difficulté
    const qualityFactor = difficulty - 3; // -3 à +1
    easinessFactor = Math.max(
      1.3,
      easinessFactor + (0.1 - qualityFactor * (0.08 + qualityFactor * 0.02))
    );

    // Calculer le nouvel intervalle
    if (repetitions === 0) {
      interval = 1; // 1 jour
    } else if (repetitions === 1) {
      interval = 6; // 6 jours
    } else {
      interval = Math.round(interval * easinessFactor);
    }

    repetitions += 1;
  }

  // Calculer la date de prochaine révision
  const nextReview = Date.now() + interval * 24 * 60 * 60 * 1000;

  return {
    easinessFactor,
    interval,
    repetitions,
    nextReview,
  };
};

/**
 * Met à jour une carte après révision
 */
export const reviewCard = async (cardId, difficulty) => {
  const cards = await getAllCards();
  const cardIndex = cards.findIndex((c) => c.id === cardId);

  if (cardIndex === -1) {
    return null;
  }

  const card = cards[cardIndex];
  const updates = calculateNextReview(card, difficulty);

  // Mettre à jour la carte
  cards[cardIndex] = {
    ...card,
    ...updates,
    lastReview: Date.now(),
    totalReviews: card.totalReviews + 1,
    correctStreak:
      difficulty === DIFFICULTY_FACTORS.AGAIN ? 0 : card.correctStreak + 1,
  };

  await saveAllCards(cards);
  return cards[cardIndex];
};

/**
 * Récupère les cartes à réviser aujourd'hui
 */
export const getDueCards = async () => {
  const cards = await getAllCards();
  const now = Date.now();

  return cards
    .filter((card) => card.nextReview <= now)
    .sort((a, b) => a.nextReview - b.nextReview);
};

/**
 * Alias de getDueCards pour compatibilité
 */
export const getCardsForReview = getDueCards;

/**
 * Récupère les nouvelles cartes (jamais révisées)
 */
export const getNewCards = async (limit = 10) => {
  const cards = await getAllCards();

  return cards
    .filter((card) => card.totalReviews === 0)
    .slice(0, limit)
    .sort((a, b) => a.created - b.created);
};

/**
 * Obtient les statistiques SRS
 */
export const getSRSStats = async () => {
  const cards = await getAllCards();
  const now = Date.now();

  const total = cards.length;
  const dueToday = cards.filter((card) => card.nextReview <= now).length;
  const newCards = cards.filter((card) => card.totalReviews === 0).length;
  const learning = cards.filter(
    (card) => card.totalReviews > 0 && card.interval < 21
  ).length;
  const mature = cards.filter((card) => card.interval >= 21).length;

  const totalReviews = cards.reduce((sum, card) => sum + card.totalReviews, 0);
  const avgEasiness =
    cards.length > 0
      ? cards.reduce((sum, card) => sum + card.easinessFactor, 0) / cards.length
      : 2.5;

  return {
    total,
    dueToday,
    newCards,
    learning,
    mature,
    totalReviews,
    avgEasiness: Math.round(avgEasiness * 100) / 100,
  };
};

/**
 * Obtient les cartes par catégorie
 */
export const getCardsByType = async (type) => {
  const cards = await getAllCards();
  return cards.filter((card) => card.type === type);
};

/**
 * Supprime une carte
 */
export const deleteCard = async (cardId) => {
  const cards = await getAllCards();
  const filtered = cards.filter((card) => card.id !== cardId);
  await saveAllCards(filtered);
};

/**
 * Réinitialise toutes les cartes
 */
export const resetAllCards = async () => {
  await AsyncStorage.removeItem(STORAGE_KEY);
};

/**
 * Obtient les cartes les plus difficiles
 */
export const getHardestCards = async (limit = 10) => {
  const cards = await getAllCards();

  return cards
    .filter((card) => card.totalReviews > 0)
    .sort((a, b) => a.easinessFactor - b.easinessFactor)
    .slice(0, limit);
};

/**
 * Obtient les cartes avec le plus long streak
 */
export const getTopStreakCards = async (limit = 10) => {
  const cards = await getAllCards();

  return cards
    .filter((card) => card.correctStreak > 0)
    .sort((a, b) => b.correctStreak - a.correctStreak)
    .slice(0, limit);
};

export default {
  DIFFICULTY_FACTORS,
  getAllCards,
  saveAllCards,
  addCard,
  addCardsFromLesson,
  calculateNextReview,
  reviewCard,
  getDueCards,
  getCardsForReview,
  getNewCards,
  getSRSStats,
  getCardsByType,
  deleteCard,
  resetAllCards,
  getHardestCards,
  getTopStreakCards,
};
