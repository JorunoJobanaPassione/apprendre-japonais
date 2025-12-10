/**
 * 🎨 Interface Leaderboard V2
 * UI moderne avec onglets + Podium + Champion
 * Version: 2.0.0
 */

const LeaderboardUI = {
  // ===== ÉTAT =====
  currentTab: 'weekly',
  currentData: [],
  isLoading: false,

  /**
   * Initialiser l'UI
   */
  init: function() {
    console.log('🎨 Leaderboard UI V2 initialized');

    // Charger les données initiales
    this.loadData();
  },

  /**
   * Charger les données selon l'onglet actif
   */
  loadData: async function() {
    if (this.isLoading) return;
    this.isLoading = true;

    try {
      // Mettre à jour l'entrée locale de l'utilisateur
      if (window.LeaderboardEnhanced) {
        LeaderboardEnhanced.updateLocalEntry();
      }

      // Récupérer les données
      let data = [];
      if (window.LeaderboardEnhanced) {
        data = await LeaderboardEnhanced.getCurrentRanking();
      }

      this.currentData = data;
      this.render();
    } catch (error) {
      console.error('Erreur chargement leaderboard:', error);
    } finally {
      this.isLoading = false;
    }
  },

  /**
   * Changer d'onglet
   */
  switchTab: function(tab) {
    this.currentTab = tab;

    // Mettre à jour l'onglet actif dans LeaderboardEnhanced
    if (window.LeaderboardEnhanced) {
      LeaderboardEnhanced.currentPeriod = tab;
    }

    // Mettre à jour les styles des onglets
    document.querySelectorAll('.leaderboard-tab').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-period="${tab}"]`)?.classList.add('active');

    // Recharger les données
    this.loadData();
  },

  /**
   * Rendre l'interface complète
   */
  render: function() {
    const container = document.getElementById('leaderboard-content');
    if (!container) return;

    // Vider le container
    container.innerHTML = '';

    // Afficher le chargement
    if (this.isLoading) {
      container.innerHTML = `
        <div class="leaderboard-loading">
          <div class="loading-spinner"></div>
          <p>Chargement du classement...</p>
        </div>
      `;
      return;
    }

    // Si pas de données
    if (this.currentData.length === 0) {
      container.innerHTML = `
        <div class="leaderboard-empty">
          <div class="empty-icon">🏆</div>
          <h3>Aucun classement disponible</h3>
          <p>Soyez le premier à apparaître dans le classement ${this.getPeriodLabel()} !</p>
        </div>
      `;
      return;
    }

    // Créer le HTML
    const html = `
      ${this.renderPodium()}
      ${this.renderRankingList()}
      ${this.renderUserPosition()}
    `;

    container.innerHTML = html;

    // Ajouter les animations
    this.animateEntrance();
  },

  /**
   * Rendre le podium (Top 3)
   */
  renderPodium: function() {
    const top3 = this.currentData.slice(0, 3);

    if (top3.length === 0) return '';

    // Réorganiser pour afficher 2-1-3
    const podiumOrder = [
      top3[1] || null, // 2ème place à gauche
      top3[0] || null, // 1ère place au centre
      top3[2] || null  // 3ème place à droite
    ];

    const positions = ['second', 'first', 'third'];
    const medals = ['🥈', '🥇', '🥉'];
    const heights = ['podium-medium', 'podium-tall', 'podium-short'];

    return `
      <div class="leaderboard-podium">
        ${podiumOrder.map((user, index) => {
          if (!user) return '';

          const realRank = index === 1 ? 1 : (index === 0 ? 2 : 3);
          const isCurrentUser = this.isCurrentUser(user.username);

          return `
            <div class="podium-position ${positions[index]} ${heights[index]} ${isCurrentUser ? 'current-user' : ''}">
              <div class="podium-medal">${medals[index]}</div>
              <div class="podium-avatar">${this.getAvatar(user.username)}</div>
              <div class="podium-username">${this.truncateUsername(user.username)}</div>
              <div class="podium-xp">💎 ${this.formatNumber(user.total_xp)} XP</div>
              <div class="podium-rank">#${realRank}</div>
              ${realRank === 1 ? '<div class="podium-crown">👑</div>' : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  /**
   * Rendre la liste du classement (4-10)
   */
  renderRankingList: function() {
    const rest = this.currentData.slice(3);

    if (rest.length === 0) return '';

    return `
      <div class="leaderboard-list">
        ${rest.map((user, index) => {
          const rank = index + 4;
          const isCurrentUser = this.isCurrentUser(user.username);

          return `
            <div class="leaderboard-item ${isCurrentUser ? 'current-user' : ''}" data-rank="${rank}">
              <div class="item-rank">
                <span class="rank-number">${rank}</span>
              </div>
              <div class="item-avatar">${this.getAvatar(user.username)}</div>
              <div class="item-info">
                <div class="item-username">${user.username}</div>
                <div class="item-stats">
                  <span class="stat">📚 ${user.lessons_completed || 0} leçons</span>
                  <span class="stat">🔥 ${user.streak || 0} jours</span>
                  <span class="stat">🏅 ${user.badges_count || 0} badges</span>
                </div>
              </div>
              <div class="item-xp">
                <div class="xp-value">💎 ${this.formatNumber(user.total_xp)}</div>
                <div class="xp-label">XP</div>
              </div>
              <div class="item-level">
                <div class="level-badge">Niv. ${user.level || 1}</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  /**
   * Rendre la position de l'utilisateur actuel (si hors Top 10)
   */
  renderUserPosition: async function() {
    if (!window.LeaderboardEnhanced) return '';

    const position = await LeaderboardEnhanced.getUserPosition();

    if (!position || position.inTop10) return '';

    const container = document.getElementById('leaderboard-user-position');
    if (!container) return '';

    container.innerHTML = `
      <div class="user-position-card">
        <div class="position-icon">📍</div>
        <div class="position-info">
          <h4>Votre position</h4>
          <p>Vous n'êtes pas encore dans le Top 10</p>
          <p class="position-rank">Position estimée : #${position.rank}+</p>
        </div>
        <div class="position-cta">
          <p>Complétez plus de leçons pour grimper !</p>
        </div>
      </div>
    `;
  },

  /**
   * Animer l'apparition des éléments
   */
  animateEntrance: function() {
    // Podium
    const podiumElements = document.querySelectorAll('.podium-position');
    podiumElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-zoomIn');
      }, index * 100);
    });

    // Liste
    const listItems = document.querySelectorAll('.leaderboard-item');
    listItems.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('animate-slideInUp');
      }, (index + 3) * 80);
    });
  },

  /**
   * Vérifier si c'est l'utilisateur actuel
   */
  isCurrentUser: function(username) {
    const currentUsername = LeaderboardSystem ? LeaderboardSystem.currentUsername : null;
    return username === currentUsername;
  },

  /**
   * Obtenir l'avatar d'un utilisateur (emoji basé sur le username)
   */
  getAvatar: function(username) {
    const avatars = ['👤', '🧑', '👨', '👩', '🦸', '🥷', '🧙', '🎓', '🏃', '🤓'];
    const hash = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return avatars[hash % avatars.length];
  },

  /**
   * Tronquer un username trop long
   */
  truncateUsername: function(username, maxLength = 12) {
    if (username.length <= maxLength) return username;
    return username.substring(0, maxLength - 3) + '...';
  },

  /**
   * Formater un nombre avec séparateur de milliers
   */
  formatNumber: function(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  },

  /**
   * Obtenir le label de la période actuelle
   */
  getPeriodLabel: function() {
    const labels = {
      weekly: 'hebdomadaire',
      monthly: 'mensuel',
      alltime: 'de tous les temps'
    };
    return labels[this.currentTab] || 'hebdomadaire';
  }
};

// Exposition globale
if (typeof window !== 'undefined') {
  window.LeaderboardUI = LeaderboardUI;
}
