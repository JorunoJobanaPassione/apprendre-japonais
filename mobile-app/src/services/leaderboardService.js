/**
 * Leaderboard Service - Classement hebdomadaire
 *
 * IMPACT ENGAGEMENT: Le système de ligues Duolingo augmente l'engagement de 30%+
 *
 * Fonctionnalités:
 * - Classement hebdomadaire (reset chaque lundi)
 * - Ligues avec promotion/rélégation
 * - Compétiteurs simulés (en attendant un backend)
 * - Récompenses pour le top 3
 *
 * NOTE: Version locale pour MVP, à connecter à un backend plus tard
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  LEADERBOARD_DATA: 'leaderboard_data',
  WEEKLY_XP: 'weekly_xp',
  LEAGUE_HISTORY: 'league_history',
  COMPETITORS: 'leaderboard_competitors',
};

// Configuration des ligues (comme Duolingo)
export const LEAGUES = [
  { id: 'bronze', name: 'Bronze', emoji: '🥉', color: '#CD7F32', minXP: 0 },
  { id: 'silver', name: 'Argent', emoji: '🥈', color: '#C0C0C0', minXP: 100 },
  { id: 'gold', name: 'Or', emoji: '🥇', color: '#FFD700', minXP: 300 },
  { id: 'sapphire', name: 'Saphir', emoji: '💎', color: '#0F52BA', minXP: 600 },
  { id: 'ruby', name: 'Rubis', emoji: '❤️', color: '#E0115F', minXP: 1000 },
  { id: 'emerald', name: 'Émeraude', emoji: '💚', color: '#50C878', minXP: 1500 },
  { id: 'amethyst', name: 'Améthyste', emoji: '💜', color: '#9966CC', minXP: 2500 },
  { id: 'pearl', name: 'Perle', emoji: '🤍', color: '#F5F5F5', minXP: 4000 },
  { id: 'obsidian', name: 'Obsidienne', emoji: '🖤', color: '#1C1C1C', minXP: 6000 },
  { id: 'diamond', name: 'Diamant', emoji: '💠', color: '#B9F2FF', minXP: 10000 },
];

// Récompenses par position
export const POSITION_REWARDS = {
  1: { xp: 100, lives: 3, title: 'Champion' },
  2: { xp: 75, lives: 2, title: 'Vice-champion' },
  3: { xp: 50, lives: 1, title: 'Podium' },
  top10: { xp: 25, title: 'Top 10' },
  promotion: { xp: 50, message: 'Promotion !' },
};

// Noms aléatoires pour les compétiteurs simulés
const FAKE_NAMES = [
  'Sakura92', 'TokioKid', 'NihonLover', 'KanjiMaster', 'YuriSan',
  'HiraganaHero', 'SamuraiX', 'MangaFan', 'OtakuPro', 'SushiLover',
  'KawaiiNeko', 'BentoBox', 'FujiClimber', 'RamenKing', 'SakeEnjoyer',
  'TokyoDrift', 'OsakaVibes', 'KyotoSoul', 'NaraDeers', 'HokkaidoSnow',
  'AnimeFan01', 'NipponGo', 'J-Student', 'KatakanaKid', 'NihongoStar',
  'ZenMaster', 'ShintoPriest', 'GeishaGrace', 'ShogunLord', 'NinjaPath',
];

/**
 * Obtient le numéro de la semaine actuelle
 */
const getWeekNumber = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now - start;
  const oneWeek = 604800000; // millisecondes dans une semaine
  return Math.floor(diff / oneWeek);
};

/**
 * Obtient le jour restant avant le reset
 */
export const getTimeUntilReset = () => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;

  const nextMonday = new Date(now);
  nextMonday.setDate(now.getDate() + daysUntilMonday);
  nextMonday.setHours(0, 0, 0, 0);

  const diffMs = nextMonday - now;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return { days: diffDays, hours: diffHours, nextReset: nextMonday };
};

/**
 * Obtient les données du leaderboard
 */
export const getLeaderboardData = async () => {
  try {
    const weekNumber = getWeekNumber();
    const data = await AsyncStorage.getItem(STORAGE_KEYS.LEADERBOARD_DATA);
    const parsed = data ? JSON.parse(data) : null;

    // Si c'est une nouvelle semaine, reset
    if (!parsed || parsed.weekNumber !== weekNumber) {
      return await initializeWeek(weekNumber, parsed);
    }

    return parsed;
  } catch (error) {
    console.error('Error getting leaderboard data:', error);
    return await initializeWeek(getWeekNumber(), null);
  }
};

/**
 * Initialise une nouvelle semaine
 */
