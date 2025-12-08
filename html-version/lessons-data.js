/**
 * 📘 Données des leçons - App Japonais HTML
 * 10 leçons complètes d'hiragana avec exercices variés
 */

const lessonsData = [
  {
    id: "lesson1",
    title: "Leçon 1 : Voyelles + K",
    description: "a, i, u, e, o, ka, ki, ku, ke, ko",
    level: "beginner",
    free: true,
    hiragana: [
      { char: 'あ', romaji: 'a' },
      { char: 'い', romaji: 'i' },
      { char: 'う', romaji: 'u' },
      { char: 'え', romaji: 'e' },
      { char: 'お', romaji: 'o' },
      { char: 'か', romaji: 'ka' },
      { char: 'き', romaji: 'ki' },
      { char: 'く', romaji: 'ku' },
      { char: 'け', romaji: 'ke' },
      { char: 'こ', romaji: 'ko' }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des hiragana",
        instruction: "Étudiez ces caractères et leur prononciation"
      },
      {
        type: "dialogue",
        title: "Mini-Dialogue : Première Rencontre",
        instruction: "Lisez ce dialogue authentique (cliquez 🔊 pour écouter)",
        context: "🏫 Deux personnes se rencontrent pour la première fois",
        dialogue: {
          lines: [
            { speaker: "A", hiragana: "おはよう", romaji: "ohayou", french: "Bonjour !" },
            { speaker: "B", hiragana: "おはよう", romaji: "ohayou", french: "Bonjour !" },
            { speaker: "A", hiragana: "あき です", romaji: "aki desu", french: "Je suis Aki" },
            { speaker: "B", hiragana: "かおる です", romaji: "kaoru desu", french: "Je suis Kaoru" }
          ],
          audioFile: "dialogue_lesson1.mp3"
        }
      },
      {
        type: "mcq",
        title: "Exercice de reconnaissance",
        instruction: "Quelle est la lecture de ce hiragana ?",
        questions: [
          { hiragana: 'あ', options: ['a', 'i', 'u', 'e'], correct: 'a' },
          { hiragana: 'い', options: ['i', 'a', 'e', 'o'], correct: 'i' },
          { hiragana: 'う', options: ['u', 'o', 'a', 'i'], correct: 'u' },
          { hiragana: 'え', options: ['e', 'i', 'a', 'o'], correct: 'e' },
          { hiragana: 'お', options: ['o', 'u', 'a', 'e'], correct: 'o' },
          { hiragana: 'か', options: ['ka', 'ki', 'ku', 'ke'], correct: 'ka' },
          { hiragana: 'き', options: ['ki', 'ka', 'ku', 'ke'], correct: 'ki' },
          { hiragana: 'く', options: ['ku', 'ka', 'ki', 'ko'], correct: 'ku' },
          { hiragana: 'け', options: ['ke', 'ka', 'ki', 'ko'], correct: 'ke' },
          { hiragana: 'こ', options: ['ko', 'ku', 'ka', 'ke'], correct: 'ko' }
        ]
      },
      {
        type: "intruder",
        title: "Trouvez l'intrus",
        instruction: "Quel hiragana n'appartient pas au groupe ?",
        questions: [
          {
            options: ['あ', 'い', 'か', 'お'],
            intruder: 'か',
            explanation: "'か' (ka) est une consonne, les autres sont des voyelles"
          },
          {
            options: ['か', 'き', 'す', 'こ'],
            intruder: 'す',
            explanation: "'す' (su) n'appartient pas à la série K"
          }
        ]
      },
      {
        type: "transcription",
        title: "Transcription",
        instruction: "Écrivez la transcription en romaji",
        questions: [
          { hiragana: 'あい', correct: 'ai', alternatives: [], meaning: 'amour' },
          { hiragana: 'いえ', correct: 'ie', alternatives: [], meaning: 'maison' },
          { hiragana: 'うえ', correct: 'ue', alternatives: [], meaning: 'dessus' },
          { hiragana: 'えき', correct: 'eki', alternatives: [], meaning: 'gare' },
          { hiragana: 'おか', correct: 'oka', alternatives: [], meaning: 'colline' },
          { hiragana: 'かお', correct: 'kao', alternatives: [], meaning: 'visage' }
        ]
      },
      {
        type: "sentence",
        title: "Lecture en contexte",
        instruction: "Lisez ces mots réels",
        questions: [
          { hiragana: 'あき', romaji: 'aki', meaning: 'automne' },
          { hiragana: 'いけ', romaji: 'ike', meaning: 'étang' },
          { hiragana: 'うお', romaji: 'uo', meaning: 'poisson' },
          { hiragana: 'あか', romaji: 'aka', meaning: 'rouge' }
        ]
      },
      {
        type: "dictation",
        title: "Dictée interactive",
        instruction: "Écoutez l'hiragana et écrivez-le",
        questions: [
          { audio: 'a', correct: 'あ', alternatives: ['a'], meaning: '' },
          { audio: 'i', correct: 'い', alternatives: ['i'], meaning: '' },
          { audio: 'u', correct: 'う', alternatives: ['u'], meaning: '' },
          { audio: 'ka', correct: 'か', alternatives: ['ka'], meaning: '' },
          { audio: 'ki', correct: 'き', alternatives: ['ki'], meaning: '' },
          { audio: 'ko', correct: 'こ', alternatives: ['ko'], meaning: '' }
        ]
      }
    ]
  },
  {
    id: "lesson2",
    title: "Leçon 2 : S + T",
    description: "sa, shi, su, se, so, ta, chi, tsu, te, to",
    level: "beginner",
    free: true,
    hiragana: [
      { char: 'さ', romaji: 'sa' },
      { char: 'し', romaji: 'shi' },
      { char: 'す', romaji: 'su' },
      { char: 'せ', romaji: 'se' },
      { char: 'そ', romaji: 'so' },
      { char: 'た', romaji: 'ta' },
      { char: 'ち', romaji: 'chi' },
      { char: 'つ', romaji: 'tsu' },
      { char: 'て', romaji: 'te' },
      { char: 'と', romaji: 'to' }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des hiragana",
        instruction: "Étudiez ces caractères et leur prononciation"
      },
      {
        type: "dialogue",
        title: "Mini-Dialogue : Au Restaurant",
        instruction: "Lisez ce dialogue authentique (cliquez 🔊 pour écouter)",
        context: "🍣 Commander dans un restaurant japonais",
        dialogue: {
          lines: [
            { speaker: "Client", hiragana: "すし ください", romaji: "sushi kudasai", french: "Des sushis s'il vous plaît" },
            { speaker: "Serveur", hiragana: "はい、すし です", romaji: "hai, sushi desu", french: "Oui, voici les sushis" },
            { speaker: "Client", hiragana: "お茶 も ください", romaji: "ocha mo kudasai", french: "Du thé aussi s'il vous plaît" },
            { speaker: "Serveur", hiragana: "はい、どうぞ", romaji: "hai, douzo", french: "Oui, voilà" }
          ],
          audioFile: "dialogue_lesson2.mp3"
        }
      },
      {
        type: "mcq",
        title: "Exercice de reconnaissance",
        instruction: "Quelle est la lecture de ce hiragana ?",
        questions: [
          { hiragana: 'さ', options: ['sa', 'shi', 'su', 'se'], correct: 'sa' },
          { hiragana: 'し', options: ['shi', 'sa', 'su', 'se'], correct: 'shi' },
          { hiragana: 'す', options: ['su', 'sa', 'shi', 'so'], correct: 'su' },
          { hiragana: 'た', options: ['ta', 'chi', 'tsu', 'te'], correct: 'ta' },
          { hiragana: 'ち', options: ['chi', 'ta', 'tsu', 'te'], correct: 'chi' },
          { hiragana: 'つ', options: ['tsu', 'ta', 'chi', 'to'], correct: 'tsu' }
        ]
      },
      {
        type: "intruder",
        title: "Trouvez l'intrus",
        instruction: "Quel hiragana n'appartient pas au groupe ?",
        questions: [
          {
            options: ['さ', 'し', 'た', 'そ'],
            intruder: 'た',
            explanation: "'た' (ta) appartient à la série T, pas S"
          }
        ]
      },
      {
        type: "transcription",
        title: "Transcription",
        instruction: "Écrivez la transcription en romaji",
        questions: [
          { hiragana: 'さけ', correct: 'sake', alternatives: [], meaning: 'saké/alcool' },
          { hiragana: 'した', correct: 'shita', alternatives: [], meaning: 'sous/langue' },
          { hiragana: 'すし', correct: 'sushi', alternatives: [], meaning: 'sushi' },
          { hiragana: 'たこ', correct: 'tako', alternatives: [], meaning: 'poulpe' }
        ]
      },
      {
        type: "sentence",
        title: "Lecture en contexte",
        instruction: "Lisez ces mots réels",
        questions: [
          { hiragana: 'あさ', romaji: 'asa', meaning: 'matin' },
          { hiragana: 'いす', romaji: 'isu', meaning: 'chaise' },
          { hiragana: 'て', romaji: 'te', meaning: 'main' }
        ]
      },
      {
        type: "dictation",
        title: "Dictée interactive",
        instruction: "Écoutez l'hiragana et écrivez-le",
        questions: [
          { audio: 'sa', correct: 'さ', alternatives: ['sa'], meaning: '' },
          { audio: 'shi', correct: 'し', alternatives: ['shi'], meaning: '' },
          { audio: 'su', correct: 'す', alternatives: ['su'], meaning: '' },
          { audio: 'ta', correct: 'た', alternatives: ['ta'], meaning: '' },
          { audio: 'chi', correct: 'ち', alternatives: ['chi'], meaning: '' },
          { audio: 'tsu', correct: 'つ', alternatives: ['tsu'], meaning: '' }
        ]
      }
    ]
  },
  {
    id: "lesson3",
    title: "Leçon 3 : N + H",
    description: "na, ni, nu, ne, no, ha, hi, fu, he, ho",
    level: "beginner",
    free: true,
    hiragana: [
      { char: 'な', romaji: 'na' },
      { char: 'に', romaji: 'ni' },
      { char: 'ぬ', romaji: 'nu' },
      { char: 'ね', romaji: 'ne' },
      { char: 'の', romaji: 'no' },
      { char: 'は', romaji: 'ha' },
      { char: 'ひ', romaji: 'hi' },
      { char: 'ふ', romaji: 'fu' },
      { char: 'へ', romaji: 'he' },
      { char: 'ほ', romaji: 'ho' }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des hiragana",
        instruction: "Étudiez ces caractères et leur prononciation"
      },
      {
        type: "dialogue",
        title: "Mini-Dialogue : Les Animaux",
        instruction: "Lisez ce dialogue authentique (cliquez 🔊 pour écouter)",
        context: "🐱 Parler de ses animaux domestiques",
        dialogue: {
          lines: [
            { speaker: "A", hiragana: "ねこ が います", romaji: "neko ga imasu", french: "J'ai un chat" },
            { speaker: "B", hiragana: "かわいい です ね", romaji: "kawaii desu ne", french: "Il est mignon !" },
            { speaker: "A", hiragana: "なまえ は はな です", romaji: "namae wa hana desu", french: "Son nom est Hana" },
            { speaker: "B", hiragana: "いい なまえ です ね", romaji: "ii namae desu ne", french: "C'est un joli nom !" }
          ],
          audioFile: "dialogue_lesson3.mp3"
        }
      },
      {
        type: "mcq",
        title: "Exercice de reconnaissance",
        instruction: "Quelle est la lecture de ce hiragana ?",
        questions: [
          { hiragana: 'な', options: ['na', 'ni', 'nu', 'ne'], correct: 'na' },
          { hiragana: 'に', options: ['ni', 'na', 'nu', 'no'], correct: 'ni' },
          { hiragana: 'は', options: ['ha', 'hi', 'fu', 'he'], correct: 'ha' },
          { hiragana: 'ひ', options: ['hi', 'ha', 'fu', 'ho'], correct: 'hi' },
          { hiragana: 'ふ', options: ['fu', 'ha', 'hi', 'ho'], correct: 'fu' }
        ]
      },
      {
        type: "intruder",
        title: "Trouvez l'intrus",
        instruction: "Quel hiragana n'appartient pas au groupe ?",
        questions: [
          {
            options: ['な', 'に', 'は', 'ね'],
            intruder: 'は',
            explanation: "'は' (ha) appartient à la série H, pas N"
          }
        ]
      },
      {
        type: "transcription",
        title: "Transcription",
        instruction: "Écrivez la transcription en romaji",
        questions: [
          { hiragana: 'なに', correct: 'nani', alternatives: [], meaning: 'quoi' },
          { hiragana: 'ねこ', correct: 'neko', alternatives: [], meaning: 'chat' },
          { hiragana: 'はな', correct: 'hana', alternatives: [], meaning: 'fleur/nez' },
          { hiragana: 'ひと', correct: 'hito', alternatives: [], meaning: 'personne' }
        ]
      },
      {
        type: "sentence",
        title: "Lecture en contexte",
        instruction: "Lisez ces mots réels",
        questions: [
          { hiragana: 'いぬ', romaji: 'inu', meaning: 'chien' },
          { hiragana: 'ほん', romaji: 'hon', meaning: 'livre' },
          { hiragana: 'なつ', romaji: 'natsu', meaning: 'été' }
        ]
      },
      {
        type: "dictation",
        title: "Dictée interactive",
        instruction: "Écoutez l'hiragana et écrivez-le",
        questions: [
          { audio: 'na', correct: 'な', alternatives: ['na'], meaning: '' },
          { audio: 'ni', correct: 'に', alternatives: ['ni'], meaning: '' },
          { audio: 'nu', correct: 'ぬ', alternatives: ['nu'], meaning: '' },
          { audio: 'ha', correct: 'は', alternatives: ['ha'], meaning: '' },
          { audio: 'hi', correct: 'ひ', alternatives: ['hi'], meaning: '' },
          { audio: 'fu', correct: 'ふ', alternatives: ['fu', 'hu'], meaning: '' }
        ]
      }
    ]
  },
  {
    id: "lesson4",
    title: "Leçon 4 : M + Y + R",
    description: "ma, mi, mu, me, mo, ya, yu, yo, ra, ri, ru, re, ro",
    level: "intermediate",
    free: true,
    hiragana: [
      { char: 'ま', romaji: 'ma' },
      { char: 'み', romaji: 'mi' },
      { char: 'む', romaji: 'mu' },
      { char: 'め', romaji: 'me' },
      { char: 'も', romaji: 'mo' },
      { char: 'や', romaji: 'ya' },
      { char: 'ゆ', romaji: 'yu' },
      { char: 'よ', romaji: 'yo' },
      { char: 'ら', romaji: 'ra' },
      { char: 'り', romaji: 'ri' },
      { char: 'る', romaji: 'ru' },
      { char: 'れ', romaji: 're' },
      { char: 'ろ', romaji: 'ro' }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des hiragana",
        instruction: "Étudiez ces caractères et leur prononciation"
      },
      {
        type: "dialogue",
        title: "Mini-Dialogue : À la Gare",
        instruction: "Lisez ce dialogue authentique (cliquez 🔊 pour écouter)",
        context: "🚆 Prendre le train",
        dialogue: {
          lines: [
            { speaker: "A", hiragana: "とうきょう まで ください", romaji: "toukyou made kudasai", french: "Pour Tokyo s'il vous plaît" },
            { speaker: "B", hiragana: "はい、ろくせん えん です", romaji: "hai, rokusen en desu", french: "Oui, 6000 yens" },
            { speaker: "A", hiragana: "なんじ の でんしゃ です か", romaji: "nanji no densha desu ka", french: "À quelle heure est le train ?" },
            { speaker: "B", hiragana: "よじ です", romaji: "yoji desu", french: "À 4 heures" }
          ],
          audioFile: "dialogue_lesson4.mp3"
        }
      },
      {
        type: "mcq",
        title: "Exercice de reconnaissance",
        instruction: "Quelle est la lecture de ce hiragana ?",
        questions: [
          { hiragana: 'ま', options: ['ma', 'mi', 'mu', 'me'], correct: 'ma' },
          { hiragana: 'や', options: ['ya', 'yu', 'yo', 'ra'], correct: 'ya' },
          { hiragana: 'ら', options: ['ra', 'ri', 'ru', 're'], correct: 'ra' },
          { hiragana: 'り', options: ['ri', 'ra', 'ru', 'ro'], correct: 'ri' }
        ]
      },
      {
        type: "intruder",
        title: "Trouvez l'intrus",
        instruction: "Quel hiragana n'appartient pas au groupe ?",
        questions: [
          {
            options: ['ま', 'み', 'や', 'も'],
            intruder: 'や',
            explanation: "'や' (ya) appartient à la série Y, pas M"
          }
        ]
      },
      {
        type: "transcription",
        title: "Transcription",
        instruction: "Écrivez la transcription en romaji",
        questions: [
          { hiragana: 'まち', correct: 'machi', alternatives: [], meaning: 'ville' },
          { hiragana: 'やま', correct: 'yama', alternatives: [], meaning: 'montagne' },
          { hiragana: 'ゆき', correct: 'yuki', alternatives: [], meaning: 'neige' },
          { hiragana: 'りんご', correct: 'ringo', alternatives: [], meaning: 'pomme' }
        ]
      },
      {
        type: "sentence",
        title: "Lecture en contexte",
        instruction: "Lisez ces mots réels",
        questions: [
          { hiragana: 'むし', romaji: 'mushi', meaning: 'insecte' },
          { hiragana: 'よる', romaji: 'yoru', meaning: 'nuit' },
          { hiragana: 'さくら', romaji: 'sakura', meaning: 'cerisier' }
        ]
      },
      {
        type: "dictation",
        title: "Dictée interactive",
        instruction: "Écoutez l'hiragana et écrivez-le",
        questions: [
          { audio: 'ma', correct: 'ま', alternatives: ['ma'], meaning: '' },
          { audio: 'mi', correct: 'み', alternatives: ['mi'], meaning: '' },
          { audio: 'ya', correct: 'や', alternatives: ['ya'], meaning: '' },
          { audio: 'yu', correct: 'ゆ', alternatives: ['yu'], meaning: '' },
          { audio: 'ra', correct: 'ら', alternatives: ['ra'], meaning: '' },
          { audio: 'ri', correct: 'り', alternatives: ['ri'], meaning: '' }
        ]
      }
    ]
  },
  {
    id: "lesson5",
    title: "Leçon 5 : W + N",
    description: "wa, wo, n",
    level: "intermediate",
    free: true,
    hiragana: [
      { char: 'わ', romaji: 'wa' },
      { char: 'を', romaji: 'wo' },
      { char: 'ん', romaji: 'n' }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des hiragana",
        instruction: "Étudiez ces caractères spéciaux"
      },
      {
        type: "dialogue",
        title: "Mini-Dialogue : Shopping",
        instruction: "Lisez ce dialogue authentique (cliquez 🔊 pour écouter)",
        context: "🛍️ Acheter des fruits au marché",
        dialogue: {
          lines: [
            { speaker: "Client", hiragana: "りんご を ください", romaji: "ringo wo kudasai", french: "Des pommes s'il vous plaît" },
            { speaker: "Vendeur", hiragana: "はい、なんこ です か", romaji: "hai, nanko desu ka", french: "Oui, combien ?" },
            { speaker: "Client", hiragana: "さんこ を おねがいします", romaji: "sanko wo onegaishimasu", french: "Trois s'il vous plaît" },
            { speaker: "Vendeur", hiragana: "わかりました", romaji: "wakarimashita", french: "Compris !" }
          ],
          audioFile: "dialogue_lesson5.mp3"
        }
      },
      {
        type: "mcq",
        title: "Exercice de reconnaissance",
        instruction: "Quelle est la lecture de ce hiragana ?",
        questions: [
          { hiragana: 'わ', options: ['wa', 'wo', 'n', 'o'], correct: 'wa' },
          { hiragana: 'を', options: ['wo', 'wa', 'o', 'n'], correct: 'wo' },
          { hiragana: 'ん', options: ['n', 'wa', 'wo', 'shi'], correct: 'n' }
        ]
      },
      {
        type: "transcription",
        title: "Transcription",
        instruction: "Écrivez la transcription en romaji",
        questions: [
          { hiragana: 'わたし', correct: 'watashi', alternatives: [], meaning: 'je/moi' },
          { hiragana: 'にほん', correct: 'nihon', alternatives: ['nippon'], meaning: 'Japon' },
          { hiragana: 'せんせい', correct: 'sensei', alternatives: [], meaning: 'professeur' }
        ]
      },
      {
        type: "sentence",
        title: "Lecture en contexte",
        instruction: "Lisez ces mots réels",
        questions: [
          { hiragana: 'かわ', romaji: 'kawa', meaning: 'rivière' },
          { hiragana: 'みかん', romaji: 'mikan', meaning: 'mandarine' },
          { hiragana: 'でんわ', romaji: 'denwa', meaning: 'téléphone' }
        ]
      },
      {
        type: "dictation",
        title: "Dictée interactive",
        instruction: "Écoutez l'hiragana et écrivez-le",
        questions: [
          { audio: 'wa', correct: 'わ', alternatives: ['wa'], meaning: '' },
          { audio: 'wo', correct: 'を', alternatives: ['wo', 'o'], meaning: '' },
          { audio: 'n', correct: 'ん', alternatives: ['n'], meaning: '' }
        ]
      }
    ]
  },
  {
    id: "lesson6",
    title: "Leçon 6 : Dakuten G + Z",
    description: "ga, gi, gu, ge, go, za, ji, zu, ze, zo",
    level: "intermediate",
    free: false,
    hiragana: [
      { char: 'が', romaji: 'ga' },
      { char: 'ぎ', romaji: 'gi' },
      { char: 'ぐ', romaji: 'gu' },
      { char: 'げ', romaji: 'ge' },
      { char: 'ご', romaji: 'go' },
      { char: 'ざ', romaji: 'za' },
      { char: 'じ', romaji: 'ji' },
      { char: 'ず', romaji: 'zu' },
      { char: 'ぜ', romaji: 'ze' },
      { char: 'ぞ', romaji: 'zo' }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des hiragana",
        instruction: "Hiragana avec dakuten (゛)"
      },
      {
        type: "dialogue",
        title: "Mini-Dialogue : À l'École",
        instruction: "Lisez ce dialogue authentique (cliquez 🔊 pour écouter)",
        context: "📚 Discussion entre étudiants",
        dialogue: {
          lines: [
            { speaker: "A", hiragana: "がっこう は どう です か", romaji: "gakkou wa dou desu ka", french: "Comment est l'école ?" },
            { speaker: "B", hiragana: "たのしい です", romaji: "tanoshii desu", french: "C'est amusant" },
            { speaker: "A", hiragana: "えいご を べんきょう します か", romaji: "eigo wo benkyou shimasu ka", french: "Tu étudies l'anglais ?" },
            { speaker: "B", hiragana: "はい、まいにち べんきょう します", romaji: "hai, mainichi benkyou shimasu", french: "Oui, j'étudie tous les jours" }
          ],
          audioFile: "dialogue_lesson6.mp3"
        }
      },
      {
        type: "mcq",
        title: "Exercice de reconnaissance",
        instruction: "Quelle est la lecture de ce hiragana ?",
        questions: [
          { hiragana: 'が', options: ['ga', 'ka', 'gi', 'ki'], correct: 'ga' },
          { hiragana: 'ぎ', options: ['gi', 'ki', 'ga', 'gu'], correct: 'gi' },
          { hiragana: 'ざ', options: ['za', 'sa', 'ji', 'shi'], correct: 'za' },
          { hiragana: 'じ', options: ['ji', 'shi', 'za', 'zu'], correct: 'ji' }
        ]
      },
      {
        type: "transcription",
        title: "Transcription",
        instruction: "Écrivez la transcription en romaji",
        questions: [
          { hiragana: 'かぎ', correct: 'kagi', alternatives: [], meaning: 'clé' },
          { hiragana: 'たまご', correct: 'tamago', alternatives: [], meaning: 'œuf' },
          { hiragana: 'ざっし', correct: 'zasshi', alternatives: [], meaning: 'magazine' }
        ]
      },
      {
        type: "sentence",
        title: "Lecture en contexte",
        instruction: "Lisez ces mots réels",
        questions: [
          { hiragana: 'かぞく', romaji: 'kazoku', meaning: 'famille' },
          { hiragana: 'みず', romaji: 'mizu', meaning: 'eau' }
        ]
      }
    ]
  },
  {
    id: "lesson7",
    title: "Leçon 7 : Dakuten D + B",
    description: "da, ji, zu, de, do, ba, bi, bu, be, bo",
    level: "intermediate",
    free: false,
    hiragana: [
      { char: 'だ', romaji: 'da' },
      { char: 'ぢ', romaji: 'ji' },
      { char: 'づ', romaji: 'zu' },
      { char: 'で', romaji: 'de' },
      { char: 'ど', romaji: 'do' },
      { char: 'ば', romaji: 'ba' },
      { char: 'び', romaji: 'bi' },
      { char: 'ぶ', romaji: 'bu' },
      { char: 'べ', romaji: 'be' },
      { char: 'ぼ', romaji: 'bo' }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des hiragana",
        instruction: "Hiragana avec dakuten (゛)"
      },
      {
        type: "dialogue",
        title: "Mini-Dialogue : La Météo",
        instruction: "Lisez ce dialogue authentique (cliquez 🔊 pour écouter)",
        context: "☁️ Parler de la météo",
        dialogue: {
          lines: [
            { speaker: "A", hiragana: "きょう の てんき は どう です か", romaji: "kyou no tenki wa dou desu ka", french: "Quel temps fait-il aujourd'hui ?" },
            { speaker: "B", hiragana: "あめ が ふって います", romaji: "ame ga futte imasu", french: "Il pleut" },
            { speaker: "A", hiragana: "ざんねん です ね", romaji: "zannen desu ne", french: "C'est dommage" },
            { speaker: "B", hiragana: "でも、あした は はれ です", romaji: "demo, ashita wa hare desu", french: "Mais demain il fera beau" }
          ],
          audioFile: "dialogue_lesson7.mp3"
        }
      },
      {
        type: "mcq",
        title: "Exercice de reconnaissance",
        instruction: "Quelle est la lecture de ce hiragana ?",
        questions: [
          { hiragana: 'だ', options: ['da', 'ta', 'de', 'te'], correct: 'da' },
          { hiragana: 'ば', options: ['ba', 'ha', 'bi', 'hi'], correct: 'ba' },
          { hiragana: 'で', options: ['de', 'te', 'da', 'do'], correct: 'de' }
        ]
      },
      {
        type: "transcription",
        title: "Transcription",
        instruction: "Écrivez la transcription en romaji",
        questions: [
          { hiragana: 'だいがく', correct: 'daigaku', alternatives: [], meaning: 'université' },
          { hiragana: 'ばんごはん', correct: 'bangohan', alternatives: [], meaning: 'dîner' },
          { hiragana: 'てぶくろ', correct: 'tebukuro', alternatives: [], meaning: 'gants' }
        ]
      },
      {
        type: "sentence",
        title: "Lecture en contexte",
        instruction: "Lisez ces mots réels",
        questions: [
          { hiragana: 'どこ', romaji: 'doko', meaning: 'où' },
          { hiragana: 'たべる', romaji: 'taberu', meaning: 'manger' }
        ]
      }
    ]
  },
  {
    id: "lesson8",
    title: "Leçon 8 : Handakuten P",
    description: "pa, pi, pu, pe, po",
    level: "advanced",
    free: false,
    hiragana: [
      { char: 'ぱ', romaji: 'pa' },
      { char: 'ぴ', romaji: 'pi' },
      { char: 'ぷ', romaji: 'pu' },
      { char: 'ぺ', romaji: 'pe' },
      { char: 'ぽ', romaji: 'po' }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des hiragana",
        instruction: "Hiragana avec handakuten (゜)"
      },
      {
        type: "dialogue",
        title: "Mini-Dialogue : Au Parc",
        instruction: "Lisez ce dialogue authentique (cliquez 🔊 pour écouter)",
        context: "🌳 Se promener au parc",
        dialogue: {
          lines: [
            { speaker: "A", hiragana: "こうえん に いきませんか", romaji: "kouen ni ikimasen ka", french: "On va au parc ?" },
            { speaker: "B", hiragana: "いいです ね！ピクニック しましょう", romaji: "ii desu ne! pikunikku shimashou", french: "Bonne idée ! Faisons un pique-nique" },
            { speaker: "A", hiragana: "パン を かいましょう", romaji: "pan wo kaimashou", french: "Achetons du pain" },
            { speaker: "B", hiragana: "はい、たのしみ です", romaji: "hai, tanoshimi desu", french: "Oui, j'ai hâte" }
          ],
          audioFile: "dialogue_lesson8.mp3"
        }
      },
      {
        type: "mcq",
        title: "Exercice de reconnaissance",
        instruction: "Quelle est la lecture de ce hiragana ?",
        questions: [
          { hiragana: 'ぱ', options: ['pa', 'ha', 'ba', 'pi'], correct: 'pa' },
          { hiragana: 'ぴ', options: ['pi', 'hi', 'bi', 'pa'], correct: 'pi' },
          { hiragana: 'ぷ', options: ['pu', 'hu', 'bu', 'po'], correct: 'pu' }
        ]
      },
      {
        type: "transcription",
        title: "Transcription",
        instruction: "Écrivez la transcription en romaji",
        questions: [
          { hiragana: 'ぱん', correct: 'pan', alternatives: [], meaning: 'pain' },
          { hiragana: 'かっぱ', correct: 'kappa', alternatives: [], meaning: 'kappa (créature)' },
          { hiragana: 'さんぽ', correct: 'sanpo', alternatives: [], meaning: 'promenade' }
        ]
      },
      {
        type: "sentence",
        title: "Lecture en contexte",
        instruction: "Lisez ces mots réels",
        questions: [
          { hiragana: 'てんぷら', romaji: 'tenpura', meaning: 'tempura' },
          { hiragana: 'ぴあの', romaji: 'piano', meaning: 'piano' }
        ]
      }
    ]
  },
  {
    id: "lesson9",
    title: "Leçon 9 : Combinaisons",
    description: "kya, kyu, kyo, sha, shu, sho...",
    level: "advanced",
    free: false,
    hiragana: [
      { char: 'きゃ', romaji: 'kya' },
      { char: 'きゅ', romaji: 'kyu' },
      { char: 'きょ', romaji: 'kyo' },
      { char: 'しゃ', romaji: 'sha' },
      { char: 'しゅ', romaji: 'shu' },
      { char: 'しょ', romaji: 'sho' },
      { char: 'ちゃ', romaji: 'cha' },
      { char: 'ちゅ', romaji: 'chu' },
      { char: 'ちょ', romaji: 'cho' }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des combinaisons",
        instruction: "Hiragana combinés (yōon)"
      },
      {
        type: "dialogue",
        title: "Mini-Dialogue : Restaurant Japonais",
        instruction: "Lisez ce dialogue authentique (cliquez 🔊 pour écouter)",
        context: "🍱 Commander dans un restaurant traditionnel",
        dialogue: {
          lines: [
            { speaker: "Client", hiragana: "ちゅうもん を おねがいします", romaji: "chuumon wo onegaishimasu", french: "Je voudrais commander s'il vous plaît" },
            { speaker: "Serveur", hiragana: "はい、なに に しますか", romaji: "hai, nani ni shimasu ka", french: "Oui, que prenez-vous ?" },
            { speaker: "Client", hiragana: "ぎゅうにゅう と ちゃ を ください", romaji: "gyuunyuu to cha wo kudasai", french: "Du lait et du thé s'il vous plaît" },
            { speaker: "Serveur", hiragana: "りょうかい です", romaji: "ryoukai desu", french: "Compris" }
          ],
          audioFile: "dialogue_lesson9.mp3"
        }
      },
      {
        type: "mcq",
        title: "Exercice de reconnaissance",
        instruction: "Quelle est la lecture de cette combinaison ?",
        questions: [
          { hiragana: 'きゃ', options: ['kya', 'kiya', 'ka', 'ki'], correct: 'kya' },
          { hiragana: 'しゃ', options: ['sha', 'sa', 'shiya', 'shi'], correct: 'sha' },
          { hiragana: 'ちゅ', options: ['chu', 'chiyu', 'tsu', 'chi'], correct: 'chu' }
        ]
      },
      {
        type: "transcription",
        title: "Transcription",
        instruction: "Écrivez la transcription en romaji",
        questions: [
          { hiragana: 'きゃく', correct: 'kyaku', alternatives: [], meaning: 'client' },
          { hiragana: 'しゃしん', correct: 'shashin', alternatives: [], meaning: 'photo' },
          { hiragana: 'ちゃ', correct: 'cha', alternatives: [], meaning: 'thé' }
        ]
      },
      {
        type: "sentence",
        title: "Lecture en contexte",
        instruction: "Lisez ces mots réels",
        questions: [
          { hiragana: 'びょういん', romaji: 'byouin', meaning: 'hôpital' },
          { hiragana: 'りょうり', romaji: 'ryouri', meaning: 'cuisine' }
        ]
      }
    ]
  },
  {
    id: "lesson10",
    title: "Leçon 10 : Révision",
    description: "Révision complète de tous les hiragana",
    level: "advanced",
    free: false,
    hiragana: [],
    steps: [
      {
        type: "dialogue",
        title: "Mini-Dialogue : Conversation Quotidienne",
        instruction: "Lisez ce dialogue authentique complet (cliquez 🔊 pour écouter)",
        context: "💬 Une conversation naturelle du quotidien",
        dialogue: {
          lines: [
            { speaker: "Yuki", hiragana: "おはよう ございます", romaji: "ohayou gozaimasu", french: "Bonjour" },
            { speaker: "Hiro", hiragana: "おはよう。きょう は いい てんき です ね", romaji: "ohayou. kyou wa ii tenki desu ne", french: "Bonjour. Il fait beau aujourd'hui !" },
            { speaker: "Yuki", hiragana: "そう です ね。どこ に いきます か", romaji: "sou desu ne. doko ni ikimasu ka", french: "Oui ! Où allez-vous ?" },
            { speaker: "Hiro", hiragana: "としょかん に いきます。あなた は", romaji: "toshokan ni ikimasu. anata wa", french: "Je vais à la bibliothèque. Et vous ?" },
            { speaker: "Yuki", hiragana: "わたし も です。いっしょ に いきましょう", romaji: "watashi mo desu. issho ni ikimashou", french: "Moi aussi. Allons-y ensemble" }
          ],
          audioFile: "dialogue_lesson10.mp3"
        }
      },
      {
        type: "mcq",
        title: "Révision générale",
        instruction: "Testez vos connaissances sur tous les hiragana",
        questions: [
          { hiragana: 'あ', options: ['a', 'i', 'u', 'e'], correct: 'a' },
          { hiragana: 'さ', options: ['sa', 'shi', 'su', 'se'], correct: 'sa' },
          { hiragana: 'な', options: ['na', 'ni', 'nu', 'ne'], correct: 'na' },
          { hiragana: 'ま', options: ['ma', 'mi', 'mu', 'me'], correct: 'ma' },
          { hiragana: 'が', options: ['ga', 'ka', 'gi', 'ki'], correct: 'ga' },
          { hiragana: 'ば', options: ['ba', 'ha', 'pa', 'bi'], correct: 'ba' },
          { hiragana: 'ぱ', options: ['pa', 'ha', 'ba', 'pi'], correct: 'pa' },
          { hiragana: 'きゃ', options: ['kya', 'kiya', 'ka', 'ki'], correct: 'kya' }
        ]
      },
      {
        type: "transcription",
        title: "Transcription avancée",
        instruction: "Écrivez la transcription en romaji",
        questions: [
          { hiragana: 'こんにちは', correct: 'konnichiwa', alternatives: ['konnnichiha'], meaning: 'bonjour' },
          { hiragana: 'ありがとう', correct: 'arigatou', alternatives: ['arigato'], meaning: 'merci' },
          { hiragana: 'さようなら', correct: 'sayounara', alternatives: ['sayonara'], meaning: 'au revoir' }
        ]
      },
      {
        type: "sentence",
        title: "Phrases complètes",
        instruction: "Lisez ces phrases",
        questions: [
          { hiragana: 'おはよう', romaji: 'ohayou', meaning: 'bonjour (matin)' },
          { hiragana: 'おやすみ', romaji: 'oyasumi', meaning: 'bonne nuit' },
          { hiragana: 'がんばって', romaji: 'ganbatte', meaning: 'bon courage' }
        ]
      }
    ]
  },
  {
    id: "lesson11",
    title: "Leçon 11 : Chiffres 1-100",
    description: "Apprenez à compter en japonais",
    level: "intermediate",
    free: true,
    hiragana: [
      { char: '一 (いち)', romaji: 'ichi', meaning: '1' },
      { char: '二 (に)', romaji: 'ni', meaning: '2' },
      { char: '三 (さん)', romaji: 'san', meaning: '3' },
      { char: '四 (よん)', romaji: 'yon', meaning: '4' },
      { char: '五 (ご)', romaji: 'go', meaning: '5' },
      { char: '六 (ろく)', romaji: 'roku', meaning: '6' },
      { char: '七 (なな)', romaji: 'nana', meaning: '7' },
      { char: '八 (はち)', romaji: 'hachi', meaning: '8' },
      { char: '九 (きゅう)', romaji: 'kyuu', meaning: '9' },
      { char: '十 (じゅう)', romaji: 'juu', meaning: '10' },
      { char: '百 (ひゃく)', romaji: 'hyaku', meaning: '100' }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des chiffres",
        instruction: "Étudiez les chiffres de base en japonais"
      },
      {
        type: "dialogue",
        title: "Mini-Dialogue : Faire les courses",
        instruction: "Lisez ce dialogue authentique (cliquez 🔊 pour écouter)",
        context: "🛒 Acheter des fruits au marché",
        dialogue: {
          lines: [
            { speaker: "Client", hiragana: "りんご を ください", romaji: "ringo wo kudasai", french: "Des pommes s'il vous plaît" },
            { speaker: "Vendeur", hiragana: "なんこ です か", romaji: "nanko desu ka", french: "Combien ?" },
            { speaker: "Client", hiragana: "ごこ ください", romaji: "goko kudasai", french: "Cinq s'il vous plaît" },
            { speaker: "Vendeur", hiragana: "ごひゃくえん です", romaji: "gohyaku-en desu", french: "Ça fait 500 yens" }
          ],
          audioFile: "dialogue_lesson11.mp3"
        }
      },
      {
        type: "mcq",
        title: "Reconnaissance des chiffres",
        instruction: "Quelle est la lecture de ce chiffre ?",
        questions: [
          { hiragana: 'いち', options: ['ichi (1)', 'ni (2)', 'san (3)', 'yon (4)'], correct: 'ichi (1)' },
          { hiragana: 'に', options: ['ni (2)', 'ichi (1)', 'san (3)', 'go (5)'], correct: 'ni (2)' },
          { hiragana: 'さん', options: ['san (3)', 'yon (4)', 'go (5)', 'roku (6)'], correct: 'san (3)' },
          { hiragana: 'よん', options: ['yon (4)', 'san (3)', 'go (5)', 'roku (6)'], correct: 'yon (4)' },
          { hiragana: 'ご', options: ['go (5)', 'roku (6)', 'nana (7)', 'hachi (8)'], correct: 'go (5)' },
          { hiragana: 'ろく', options: ['roku (6)', 'go (5)', 'nana (7)', 'hachi (8)'], correct: 'roku (6)' },
          { hiragana: 'なな', options: ['nana (7)', 'roku (6)', 'hachi (8)', 'kyuu (9)'], correct: 'nana (7)' },
          { hiragana: 'はち', options: ['hachi (8)', 'nana (7)', 'kyuu (9)', 'juu (10)'], correct: 'hachi (8)' },
          { hiragana: 'きゅう', options: ['kyuu (9)', 'hachi (8)', 'juu (10)', 'nana (7)'], correct: 'kyuu (9)' },
          { hiragana: 'じゅう', options: ['juu (10)', 'kyuu (9)', 'hachi (8)', 'ichi (1)'], correct: 'juu (10)' }
        ]
      },
      {
        type: "dictation",
        title: "Dictée interactive",
        instruction: "Écoutez le chiffre et écrivez-le en hiragana",
        questions: [
          { audio: 'num_1', correct: 'いち', alternatives: ['1', 'ichi'], meaning: '1' },
          { audio: 'num_2', correct: 'に', alternatives: ['2', 'ni'], meaning: '2' },
          { audio: 'num_3', correct: 'さん', alternatives: ['3', 'san'], meaning: '3' },
          { audio: 'num_5', correct: 'ご', alternatives: ['5', 'go'], meaning: '5' },
          { audio: 'num_7', correct: 'なな', alternatives: ['7', 'nana'], meaning: '7' },
          { audio: 'num_10', correct: 'じゅう', alternatives: ['10', 'juu', 'じゅー'], meaning: '10' }
        ]
      },
      {
        type: "transcription",
        title: "Nombres composés",
        instruction: "Écrivez la transcription en romaji",
        questions: [
          { hiragana: 'じゅういち', correct: 'juuichi', alternatives: ['jyuuichi', '11'], meaning: '11' },
          { hiragana: 'じゅうに', correct: 'juuni', alternatives: ['jyuuni', '12'], meaning: '12' },
          { hiragana: 'にじゅう', correct: 'nijuu', alternatives: ['nijyuu', '20'], meaning: '20' },
          { hiragana: 'さんじゅう', correct: 'sanjuu', alternatives: ['sanjyuu', '30'], meaning: '30' },
          { hiragana: 'よんじゅう', correct: 'yonjuu', alternatives: ['yonjyuu', '40'], meaning: '40' },
          { hiragana: 'ごじゅう', correct: 'gojuu', alternatives: ['gojyuu', '50'], meaning: '50' }
        ]
      },
      {
        type: "sentence",
        title: "Chiffres en contexte",
        instruction: "Lisez ces expressions avec des chiffres",
        questions: [
          { hiragana: 'ひとつ', romaji: 'hitotsu', meaning: 'un (objet)' },
          { hiragana: 'ふたつ', romaji: 'futatsu', meaning: 'deux (objets)' },
          { hiragana: 'みっつ', romaji: 'mittsu', meaning: 'trois (objets)' },
          { hiragana: 'いくつ', romaji: 'ikutsu', meaning: 'combien ?' },
          { hiragana: 'ひゃく', romaji: 'hyaku', meaning: '100' }
        ]
      }
    ]
  },
  {
    id: "lesson12",
    title: "Katakana 1 : Voyelles + K",
    description: "ア, イ, ウ, エ, オ, カ, キ, ク, ケ, コ",
    level: "beginner",
    free: true,
    katakana: [
      { char: 'ア', romaji: 'a' },
      { char: 'イ', romaji: 'i' },
      { char: 'ウ', romaji: 'u' },
      { char: 'エ', romaji: 'e' },
      { char: 'オ', romaji: 'o' },
      { char: 'カ', romaji: 'ka' },
      { char: 'キ', romaji: 'ki' },
      { char: 'ク', romaji: 'ku' },
      { char: 'ケ', romaji: 'ke' },
      { char: 'コ', romaji: 'ko' }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des katakana",
        instruction: "Étudiez ces caractères et leur prononciation (utilisés pour les mots étrangers)"
      },
      {
        type: "dialogue",
        title: "Mini-Dialogue : Au Café",
        instruction: "Lisez ce dialogue avec des mots étrangers (cliquez 🔊 pour écouter)",
        context: "☕ Commander au café",
        dialogue: {
          lines: [
            { speaker: "A", hiragana: "コーヒー ください", romaji: "koohii kudasai", french: "Un café, s'il vous plaît" },
            { speaker: "B", hiragana: "アイス ですか", romaji: "aisu desu ka", french: "Glacé ?" },
            { speaker: "A", hiragana: "いいえ、ホット です", romaji: "iie, hotto desu", french: "Non, chaud" },
            { speaker: "B", hiragana: "ケーキ も いかがですか", romaji: "keeki mo ikaga desu ka", french: "Un gâteau aussi ?" }
          ],
          audioFile: "dialogue_katakana1.mp3"
        }
      },
      {
        type: "mcq",
        title: "Exercice de reconnaissance",
        instruction: "Quelle est la lecture de ce katakana ?",
        questions: [
          { hiragana: 'ア', options: ['a', 'i', 'u', 'e'], correct: 'a' },
          { hiragana: 'イ', options: ['i', 'a', 'e', 'o'], correct: 'i' },
          { hiragana: 'ウ', options: ['u', 'o', 'a', 'i'], correct: 'u' },
          { hiragana: 'エ', options: ['e', 'i', 'a', 'o'], correct: 'e' },
          { hiragana: 'オ', options: ['o', 'u', 'a', 'e'], correct: 'o' },
          { hiragana: 'カ', options: ['ka', 'ki', 'ku', 'ke'], correct: 'ka' },
          { hiragana: 'キ', options: ['ki', 'ka', 'ku', 'ke'], correct: 'ki' },
          { hiragana: 'ク', options: ['ku', 'ka', 'ki', 'ko'], correct: 'ku' },
          { hiragana: 'ケ', options: ['ke', 'ka', 'ki', 'ko'], correct: 'ke' },
          { hiragana: 'コ', options: ['ko', 'ku', 'ka', 'ke'], correct: 'ko' }
        ]
      },
      {
        type: "intruder",
        title: "Trouvez l'intrus",
        instruction: "Quel katakana n'appartient pas au groupe ?",
        questions: [
          {
            options: ['ア', 'イ', 'カ', 'オ'],
            intruder: 'カ',
            explanation: "'カ' (ka) est une consonne, les autres sont des voyelles"
          },
          {
            options: ['カ', 'キ', 'ス', 'コ'],
            intruder: 'ス',
            explanation: "'ス' (su) n'appartient pas à la série K"
          }
        ]
      },
      {
        type: "transcription",
        title: "Transcription de mots étrangers",
        instruction: "Écrivez la transcription en romaji",
        questions: [
          { hiragana: 'アイス', correct: 'aisu', alternatives: ['ice'], meaning: 'glace/ice cream' },
          { hiragana: 'ケーキ', correct: 'keeki', alternatives: ['cake', 'ke-ki'], meaning: 'gâteau' },
          { hiragana: 'コーヒー', correct: 'koohii', alternatives: ['coffee', 'ko-hi-'], meaning: 'café' },
          { hiragana: 'カー', correct: 'kaa', alternatives: ['car', 'ka-'], meaning: 'voiture' },
          { hiragana: 'オーケー', correct: 'ookee', alternatives: ['ok', 'okay'], meaning: 'OK' },
          { hiragana: 'エアコン', correct: 'eakon', alternatives: ['aircon'], meaning: 'climatisation' }
        ]
      },
      {
        type: "sentence",
        title: "Lecture en contexte",
        instruction: "Lisez ces mots étrangers courants",
        questions: [
          { hiragana: 'コーラ', romaji: 'koora', meaning: 'Coca-Cola' },
          { hiragana: 'カメラ', romaji: 'kamera', meaning: 'caméra' },
          { hiragana: 'ゲーム', romaji: 'geemu', meaning: 'jeu vidéo' },
          { hiragana: 'ノート', romaji: 'nooto', meaning: 'cahier/notebook' }
        ]
      },
      {
        type: "dictation",
        title: "Dictée interactive",
        instruction: "Écoutez le katakana et écrivez-le",
        questions: [
          { audio: 'a', correct: 'ア', alternatives: ['a'], meaning: '' },
          { audio: 'i', correct: 'イ', alternatives: ['i'], meaning: '' },
          { audio: 'u', correct: 'ウ', alternatives: ['u'], meaning: '' },
          { audio: 'ka', correct: 'カ', alternatives: ['ka'], meaning: '' },
          { audio: 'ki', correct: 'キ', alternatives: ['ki'], meaning: '' },
          { audio: 'ko', correct: 'コ', alternatives: ['ko'], meaning: '' }
        ]
      }
    ]
  },

  // ===== KATAKANA LESSON 2 : S + T =====
  {
    id: "lesson13",
    title: "Katakana 2 : S + T",
    description: "サ, シ, ス, セ, ソ, タ, チ, ツ, テ, ト",
    level: "beginner",
    free: true,
    katakana: [
      { char: 'サ', romaji: 'sa' },
      { char: 'シ', romaji: 'shi' },
      { char: 'ス', romaji: 'su' },
      { char: 'セ', romaji: 'se' },
      { char: 'ソ', romaji: 'so' },
      { char: 'タ', romaji: 'ta' },
      { char: 'チ', romaji: 'chi' },
      { char: 'ツ', romaji: 'tsu' },
      { char: 'テ', romaji: 'te' },
      { char: 'ト', romaji: 'to' }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des katakana S et T",
        instruction: "Étudiez ces caractères et leur prononciation"
      },
      {
        type: "dialogue",
        title: "Mini-Dialogue : Au Magasin de Vêtements",
        instruction: "Lisez ce dialogue avec des mots étrangers (cliquez 🔊 pour écouter)",
        context: "👔 Faire du shopping",
        dialogue: {
          lines: [
            { speaker: "A", hiragana: "このスーツはいくらですか", romaji: "kono suutsu wa ikura desu ka", french: "Combien coûte ce costume ?" },
            { speaker: "B", hiragana: "三千円です", romaji: "sanzen en desu", french: "3000 yens" },
            { speaker: "A", hiragana: "シャツもありますか", romaji: "shatsu mo arimasu ka", french: "Vous avez aussi des chemises ?" },
            { speaker: "B", hiragana: "はい、あちらにあります", romaji: "hai, achira ni arimasu", french: "Oui, elles sont là-bas" }
          ],
          audioFile: "dialogue_katakana2.mp3"
        }
      },
      {
        type: "mcq",
        title: "Exercice de reconnaissance",
        instruction: "Quelle est la lecture de ce katakana ?",
        questions: [
          { hiragana: 'サ', options: ['sa', 'shi', 'su', 'se'], correct: 'sa' },
          { hiragana: 'シ', options: ['shi', 'sa', 'chi', 'se'], correct: 'shi' },
          { hiragana: 'ス', options: ['su', 'sa', 'shi', 'se'], correct: 'su' },
          { hiragana: 'セ', options: ['se', 'sa', 'shi', 'so'], correct: 'se' },
          { hiragana: 'ソ', options: ['so', 'su', 'sa', 'se'], correct: 'so' },
          { hiragana: 'タ', options: ['ta', 'chi', 'tsu', 'te'], correct: 'ta' },
          { hiragana: 'チ', options: ['chi', 'ta', 'shi', 'tsu'], correct: 'chi' },
          { hiragana: 'ツ', options: ['tsu', 'ta', 'chi', 'to'], correct: 'tsu' },
          { hiragana: 'テ', options: ['te', 'ta', 'chi', 'to'], correct: 'te' },
          { hiragana: 'ト', options: ['to', 'tsu', 'ta', 'te'], correct: 'to' }
        ]
      },
      {
        type: "intruder",
        title: "Trouvez l'intrus",
        instruction: "Quel katakana n'appartient pas au groupe ?",
        questions: [
          {
            options: ['サ', 'シ', 'ス', 'タ'],
            intruder: 'タ',
            explanation: "'タ' (ta) appartient à la série T, les autres à la série S"
          },
          {
            options: ['タ', 'チ', 'ツ', 'セ'],
            intruder: 'セ',
            explanation: "'セ' (se) appartient à la série S, les autres à la série T"
          },
          {
            options: ['シ', 'チ', 'ツ', 'ス'],
            intruder: 'ス',
            explanation: "'ス' (su) ne se prononce pas avec 'i', contrairement aux autres"
          }
        ]
      },
      {
        type: "transcription",
        title: "Transcription de mots étrangers",
        instruction: "Écrivez la transcription en romaji",
        questions: [
          { hiragana: 'スーツ', correct: 'suutsu', alternatives: ['suit'], meaning: 'costume' },
          { hiragana: 'シャツ', correct: 'shatsu', alternatives: ['shirt'], meaning: 'chemise' },
          { hiragana: 'ソース', correct: 'soosu', alternatives: ['sauce'], meaning: 'sauce' },
          { hiragana: 'チーズ', correct: 'chiizu', alternatives: ['cheese'], meaning: 'fromage' },
          { hiragana: 'タクシー', correct: 'takushii', alternatives: ['taxi'], meaning: 'taxi' },
          { hiragana: 'テスト', correct: 'tesuto', alternatives: ['test'], meaning: 'test' }
        ]
      },
      {
        type: "sentence",
        title: "Lecture en contexte",
        instruction: "Lisez ces mots étrangers courants",
        questions: [
          { hiragana: 'スター', romaji: 'sutaa', meaning: 'star/vedette' },
          { hiragana: 'テーブル', romaji: 'teeburu', meaning: 'table' },
          { hiragana: 'トイレ', romaji: 'toire', meaning: 'toilettes' },
          { hiragana: 'サイト', romaji: 'saito', meaning: 'site web' }
        ]
      },
      {
        type: "dictation",
        title: "Dictée interactive",
        instruction: "Écoutez le katakana et écrivez-le",
        questions: [
          { audio: 'sa', correct: 'サ', alternatives: ['sa'], meaning: '' },
          { audio: 'shi', correct: 'シ', alternatives: ['shi'], meaning: '' },
          { audio: 'su', correct: 'ス', alternatives: ['su'], meaning: '' },
          { audio: 'ta', correct: 'タ', alternatives: ['ta'], meaning: '' },
          { audio: 'chi', correct: 'チ', alternatives: ['chi'], meaning: '' },
          { audio: 'tsu', correct: 'ツ', alternatives: ['tsu'], meaning: '' },
          { audio: 'to', correct: 'ト', alternatives: ['to'], meaning: '' }
        ]
      }
    ]
  },

  // ===== KATAKANA LESSON 3 : N + H =====
  {
    id: "lesson14",
    title: "Katakana 3 : N + H",
    description: "ナ, ニ, ヌ, ネ, ノ, ハ, ヒ, フ, ヘ, ホ",
    level: "beginner",
    free: true,
    katakana: [
      { char: 'ナ', romaji: 'na' },
      { char: 'ニ', romaji: 'ni' },
      { char: 'ヌ', romaji: 'nu' },
      { char: 'ネ', romaji: 'ne' },
      { char: 'ノ', romaji: 'no' },
      { char: 'ハ', romaji: 'ha' },
      { char: 'ヒ', romaji: 'hi' },
      { char: 'フ', romaji: 'fu' },
      { char: 'ヘ', romaji: 'he' },
      { char: 'ホ', romaji: 'ho' }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des katakana N et H",
        instruction: "Étudiez ces caractères et leur prononciation"
      },
      {
        type: "dialogue",
        title: "Mini-Dialogue : Au Restaurant",
        instruction: "Lisez ce dialogue avec des mots étrangers (cliquez 🔊 pour écouter)",
        context: "🍔 Commander au restaurant",
        dialogue: {
          lines: [
            { speaker: "A", hiragana: "ハンバーガーとフォーク ください", romaji: "hanbaagaa to fooku kudasai", french: "Un hamburger et une fourchette, s'il vous plaît" },
            { speaker: "B", hiragana: "ナイフも いりますか", romaji: "naifu mo irimasu ka", french: "Voulez-vous aussi un couteau ?" },
            { speaker: "A", hiragana: "はい、おねがいします", romaji: "hai, onegai shimasu", french: "Oui, s'il vous plaît" },
            { speaker: "B", hiragana: "ホット ですか", romaji: "hotto desu ka", french: "Chaud ?" }
          ],
          audioFile: "dialogue_katakana3.mp3"
        }
      },
      {
        type: "mcq",
        title: "Exercice de reconnaissance",
        instruction: "Quelle est la lecture de ce katakana ?",
        questions: [
          { hiragana: 'ナ', options: ['na', 'ni', 'nu', 'ne'], correct: 'na' },
          { hiragana: 'ニ', options: ['ni', 'na', 'ne', 'no'], correct: 'ni' },
          { hiragana: 'ヌ', options: ['nu', 'na', 'ni', 'ne'], correct: 'nu' },
          { hiragana: 'ネ', options: ['ne', 'na', 'ni', 'no'], correct: 'ne' },
          { hiragana: 'ノ', options: ['no', 'nu', 'na', 'ne'], correct: 'no' },
          { hiragana: 'ハ', options: ['ha', 'hi', 'fu', 'he'], correct: 'ha' },
          { hiragana: 'ヒ', options: ['hi', 'ha', 'fu', 'he'], correct: 'hi' },
          { hiragana: 'フ', options: ['fu', 'ha', 'hi', 'ho'], correct: 'fu' },
          { hiragana: 'ヘ', options: ['he', 'ha', 'hi', 'ho'], correct: 'he' },
          { hiragana: 'ホ', options: ['ho', 'fu', 'ha', 'he'], correct: 'ho' }
        ]
      },
      {
        type: "intruder",
        title: "Trouvez l'intrus",
        instruction: "Quel katakana n'appartient pas au groupe ?",
        questions: [
          {
            options: ['ナ', 'ニ', 'ヌ', 'ハ'],
            intruder: 'ハ',
            explanation: "'ハ' (ha) appartient à la série H, les autres à la série N"
          },
          {
            options: ['ハ', 'ヒ', 'フ', 'ノ'],
            intruder: 'ノ',
            explanation: "'ノ' (no) appartient à la série N, les autres à la série H"
          },
          {
            options: ['ニ', 'ヒ', 'フ', 'ホ'],
            intruder: 'ニ',
            explanation: "'ニ' (ni) appartient à la série N, les autres à la série H"
          }
        ]
      },
      {
        type: "transcription",
        title: "Transcription de mots étrangers",
        instruction: "Écrivez la transcription en romaji",
        questions: [
          { hiragana: 'ナイフ', correct: 'naifu', alternatives: ['knife'], meaning: 'couteau' },
          { hiragana: 'ノート', correct: 'nooto', alternatives: ['note'], meaning: 'cahier' },
          { hiragana: 'ハンバーガー', correct: 'hanbaagaa', alternatives: ['hamburger'], meaning: 'hamburger' },
          { hiragana: 'ホテル', correct: 'hoteru', alternatives: ['hotel'], meaning: 'hôtel' },
          { hiragana: 'フォーク', correct: 'fooku', alternatives: ['fork'], meaning: 'fourchette' },
          { hiragana: 'ヒーター', correct: 'hiitaa', alternatives: ['heater'], meaning: 'chauffage' }
        ]
      },
      {
        type: "sentence",
        title: "Lecture en contexte",
        instruction: "Lisez ces mots étrangers courants",
        questions: [
          { hiragana: 'ニュース', romaji: 'nyuusu', meaning: 'news/informations' },
          { hiragana: 'ネット', romaji: 'netto', meaning: 'internet' },
          { hiragana: 'ホーム', romaji: 'hoomu', meaning: 'quai/domicile' },
          { hiragana: 'ファイル', romaji: 'fairu', meaning: 'fichier' }
        ]
      },
      {
        type: "dictation",
        title: "Dictée interactive",
        instruction: "Écoutez le katakana et écrivez-le",
        questions: [
          { audio: 'na', correct: 'ナ', alternatives: ['na'], meaning: '' },
          { audio: 'ni', correct: 'ニ', alternatives: ['ni'], meaning: '' },
          { audio: 'nu', correct: 'ヌ', alternatives: ['nu'], meaning: '' },
          { audio: 'ha', correct: 'ハ', alternatives: ['ha'], meaning: '' },
          { audio: 'hi', correct: 'ヒ', alternatives: ['hi'], meaning: '' },
          { audio: 'fu', correct: 'フ', alternatives: ['fu'], meaning: '' },
          { audio: 'ho', correct: 'ホ', alternatives: ['ho'], meaning: '' }
        ]
      }
    ]
  },

  // ===== KATAKANA LESSON 4 : M + Y =====
  {
    id: "lesson15",
    title: "Katakana 4 : M + Y",
    description: "マ, ミ, ム, メ, モ, ヤ, ユ, ヨ",
    level: "beginner",
    free: true,
    katakana: [
      { char: 'マ', romaji: 'ma' },
      { char: 'ミ', romaji: 'mi' },
      { char: 'ム', romaji: 'mu' },
      { char: 'メ', romaji: 'me' },
      { char: 'モ', romaji: 'mo' },
      { char: 'ヤ', romaji: 'ya' },
      { char: 'ユ', romaji: 'yu' },
      { char: 'ヨ', romaji: 'yo' }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des katakana M et Y",
        instruction: "Étudiez ces caractères et leur prononciation"
      },
      {
        type: "dialogue",
        title: "Mini-Dialogue : Au Supermarché",
        instruction: "Lisez ce dialogue avec des mots étrangers (cliquez 🔊 pour écouter)",
        context: "🛒 Faire les courses",
        dialogue: {
          lines: [
            { speaker: "A", hiragana: "ミルクはありますか", romaji: "miruku wa arimasu ka", french: "Avez-vous du lait ?" },
            { speaker: "B", hiragana: "はい、ヨーグルトもあります", romaji: "hai, yooguruto mo arimasu", french: "Oui, nous avons aussi du yaourt" },
            { speaker: "A", hiragana: "メロンもください", romaji: "meron mo kudasai", french: "Je voudrais aussi un melon" },
            { speaker: "B", hiragana: "マンゴーもいかがですか", romaji: "mangoo mo ikaga desu ka", french: "Que diriez-vous aussi d'une mangue ?" }
          ],
          audioFile: "dialogue_katakana4.mp3"
        }
      },
      {
        type: "mcq",
        title: "Exercice de reconnaissance",
        instruction: "Quelle est la lecture de ce katakana ?",
        questions: [
          { hiragana: 'マ', options: ['ma', 'mi', 'mu', 'me'], correct: 'ma' },
          { hiragana: 'ミ', options: ['mi', 'ma', 'me', 'mo'], correct: 'mi' },
          { hiragana: 'ム', options: ['mu', 'ma', 'mi', 'me'], correct: 'mu' },
          { hiragana: 'メ', options: ['me', 'ma', 'mi', 'mo'], correct: 'me' },
          { hiragana: 'モ', options: ['mo', 'mu', 'ma', 'me'], correct: 'mo' },
          { hiragana: 'ヤ', options: ['ya', 'yu', 'yo', 'ma'], correct: 'ya' },
          { hiragana: 'ユ', options: ['yu', 'ya', 'yo', 'mu'], correct: 'yu' },
          { hiragana: 'ヨ', options: ['yo', 'ya', 'yu', 'mo'], correct: 'yo' }
        ]
      },
      {
        type: "intruder",
        title: "Trouvez l'intrus",
        instruction: "Quel katakana n'appartient pas au groupe ?",
        questions: [
          {
            options: ['マ', 'ミ', 'ム', 'ヤ'],
            intruder: 'ヤ',
            explanation: "'ヤ' (ya) appartient à la série Y, les autres à la série M"
          },
          {
            options: ['ヤ', 'ユ', 'ヨ', 'メ'],
            intruder: 'メ',
            explanation: "'メ' (me) appartient à la série M, les autres à la série Y"
          },
          {
            options: ['マ', 'メ', 'モ', 'ム'],
            intruder: 'ム',
            explanation: "'ム' (mu) ne se termine pas par un son de voyelle 'a', 'e' ou 'o', contrairement aux autres"
          }
        ]
      },
      {
        type: "transcription",
        title: "Transcription de mots étrangers",
        instruction: "Écrivez la transcription en romaji",
        questions: [
          { hiragana: 'メール', correct: 'meeru', alternatives: ['mail'], meaning: 'email' },
          { hiragana: 'マウス', correct: 'mausu', alternatives: ['mouse'], meaning: 'souris' },
          { hiragana: 'ミルク', correct: 'miruku', alternatives: ['milk'], meaning: 'lait' },
          { hiragana: 'ヨーグルト', correct: 'yooguruto', alternatives: ['yogurt'], meaning: 'yaourt' },
          { hiragana: 'メニュー', correct: 'menyuu', alternatives: ['menu'], meaning: 'menu' },
          { hiragana: 'ムービー', correct: 'muubii', alternatives: ['movie'], meaning: 'film' }
        ]
      },
      {
        type: "sentence",
        title: "Lecture en contexte",
        instruction: "Lisez ces mots étrangers courants",
        questions: [
          { hiragana: 'マスク', romaji: 'masuku', meaning: 'masque' },
          { hiragana: 'モデル', romaji: 'moderu', meaning: 'modèle' },
          { hiragana: 'ユーザー', romaji: 'yuuzaa', meaning: 'utilisateur' },
          { hiragana: 'メモ', romaji: 'memo', meaning: 'mémo' }
        ]
      },
      {
        type: "dictation",
        title: "Dictée interactive",
        instruction: "Écoutez le katakana et écrivez-le",
        questions: [
          { audio: 'ma', correct: 'マ', alternatives: ['ma'], meaning: '' },
          { audio: 'mi', correct: 'ミ', alternatives: ['mi'], meaning: '' },
          { audio: 'mu', correct: 'ム', alternatives: ['mu'], meaning: '' },
          { audio: 'me', correct: 'メ', alternatives: ['me'], meaning: '' },
          { audio: 'mo', correct: 'モ', alternatives: ['mo'], meaning: '' },
          { audio: 'ya', correct: 'ヤ', alternatives: ['ya'], meaning: '' },
          { audio: 'yu', correct: 'ユ', alternatives: ['yu'], meaning: '' },
          { audio: 'yo', correct: 'ヨ', alternatives: ['yo'], meaning: '' }
        ]
      }
    ]
  },

  // ===== KATAKANA LESSON 5 : R + W + N =====
  {
    id: "lesson16",
    title: "Katakana 5 : R + W + N",
    description: "ラ, リ, ル, レ, ロ, ワ, ヲ, ン",
    level: "beginner",
    free: true,
    katakana: [
      { char: 'ラ', romaji: 'ra' },
      { char: 'リ', romaji: 'ri' },
      { char: 'ル', romaji: 'ru' },
      { char: 'レ', romaji: 're' },
      { char: 'ロ', romaji: 'ro' },
      { char: 'ワ', romaji: 'wa' },
      { char: 'ヲ', romaji: 'wo' },
      { char: 'ン', romaji: 'n' }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des katakana R, W et N",
        instruction: "Étudiez ces caractères et leur prononciation"
      },
      {
        type: "dialogue",
        title: "Mini-Dialogue : Au Restaurant Ramen",
        instruction: "Lisez ce dialogue avec des mots étrangers (cliquez 🔊 pour écouter)",
        context: "🍜 Commander des ramen",
        dialogue: {
          lines: [
            { speaker: "A", hiragana: "ラーメンをください", romaji: "raamen wo kudasai", french: "Des ramen, s'il vous plaît" },
            { speaker: "B", hiragana: "ワインも いりますか", romaji: "wain mo irimasu ka", french: "Voulez-vous aussi du vin ?" },
            { speaker: "A", hiragana: "いいえ、レモンウォーター おねがいします", romaji: "iie, remon wootaa onegai shimasu", french: "Non, de l'eau citronnée s'il vous plaît" },
            { speaker: "B", hiragana: "わかりました", romaji: "wakarimashita", french: "Compris" }
          ],
          audioFile: "dialogue_katakana5.mp3"
        }
      },
      {
        type: "mcq",
        title: "Exercice de reconnaissance",
        instruction: "Quelle est la lecture de ce katakana ?",
        questions: [
          { hiragana: 'ラ', options: ['ra', 'ri', 'ru', 're'], correct: 'ra' },
          { hiragana: 'リ', options: ['ri', 'ra', 're', 'ro'], correct: 'ri' },
          { hiragana: 'ル', options: ['ru', 'ra', 'ri', 're'], correct: 'ru' },
          { hiragana: 'レ', options: ['re', 'ra', 'ri', 'ro'], correct: 're' },
          { hiragana: 'ロ', options: ['ro', 'ru', 'ra', 're'], correct: 'ro' },
          { hiragana: 'ワ', options: ['wa', 'ra', 'wo', 'n'], correct: 'wa' },
          { hiragana: 'ヲ', options: ['wo', 'wa', 'ro', 'n'], correct: 'wo' },
          { hiragana: 'ン', options: ['n', 'wa', 'wo', 'no'], correct: 'n' }
        ]
      },
      {
        type: "intruder",
        title: "Trouvez l'intrus",
        instruction: "Quel katakana n'appartient pas au groupe ?",
        questions: [
          {
            options: ['ラ', 'リ', 'ル', 'ワ'],
            intruder: 'ワ',
            explanation: "'ワ' (wa) appartient à la série W, les autres à la série R"
          },
          {
            options: ['ワ', 'ヲ', 'ン', 'レ'],
            intruder: 'レ',
            explanation: "'レ' (re) appartient à la série R, les autres sont des caractères spéciaux"
          },
          {
            options: ['ラ', 'レ', 'ロ', 'リ'],
            intruder: 'リ',
            explanation: "'リ' (ri) se prononce avec 'i', les autres se terminent par 'a', 'e' ou 'o'"
          }
        ]
      },
      {
        type: "transcription",
        title: "Transcription de mots étrangers",
        instruction: "Écrivez la transcription en romaji",
        questions: [
          { hiragana: 'ラーメン', correct: 'raamen', alternatives: ['ramen'], meaning: 'ramen' },
          { hiragana: 'リスト', correct: 'risuto', alternatives: ['list'], meaning: 'liste' },
          { hiragana: 'ルール', correct: 'ruuru', alternatives: ['rule'], meaning: 'règle' },
          { hiragana: 'レストラン', correct: 'resutoran', alternatives: ['restaurant'], meaning: 'restaurant' },
          { hiragana: 'ロボット', correct: 'robotto', alternatives: ['robot'], meaning: 'robot' },
          { hiragana: 'ワイン', correct: 'wain', alternatives: ['wine'], meaning: 'vin' }
        ]
      },
      {
        type: "sentence",
        title: "Lecture en contexte",
        instruction: "Lisez ces mots étrangers courants",
        questions: [
          { hiragana: 'ラジオ', romaji: 'rajio', meaning: 'radio' },
          { hiragana: 'リモコン', romaji: 'rimokon', meaning: 'télécommande' },
          { hiragana: 'レモン', romaji: 'remon', meaning: 'citron' },
          { hiragana: 'ワンピース', romaji: 'wanpiisu', meaning: 'robe' }
        ]
      },
      {
        type: "dictation",
        title: "Dictée interactive",
        instruction: "Écoutez le katakana et écrivez-le",
        questions: [
          { audio: 'ra', correct: 'ラ', alternatives: ['ra'], meaning: '' },
          { audio: 'ri', correct: 'リ', alternatives: ['ri'], meaning: '' },
          { audio: 'ru', correct: 'ル', alternatives: ['ru'], meaning: '' },
          { audio: 're', correct: 'レ', alternatives: ['re'], meaning: '' },
          { audio: 'ro', correct: 'ロ', alternatives: ['ro'], meaning: '' },
          { audio: 'wa', correct: 'ワ', alternatives: ['wa'], meaning: '' },
          { audio: 'n', correct: 'ン', alternatives: ['n'], meaning: '' }
        ]
      }
    ]
  },

  // ===== KATAKANA LESSON 6 : G + Z =====
  {
    id: "lesson17",
    title: "Katakana 6 : G + Z (Voisées)",
    description: "ガ, ギ, グ, ゲ, ゴ, ザ, ジ, ズ, ゼ, ゾ",
    level: "intermediate",
    free: true,
    katakana: [
      { char: 'ガ', romaji: 'ga' },
      { char: 'ギ', romaji: 'gi' },
      { char: 'グ', romaji: 'gu' },
      { char: 'ゲ', romaji: 'ge' },
      { char: 'ゴ', romaji: 'go' },
      { char: 'ザ', romaji: 'za' },
      { char: 'ジ', romaji: 'ji' },
      { char: 'ズ', romaji: 'zu' },
      { char: 'ゼ', romaji: 'ze' },
      { char: 'ゾ', romaji: 'zo' }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des katakana voisés G et Z",
        instruction: "Étudiez ces caractères avec dakuten (゛)"
      },
      {
        type: "dialogue",
        title: "Mini-Dialogue : Magasin de Jeux Vidéo",
        instruction: "Lisez ce dialogue avec des mots étrangers (cliquez 🔊 pour écouter)",
        context: "🎮 Acheter un jeu vidéo",
        dialogue: {
          lines: [
            { speaker: "A", hiragana: "ゲームが ほしいです", romaji: "geemu ga hoshii desu", french: "Je voudrais un jeu vidéo" },
            { speaker: "B", hiragana: "ガイド つきですか", romaji: "gaido tsuki desu ka", french: "Avec un guide ?" },
            { speaker: "A", hiragana: "はい、ジャズのゲームが ありますか", romaji: "hai, jazu no geemu ga arimasu ka", french: "Oui, avez-vous des jeux de jazz ?" },
            { speaker: "B", hiragana: "ゴルフゲーム しか ありません", romaji: "gorufu geemu shika arimasen", french: "Nous avons seulement des jeux de golf" }
          ],
          audioFile: "dialogue_katakana6.mp3"
        }
      },
      {
        type: "mcq",
        title: "Exercice de reconnaissance",
        instruction: "Quelle est la lecture de ce katakana ?",
        questions: [
          { hiragana: 'ガ', options: ['ga', 'gi', 'gu', 'ka'], correct: 'ga' },
          { hiragana: 'ギ', options: ['gi', 'ga', 'ge', 'ki'], correct: 'gi' },
          { hiragana: 'グ', options: ['gu', 'ga', 'gi', 'ku'], correct: 'gu' },
          { hiragana: 'ゲ', options: ['ge', 'ga', 'gi', 'ke'], correct: 'ge' },
          { hiragana: 'ゴ', options: ['go', 'gu', 'ga', 'ko'], correct: 'go' },
          { hiragana: 'ザ', options: ['za', 'ji', 'zu', 'sa'], correct: 'za' },
          { hiragana: 'ジ', options: ['ji', 'za', 'zu', 'shi'], correct: 'ji' },
          { hiragana: 'ズ', options: ['zu', 'za', 'ji', 'su'], correct: 'zu' },
          { hiragana: 'ゼ', options: ['ze', 'za', 'ji', 'se'], correct: 'ze' },
          { hiragana: 'ゾ', options: ['zo', 'zu', 'za', 'so'], correct: 'zo' }
        ]
      },
      {
        type: "intruder",
        title: "Trouvez l'intrus",
        instruction: "Quel katakana n'appartient pas au groupe ?",
        questions: [
          {
            options: ['ガ', 'ギ', 'グ', 'ザ'],
            intruder: 'ザ',
            explanation: "'ザ' (za) appartient à la série Z, les autres à la série G"
          },
          {
            options: ['ザ', 'ジ', 'ズ', 'ゲ'],
            intruder: 'ゲ',
            explanation: "'ゲ' (ge) appartient à la série G, les autres à la série Z"
          },
          {
            options: ['ガ', 'ゴ', 'ゲ', 'ギ'],
            intruder: 'ギ',
            explanation: "'ギ' (gi) se prononce avec 'i', les autres se terminent par 'a', 'e' ou 'o'"
          }
        ]
      },
      {
        type: "transcription",
        title: "Transcription de mots étrangers",
        instruction: "Écrivez la transcription en romaji",
        questions: [
          { hiragana: 'ガス', correct: 'gasu', alternatives: ['gas'], meaning: 'gaz' },
          { hiragana: 'ギター', correct: 'gitaa', alternatives: ['guitar'], meaning: 'guitare' },
          { hiragana: 'ゲーム', correct: 'geemu', alternatives: ['game'], meaning: 'jeu' },
          { hiragana: 'ジュース', correct: 'juusu', alternatives: ['juice'], meaning: 'jus' },
          { hiragana: 'ゼロ', correct: 'zero', alternatives: [], meaning: 'zéro' },
          { hiragana: 'ゴール', correct: 'gooru', alternatives: ['goal'], meaning: 'but' }
        ]
      },
      {
        type: "sentence",
        title: "Lecture en contexte",
        instruction: "Lisez ces mots étrangers courants",
        questions: [
          { hiragana: 'ガイド', romaji: 'gaido', meaning: 'guide' },
          { hiragana: 'ゴルフ', romaji: 'gorufu', meaning: 'golf' },
          { hiragana: 'ジャズ', romaji: 'jazu', meaning: 'jazz' },
          { hiragana: 'ゼリー', romaji: 'zerii', meaning: 'gelée' }
        ]
      },
      {
        type: "dictation",
        title: "Dictée interactive",
        instruction: "Écoutez le katakana et écrivez-le",
        questions: [
          { audio: 'ga', correct: 'ガ', alternatives: ['ga'], meaning: '' },
          { audio: 'gi', correct: 'ギ', alternatives: ['gi'], meaning: '' },
          { audio: 'gu', correct: 'グ', alternatives: ['gu'], meaning: '' },
          { audio: 'ge', correct: 'ゲ', alternatives: ['ge'], meaning: '' },
          { audio: 'go', correct: 'ゴ', alternatives: ['go'], meaning: '' },
          { audio: 'za', correct: 'ザ', alternatives: ['za'], meaning: '' },
          { audio: 'ji', correct: 'ジ', alternatives: ['ji'], meaning: '' },
          { audio: 'zu', correct: 'ズ', alternatives: ['zu'], meaning: '' },
          { audio: 'ze', correct: 'ゼ', alternatives: ['ze'], meaning: '' },
          { audio: 'zo', correct: 'ゾ', alternatives: ['zo'], meaning: '' }
        ]
      }
    ]
  },

  // ===== KATAKANA LESSON 7 : D + B =====
  {
    id: "lesson18",
    title: "Katakana 7 : D + B (Voisées)",
    description: "ダ, ヂ, ヅ, デ, ド, バ, ビ, ブ, ベ, ボ",
    level: "intermediate",
    free: true,
    katakana: [
      { char: 'ダ', romaji: 'da' },
      { char: 'ヂ', romaji: 'ji' },
      { char: 'ヅ', romaji: 'zu' },
      { char: 'デ', romaji: 'de' },
      { char: 'ド', romaji: 'do' },
      { char: 'バ', romaji: 'ba' },
      { char: 'ビ', romaji: 'bi' },
      { char: 'ブ', romaji: 'bu' },
      { char: 'ベ', romaji: 'be' },
      { char: 'ボ', romaji: 'bo' }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des katakana voisés D et B",
        instruction: "Étudiez ces caractères avec dakuten (゛)"
      },
      {
        type: "dialogue",
        title: "Mini-Dialogue : À l'Hôtel",
        instruction: "Lisez ce dialogue avec des mots étrangers (cliquez 🔊 pour écouter)",
        context: "🏨 Réserver une chambre d'hôtel",
        dialogue: {
          lines: [
            { speaker: "A", hiragana: "ダブルベッドの へや ありますか", romaji: "daburu beddo no heya arimasu ka", french: "Avez-vous une chambre avec lit double ?" },
            { speaker: "B", hiragana: "はい、バスつきです", romaji: "hai, basu tsuki desu", french: "Oui, avec salle de bain" },
            { speaker: "A", hiragana: "ビールも ありますか", romaji: "biiru mo arimasu ka", french: "Y a-t-il aussi de la bière ?" },
            { speaker: "B", hiragana: "はい、バーが あります", romaji: "hai, baa ga arimasu", french: "Oui, il y a un bar" }
          ],
          audioFile: "dialogue_katakana7.mp3"
        }
      },
      {
        type: "mcq",
        title: "Exercice de reconnaissance",
        instruction: "Quelle est la lecture de ce katakana ?",
        questions: [
          { hiragana: 'ダ', options: ['da', 'de', 'do', 'ta'], correct: 'da' },
          { hiragana: 'デ', options: ['de', 'da', 'do', 'te'], correct: 'de' },
          { hiragana: 'ド', options: ['do', 'da', 'de', 'to'], correct: 'do' },
          { hiragana: 'バ', options: ['ba', 'bi', 'bu', 'ha'], correct: 'ba' },
          { hiragana: 'ビ', options: ['bi', 'ba', 'be', 'hi'], correct: 'bi' },
          { hiragana: 'ブ', options: ['bu', 'ba', 'bi', 'fu'], correct: 'bu' },
          { hiragana: 'ベ', options: ['be', 'ba', 'bi', 'he'], correct: 'be' },
          { hiragana: 'ボ', options: ['bo', 'bu', 'ba', 'ho'], correct: 'bo' }
        ]
      },
      {
        type: "intruder",
        title: "Trouvez l'intrus",
        instruction: "Quel katakana n'appartient pas au groupe ?",
        questions: [
          {
            options: ['ダ', 'デ', 'ド', 'バ'],
            intruder: 'バ',
            explanation: "'バ' (ba) appartient à la série B, les autres à la série D"
          },
          {
            options: ['バ', 'ビ', 'ブ', 'デ'],
            intruder: 'デ',
            explanation: "'デ' (de) appartient à la série D, les autres à la série B"
          },
          {
            options: ['ダ', 'ド', 'デ', 'ヂ'],
            intruder: 'ヂ',
            explanation: "'ヂ' (ji) se prononce 'ji', les autres se prononcent avec 'd'"
          }
        ]
      },
      {
        type: "transcription",
        title: "Transcription de mots étrangers",
        instruction: "Écrivez la transcription en romaji",
        questions: [
          { hiragana: 'ドア', correct: 'doa', alternatives: ['door'], meaning: 'porte' },
          { hiragana: 'データ', correct: 'deeta', alternatives: ['data'], meaning: 'données' },
          { hiragana: 'バス', correct: 'basu', alternatives: ['bus'], meaning: 'bus' },
          { hiragana: 'ビール', correct: 'biiru', alternatives: ['beer'], meaning: 'bière' },
          { hiragana: 'ブログ', correct: 'burogu', alternatives: ['blog'], meaning: 'blog' },
          { hiragana: 'ベッド', correct: 'beddo', alternatives: ['bed'], meaning: 'lit' }
        ]
      },
      {
        type: "sentence",
        title: "Lecture en contexte",
        instruction: "Lisez ces mots étrangers courants",
        questions: [
          { hiragana: 'ドラマ', romaji: 'dorama', meaning: 'série TV' },
          { hiragana: 'ボール', romaji: 'booru', meaning: 'ballon/bol' },
          { hiragana: 'バナナ', romaji: 'banana', meaning: 'banane' },
          { hiragana: 'デザート', romaji: 'dezaato', meaning: 'dessert' }
        ]
      },
      {
        type: "dictation",
        title: "Dictée interactive",
        instruction: "Écoutez le katakana et écrivez-le",
        questions: [
          { audio: 'da', correct: 'ダ', alternatives: ['da'], meaning: '' },
          { audio: 'de', correct: 'デ', alternatives: ['de'], meaning: '' },
          { audio: 'do', correct: 'ド', alternatives: ['do'], meaning: '' },
          { audio: 'ba', correct: 'バ', alternatives: ['ba'], meaning: '' },
          { audio: 'bi', correct: 'ビ', alternatives: ['bi'], meaning: '' },
          { audio: 'bu', correct: 'ブ', alternatives: ['bu'], meaning: '' },
          { audio: 'be', correct: 'ベ', alternatives: ['be'], meaning: '' },
          { audio: 'bo', correct: 'ボ', alternatives: ['bo'], meaning: '' }
        ]
      }
    ]
  },

  // ===== KATAKANA LESSON 8 : P =====
  {
    id: "lesson19",
    title: "Katakana 8 : P (Semi-voisées)",
    description: "パ, ピ, プ, ペ, ポ",
    level: "intermediate",
    free: true,
    katakana: [
      { char: 'パ', romaji: 'pa' },
      { char: 'ピ', romaji: 'pi' },
      { char: 'プ', romaji: 'pu' },
      { char: 'ペ', romaji: 'pe' },
      { char: 'ポ', romaji: 'po' }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des katakana P",
        instruction: "Étudiez ces caractères avec handakuten (゜)"
      },
      {
        type: "dialogue",
        title: "Mini-Dialogue : À la Pizzeria",
        instruction: "Lisez ce dialogue avec des mots étrangers (cliquez 🔊 pour écouter)",
        context: "🍕 Commander une pizza",
        dialogue: {
          lines: [
            { speaker: "A", hiragana: "ピザを おねがいします", romaji: "piza wo onegai shimasu", french: "Une pizza s'il vous plaît" },
            { speaker: "B", hiragana: "パンも いりますか", romaji: "pan mo irimasu ka", french: "Voulez-vous aussi du pain ?" },
            { speaker: "A", hiragana: "はい、プレゼントですか", romaji: "hai, purezento desu ka", french: "Oui, est-ce un cadeau ?" },
            { speaker: "B", hiragana: "いいえ、ページを みてください", romaji: "iie, peeji wo mite kudasai", french: "Non, regardez la page" }
          ],
          audioFile: "dialogue_katakana8.mp3"
        }
      },
      {
        type: "mcq",
        title: "Exercice de reconnaissance",
        instruction: "Quelle est la lecture de ce katakana ?",
        questions: [
          { hiragana: 'パ', options: ['pa', 'pi', 'pu', 'ba'], correct: 'pa' },
          { hiragana: 'ピ', options: ['pi', 'pa', 'pe', 'bi'], correct: 'pi' },
          { hiragana: 'プ', options: ['pu', 'pa', 'pi', 'bu'], correct: 'pu' },
          { hiragana: 'ペ', options: ['pe', 'pa', 'pi', 'be'], correct: 'pe' },
          { hiragana: 'ポ', options: ['po', 'pu', 'pa', 'bo'], correct: 'po' }
        ]
      },
      {
        type: "intruder",
        title: "Trouvez l'intrus",
        instruction: "Quel katakana n'appartient pas au groupe ?",
        questions: [
          {
            options: ['パ', 'ピ', 'プ', 'バ'],
            intruder: 'バ',
            explanation: "'バ' (ba) a un dakuten (゛), les autres ont un handakuten (゜)"
          },
          {
            options: ['パ', 'ペ', 'ポ', 'ピ'],
            intruder: 'ピ',
            explanation: "'ピ' (pi) se prononce avec 'i', les autres se terminent par 'a', 'e' ou 'o'"
          },
          {
            options: ['プ', 'ブ', 'フ', 'パ'],
            intruder: 'パ',
            explanation: "'パ' (pa) se termine par 'a', les autres par 'u'"
          }
        ]
      },
      {
        type: "transcription",
        title: "Transcription de mots étrangers",
        instruction: "Écrivez la transcription en romaji",
        questions: [
          { hiragana: 'パン', correct: 'pan', alternatives: ['pain'], meaning: 'pain' },
          { hiragana: 'ピザ', correct: 'piza', alternatives: ['pizza'], meaning: 'pizza' },
          { hiragana: 'プール', correct: 'puuru', alternatives: ['pool'], meaning: 'piscine' },
          { hiragana: 'ペン', correct: 'pen', alternatives: [], meaning: 'stylo' },
          { hiragana: 'ポスト', correct: 'posuto', alternatives: ['post'], meaning: 'poste/boîte aux lettres' }
        ]
      },
      {
        type: "sentence",
        title: "Lecture en contexte",
        instruction: "Lisez ces mots étrangers courants",
        questions: [
          { hiragana: 'パソコン', romaji: 'pasokon', meaning: 'ordinateur' },
          { hiragana: 'ピンク', romaji: 'pinku', meaning: 'rose' },
          { hiragana: 'プレゼント', romaji: 'purezento', meaning: 'cadeau' },
          { hiragana: 'ページ', romaji: 'peeji', meaning: 'page' }
        ]
      },
      {
        type: "dictation",
        title: "Dictée interactive",
        instruction: "Écoutez le katakana et écrivez-le",
        questions: [
          { audio: 'pa', correct: 'パ', alternatives: ['pa'], meaning: '' },
          { audio: 'pi', correct: 'ピ', alternatives: ['pi'], meaning: '' },
          { audio: 'pu', correct: 'プ', alternatives: ['pu'], meaning: '' },
          { audio: 'pe', correct: 'ペ', alternatives: ['pe'], meaning: '' },
          { audio: 'po', correct: 'ポ', alternatives: ['po'], meaning: '' }
        ]
      }
    ]
  },

  // ===== KATAKANA LESSON 9 : Combinaisons =====
  {
    id: "lesson20",
    title: "Katakana 9 : Combinaisons",
    description: "キャ, シャ, チャ, ニャ, ヒャ, ミャ, リャ, ギャ, ジャ, ビャ, ピャ",
    level: "intermediate",
    free: true,
    katakana: [
      { char: 'キャ', romaji: 'kya' },
      { char: 'シャ', romaji: 'sha' },
      { char: 'チャ', romaji: 'cha' },
      { char: 'ニャ', romaji: 'nya' },
      { char: 'ヒャ', romaji: 'hya' },
      { char: 'ミャ', romaji: 'mya' },
      { char: 'リャ', romaji: 'rya' },
      { char: 'ギャ', romaji: 'gya' },
      { char: 'ジャ', romaji: 'ja' },
      { char: 'ビャ', romaji: 'bya' },
      { char: 'ピャ', romaji: 'pya' }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des combinaisons katakana",
        instruction: "Étudiez ces combinaisons de caractères"
      },
      {
        type: "dialogue",
        title: "Mini-Dialogue : Au Camping",
        instruction: "Lisez ce dialogue avec des mots étrangers (cliquez 🔊 pour écouter)",
        context: "⛺ Partir en camping",
        dialogue: {
          lines: [
            { speaker: "A", hiragana: "キャンプに いきますか", romaji: "kyanpu ni ikimasu ka", french: "Allez-vous au camping ?" },
            { speaker: "B", hiragana: "はい、シャワーが ありますか", romaji: "hai, shawaa ga arimasu ka", french: "Oui, y a-t-il une douche ?" },
            { speaker: "A", hiragana: "チャンスです。ジャケットを もってください", romaji: "chansu desu. jaketto wo motte kudasai", french: "C'est une opportunité. Apportez une veste" },
            { speaker: "B", hiragana: "リュックも いりますね", romaji: "ryukku mo irimasu ne", french: "J'ai aussi besoin d'un sac à dos" }
          ],
          audioFile: "dialogue_katakana9.mp3"
        }
      },
      {
        type: "mcq",
        title: "Exercice de reconnaissance",
        instruction: "Quelle est la lecture de cette combinaison ?",
        questions: [
          { hiragana: 'キャ', options: ['kya', 'kiya', 'kia', 'ka'], correct: 'kya' },
          { hiragana: 'シャ', options: ['sha', 'shiya', 'sia', 'sa'], correct: 'sha' },
          { hiragana: 'チャ', options: ['cha', 'chiya', 'tia', 'ta'], correct: 'cha' },
          { hiragana: 'ニャ', options: ['nya', 'niya', 'nia', 'na'], correct: 'nya' },
          { hiragana: 'ヒャ', options: ['hya', 'hiya', 'hia', 'ha'], correct: 'hya' },
          { hiragana: 'ミャ', options: ['mya', 'miya', 'mia', 'ma'], correct: 'mya' },
          { hiragana: 'リャ', options: ['rya', 'riya', 'ria', 'ra'], correct: 'rya' },
          { hiragana: 'ギャ', options: ['gya', 'giya', 'gia', 'ga'], correct: 'gya' },
          { hiragana: 'ジャ', options: ['ja', 'jiya', 'zia', 'za'], correct: 'ja' },
          { hiragana: 'ビャ', options: ['bya', 'biya', 'bia', 'ba'], correct: 'bya' }
        ]
      },
      {
        type: "intruder",
        title: "Trouvez l'intrus",
        instruction: "Quelle combinaison n'appartient pas au groupe ?",
        questions: [
          {
            options: ['キャ', 'シャ', 'チャ', 'ギャ'],
            intruder: 'ギャ',
            explanation: "'ギャ' (gya) est une combinaison voisée avec dakuten, les autres sont non-voisées"
          },
          {
            options: ['ジャ', 'ビャ', 'ギャ', 'チャ'],
            intruder: 'チャ',
            explanation: "'チャ' (cha) est une combinaison non-voisée, les autres sont voisées"
          },
          {
            options: ['シャ', 'チャ', 'ジャ', 'リャ'],
            intruder: 'リャ',
            explanation: "'リャ' (rya) utilise la série R, les autres utilisent des sibilantes (sh/ch/j)"
          }
        ]
      },
      {
        type: "transcription",
        title: "Transcription de mots étrangers",
        instruction: "Écrivez la transcription en romaji",
        questions: [
          { hiragana: 'キャンプ', correct: 'kyanpu', alternatives: ['camp'], meaning: 'camping' },
          { hiragana: 'シャワー', correct: 'shawaa', alternatives: ['shower'], meaning: 'douche' },
          { hiragana: 'チャンス', correct: 'chansu', alternatives: ['chance'], meaning: 'chance' },
          { hiragana: 'ジャケット', correct: 'jaketto', alternatives: ['jacket'], meaning: 'veste' },
          { hiragana: 'リュック', correct: 'ryukku', alternatives: [], meaning: 'sac à dos' }
        ]
      },
      {
        type: "sentence",
        title: "Lecture en contexte",
        instruction: "Lisez ces mots avec combinaisons",
        questions: [
          { hiragana: 'チャット', romaji: 'chatto', meaning: 'chat' },
          { hiragana: 'ギャラリー', romaji: 'gyararii', meaning: 'galerie' },
          { hiragana: 'ピュア', romaji: 'pyua', meaning: 'pur' },
          { hiragana: 'ミュージック', romaji: 'myuujikku', meaning: 'musique' }
        ]
      },
      {
        type: "dictation",
        title: "Dictée interactive",
        instruction: "Écoutez la combinaison et écrivez-la",
        questions: [
          { audio: 'kya', correct: 'キャ', alternatives: ['kya'], meaning: '' },
          { audio: 'sha', correct: 'シャ', alternatives: ['sha'], meaning: '' },
          { audio: 'cha', correct: 'チャ', alternatives: ['cha'], meaning: '' },
          { audio: 'nya', correct: 'ニャ', alternatives: ['nya'], meaning: '' },
          { audio: 'hya', correct: 'ヒャ', alternatives: ['hya'], meaning: '' },
          { audio: 'mya', correct: 'ミャ', alternatives: ['mya'], meaning: '' },
          { audio: 'rya', correct: 'リャ', alternatives: ['rya'], meaning: '' }
        ]
      }
    ]
  },

  // ===== KATAKANA LESSON 10 : Révision complète =====
  {
    id: "lesson21",
    title: "Katakana 10 : Révision Générale",
    description: "Révision de tous les katakana",
    level: "intermediate",
    free: true,
    katakana: [
      { char: 'ア', romaji: 'a' },
      { char: 'カ', romaji: 'ka' },
      { char: 'サ', romaji: 'sa' },
      { char: 'タ', romaji: 'ta' },
      { char: 'ナ', romaji: 'na' },
      { char: 'ハ', romaji: 'ha' },
      { char: 'マ', romaji: 'ma' },
      { char: 'ヤ', romaji: 'ya' },
      { char: 'ラ', romaji: 'ra' },
      { char: 'ワ', romaji: 'wa' },
      { char: 'ン', romaji: 'n' }
    ],
    steps: [
      {
        type: "presentation",
        title: "Révision des katakana",
        instruction: "Révisez les 11 premières lettres de chaque série"
      },
      {
        type: "mcq",
        title: "Test de révision",
        instruction: "Quelle est la lecture de ce katakana ?",
        questions: [
          { hiragana: 'ア', options: ['a', 'i', 'u', 'e'], correct: 'a' },
          { hiragana: 'カ', options: ['ka', 'sa', 'ta', 'na'], correct: 'ka' },
          { hiragana: 'サ', options: ['sa', 'ka', 'ta', 'ha'], correct: 'sa' },
          { hiragana: 'タ', options: ['ta', 'sa', 'ka', 'na'], correct: 'ta' },
          { hiragana: 'ナ', options: ['na', 'ma', 'ha', 'ya'], correct: 'na' },
          { hiragana: 'ハ', options: ['ha', 'na', 'ma', 'ya'], correct: 'ha' },
          { hiragana: 'マ', options: ['ma', 'na', 'ha', 'ra'], correct: 'ma' },
          { hiragana: 'ヤ', options: ['ya', 'ma', 'ra', 'wa'], correct: 'ya' },
          { hiragana: 'ラ', options: ['ra', 'ya', 'ma', 'wa'], correct: 'ra' },
          { hiragana: 'ワ', options: ['wa', 'ra', 'ya', 'n'], correct: 'wa' },
          { hiragana: 'ン', options: ['n', 'wa', 'wo', 'no'], correct: 'n' }
        ]
      },
      {
        type: "transcription",
        title: "Mots composés",
        instruction: "Transcrivez ces mots en romaji",
        questions: [
          { hiragana: 'アニメ', correct: 'anime', alternatives: [], meaning: 'anime/dessin animé' },
          { hiragana: 'カラオケ', correct: 'karaoke', alternatives: [], meaning: 'karaoké' },
          { hiragana: 'ラーメン', correct: 'raamen', alternatives: ['ramen'], meaning: 'ramen' },
          { hiragana: 'マンガ', correct: 'manga', alternatives: [], meaning: 'manga' },
          { hiragana: 'サムライ', correct: 'samurai', alternatives: [], meaning: 'samouraï' },
          { hiragana: 'ニンジャ', correct: 'ninja', alternatives: [], meaning: 'ninja' }
        ]
      }
    ]
  },

  // ===== KATAKANA LESSON 11 : Mots courants =====
  {
    id: "lesson22",
    title: "Katakana 11 : Mots Courants",
    description: "Vocabulaire quotidien en katakana",
    level: "intermediate",
    free: true,
    katakana: [
      { char: 'スマホ', romaji: 'sumaho' },
      { char: 'パソコン', romaji: 'pasokon' },
      { char: 'インターネット', romaji: 'intaanetto' },
      { char: 'テレビ', romaji: 'terebi' },
      { char: 'エアコン', romaji: 'eakon' }
    ],
    steps: [
      {
        type: "presentation",
        title: "Mots courants en katakana",
        instruction: "Découvrez le vocabulaire quotidien japonais"
      },
      {
        type: "transcription",
        title: "Technologie",
        instruction: "Transcrivez ces mots technologiques",
        questions: [
          { hiragana: 'スマホ', correct: 'sumaho', alternatives: ['smartphone'], meaning: 'smartphone' },
          { hiragana: 'パソコン', correct: 'pasokon', alternatives: ['pc'], meaning: 'ordinateur' },
          { hiragana: 'インターネット', correct: 'intaanetto', alternatives: ['internet'], meaning: 'internet' },
          { hiragana: 'テレビ', correct: 'terebi', alternatives: ['tv'], meaning: 'télévision' },
          { hiragana: 'カメラ', correct: 'kamera', alternatives: ['camera'], meaning: 'caméra' },
          { hiragana: 'ゲーム', correct: 'geemu', alternatives: ['game'], meaning: 'jeu vidéo' }
        ]
      },
      {
        type: "sentence",
        title: "Vie quotidienne",
        instruction: "Lisez ces mots du quotidien",
        questions: [
          { hiragana: 'レストラン', romaji: 'resutoran', meaning: 'restaurant' },
          { hiragana: 'スーパー', romaji: 'suupaa', meaning: 'supermarché' },
          { hiragana: 'ホテル', romaji: 'hoteru', meaning: 'hôtel' },
          { hiragana: 'タクシー', romaji: 'takushii', meaning: 'taxi' },
          { hiragana: 'バス', romaji: 'basu', meaning: 'bus' },
          { hiragana: 'エレベーター', romaji: 'erebeetaa', meaning: 'ascenseur' }
        ]
      }
    ]
  },

  // ===== KANJI LESSONS (Imported from kanji-data.js) =====
  // Note: Les leçons de Kanji sont définies dans kanji-data.js
  // et seront fusionnées dans le tableau lessonsData lors du chargement
];

