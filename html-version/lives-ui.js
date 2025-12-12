/**
 * 💖 Lives UI - Composant d'affichage des vies
 * Version: 1.0.0
 */

const LivesUI = {
  /**
   * Créer l'indicateur de vies dans le header
   */
  createLivesIndicator: function() {
    const stats = LivesSystem.getStats();

    return `
      <div class="lives-container" id="lives-indicator">
        <div class="lives-hearts">
          ${this.generateHearts(stats.lives, stats.maxLives)}
        </div>
        ${!stats.isFull ? `
          <div class="lives-timer" id="lives-timer">
            <span class="timer-icon">⏱️</span>
            <span class="timer-text">${stats.timeUntilNext}</span>
          </div>
        ` : ''}
      </div>
    `;
  },

  /**
   * Générer les coeurs (pleins et vides)
   * Sur mobile : format compact "❤️ 7" au lieu de 7 cœurs séparés
   */
  generateHearts: function(lives, maxLives) {
    // Détection mobile (largeur < 768px)
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // Format compact mobile : "❤️ 7"
      return `<span class="heart-compact">❤️ ${lives}</span>`;
    }

    // Format desktop : cœurs individuels
    let hearts = '';

    // Coeurs pleins
    for (let i = 0; i < lives; i++) {
      hearts += '<span class="heart full">❤️</span>';
    }

    // Coeurs vides
    for (let i = lives; i < maxLives; i++) {
      hearts += '<span class="heart empty">🤍</span>';
    }

    return hearts;
  },

  /**
   * Mettre à jour l'affichage des vies
   */
  updateLivesDisplay: function() {
    const indicator = document.getElementById('lives-indicator');
    if (!indicator) return;

    const stats = LivesSystem.getStats();

    // Mettre à jour les coeurs
    const heartsContainer = indicator.querySelector('.lives-hearts');
    if (heartsContainer) {
      heartsContainer.innerHTML = this.generateHearts(stats.lives, stats.maxLives);
    }

    // Mettre à jour le timer
    let timerElement = indicator.querySelector('.lives-timer');

    if (stats.isFull) {
      // Supprimer le timer si les vies sont pleines
      if (timerElement) {
        timerElement.remove();
      }
    } else {
      // Créer ou mettre à jour le timer
      if (!timerElement) {
        timerElement = document.createElement('div');
        timerElement.className = 'lives-timer';
        timerElement.id = 'lives-timer';
        indicator.appendChild(timerElement);
      }

      timerElement.innerHTML = `
        <span class="timer-icon">⏱️</span>
        <span class="timer-text">${stats.timeUntilNext}</span>
      `;
    }

    // Animation de perte de vie
    if (this.lastLives !== undefined && this.lastLives > stats.lives) {
      this.animateLivesLoss();
    }

    this.lastLives = stats.lives;
  },

  /**
   * Animation de perte de vie ✨ AMÉLIORÉE
   */
  animateLivesLoss: function() {
    const indicator = document.getElementById('lives-indicator');
    if (!indicator) return;

    // Animation du container
    indicator.classList.add('animate-shake', 'animate-errorFlash');

    // Animer le dernier cœur perdu
    const hearts = indicator.querySelectorAll('.heart.empty');
    const lastLostHeart = hearts[0]; // Le premier coeur vide est celui qui vient d'être perdu
    if (lastLostHeart) {
      // Utiliser AnimationHelper si disponible, sinon classe CSS
      if (window.AnimationHelper) {
        window.AnimationHelper.animateLifeLost(lastLostHeart);
      } else {
        lastLostHeart.classList.add('animate-lifeLost');
      }
    }

    setTimeout(() => {
      indicator.classList.remove('animate-shake', 'animate-errorFlash');
    }, 600);
  },

  /**
   * Animation de gain de vie ✨ AMÉLIORÉE
   */
  animateLivesGain: function() {
    const indicator = document.getElementById('lives-indicator');
    if (!indicator) return;

    // Animation du container
    indicator.classList.add('animate-bounce', 'animate-successFlash');

    // Animer le dernier cœur gagné
    const hearts = indicator.querySelectorAll('.heart.full');
    const lastGainedHeart = hearts[hearts.length - 1]; // Le dernier coeur plein est celui qui vient d'être gagné
    if (lastGainedHeart) {
      // Utiliser AnimationHelper si disponible, sinon classe CSS
      if (window.AnimationHelper) {
        window.AnimationHelper.animateLifeGained(lastGainedHeart);
      } else {
        lastGainedHeart.classList.add('animate-lifeGained');
        setTimeout(() => {
          lastGainedHeart.classList.remove('animate-lifeGained');
        }, 600);
      }
    }

    setTimeout(() => {
      indicator.classList.remove('animate-bounce', 'animate-successFlash');
    }, 600);
  },

  /**
   * Afficher la modal "Plus de vies"
   */
  showNoLivesModal: function() {
    const stats = LivesSystem.getStats();

    const modal = document.createElement('div');
    modal.className = 'lives-modal';
    modal.id = 'no-lives-modal';

    modal.innerHTML = `
      <div class="lives-modal-overlay" onclick="LivesUI.closeNoLivesModal()"></div>
      <div class="lives-modal-content">
        <button class="lives-modal-close" onclick="LivesUI.closeNoLivesModal()">×</button>

        <div class="lives-modal-header">
          <div class="lives-modal-icon">💔</div>
          <h2>Plus de vies !</h2>
          <p>Vous n'avez plus de vies disponibles</p>
        </div>

        <div class="lives-modal-body">
          <div class="lives-recharge-info">
            <div class="recharge-icon">⏱️</div>
            <div class="recharge-text">
              <strong>Prochaine vie dans :</strong>
              <div class="recharge-timer" id="modal-timer">${stats.timeUntilNext}</div>
            </div>
          </div>

          <div class="lives-info-box">
            <p>💡 <strong>Astuce :</strong> Les vies se rechargent automatiquement !</p>
            <p>Vous récupérez <strong>1 vie toutes les 3 heures</strong></p>
          </div>
        </div>

        <div class="lives-modal-actions">
          <button class="btn-secondary" onclick="LivesUI.closeNoLivesModal()">
            Retour à l'accueil
          </button>
          <button class="btn-primary" onclick="LivesUI.showPremiumOffer()" disabled>
            <span class="lock-icon">🔒</span>
            Vies illimitées (Premium)
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Animer l'ouverture
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);

    // Mettre à jour le timer toutes les secondes
    this.modalTimerInterval = setInterval(() => {
      const timer = document.getElementById('modal-timer');
      if (timer) {
        timer.textContent = LivesSystem.formatTimeUntilNextLife();
      }
    }, 1000);
  },

  /**
   * Fermer la modal
   */
  closeNoLivesModal: function() {
    const modal = document.getElementById('no-lives-modal');
    if (!modal) return;

    // Arrêter le timer
    if (this.modalTimerInterval) {
      clearInterval(this.modalTimerInterval);
      this.modalTimerInterval = null;
    }

    // Animer la fermeture
    modal.classList.remove('show');
    setTimeout(() => {
      modal.remove();
    }, 300);

    // Retourner à l'accueil
    if (window.Navigation) {
      Navigation.goToHome();
    }
  },

  /**
   * Afficher l'offre premium (placeholder)
   */
  showPremiumOffer: function() {
    alert('🔒 Offre Premium : Vies illimitées + 0 pub + Tous les contenus\n\nDisponible prochainement !');
  },

  /**
   * Initialiser le système UI
   */
  init: function() {
    // Écouter les mises à jour de vies
    window.addEventListener('livesUpdated', () => {
      this.updateLivesDisplay();
    });

    // Mettre à jour le timer toutes les minutes
    setInterval(() => {
      this.updateLivesDisplay();
    }, 60 * 1000);
  }
};

// Exposition globale
if (typeof window !== 'undefined') {
  window.LivesUI = LivesUI;

  // Initialiser au chargement
  LivesUI.init();
}
