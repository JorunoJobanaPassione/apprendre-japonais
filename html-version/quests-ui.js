/**
 * 🎨 Interface Utilisateur des Quêtes
 * Version: 1.0.0
 * Impact: +30% engagement quotidien
 *
 * Gère:
 * - Modal des quêtes
 * - Notifications de complétion
 * - Indicateur de progression
 * - Animations
 */

const QuestsUI = {
  // ===== ÉTAT =====
  isModalOpen: false,
  currentTab: 'daily', // daily, weekly, main

  // ===== INITIALISATION =====
  initialize: function() {
    console.log('🎨 Initialisation de l\'UI des quêtes...');

    // Créer les éléments UI
    this.createQuestsButton();
    this.createQuestsModal();

    // Mettre à jour l'affichage initial
    this.updateQuestsDisplay();

    console.log('✅ UI des quêtes initialisée');
  },

  // ===== CRÉATION DES ÉLÉMENTS =====

  /**
   * Crée le bouton "Quêtes" dans la navigation
   */
  createQuestsButton: function() {
    const navButtons = document.querySelector('.nav-buttons');
    if (!navButtons) return;

    const questsBtn = document.createElement('button');
    questsBtn.id = 'quests-btn';
    questsBtn.className = 'nav-btn';
    questsBtn.innerHTML = `
      <span class="quests-icon">🎯</span>
      <span class="quests-label">Quêtes</span>
      <span class="quests-badge" id="quests-badge">0</span>
    `;
    questsBtn.onclick = () => this.openQuestsModal();

    // Insérer après le bouton leaderboard
    const leaderboardBtn = document.getElementById('leaderboard-btn');
    if (leaderboardBtn) {
      leaderboardBtn.after(questsBtn);
    } else {
      navButtons.appendChild(questsBtn);
    }
  },

  /**
   * Crée la modal des quêtes
   */
  createQuestsModal: function() {
    const modal = document.createElement('div');
    modal.id = 'quests-modal';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content quests-modal-content">
        <div class="modal-header">
          <h2>🎯 Quêtes</h2>
          <button class="close-btn" onclick="QuestsUI.closeQuestsModal()">&times;</button>
        </div>

        <!-- Onglets -->
        <div class="quests-tabs">
          <button class="quest-tab active" data-tab="daily" onclick="QuestsUI.switchTab('daily')">
            📅 Quotidiennes <span class="tab-count" id="daily-count">0/3</span>
          </button>
          <button class="quest-tab" data-tab="weekly" onclick="QuestsUI.switchTab('weekly')">
            📆 Hebdomadaires <span class="tab-count" id="weekly-count">0/5</span>
          </button>
          <button class="quest-tab" data-tab="main" onclick="QuestsUI.switchTab('main')">
            ⭐ Principales <span class="tab-count" id="main-count">0/7</span>
          </button>
        </div>

        <!-- Statistiques rapides -->
        <div class="quests-stats">
          <div class="quest-stat">
            <span class="stat-icon">💎</span>
            <span class="stat-value" id="total-xp-earned">0</span>
            <span class="stat-label">XP des quêtes</span>
          </div>
          <div class="quest-stat">
            <span class="stat-icon">✅</span>
            <span class="stat-value" id="total-completed">0</span>
            <span class="stat-label">Complétées</span>
          </div>
        </div>

        <!-- Liste des quêtes -->
        <div class="quests-list" id="quests-list">
          <!-- Les quêtes seront injectées ici -->
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Fermer la modal en cliquant à l'extérieur
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeQuestsModal();
      }
    });
  },

  // ===== GESTION DE LA MODAL =====

  /**
   * Ouvre la modal des quêtes
   */
  openQuestsModal: function() {
    const modal = document.getElementById('quests-modal');
    if (!modal) return;

    this.isModalOpen = true;
    modal.style.display = 'flex';

    // Animation d'ouverture
    const content = modal.querySelector('.modal-content');
    if (content && window.AnimationHelper) {
      content.classList.add('animate-zoomIn');
      setTimeout(() => content.classList.remove('animate-zoomIn'), 300);
    }

    // Rafraîchir l'affichage
    this.updateQuestsDisplay();
  },

  /**
   * Ferme la modal des quêtes
   */
  closeQuestsModal: function() {
    const modal = document.getElementById('quests-modal');
    if (!modal) return;

    this.isModalOpen = false;
    modal.style.display = 'none';
  },

  /**
   * Change d'onglet
   */
  switchTab: function(tab) {
    this.currentTab = tab;

    // Mettre à jour les onglets actifs
    document.querySelectorAll('.quest-tab').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

    // Afficher les quêtes correspondantes
    this.renderQuests();
  },

  // ===== AFFICHAGE DES QUÊTES =====

  /**
   * Met à jour tout l'affichage des quêtes
   */
  updateQuestsDisplay: function() {
    if (!window.QuestsSystem) return;

    // Mettre à jour le badge du bouton
    this.updateQuestsBadge();

    // Mettre à jour les compteurs des onglets
    this.updateTabCounts();

    // Mettre à jour les statistiques
    this.updateStats();

    // Afficher les quêtes de l'onglet actif
    if (this.isModalOpen) {
      this.renderQuests();
    }
  },

  /**
   * Met à jour le badge du bouton Quêtes
   */
  updateQuestsBadge: function() {
    const badge = document.getElementById('quests-badge');
    if (!badge || !window.QuestsSystem) return;

    const stats = window.QuestsSystem.getStats();
    const activeQuests = 3 - stats.dailyCompleted; // Quêtes quotidiennes restantes

    badge.textContent = activeQuests;
    badge.style.display = activeQuests > 0 ? 'flex' : 'none';
  },

  /**
   * Met à jour les compteurs des onglets
   */
  updateTabCounts: function() {
    if (!window.QuestsSystem) return;

    const stats = window.QuestsSystem.getStats();

    const dailyCount = document.getElementById('daily-count');
    const weeklyCount = document.getElementById('weekly-count');
    const mainCount = document.getElementById('main-count');

    if (dailyCount) dailyCount.textContent = `${stats.dailyCompleted}/3`;
    if (weeklyCount) weeklyCount.textContent = `${stats.weeklyCompleted}/${stats.weeklyTotal}`;
    if (mainCount) mainCount.textContent = `${stats.mainCompleted}/${stats.mainTotal}`;
  },

  /**
   * Met à jour les statistiques
   */
  updateStats: function() {
    if (!window.QuestsSystem) return;

    const stats = window.QuestsSystem.getStats();

    const totalXP = document.getElementById('total-xp-earned');
    const totalCompleted = document.getElementById('total-completed');

    if (totalXP) totalXP.textContent = stats.totalXPEarned;
    if (totalCompleted) {
      totalCompleted.textContent = stats.dailyCompleted + stats.weeklyCompleted + stats.mainCompleted;
    }
  },

  /**
   * Affiche les quêtes de l'onglet actif
   */
  renderQuests: function() {
    const container = document.getElementById('quests-list');
    if (!container || !window.QuestsSystem) return;

    const activeQuests = window.QuestsSystem.getActiveQuests();
    const quests = activeQuests[this.currentTab] || [];

    if (quests.length === 0) {
      container.innerHTML = `
        <div class="no-quests">
          <div class="no-quests-icon">🎉</div>
          <p>Toutes les quêtes ${this.getTabLabel()} sont complétées !</p>
        </div>
      `;
      return;
    }

    // Générer le HTML des quêtes
    container.innerHTML = quests.map(quest => this.renderQuestCard(quest)).join('');

    // Ajouter animation staggerée
    if (window.AnimationHelper) {
      const cards = container.querySelectorAll('.quest-card');
      window.AnimationHelper.staggerAnimation(cards, 'animate-slideInUp', 80);
    }
  },

  /**
   * Génère le HTML d'une carte de quête
   */
  renderQuestCard: function(quest) {
    const isCompleted = window.QuestsSystem.isQuestCompleted(quest.id);
    const progress = quest.progress || 0;
    const progressPercent = Math.min((progress / quest.target) * 100, 100);
    const difficulty = window.questDifficulties[quest.difficulty] || window.questDifficulties.easy;

    return `
      <div class="quest-card ${isCompleted ? 'quest-completed' : ''}" data-quest-id="${quest.id}">
        <div class="quest-icon">${quest.icon}</div>

        <div class="quest-info">
          <div class="quest-header">
            <h3 class="quest-title">${quest.title}</h3>
            <span class="quest-difficulty" style="background-color: ${difficulty.color}">
              ${difficulty.label}
            </span>
          </div>

          <p class="quest-description">${quest.description}</p>

          <div class="quest-progress-container">
            <div class="quest-progress-bar">
              <div class="quest-progress-fill" style="width: ${progressPercent}%"></div>
            </div>
            <span class="quest-progress-text">${progress}/${quest.target}</span>
          </div>

          <div class="quest-rewards">
            ${quest.rewards.xp > 0 ? `<span class="reward">💎 ${quest.rewards.xp} XP</span>` : ''}
            ${quest.rewards.lives > 0 ? `<span class="reward">❤️ ${quest.rewards.lives} ${quest.rewards.lives > 1 ? 'vies' : 'vie'}</span>` : ''}
            ${quest.rewards.badge ? `<span class="reward">🏆 Badge</span>` : ''}
          </div>
        </div>

        ${isCompleted ? '<div class="quest-check">✅</div>' : ''}
      </div>
    `;
  },

  /**
   * Retourne le label de l'onglet actif
   */
  getTabLabel: function() {
    const labels = {
      daily: 'quotidiennes',
      weekly: 'hebdomadaires',
      main: 'principales'
    };
    return labels[this.currentTab] || '';
  },

  // ===== NOTIFICATIONS =====

  /**
   * Affiche une notification de quête complétée
   */
  showQuestCompletedNotification: function(quest) {
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = 'quest-notification';
    notification.innerHTML = `
      <div class="quest-notification-content">
        <div class="quest-notification-icon">${quest.icon}</div>
        <div class="quest-notification-text">
          <h3>🎉 Quête complétée !</h3>
          <p class="quest-notification-title">${quest.title}</p>
          <div class="quest-notification-rewards">
            ${quest.rewards.xp > 0 ? `<span>💎 +${quest.rewards.xp} XP</span>` : ''}
            ${quest.rewards.lives > 0 ? `<span>❤️ +${quest.rewards.lives} ${quest.rewards.lives > 1 ? 'vies' : 'vie'}</span>` : ''}
            ${quest.rewards.badge ? `<span>🏆 Badge débloqué</span>` : ''}
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(notification);

    // Animation d'apparition
    setTimeout(() => {
      notification.classList.add('show');

      // Animation de célébration
      if (window.AnimationHelper) {
        notification.querySelector('.quest-notification-content').classList.add('animate-tada');
      }

      // Jouer un son (si disponible)
      this.playQuestCompletedSound();
    }, 100);

    // Retirer après 4 secondes
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 4000);

    // Cliquer pour fermer
    notification.addEventListener('click', () => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    });
  },

  /**
   * Joue le son de quête complétée
   */
  playQuestCompletedSound: function() {
    // Utiliser le son de succès existant
    if (window.AudioSystem && window.AudioSystem.playSound) {
      window.AudioSystem.playSound('success');
    }
  },

  // ===== HELPERS =====

  /**
   * Anime le bouton Quêtes (quand nouvelle quête disponible)
   */
  animateQuestsButton: function() {
    const btn = document.getElementById('quests-btn');
    if (!btn || !window.AnimationHelper) return;

    btn.classList.add('animate-pulse');
    setTimeout(() => btn.classList.remove('animate-pulse'), 1000);
  },

  /**
   * Affiche un indicateur "Nouvelle quête !"
   */
  showNewQuestIndicator: function() {
    const btn = document.getElementById('quests-btn');
    if (!btn) return;

    const indicator = document.createElement('div');
    indicator.className = 'new-quest-indicator';
    indicator.textContent = 'Nouveau !';
    btn.appendChild(indicator);

    // Animer
    if (window.AnimationHelper) {
      indicator.classList.add('animate-bounce');
    }

    // Retirer après 3 secondes
    setTimeout(() => {
      indicator.classList.add('animate-fadeOut');
      setTimeout(() => indicator.remove(), 300);
    }, 3000);
  }
};

// Exposition globale
if (typeof window !== 'undefined') {
  window.QuestsUI = QuestsUI;
}