// Si kanji-data.js est chargé, fusionner les leçons de kanji
if (typeof kanjiN5Data !== 'undefined') {
  // Ajouter les 8 leçons de kanji au tableau lessonsData
  Object.values(kanjiN5Data).forEach(kanjiLesson => {
    lessonsData.push(kanjiLesson);
  });
}

// Badges système
const badgesData = [
  { id: 'first_lesson', icon: '🎯', name: 'Premier pas', description: 'Complétez votre première leçon', condition: 'complete_lesson_1' },
  { id: 'perfect_score', icon: '💯', name: 'Score parfait', description: 'Obtenez 100% à une leçon', condition: 'perfect_lesson' },
  { id: 'streak_3', icon: '🔥', name: 'En feu !', description: 'Étudiez 3 jours consécutifs', condition: 'streak_3' },
  { id: 'streak_7', icon: '⚡', name: 'Déterminé', description: 'Étudiez 7 jours consécutifs', condition: 'streak_7' },
  { id: 'complete_5', icon: '⭐', name: 'Étudiant assidu', description: 'Complétez 5 leçons', condition: 'complete_5_lessons' },
  { id: 'complete_10', icon: '🏆', name: 'Maître des hiragana', description: 'Complétez toutes les leçons', condition: 'complete_10_lessons' },
  { id: 'score_500', icon: '💎', name: 'Collectionneur', description: 'Gagnez 500 points', condition: 'score_500' },
  { id: 'score_1000', icon: '👑', name: 'Champion', description: 'Gagnez 1000 points', condition: 'score_1000' },
  { id: 'transcription_master', icon: '✍️', name: 'Expert en transcription', description: 'Réussissez 20 transcriptions', condition: 'transcription_20' },
  { id: 'fast_learner', icon: '⚡', name: 'Rapide', description: 'Complétez une leçon en moins de 5 min', condition: 'fast_completion' },
  { id: 'night_owl', icon: '🦉', name: 'Oiseau de nuit', description: 'Étudiez après 22h', condition: 'study_night' },
  { id: 'early_bird', icon: '🐦', name: 'Lève-tôt', description: 'Étudiez avant 7h', condition: 'study_morning' },
  { id: 'vocabulary_50', icon: '📚', name: 'Vocabulaire étendu', description: 'Apprenez 50 mots', condition: 'vocab_50' },
  { id: 'comeback', icon: '🎊', name: 'De retour', description: 'Revenez après une pause', condition: 'comeback' },
  { id: 'persistent', icon: '💪', name: 'Persévérant', description: 'Refaites une leçon ratée', condition: 'retry_lesson' }
];
