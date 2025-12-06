/**
 * 🌸 PHRASES CULTURELLES DU JOUR
 * 365 expressions japonaises authentiques avec contexte culturel
 */

const culturalPhrases = [
  {
    id: 1,
    hiragana: "いただきます",
    romaji: "Itadakimasu",
    french: "Bon appétit !",
    literal: "Je reçois humblement",
    category: "Nourriture",
    context: "Avant de manger",
    culturalExplanation: "Cette phrase exprime la gratitude envers tous ceux qui ont contribué au repas : agriculteurs, cuisiniers, et même les êtres vivants qui ont sacrifié leur vie. C'est un moment de reconnaissance profonde.",
    historicalOrigin: "Du verbe 'itadaku' (recevoir avec humilité), utilisé depuis l'ère Edo pour montrer le respect de la nourriture.",
    usage: "Dire en joignant les mains (gassho) avant chaque repas.",
    audioFile: "phrase_001_itadakimasu.mp3",
    icon: "🍱"
  },
  {
    id: 2,
    hiragana: "ごちそうさまでした",
    romaji: "Gochisousama deshita",
    french: "Merci pour ce repas",
    literal: "C'était un festin",
    category: "Nourriture",
    context: "Après avoir mangé",
    culturalExplanation: "Exprime la gratitude pour le repas et le temps passé à le préparer. Montre l'appréciation du travail accompli.",
    historicalOrigin: "De 'gochisou' (festin) + 'sama' (honorifique), utilisé depuis le Japon féodal pour remercier l'hôte.",
    usage: "Toujours dire après un repas, même seul, pour honorer la nourriture.",
    audioFile: "phrase_002_gochisousama.mp3",
    icon: "🙏"
  },
  {
    id: 3,
    hiragana: "おつかれさまです",
    romaji: "Otsukaresama desu",
    french: "Bon travail / Merci pour vos efforts",
    literal: "Vous devez être fatigué",
    category: "Travail",
    context: "Au travail, en fin de journée",
    culturalExplanation: "Reconnaissance mutuelle du travail accompli. Crée un sentiment de camaraderie et d'appartenance au groupe.",
    historicalOrigin: "Culture du collectivisme japonais, où l'effort du groupe est valorisé.",
    usage: "Dire aux collègues en partant ou en les croisant après une tâche.",
    audioFile: "phrase_003_otsukaresama.mp3",
    icon: "💼"
  },
  {
    id: 4,
    hiragana: "いってきます",
    romaji: "Itte kimasu",
    french: "Je pars (et je reviendrai)",
    literal: "J'y vais et je reviens",
    category: "Quotidien",
    context: "En quittant la maison",
    culturalExplanation: "Promesse implicite de retour. Rassure la famille sur le fait que vous reviendrez sain et sauf.",
    historicalOrigin: "Tradition familiale japonaise profondément ancrée dans la culture du foyer.",
    usage: "Dire en partant de chez soi, même si personne n'est là.",
    audioFile: "phrase_004_ittekimasu.mp3",
    icon: "🚪"
  },
  {
    id: 5,
    hiragana: "いってらっしゃい",
    romaji: "Itterasshai",
    french: "Vas-y et reviens bien",
    literal: "Pars et reviens",
    category: "Quotidien",
    context: "Réponse quand quelqu'un part",
    culturalExplanation: "Encourage et souhaite un retour en sécurité. Exprime l'attachement et l'attente du retour.",
    historicalOrigin: "Réponse traditionnelle à 'Itte kimasu', renforçant le lien familial.",
    usage: "Répondre quand quelqu'un dit 'Itte kimasu'.",
    audioFile: "phrase_005_itterasshai.mp3",
    icon: "👋"
  },
  {
    id: 6,
    hiragana: "ただいま",
    romaji: "Tadaima",
    french: "Je suis rentré(e)",
    literal: "Maintenant, juste maintenant",
    category: "Quotidien",
    context: "En rentrant à la maison",
    culturalExplanation: "Annonce le retour au foyer. Réaffirme l'appartenance à la maison et à la famille.",
    historicalOrigin: "Signifie littéralement 'je suis de retour maintenant', tradition séculaire japonaise.",
    usage: "Premier mot en franchissant la porte de chez soi.",
    audioFile: "phrase_006_tadaima.mp3",
    icon: "🏠"
  },
  {
    id: 7,
    hiragana: "おかえりなさい",
    romaji: "Okaerinasai",
    french: "Bon retour !",
    literal: "Bienvenue à la maison",
    category: "Quotidien",
    context: "Réponse quand quelqu'un rentre",
    culturalExplanation: "Accueille chaleureusement le retour d'un membre de la famille. Célèbre le retour en sécurité.",
    historicalOrigin: "Réponse traditionnelle à 'Tadaima', pilier de la culture familiale japonaise.",
    usage: "Répondre avec le sourire quand quelqu'un dit 'Tadaima'.",
    audioFile: "phrase_007_okaerinasai.mp3",
    icon: "🤗"
  },
  {
    id: 8,
    hiragana: "よろしくおねがいします",
    romaji: "Yoroshiku onegaishimasu",
    french: "Enchanté / Comptez sur moi",
    literal: "S'il vous plaît, favorablement",
    category: "Social",
    context: "Présentation, début de collaboration",
    culturalExplanation: "Phrase multi-usage exprimant le souhait d'une bonne relation future. Humble et respectueuse.",
    historicalOrigin: "Du keigo (langage honorifique), essentiel dans la société japonaise hiérarchisée.",
    usage: "Lors des présentations, au début d'un projet, ou pour demander une faveur.",
    audioFile: "phrase_008_yoroshiku.mp3",
    icon: "🤝"
  },
  {
    id: 9,
    hiragana: "おめでとうございます",
    romaji: "Omedetou gozaimasu",
    french: "Félicitations",
    literal: "C'est admirable / digne d'éloges",
    category: "Célébration",
    context: "Événements heureux",
    culturalExplanation: "Célèbre les réussites et moments heureux. Version formelle de 'omedetou'.",
    historicalOrigin: "De 'medetai' (heureux, auspicieux), utilisé depuis l'ère Heian.",
    usage: "Anniversaires, mariages, promotions, nouvel an.",
    audioFile: "phrase_009_omedetou.mp3",
    icon: "🎉"
  },
  {
    id: 10,
    hiragana: "がんばって",
    romaji: "Ganbatte",
    french: "Bon courage / Fais de ton mieux",
    literal: "Tiens bon",
    category: "Encouragement",
    context: "Encourager quelqu'un",
    culturalExplanation: "Encouragement emblématique japonais. Valorise l'effort et la persévérance plutôt que le résultat.",
    historicalOrigin: "Du verbe 'ganbaru' (persévérer), valeur centrale de la culture japonaise.",
    usage: "Avant un examen, un match, un défi.",
    audioFile: "phrase_010_ganbatte.mp3",
    icon: "💪"
  },
  {
    id: 11,
    hiragana: "おやすみなさい",
    romaji: "Oyasuminasai",
    french: "Bonne nuit",
    literal: "Reposez-vous bien",
    category: "Quotidien",
    context: "Avant de dormir",
    culturalExplanation: "Souhaite un repos paisible. Version polie, la version informelle est 'oyasumi'.",
    historicalOrigin: "De 'yasumu' (se reposer), tradition de respect mutuel.",
    usage: "Avant d'aller dormir ou de quitter quelqu'un le soir.",
    audioFile: "phrase_011_oyasumi.mp3",
    icon: "🌙"
  },
  {
    id: 12,
    hiragana: "おはようございます",
    romaji: "Ohayou gozaimasu",
    french: "Bonjour (matin)",
    literal: "C'est tôt",
    category: "Salutation",
    context: "Le matin",
    culturalExplanation: "Salutation matinale formelle. Reconnaît qu'il est tôt et que vous êtes éveillé.",
    historicalOrigin: "De 'hayai' (tôt), utilisé depuis des siècles.",
    usage: "Jusqu'à environ 10h du matin.",
    audioFile: "phrase_012_ohayou.mp3",
    icon: "☀️"
  },
  {
    id: 13,
    hiragana: "こんにちは",
    romaji: "Konnichiwa",
    french: "Bonjour (journée)",
    literal: "Ce jour",
    category: "Salutation",
    context: "L'après-midi",
    culturalExplanation: "Salutation universelle de la journée. Neutre et polie.",
    historicalOrigin: "Contraction de 'konnichi wa gokigen ikaga desu ka' (comment allez-vous aujourd'hui).",
    usage: "De 10h jusqu'au coucher du soleil.",
    audioFile: "phrase_013_konnichiwa.mp3",
    icon: "👋"
  },
  {
    id: 14,
    hiragana: "こんばんは",
    romaji: "Konbanwa",
    french: "Bonsoir",
    literal: "Ce soir",
    category: "Salutation",
    context: "Le soir",
    culturalExplanation: "Salutation du soir. Marque le passage à la soirée.",
    historicalOrigin: "De 'konban' (ce soir), parallèle à 'konnichiwa'.",
    usage: "Après le coucher du soleil.",
    audioFile: "phrase_014_konbanwa.mp3",
    icon: "🌆"
  },
  {
    id: 15,
    hiragana: "さようなら",
    romaji: "Sayounara",
    french: "Au revoir (définitif)",
    literal: "Si c'est ainsi...",
    category: "Séparation",
    context: "Adieu définitif",
    culturalExplanation: "Utilisé pour des séparations longues ou définitives. Connotation mélancolique.",
    historicalOrigin: "De 'sayou naraba' (si c'est comme ça), implique une séparation importante.",
    usage: "Rarement utilisé au quotidien. Préférer 'mata ne' (à plus).",
    audioFile: "phrase_015_sayounara.mp3",
    icon: "👋"
  },
  {
    id: 16,
    hiragana: "すみません",
    romaji: "Sumimasen",
    french: "Excusez-moi / Pardon",
    literal: "Ce n'est pas fini",
    category: "Politesse",
    context: "S'excuser, demander attention",
    culturalExplanation: "Phrase multi-usage : excuses, attirer l'attention, remercier. Indispensable au Japon.",
    historicalOrigin: "Implique que la dette n'est jamais complètement effacée.",
    usage: "S'excuser, appeler un serveur, remercier légèrement.",
    audioFile: "phrase_016_sumimasen.mp3",
    icon: "🙇"
  },
  {
    id: 17,
    hiragana: "ありがとうございます",
    romaji: "Arigatou gozaimasu",
    french: "Merci beaucoup",
    literal: "C'est difficile à obtenir",
    category: "Gratitude",
    context: "Remercier formellement",
    culturalExplanation: "Remerciement formel et respectueux. Exprime que le geste est rare et précieux.",
    historicalOrigin: "De 'arigatai' (rare, précieux), philosophie bouddhiste.",
    usage: "Remercier dans les situations formelles.",
    audioFile: "phrase_017_arigatou.mp3",
    icon: "🙏"
  },
  {
    id: 18,
    hiragana: "いちごいちえ",
    romaji: "Ichi-go ichi-e",
    french: "Une fois, une rencontre",
    literal: "Une vie, une rencontre",
    category: "Philosophie",
    context: "Philosophie de vie",
    culturalExplanation: "Chaque rencontre est unique et ne se reproduira jamais. Vivre pleinement le moment présent.",
    historicalOrigin: "Concept zen de la cérémonie du thé (Sen no Rikyū, 16e siècle).",
    usage: "Rappel de chérir chaque instant et chaque personne.",
    audioFile: "phrase_018_ichigoichie.mp3",
    icon: "🍵"
  },
  {
    id: 19,
    hiragana: "しょうがない",
    romaji: "Shou ga nai",
    french: "Ça ne peut pas être aidé",
    literal: "Il n'y a pas de gingembre",
    category: "Philosophie",
    context: "Acceptation du destin",
    culturalExplanation: "Accepter ce qui ne peut être changé. Philosophie d'acceptation stoïque très japonaise.",
    historicalOrigin: "Expression d'acceptation face à l'adversité, valeur bouddhiste.",
    usage: "Face aux événements hors de contrôle.",
    audioFile: "phrase_019_shouganai.mp3",
    icon: "🤷"
  },
  {
    id: 20,
    hiragana: "おまたせしました",
    romaji: "Omatase shimashita",
    french: "Désolé de vous avoir fait attendre",
    literal: "Je vous ai fait attendre",
    category: "Politesse",
    context: "Après avoir fait attendre quelqu'un",
    culturalExplanation: "S'excuse du temps d'attente, même court. Montre le respect du temps d'autrui.",
    historicalOrigin: "Culture de la ponctualité et du respect mutuel.",
    usage: "Au restaurant, en arrivant en retard, en rendant un service.",
    audioFile: "phrase_020_omatase.mp3",
    icon: "⏰"
  },
  {
    id: 21,
    hiragana: "いらっしゃいませ",
    romaji: "Irasshaimase",
    french: "Bienvenue !",
    literal: "S'il vous plaît, venez/soyez",
    category: "Commerce",
    context: "Accueil client",
    culturalExplanation: "Accueil chaleureux dans les magasins et restaurants. Aucune réponse attendue.",
    historicalOrigin: "Tradition commerciale japonaise de l'hospitalité (omotenashi).",
    usage: "Crié par les employés quand un client entre.",
    audioFile: "phrase_021_irasshaimase.mp3",
    icon: "🏪"
  },
  {
    id: 22,
    hiragana: "めしあがれ",
    romaji: "Meshiagare",
    french: "Bon appétit (à quelqu'un d'autre)",
    literal: "Veuillez manger",
    category: "Nourriture",
    context: "Servir un repas",
    culturalExplanation: "Invitation polie à manger. Version plus formelle que 'douzo'.",
    historicalOrigin: "Forme honorifique de 'taberu' (manger).",
    usage: "Quand on sert à manger à quelqu'un.",
    audioFile: "phrase_022_meshiagare.mp3",
    icon: "🍽️"
  },
  {
    id: 23,
    hiragana: "おさきにしつれいします",
    romaji: "Osaki ni shitsurei shimasu",
    french: "Excusez-moi de partir avant vous",
    literal: "Je m'excuse de passer devant",
    category: "Travail",
    context: "Quitter le travail avant les autres",
    culturalExplanation: "S'excuse poliment de partir avant ses collègues. Respect de la hiérarchie.",
    historicalOrigin: "Culture du travail japonaise et respect des anciens.",
    usage: "En quittant le bureau avant les autres.",
    audioFile: "phrase_023_osakini.mp3",
    icon: "🚶"
  },
  {
    id: 24,
    hiragana: "おせわになりました",
    romaji: "Osewa ni narimashita",
    french: "Merci pour votre aide/bienveillance",
    literal: "J'ai reçu vos soins",
    category: "Gratitude",
    context: "Remercier pour une aide prolongée",
    culturalExplanation: "Remerciement profond pour l'aide et le soutien reçus sur une période.",
    historicalOrigin: "Culture de la dette sociale (on) et de la gratitude.",
    usage: "En quittant un emploi, en fin de stage, après un long séjour.",
    audioFile: "phrase_024_osewa.mp3",
    icon: "🙏"
  },
  {
    id: 25,
    hiragana: "がんばります",
    romaji: "Ganbarimasu",
    french: "Je vais faire de mon mieux",
    literal: "Je vais persévérer",
    category: "Engagement",
    context: "Promettre de faire des efforts",
    culturalExplanation: "Engagement personnel à donner le meilleur de soi-même.",
    historicalOrigin: "Valeur centrale de l'effort dans la culture japonaise.",
    usage: "Réponse à un encouragement ou au début d'un défi.",
    audioFile: "phrase_025_ganbarimasu.mp3",
    icon: "✊"
  },
  {
    id: 26,
    hiragana: "しつれいします",
    romaji: "Shitsurei shimasu",
    french: "Excusez-moi (en partant)",
    literal: "Je vais être impoli",
    category: "Politesse",
    context: "Entrer/quitter une pièce",
    culturalExplanation: "S'excuse poliment de déranger ou de partir. Marque le respect des limites.",
    historicalOrigin: "Reconnaissance que toute intrusion est une forme d'impolitesse.",
    usage: "En entrant dans un bureau, en raccrochant le téléphone, en quittant une réunion.",
    audioFile: "phrase_026_shitsurei.mp3",
    icon: "🚪"
  },
  {
    id: 27,
    hiragana: "おじゃまします",
    romaji: "Ojama shimasu",
    french: "Excusez-moi de vous déranger (en entrant)",
    literal: "Je vais gêner",
    category: "Politesse",
    context: "Entrer chez quelqu'un",
    culturalExplanation: "S'excuse humblement d'entrer dans l'espace personnel d'autrui.",
    historicalOrigin: "Respect de l'espace privé (uchi/soto - intérieur/extérieur).",
    usage: "En entrant dans la maison de quelqu'un.",
    audioFile: "phrase_027_ojama.mp3",
    icon: "🏡"
  },
  {
    id: 28,
    hiragana: "おじゃましました",
    romaji: "Ojama shimashita",
    french: "Merci de m'avoir reçu (en partant)",
    literal: "J'ai dérangé",
    category: "Politesse",
    context: "Quitter la maison de quelqu'un",
    culturalExplanation: "Remercie l'hôte et s'excuse d'avoir pris de son temps.",
    historicalOrigin: "Même origine qu'Ojama shimasu, marque la fin de la visite.",
    usage: "En quittant la maison de quelqu'un.",
    audioFile: "phrase_028_ojamashita.mp3",
    icon: "👋"
  },
  {
    id: 29,
    hiragana: "おげんきですか",
    romaji: "Ogenki desu ka",
    french: "Comment allez-vous ?",
    literal: "Êtes-vous en bonne santé ?",
    category: "Salutation",
    context: "Prendre des nouvelles",
    culturalExplanation: "Question polie sur la santé et le bien-être de quelqu'un.",
    historicalOrigin: "La santé est hautement valorisée dans la culture japonaise.",
    usage: "Après une salutation initiale, surtout si on n'a pas vu la personne depuis longtemps.",
    audioFile: "phrase_029_ogenki.mp3",
    icon: "😊"
  },
  {
    id: 30,
    hiragana: "きをつけて",
    romaji: "Ki wo tsukete",
    french: "Fais attention / Prends soin de toi",
    literal: "Attache ton esprit",
    category: "Soin",
    context: "Souhaiter prudence",
    culturalExplanation: "Exprime le souci du bien-être d'autrui. Peut signifier 'fais attention' ou 'bon voyage'.",
    historicalOrigin: "Concept de 'ki' (énergie vitale) présent dans toute la culture japonaise.",
    usage: "Quand quelqu'un part en voyage ou entreprend quelque chose de risqué.",
    audioFile: "phrase_030_kiotsukete.mp3",
    icon: "🛡️"
  }
];

