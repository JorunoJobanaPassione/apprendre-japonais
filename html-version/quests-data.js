/**
 * 🎯 Quêtes Quotidiennes - Données
 * Version: 1.0.0
 * Impact: +30% engagement quotidien
 */

const questsData = {
  // ===== QUÊTES QUOTIDIENNES (Se renouvellent chaque jour) =====
  daily: [
    {
      id: 'daily_lessons_1',
      type: 'daily',
      title: 'Premier pas',
      description: 'Complète 1 leçon',
      icon: '📚',
      target: 1,
      progress: 0,
      trackingKey: 'lessonsCompleted',
      rewards: {
        xp: 50,
        lives: 0,
        badge: null
      },
      difficulty: 'easy'
    },
    {
      id: 'daily_lessons_3',
      type: 'daily',
      title: 'Étudiant assidu',
      description: 'Complète 3 leçons',
      icon: '📖',
      target: 3,
      progress: 0,
      trackingKey: 'lessonsCompleted',
      rewards: {
        xp: 100,
        lives: 1,
        badge: null
      },
      difficulty: 'medium'
    },
    {
      id: 'daily_srs_10',
      type: 'daily',
      title: 'Maître SRS',
      description: 'Révise 10 cartes SRS',
      icon: '🧠',
      target: 10,
      progress: 0,
      trackingKey: 'srsReviews',
      rewards: {
        xp: 75,
        lives: 0,
        badge: null
      },
      difficulty: 'easy'
    },
    {
      id: 'daily_srs_20',
      type: 'daily',
      title: 'SRS Warrior',
      description: 'Révise 20 cartes SRS',
      icon: '⚔️',
      target: 20,
      progress: 0,
      trackingKey: 'srsReviews',
      rewards: {
        xp: 150,
        lives: 1,
        badge: null
      },
      difficulty: 'hard'
    },
    {
      id: 'daily_perfect',
      type: 'daily',
      title: 'Sans faute',
      description: 'Obtiens 100% à une leçon',
      icon: '⭐',
      target: 1,
      progress: 0,
      trackingKey: 'perfectScores',
      rewards: {
        xp: 100,
        lives: 1,
        badge: null
      },
      difficulty: 'medium'
    },
    {
      id: 'daily_streak',
      type: 'daily',
      title: 'Régularité',
      description: 'Maintiens ton streak actif',
      icon: '🔥',
      target: 1,
      progress: 0,
      trackingKey: 'streakMaintained',
      rewards: {
        xp: 50,
        lives: 0,
        badge: null
      },
      difficulty: 'easy'
    },
    {
      id: 'daily_challenge',
      type: 'daily',
      title: 'Défi culturel',
      description: 'Complète le défi du jour',
      icon: '🎋',
      target: 1,
      progress: 0,
      trackingKey: 'dailyChallenges',
      rewards: {
        xp: 75,
        lives: 0,
        badge: null
      },
      difficulty: 'easy'
    },
    {
      id: 'daily_xp_200',
      type: 'daily',
      title: 'Chasseur d\'XP',
      description: 'Gagne 200 XP en une journée',
      icon: '💎',
      target: 200,
      progress: 0,
      trackingKey: 'dailyXP',
      rewards: {
        xp: 100,
        lives: 1,
        badge: null
      },
      difficulty: 'hard'
    }
  ],

  // ===== QUÊTES HEBDOMADAIRES (Se renouvellent chaque semaine) =====
  weekly: [
    {
      id: 'weekly_lessons_15',
      type: 'weekly',
      title: 'Marathon hebdo',
      description: 'Complète 15 leçons cette semaine',
      icon: '🏃',
      target: 15,
      progress: 0,
      trackingKey: 'lessonsCompleted',
      rewards: {
        xp: 300,
        lives: 2,
        badge: null
      },
      difficulty: 'medium'
    },
    {
      id: 'weekly_srs_100',
      type: 'weekly',
      title: 'SRS Master',
      description: 'Révise 100 cartes SRS cette semaine',
      icon: '🎓',
      target: 100,
      progress: 0,
      trackingKey: 'srsReviews',
      rewards: {
        xp: 400,
        lives: 2,
        badge: null
      },
      difficulty: 'hard'
    },
    {
      id: 'weekly_streak_7',
      type: 'weekly',
      title: 'Une semaine parfaite',
      description: 'Maintiens un streak de 7 jours',
      icon: '🔥',
      target: 7,
      progress: 0,
      trackingKey: 'streak',
      rewards: {
        xp: 500,
        lives: 3,
        badge: 'streak_7'
      },
      difficulty: 'hard'
    },
    {
      id: 'weekly_perfect_5',
      type: 'weekly',
      title: 'Perfectionniste',
      description: 'Obtiens 100% à 5 leçons',
      icon: '💯',
      target: 5,
      progress: 0,
      trackingKey: 'perfectScores',
      rewards: {
        xp: 350,
        lives: 2,
        badge: null
      },
      difficulty: 'hard'
    },
    {
      id: 'weekly_challenges_7',
      type: 'weekly',
      title: 'Explorateur culturel',
      description: 'Complète tous les défis de la semaine',
      icon: '🗾',
      target: 7,
      progress: 0,
      trackingKey: 'dailyChallenges',
      rewards: {
        xp: 400,
        lives: 2,
        badge: null
      },
      difficulty: 'medium'
    }
  ],

  // ===== QUÊTES PRINCIPALES (Story progression, permanentes) =====
  main: [
    {
      id: 'main_beginner',
      type: 'main',
      title: 'Premiers pas en japonais',
      description: 'Complète les 10 premières leçons (Hiragana)',
      icon: '🌸',
      target: 10,
      progress: 0,
      trackingKey: 'lessonsCompleted',
      rewards: {
        xp: 500,
        lives: 3,
        badge: 'beginner_master'
      },
      difficulty: 'medium',
      chapter: 1
    },
    {
      id: 'main_katakana',
      type: 'main',
      title: 'Maître du Katakana',
      description: 'Complète toutes les leçons Katakana',
      icon: '🎌',
      target: 10,
      progress: 0,
      trackingKey: 'katakanaLessonsCompleted',
      rewards: {
        xp: 600,
        lives: 3,
        badge: 'katakana_master'
      },
      difficulty: 'hard',
      chapter: 2
    },
    {
      id: 'main_kanji_n5',
      type: 'main',
      title: 'Apprenti Kanji',
      description: 'Complète toutes les leçons Kanji N5',
      icon: '📝',
      target: 10,
      progress: 0,
      trackingKey: 'kanjiLessonsCompleted',
      rewards: {
        xp: 800,
        lives: 5,
        badge: 'kanji_n5_master'
      },
      difficulty: 'hard',
      chapter: 3
    },
    {
      id: 'main_srs_100',
      type: 'main',
      title: 'Maître SRS',
      description: 'Atteins 100 cartes maîtrisées dans le SRS',
      icon: '🏆',
      target: 100,
      progress: 0,
      trackingKey: 'srsMatureCards',
      rewards: {
        xp: 1000,
        lives: 5,
        badge: 'srs_master'
      },
      difficulty: 'expert',
      chapter: 4
    },
    {
      id: 'main_level_10',
      type: 'main',
      title: 'Niveau 10',
      description: 'Atteins le niveau 10',
      icon: '⭐',
      target: 10,
      progress: 0,
      trackingKey: 'level',
      rewards: {
        xp: 500,
        lives: 3,
        badge: 'level_10'
      },
      difficulty: 'hard',
      chapter: 1
    },
    {
      id: 'main_level_25',
      type: 'main',
      title: 'Niveau 25',
      description: 'Atteins le niveau 25',
      icon: '🌟',
      target: 25,
      progress: 0,
      trackingKey: 'level',
      rewards: {
        xp: 1000,
        lives: 5,
        badge: 'level_25'
      },
      difficulty: 'expert',
      chapter: 2
    },
    {
      id: 'main_streak_30',
      type: 'main',
      title: 'Inarrêtable',
      description: 'Maintiens un streak de 30 jours',
      icon: '🔥',
      target: 30,
      progress: 0,
      trackingKey: 'streak',
      rewards: {
        xp: 1500,
        lives: 10,
        badge: 'streak_30'
      },
      difficulty: 'legendary',
      chapter: 5
    }
  ],

  // ===== QUÊTES SPÉCIALES (Events, limited time) =====
  special: [
    {
      id: 'special_weekend',
      type: 'special',
      title: 'Guerrier du weekend',
      description: 'Complète 5 leçons ce weekend',
      icon: '🎉',
      target: 5,
      progress: 0,
      trackingKey: 'weekendLessons',
      rewards: {
        xp: 200,
        lives: 2,
        badge: null
      },
      difficulty: 'medium',
      startDate: null, // À définir dynamiquement
      endDate: null
    }
  ]
};

