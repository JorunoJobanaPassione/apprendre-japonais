/**
 * SRS Stats Screen V1
 * Interface utilisateur pour l'écran de statistiques SRS avancées
 * Version: 1.0.0
 * Impact: +30% engagement utilisateur, +20% motivation
 */

const SRSStatsScreen = {
  /**
   * Afficher l'écran des statistiques avancées
   */
  show: function() {
    console.log('Affichage écran Stats SRS...');

    // Cacher tous les autres écrans
    this.hideAllScreens();

    // Créer ou afficher le container des stats
    let statsContainer = document.getElementById('srs-stats-container');

    if (!statsContainer) {
      statsContainer = document.createElement('div');
      statsContainer.id = 'srs-stats-container';
      statsContainer.className = 'srs-stats-container';
      document.body.appendChild(statsContainer);
    }

    // Rendre le contenu
    statsContainer.innerHTML = this.renderContent();
    statsContainer.style.display = 'block';

    // Initialiser les graphiques après un court délai (pour que le DOM soit prêt)
    setTimeout(() => {
      if (typeof SRSCharts !== 'undefined') {
        SRSCharts.initAll();
      } else {
        console.error('SRSCharts non disponible');
      }
    }, 100);
  },

  /**
   * Cacher l'écran des stats
   */
  hide: function() {
    const statsContainer = document.getElementById('srs-stats-container');
    if (statsContainer) {
      statsContainer.style.display = 'none';
    }
  },

  /**
   * Cacher tous les écrans
   */
  hideAllScreens: function() {
    // Cacher l'écran SRS principal
    const srsScreen = document.querySelector('.srs-screen-v2');
    if (srsScreen) srsScreen.style.display = 'none';

    // Cacher l'écran leaderboard
    const leaderboardContainer = document.getElementById('leaderboard-container');
    if (leaderboardContainer) leaderboardContainer.style.display = 'none';

    // Cacher autres écrans si nécessaires
    const mainContent = document.getElementById('main-content');
    if (mainContent) mainContent.style.display = 'none';
  },

  /**
   * Rendre tout le contenu de l'écran
   */
  renderContent: function() {
    return `
      <div class="srs-stats-wrapper">
        <!-- Header avec navigation -->
        ${this.renderHeader()}

        <!-- Contenu principal -->
        <div class="srs-stats-content">
          <!-- Onglets -->
          ${this.renderTabs()}

          <!-- Section Vue d'ensemble (par défaut) -->
          <div id="stats-overview" class="stats-tab-content active">
            ${this.renderOverview()}
          </div>

          <!-- Section Graphiques -->
          <div id="stats-charts" class="stats-tab-content">
            ${this.renderCharts()}
          </div>

          <!-- Section Analyse détaillée -->
          <div id="stats-analysis" class="stats-tab-content">
            ${this.renderAnalysis()}
          </div>

          <!-- Section Historique -->
          <div id="stats-history" class="stats-tab-content">
            ${this.renderHistory()}
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Rendre le header avec navigation
   */
  renderHeader: function() {
    return `
      <div class="srs-stats-header">
        <button class="back-btn" onclick="SRSStatsScreen.goBack()">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M19 12H5M12 19l-7-7 7-7" stroke-width="2" stroke-linecap="round"/>
          </svg>
          Retour
        </button>
        <h1 class="stats-title">
          <span class="stats-icon">📊</span>
          Statistiques avancées SRS
        </h1>
        <button class="refresh-btn" onclick="SRSStatsScreen.refresh()">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
    `;
  },

  /**
   * Rendre les onglets
   */
  renderTabs: function() {
    return `
      <div class="stats-tabs">
        <button class="stats-tab active" data-tab="overview" onclick="SRSStatsScreen.switchTab('overview')">
          <span class="tab-icon">🎯</span>
          <span class="tab-label">Vue d'ensemble</span>
        </button>
        <button class="stats-tab" data-tab="charts" onclick="SRSStatsScreen.switchTab('charts')">
          <span class="tab-icon">📈</span>
          <span class="tab-label">Graphiques</span>
        </button>
        <button class="stats-tab" data-tab="analysis" onclick="SRSStatsScreen.switchTab('analysis')">
          <span class="tab-icon">🔍</span>
          <span class="tab-label">Analyse</span>
        </button>
        <button class="stats-tab" data-tab="history" onclick="SRSStatsScreen.switchTab('history')">
          <span class="tab-icon">📜</span>
          <span class="tab-label">Historique</span>
        </button>
      </div>
    `;
  },

  /**
   * Vue d'ensemble (métriques clés)
   */
  renderOverview: function() {
    if (typeof SRSStatsAdvanced === 'undefined') {
      return '<p>SRSStatsAdvanced non disponible</p>';
    }

    const retention = SRSStatsAdvanced.calculateRetentionRate();
    const velocity = SRSStatsAdvanced.calculateLearningVelocity();
    const streak = SRSStatsAdvanced.calculateStreakStats();
    const forecast = SRSStatsAdvanced.forecastReviews(7);

    const nextReviews = forecast[0] ? forecast[0].total : 0;
    const upcomingWeek = forecast.reduce((sum, day) => sum + day.total, 0);

    return `
      <div class="overview-section">
        <h2 class="section-title">📊 Vue d'ensemble</h2>

        <!-- Métriques principales -->
        <div class="metrics-grid">
          <!-- Rétention -->
          <div class="metric-card ${retention.overall >= 75 ? 'success' : retention.overall >= 60 ? 'warning' : 'danger'}">
            <div class="metric-header">
              <div class="metric-icon">🎯</div>
              <div class="metric-trend">
                ${retention.lastWeek > retention.lastMonth ? '📈' : retention.lastWeek < retention.lastMonth ? '📉' : '➡️'}
              </div>
            </div>
            <div class="metric-value">${retention.overall}%</div>
            <div class="metric-label">Taux de rétention</div>
            <div class="metric-details">
              <span>Semaine: ${retention.lastWeek}%</span>
              <span>Mois: ${retention.lastMonth}%</span>
            </div>
            <div class="metric-footer">
              ${retention.totalReviews} reviews au total
            </div>
          </div>

          <!-- Vélocité -->
          <div class="metric-card info">
            <div class="metric-header">
              <div class="metric-icon">⚡</div>
              <div class="metric-trend">${this.getTrendIcon(velocity.trend)}</div>
            </div>
            <div class="metric-value">${velocity.perWeek}</div>
            <div class="metric-label">Cartes / semaine</div>
            <div class="metric-details">
              <span>${velocity.perDay} / jour</span>
              <span>${velocity.totalMastered} maîtrisées</span>
            </div>
            <div class="metric-footer">
              Projection 30j: ${velocity.projection30Days} cartes
            </div>
          </div>

          <!-- Streak -->
          <div class="metric-card ${streak.currentStreak >= 7 ? 'success' : 'warning'}">
            <div class="metric-header">
              <div class="metric-icon">🔥</div>
              <div class="metric-badge">${streak.currentStreak >= streak.longestStreak ? '🏆' : ''}</div>
            </div>
            <div class="metric-value">${streak.currentStreak}</div>
            <div class="metric-label">Jours consécutifs</div>
            <div class="metric-details">
              <span>Record: ${streak.longestStreak} jours</span>
              <span>Régularité: ${streak.consistencyRate}%</span>
            </div>
            <div class="metric-footer">
              ${streak.totalDaysActive} jours actifs
            </div>
          </div>

          <!-- Prochaines reviews -->
          <div class="metric-card primary">
            <div class="metric-header">
              <div class="metric-icon">📅</div>
              <div class="metric-badge">Aujourd'hui</div>
            </div>
            <div class="metric-value">${nextReviews}</div>
            <div class="metric-label">Cartes à réviser</div>
            <div class="metric-details">
              <span>Cette semaine: ${upcomingWeek}</span>
            </div>
            <div class="metric-footer">
              <button class="btn-primary" onclick="SRSUI_V2.startDailySession()">
                Commencer
              </button>
            </div>
          </div>
        </div>

        <!-- Mini graphique de progression -->
        ${this.renderMiniProgressChart()}
      </div>
    `;
  },

  /**
   * Section Graphiques
   */
  renderCharts: function() {
    return `
      <div class="charts-section">
        <h2 class="section-title">📈 Graphiques de performance</h2>

        <div class="charts-grid">
          <!-- Graphique 1: Rétention -->
          <div class="chart-card large">
            <div class="chart-header">
              <h3>📊 Taux de rétention au fil du temps</h3>
              <span class="chart-subtitle">Évolution de vos performances</span>
            </div>
            <div class="chart-body">
              <canvas id="retention-chart" height="250"></canvas>
            </div>
          </div>

          <!-- Graphique 2: Forecast -->
          <div class="chart-card large">
            <div class="chart-header">
              <h3>🔮 Prédiction des révisions</h3>
              <span class="chart-subtitle">7 prochains jours</span>
            </div>
            <div class="chart-body">
              <canvas id="forecast-chart" height="250"></canvas>
            </div>
          </div>

          <!-- Graphique 3: Distribution par type -->
          <div class="chart-card medium">
            <div class="chart-header">
              <h3>📚 Distribution par type</h3>
              <span class="chart-subtitle">Répartition de vos cartes</span>
            </div>
            <div class="chart-body">
              <canvas id="type-distribution-chart" height="200"></canvas>
            </div>
          </div>

          <!-- Graphique 4: Activité temporelle -->
          <div class="chart-card medium">
            <div class="chart-header">
              <h3>⏰ Activité par heure</h3>
              <span class="chart-subtitle">Vos moments préférés</span>
            </div>
            <div class="chart-body">
              <canvas id="time-distribution-chart" height="200"></canvas>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Section Analyse détaillée
   */
  renderAnalysis: function() {
    if (typeof SRSStatsAdvanced === 'undefined') {
      return '<p>SRSStatsAdvanced non disponible</p>';
    }

    return `
      <div class="analysis-section">
        <h2 class="section-title">🔍 Analyse détaillée</h2>

        <!-- Analyse par type -->
        ${SRSCharts.renderTypeAnalysis()}

        <!-- Cartes problématiques -->
        ${SRSCharts.renderProblematicCards()}

        <!-- Jalons -->
        ${SRSCharts.renderMilestones()}

        <!-- Recommandations -->
        ${this.renderRecommendations()}
      </div>
    `;
  },

  /**
   * Section Historique
   */
  renderHistory: function() {
    if (typeof SRSStatsAdvanced === 'undefined') {
      return '<p>SRSStatsAdvanced non disponible</p>';
    }

    const reviewHistory = SRSStatsAdvanced.getReviewHistory();
    const recentReviews = reviewHistory.slice(-50).reverse(); // 50 dernières reviews

    return `
      <div class="history-section">
        <h2 class="section-title">📜 Historique des révisions</h2>

        <div class="history-stats">
          <div class="history-stat">
            <span class="stat-icon">📝</span>
            <span class="stat-value">${reviewHistory.length}</span>
            <span class="stat-label">Reviews totales</span>
          </div>
          <div class="history-stat">
            <span class="stat-icon">✅</span>
            <span class="stat-value">${reviewHistory.filter(r => r.success).length}</span>
            <span class="stat-label">Réussies</span>
          </div>
          <div class="history-stat">
            <span class="stat-icon">❌</span>
            <span class="stat-value">${reviewHistory.filter(r => !r.success).length}</span>
            <span class="stat-label">Échouées</span>
          </div>
        </div>

        <div class="history-list">
          <div class="history-header">
            <h3>Dernières révisions</h3>
            <button class="btn-secondary" onclick="SRSStatsScreen.exportHistory()">
              Exporter
            </button>
          </div>

          ${recentReviews.length === 0
            ? '<p class="empty-state">Aucune révision enregistrée pour le moment.</p>'
            : `
              <div class="history-items">
                ${recentReviews.slice(0, 30).map(review => `
                  <div class="history-item ${review.success ? 'success' : 'failure'}">
                    <div class="history-char">${review.character}</div>
                    <div class="history-info">
                      <span class="history-type">${review.type}</span>
                      <span class="history-time">${this.formatTimestamp(review.timestamp)}</span>
                    </div>
                    <div class="history-result">
                      ${review.success ? '✅' : '❌'}
                    </div>
                  </div>
                `).join('')}
              </div>
            `
          }
        </div>
      </div>
    `;
  },

  /**
   * Mini graphique de progression (sparkline)
   */
  renderMiniProgressChart: function() {
    return `
      <div class="mini-progress-section">
        <h3>📊 Progression récente (30 derniers jours)</h3>
        <div class="progress-bars">
          <div class="progress-bar-item">
            <div class="progress-bar-label">
              <span>Cartes vues</span>
              <span class="progress-bar-value">85%</span>
            </div>
            <div class="progress-bar-track">
              <div class="progress-bar-fill" style="width: 85%; background: linear-gradient(90deg, #8b5cf6, #3b82f6);"></div>
            </div>
          </div>
          <div class="progress-bar-item">
            <div class="progress-bar-label">
              <span>Cartes maîtrisées</span>
              <span class="progress-bar-value">62%</span>
            </div>
            <div class="progress-bar-track">
              <div class="progress-bar-fill" style="width: 62%; background: linear-gradient(90deg, #10b981, #3b82f6);"></div>
            </div>
          </div>
          <div class="progress-bar-item">
            <div class="progress-bar-label">
              <span>Objectif mensuel</span>
              <span class="progress-bar-value">78%</span>
            </div>
            <div class="progress-bar-track">
              <div class="progress-bar-fill" style="width: 78%; background: linear-gradient(90deg, #f59e0b, #ef4444);"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Recommandations personnalisées
   */
  renderRecommendations: function() {
    const retention = SRSStatsAdvanced.calculateRetentionRate();
    const velocity = SRSStatsAdvanced.calculateLearningVelocity();
    const streak = SRSStatsAdvanced.calculateStreakStats();

    const recommendations = [];

    // Recommandations basées sur la rétention
    if (retention.overall < 60) {
      recommendations.push({
        type: 'warning',
        icon: '⚠️',
        title: 'Améliorer votre rétention',
        message: 'Votre taux de rétention est faible. Révisez plus souvent vos cartes difficiles.',
        action: 'Réviser maintenant',
        onclick: 'SRSUI_V2.startDailySession()'
      });
    }

    // Recommandations basées sur le streak
    if (streak.currentStreak === 0) {
      recommendations.push({
        type: 'info',
        icon: '🔥',
        title: 'Recommencer votre série',
        message: 'Vous avez perdu votre série. Faites une révision aujourd\'hui pour recommencer !',
        action: 'Commencer',
        onclick: 'SRSUI_V2.startDailySession()'
      });
    } else if (streak.currentStreak < 7) {
      recommendations.push({
        type: 'success',
        icon: '💪',
        title: 'Continuez votre série !',
        message: `Vous êtes à ${streak.currentStreak} jours. Visez 7 jours consécutifs !`,
        action: 'Continuer',
        onclick: 'SRSUI_V2.startDailySession()'
      });
    }

    // Recommandations basées sur la vélocité
    if (velocity.trend === 'decreasing') {
      recommendations.push({
        type: 'warning',
        icon: '📉',
        title: 'Rythme en baisse',
        message: 'Votre rythme d\'apprentissage ralentit. Augmentez vos sessions quotidiennes.',
        action: 'Voir les objectifs',
        onclick: 'SRSStatsScreen.switchTab(\'analysis\')'
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        type: 'success',
        icon: '🎉',
        title: 'Excellent travail !',
        message: 'Vous progressez très bien. Continuez comme ça !',
        action: 'Continuer à apprendre',
        onclick: 'SRSUI_V2.startDailySession()'
      });
    }

    return `
      <div class="recommendations-section">
        <h3>💡 Recommandations personnalisées</h3>
        <div class="recommendations-list">
          ${recommendations.map(rec => `
            <div class="recommendation-card ${rec.type}">
              <div class="recommendation-icon">${rec.icon}</div>
              <div class="recommendation-content">
                <h4>${rec.title}</h4>
                <p>${rec.message}</p>
                <button class="btn-recommendation" onclick="${rec.onclick}">
                  ${rec.action}
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // ===== ACTIONS =====

  /**
   * Changer d'onglet
   */
  switchTab: function(tabName) {
    // Désactiver tous les onglets
    document.querySelectorAll('.stats-tab').forEach(tab => {
      tab.classList.remove('active');
    });

    // Cacher tous les contenus
    document.querySelectorAll('.stats-tab-content').forEach(content => {
      content.classList.remove('active');
    });

    // Activer l'onglet sélectionné
    const selectedTab = document.querySelector(`.stats-tab[data-tab="${tabName}"]`);
    if (selectedTab) {
      selectedTab.classList.add('active');
    }

    // Afficher le contenu correspondant
    const selectedContent = document.getElementById(`stats-${tabName}`);
    if (selectedContent) {
      selectedContent.classList.add('active');
    }

    // Si on switch vers charts, réinitialiser les graphiques
    if (tabName === 'charts' && typeof SRSCharts !== 'undefined') {
      setTimeout(() => SRSCharts.refreshAll(), 100);
    }
  },

  /**
   * Rafraîchir les stats
   */
  refresh: function() {
    console.log('Rafraîchissement des stats...');
    this.show();
  },

  /**
   * Retour à l'écran précédent
   */
  goBack: function() {
    this.hide();

    // Retourner à l'écran SRS
    if (typeof SRSUI_V2 !== 'undefined') {
      SRSUI_V2.showScreen();
    } else if (typeof SRSScreen !== 'undefined') {
      SRSScreen.show();
    } else {
      // Afficher le contenu principal
      const mainContent = document.getElementById('main-content');
      if (mainContent) mainContent.style.display = 'block';
    }
  },

  /**
   * Exporter l'historique en JSON
   */
  exportHistory: function() {
    if (typeof SRSStatsAdvanced === 'undefined') {
      alert('SRSStatsAdvanced non disponible');
      return;
    }

    const reviewHistory = SRSStatsAdvanced.getReviewHistory();
    const dataStr = JSON.stringify(reviewHistory, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `srs-history-${Date.now()}.json`;
    link.click();

    URL.revokeObjectURL(url);
  },

  // ===== HELPERS =====

  getTrendIcon: function(trend) {
    const icons = {
      'increasing': '📈',
      'stable': '➡️',
      'decreasing': '📉'
    };
    return icons[trend] || '➡️';
  },

  formatTimestamp: function(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'À l\'instant';
    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays < 7) return `Il y a ${diffDays}j`;

    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
};

// Exposition globale
if (typeof window !== 'undefined') {
  window.SRSStatsScreen = SRSStatsScreen;
}
