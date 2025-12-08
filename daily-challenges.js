/**
 * 🎯 DÉFIS QUOTIDIENS
 * Proverbes japonais et menus de restaurant à déchiffrer
 */

// ===== PROVERBES JAPONAIS =====
const japaneseProverbs = [
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

// ===== MENUS DE RESTAURANT =====
const restaurantMenus = [
  {
    id: "menu1",
    restaurantName: "Ramen-Ya 🍜",
    type: "ramen",
    items: [
      { japanese: "ラーメン", hiragana: "らーめん", romaji: "rāmen", french: "Ramen classique", price: "850円" },
      { japanese: "チャーシュー麺", hiragana: "ちゃーしゅーめん", romaji: "chāshū men", french: "Ramen au porc braisé", price: "1000円" },
      { japanese: "味噌ラーメン", hiragana: "みそらーめん", romaji: "miso rāmen", french: "Ramen au miso", price: "900円" },
      { japanese: "餃子", hiragana: "ぎょうざ", romaji: "gyōza", french: "Raviolis japonais", price: "400円" },
      { japanese: "ビール", hiragana: "びーる", romaji: "bīru", french: "Bière", price: "500円" }
    ],
    difficulty: "easy",
    culturalNote: "Le ramen est originaire de Chine mais a été adopté et transformé par le Japon."
  },
  {
    id: "menu2",
    restaurantName: "Sushi House 🍣",
    type: "sushi",
    items: [
      { japanese: "マグロ", hiragana: "まぐろ", romaji: "maguro", french: "Thon", price: "300円" },
      { japanese: "サーモン", hiragana: "さーもん", romaji: "sāmon", french: "Saumon", price: "280円" },
      { japanese: "エビ", hiragana: "えび", romaji: "ebi", french: "Crevette", price: "250円" },
      { japanese: "カリフォルニアロール", hiragana: "かりふぉるにあろーる", romaji: "kariforunia rōru", french: "California Roll", price: "600円" },
      { japanese: "味噌汁", hiragana: "みそしる", romaji: "miso shiru", french: "Soupe miso", price: "200円" }
    ],
    difficulty: "medium",
    culturalNote: "Le sushi était à l'origine une méthode de conservation du poisson dans du riz fermenté."
  },
  {
    id: "menu3",
    restaurantName: "Café Modern ☕",
    type: "cafe",
    items: [
      { japanese: "コーヒー", hiragana: "こーひー", romaji: "kōhī", french: "Café", price: "450円" },
      { japanese: "カフェラテ", hiragana: "かふぇらて", romaji: "kafe rate", french: "Café latte", price: "550円" },
      { japanese: "ケーキ", hiragana: "けーき", romaji: "kēki", french: "Gâteau", price: "600円" },
      { japanese: "アイスクリーム", hiragana: "あいすくりーむ", romaji: "aisu kurīmu", french: "Glace", price: "400円" },
      { japanese: "サンドイッチ", hiragana: "さんどいっち", romaji: "sandoicchi", french: "Sandwich", price: "700円" }
    ],
    difficulty: "easy",
    culturalNote: "Les cafés japonais (kissaten) sont des lieux de détente et de lecture très appréciés."
  },
  {
    id: "menu4",
    restaurantName: "Izakaya 居酒屋",
    type: "izakaya",
    items: [
      { japanese: "枝豆", hiragana: "えだまめ", romaji: "edamame", french: "Fèves de soja", price: "350円" },
      { japanese: "焼き鳥", hiragana: "やきとり", romaji: "yakitori", french: "Brochettes de poulet", price: "500円" },
      { japanese: "から揚げ", hiragana: "からあげ", romaji: "karaage", french: "Poulet frit", price: "600円" },
      { japanese: "日本酒", hiragana: "にほんしゅ", romaji: "nihonshu", french: "Saké", price: "800円" },
      { japanese: "ハイボール", hiragana: "はいぼーる", romaji: "haibōru", french: "Highball (whisky-soda)", price: "450円" }
    ],
    difficulty: "hard",
    culturalNote: "L'izakaya est un bar-restaurant convivial où l'on partage des petits plats en groupe."
  },
  {
    id: "menu5",
    restaurantName: "Tempura Tei 🍤",
    type: "tempura",
    items: [
      { japanese: "エビ天ぷら", hiragana: "えびてんぷら", romaji: "ebi tenpura", french: "Tempura de crevette", price: "1200円" },
      { japanese: "野菜天ぷら", hiragana: "やさいてんぷら", romaji: "yasai tenpura", french: "Tempura de légumes", price: "900円" },
      { japanese: "天丼", hiragana: "てんどん", romaji: "tendon", french: "Bol de riz aux tempuras", price: "1000円" },
      { japanese: "抹茶アイス", hiragana: "まっちゃあいす", romaji: "matcha aisu", french: "Glace au thé vert", price: "400円" },
      { japanese: "緑茶", hiragana: "りょくちゃ", romaji: "ryokucha", french: "Thé vert", price: "250円" }
    ],
    difficulty: "medium",
    culturalNote: "Le tempura a été introduit au Japon par les Portugais au 16ème siècle."
  },
  {
    id: "menu6",
    restaurantName: "McDonald's Japan 🍔",
    type: "fastfood",
    items: [
      { japanese: "ビッグマック", hiragana: "びっぐまっく", romaji: "biggu makku", french: "Big Mac", price: "420円" },
      { japanese: "ポテト", hiragana: "ぽてと", romaji: "poteto", french: "Frites", price: "200円" },
      { japanese: "シェイク", hiragana: "しぇいく", romaji: "sheiku", french: "Milkshake", price: "300円" },
      { japanese: "チキンナゲット", hiragana: "ちきんなげっと", romaji: "chikin nagetto", french: "Nuggets de poulet", price: "250円" },
      { japanese: "コーラ", hiragana: "こーら", romaji: "kōra", french: "Coca-Cola", price: "150円" }
    ],
    difficulty: "easy",
    culturalNote: "McDonald's au Japon propose des items uniques comme le Teriyaki Burger et le McFlurry au matcha."
  }
];

// ===== FONCTIONS UTILITAIRES =====

// Obtenir le défi du jour (basé sur la date)
function getDailyChallenge() {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);

  // Alterner entre proverbe (jours impairs) et menu (jours pairs)
  if (dayOfYear % 2 === 0) {
    const menuIndex = dayOfYear % restaurantMenus.length;
    return {
      type: 'menu',
      data: restaurantMenus[menuIndex]
    };
  } else {
    const proverbIndex = dayOfYear % japaneseProverbs.length;
    return {
      type: 'proverb',
      data: japaneseProverbs[proverbIndex]
    };
  }
}

