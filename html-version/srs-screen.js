/**
 * 📊 SRS Screen - Écran principal du système SRS
 * Affiche les stats et permet de lancer les reviews
 */

const SRSScreen = {
  /**
   * Rendre l'écran principal SRS
   */
  render: function() {
    const container = document.getElementById('app');

    // Initialiser le SRS si nécessaire
    const cards = SRSStorage.initialize();
    const stats = SRSStorage.getStats();
    const dueCards = SRSStorage.getDueCards();
    const leeches = SRSStorage.getLeeches();

    container.innerHTML = `
      <div class="srs-screen">
        <!-- Header -->
        <div class="screen-header">
          <button class="back-btn" onclick="Navigation.goToHome()">
            ← Retour
          </button>
          <h1>🧠 Révisions SRS</h1>
          <button class="settings-btn" onclick="SRSScreen.showSettings()">
            ⚙️
          </button>
        </div>

        <!-- Hero Section : Cartes dues -->
        ${this.renderDueSection(dueCards, stats)}

        <!-- Stats globales -->
        ${this.renderGlobalStats(stats)}

        <!-- Graphiques & Détails -->
        ${this.renderDetails(stats, leeches)}

        <!-- Actions -->
        ${this.renderActions(dueCards)}
      </div>
    `;
  },

  /**
   * Section "Cartes dues aujourd'hui"
   */
  renderDueSection: function(dueCards, stats) {
    const dueCount = dueCards.length;

    if (dueCount === 0) {
      return `
        <div class="srs-due-section no-due">
          <div class="due-icon">✨</div>
          <h2>Aucune carte à réviser</h2>
          <p>Toutes vos cartes sont à jour ! Revenez demain.</p>
          ${stats.new > 0 ? `
            <p class="new-cards-hint">
              Vous avez <strong>${stats.new} nouvelles cartes</strong> disponibles.
            </p>
            <button class="primary-btn" onclick="SRSScreen.startNewCardsSession()">
              Apprendre de nouvelles cartes
            </button>
          ` : ''}
        </div>
      `;
    }

    return `
      <div class="srs-due-section has-due">
        <div class="due-count-large">${dueCount}</div>
        <h2>Cartes à réviser</h2>
        <p>Temps estimé : ${Math.ceil(dueCount * 0.5)} minutes</p>

        <button class="primary-btn large" onclick="SRSScreen.startReviewSession()">
          Commencer les révisions
        </button>

        ${stats.new > 0 ? `
          <button class="secondary-btn" onclick="SRSScreen.startMixedSession()">
            Réviser + ${Math.min(20, stats.new)} nouvelles cartes
          </button>
        ` : ''}
      </div>
    `;
  },

  /**
   * Stats globales
   */
  renderGlobalStats: function(stats) {
    return `
      <div class="srs-global-stats">
        <h3>📊 Statistiques globales</h3>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon">📚</div>
            <div class="stat-content">
              <div class="stat-value">${stats.total}</div>
              <div class="stat-label">Total cartes</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">✨</div>
            <div class="stat-content">
              <div class="stat-value">${stats.new}</div>
              <div class="stat-label">Nouvelles</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">📖</div>
            <div class="stat-content">
              <div class="stat-value">${stats.learning}</div>
              <div class="stat-label">En apprentissage</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">🌱</div>
            <div class="stat-content">
              <div class="stat-value">${stats.young}</div>
              <div class="stat-label">Jeunes</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">🌳</div>
            <div class="stat-content">
              <div class="stat-value">${stats.mature}</div>
              <div class="stat-label">Matures</div>
            </div>
          </div>

          <div class="stat-card ${stats.leeches > 0 ? 'warning' : ''}">
            <div class="stat-icon">⚠️</div>
            <div class="stat-content">
              <div class="stat-value">${stats.leeches}</div>
              <div class="stat-label">Difficiles</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">📅</div>
            <div class="stat-content">
              <div class="stat-value">${stats.dueToday}</div>
              <div class="stat-label">Aujourd'hui</div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon">📆</div>
            <div class="stat-content">
              <div class="stat-value">${stats.dueThisWeek}</div>
              <div class="stat-label">Cette semaine</div>
            </div>
          </div>

          <div class="stat-card ${stats.accuracy >= 80 ? 'success' : ''}">
            <div class="stat-icon">🎯</div>
            <div class="stat-content">
              <div class="stat-value">${stats.accuracy}%</div>
              <div class="stat-label">Précision</div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Détails et graphiques
   */
  renderDetails: function(stats, leeches) {
    return `
      <div class="srs-details">
        <!-- Distribution des cartes -->
        <div class="detail-section">
          <h3>📈 Distribution des cartes</h3>
          <div class="distribution-chart">
            ${this.renderDistributionBar('Nouvelles', stats.new, stats.total, '#8b5cf6')}
            ${this.renderDistributionBar('En apprentissage', stats.learning, stats.total, '#3b82f6')}
            ${this.renderDistributionBar('Jeunes', stats.young, stats.total, '#10b981')}
            ${this.renderDistributionBar('Matures', stats.mature, stats.total, '#059669')}
            ${this.renderDistributionBar('Difficiles', stats.leeches, stats.total, '#ef4444')}
          </div>
        </div>

        <!-- Cartes difficiles -->
        ${leeches.length > 0 ? `
          <div class="detail-section warning">
            <h3>⚠️ Cartes difficiles (${leeches.length})</h3>
            <p>Ces cartes nécessitent plus d'attention :</p>
            <div class="leech-list">
              ${leeches.slice(0, 10).map(card => `
                <div class="leech-item">
                  <span class="leech-char">${card.character}</span>
                  <span class="leech-type">${card.type}</span>
                  <span class="leech-errors">${card.incorrectCount} erreurs</span>
                </div>
              `).join('')}
              ${leeches.length > 10 ? `<div class="leech-more">et ${leeches.length - 10} de plus...</div>` : ''}
            </div>
            <button class="secondary-btn" onclick="SRSScreen.reviewLeeches()">
              Réviser les cartes difficiles
            </button>
          </div>
        ` : ''}

        <!-- Conseils -->
        <div class="detail-section tips">
          <h3>💡 Conseils</h3>
          <ul class="tips-list">
            <li>Révisez tous les jours pour de meilleurs résultats</li>
            <li>Soyez honnête dans vos réponses pour un meilleur apprentissage</li>
            <li>Les cartes "Difficiles" sont normales au début</li>
            <li>La précision s'améliore avec le temps et la régularité</li>
          </ul>
        </div>
      </div>
    `;
  },

  /**
   * Rendre une barre de distribution
   */
  renderDistributionBar: function(label, count, total, color) {
    const percentage = total > 0 ? (count / total) * 100 : 0;

    return `
      <div class="distribution-row">
        <div class="distribution-label">${label}</div>
        <div class="distribution-bar-container">
          <div class="distribution-bar" style="width: ${percentage}%; background: ${color};"></div>
        </div>
        <div class="distribution-count">${count}</div>
      </div>
    `;
  },

  /**
   * Actions disponibles
   */
  renderActions: function(dueCards) {
    return `
      <div class="srs-actions-section">
        <h3>⚙️ Actions</h3>
        <div class="actions-grid">
          <button class="action-btn" onclick="SRSScreen.importMistakes()">
            📥 Importer les erreurs
          </button>
          <button class="action-btn" onclick="SRSStorage.exportBackup()">
            💾 Exporter les données
          </button>
          <button class="action-btn" onclick="SRSScreen.showHelp()">
            ❓ Comment ça marche ?
          </button>
          <button class="action-btn danger" onclick="SRSScreen.resetSRS()">
            🗑️ Réinitialiser
          </button>
        </div>
      </div>
    `;
  },

  /**
   * Démarrer une session de review
   */
  startReviewSession: function() {
    const dueCards = SRSStorage.getDueCards();
    SRSUI_V2.startReviewSession(dueCards);
  },

  /**
   * Démarrer une session avec nouvelles cartes
   */
  startNewCardsSession: function() {
    const newCards = SRSStorage.getNewCards(20);
    SRSUI_V2.startReviewSession(newCards);
  },

  /**
   * Démarrer une session mixte (reviews + nouvelles)
   */
  startMixedSession: function() {
    const dueCards = SRSStorage.getDueCards();
    const newCards = SRSStorage.getNewCards(20);
    const mixed = [...dueCards, ...newCards];
    SRSUI_V2.startReviewSession(mixed);
  },

  /**
   * Réviser les leeches
   */
  reviewLeeches: function() {
    const leeches = SRSStorage.getLeeches();
    if (leeches.length === 0) {
      alert('Aucune carte difficile à réviser !');
      return;
    }
    SRSUI_V2.startReviewSession(leeches);
  },

  /**
   * Importer les erreurs du système actuel
   */
  importMistakes: function() {
    if (confirm('Importer vos erreurs précédentes dans le système SRS ?')) {
      SRSStorage.importMistakes();
      alert('Import terminé ! Les cartes avec erreurs sont maintenant dans le système SRS.');
      this.render();
    }
  },

  /**
   * Réinitialiser le SRS
   */
  resetSRS: function() {
    if (SRSStorage.reset()) {
      alert('SRS réinitialisé avec succès');
      this.render();
    }
  },

  /**
   * Afficher les paramètres
   */
  showSettings: function() {
    alert('Paramètres SRS\n\n(À implémenter : ajuster les intervalles, limites quotidiennes, etc.)');
  },

  /**
   * Afficher l'aide
   */
  showHelp: function() {
    const message = [
      'Comment fonctionne le SRS ?',
      '',
      'Le SRS (Spaced Repetition System) optimise votre apprentissage en vous faisant réviser les cartes au moment optimal.',
      '',
      'Quand vous révisez une carte :',
      '- Encore : Vous l\'avez oubliée → Revoir dans 10 minutes',
      '- Difficile : Vous hésitez → Revoir dans 1 jour',
      '- Bien : Vous vous souvenez → Intervalle augmenté',
      '- Facile : Parfait → Intervalle fortement augmenté',
      '',
      'Plus vous réussissez, plus l\'intervalle augmente.',
      'L\'algorithme s\'adapte à votre performance !'
    ].join('\n');

    alert(message);
  }
};

// Exposition globale
if (typeof window !== 'undefined') {
  window.SRSScreen = SRSScreen;
}
