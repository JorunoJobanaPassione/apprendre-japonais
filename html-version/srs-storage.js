/**
 * 💾 SRS Storage - Gestion du stockage des cartes SRS
 * Utilise localStorage pour persister les données
 */

const SRSStorage = {
  STORAGE_KEY: 'srs_cards_v1',
  INITIALIZED_KEY: 'srs_initialized',

  /**
   * Initialiser le système SRS avec les cartes des leçons
   */
  initialize: function() {
    // Vérifier si déjà initialisé
    if (localStorage.getItem(this.INITIALIZED_KEY) === 'true') {
      console.log('SRS déjà initialisé');
      return this.loadAllCards();
    }

    console.log('Initialisation du SRS...');

    const cards = [];

    // Extraire tous les caractères des leçons
    lessonsData.forEach(lesson => {
      // Hiragana
      if (lesson.hiragana) {
        lesson.hiragana.forEach(h => {
          cards.push(SRS.initCard(h.char, 'hiragana'));
        });
      }

      // Katakana
      if (lesson.katakana) {
        lesson.katakana.forEach(k => {
          cards.push(SRS.initCard(k.char, 'katakana'));
        });
      }
    });

    // Ajouter les kanji
    if (typeof getAllKanjiN5 === 'function') {
      const allKanji = getAllKanjiN5();
      allKanji.forEach(kanji => {
        cards.push(SRS.initCard(kanji.kanji, 'kanji'));
      });
    }

    console.log(`${cards.length} cartes initialisées`);

    // Sauvegarder
    this.saveAllCards(cards);
    localStorage.setItem(this.INITIALIZED_KEY, 'true');

    return cards;
  },

  /**
   * Sauvegarder toutes les cartes
   */
  saveAllCards: function(cards) {
    try {
      const json = SRS.export(cards);
      localStorage.setItem(this.STORAGE_KEY, json);
      return true;
    } catch (e) {
      console.error('Erreur sauvegarde SRS:', e);
      return false;
    }
  },

  /**
   * Charger toutes les cartes
   */
  loadAllCards: function() {
    try {
      const json = localStorage.getItem(this.STORAGE_KEY);
      if (!json) {
        return [];
      }
      return SRS.import(json);
    } catch (e) {
      console.error('Erreur chargement SRS:', e);
      return [];
    }
  },

  /**
   * Sauvegarder une carte spécifique
   */
  saveCard: function(card) {
    const cards = this.loadAllCards();
    const index = cards.findIndex(c =>
      c.character === card.character && c.type === card.type
    );

    if (index >= 0) {
      cards[index] = card;
    } else {
      cards.push(card);
    }

    return this.saveAllCards(cards);
  },

  /**
   * Obtenir une carte spécifique
   */
  getCard: function(character, type) {
    const cards = this.loadAllCards();
    return cards.find(c =>
      c.character === character && c.type === type
    );
  },

  /**
   * Obtenir les cartes dues aujourd'hui
   */
  getDueCards: function() {
    const allCards = this.loadAllCards();
    return SRS.getDueCards(allCards);
  },

  /**
   * Obtenir les statistiques globales
   */
  getStats: function() {
    const allCards = this.loadAllCards();
    return SRS.getStats(allCards);
  },

  /**
   * Réinitialiser toutes les cartes
   */
  reset: function() {
    if (confirm('Voulez-vous vraiment réinitialiser toutes vos données SRS ?')) {
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem(this.INITIALIZED_KEY);
      console.log('SRS réinitialisé');
      return true;
    }
    return false;
  },

  /**
   * Importer les erreurs du système actuel
   */
  importMistakes: function() {
    const mistakes = Storage.getMistakes();
    if (mistakes.length === 0) {
      console.log('Aucune erreur à importer');
      return;
    }

    console.log(`Import de ${mistakes.length} erreurs...`);

    const allCards = this.loadAllCards();
    const mistakeCards = SRS.importFromMistakes(mistakes);

    // Fusionner avec les cartes existantes
    mistakeCards.forEach(newCard => {
      const existingIndex = allCards.findIndex(c =>
        c.character === newCard.character && c.type === newCard.type
      );

      if (existingIndex >= 0) {
        // Mettre à jour la carte existante avec les erreurs
        const existing = allCards[existingIndex];
        existing.incorrectCount += newCard.incorrectCount;
        existing.totalReviews += newCard.totalReviews;
        existing.nextReview = Date.now(); // À réviser maintenant
        existing.interval = 1;

        if (existing.incorrectCount >= SRS.config.leechThreshold) {
          existing.isLeech = true;
        }
      } else {
        allCards.push(newCard);
      }
    });

    this.saveAllCards(allCards);
    console.log('Import terminé');
  },

  /**
   * Obtenir les cartes par type
   */
  getCardsByType: function(type) {
    const allCards = this.loadAllCards();
    return allCards.filter(c => c.type === type);
  },

  /**
   * Obtenir les leeches (cartes difficiles)
   */
  getLeeches: function() {
    const allCards = this.loadAllCards();
    return allCards.filter(c => c.isLeech);
  },

  /**
   * Obtenir les cartes matures
   */
  getMatureCards: function() {
    const allCards = this.loadAllCards();
    return allCards.filter(c => c.isMature);
  },

  /**
   * Obtenir les nouvelles cartes
   */
  getNewCards: function(limit = 20) {
    const allCards = this.loadAllCards();
    const newCards = allCards.filter(c => c.isNew);

    // Retourner les N premières nouvelles cartes
    return newCards.slice(0, limit);
  },

  /**
   * Marquer une carte comme "suspendue"
   */
  suspendCard: function(character, type) {
    const cards = this.loadAllCards();
    const card = cards.find(c =>
      c.character === character && c.type === type
    );

    if (card) {
      card.nextReview = Date.now() + (365 * 24 * 60 * 60 * 1000); // Dans 1 an
      this.saveAllCards(cards);
    }
  },

  /**
   * Exporter les données pour backup
   */
  exportBackup: function() {
    const cards = this.loadAllCards();
    const stats = this.getStats();

    const backup = {
      version: 1,
      date: new Date().toISOString(),
      totalCards: cards.length,
      stats: stats,
      cards: cards
    };

    const json = JSON.stringify(backup, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `srs-backup-${Date.now()}.json`;
    a.click();

    URL.revokeObjectURL(url);
  },

  /**
   * Importer des données depuis backup
   */
  importBackup: function(file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const backup = JSON.parse(e.target.result);

        if (backup.version !== 1) {
          alert('Version de backup incompatible');
          return;
        }

        if (confirm(`Importer ${backup.totalCards} cartes ? Cela écrasera vos données actuelles.`)) {
          this.saveAllCards(backup.cards);
          alert('Import réussi !');
          location.reload();
        }
      } catch (err) {
        alert('Erreur lors de l\'import : ' + err.message);
      }
    };

    reader.readAsText(file);
  }
};

// Exposition globale
if (typeof window !== 'undefined') {
  window.SRSStorage = SRSStorage;
}
