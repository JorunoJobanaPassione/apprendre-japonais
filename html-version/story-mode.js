/**
 * 📖 MODE HISTOIRE/AVENTURE
 * Tu es un voyageur arrivé à Tokyo sans parler japonais
 * Chaque leçon = une étape de ton voyage à travers le Japon
 */

const storyData = {
  // Informations générales de l'histoire
  title: "Voyage au Japon",
  subtitle: "L'aventure d'un voyageur sans mots",
  intro: {
    text: "Vous venez d'arriver à Tokyo. Vous ne parlez pas un mot de japonais. Votre aventure commence maintenant...",
    character: "narrator",
    illustration: "🇯🇵"
  },

  // Personnages principaux
  characters: {
    narrator: {
      name: "Narrateur",
      icon: "📖",
      description: "Votre guide dans cette aventure"
    },
    yuki: {
      name: "Yuki",
      icon: "👧",
      role: "Serveuse",
      age: 24,
      personality: "Douce et patiente",
      description: "Une jeune serveuse qui vous aide à commander votre premier repas"
    },
    takeshi: {
      name: "Takeshi",
      icon: "🧘",
      role: "Moine bouddhiste",
      age: 45,
      personality: "Sage et bienveillant",
      description: "Un moine qui vous enseigne la philosophie japonaise"
    },
    hana: {
      name: "Hana",
      icon: "🌸",
      role: "Guide touristique",
      age: 28,
      personality: "Énergique et passionnée",
      description: "Votre guide qui vous fait découvrir les merveilles du Japon"
    },
    kenji: {
      name: "Kenji",
      icon: "👨",
      role: "Chauffeur de taxi",
      age: 52,
      personality: "Bavard et amical",
      description: "Un chauffeur de taxi qui partage ses histoires"
    },
    mai: {
      name: "Mai",
      icon: "👩‍🍳",
      role: "Chef sushi",
      age: 35,
      personality: "Perfectionniste et fière",
      description: "Une chef sushi renommée"
    }
  },

  // 11 étapes narratives (1 par leçon)
  chapters: [
    {
      id: "chapter1",
      lessonId: "lesson1",
      location: "🛬 Aéroport Narita",
      locationName: "Narita International Airport",
      coordinates: { x: 85, y: 35 }, // Position sur la carte (%)
      title: "Arrivée à Tokyo",
      unlocked: false, // Sera débloqué au premier lancement
      story: {
        intro: "Vous venez d'atterrir à l'aéroport de Narita. Les panneaux sont remplis de caractères étranges. Comment allez-vous vous débrouiller ?",
        challenge: "Apprendre les bases de l'hiragana pour lire les panneaux",
        characters: ["narrator"],
        dialogues: [
          {
            character: "narrator",
            text: "Bienvenue au Japon ! Votre première mission : déchiffrer les panneaux de l'aéroport."
          }
        ],
        completion: "Félicitations ! Vous pouvez maintenant lire les panneaux basiques. Direction Tokyo !",
        reward: "🎒 Sac de voyage débloqué",
        nextHint: "Votre taxi vous attend pour rejoindre Shibuya..."
      }
    },
    {
      id: "chapter2",
      lessonId: "lesson2",
      location: "🚕 Shibuya Crossing",
      locationName: "Shibuya",
      coordinates: { x: 80, y: 38 },
      title: "Le Taxi de Kenji",
      unlocked: false,
      story: {
        intro: "Dans le taxi, Kenji le chauffeur essaie de vous parler. Il vous montre des caractères sur son GPS.",
        challenge: "Apprendre la série S pour comprendre les directions",
        characters: ["kenji"],
        dialogues: [
          {
            character: "kenji",
            text: "Shibuya, ne ? (Shibuya, c'est bien ça ?) さ、し、す、せ、そ !"
          }
        ],
        completion: "Kenji est impressionné ! Il vous offre une carte de Tokyo.",
        reward: "🗺️ Carte de Tokyo débloquée",
        nextHint: "Vous arrivez à Shibuya. Il est temps de manger !"
      }
    },
    {
      id: "chapter3",
      lessonId: "lesson3",
      location: "🍜 Ramen Ya",
      locationName: "Restaurant de ramen",
      coordinates: { x: 78, y: 40 },
      title: "Premier Repas avec Yuki",
      unlocked: false,
      story: {
        intro: "Vous entrez dans un petit restaurant de ramen. Yuki, la serveuse, vous sourit et vous tend un menu.",
        challenge: "Apprendre la série T pour commander votre repas",
        characters: ["yuki"],
        dialogues: [
          {
            character: "yuki",
            text: "Irasshaimase ! (Bienvenue !) Que voulez-vous manger ? た、ち、つ、て、と"
          },
          {
            character: "yuki",
            text: "Ramen ? Tsukemen ? (Ramen ? Tsukemen ?)"
          }
        ],
        completion: "Délicieux ! Yuki vous donne son numéro pour vous aider pendant votre séjour.",
        reward: "🍜 Badge 'Premier Ramen' débloqué",
        nextHint: "Yuki vous recommande de visiter le temple Senso-ji..."
      }
    },
    {
      id: "chapter4",
      lessonId: "lesson4",
      location: "⛩️ Temple Senso-ji",
      locationName: "Asakusa - Temple Senso-ji",
      coordinates: { x: 82, y: 36 },
      title: "Méditation avec Takeshi",
      unlocked: false,
      story: {
        intro: "Au temple Senso-ji, vous rencontrez Takeshi, un moine bouddhiste. Il vous invite à méditer avec lui.",
        challenge: "Apprendre la série N pour comprendre les enseignements",
        characters: ["takeshi"],
        dialogues: [
          {
            character: "takeshi",
            text: "La paix vient du silence. な、に、ぬ、ね、の"
          },
          {
            character: "takeshi",
            text: "Nani ? (Quoi ?) signifie 'quoi'. C'est important !"
          }
        ],
        completion: "Takeshi vous offre un omamori (amulette) de protection.",
        reward: "🎴 Omamori débloqué",
        nextHint: "Hana, une guide, vous propose de visiter Harajuku..."
      }
    },
    {
      id: "chapter5",
      lessonId: "lesson5",
      location: "🎌 Harajuku",
      locationName: "Quartier de Harajuku",
      coordinates: { x: 79, y: 39 },
      title: "Shopping avec Hana",
      unlocked: false,
      story: {
        intro: "Hana, une guide énergique, vous emmène dans les boutiques colorées de Harajuku.",
        challenge: "Apprendre la série H pour faire du shopping",
        characters: ["hana"],
        dialogues: [
          {
            character: "hana",
            text: "Kawaii ! (Mignon !) Regarde ces vêtements ! は、ひ、ふ、へ、ほ"
          },
          {
            character: "hana",
            text: "Hana です ! (Je suis Hana !) Et toi ?"
          }
        ],
        completion: "Hana vous offre un bandana Harajuku en cadeau.",
        reward: "👘 Bandana Harajuku débloqué",
        nextHint: "Direction le marché aux poissons de Tsukiji..."
      }
    },
    {
      id: "chapter6",
      lessonId: "lesson6",
      location: "🐟 Marché Tsukiji",
      locationName: "Marché aux poissons Tsukiji",
      coordinates: { x: 81, y: 37 },
      title: "Cours de Sushi avec Mai",
      unlocked: false,
      story: {
        intro: "Au marché Tsukiji, vous rencontrez Mai, une chef sushi renommée. Elle vous propose un cours.",
        challenge: "Apprendre la série M pour nommer les ingrédients",
        characters: ["mai"],
        dialogues: [
          {
            character: "mai",
            text: "Maki, Miso, Mirin... Tout commence par 'M' ! ま、み、む、め、も"
          },
          {
            character: "mai",
            text: "Maguro (Thon), c'est まぐろ !"
          }
        ],
        completion: "Mai vous décerne un certificat de 'Sushi Apprentice'.",
        reward: "🍣 Certificat Sushi débloqué",
        nextHint: "Prenez le train pour Kyoto..."
      }
    },
    {
      id: "chapter7",
      lessonId: "lesson7",
      location: "🚄 Shinkansen",
      locationName: "Train à grande vitesse",
      coordinates: { x: 65, y: 50 },
      title: "Voyage en Shinkansen",
      unlocked: false,
      story: {
        intro: "Vous montez dans le Shinkansen (train bullet) direction Kyoto. Un voyageur vous aide à lire les annonces.",
        challenge: "Apprendre la série Y + R pour comprendre les annonces",
        characters: ["narrator"],
        dialogues: [
          {
            character: "narrator",
            text: "Yokohama, Yoko, Yama... や、ゆ、よ · ら、り、る、れ、ろ"
          }
        ],
        completion: "Vous arrivez à Kyoto sans vous perdre !",
        reward: "🚄 Badge 'Voyageur Expert' débloqué",
        nextHint: "Explorez le quartier des geishas à Gion..."
      }
    },
    {
      id: "chapter8",
      lessonId: "lesson8",
      location: "🎎 Gion",
      locationName: "Quartier Gion - Kyoto",
      coordinates: { x: 60, y: 52 },
      title: "Soirée à Gion",
      unlocked: false,
      story: {
        intro: "Dans le quartier traditionnel de Gion, vous assistez à une représentation de geisha. Les lanternes portent des caractères magnifiques.",
        challenge: "Apprendre la série W + autres consonnes",
        characters: ["narrator"],
        dialogues: [
          {
            character: "narrator",
            text: "Wa (和) signifie 'harmonie', valeur japonaise fondamentale. わ、を、ん"
          }
        ],
        completion: "Une geisha vous offre un éventail traditionnel.",
        reward: "🌸 Éventail traditionnel débloqué",
        nextHint: "Direction les Alpes japonaises..."
      }
    },
    {
      id: "chapter9",
      lessonId: "lesson9",
      location: "⛰️ Alpes japonaises",
      locationName: "Mont Fuji",
      coordinates: { x: 75, y: 42 },
      title: "Ascension du Mont Fuji",
      unlocked: false,
      story: {
        intro: "Vous décidez de gravir le Mont Fuji au lever du soleil. Les panneaux utilisent des sons complexes.",
        challenge: "Maîtriser les sons avec ゛ et ゜",
        characters: ["takeshi"],
        dialogues: [
          {
            character: "takeshi",
            text: "Ganbatte ! (Bon courage !) が、ぎ、ぐ、げ、ご · ざ、じ、ず、ぜ、ぞ"
          }
        ],
        completion: "Au sommet, vous admirez le lever du soleil sur le Japon.",
        reward: "🗻 Badge 'Conquérant du Fuji' débloqué",
        nextHint: "Détente dans un onsen traditionnel..."
      }
    },
    {
      id: "chapter10",
      lessonId: "lesson10",
      location: "♨️ Hakone Onsen",
      locationName: "Sources chaudes Hakone",
      coordinates: { x: 76, y: 41 },
      title: "Relaxation à l'Onsen",
      unlocked: false,
      story: {
        intro: "Après l'ascension, direction un onsen (source chaude) traditionnel à Hakone pour se détendre.",
        challenge: "Maîtriser les derniers sons complexes",
        characters: ["yuki", "hana"],
        dialogues: [
          {
            character: "yuki",
            text: "Ça fait du bien, ne ? だ、ぢ、づ、で、ど · ば、び、ぶ、べ、ぼ"
          },
          {
            character: "hana",
            text: "Papa (Papa), Panda, Piano... ぱ、ぴ、ぷ、ぺ、ぽ"
          }
        ],
        completion: "Vous êtes maintenant un vrai connaisseur du Japon !",
        reward: "♨️ Badge 'Maître de l'Onsen' débloqué",
        nextHint: "Dernière étape : les chiffres pour faire vos achats..."
      }
    },
    {
      id: "chapter11",
      lessonId: "lesson11",
      location: "🛍️ Don Quijote",
      locationName: "Don Quijote - Tokyo",
      coordinates: { x: 80, y: 38 },
      title: "Derniers Achats",
      unlocked: false,
      story: {
        intro: "De retour à Tokyo, vous faites vos derniers achats chez Don Quijote, le temple du shopping japonais.",
        challenge: "Apprendre les chiffres pour négocier et payer",
        characters: ["kenji"],
        dialogues: [
          {
            character: "kenji",
            text: "Ikura ? (Combien ?) Tu dois connaître les chiffres ! 1-100"
          },
          {
            character: "kenji",
            text: "San-byaku en (300 yens), c'est pas cher !"
          }
        ],
        completion: "Vous avez terminé votre voyage ! Vous êtes maintenant capable de survivre au Japon.",
        reward: "🏆 CERTIFICAT 'MAÎTRE DU JAPONAIS' débloqué",
        nextHint: "Félicitations ! Débloquez maintenant le mode Katakana..."
      }
    }
  ],

  // Carte du Japon (zones débloquables)
  map: {
    regions: [
      { name: "Kanto", cities: ["Tokyo", "Yokohama"], unlocked: true },
      { name: "Kansai", cities: ["Kyoto", "Osaka"], unlocked: false },
      { name: "Chubu", cities: ["Mont Fuji", "Hakone"], unlocked: false }
    ]
  },

  // Récompenses finales
  finalReward: {
    title: "🎓 Certificat de Maître du Japonais",
    description: "Vous avez complété votre voyage à travers le Japon et maîtrisé l'hiragana !",
    unlocks: [
      "Mode Katakana débloqué",
      "Mode Immersion Totale débloqué",
      "Badge spécial 'Voyageur Accompli'",
      "Avatar exclusif : 侍 (Samouraï)"
    ]
  }
};

