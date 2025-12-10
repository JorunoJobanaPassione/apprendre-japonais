/**
 * 🎨 SRS UI V2 - Interface Simplifiée et Robuste
 * Inspiré d'Anki et Quizlet - Architecture moderne
 */

const SRSUI_V2 = {
  // État de la session
  session: null,

  /**
   * Démarrer une session de review
   */
  startReviewSession: function(cards) {
    if (!cards || cards.length === 0) {
      alert('Aucune carte à réviser !');
      Navigation.goToHome();
      return;
    }

    // Vérifier les vies disponibles
    if (window.LivesSystem && !LivesSystem.hasLives()) {
      LivesUI.showNoLivesModal();
      return;
    }

    // Initialiser la session
    this.session = {
      cards: this.shuffleCards([...cards]),
      currentIndex: 0,
      showingAnswer: false,
      startTime: Date.now(),
      results: { again: 0, hard: 0, good: 0, easy: 0 }
    };

    // Créer l'interface UNE SEULE FOIS
    this.createInterface();

    // Afficher la première carte
    this.showCurrentCard();

    // Attacher les event listeners UNE SEULE FOIS
    this.attachEventListeners();
  },

  /**
   * Créer l'interface HTML (une seule fois)
   */
  createInterface: function() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="srs-review-container">
        <!-- Header fixe -->
        <div class="srs-header">
          <button id="srs-quit-btn" class="back-btn">← Quitter</button>
          <div class="srs-progress">
            <span id="srs-progress-text">1 / 10</span>
            <div class="progress-bar">
              <div id="srs-progress-fill" class="progress-fill" style="width: 0%"></div>
            </div>
          </div>
        </div>

        <!-- Carte (contenu mis à jour, structure stable) -->
        <div class="srs-card-container">
          <div id="srs-card" class="srs-card">
            <div class="card-type-badge" id="srs-card-type">漢 Kanji</div>
            <div class="card-character" id="srs-card-char">一</div>
            <div class="card-badge" id="srs-card-badge"></div>
          </div>

          <!-- Détails (cachés au début) -->
          <div id="srs-card-details" class="card-details" style="display: none;">
            <div id="srs-details-content"></div>
          </div>
        </div>

        <!-- Bouton "Montrer la réponse" -->
        <div id="srs-show-answer-container" class="srs-actions">
          <button id="srs-show-answer-btn" class="show-answer-btn">
            Montrer la réponse <span class="keyboard-hint">Espace</span>
          </button>
        </div>

        <!-- Boutons de réponse (cachés au début) -->
        <div id="srs-answer-buttons-container" class="answer-buttons-container" style="display: none;">
          <button id="srs-again-btn" class="answer-btn again-btn">
            <span class="btn-label">Encore</span>
            <span id="srs-again-interval" class="btn-interval">< 10m</span>
            <span class="keyboard-hint">1</span>
          </button>
          <button id="srs-hard-btn" class="answer-btn hard-btn">
            <span class="btn-label">Difficile</span>
            <span id="srs-hard-interval" class="btn-interval">1 jour</span>
            <span class="keyboard-hint">2</span>
          </button>
          <button id="srs-good-btn" class="answer-btn good-btn">
            <span class="btn-label">Bien</span>
            <span id="srs-good-interval" class="btn-interval">6 jours</span>
            <span class="keyboard-hint">3</span>
          </button>
          <button id="srs-easy-btn" class="answer-btn easy-btn">
            <span class="btn-label">Facile</span>
            <span id="srs-easy-interval" class="btn-interval">19 jours</span>
            <span class="keyboard-hint">4</span>
          </button>
        </div>

        <!-- Stats de session -->
        <div class="session-stats">
          <div class="stat-item">
            <span class="stat-label">Encore</span>
            <span id="srs-stat-again" class="stat-value">0</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Difficile</span>
            <span id="srs-stat-hard" class="stat-value">0</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Bien</span>
            <span id="srs-stat-good" class="stat-value">0</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Facile</span>
            <span id="srs-stat-easy" class="stat-value">0</span>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Afficher la carte actuelle (mise à jour ciblée)
   */
  showCurrentCard: function() {
    if (!this.session || this.session.currentIndex >= this.session.cards.length) {
      this.showSummary();
      return;
    }

    const card = this.session.cards[this.session.currentIndex];
    const progress = this.session.currentIndex + 1;
    const total = this.session.cards.length;

    // Mettre à jour la progression
    const progressText = document.getElementById('srs-progress-text');
    const progressFill = document.getElementById('srs-progress-fill');
    if (progressText) progressText.textContent = `${progress} / ${total}`;
    if (progressFill) progressFill.style.width = `${(progress / total) * 100}%`;

    // Mettre à jour le type de carte
    const cardType = document.getElementById('srs-card-type');
    if (cardType) {
      const typeLabels = {
        'hiragana': 'あ Hiragana',
        'katakana': 'ア Katakana',
        'kanji': '漢 Kanji'
      };
      cardType.textContent = typeLabels[card.type] || card.type;
    }

    // Mettre à jour le caractère
    const cardChar = document.getElementById('srs-card-char');
    if (cardChar) cardChar.textContent = card.character;

    // Mettre à jour le badge
    const cardBadge = document.getElementById('srs-card-badge');
    if (cardBadge) {
      if (card.isNew) {
        cardBadge.innerHTML = '<span class="new-badge">✨ Nouveau</span>';
      } else if (card.isLeech) {
        cardBadge.innerHTML = '<span class="leech-badge">⚠️ Difficile</span>';
      } else {
        cardBadge.innerHTML = '';
      }
    }

    // Cacher les détails et boutons de réponse
    this.hideAnswer();

    // Réinitialiser l'état
    this.session.showingAnswer = false;
  },

  /**
   * Montrer la réponse
   */
  showAnswer: function() {
    if (!this.session || this.session.showingAnswer) return;

    const card = this.session.cards[this.session.currentIndex];

    // Trouver les détails
    const details = this.findCardDetails(card);

    // Afficher les détails
    const detailsContainer = document.getElementById('srs-card-details');
    const detailsContent = document.getElementById('srs-details-content');

    if (detailsContainer && detailsContent) {
      detailsContent.innerHTML = this.formatDetails(card, details);
      detailsContainer.style.display = 'block';
    }

    // Mettre à jour les intervalles des boutons
    this.updateAnswerIntervals(card);

    // Cacher "Montrer la réponse", afficher les boutons
    const showBtn = document.getElementById('srs-show-answer-container');
    const answerBtns = document.getElementById('srs-answer-buttons-container');
    if (showBtn) showBtn.style.display = 'none';
    if (answerBtns) answerBtns.style.display = 'flex';

    this.session.showingAnswer = true;
  },

  /**
   * Cacher la réponse
   */
  hideAnswer: function() {
    const detailsContainer = document.getElementById('srs-card-details');
    const showBtn = document.getElementById('srs-show-answer-container');
    const answerBtns = document.getElementById('srs-answer-buttons-container');

    if (detailsContainer) detailsContainer.style.display = 'none';
    if (showBtn) showBtn.style.display = 'flex';
    if (answerBtns) answerBtns.style.display = 'none';
  },

  /**
   * Répondre à la carte
   */
  answerCard: function(quality) {
    if (!this.session || !this.session.showingAnswer) return;

    const card = this.session.cards[this.session.currentIndex];

    // Mettre à jour la carte avec SRS
    const updatedCard = SRS.updateCard(card, quality);
    SRSStorage.saveCard(updatedCard);

    // 🎯 Quête: Review SRS complétée
    if (window.QuestsSystem) {
      window.QuestsSystem.onSRSReview();
    }

    // Mettre à jour les stats
    const statMap = { 0: 'again', 3: 'hard', 4: 'good', 5: 'easy' };
    const statKey = statMap[quality];
    if (statKey) {
      this.session.results[statKey]++;
      const statEl = document.getElementById(`srs-stat-${statKey}`);
      if (statEl) statEl.textContent = this.session.results[statKey];
    }

    // 💖 Perdre une vie si la réponse est "Encore" (erreur)
    if (quality === 0 && window.LivesSystem) {
      LivesSystem.loseLife();

      // Si plus de vies, terminer la session immédiatement
      if (!LivesSystem.hasLives()) {
        this.cleanup();
        LivesUI.showNoLivesModal();
        return;
      }
    }

    // Carte suivante
    this.session.currentIndex++;
    this.showCurrentCard();
  },

  /**
   * Quitter la session
   */
  quit: function() {
    if (confirm('Voulez-vous vraiment quitter ? Votre progression sera sauvegardée.')) {
      // Sauvegarder les cartes mises à jour
      if (this.session && this.session.cards) {
        this.session.cards.forEach(card => {
          SRSStorage.saveCard(card);
        });
      }

      // Nettoyer les event listeners
      this.cleanup();

      // Méthode simple et robuste : recharger la page
      // L'app retourne automatiquement à l'écran d'accueil
      window.location.reload();
    }
  },

  /**
   * Afficher le résumé
   */
  showSummary: function() {
    this.cleanup();

    const duration = Math.round((Date.now() - this.session.startTime) / 1000);
    const total = this.session.cards.length;
    const results = this.session.results;
    const accuracy = Math.round(((results.good + results.easy) / total) * 100);

    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="srs-summary-container">
        <div class="summary-header">
          <div class="summary-icon">🎉</div>
          <h1>Session terminée !</h1>
          <p>Excellent travail !</p>
        </div>

        <div class="summary-stats">
          <div class="summary-stat">
            <div class="stat-value-large">${total}</div>
            <div class="stat-label">Cartes révisées</div>
          </div>
          <div class="summary-stat">
            <div class="stat-value-large">${accuracy}%</div>
            <div class="stat-label">Précision</div>
          </div>
          <div class="summary-stat">
            <div class="stat-value-large">${duration}s</div>
            <div class="stat-label">Temps</div>
          </div>
        </div>

        <div class="summary-breakdown">
          <div class="breakdown-item">
            <span class="breakdown-label">❌ Encore</span>
            <span class="breakdown-value">${results.again}</span>
          </div>
          <div class="breakdown-item">
            <span class="breakdown-label">😓 Difficile</span>
            <span class="breakdown-value">${results.hard}</span>
          </div>
          <div class="breakdown-item">
            <span class="breakdown-label">👍 Bien</span>
            <span class="breakdown-value">${results.good}</span>
          </div>
          <div class="breakdown-item">
            <span class="breakdown-label">⭐ Facile</span>
            <span class="breakdown-value">${results.easy}</span>
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
   * Attacher les event listeners (une seule fois)
   */
  attachEventListeners: function() {
    // Bouton quitter
    const quitBtn = document.getElementById('srs-quit-btn');
    if (quitBtn) {
      quitBtn.onclick = () => this.quit();
    }

    // Bouton montrer réponse
    const showBtn = document.getElementById('srs-show-answer-btn');
    if (showBtn) {
      showBtn.onclick = () => this.showAnswer();
    }

    // Boutons de réponse
    const againBtn = document.getElementById('srs-again-btn');
    if (againBtn) againBtn.onclick = () => this.answerCard(0);

    const hardBtn = document.getElementById('srs-hard-btn');
    if (hardBtn) hardBtn.onclick = () => this.answerCard(3);

    const goodBtn = document.getElementById('srs-good-btn');
    if (goodBtn) goodBtn.onclick = () => this.answerCard(4);

    const easyBtn = document.getElementById('srs-easy-btn');
    if (easyBtn) easyBtn.onclick = () => this.answerCard(5);

    // Event listener clavier
    this.keyHandler = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (!this.session.showingAnswer) {
          this.showAnswer();
        }
      } else if (this.session.showingAnswer) {
        if (e.code === 'Digit1' || e.code === 'Numpad1') this.answerCard(0);
        else if (e.code === 'Digit2' || e.code === 'Numpad2') this.answerCard(3);
        else if (e.code === 'Digit3' || e.code === 'Numpad3') this.answerCard(4);
        else if (e.code === 'Digit4' || e.code === 'Numpad4') this.answerCard(5);
      }
    };

    document.addEventListener('keydown', this.keyHandler);
  },

  /**
   * Nettoyer les event listeners
   */
  cleanup: function() {
    if (this.keyHandler) {
      document.removeEventListener('keydown', this.keyHandler);
      this.keyHandler = null;
    }
  },

  /**
   * Trouver les détails d'une carte
   */
  findCardDetails: function(card) {
    for (const lesson of lessonsData) {
      if (card.type === 'hiragana') {
        const match = lesson.hiragana?.find(h => h.char === card.character);
        if (match) return { romaji: match.romaji };
      } else if (card.type === 'katakana') {
        const match = lesson.katakana?.find(k => k.char === card.character);
        if (match) return { romaji: match.romaji };
      } else if (card.type === 'kanji') {
        const match = lesson.kanjis?.find(k => k.kanji === card.character);
        if (match) return {
          meaning: match.meaning,
          onyomi: match.onyomi,
          kunyomi: match.kunyomi
        };
      }
    }
    return null;
  },

  /**
   * Formater les détails
   */
  formatDetails: function(card, details) {
    if (!details) return '<p>Aucune information disponible</p>';

    let html = '';

    if (details.romaji) {
      html += `<div class="detail-row"><span class="detail-label">Romaji :</span><span class="detail-value">${details.romaji}</span></div>`;
    }

    if (details.onyomi) {
      html += `<div class="detail-row"><span class="detail-label">On'yomi :</span><span class="detail-value">${details.onyomi.join(', ')}</span></div>`;
    }

    if (details.kunyomi) {
      html += `<div class="detail-row"><span class="detail-label">Kun'yomi :</span><span class="detail-value">${details.kunyomi.join(', ')}</span></div>`;
    }

    if (details.meaning) {
      html += `<div class="detail-row"><span class="detail-label">Signification :</span><span class="detail-value">${details.meaning}</span></div>`;
    }

    html += `
      <div class="detail-row"><span class="detail-label">Intervalle :</span><span class="detail-value">${SRS.getIntervalText(card.interval)}</span></div>
      <div class="detail-row"><span class="detail-label">Facilité :</span><span class="detail-value">${card.easeFactor.toFixed(1)}</span></div>
      <div class="detail-row"><span class="detail-label">Précision :</span><span class="detail-value">${this.calculateAccuracy(card)}%</span></div>
    `;

    return html;
  },

  /**
   * Mettre à jour les intervalles des boutons
   */
  updateAnswerIntervals: function(card) {
    const againEl = document.getElementById('srs-again-interval');
    const hardEl = document.getElementById('srs-hard-interval');
    const goodEl = document.getElementById('srs-good-interval');
    const easyEl = document.getElementById('srs-easy-interval');

    if (againEl) againEl.textContent = '< 10m';
    if (hardEl) hardEl.textContent = '1 jour';

    if (goodEl) {
      const goodInterval = this.predictInterval(card, 4);
      goodEl.textContent = SRS.getIntervalText(goodInterval);
    }

    if (easyEl) {
      const easyInterval = this.predictInterval(card, 5);
      easyEl.textContent = SRS.getIntervalText(easyInterval);
    }
  },

  /**
   * Prédire l'intervalle
   */
  predictInterval: function(card, quality) {
    const predicted = SRS.updateCard({...card}, quality);
    return predicted.interval;
  },

  /**
   * Calculer la précision
   */
  calculateAccuracy: function(card) {
    if (card.totalReviews === 0) return 0;
    return Math.round((card.correctCount / card.totalReviews) * 100);
  },

  /**
   * Mélanger les cartes
   */
  shuffleCards: function(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
};

// Exposition globale
if (typeof window !== 'undefined') {
  window.SRSUI_V2 = SRSUI_V2;
}
