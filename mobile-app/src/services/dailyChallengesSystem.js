/**
 * Daily Challenges System - Défis quotidiens
 * Proverbes japonais et menus de restaurant à déchiffrer
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  CURRENT_CHALLENGE: 'daily_challenge_current',
  LAST_CHALLENGE_DATE: 'daily_challenge_last_date',
  COMPLETED_CHALLENGES: 'daily_challenge_completed',
  CHALLENGE_STREAK: 'daily_challenge_streak',
};

// ===== PROVERBES JAPONAIS =====
const PROVERBS = [
  {
    id: "proverb1",
    japanese: "一期一会",
    hiragana: "いちごいちえ",
    romaji: "Ichi-go ichi-e",
    translation: "Une fois, une rencontre",
    meaning: "Chaque rencontre est unique et ne se reproduira jamais. Il faut chérir chaque instant.",
    culturalContext: "Ce proverbe vient de la cérémonie du thé. Il enseigne à apprécier chaque moment comme s'il était le dernier.",
    difficulty: "medium",
    category: "philosophie"
  },
  {
    id: "proverb2",
    japanese: "七転び八起き",
    hiragana: "ななころびやおき",
    romaji: "Nana korobi ya oki",
    translation: "Sept chutes, huit relèvements",
    meaning: "Même si tu tombes sept fois, relève-toi huit fois. Ne jamais abandonner.",
    culturalContext: "Ce proverbe encourage la persévérance et la résilience face aux difficultés.",
    difficulty: "easy",
    category: "persévérance"
  },
  {
    id: "proverb3",
    japanese: "猿も木から落ちる",
    hiragana: "さるもきからおちる",
    romaji: "Saru mo ki kara ochiru",
    translation: "Même un singe tombe d'un arbre",
    meaning: "Tout le monde peut faire des erreurs, même les experts.",
    culturalContext: "Proverbe qui enseigne l'humilité et rappelle que personne n'est parfait.",
    difficulty: "easy",
    category: "humilité"
  },
  {
    id: "proverb4",
    japanese: "花より団子",
    hiragana: "はなよりだんご",
    romaji: "Hana yori dango",
    translation: "Des boulettes plutôt que des fleurs",
    meaning: "Privilégier la substance à l'apparence. L'utile avant le beau.",
    culturalContext: "Lors du hanami (admiration des cerisiers), certains préfèrent manger plutôt que contempler les fleurs.",
    difficulty: "medium",
    category: "pragmatisme"
  },
  {
    id: "proverb5",
    japanese: "十人十色",
    hiragana: "じゅうにんといろ",
    romaji: "Jū nin to iro",
    translation: "Dix personnes, dix couleurs",
    meaning: "Chaque personne est différente. À chacun ses goûts.",
    culturalContext: "Ce proverbe célèbre la diversité et encourage la tolérance.",
    difficulty: "easy",
    category: "diversité"
  },
  {
    id: "proverb6",
    japanese: "温故知新",
    hiragana: "おんこちしん",
    romaji: "On ko chi shin",
    translation: "Étudier le passé pour connaître le nouveau",
    meaning: "En étudiant l'ancien, on découvre du nouveau. L'histoire éclaire le présent.",
    culturalContext: "Citation des Analectes de Confucius, très utilisée au Japon.",
    difficulty: "hard",
    category: "sagesse"
  },
  {
    id: "proverb7",
    japanese: "井の中の蛙",
    hiragana: "いのなかのかわず",
    romaji: "I no naka no kawazu",
    translation: "La grenouille au fond du puits",
    meaning: "Une personne à l'esprit étroit qui ignore le monde extérieur.",
    culturalContext: "Proverbe qui critique l'ignorance et encourage l'ouverture d'esprit.",
    difficulty: "medium",
    category: "ouverture"
  },
  {
    id: "proverb8",
    japanese: "雨降って地固まる",
    hiragana: "あめふってじかたまる",
    romaji: "Ame futte ji katamaru",
    translation: "Après la pluie, la terre se raffermit",
    meaning: "Les difficultés renforcent les relations. Après la tempête vient le calme.",
    culturalContext: "Proverbe qui encourage à voir le positif dans les épreuves.",
    difficulty: "medium",
    category: "optimisme"
  },
  {
    id: "proverb9",
    japanese: "急がば回れ",
    hiragana: "いそがばまわれ",
    romaji: "Isogaba maware",
    translation: "Si tu es pressé, fais un détour",
    meaning: "Parfois, le chemin le plus long est le plus sûr. Mieux vaut prendre son temps.",
    culturalContext: "Conseille la prudence et la réflexion plutôt que la précipitation.",
    difficulty: "easy",
    category: "patience"
  },
  {
    id: "proverb10",
    japanese: "袖振り合うも多生の縁",
    hiragana: "そでふりあうもたしょうのえん",
    romaji: "Sode furi au mo tashō no en",
    translation: "Même se frôler dans la rue est un lien karmique",
    meaning: "Toute rencontre, même brève, a une signification profonde.",
    culturalContext: "Concept bouddhiste de l'interconnexion de toutes choses.",
    difficulty: "hard",
    category: "spiritualité"
  }
];

/**
 * Vérifie si c'est un nouveau jour
 */