// Fonction pour récupérer le chapitre d'une leçon
function getChapterByLessonId(lessonId) {
  return storyData.chapters.find(chapter => chapter.lessonId === lessonId);
}

// Fonction pour débloquer le chapitre suivant
function unlockNextChapter(currentLessonId) {
  const currentIndex = storyData.chapters.findIndex(ch => ch.lessonId === currentLessonId);
  if (currentIndex >= 0 && currentIndex < storyData.chapters.length - 1) {
    storyData.chapters[currentIndex + 1].unlocked = true;
    // Sauvegarder dans localStorage
    saveStoryProgress();
    return storyData.chapters[currentIndex + 1];
  }
  return null;
}

// Sauvegarder la progression
function saveStoryProgress() {
  const progress = storyData.chapters.map(ch => ({
    id: ch.id,
    unlocked: ch.unlocked
  }));
  localStorage.setItem('storyProgress', JSON.stringify(progress));
}

// Charger la progression
function loadStoryProgress() {
  const saved = localStorage.getItem('storyProgress');
  if (saved) {
    const progress = JSON.parse(saved);
    progress.forEach(saved => {
      const chapter = storyData.chapters.find(ch => ch.id === saved.id);
      if (chapter) {
        chapter.unlocked = saved.unlocked;
      }
    });
  } else {
    // Premier lancement : débloquer le chapitre 1
    storyData.chapters[0].unlocked = true;
    saveStoryProgress();
  }
}

// Obtenir le pourcentage de progression de l'histoire
function getStoryCompletionPercentage() {
  const completed = storyData.chapters.filter(ch => ch.unlocked).length;
  return Math.round((completed / storyData.chapters.length) * 100);
}

// Initialiser au chargement
loadStoryProgress();
