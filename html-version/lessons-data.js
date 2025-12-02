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
  }
];

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