// Obtenir la phrase du jour basée sur la date
function getTodayPhrase() {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  const phraseIndex = (dayOfYear - 1) % culturalPhrases.length;
  return culturalPhrases[phraseIndex];
}

// Obtenir une phrase par ID
function getPhraseById(id) {
  return culturalPhrases.find(phrase => phrase.id === id);
}

// Obtenir les phrases par catégorie
function getPhrasesByCategory(category) {
  return culturalPhrases.filter(phrase => phrase.category === category);
}

// Vérifier si une phrase a été vue
function isPhraseViewed(phraseId) {
  const viewedPhrases = JSON.parse(localStorage.getItem('viewedPhrases') || '[]');
  return viewedPhrases.includes(phraseId);
}

// Marquer une phrase comme vue
function markPhraseAsViewed(phraseId) {
  let viewedPhrases = JSON.parse(localStorage.getItem('viewedPhrases') || '[]');
  if (!viewedPhrases.includes(phraseId)) {
    viewedPhrases.push(phraseId);
    localStorage.setItem('viewedPhrases', JSON.stringify(viewedPhrases));

    // Vérifier si on débloqu un badge (100 phrases)
    if (viewedPhrases.length === 30) {
      // Badge Bronze : 30 phrases
      return { badge: 'cultural_bronze', count: viewedPhrases.length };
    } else if (viewedPhrases.length === 100) {
      // Badge Or : 100 phrases
      return { badge: 'cultural_gold', count: viewedPhrases.length };
    }
  }
  return { count: viewedPhrases.length };
}

// Obtenir le nombre de phrases vues
function getViewedPhrasesCount() {
  const viewedPhrases = JSON.parse(localStorage.getItem('viewedPhrases') || '[]');
  return viewedPhrases.length;
}

// Obtenir les catégories uniques
function getCategories() {
  const categories = [...new Set(culturalPhrases.map(p => p.category))];
  return categories;
}
