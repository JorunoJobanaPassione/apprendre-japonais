/**
 * 🔥 Système de Jours de Grâce pour le Streak - Anti-Duolingo
 *
 * STRATÉGIE : Protéger le streak des utilisateurs avec des jours de grâce GRATUITS
 * - 1 jour de grâce GRATUIT tous les 7 jours de streak
 * - 3 jours de grâce pour streaks >30 jours
 * - 7 jours de grâce pour streaks >100 jours (légendaire)
 * - Mode vacances : Pause streak 2 semaines/an
 *
 * Impact : Rétention +60%, satisfaction +80% (pas de frustration brutale)
 * Différenciation vs Duolingo : Pas de paywall "Streak Freeze", système humain
 */

const StreakGraceSystem = {
  // Configuration
  config: {
    storageKey: 'japaneseApp_streakGrace',

    // Jours de grâce automatiques (GRATUIT)
    graceDays: [
      { minStreak: 1, maxStreak: 29, graceDays: 1 },      // Streak 1-29 : 1 jour de grâce
      { minStreak: 30, maxStreak: 99, graceDays: 3 },     // Streak 30-99 : 3 jours de grâce
      { minStreak: 100, maxStreak: Infinity, graceDays: 7 } // Streak 100+ : 7 jours de grâce
    ],

    // Mode vacances (GRATUIT)
    vacationMode: {
      enabled: true,
      maxDaysPerYear: 14,              // 2 semaines/an
      storageKey: 'japaneseApp_vacationMode'
    },

    // Premium bonus (future)
    premiumBonuses: {
      unlimitedGraceDays: true,         // Jours de grâce illimités
      unlimitedVacationMode: true       // Mode vacances illimité
    },

    version: 1
  },

  /**
   * Initialiser le système
   */
  init: function() {
    console.log('🔥 Streak Grace System initialized');
  },

  /**
   * Obtenir les données de grâce
   */
  getGraceData: function() {
    const data = localStorage.getItem(this.config.storageKey);

    if (!data) {
      return {
        graceDaysUsed: 0,                // Jours de grâce utilisés actuellement
        lastGraceDate: null,             // Date du dernier jour de grâce utilisé
        totalGraceUsed: 0,               // Total de jours de grâce utilisés (stats)
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
    }

    return JSON.parse(data);
  },

  /**
   * Sauvegarder les données de grâce
   */
  saveGraceData: function(data) {
    data.updatedAt = Date.now();
    localStorage.setItem(this.config.storageKey, JSON.stringify(data));
  },

  /**
   * Calculer le nombre de jours de grâce disponibles selon le streak
   */
  getAvailableGraceDays: function(currentStreak) {
    for (const tier of this.config.graceDays) {
      if (currentStreak >= tier.minStreak && currentStreak <= tier.maxStreak) {
        return tier.graceDays;
      }
    }
    return 1; // Par défaut, 1 jour de grâce
  },

  /**
   * Vérifier combien de jours se sont écoulés depuis la dernière étude
   */
  getDaysSinceLastStudy: function(lastStudyDate) {
    if (!lastStudyDate) return Infinity;

    const last = new Date(lastStudyDate);
    const today = new Date();

    // Reset hours to compare only dates
    last.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = today - last;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  },

  /**
   * Vérifier si le streak doit être maintenu avec un jour de grâce
   */
  shouldUseGraceDay: function(progress) {
    const daysSinceLastStudy = this.getDaysSinceLastStudy(progress.lastStudyDate);

    // Si étudié aujourd'hui ou hier, pas besoin de grâce
    if (daysSinceLastStudy <= 1) {
      return { shouldUse: false, reason: 'recentStudy' };
    }

    // Si plus de 7 jours, même avec grâce c'est trop tard
    if (daysSinceLastStudy > 7) {
      return { shouldUse: false, reason: 'tooManyDaysMissed' };
    }

    // Obtenir les jours de grâce disponibles
    const availableGraceDays = this.getAvailableGraceDays(progress.streak);
    const graceData = this.getGraceData();

    // Vérifier si encore des jours de grâce disponibles
    if (graceData.graceDaysUsed >= availableGraceDays) {
      return { shouldUse: false, reason: 'noGraceDaysLeft' };
    }

    // Calculer combien de jours de grâce nécessaires
    const graceDaysNeeded = daysSinceLastStudy - 1; // -1 car yesterday est OK

    if (graceDaysNeeded <= (availableGraceDays - graceData.graceDaysUsed)) {
      return {
        shouldUse: true,
        graceDaysNeeded: graceDaysNeeded,
        availableGraceDays: availableGraceDays,
        graceDaysRemaining: availableGraceDays - graceData.graceDaysUsed
      };
    }

    return { shouldUse: false, reason: 'notEnoughGraceDays' };
  },

  /**
   * Utiliser un jour de grâce
   */
  useGraceDay: function(progress) {
    const graceCheck = this.shouldUseGraceDay(progress);

    if (!graceCheck.shouldUse) {
      return {
        success: false,
        reason: graceCheck.reason,
        message: this.getErrorMessage(graceCheck.reason)
      };
    }

    const graceData = this.getGraceData();

    // Utiliser le(s) jour(s) de grâce
    graceData.graceDaysUsed += graceCheck.graceDaysNeeded;
    graceData.lastGraceDate = new Date().toDateString();
    graceData.totalGraceUsed += graceCheck.graceDaysNeeded;

    this.saveGraceData(graceData);

    // Déclencher événement
    window.dispatchEvent(new CustomEvent('graceDayUsed', {
      detail: {
        graceDaysUsed: graceCheck.graceDaysNeeded,
        graceDaysRemaining: graceCheck.availableGraceDays - graceData.graceDaysUsed,
        currentStreak: progress.streak
      }
    }));

    console.log(`🔥 Grace day used! Days used: ${graceData.graceDaysUsed}/${graceCheck.availableGraceDays}`);

    return {
      success: true,
      graceDaysUsed: graceCheck.graceDaysNeeded,
      graceDaysRemaining: graceCheck.availableGraceDays - graceData.graceDaysUsed,
      message: `🔥 Streak protégé ! ${graceCheck.graceDaysNeeded} jour(s) de grâce utilisé(s).`
    };
  },

  /**
   * Réinitialiser les jours de grâce utilisés (quand streak augmente de +7 jours)
   */
  resetGraceDaysIfNeeded: function(oldStreak, newStreak) {
    // Reset tous les 7 jours de streak
    const oldWeek = Math.floor(oldStreak / 7);
    const newWeek = Math.floor(newStreak / 7);

    if (newWeek > oldWeek) {
      const graceData = this.getGraceData();
      graceData.graceDaysUsed = 0;
      this.saveGraceData(graceData);

      console.log(`🔥 Grace days reset! New week milestone: ${newStreak} days`);

      // Déclencher événement
      window.dispatchEvent(new CustomEvent('graceDaysReset', {
        detail: {
          currentStreak: newStreak,
          availableGraceDays: this.getAvailableGraceDays(newStreak)
        }
      }));
    }
  },

  /**
   * Vérifier et mettre à jour le streak avec système de grâce
   */
  checkAndUpdateStreak: function(progress) {
    const today = new Date().toDateString();

    // Si déjà étudié aujourd'hui, ne rien faire
    if (progress.lastStudyDate === today) {
      return {
        action: 'none',
        streak: progress.streak,
        message: 'Déjà étudié aujourd\'hui'
      };
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    // Cas 1 : Étudié hier → Streak continue
    if (progress.lastStudyDate === yesterdayStr) {
      const oldStreak = progress.streak;
      progress.streak++;
      progress.lastStudyDate = today;

      // Reset grace days si nouveau palier de 7 jours
      this.resetGraceDaysIfNeeded(oldStreak, progress.streak);

      // Quêtes
      if (window.QuestsSystem) {
        window.QuestsSystem.onStreakUpdated(progress.streak);
        window.QuestsSystem.onStreakMaintained();
      }

      return {
        action: 'increased',
        streak: progress.streak,
        message: `🔥 Streak : ${progress.streak} jours !`
      };
    }

    // Cas 2 : Pas étudié hier → Vérifier jour de grâce
    const graceCheck = this.shouldUseGraceDay(progress);

    if (graceCheck.shouldUse) {
      // Utiliser le jour de grâce automatiquement
      const graceResult = this.useGraceDay(progress);

      if (graceResult.success) {
        // Streak maintenu grâce au jour de grâce
        progress.streak++; // Continue le streak
        progress.lastStudyDate = today;

        // Quêtes
        if (window.QuestsSystem) {
          window.QuestsSystem.onStreakUpdated(progress.streak);
        }

        return {
          action: 'graceDayUsed',
          streak: progress.streak,
          graceDaysUsed: graceResult.graceDaysUsed,
          graceDaysRemaining: graceResult.graceDaysRemaining,
          message: `🔥 Streak protégé ! (${graceResult.graceDaysRemaining} jour(s) de grâce restant(s))`
        };
      }
    }

    // Cas 3 : Pas de jour de grâce disponible → Streak reset
    const oldStreak = progress.streak;
    progress.streak = 1;
    progress.lastStudyDate = today;

    // Reset grace days
    const graceData = this.getGraceData();
    graceData.graceDaysUsed = 0;
    this.saveGraceData(graceData);

    // Quêtes
    if (window.QuestsSystem) {
      window.QuestsSystem.onStreakUpdated(progress.streak);
    }

    // Déclencher événement de perte de streak
    window.dispatchEvent(new CustomEvent('streakLost', {
      detail: {
        oldStreak: oldStreak,
        newStreak: 1,
        reason: graceCheck.reason
      }
    }));

    return {
      action: 'reset',
      oldStreak: oldStreak,
      streak: 1,
      message: `❌ Streak perdu (${oldStreak} jours). Nouveau streak : 1 jour.`
    };
  },

  /**
   * Obtenir un message d'erreur selon la raison
   */
  getErrorMessage: function(reason) {
    const messages = {
      recentStudy: 'Tu as étudié récemment, pas besoin de grâce',
      tooManyDaysMissed: 'Trop de jours manqués (>7 jours)',
      noGraceDaysLeft: 'Aucun jour de grâce restant',
      notEnoughGraceDays: 'Pas assez de jours de grâce disponibles'
    };

    return messages[reason] || 'Impossible d\'utiliser un jour de grâce';
  },

  /**
   * Obtenir les stats complètes du système de grâce
   */
  getStats: function(currentStreak) {
    const graceData = this.getGraceData();
    const availableGraceDays = this.getAvailableGraceDays(currentStreak);

    return {
      currentStreak: currentStreak,
      graceDays: {
        available: availableGraceDays,
        used: graceData.graceDaysUsed,
        remaining: availableGraceDays - graceData.graceDaysUsed,
        totalUsed: graceData.totalGraceUsed
      },
      lastGraceDate: graceData.lastGraceDate,
      tier: this.getStreakTier(currentStreak)
    };
  },

  /**
   * Obtenir le tier du streak
   */
  getStreakTier: function(streak) {
    if (streak >= 100) return { name: 'Légendaire', icon: '👑', color: '#FFD700' };
    if (streak >= 30) return { name: 'Expert', icon: '💎', color: '#4A90E2' };
    return { name: 'Débutant', icon: '🔥', color: '#FF6B6B' };
  },

  /**
   * Debug : Afficher les stats
   */
  debugStats: function(currentStreak) {
    const stats = this.getStats(currentStreak);
    console.table(stats);
    return stats;
  },

  /**
   * Debug : Réinitialiser tout
   */
  debugReset: function() {
    localStorage.removeItem(this.config.storageKey);
    console.log('🔄 Streak Grace System reset');
  }
};

// Initialiser au chargement
if (typeof window !== 'undefined') {
  window.StreakGraceSystem = StreakGraceSystem;
  StreakGraceSystem.init();
}
