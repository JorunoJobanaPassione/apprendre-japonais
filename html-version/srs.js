/**
 * 🧠 SRS - Spaced Repetition System
 * Algorithme SM-2 (SuperMemo 2) pour optimiser la mémorisation
 *
 * Principe : Revoir les cartes au moment optimal pour maximiser la rétention
 * - Facile : Intervalle x2.5
 * - Moyen : Intervalle x1.2
 * - Difficile : Intervalle réinitialisé
 */

const SRS = {
  // Configuration par défaut
  config: {
    // Intervalles initiaux (en minutes/jours)
    initialInterval: 1,        // 1 jour pour la première review
    easyBonus: 1.3,            // Bonus si "facile"
    minInterval: 1,            // Minimum 1 jour entre reviews
    maxInterval: 365,          // Maximum 1 an

    // Facteurs de facilité (ease factor)
    defaultEase: 2.5,          // Facilité par défaut
    minEase: 1.3,              // Facilité minimum

    // Seuils de maturité
    matureThreshold: 21,       // Carte "mature" après 21 jours
    leechThreshold: 8          // Carte "difficile" après 8 échecs
  },

  /**
   * Initialiser une nouvelle carte pour le SRS
   */
  initCard: function(character, type = 'hiragana') {
    return {
      character: character,      // Le caractère (あ, ア, 日, etc.)
      type: type,               // hiragana, katakana, kanji

      // Données SRS
      interval: 0,              // Intervalle actuel (jours)
      easeFactor: this.config.defaultEase,  // Facteur de facilité
      repetitions: 0,           // Nombre de répétitions réussies

      // Historique
      lastReview: null,         // Timestamp de la dernière review
      nextReview: Date.now(),   // Timestamp de la prochaine review (maintenant pour nouveau)

      // Stats
      totalReviews: 0,          // Nombre total de reviews
      correctCount: 0,          // Nombre de réponses correctes
      incorrectCount: 0,        // Nombre de réponses incorrectes

      // État
      isNew: true,              // Nouvelle carte
      isMature: false,          // Carte mature (>21 jours)
      isLeech: false,           // Carte difficile (>8 échecs)

      // Métadonnées
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
  },

  /**
   * Calculer le prochain intervalle selon l'algorithme SM-2
   * @param {Object} card - Carte à mettre à jour
   * @param {Number} quality - Qualité de la réponse (0-5)
   *   0 = Échec total
   *   1 = Échec, mais je me souviens un peu
   *   2 = Difficile, erreur importante
   *   3 = Difficile, erreur mineure
   *   4 = Moyen, correcte avec hésitation
   *   5 = Facile, parfait
   * @returns {Object} Carte mise à jour
   */
  updateCard: function(card, quality) {
    const now = Date.now();

    // Mise à jour des stats
    card.totalReviews++;
    card.lastReview = now;
    card.isNew = false;
    card.updatedAt = now;

    if (quality >= 3) {
      card.correctCount++;
    } else {
      card.incorrectCount++;
    }

    // Algorithme SM-2
    if (quality < 3) {
      // Échec : réinitialiser
      card.interval = 1;
      card.repetitions = 0;

      // Réduire la facilité
      card.easeFactor = Math.max(
        this.config.minEase,
        card.easeFactor - 0.2
      );

      // Vérifier si c'est une leech
      if (card.incorrectCount >= this.config.leechThreshold) {
        card.isLeech = true;
      }
    } else {
      // Succès : augmenter l'intervalle
      card.repetitions++;

      // Ajuster la facilité
      const easeAdjustment = 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02);
      card.easeFactor = Math.max(
        this.config.minEase,
        card.easeFactor + easeAdjustment
      );

      // Calculer le nouvel intervalle
      if (card.repetitions === 1) {
        card.interval = 1;
      } else if (card.repetitions === 2) {
        card.interval = 6;
      } else {
        card.interval = Math.round(card.interval * card.easeFactor);
      }

      // Bonus "facile"
      if (quality === 5) {
        card.interval = Math.round(card.interval * this.config.easyBonus);
      }

      // Limites
      card.interval = Math.max(this.config.minInterval, card.interval);
      card.interval = Math.min(this.config.maxInterval, card.interval);

      // Vérifier si mature
      if (card.interval >= this.config.matureThreshold) {
        card.isMature = true;
      }
    }

    // Calculer la prochaine review (timestamp)
    card.nextReview = now + (card.interval * 24 * 60 * 60 * 1000);

    // 🆕 Déclencher événement pour le système de récupération de vies
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('srsReviewCompleted', {
        detail: {
          isCorrect: quality >= 3,
          quality: quality,
          character: card.character,
          type: card.type
        }
      }));
    }

    return card;
  },

  /**
   * Obtenir les cartes à réviser maintenant
   * @param {Array} cards - Toutes les cartes
   * @returns {Array} Cartes à réviser
   */
  getDueCards: function(cards) {
    const now = Date.now();
    return cards.filter(card => card.nextReview <= now);
  },

  /**
   * Obtenir les stats globales
   * @param {Array} cards - Toutes les cartes
   * @returns {Object} Statistiques
   */
  getStats: function(cards) {
    const now = Date.now();

    const stats = {
      total: cards.length,
      new: 0,
      learning: 0,
      young: 0,      // < 21 jours
      mature: 0,     // >= 21 jours
      leeches: 0,
      dueToday: 0,
      dueThisWeek: 0,
      accuracy: 0
    };

    let totalCorrect = 0;
    let totalIncorrect = 0;
    const oneWeek = 7 * 24 * 60 * 60 * 1000;

    cards.forEach(card => {
      if (card.isNew) {
        stats.new++;
      } else if (card.interval < 21) {
        stats.learning++;
        if (card.interval >= 7) {
          stats.young++;
        }
      } else {
        stats.mature++;
      }

      if (card.isLeech) {
        stats.leeches++;
      }

      if (card.nextReview <= now) {
        stats.dueToday++;
      }

      if (card.nextReview <= now + oneWeek) {
        stats.dueThisWeek++;
      }

      totalCorrect += card.correctCount;
      totalIncorrect += card.incorrectCount;
    });

    const totalReviews = totalCorrect + totalIncorrect;
    stats.accuracy = totalReviews > 0 ? Math.round((totalCorrect / totalReviews) * 100) : 0;

    return stats;
  },

  /**
   * Simuler les prochaines reviews pour prédiction
   * @param {Object} card - Carte
   * @param {Number} quality - Qualité supposée (3-5)
   * @returns {Array} Prochaines dates de review
   */
  predictNextReviews: function(card, quality = 4) {
    const predictions = [];
    let tempCard = { ...card };

    for (let i = 0; i < 5; i++) {
      tempCard = this.updateCard(tempCard, quality);
      predictions.push({
        interval: tempCard.interval,
        date: new Date(tempCard.nextReview),
        easeFactor: tempCard.easeFactor.toFixed(2)
      });
    }

    return predictions;
  },

  /**
   * Obtenir le texte descriptif de l'intervalle
   * @param {Number} days - Nombre de jours
   * @returns {String} Description
   */
  getIntervalText: function(days) {
    if (days < 1) {
      return "< 1 jour";
    } else if (days === 1) {
      return "1 jour";
    } else if (days < 30) {
      return `${days} jours`;
    } else if (days < 365) {
      const months = Math.round(days / 30);
      return `${months} mois`;
    } else {
      const years = Math.round(days / 365);
      return `${years} an${years > 1 ? 's' : ''}`;
    }
  },

  /**
   * Importer des cartes depuis les erreurs enregistrées
   * @param {Array} mistakes - Erreurs du storage
   * @returns {Array} Cartes SRS
   */
  importFromMistakes: function(mistakes) {
    const cards = [];
    const now = Date.now();

    mistakes.forEach(mistake => {
      const card = this.initCard(mistake.character, mistake.type || 'hiragana');

      // Simuler l'historique basé sur les erreurs
      card.incorrectCount = mistake.count || 1;
      card.totalReviews = mistake.count || 1;
      card.lastReview = mistake.lastError || now;
      card.isNew = false;

      // Si beaucoup d'erreurs, marquer comme leech
      if (card.incorrectCount >= this.config.leechThreshold) {
        card.isLeech = true;
      }

      // Intervalle court pour les erreurs récentes
      card.interval = 1;
      card.nextReview = now; // À réviser maintenant

      cards.push(card);
    });

    return cards;
  },

  /**
   * Exporter les cartes pour sauvegarde
   * @param {Array} cards - Cartes SRS
   * @returns {String} JSON compressé
   */
  export: function(cards) {
    return JSON.stringify(cards);
  },

  /**
   * Importer les cartes depuis sauvegarde
   * @param {String} json - JSON des cartes
   * @returns {Array} Cartes SRS
   */
  import: function(json) {
    try {
      return JSON.parse(json);
    } catch (e) {
      console.error('Erreur import SRS:', e);
      return [];
    }
  }
};

// Exposition globale
if (typeof window !== 'undefined') {
  window.SRS = SRS;
}

// Export pour Node.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SRS;
}