// Obtenir un défi aléatoire (pour tester)
function getRandomChallenge() {
  const types = ['proverb', 'menu'];
  const randomType = types[Math.floor(Math.random() * types.length)];

  if (randomType === 'proverb') {
    return {
      type: 'proverb',
      data: japaneseProverbs[Math.floor(Math.random() * japaneseProverbs.length)]
    };
  } else {
    return {
      type: 'menu',
      data: restaurantMenus[Math.floor(Math.random() * restaurantMenus.length)]
    };
  }
}

// Vérifier si l'utilisateur a complété le défi du jour
function isTodayChallengeCompleted() {
  const today = new Date().toDateString();
  const lastCompleted = localStorage.getItem('lastChallengeCompleted');
  return lastCompleted === today;
}

// Marquer le défi du jour comme complété
function markTodayChallengeCompleted() {
  const today = new Date().toDateString();
  localStorage.setItem('lastChallengeCompleted', today);

  // Incrémenter le compteur de défis complétés
  const totalCompleted = parseInt(localStorage.getItem('totalChallengesCompleted') || '0');
  localStorage.setItem('totalChallengesCompleted', (totalCompleted + 1).toString());
}

// Obtenir le nombre total de défis complétés
function getTotalChallengesCompleted() {
  return parseInt(localStorage.getItem('totalChallengesCompleted') || '0');
}

// Obtenir l'icône selon le type de défi
function getChallengeIcon(type) {
  if (type === 'proverb') return '🎋';
  if (type === 'menu') return '🍜';
  return '🎯';
}

// Obtenir le titre selon le type de défi
function getChallengeTitle(type) {
  if (type === 'proverb') return 'Proverbe du Jour';
  if (type === 'menu') return 'Menu à Déchiffrer';
  return 'Défi du Jour';
}

// Obtenir la description selon le type de défi
function getChallengeDescription(challenge) {
  if (challenge.type === 'proverb') {
    return `Découvre ce proverbe japonais · ${challenge.data.difficulty === 'easy' ? 'Facile' : challenge.data.difficulty === 'medium' ? 'Moyen' : 'Difficile'}`;
  }
  if (challenge.type === 'menu') {
    return `${challenge.data.restaurantName} · ${challenge.data.items.length} plats à découvrir`;
  }
  return 'Relève ce défi quotidien';
}
