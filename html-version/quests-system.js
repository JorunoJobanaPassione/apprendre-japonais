/**
 * 🎯 Système de Quêtes - Logique métier
 * Version: 1.0.0
 * Impact: +30% engagement quotidien
 *
 * Gère:
 * - Progression des quêtes
 * - Récompenses (XP, vies, badges)
 * - Reset quotidien/hebdomadaire
 * - Persistence localStorage
 */

const QuestsSystem = {
  // ===== ÉTAT =====
  activeQuests: {
    daily: [],
    weekly: [],
    main: [],
    special: []
  },
  completedToday: [],
  completedThisWeek: [],
  completedMain: [],
  lastDailyReset: null,
  lastWeeklyReset: null,

  // ===== CONFIGURATION =====
  STORAGE_KEY: 'japaneseApp_quests',
  DAILY_RESET_HOUR: 0, // Minuit

  // ===== INITIALISATION =====
  initialize: function() {
    console.log('🎯 Initialisation du système de quêtes...');

    // Charger la progression sauvegardée
    this.loadProgress();

    // Vérifier si on doit reset
    this.checkAndResetDaily();
    this.checkAndResetWeekly();

    // Charger les quêtes actives
    this.loadActiveQuests();

    console.log('✅ Système de quêtes initialisé');
    console.log(`📊 Quêtes actives: ${this.activeQuests.daily.length} quotidiennes, ${this.activeQuests.weekly.length} hebdomadaires, ${this.activeQuests.main.length} principales`);
  },

  /**
   * Charge la progression depuis localStorage
   */
  loadProgress: function() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        this.completedToday = data.completedToday || [];
        this.completedThisWeek = data.completedThisWeek || [];
        this.completedMain = data.completedMain || [];
        this.lastDailyReset = data.lastDailyReset || Date.now();
        this.lastWeeklyReset = data.lastWeeklyReset || Date.now();

        // Restaurer la progression des quêtes actives
        if (data.questProgress) {
          this.restoreQuestProgress(data.questProgress);
        }
      } else {
        // Première initialisation
        this.lastDailyReset = Date.now();
        this.lastWeeklyReset = Date.now();
        this.saveProgress();
      }
    } catch (e) {
      console.error('Erreur chargement quêtes:', e);
      this.lastDailyReset = Date.now();
      this.lastWeeklyReset = Date.now();
    }
  },

  /**
   * Sauvegarde la progression dans localStorage
   */
  saveProgress: function() {
    try {
      const data = {
        completedToday: this.completedToday,
        completedThisWeek: this.completedThisWeek,
        completedMain: this.completedMain,
        lastDailyReset: this.lastDailyReset,
        lastWeeklyReset: this.lastWeeklyReset,
        questProgress: this.getQuestProgress()
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Erreur sauvegarde quêtes:', e);
    }
  },

  /**
   * Extrait la progression actuelle de toutes les quêtes
   */
  getQuestProgress: function() {
    const progress = {};

    ['daily', 'weekly', 'main', 'special'].forEach(type => {
      this.activeQuests[type].forEach(quest => {
        progress[quest.id] = quest.progress;
      });
    });

    return progress;
  },

  /**
   * Restaure la progression des quêtes depuis les données sauvegardées
   */
  restoreQuestProgress: function(progress) {
    this.questProgressToRestore = progress;
  },

  /**
   * Charge les quêtes actives
   */
  loadActiveQuests: function() {
    // Quêtes quotidiennes (rotation de 3 par jour)
    this.activeQuests.daily = window.QuestsDataHelper.getDailyActiveQuests().map(q => {
      const quest = {...q};
      // Restaurer la progression si disponible
      if (this.questProgressToRestore && this.questProgressToRestore[quest.id] !== undefined) {
        quest.progress = this.questProgressToRestore[quest.id];
      }
      return quest;
    });

    // Quêtes hebdomadaires (toutes actives)
    this.activeQuests.weekly = window.QuestsDataHelper.getWeeklyActiveQuests().map(q => {
      const quest = {...q};
      if (this.questProgressToRestore && this.questProgressToRestore[quest.id] !== undefined) {
        quest.progress = this.questProgressToRestore[quest.id];
      }
      return quest;
    });

    // Quêtes principales (permanentes, sauf si déjà complétées)
    this.activeQuests.main = window.questsData.main
      .filter(q => !this.completedMain.includes(q.id))
      .map(q => {
        const quest = {...q};
        if (this.questProgressToRestore && this.questProgressToRestore[quest.id] !== undefined) {
          quest.progress = this.questProgressToRestore[quest.id];
        }
        return quest;
      });

    // Quêtes spéciales (events)
    this.activeQuests.special = window.questsData.special.map(q => ({...q}));

    delete this.questProgressToRestore;
  },

  // ===== RESET =====

  /**
   * Vérifie et effectue le reset quotidien si nécessaire
   */
  checkAndResetDaily: function() {
    const now = new Date();
    const lastReset = new Date(this.lastDailyReset);

    // Vérifier si on a changé de jour
    const needsReset = now.getDate() !== lastReset.getDate() ||
                       now.getMonth() !== lastReset.getMonth() ||
                       now.getFullYear() !== lastReset.getFullYear();

    if (needsReset) {
      console.log('🔄 Reset quotidien des quêtes...');
      this.resetDaily();
    }
  },

  /**
   * Reset les quêtes quotidiennes
   */
  resetDaily: function() {
    // Reset la liste des complétées aujourd'hui
    this.completedToday = [];

    // Reset la progression des quêtes quotidiennes
    this.activeQuests.daily.forEach(quest => {
      quest.progress = 0;
    });

    // Recharger les quêtes quotidiennes (nouvelle rotation)
    this.activeQuests.daily = window.QuestsDataHelper.getDailyActiveQuests();

    // Mettre à jour le timestamp
    this.lastDailyReset = Date.now();

    // Sauvegarder
    this.saveProgress();

    console.log('✅ Quêtes quotidiennes réinitialisées');
  },

  /**
   * Vérifie et effectue le reset hebdomadaire si nécessaire
   */
  checkAndResetWeekly: function() {
    const now = new Date();
    const lastReset = new Date(this.lastWeeklyReset);

    // Vérifier si on est lundi et que le dernier reset était la semaine dernière
    const isMonday = now.getDay() === 1;
    const lastResetDay = lastReset.getDay();
    const daysDiff = Math.floor((now - lastReset) / (1000 * 60 * 60 * 24));

    if (isMonday && (lastResetDay !== 1 || daysDiff >= 7)) {
      console.log('🔄 Reset hebdomadaire des quêtes...');
      this.resetWeekly();
    }
  },

  /**
   * Reset les quêtes hebdomadaires
   */
  resetWeekly: function() {
    // Reset la liste des complétées cette semaine
    this.completedThisWeek = [];

    // Reset la progression des quêtes hebdomadaires
    this.activeQuests.weekly.forEach(quest => {
      quest.progress = 0;
    });

    // Mettre à jour le timestamp
    this.lastWeeklyReset = Date.now();

    // Sauvegarder
    this.saveProgress();

    console.log('✅ Quêtes hebdomadaires réinitialisées');
  },

  // ===== TRACKING DE PROGRESSION =====

  /**
   * Track une action de l'utilisateur et met à jour les quêtes concernées
   * @param {string} trackingKey - Clé de tracking (ex: 'lessonsCompleted')
   * @param {number} value - Valeur à ajouter (défaut: 1)
   */
  trackProgress: function(trackingKey, value = 1) {
    let questsUpdated = false;
    let questsCompleted = [];

    // Parcourir toutes les quêtes actives
    ['daily', 'weekly', 'main', 'special'].forEach(type => {
      this.activeQuests[type].forEach(quest => {
        // Vérifier si cette quête track cette action
        if (quest.trackingKey === trackingKey) {
          // Mettre à jour la progression
          quest.progress = Math.min(quest.progress + value, quest.target);
          questsUpdated = true;

          // Vérifier si la quête est complétée
          if (quest.progress >= quest.target && !this.isQuestCompleted(quest.id)) {
            questsCompleted.push(quest);
            this.completeQuest(quest);
          }
        }
      });
    });

    // Sauvegarder si des quêtes ont été mises à jour
    if (questsUpdated) {
      this.saveProgress();

      // Déclencher l'événement de mise à jour UI
      if (window.QuestsUI) {
        window.QuestsUI.updateQuestsDisplay();
      }
    }

    // Notifier les quêtes complétées
    if (questsCompleted.length > 0) {
      questsCompleted.forEach(quest => {
        if (window.QuestsUI) {
          window.QuestsUI.showQuestCompletedNotification(quest);
        }
      });
    }

    return questsCompleted;
  },

  /**
   * Met à jour directement la progression d'une quête (pour les valeurs absolues)
   * @param {string} trackingKey - Clé de tracking
   * @param {number} absoluteValue - Valeur absolue (ex: niveau actuel = 5)
   */
  setProgress: function(trackingKey, absoluteValue) {
    let questsUpdated = false;
    let questsCompleted = [];

    ['daily', 'weekly', 'main', 'special'].forEach(type => {
      this.activeQuests[type].forEach(quest => {
        if (quest.trackingKey === trackingKey) {
          const oldProgress = quest.progress;
          quest.progress = Math.min(absoluteValue, quest.target);

          if (quest.progress !== oldProgress) {
            questsUpdated = true;
          }

          // Vérifier complétion
          if (quest.progress >= quest.target && !this.isQuestCompleted(quest.id)) {
            questsCompleted.push(quest);
            this.completeQuest(quest);
          }
        }
      });
    });

    if (questsUpdated) {
      this.saveProgress();
      if (window.QuestsUI) {
        window.QuestsUI.updateQuestsDisplay();
      }
    }

    if (questsCompleted.length > 0) {
      questsCompleted.forEach(quest => {
        if (window.QuestsUI) {
          window.QuestsUI.showQuestCompletedNotification(quest);
        }
      });
    }

    return questsCompleted;
  },

  /**
   * Vérifie si une quête est déjà complétée
   */
  isQuestCompleted: function(questId) {
    return this.completedToday.includes(questId) ||
           this.completedThisWeek.includes(questId) ||
           this.completedMain.includes(questId);
  },

  /**
   * Marque une quête comme complétée
   */
  completeQuest: function(quest) {
    console.log(`🎉 Quête complétée: ${quest.title}`);

    // Ajouter à la liste appropriée
    if (quest.type === 'daily' && !this.completedToday.includes(quest.id)) {
      this.completedToday.push(quest.id);
    } else if (quest.type === 'weekly' && !this.completedThisWeek.includes(quest.id)) {
      this.completedThisWeek.push(quest.id);
    } else if (quest.type === 'main' && !this.completedMain.includes(quest.id)) {
      this.completedMain.push(quest.id);
    }

    // Distribuer les récompenses
    this.giveRewards(quest);

    // Sauvegarder
    this.saveProgress();
  },

  /**
   * Distribue les récompenses d'une quête
   */
  giveRewards: function(quest) {
    const rewards = quest.rewards;

    console.log(`🎁 Récompenses: ${rewards.xp} XP, ${rewards.lives} vies, badge: ${rewards.badge || 'aucun'}`);

    // XP
    if (rewards.xp > 0 && window.addXP) {
      window.addXP(rewards.xp);
    }

    // Vies
    if (rewards.lives > 0 && window.LivesSystem) {
      for (let i = 0; i < rewards.lives; i++) {
        window.LivesSystem.addLives(1);
      }
    }

    // Badge
    if (rewards.badge && window.BadgeSystem) {
      window.BadgeSystem.unlockBadge(rewards.badge);
    }
  },

  // ===== GETTERS =====

  /**
   * Récupère toutes les quêtes actives
   */
  getActiveQuests: function() {
    return {
      daily: this.activeQuests.daily.filter(q => !this.completedToday.includes(q.id)),
      weekly: this.activeQuests.weekly.filter(q => !this.completedThisWeek.includes(q.id)),
      main: this.activeQuests.main.filter(q => !this.completedMain.includes(q.id)),
      special: this.activeQuests.special
    };
  },

  /**
   * Récupère les quêtes complétées
   */
  getCompletedQuests: function() {
    return {
      today: this.completedToday,
      thisWeek: this.completedThisWeek,
      main: this.completedMain
    };
  },

  /**
   * Récupère une quête par son ID
   */
  getQuestById: function(questId) {
    const allQuests = [
      ...this.activeQuests.daily,
      ...this.activeQuests.weekly,
      ...this.activeQuests.main,
      ...this.activeQuests.special
    ];
    return allQuests.find(q => q.id === questId);
  },

  /**
   * Calcule les statistiques des quêtes
   */
  getStats: function() {
    const active = this.getActiveQuests();

    return {
      dailyCompleted: this.completedToday.length,
      dailyTotal: 3, // Toujours 3 quêtes quotidiennes actives
      weeklyCompleted: this.completedThisWeek.length,
      weeklyTotal: this.activeQuests.weekly.length,
      mainCompleted: this.completedMain.length,
      mainTotal: window.questsData.main.length,
      totalXPEarned: this.calculateTotalXPEarned()
    };
  },

  /**
   * Calcule le total d'XP gagné via les quêtes
   */
  calculateTotalXPEarned: function() {
    let total = 0;

    // XP des quêtes complétées aujourd'hui
    this.completedToday.forEach(questId => {
      const quest = window.QuestsDataHelper.getQuestById(questId);
      if (quest) total += quest.rewards.xp;
    });

    // XP des quêtes complétées cette semaine
    this.completedThisWeek.forEach(questId => {
      const quest = window.QuestsDataHelper.getQuestById(questId);
      if (quest) total += quest.rewards.xp;
    });

    // XP des quêtes principales complétées
    this.completedMain.forEach(questId => {
      const quest = window.QuestsDataHelper.getQuestById(questId);
      if (quest) total += quest.rewards.xp;
    });

    return total;
  },

  // ===== HELPERS DE TRACKING SPÉCIFIQUES =====

  /**
   * Helper: Leçon complétée
   */
  onLessonCompleted: function() {
    return this.trackProgress('lessonsCompleted', 1);
  },

  /**
   * Helper: Review SRS
   */
  onSRSReview: function() {
    return this.trackProgress('srsReviews', 1);
  },

  /**
   * Helper: Score parfait
   */
  onPerfectScore: function() {
    return this.trackProgress('perfectScores', 1);
  },

  /**
   * Helper: Défi quotidien complété
   */
  onDailyChallengeCompleted: function() {
    return this.trackProgress('dailyChallenges', 1);
  },

  /**
   * Helper: XP gagné dans la journée
   */
  onXPGained: function(amount) {
    // Charger l'XP quotidien actuel
    const dailyXP = parseInt(localStorage.getItem('dailyXP') || '0');
    const newDailyXP = dailyXP + amount;
    localStorage.setItem('dailyXP', newDailyXP);

    // Mettre à jour la quête
    return this.setProgress('dailyXP', newDailyXP);
  },

  /**
   * Helper: Mise à jour du niveau
   */
  onLevelUp: function(newLevel) {
    return this.setProgress('level', newLevel);
  },

  /**
   * Helper: Mise à jour du streak
   */
  onStreakUpdated: function(newStreak) {
    return this.setProgress('streak', newStreak);
  },

  /**
   * Helper: Carte SRS mature
   */
  onSRSCardMature: function() {
    return this.trackProgress('srsMatureCards', 1);
  },

  /**
   * Helper: Leçon katakana complétée
   */
  onKatakanaLessonCompleted: function() {
    return this.trackProgress('katakanaLessonsCompleted', 1);
  },

  /**
   * Helper: Leçon kanji complétée
   */
  onKanjiLessonCompleted: function() {
    return this.trackProgress('kanjiLessonsCompleted', 1);
  },

  /**
   * Helper: Streak maintenu aujourd'hui
   */
  onStreakMaintained: function() {
    return this.trackProgress('streakMaintained', 1);
  },

  // ===== RESET DAILY XP (à appeler au reset quotidien) =====
  resetDailyXP: function() {
    localStorage.setItem('dailyXP', '0');
  }
};

// Exposition globale
if (typeof window !== 'undefined') {
  window.QuestsSystem = QuestsSystem;
}
