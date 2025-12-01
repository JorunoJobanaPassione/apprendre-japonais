/**
 * 🏆 Système de badges - App Japonais
 * Inspiré de Duolingo, Busuu et Drops
 */

export const BADGE_CATEGORIES = {
  PROGRESS: 'progress',
  MASTERY: 'mastery',
  STREAK: 'streak',
  PERFECT: 'perfect',
  SPEED: 'speed',
  SPECIAL: 'special'
};

export const badges = [
  // 🎯 BADGES DE PROGRESSION
  {
    id: 'first_lesson',
    category: BADGE_CATEGORIES.PROGRESS,
    title: 'Premier pas',
    description: 'Terminer la première leçon',
    icon: '🎯',
    condition: (stats) => stats.completedLessons >= 1,
    rarity: 'common'
  },
  {
    id: 'five_lessons',
    category: BADGE_CATEGORIES.PROGRESS,
    title: 'Étudiant assidu',
    description: 'Terminer 5 leçons',
    icon: '📚',
    condition: (stats) => stats.completedLessons >= 5,
    rarity: 'common'
  },
  {
    id: 'all_lessons',
    category: BADGE_CATEGORIES.PROGRESS,
    title: 'Maître des hiragana',
    description: 'Terminer toutes les leçons',
    icon: '👑',
    condition: (stats) => stats.completedLessons >= 10,
    rarity: 'legendary'
  },

  // ⭐ BADGES DE MAÎTRISE
  {
    id: 'score_80',
    category: BADGE_CATEGORIES.MASTERY,
    title: 'Bon élève',
    description: 'Obtenir 80% à une leçon',
    icon: '⭐',
    condition: (stats) => stats.bestScore >= 80,
    rarity: 'common'
  },
  {
    id: 'score_90',
    category: BADGE_CATEGORIES.MASTERY,
    title: 'Excellent',
    description: 'Obtenir 90% à une leçon',
    icon: '🌟',
    condition: (stats) => stats.bestScore >= 90,
    rarity: 'rare'
  },
  {
    id: 'avg_80',
    category: BADGE_CATEGORIES.MASTERY,
    title: 'Consistant',
    description: 'Moyenne de 80% sur toutes les leçons',
    icon: '💎',
    condition: (stats) => stats.averageScore >= 80,
    rarity: 'rare'
  },

  // 🔥 BADGES DE SÉRIE (STREAK)
  {
    id: 'streak_3',
    category: BADGE_CATEGORIES.STREAK,
    title: 'Régularité',
    description: '3 jours consécutifs',
    icon: '🔥',
    condition: (stats) => stats.currentStreak >= 3,
    rarity: 'common'
  },
  {
    id: 'streak_7',
    category: BADGE_CATEGORIES.STREAK,
    title: 'Une semaine !',
    description: '7 jours consécutifs',
    icon: '🔥🔥',
    condition: (stats) => stats.currentStreak >= 7,
    rarity: 'rare'
  },
  {
    id: 'streak_30',
    category: BADGE_CATEGORIES.STREAK,
    title: 'Inarrêtable',
    description: '30 jours consécutifs',
    icon: '🔥🔥🔥',
    condition: (stats) => stats.currentStreak >= 30,
    rarity: 'epic'
  },
  {
    id: 'streak_100',
    category: BADGE_CATEGORIES.STREAK,
    title: 'Légende vivante',
    description: '100 jours consécutifs',
    icon: '🏆',
    condition: (stats) => stats.currentStreak >= 100,
    rarity: 'legendary'
  },

  // 💯 BADGES PARFAITS
  {
    id: 'perfect_first',
    category: BADGE_CATEGORIES.PERFECT,
    title: 'Score parfait',
    description: '100% à une leçon',
    icon: '💯',
    condition: (stats) => stats.perfectScores >= 1,
    rarity: 'rare'
  },
  {
    id: 'perfect_five',
    category: BADGE_CATEGORIES.PERFECT,
    title: 'Perfectionniste',
    description: '5 scores parfaits',
    icon: '💯✨',
    condition: (stats) => stats.perfectScores >= 5,
    rarity: 'epic'
  },
  {
    id: 'perfect_all',
    category: BADGE_CATEGORIES.PERFECT,
    title: 'Perfection absolue',
    description: '100% à toutes les leçons',
    icon: '💯👑',
    condition: (stats) => stats.perfectScores >= 10,
    rarity: 'legendary'
  },

  // ⚡ BADGES DE VITESSE
  {
    id: 'speed_lesson',
    category: BADGE_CATEGORIES.SPEED,
    title: 'Rapide comme l\'éclair',
    description: 'Terminer une leçon en moins de 3 minutes',
    icon: '⚡',
    condition: (stats) => stats.fastestLessonTime <= 180,
    rarity: 'rare'
  },
  {
    id: 'marathon',
    category: BADGE_CATEGORIES.SPEED,
    title: 'Marathon',
    description: 'Terminer 5 leçons en une journée',
    icon: '🏃',
    condition: (stats) => stats.lessonsInOneDay >= 5,
    rarity: 'epic'
  },

  // 🎊 BADGES SPÉCIAUX
  {
    id: 'night_owl',
    category: BADGE_CATEGORIES.SPECIAL,
    title: 'Oiseau de nuit',
    description: 'Étudier après minuit',
    icon: '🦉',
    condition: (stats) => stats.studiedAtNight === true,
    rarity: 'rare'
  },
  {
    id: 'early_bird',
    category: BADGE_CATEGORIES.SPECIAL,
    title: 'Lève-tôt',
    description: 'Étudier avant 6h du matin',
    icon: '🌅',
    condition: (stats) => stats.studiedEarlyMorning === true,
    rarity: 'rare'
  },
  {
    id: 'weekend_warrior',
    category: BADGE_CATEGORIES.SPECIAL,
    title: 'Guerrier du weekend',
    description: 'Étudier samedi ET dimanche',
    icon: '🎯',
    condition: (stats) => stats.studiedBothWeekendDays === true,
    rarity: 'rare'
  },
  {
    id: 'comeback',
    category: BADGE_CATEGORIES.SPECIAL,
    title: 'Retour en force',
    description: 'Revenir après 30 jours d\'absence',
    icon: '💪',
    condition: (stats) => stats.comebackAfter30Days === true,
    rarity: 'epic'
  },
  {
    id: 'explorer',
    category: BADGE_CATEGORIES.SPECIAL,
    title: 'Explorateur',
    description: 'Essayer chaque type d\'exercice',
    icon: '🗺️',
    condition: (stats) => stats.triedAllExerciseTypes === true,
    rarity: 'common'
  }
];

