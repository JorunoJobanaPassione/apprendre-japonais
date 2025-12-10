/**
 * 💖 Système de Vies - Gamification Duolingo-like
 * Version: 1.0.0
 */

const LivesSystem = {
  // Configuration
  config: {
    maxLives: 7,                    // Maximum de vies (stratégie : plus généreux)
    rechargeTime: 3 * 60 * 60 * 1000, // 3 heures en millisecondes (frustration contrôlée)
    storageKey: 'japaneseApp_lives',
    version: 2                      // Version du système (pour migration)
  },

  /**
   * Initialiser le système de vies
   */
  init: function() {
    const data = this.getData();

    // Première utilisation OU migration nécessaire
    if (!data || data.version !== this.config.version) {
      this.setData({
        lives: this.config.maxLives,
        lastUpdate: Date.now(),
        version: this.config.version
      });
      console.log('🔄 Lives system initialized/migrated to v' + this.config.version);
      return this.config.maxLives;
    }

    // Recharger automatiquement les vies si le temps est écoulé
    this.rechargeIfNeeded();

    return this.getLives();
  },

  /**
   * Récupérer les données du localStorage
   */
  getData: function() {
    const data = localStorage.getItem(this.config.storageKey);
    return data ? JSON.parse(data) : null;
  },

  /**
   * Sauvegarder les données
   */
  setData: function(data) {
    localStorage.setItem(this.config.storageKey, JSON.stringify(data));
  },

  /**
   * Obtenir le nombre de vies actuel
   */
  getLives: function() {
    const data = this.getData();
    return data ? data.lives : this.config.maxLives;
  },

  /**
   * Perdre une vie
   */
  loseLife: function() {
    const data = this.getData();
    if (!data) return false;

    if (data.lives > 0) {
      data.lives--;
      data.lastUpdate = Date.now();
      this.setData(data);

      // Déclencher l'événement de mise à jour
      this.triggerUpdate();

      return true;
    }

    return false;
  },

  /**
   * Gagner une vie (recharge manuelle ou premium)
   */
  gainLife: function() {
    const data = this.getData();
    if (!data) return false;

    if (data.lives < this.config.maxLives) {
      data.lives++;
      data.lastUpdate = Date.now();
      this.setData(data);

      this.triggerUpdate();
      return true;
    }

    return false;
  },

  /**
   * Recharger automatiquement si le temps est écoulé
   */
  rechargeIfNeeded: function() {
    const data = this.getData();
    if (!data || data.lives >= this.config.maxLives) return;

    const now = Date.now();
    const timeSinceLastUpdate = now - data.lastUpdate;
    const livesToRecharge = Math.floor(timeSinceLastUpdate / this.config.rechargeTime);

    if (livesToRecharge > 0) {
      data.lives = Math.min(data.lives + livesToRecharge, this.config.maxLives);
      data.lastUpdate = now;
      this.setData(data);
      this.triggerUpdate();
    }
  },

  /**
   * Obtenir le temps restant avant la prochaine recharge (en ms)
   */
  getTimeUntilNextLife: function() {
    const data = this.getData();
    if (!data || data.lives >= this.config.maxLives) return 0;

    const now = Date.now();
    const timeSinceLastUpdate = now - data.lastUpdate;
    const timeUntilNext = this.config.rechargeTime - (timeSinceLastUpdate % this.config.rechargeTime);

    return timeUntilNext;
  },

  /**
   * Formater le temps restant (ex: "3h 45m")
   */
  formatTimeUntilNextLife: function() {
    const ms = this.getTimeUntilNextLife();
    if (ms === 0) return "Complet";

    const hours = Math.floor(ms / (60 * 60 * 1000));
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  },

  /**
   * Vérifier si l'utilisateur a des vies
   */
  hasLives: function() {
    return this.getLives() > 0;
  },

  /**
   * Obtenir les vies pleines
   */
  isFullLives: function() {
    return this.getLives() >= this.config.maxLives;
  },

  /**
   * Réinitialiser les vies (admin/debug)
   */
  reset: function() {
    this.setData({
      lives: this.config.maxLives,
      lastUpdate: Date.now()
    });
    this.triggerUpdate();
  },

  /**
   * Déclencher un événement de mise à jour
   */
  triggerUpdate: function() {
    // Événement custom pour notifier l'UI
    window.dispatchEvent(new CustomEvent('livesUpdated', {
      detail: {
        lives: this.getLives(),
        maxLives: this.config.maxLives,
        timeUntilNext: this.formatTimeUntilNextLife()
      }
    }));
  },

  /**
   * Obtenir les stats complètes
   */
  getStats: function() {
    const data = this.getData();
    return {
      lives: this.getLives(),
      maxLives: this.config.maxLives,
      timeUntilNext: this.formatTimeUntilNextLife(),
      timeUntilNextMs: this.getTimeUntilNextLife(),
      isFull: this.isFullLives(),
      hasLives: this.hasLives(),
      lastUpdate: data ? data.lastUpdate : Date.now()
    };
  }
};

// Initialiser au chargement
if (typeof window !== 'undefined') {
  window.LivesSystem = LivesSystem;

  // Initialiser le système
  LivesSystem.init();

  // Vérifier la recharge toutes les minutes
  setInterval(() => {
    LivesSystem.rechargeIfNeeded();
  }, 60 * 1000); // 1 minute
}