const isNewDay = (lastDate) => {
  if (!lastDate) return true;

  const last = new Date(lastDate);
  const now = new Date();

  return (
    last.getDate() !== now.getDate() ||
    last.getMonth() !== now.getMonth() ||
    last.getFullYear() !== now.getFullYear()
  );
};

/**
 * Génère le défi du jour basé sur la date
 */
const generateDailyChallenge = () => {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);

  // Utiliser le jour de l'année comme seed pour avoir le même défi chaque jour
  const index = dayOfYear % PROVERBS.length;
  const proverb = PROVERBS[index];

  return {
    ...proverb,
    type: 'proverb',
    date: today.toISOString(),
    completed: false,
    xpReward: proverb.difficulty === 'easy' ? 10 : proverb.difficulty === 'medium' ? 20 : 30,
  };
};

/**
 * Récupère le défi du jour
 */
export const getDailyChallenge = async () => {
  try {
    const lastDate = await AsyncStorage.getItem(STORAGE_KEYS.LAST_CHALLENGE_DATE);
    const currentChallenge = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_CHALLENGE);

    // Si c'est un nouveau jour ou qu'il n'y a pas de défi actuel
    if (isNewDay(lastDate) || !currentChallenge) {
      const newChallenge = generateDailyChallenge();

      await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_CHALLENGE, JSON.stringify(newChallenge));
      await AsyncStorage.setItem(STORAGE_KEYS.LAST_CHALLENGE_DATE, new Date().toISOString());

      return newChallenge;
    }

    return JSON.parse(currentChallenge);
  } catch (error) {
    console.error('Error getting daily challenge:', error);
    return generateDailyChallenge();
  }
};

/**
 * Marque le défi du jour comme complété
 */
export const completeDailyChallenge = async () => {
  try {
    const challenge = await getDailyChallenge();

    // Marquer comme complété
    challenge.completed = true;
    await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_CHALLENGE, JSON.stringify(challenge));

    // Ajouter aux défis complétés
    const completedStr = await AsyncStorage.getItem(STORAGE_KEYS.COMPLETED_CHALLENGES);
    const completed = completedStr ? JSON.parse(completedStr) : [];
    completed.push({
      id: challenge.id,
      date: new Date().toISOString(),
      xpEarned: challenge.xpReward,
    });
    await AsyncStorage.setItem(STORAGE_KEYS.COMPLETED_CHALLENGES, JSON.stringify(completed));

    // Mettre à jour le streak
    await updateChallengeStreak();

    return challenge.xpReward;
  } catch (error) {
    console.error('Error completing daily challenge:', error);
    return 0;
  }
};

/**
 * Met à jour le streak de défis quotidiens
 */
const updateChallengeStreak = async () => {
  try {
    const streakStr = await AsyncStorage.getItem(STORAGE_KEYS.CHALLENGE_STREAK);
    let streak = streakStr ? parseInt(streakStr, 10) : 0;

    streak += 1;

    await AsyncStorage.setItem(STORAGE_KEYS.CHALLENGE_STREAK, streak.toString());
    return streak;
  } catch (error) {
    console.error('Error updating challenge streak:', error);
    return 0;
  }
};

/**
 * Récupère le streak actuel
 */
export const getChallengeStreak = async () => {
  try {
    const streakStr = await AsyncStorage.getItem(STORAGE_KEYS.CHALLENGE_STREAK);
    return streakStr ? parseInt(streakStr, 10) : 0;
  } catch (error) {
    console.error('Error getting challenge streak:', error);
    return 0;
  }
};

/**
 * Récupère les stats des défis
 */
export const getChallengeStats = async () => {
  try {
    const completedStr = await AsyncStorage.getItem(STORAGE_KEYS.COMPLETED_CHALLENGES);
    const completed = completedStr ? JSON.parse(completedStr) : [];

    const streak = await getChallengeStreak();
    const totalXP = completed.reduce((sum, c) => sum + (c.xpEarned || 0), 0);

    return {
      totalCompleted: completed.length,
      currentStreak: streak,
      totalXP,
      lastCompleted: completed.length > 0 ? completed[completed.length - 1].date : null,
    };
  } catch (error) {
    console.error('Error getting challenge stats:', error);
    return {
      totalCompleted: 0,
      currentStreak: 0,
      totalXP: 0,
      lastCompleted: null,
    };
  }
};

/**
 * Réinitialise les données des défis (pour debug)
 */
export const resetChallenges = async () => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.CURRENT_CHALLENGE,
      STORAGE_KEYS.LAST_CHALLENGE_DATE,
      STORAGE_KEYS.COMPLETED_CHALLENGES,
      STORAGE_KEYS.CHALLENGE_STREAK,
    ]);
  } catch (error) {
    console.error('Error resetting challenges:', error);
  }
};

export default {
  getDailyChallenge,
  completeDailyChallenge,
  getChallengeStreak,
  getChallengeStats,
  resetChallenges,
};
