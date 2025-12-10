/**
 * 🎨 SRS UI - Interface utilisateur pour les reviews
 * Gère l'affichage et l'interaction avec le système SRS
 */

const SRSUI = {
  // État de la session de review
  currentSession: {
    cards: [],
    currentIndex: 0,
    cardShown: false,
    startTime: null,
    results: {
      again: 0,
      hard: 0,
      good: 0,
      easy: 0
    }
  },

  // Référence pour l'event listener clavier (pour pouvoir le retirer)
  keyPressHandler: null,

  /**
   * Initialiser une session de review
   * @param {Array} cards - Cartes à réviser
   */
  startReviewSession: function(cards) {
    if (cards.length === 0) {
      this.showNoCardsMessage();
      return;
    }

    this.currentSession.cards = this.shuffleArray([...cards]);
    this.currentSession.currentIndex = 0;
    this.currentSession.cardShown = false;
    this.currentSession.startTime = Date.now();
    this.currentSession.results = {
      again: 0,
      hard: 0,
      good: 0,
      easy: 0
    };

    // Passer à l'écran de review
    appState.currentScreen = 'srs-review';
    this.renderReviewScreen();
  },

  /**
   * Mélanger un tableau (Fisher-Yates)
   */
  shuffleArray: function(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },

  /**
   * Rendre l'écran de review
   */
  renderReviewScreen: function() {
    const container = document.getElementById('app');
    const card = this.currentSession.cards[this.currentSession.currentIndex];
    const progress = this.currentSession.currentIndex + 1;
    const total = this.currentSession.cards.length;

    container.innerHTML = `
      <div class="srs-review-container">
        <!-- Header -->
        <div class="srs-header">
          <button class="back-btn" id="srs-exit-btn" onclick="window.SRSUI.exitReview(); return false;">
            ← Quitter
          </button>
          <div class="srs-progress">
            <span class="progress-text">${progress} / ${total}</span>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${(progress / total) * 100}%"></div>
            </div>
          </div>
        </div>

        <!-- Carte -->
        <div class="srs-card ${this.currentSession.cardShown ? 'flipped' : ''}">
          <div class="card-front">
            <div class="card-type-badge">${this.getTypeBadge(card.type)}</div>
            <div class="card-character">${card.character}</div>
            <div class="card-hint">
              ${card.isLeech ? '<span class="leech-badge">⚠️ Difficile</span>' : ''}
              ${card.isNew ? '<span class="new-badge">✨ Nouveau</span>' : ''}
            </div>
          </div>

          <div class="card-back">
            <div class="card-info">
              <div class="card-character-large">${card.character}</div>
              <div class="card-details">
                ${this.getCardDetails(card)}
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="srs-actions">
          ${this.currentSession.cardShown ? this.renderAnswerButtons(card) : this.renderShowButton()}
        </div>

        <!-- Stats de session -->
        <div class="session-stats">
          <div class="stat-item">
            <span class="stat-label">Encore</span>
            <span class="stat-value">${this.currentSession.results.again}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Difficile</span>
            <span class="stat-value">${this.currentSession.results.hard}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Bien</span>
            <span class="stat-value">${this.currentSession.results.good}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Facile</span>
            <span class="stat-value">${this.currentSession.results.easy}</span>
          </div>
        </div>
      </div>
    `;

    // Ajouter les event listeners pour les raccourcis clavier
    // Stocker la référence pour pouvoir la retirer plus tard
    if (!this.keyPressHandler) {
      this.keyPressHandler = this.handleKeyPress.bind(this);
    }
    document.addEventListener('keydown', this.keyPressHandler);
  },

  /**
   * Obtenir le badge de type
   */
  getTypeBadge: function(type) {
    const badges = {
      'hiragana': 'あ Hiragana',
      'katakana': 'ア Katakana',
      'kanji': '漢 Kanji'
    };
    return badges[type] || type;
  },

  /**
   * Obtenir les détails de la carte (romaji, signification, etc.)
   */
  getCardDetails: function(card) {
    // Chercher dans lessons-data pour obtenir les détails
    const details = this.findCharacterDetails(card.character, card.type);

    if (details) {
      let detailsHTML = '';

      // Pour hiragana et katakana : afficher romaji
      if (details.romaji) {
        detailsHTML += `
          <div class="detail-row">
            <span class="detail-label">Romaji :</span>
            <span class="detail-value">${details.romaji}</span>
          </div>
        `;
      }

      // Pour kanji : afficher onyomi et kunyomi
      if (details.onyomi) {
        detailsHTML += `
          <div class="detail-row">
            <span class="detail-label">On'yomi :</span>
            <span class="detail-value">${details.onyomi.join(', ')}</span>
          </div>
        `;
      }
      if (details.kunyomi) {
        detailsHTML += `
          <div class="detail-row">
            <span class="detail-label">Kun'yomi :</span>
            <span class="detail-value">${details.kunyomi.join(', ')}</span>
          </div>
        `;
      }

      // Signification (pour tous)
      if (details.meaning) {
        detailsHTML += `
          <div class="detail-row">
            <span class="detail-label">Signification :</span>
            <span class="detail-value">${details.meaning}</span>
          </div>
        `;
      }

      // Stats de la carte
      detailsHTML += `
        <div class="detail-row">
          <span class="detail-label">Intervalle :</span>
          <span class="detail-value">${SRS.getIntervalText(card.interval)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Facilité :</span>
          <span class="detail-value">${card.easeFactor.toFixed(1)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Précision :</span>
          <span class="detail-value">${this.calculateAccuracy(card)}%</span>
        </div>
      `;

      return detailsHTML;
    }

    return `
      <div class="detail-row">
        <span class="detail-label">Intervalle :</span>
        <span class="detail-value">${SRS.getIntervalText(card.interval)}</span>
      </div>
    `;
  },

  /**
   * Trouver les détails d'un caractère dans lessons-data
   */
  findCharacterDetails: function(character, type) {
    // Chercher dans toutes les leçons
    for (const lesson of lessonsData) {
      // Hiragana
      const hiraganaMatch = lesson.hiragana?.find(h => h.char === character);
      if (hiraganaMatch) {
        return {
          romaji: hiraganaMatch.romaji,
          type: 'hiragana'
        };
      }

      // Katakana
      const katakanaMatch = lesson.katakana?.find(k => k.char === character);
      if (katakanaMatch) {
        return {
          romaji: katakanaMatch.romaji,
          type: 'katakana'
        };
      }

      // Kanji (noter le 's' dans kanjis)
      const kanjiMatch = lesson.kanjis?.find(k => k.kanji === character);
      if (kanjiMatch) {
        return {
          meaning: kanjiMatch.meaning,
          onyomi: kanjiMatch.onyomi,
          kunyomi: kanjiMatch.kunyomi,
          type: 'kanji'
        };
      }
    }

    return null;
  },

  /**
   * Calculer la précision d'une carte
   */
  calculateAccuracy: function(card) {
    const total = card.correctCount + card.incorrectCount;
    if (total === 0) return 0;
    return Math.round((card.correctCount / total) * 100);
  },

  /**
   * Rendre le bouton "Montrer la réponse"
   */
  renderShowButton: function() {
    return `
      <button class="show-answer-btn" onclick="SRSUI.showAnswer()">
        Montrer la réponse
        <span class="keyboard-hint">Espace</span>
      </button>
    `;
  },

  /**
   * Rendre les boutons de réponse
   */
  renderAnswerButtons: function(card) {
    // Calculer les intervalles pour chaque option
    const intervals = {
      again: '< 10m',
      hard: '1 jour',
      good: SRS.getIntervalText(this.predictInterval(card, 4)),
      easy: SRS.getIntervalText(this.predictInterval(card, 5))
    };

    return `
      <div class="answer-buttons">
        <button class="answer-btn again-btn" onclick="SRSUI.answerCard(0)">
          <span class="btn-label">Encore</span>
          <span class="btn-interval">${intervals.again}</span>
          <span class="keyboard-hint">1</span>
        </button>

        <button class="answer-btn hard-btn" onclick="SRSUI.answerCard(3)">
          <span class="btn-label">Difficile</span>
          <span class="btn-interval">${intervals.hard}</span>
          <span class="keyboard-hint">2</span>
        </button>

        <button class="answer-btn good-btn" onclick="SRSUI.answerCard(4)">
          <span class="btn-label">Bien</span>
          <span class="btn-interval">${intervals.good}</span>
          <span class="keyboard-hint">3</span>
        </button>

        <button class="answer-btn easy-btn" onclick="SRSUI.answerCard(5)">
          <span class="btn-label">Facile</span>
          <span class="btn-interval">${intervals.easy}</span>
          <span class="keyboard-hint">4</span>
        </button>
      </div>
    `;
  },

  /**
   * Prédire l'intervalle pour une qualité donnée
   */
  predictInterval: function(card, quality) {
    const tempCard = { ...card };
    const updated = SRS.updateCard(tempCard, quality);
    return updated.interval;
  },

  /**
   * Montrer la réponse
   */
  showAnswer: function() {
    this.currentSession.cardShown = true;
    this.renderReviewScreen();

    // Animation de flip
    const cardEl = document.querySelector('.srs-card');
    if (cardEl) {
      cardEl.classList.add('flipped');
    }
  },

  /**
   * Répondre à la carte
   * @param {Number} quality - Qualité (0, 3, 4, 5)
   */
  answerCard: function(quality) {
    const card = this.currentSession.cards[this.currentSession.currentIndex];

    // Mettre à jour la carte avec SRS
    const updatedCard = SRS.updateCard(card, quality);

    // Sauvegarder dans le storage
    SRSStorage.saveCard(updatedCard);

    // Mettre à jour les stats de session
    if (quality === 0) {
      this.currentSession.results.again++;
    } else if (quality === 3) {
      this.currentSession.results.hard++;
    } else if (quality === 4) {
      this.currentSession.results.good++;
    } else if (quality === 5) {
      this.currentSession.results.easy++;
    }

    // Feedback sonore
    if (quality >= 4) {
      FeedbackSound.playSuccess();
    } else if (quality === 3) {
      // Son neutre (pas de son)
    } else {
      FeedbackSound.playError();
    }

    // Passer à la carte suivante
    this.nextCard();
  },

  /**
   * Passer à la carte suivante
   */
  nextCard: function() {
    this.currentSession.currentIndex++;

    if (this.currentSession.currentIndex >= this.currentSession.cards.length) {
      // Session terminée
      this.showSessionSummary();
    } else {
      // Carte suivante
      this.currentSession.cardShown = false;
      this.renderReviewScreen();
    }
  },

  /**
   * Afficher le résumé de la session
   */
  showSessionSummary: function() {
    // Nettoyer l'event listener clavier (la session est terminée)
    if (this.keyPressHandler) {
      document.removeEventListener('keydown', this.keyPressHandler);
      this.keyPressHandler = null;
    }

    const container = document.getElementById('app');
    const duration = Math.round((Date.now() - this.currentSession.startTime) / 1000);
    const total = this.currentSession.cards.length;
    const results = this.currentSession.results;

    const accuracy = Math.round(
      ((results.good + results.easy) / total) * 100
    );

    container.innerHTML = `
      <div class="srs-summary-container">
        <div class="summary-header">
          <div class="summary-icon">🎉</div>
          <h1>Session terminée !</h1>
          <p>Excellent travail !</p>
        </div>

        <div class="summary-stats">
          <div class="summary-stat-large">
            <span class="stat-number">${total}</span>
            <span class="stat-label">Cartes révisées</span>
          </div>

          <div class="summary-stat-large">
            <span class="stat-number">${accuracy}%</span>
            <span class="stat-label">Précision</span>
          </div>

          <div class="summary-stat-large">
            <span class="stat-number">${duration}s</span>
            <span class="stat-label">Temps</span>
          </div>
        </div>

        <div class="summary-breakdown">
          <h3>Détails</h3>
          <div class="breakdown-grid">
            <div class="breakdown-item again">
              <span class="breakdown-label">❌ Encore</span>
              <span class="breakdown-value">${results.again}</span>
            </div>
            <div class="breakdown-item hard">
              <span class="breakdown-label">😓 Difficile</span>
              <span class="breakdown-value">${results.hard}</span>
            </div>
            <div class="breakdown-item good">
              <span class="breakdown-label">👍 Bien</span>
              <span class="breakdown-value">${results.good}</span>
            </div>
            <div class="breakdown-item easy">
              <span class="breakdown-label">⭐ Facile</span>
              <span class="breakdown-value">${results.easy}</span>
            </div>
          </div>
        </div>

        <div class="summary-actions">
          <button class="primary-btn" onclick="Navigation.goToHome()">
            Retour à l'accueil
          </button>
          <button class="secondary-btn" onclick="Navigation.goToSRS()">
            Voir les stats SRS
          </button>
        </div>
      </div>
    `;
  },

  /**
   * Afficher le message "Pas de cartes"
   */
  showNoCardsMessage: function() {
    const container = document.getElementById('app');

    container.innerHTML = `
      <div class="srs-summary-container">
        <div class="summary-header">
          <div class="summary-icon">✨</div>
          <h1>Aucune carte à réviser</h1>
          <p>Toutes vos cartes sont à jour !</p>
        </div>

        <div class="summary-actions">
          <button class="primary-btn" onclick="Navigation.goToHome()">
            Retour à l'accueil
          </button>
        </div>
      </div>
    `;
  },

  /**
   * Quitter la review
   */
  exitReview: function() {
    // Sauvegarder toutes les cartes mises à jour
    if (this.currentSession && this.currentSession.cards) {
      console.log('Sauvegarde de la progression avant de quitter...');
      this.currentSession.cards.forEach(card => {
        SRSStorage.saveCard(card);
      });
    }

    // Confirmer et quitter
    if (confirm('Voulez-vous vraiment quitter ? Votre progression a été sauvegardée.')) {
      // Nettoyer les event listeners (utiliser la référence stockée)
      if (this.keyPressHandler) {
        document.removeEventListener('keydown', this.keyPressHandler);
        this.keyPressHandler = null;
      }

      // Réinitialiser la session
      this.currentSession = null;

      // Retourner à l'accueil
      Navigation.goToHome();
    }
  },

  /**
   * Gérer les raccourcis clavier
   */
  handleKeyPress: function(e) {
    // Vérifier que nous sommes dans l'écran SRS et que la session existe
    if (appState.currentScreen !== 'srs-review') return;
    if (!this.currentSession || !this.currentSession.cards || this.currentSession.cards.length === 0) return;

    // Espace : montrer la réponse
    if (e.code === 'Space' && !this.currentSession.cardShown) {
      e.preventDefault();
      this.showAnswer();
      return;
    }

    // 1-4 : répondre
    if (this.currentSession.cardShown) {
      if (e.code === 'Digit1' || e.code === 'Numpad1') {
        this.answerCard(0);
      } else if (e.code === 'Digit2' || e.code === 'Numpad2') {
        this.answerCard(3);
      } else if (e.code === 'Digit3' || e.code === 'Numpad3') {
        this.answerCard(4);
      } else if (e.code === 'Digit4' || e.code === 'Numpad4') {
        this.answerCard(5);
      }
    }
  }
};

// Exposition globale
if (typeof window !== 'undefined') {
  window.SRSUI = SRSUI;
}