const initializeWeek = async (weekNumber, previousData) => {
  // Déterminer la ligue actuelle
  let currentLeague = 'bronze';
  if (previousData) {
    // Vérifier promotion/rélégation
    const prevPosition = previousData.userPosition;
    if (prevPosition <= 3) {
      // Promotion
      const leagueIndex = LEAGUES.findIndex((l) => l.id === previousData.league);
      if (leagueIndex < LEAGUES.length - 1) {
        currentLeague = LEAGUES[leagueIndex + 1].id;
      } else {
        currentLeague = previousData.league;
      }
    } else if (prevPosition > 15) {
      // Rélégation
      const leagueIndex = LEAGUES.findIndex((l) => l.id === previousData.league);
      if (leagueIndex > 0) {
        currentLeague = LEAGUES[leagueIndex - 1].id;
      } else {
        currentLeague = previousData.league;
      }
    } else {
      currentLeague = previousData.league;
    }
  }

  // Générer des compétiteurs
  const competitors = generateCompetitors(currentLeague);

  const newData = {
    weekNumber,
    league: currentLeague,
    userXP: 0,
    userName: 'Toi',
    userPosition: 10, // Position initiale au milieu
    competitors,
    lastUpdated: new Date().toISOString(),
    previousPosition: previousData?.userPosition || null,
    wasPromoted: previousData && previousData.userPosition <= 3,
    wasRelegated: previousData && previousData.userPosition > 15,
  };

  await AsyncStorage.setItem(STORAGE_KEYS.LEADERBOARD_DATA, JSON.stringify(newData));

  return newData;
};

/**
 * Génère des compétiteurs simulés
 */
const generateCompetitors = (league) => {
  const leagueData = LEAGUES.find((l) => l.id === league);
  const baseXP = leagueData?.minXP || 0;

  // Mélanger les noms
  const shuffledNames = [...FAKE_NAMES].sort(() => Math.random() - 0.5);

  // Générer 19 compétiteurs (pour un total de 20 avec l'utilisateur)
  const competitors = [];
  for (let i = 0; i < 19; i++) {
    // XP varié basé sur la position attendue
    const positionFactor = 1 - (i / 19);
    const randomFactor = 0.7 + Math.random() * 0.6;
    const xp = Math.floor(baseXP * positionFactor * randomFactor * 1.5);

    competitors.push({
      id: `bot_${i}`,
      name: shuffledNames[i] || `Player${i}`,
      xp,
      isBot: true,
      avatar: getRandomAvatar(),
    });
  }

  return competitors;
};

/**
 * Avatars aléatoires
 */
const getRandomAvatar = () => {
  const avatars = ['🧑', '👩', '👨', '🧑‍🎓', '👩‍🎓', '👨‍🎓', '🧑‍💻', '👩‍💻', '👨‍💻'];
  return avatars[Math.floor(Math.random() * avatars.length)];
};

/**
 * Ajoute des XP au leaderboard hebdomadaire
 */
export const addWeeklyXP = async (amount) => {
  try {
    const data = await getLeaderboardData();

    // Mettre à jour l'XP de l'utilisateur
    data.userXP += amount;

    // Faire progresser les bots (simulation)
    data.competitors = data.competitors.map((comp) => {
      // Progression aléatoire des bots (plus active en début de semaine)
      const dayOfWeek = new Date().getDay();
      const activityFactor = dayOfWeek < 4 ? 0.3 : 0.1;

      if (Math.random() < activityFactor) {
        comp.xp += Math.floor(Math.random() * 30);
      }
      return comp;
    });

    // Recalculer la position
    const allParticipants = [
      { id: 'user', name: data.userName, xp: data.userXP, isUser: true },
      ...data.competitors,
    ].sort((a, b) => b.xp - a.xp);

    data.userPosition = allParticipants.findIndex((p) => p.isUser) + 1;
    data.lastUpdated = new Date().toISOString();

    await AsyncStorage.setItem(STORAGE_KEYS.LEADERBOARD_DATA, JSON.stringify(data));

    return {
      success: true,
      newXP: data.userXP,
      position: data.userPosition,
      league: data.league,
    };
  } catch (error) {
    console.error('Error adding weekly XP:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Obtient le classement complet trié
 */
export const getRanking = async () => {
  try {
    const data = await getLeaderboardData();

    const allParticipants = [
      {
        id: 'user',
        name: data.userName,
        xp: data.userXP,
        isUser: true,
        avatar: '🎯',
      },
      ...data.competitors,
    ].sort((a, b) => b.xp - a.xp);

    // Ajouter les positions
    return allParticipants.map((p, index) => ({
      ...p,
      position: index + 1,
      inPromotionZone: index < 3,
      inRelegationZone: index >= 17,
    }));
  } catch (error) {
    console.error('Error getting ranking:', error);
    return [];
  }
};

/**
 * Obtient les infos de la ligue actuelle
 */
export const getCurrentLeague = async () => {
  const data = await getLeaderboardData();
  return LEAGUES.find((l) => l.id === data.league) || LEAGUES[0];
};

/**
 * Obtient les stats du leaderboard
 */
export const getLeaderboardStats = async () => {
  const data = await getLeaderboardData();
  const league = LEAGUES.find((l) => l.id === data.league) || LEAGUES[0];
  const timeUntilReset = getTimeUntilReset();

  return {
    userXP: data.userXP,
    position: data.userPosition,
    league,
    totalParticipants: 20,
    timeUntilReset,
    isInPromotionZone: data.userPosition <= 3,
    isInRelegationZone: data.userPosition > 17,
    wasPromoted: data.wasPromoted,
    wasRelegated: data.wasRelegated,
  };
};

/**
 * Réinitialise le leaderboard (pour tests)
 */
export const resetLeaderboard = async () => {
  await AsyncStorage.removeItem(STORAGE_KEYS.LEADERBOARD_DATA);
};

export default {
  LEAGUES,
  POSITION_REWARDS,
  getLeaderboardData,
  addWeeklyXP,
  getRanking,
  getCurrentLeague,
  getLeaderboardStats,
  getTimeUntilReset,
  resetLeaderboard,
};
