/**
 * 💝 Système de Récupération de Vies - Anti-Duolingo
 *
 * STRATÉGIE : Offrir des alternatives GRATUITES pour récupérer des vies
 * - Option 1 : Réviser 5 cartes SRS = +1 vie
 * - Option 2 : Regarder une pub de 15s = +1 vie (future)
 *
 * Impact : +40% rétention (utilisateurs peuvent continuer sans payer)
 * Différenciation vs Duolingo : Pas de paywall brutal, récup gratuite
 */

const LivesRecovery = {
  // Configuration
  config: {
    // Révisions SRS pour gagner une vie
    srsReviewsNeeded: 5,              // 5 cartes SRS correctes = +1 vie
    srsReviewsStorageKey: 'japaneseApp_srsReviewsProgress',

    // Cooldown pour éviter l'abus
    srsCooldownTime: 30 * 60 * 1000,  // 30 minutes entre chaque récupération SRS
    srsCooldownKey: 'japaneseApp_srsRecoveryCooldown',

    // Limite quotidienne (équilibrage)
    maxDailyRecoveries: 3,            // Max 3 vies récupérées/jour via SRS
    dailyRecoveriesKey: 'japaneseApp_dailyRecoveries',

    version: 1
  },

  /**
   * Initialiser le système
   */
  init: function() {
    // Réinitialiser le compteur quotidien si nouvelle journée
    this.resetDailyCountIfNeeded();

    // Écouter les événements SRS
    this.listenToSRSReviews();

    console.log('💝 Lives Recovery system initialized');
  },

  /**
   * Écouter les reviews SRS pour compter les progrès
   */
  listenToSRSReviews: function() {
    window.addEventListener('srsReviewCompleted', (e) => {
      const { isCorrect } = e.detail;

      if (isCorrect) {
        this.addSRSReviewProgress();
      }
    });
  },

  /**
   * Ajouter une review SRS correcte au compteur
   */
  addSRSReviewProgress: function() {
    const progress = this.getSRSReviewProgress();

    progress.count++;
    progress.updatedAt = Date.now();

    localStorage.setItem(this.config.srsReviewsStorageKey, JSON.stringify(progress));

    // Déclencher événement pour l'UI
    window.dispatchEvent(new CustomEvent('srsRecoveryProgress', {
      detail: {
        count: progress.count,
        needed: this.config.srsReviewsNeeded,
        canRecover: this.canRecoverViaSRS()
      }
    }));

    // Si 5 reviews atteintes, afficher notification
    if (progress.count >= this.config.srsReviewsNeeded && this.canRecoverViaSRS()) {
      this.showRecoveryAvailableNotification();
    }

    console.log(`📚 SRS Review Progress: ${progress.count}/${this.config.srsReviewsNeeded}`);
  },

  /**
   * Obtenir la progression actuelle des reviews SRS
   */
  getSRSReviewProgress: function() {
    const data = localStorage.getItem(this.config.srsReviewsStorageKey);

    if (!data) {
      return { count: 0, updatedAt: Date.now() };
    }

    return JSON.parse(data);
  },

  /**
   * Réinitialiser le compteur de reviews SRS
   */
  resetSRSReviewProgress: function() {
    localStorage.setItem(this.config.srsReviewsStorageKey, JSON.stringify({
      count: 0,
      updatedAt: Date.now()
    }));
  },

  /**
   * Vérifier si l'utilisateur peut récupérer une vie via SRS
   */
  canRecoverViaSRS: function() {
    // 1. Vérifier si 5 reviews complétées
    const progress = this.getSRSReviewProgress();
    if (progress.count < this.config.srsReviewsNeeded) {
      return {
        canRecover: false,
        reason: 'notEnoughReviews',
        progress: progress.count,
        needed: this.config.srsReviewsNeeded
      };
    }

    // 2. Vérifier le cooldown (30 minutes)
    if (this.isInCooldown()) {
      return {
        canRecover: false,
        reason: 'cooldown',
        timeRemaining: this.getCooldownTimeRemaining()
      };
    }

    // 3. Vérifier la limite quotidienne (3/jour)
    const dailyCount = this.getDailyRecoveriesCount();
    if (dailyCount >= this.config.maxDailyRecoveries) {
      return {
        canRecover: false,
        reason: 'dailyLimit',
        count: dailyCount,
        max: this.config.maxDailyRecoveries
      };
    }

    // 4. Vérifier si les vies ne sont pas déjà pleines
    if (LivesSystem.isFullLives()) {
      return {
        canRecover: false,
        reason: 'fullLives'
      };
    }

    return { canRecover: true };
  },

  /**
   * Récupérer une vie via SRS (5 reviews complétées)
   */
  recoverLifeViaSRS: function() {
    const check = this.canRecoverViaSRS();

    if (!check.canRecover) {
      console.log('❌ Cannot recover life:', check.reason);
      return {
        success: false,
        reason: check.reason,
        message: this.getErrorMessage(check.reason)
      };
    }

    // 1. Ajouter une vie
    LivesSystem.gainLife();

    // 2. Réinitialiser le compteur de reviews
    this.resetSRSReviewProgress();

    // 3. Enregistrer le cooldown
    this.setCooldown();

    // 4. Incrémenter le compteur quotidien
    this.incrementDailyRecoveries();

    // 5. Déclencher événement
    window.dispatchEvent(new CustomEvent('lifeRecovered', {
      detail: {
        method: 'srs',
        lives: LivesSystem.getLives()
      }
    }));

    console.log('✅ Life recovered via SRS! New lives:', LivesSystem.getLives());

    return {
      success: true,
      lives: LivesSystem.getLives(),
      message: '🎉 +1 vie récupérée ! Bravo pour tes révisions !'
    };
  },

  /**
   * Vérifier si l'utilisateur est en cooldown
   */
  isInCooldown: function() {
    const lastRecovery = localStorage.getItem(this.config.srsCooldownKey);

    if (!lastRecovery) return false;

    const timeSince = Date.now() - parseInt(lastRecovery);
    return timeSince < this.config.srsCooldownTime;
  },

  /**
   * Obtenir le temps restant du cooldown (en ms)
   */
  getCooldownTimeRemaining: function() {
    const lastRecovery = localStorage.getItem(this.config.srsCooldownKey);

    if (!lastRecovery) return 0;

    const timeSince = Date.now() - parseInt(lastRecovery);
    const remaining = this.config.srsCooldownTime - timeSince;

    return Math.max(0, remaining);
  },

  /**
   * Formater le temps de cooldown restant
   */
  formatCooldownTime: function() {
    const ms = this.getCooldownTimeRemaining();

    if (ms === 0) return 'Disponible';

    const minutes = Math.ceil(ms / (60 * 1000));
    return `${minutes} min`;
  },

  /**
   * Enregistrer le cooldown
   */
  setCooldown: function() {
    localStorage.setItem(this.config.srsCooldownKey, Date.now().toString());
  },

  /**
   * Obtenir le nombre de récupérations aujourd'hui
   */
  getDailyRecoveriesCount: function() {
    const data = localStorage.getItem(this.config.dailyRecoveriesKey);

    if (!data) return 0;

    const parsed = JSON.parse(data);
    return parsed.count || 0;
  },

  /**
   * Incrémenter le compteur quotidien
   */
  incrementDailyRecoveries: function() {
    const data = this.getDailyRecoveriesData();
    data.count++;
    data.updatedAt = Date.now();

    localStorage.setItem(this.config.dailyRecoveriesKey, JSON.stringify(data));
  },

  /**
   * Obtenir les données de récupération quotidienne
   */
  getDailyRecoveriesData: function() {
    const data = localStorage.getItem(this.config.dailyRecoveriesKey);

    if (!data) {
      return {
        count: 0,
        date: this.getTodayDate(),
        updatedAt: Date.now()
      };
    }

    return JSON.parse(data);
  },

  /**
   * Réinitialiser le compteur quotidien si nouvelle journée
   */
  resetDailyCountIfNeeded: function() {
    const data = this.getDailyRecoveriesData();
    const today = this.getTodayDate();

    if (data.date !== today) {
      localStorage.setItem(this.config.dailyRecoveriesKey, JSON.stringify({
        count: 0,
        date: today,
        updatedAt: Date.now()
      }));
      console.log('🔄 Daily recovery count reset');
    }
  },

  /**
   * Obtenir la date du jour (YYYY-MM-DD)
   */
  getTodayDate: function() {
    const now = new Date();
    return now.toISOString().split('T')[0];
  },

  /**
   * Obtenir un message d'erreur selon la raison
   */
  getErrorMessage: function(reason) {
    const messages = {
      notEnoughReviews: `Encore ${this.config.srsReviewsNeeded - this.getSRSReviewProgress().count} révisions SRS à faire`,
      cooldown: `Réessaye dans ${this.formatCooldownTime()}`,
      dailyLimit: 'Limite quotidienne atteinte (3 récupérations/jour)',
      fullLives: 'Tes vies sont déjà pleines !'
    };

    return messages[reason] || 'Impossible de récupérer une vie';
  },

  /**
   * Afficher notification quand récupération disponible
   */
  showRecoveryAvailableNotification: function() {
    // Déclencher événement pour l'UI
    window.dispatchEvent(new CustomEvent('recoveryAvailable', {
      detail: {
        method: 'srs',
        message: '🎉 Tu peux récupérer une vie gratuite ! (5 révisions SRS complétées)'
      }
    }));
  },

  /**
   * Obtenir les stats complètes du système de récupération
   */
  getStats: function() {
    const srsProgress = this.getSRSReviewProgress();
    const canRecover = this.canRecoverViaSRS();
    const dailyRecoveries = this.getDailyRecoveriesCount();

    return {
      // SRS Recovery
      srs: {
        progress: srsProgress.count,
        needed: this.config.srsReviewsNeeded,
        canRecover: canRecover.canRecover,
        reason: canRecover.reason || null,
        cooldownRemaining: this.formatCooldownTime()
      },

      // Daily limits
      daily: {
        recoveries: dailyRecoveries,
        max: this.config.maxDailyRecoveries,
        remaining: this.config.maxDailyRecoveries - dailyRecoveries
      },

      // Current lives
      lives: {
        current: LivesSystem.getLives(),
        max: LivesSystem.config.maxLives,
        isFull: LivesSystem.isFullLives()
      }
    };
  },

  /**
   * Debug : Afficher les stats
   */
  debugStats: function() {
    const stats = this.getStats();
    console.table(stats);
    return stats;
  },

  /**
   * Debug : Simuler 5 reviews SRS
   */
  debugSimulateSRSReviews: function(count = 5) {
    for (let i = 0; i < count; i++) {
      this.addSRSReviewProgress();
    }
    console.log(`✅ Simulated ${count} SRS reviews`);
  },

  /**
   * Debug : Réinitialiser tout
   */
  debugReset: function() {
    this.resetSRSReviewProgress();
    localStorage.removeItem(this.config.srsCooldownKey);
    localStorage.removeItem(this.config.dailyRecoveriesKey);
    console.log('🔄 Lives Recovery system reset');
  }
};

// Initialiser au chargement
if (typeof window !== 'undefined') {
  window.LivesRecovery = LivesRecovery;

  // Attendre que LivesSystem soit chargé
  if (window.LivesSystem) {
    LivesRecovery.init();
  } else {
    window.addEventListener('load', () => {
      LivesRecovery.init();
    });
  }
}