// Fonction pour vérifier quels badges ont été débloqués
export const checkUnlockedBadges = (userStats, currentBadges = []) => {
  const newlyUnlocked = [];

  badges.forEach(badge => {
    // Vérifier si le badge n'est pas déjà débloqué
    const alreadyUnlocked = currentBadges.some(b => b.id === badge.id);

    if (!alreadyUnlocked && badge.condition(userStats)) {
      newlyUnlocked.push(badge);
    }
  });

  return newlyUnlocked;
};

// Fonction pour obtenir tous les badges débloqués
export const getAllUnlockedBadges = (userStats) => {
  return badges.filter(badge => badge.condition(userStats));
};

// Fonction pour obtenir le pourcentage de badges débloqués
export const getBadgeProgress = (unlockedBadges) => {
  return Math.round((unlockedBadges.length / badges.length) * 100);
};

// Fonction pour obtenir les badges par catégorie
export const getBadgesByCategory = (category, unlockedBadges) => {
  const categoryBadges = badges.filter(b => b.category === category);
  const unlocked = categoryBadges.filter(b =>
    unlockedBadges.some(ub => ub.id === b.id)
  );

  return {
    total: categoryBadges.length,
    unlocked: unlocked.length,
    badges: categoryBadges,
    progress: Math.round((unlocked.length / categoryBadges.length) * 100)
  };
};

// Fonction pour obtenir le prochain badge à débloquer
export const getNextBadge = (userStats, unlockedBadges) => {
  const lockedBadges = badges.filter(b =>
    !unlockedBadges.some(ub => ub.id === b.id)
  );

  // Trouver le badge le plus proche d'être débloqué
  // (à implémenter selon la logique spécifique de chaque badge)
  return lockedBadges[0] || null;
};

export default badges;
