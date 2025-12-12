/**
 * 💝 Interface de Récupération de Vies
 *
 * UI moderne pour récupérer des vies gratuitement
 * - Affichage du progrès SRS (X/5 révisions)
 * - Bouton pour récupérer une vie
 * - Modal d'information
 */

const LivesRecoveryUI = {
  /**
   * Initialiser l'UI
   */
  init: function() {
    this.createRecoveryButton();
    this.createRecoveryModal();
    this.listenToEvents();
    this.updateUI();

    console.log('💝 Lives Recovery UI initialized');
  },

  /**
   * Créer le bouton de récupération dans le header
   */
  createRecoveryButton: function() {
    const livesContainer = document.querySelector('.lives-container');

    if (!livesContainer) {
      console.warn('Lives container not found, recovery button not added');
      return;
    }

    // Créer le bouton de récupération
    const recoveryBtn = document.createElement('button');
    recoveryBtn.className = 'lives-recovery-btn';
    recoveryBtn.innerHTML = `
      <span class="recovery-icon">💝</span>
      <span class="recovery-text">Récupérer</span>
      <span class="recovery-badge" id="srsProgressBadge">0/5</span>
    `;
    recoveryBtn.onclick = () => this.openRecoveryModal();

    // Ajouter après le compteur de vies
    livesContainer.appendChild(recoveryBtn);
  },

  /**
   * Créer le modal de récupération
   */
  createRecoveryModal: function() {
    const modal = document.createElement('div');
    modal.id = 'recoveryModal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal-content recovery-modal">
        <button class="modal-close" id="recoveryModalCloseBtn">✕</button>

        <h2 class="modal-title">💝 Récupérer des Vies</h2>
        <p class="modal-subtitle">Gratuit • Sans pub • Juste en apprenant</p>

        <div class="recovery-methods">
          <!-- Méthode 1 : SRS Reviews -->
          <div class="recovery-method srs-method" id="srsRecoveryMethod">
            <div class="method-icon">📚</div>
            <div class="method-content">
              <h3>Révisions SRS</h3>
              <p class="method-description">Révise 5 cartes SRS correctement pour récupérer une vie</p>

              <div class="srs-progress-container">
                <div class="srs-progress-bar">
                  <div class="srs-progress-fill" id="srsProgressFill" style="width: 0%"></div>
                </div>
                <div class="srs-progress-text" id="srsProgressText">0/5 révisions</div>
              </div>

              <button class="recovery-action-btn" id="srsRecoverBtn" disabled>
                <span class="btn-icon">🎁</span>
                <span class="btn-text">Récupérer +1 vie</span>
              </button>

              <div class="recovery-info" id="srsRecoveryInfo">
                <span class="info-icon">ℹ️</span>
                <span class="info-text">Commence à réviser pour débloquer</span>
              </div>
            </div>
          </div>

          <!-- Méthode 2 : Pub (future) -->
          <div class="recovery-method ad-method disabled">
            <div class="method-icon">📺</div>
            <div class="method-content">
              <h3>Regarder une publicité</h3>
              <p class="method-description">Regarde une courte pub de 15s (bientôt disponible)</p>

              <button class="recovery-action-btn" disabled>
                <span class="btn-icon">🎬</span>
                <span class="btn-text">Bientôt disponible</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Daily Limit Info -->
        <div class="daily-limit-info" id="dailyLimitInfo">
          <span class="limit-icon">📊</span>
          <span class="limit-text" id="dailyLimitText">Récupérations aujourd'hui : 0/3</span>
        </div>

        <!-- Anti-Duolingo Message -->
        <div class="anti-duolingo-message">
          <p>💡 <strong>Différence avec Duolingo :</strong></p>
          <p>Eux : "Plus de vies ? Payez ou attendez 4h" 😤</p>
          <p>Nous : "Révisez et récupérez gratuitement" 😊</p>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Ajouter event listener sur le bouton de fermeture
    const closeBtn = document.getElementById('recoveryModalCloseBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Empêcher la propagation
        this.closeRecoveryModal();
      });
    }

    // Fermer en cliquant sur l'overlay
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeRecoveryModal();
      }
    });
  },

  /**
   * Ouvrir le modal de récupération
   */
  openRecoveryModal: function() {
    const modal = document.getElementById('recoveryModal');
    modal.classList.add('active');

    // Mettre à jour l'UI
    this.updateModalUI();
  },

  /**
   * Fermer le modal de récupération
   */
  closeRecoveryModal: function() {
    const modal = document.getElementById('recoveryModal');
    if (modal) {
      // Animation de fermeture
      modal.style.opacity = '0';
      setTimeout(() => {
        modal.classList.remove('active');
        modal.style.opacity = '1'; // Reset pour la prochaine ouverture
      }, 200);
    }
  },

  /**
   * Mettre à jour l'UI du modal
   */
  updateModalUI: function() {
    const stats = LivesRecovery.getStats();

    // 1. Mettre à jour la progression SRS
    const progressPercent = (stats.srs.progress / stats.srs.needed) * 100;
    document.getElementById('srsProgressFill').style.width = progressPercent + '%';
    document.getElementById('srsProgressText').textContent = `${stats.srs.progress}/${stats.srs.needed} révisions`;

    // 2. Mettre à jour le bouton de récupération
    const recoverBtn = document.getElementById('srsRecoverBtn');
    const recoveryInfo = document.getElementById('srsRecoveryInfo');

    if (stats.srs.canRecover) {
      // Peut récupérer
      recoverBtn.disabled = false;
      recoverBtn.classList.add('ready');
      recoverBtn.onclick = () => this.handleSRSRecovery();

      recoveryInfo.innerHTML = `
        <span class="info-icon">✅</span>
        <span class="info-text">Prêt à récupérer une vie !</span>
      `;
      recoveryInfo.classList.add('success');
    } else {
      // Ne peut pas récupérer
      recoverBtn.disabled = true;
      recoverBtn.classList.remove('ready');

      // Afficher la raison
      const reason = stats.srs.reason;
      let infoMessage = '';

      if (reason === 'notEnoughReviews') {
        const remaining = stats.srs.needed - stats.srs.progress;
        infoMessage = `Encore ${remaining} révision${remaining > 1 ? 's' : ''} à faire`;
      } else if (reason === 'cooldown') {
        infoMessage = `Réessaye dans ${stats.srs.cooldownRemaining}`;
      } else if (reason === 'dailyLimit') {
        infoMessage = 'Limite quotidienne atteinte (3/jour)';
      } else if (reason === 'fullLives') {
        infoMessage = 'Tes vies sont déjà pleines !';
      }

      recoveryInfo.innerHTML = `
        <span class="info-icon">ℹ️</span>
        <span class="info-text">${infoMessage}</span>
      `;
      recoveryInfo.classList.remove('success');
    }

    // 3. Mettre à jour le compteur quotidien
    document.getElementById('dailyLimitText').textContent =
      `Récupérations aujourd'hui : ${stats.daily.recoveries}/${stats.daily.max}`;
  },

  /**
   * Gérer la récupération via SRS
   */
  handleSRSRecovery: function() {
    const result = LivesRecovery.recoverLifeViaSRS();

    if (result.success) {
      // Succès : afficher notification et fermer modal
      this.showSuccessNotification(result.message);
      this.closeRecoveryModal();

      // Mettre à jour l'UI du header
      this.updateUI();
    } else {
      // Échec : afficher message d'erreur
      this.showErrorNotification(result.message);
    }
  },

  /**
   * Afficher notification de succès
   */
  showSuccessNotification: function(message) {
    const notification = document.createElement('div');
    notification.className = 'recovery-notification success animate-slideInDown';
    notification.innerHTML = `
      <span class="notif-icon">🎉</span>
      <span class="notif-text">${message}</span>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('animate-fadeOut');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  },

  /**
   * Afficher notification d'erreur
   */
  showErrorNotification: function(message) {
    const notification = document.createElement('div');
    notification.className = 'recovery-notification error animate-shake';
    notification.innerHTML = `
      <span class="notif-icon">❌</span>
      <span class="notif-text">${message}</span>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('animate-fadeOut');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  },

  /**
   * Mettre à jour le badge de progression dans le header
   */
  updateUI: function() {
    const stats = LivesRecovery.getStats();
    const badge = document.getElementById('srsProgressBadge');

    if (badge) {
      badge.textContent = `${stats.srs.progress}/${stats.srs.needed}`;

      // Ajouter classe "ready" si peut récupérer
      const btn = document.querySelector('.lives-recovery-btn');
      if (stats.srs.canRecover) {
        btn.classList.add('ready');
        badge.classList.add('pulse');
      } else {
        btn.classList.remove('ready');
        badge.classList.remove('pulse');
      }
    }
  },

  /**
   * Écouter les événements
   */
  listenToEvents: function() {
    // Mise à jour de la progression SRS
    window.addEventListener('srsRecoveryProgress', () => {
      this.updateUI();
      this.updateModalUI();
    });

    // Vie récupérée
    window.addEventListener('lifeRecovered', () => {
      this.updateUI();
    });

    // Vies mises à jour
    window.addEventListener('livesUpdated', () => {
      this.updateUI();
    });

    // Récupération disponible
    window.addEventListener('recoveryAvailable', (e) => {
      this.showRecoveryAvailableToast(e.detail.message);
    });
  },

  /**
   * Afficher toast quand récupération disponible
   */
  showRecoveryAvailableToast: function(message) {
    const toast = document.createElement('div');
    toast.className = 'recovery-toast animate-bounceIn';
    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-icon">🎁</span>
        <div class="toast-text">
          <strong>Vie gratuite disponible !</strong>
          <p>${message}</p>
        </div>
      </div>
      <button class="toast-btn" onclick="LivesRecoveryUI.openRecoveryModal()">
        Récupérer →
      </button>
    `;

    document.body.appendChild(toast);

    // Auto-fermer après 10s
    setTimeout(() => {
      toast.classList.add('animate-fadeOut');
      setTimeout(() => toast.remove(), 300);
    }, 10000);

    // Fermer en cliquant
    toast.onclick = (e) => {
      if (e.target === toast) {
        toast.remove();
      }
    };
  }
};

// Exposer dans window (initialisation manuelle depuis app.js)
if (typeof window !== 'undefined') {
  window.LivesRecoveryUI = LivesRecoveryUI;
  console.log('💝 Lives Recovery UI loaded (waiting for manual init)');
}