// ===== CONFIGURATION DES DIFFICULTÉS =====
const questDifficulties = {
  easy: {
    color: '#10b981', // Green
    label: 'Facile',
    multiplier: 1.0
  },
  medium: {
    color: '#f59e0b', // Orange
    label: 'Moyen',
    multiplier: 1.5
  },
  hard: {
    color: '#ef4444', // Red
    label: 'Difficile',
    multiplier: 2.0
  },
  expert: {
    color: '#8b5cf6', // Purple
    label: 'Expert',
    multiplier: 3.0
  },
  legendary: {
    color: '#f59e0b', // Gold
    label: 'Légendaire',
    multiplier: 5.0
  }
};

// ===== HELPER FUNCTIONS =====
const QuestsDataHelper = {
  /**
   * Récupère toutes les quêtes d'un type
   */
  getQuestsByType: function(type) {
    return questsData[type] || [];
  },

  /**
   * Récupère une quête par son ID
   */
  getQuestById: function(questId) {
    const allQuests = [
      ...questsData.daily,
      ...questsData.weekly,
      ...questsData.main,
      ...questsData.special
    ];
    return allQuests.find(q => q.id === questId);
  },

  /**
   * Récupère les quêtes actives du jour (rotation quotidienne)
   */
  getDailyActiveQuests: function() {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const dailyQuests = questsData.daily;

    // Rotation : 3 quêtes quotidiennes différentes chaque jour
    const indices = [
      dayOfYear % dailyQuests.length,
      (dayOfYear + 1) % dailyQuests.length,
      (dayOfYear + 2) % dailyQuests.length
    ];

    return indices.map(i => dailyQuests[i]);
  },

  /**
   * Récupère les quêtes hebdomadaires actives
   */
  getWeeklyActiveQuests: function() {
    // Toutes les quêtes hebdomadaires sont actives
    return questsData.weekly;
  },

  /**
   * Récupère la difficulté d'une quête
   */
  getDifficulty: function(difficulty) {
    return questDifficulties[difficulty] || questDifficulties.easy;
  }
};

// Exposition globale
if (typeof window !== 'undefined') {
  window.questsData = questsData;
  window.questDifficulties = questDifficulties;
  window.QuestsDataHelper = QuestsDataHelper;
}
