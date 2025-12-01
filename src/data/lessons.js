/**
 * 📘 Structure des leçons - App Japonais React Native
 *
 * Chaque leçon suit une méthode fixe en 5 étapes :
 * 1. Présentation (table des hiragana)
 * 2. Reconnaissance (QCM)
 * 3. Intrus / Classification
 * 4. Écriture (input hiragana)
 * 5. Contexte (phrase réelle + mini-dialogue)
 */

export const lessons = [
  {
    id: "lesson1",
    title: "Leçon 1 : Voyelles + K",
    description: "a, i, u, e, o, ka, ki, ku, ke, ko",
    level: "beginner",
    free: true,
    hiragana: [
      { char: 'あ', romaji: 'a', note: '' },
      { char: 'い', romaji: 'i', note: '' },
      { char: 'う', romaji: 'u', note: '' },
      { char: 'え', romaji: 'e', note: '' },
      { char: 'お', romaji: 'o', note: '' },
      { char: 'か', romaji: 'ka', note: '' },
      { char: 'き', romaji: 'ki', note: '' },
      { char: 'く', romaji: 'ku', note: '' },
      { char: 'け', romaji: 'ke', note: '' },
      { char: 'こ', romaji: 'ko', note: '' }
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
            group: "voyelles",
            options: ['あ', 'い', 'か', 'お'],
            intruder: 'か',
            explanation: "'か' (ka) est une consonne, les autres sont des voyelles"
          },
          {
            group: "K",
            options: ['か', 'き', 'す', 'こ'],
            intruder: 'す',
            explanation: "'す' (su) n'appartient pas à la série K"
          },
          {
            group: "sons en 'i'",
            options: ['い', 'き', 'え', 'し'],
            intruder: 'え',
            explanation: "'え' (e) ne se prononce pas avec le son 'i'"
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
          { hiragana: 'かお', correct: 'kao', alternatives: [], meaning: 'visage' },
          { hiragana: 'きく', correct: 'kiku', alternatives: [], meaning: 'écouter/chrysanthème' },
          { hiragana: 'こえ', correct: 'koe', alternatives: [], meaning: 'voix' }
        ]
      },
      {
        type: "sentence",
        title: "Lecture en contexte",
        instruction: "Lisez ces mots et phrases réels",
        content: [
          {
            type: "word",
            japanese: "あき",
            romaji: "aki",
            meaning: "automne",
            question: "Que signifie ce mot ?",
            options: ['automne (aki)', 'printemps (haru)', 'été (natsu)', 'hiver (fuyu)'],
            correct: 'automne (aki)'
          },
          {
            type: "word",
            japanese: "いえ",
            romaji: "ie",
            meaning: "maison",
            question: "Que signifie ce mot ?",
            options: ['maison (ie)', 'chat (neko)', 'chien (inu)', 'arbre (ki)'],
            correct: 'maison (ie)'
          },
          {
            type: "miniText",
            title: "Mini-dialogue",
            text: [
              { speaker: "A", line: "あおい そら", romaji: "aoi sora", translation: "ciel bleu" },
              { speaker: "B", line: "あかい かお", romaji: "akai kao", translation: "visage rouge" }
            ],
            question: "Quel mot signifie 'visage' ?",
            options: ['かお', 'そら', 'あおい', 'あかい'],
            correct: 'かお'
          }
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
      { char: 'さ', romaji: 'sa', note: '' },
      { char: 'し', romaji: 'shi', note: '⚠️ shi (pas "si")' },
      { char: 'す', romaji: 'su', note: '' },
      { char: 'せ', romaji: 'se', note: '' },
      { char: 'そ', romaji: 'so', note: '' },
      { char: 'た', romaji: 'ta', note: '' },
      { char: 'ち', romaji: 'chi', note: '⚠️ chi (pas "ti")' },
      { char: 'つ', romaji: 'tsu', note: '⚠️ tsu (pas "tu")' },
      { char: 'て', romaji: 'te', note: '' },
      { char: 'と', romaji: 'to', note: '' }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des hiragana",
        instruction: "Étudiez ces caractères et leur prononciation. Attention aux exceptions !"
      },
      {
        type: "mcq",
        title: "Exercice de reconnaissance",
        instruction: "Quelle est la lecture de ce hiragana ?",
        questions: [
          { hiragana: 'さ', options: ['sa', 'shi', 'su', 'se'], correct: 'sa' },
          { hiragana: 'し', options: ['shi', 'si', 'chi', 'su'], correct: 'shi' },
          { hiragana: 'す', options: ['su', 'shi', 'so', 'se'], correct: 'su' },
          { hiragana: 'せ', options: ['se', 'sa', 'shi', 'so'], correct: 'se' },
          { hiragana: 'そ', options: ['so', 'su', 'sa', 'se'], correct: 'so' },
          { hiragana: 'た', options: ['ta', 'chi', 'tsu', 'te'], correct: 'ta' },
          { hiragana: 'ち', options: ['chi', 'ti', 'shi', 'tsu'], correct: 'chi' },
          { hiragana: 'つ', options: ['tsu', 'tu', 'su', 'chi'], correct: 'tsu' },
          { hiragana: 'て', options: ['te', 'ta', 'to', 'chi'], correct: 'te' },
          { hiragana: 'と', options: ['to', 'ta', 'te', 'tsu'], correct: 'to' }
        ]
      },
      {
        type: "intruder",
        title: "Trouvez l'intrus",
        instruction: "Quel hiragana n'appartient pas au groupe ?",
        questions: [
          {
            group: "série S",
            options: ['さ', 'し', 'た', 'そ'],
            intruder: 'た',
            explanation: "'た' (ta) appartient à la série T, pas S"
          },
          {
            group: "série T",
            options: ['た', 'ち', 'つ', 'す'],
            intruder: 'す',
            explanation: "'す' (su) appartient à la série S, pas T"
          }
        ]
      },
      {
        type: "transcription",
        title: "Transcription",
        instruction: "Écrivez la transcription en romaji",
        questions: [
          { hiragana: 'すし', correct: 'sushi', alternatives: [], meaning: 'sushi' },
          { hiragana: 'あさ', correct: 'asa', alternatives: [], meaning: 'matin' },
          { hiragana: 'した', correct: 'shita', alternatives: [], meaning: 'sous/langue' },
          { hiragana: 'いす', correct: 'isu', alternatives: [], meaning: 'chaise' },
          { hiragana: 'あし', correct: 'ashi', alternatives: [], meaning: 'jambe/pied' },
          { hiragana: 'ちかてつ', correct: 'chikatetsu', alternatives: [], meaning: 'métro' },
          { hiragana: 'てつ', correct: 'tetsu', alternatives: [], meaning: 'fer' },
          { hiragana: 'すこし', correct: 'sukoshi', alternatives: [], meaning: 'un peu' }
        ]
      },
      {
        type: "inputKana",
        title: "Exercice d'écriture",
        instruction: "Écrivez le hiragana correspondant en romaji",
        questions: [
          { hiragana: 'し', correct: 'shi' },
          { hiragana: 'ち', correct: 'chi' },
          { hiragana: 'つ', correct: 'tsu' },
          { hiragana: 'さ', correct: 'sa' },
          { hiragana: 'た', correct: 'ta' }
        ]
      },
      {
        type: "sentence",
        title: "Lecture en contexte",
        instruction: "Lisez ces mots et phrases réels",
        content: [
          {
            type: "word",
            japanese: "すし",
            romaji: "sushi",
            meaning: "sushi",
            question: "Que signifie ce mot ?",
            options: ['sushi (sushi)', 'saké (sake)', 'thé (cha)', 'soupe (supu)'],
            correct: 'sushi (sushi)'
          }
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
      { char: 'な', romaji: 'na', note: '' },
      { char: 'に', romaji: 'ni', note: '' },
      { char: 'ぬ', romaji: 'nu', note: '' },
      { char: 'ね', romaji: 'ne', note: '' },
      { char: 'の', romaji: 'no', note: '' },
      { char: 'は', romaji: 'ha', note: '' },
      { char: 'ひ', romaji: 'hi', note: '' },
      { char: 'ふ', romaji: 'fu', note: '⚠️ fu (pas "hu")' },
      { char: 'へ', romaji: 'he', note: '' },
      { char: 'ほ', romaji: 'ho', note: '' }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des hiragana",
        instruction: "Étudiez ces caractères. Attention : 'ふ' se lit 'fu' et non 'hu' !"
      },
      {
        type: "mcq",
        title: "Exercice de reconnaissance",
        instruction: "Quelle est la lecture de ce hiragana ?",
        questions: [
          { hiragana: 'な', options: ['na', 'ni', 'nu', 'ne'], correct: 'na' },
          { hiragana: 'に', options: ['ni', 'na', 'nu', 'no'], correct: 'ni' },
          { hiragana: 'ふ', options: ['fu', 'hu', 'ha', 'ho'], correct: 'fu' },
          { hiragana: 'の', options: ['no', 'nu', 'na', 'ne'], correct: 'no' }
        ]
      },
      {
        type: "intruder",
        title: "Trouvez l'intrus",
        instruction: "Quel hiragana n'appartient pas au groupe ?",
        questions: [
          {
            group: "série N",
            options: ['な', 'に', 'は', 'の'],
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
          { hiragana: 'ねこ', correct: 'neko', alternatives: [], meaning: 'chat' },
          { hiragana: 'はな', correct: 'hana', alternatives: [], meaning: 'fleur/nez' },
          { hiragana: 'ふね', correct: 'fune', alternatives: ['hune'], meaning: 'bateau' },
          { hiragana: 'いぬ', correct: 'inu', alternatives: [], meaning: 'chien' },
          { hiragana: 'ほし', correct: 'hoshi', alternatives: [], meaning: 'étoile' },
          { hiragana: 'かに', correct: 'kani', alternatives: [], meaning: 'crabe' },
          { hiragana: 'はし', correct: 'hashi', alternatives: [], meaning: 'pont/baguettes' },
          { hiragana: 'ひと', correct: 'hito', alternatives: [], meaning: 'personne' }
        ]
      },
      {
        type: "inputKana",
        title: "Exercice d'écriture",
        instruction: "Écrivez le hiragana correspondant en romaji",
        questions: [
          { hiragana: 'ふ', correct: 'fu' },
          { hiragana: 'な', correct: 'na' },
          { hiragana: 'の', correct: 'no' }
        ]
      },
      {
        type: "sentence",
        title: "Lecture en contexte",
        instruction: "Lisez ces mots et phrases réels",
        content: [
          {
            type: "word",
            japanese: "ねこ",
            romaji: "neko",
            meaning: "chat",
            question: "Que signifie ce mot ?",
            options: ['chat (neko)', 'chien (inu)', 'oiseau (tori)', 'poisson (sakana)'],
            correct: 'chat (neko)'
          }
        ]
      }
    ]
  },
  {
    id: "lesson4",
    title: "Leçon 4 : M + Y + R",
    description: "ma, mi, mu, me, mo, ya, yu, yo, ra, ri, ru, re, ro",
    level: "beginner",
    free: true,
    hiragana: [
      { char: 'ま', romaji: 'ma', note: '' },
      { char: 'み', romaji: 'mi', note: '' },
      { char: 'む', romaji: 'mu', note: '' },
      { char: 'め', romaji: 'me', note: '' },
      { char: 'も', romaji: 'mo', note: '' },
      { char: 'や', romaji: 'ya', note: '' },
      { char: 'ゆ', romaji: 'yu', note: '' },
      { char: 'よ', romaji: 'yo', note: '' },
      { char: 'ら', romaji: 'ra', note: '' },
      { char: 'り', romaji: 'ri', note: '' },
      { char: 'る', romaji: 'ru', note: '' },
      { char: 'れ', romaji: 're', note: '' },
      { char: 'ろ', romaji: 'ro', note: '' }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des hiragana",
        instruction: "Étudiez ces trois nouvelles séries : M, Y et R"
      },
      {
        type: "mcq",
        title: "Exercice de reconnaissance",
        instruction: "Quelle est la lecture de ce hiragana ?",
        questions: [
          { hiragana: 'ま', options: ['ma', 'mi', 'mu', 'me'], correct: 'ma' },
          { hiragana: 'や', options: ['ya', 'yu', 'yo', 'yi'], correct: 'ya' },
          { hiragana: 'ら', options: ['ra', 'ri', 'ru', 'ro'], correct: 'ra' },
          { hiragana: 'む', options: ['mu', 'ma', 'mo', 'mi'], correct: 'mu' },
          { hiragana: 'ゆ', options: ['yu', 'ya', 'yo', 'yi'], correct: 'yu' },
          { hiragana: 'り', options: ['ri', 'ra', 'ru', 're'], correct: 'ri' },
          { hiragana: 'も', options: ['mo', 'ma', 'mi', 'mu'], correct: 'mo' },
          { hiragana: 'よ', options: ['yo', 'ya', 'yu', 'yi'], correct: 'yo' },
          { hiragana: 'る', options: ['ru', 'ra', 'ri', 'ro'], correct: 'ru' }
        ]
      },
      {
        type: "intruder",
        title: "Trouvez l'intrus",
        instruction: "Quel hiragana n'appartient pas au groupe ?",
        questions: [
          {
            group: "série M",
            options: ['ま', 'み', 'や', 'も'],
            intruder: 'や',
            explanation: "'や' (ya) appartient à la série Y, pas M"
          },
          {
            group: "série Y",
            options: ['や', 'ゆ', 'よ', 'ら'],
            intruder: 'ら',
            explanation: "'ら' (ra) appartient à la série R, pas Y"
          },
          {
            group: "série R",
            options: ['ら', 'り', 'ま', 'ろ'],
            intruder: 'ま',
            explanation: "'ま' (ma) appartient à la série M, pas R"
          }
        ]
      },
      {
        type: "transcription",
        title: "Transcription",
        instruction: "Écrivez la transcription en romaji",
        questions: [
          { hiragana: 'やま', correct: 'yama', alternatives: [], meaning: 'montagne' },
          { hiragana: 'みせ', correct: 'mise', alternatives: [], meaning: 'magasin' },
          { hiragana: 'よる', correct: 'yoru', alternatives: [], meaning: 'nuit' },
          { hiragana: 'みず', correct: 'mizu', alternatives: [], meaning: 'eau' },
          { hiragana: 'まる', correct: 'maru', alternatives: [], meaning: 'cercle' },
          { hiragana: 'ゆめ', correct: 'yume', alternatives: [], meaning: 'rêve' },
          { hiragana: 'そら', correct: 'sora', alternatives: [], meaning: 'ciel' },
          { hiragana: 'はる', correct: 'haru', alternatives: [], meaning: 'printemps' }
        ]
      },
      {
        type: "inputKana",
        title: "Exercice d'écriture",
        instruction: "Écrivez le hiragana correspondant en romaji",
        questions: [
          { hiragana: 'ま', correct: 'ma' },
          { hiragana: 'や', correct: 'ya' },
          { hiragana: 'ら', correct: 'ra' },
          { hiragana: 'ゆ', correct: 'yu' },
          { hiragana: 'り', correct: 'ri' },
          { hiragana: 'も', correct: 'mo' }
        ]
      },
      {
        type: "sentence",
        title: "Lecture en contexte",
        instruction: "Lisez ces mots et phrases réels",
        content: [
          {
            type: "word",
            japanese: "やま",
            romaji: "yama",
            meaning: "montagne",
            question: "Que signifie ce mot ?",
            options: ['montagne (yama)', 'rivière (kawa)', 'mer (umi)', 'forêt (mori)'],
            correct: 'montagne (yama)'
          },
          {
            type: "word",
            japanese: "まる",
            romaji: "maru",
            meaning: "cercle",
            question: "Que signifie ce mot ?",
            options: ['cercle (maru)', 'carré (shikaku)', 'triangle (sankaku)', 'rectangle (chōhōkei)'],
            correct: 'cercle (maru)'
          },
          {
            type: "miniText",
            title: "Mini-dialogue",
            text: [
              { speaker: "A", line: "やまのうえ", romaji: "yama no ue", translation: "en haut de la montagne" },
              { speaker: "B", line: "みずがある", romaji: "mizu ga aru", translation: "il y a de l'eau" }
            ],
            question: "Quel mot signifie 'eau' ?",
            options: ['みず', 'やま', 'うえ', 'ある'],
            correct: 'みず'
          }
        ]
      }
    ]
  },
  {
    id: "lesson5",
    title: "Leçon 5 : W + N",
    description: "wa, wo, n",
    level: "beginner",
    free: true,
    hiragana: [
      { char: 'わ', romaji: 'wa', note: '' },
      { char: 'を', romaji: 'wo', note: '⚠️ Particule objet (se prononce "o")' },
      { char: 'ん', romaji: 'n', note: '⚠️ Seule consonne finale' }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des hiragana",
        instruction: "Caractères spéciaux : を est une particule grammaticale, ん est la seule consonne finale"
      },
      {
        type: "mcq",
        title: "Exercice de reconnaissance",
        instruction: "Quelle est la lecture de ce hiragana ?",
        questions: [
          { hiragana: 'わ', options: ['wa', 'wo', 'wi', 'we'], correct: 'wa' },
          { hiragana: 'を', options: ['wo', 'wa', 'o', 'n'], correct: 'wo' },
          { hiragana: 'ん', options: ['n', 'wa', 'wo', 'm'], correct: 'n' }
        ]
      },
      {
        type: "intruder",
        title: "Trouvez l'intrus",
        instruction: "Quel hiragana n'appartient pas au groupe ?",
        questions: [
          {
            group: "série W",
            options: ['わ', 'を', 'ん', 'や'],
            intruder: 'や',
            explanation: "'や' (ya) appartient à la série Y, pas W"
          }
        ]
      },
      {
        type: "transcription",
        title: "Transcription",
        instruction: "Écrivez la transcription en romaji",
        questions: [
          { hiragana: 'ほん', correct: 'hon', alternatives: [], meaning: 'livre' },
          { hiragana: 'にほん', correct: 'nihon', alternatives: ['nippon'], meaning: 'Japon' },
          { hiragana: 'わたし', correct: 'watashi', alternatives: [], meaning: 'moi/je' },
          { hiragana: 'せんせい', correct: 'sensei', alternatives: [], meaning: 'professeur' },
          { hiragana: 'さん', correct: 'san', alternatives: [], meaning: 'monsieur/madame (suffixe)' },
          { hiragana: 'なん', correct: 'nan', alternatives: [], meaning: 'quoi/combien' },
          { hiragana: 'あんない', correct: 'annai', alternatives: [], meaning: 'guide/information' },
          { hiragana: 'てんき', correct: 'tenki', alternatives: [], meaning: 'météo' }
        ]
      },
      {
        type: "inputKana",
        title: "Exercice d'écriture",
        instruction: "Écrivez le hiragana correspondant en romaji",
        questions: [
          { hiragana: 'わ', correct: 'wa' },
          { hiragana: 'を', correct: 'wo' },
          { hiragana: 'ん', correct: 'n' }
        ]
      },
      {
        type: "sentence",
        title: "Lecture en contexte",
        instruction: "Lisez ces mots et phrases réels",
        content: [
          {
            type: "word",
            japanese: "ほん",
            romaji: "hon",
            meaning: "livre",
            question: "Que signifie ce mot ?",
            options: ['livre (hon)', 'stylo (pen)', 'cahier (nōto)', 'table (tēburu)'],
            correct: 'livre (hon)'
          },
          {
            type: "word",
            japanese: "にほん",
            romaji: "nihon",
            meaning: "Japon",
            question: "Que signifie ce mot ?",
            options: ['Japon (nihon)', 'Chine (chūgoku)', 'Corée (kankoku)', 'France (furansu)'],
            correct: 'Japon (nihon)'
          },
          {
            type: "miniText",
            title: "Mini-dialogue",
            text: [
              { speaker: "A", line: "ほんをよむ", romaji: "hon wo yomu", translation: "lire un livre" },
              { speaker: "B", line: "わたしもよむ", romaji: "watashi mo yomu", translation: "moi aussi je lis" }
            ],
            question: "Quel mot signifie 'moi' ?",
            options: ['わたし', 'ほん', 'よむ', 'も'],
            correct: 'わたし'
          }
        ]
      }
    ]
  },
  {
    id: "lesson6",
    title: "Leçon 6 : Dakuten G + Z",
    description: "ga, gi, gu, ge, go, za, ji, zu, ze, zo",
    level: "intermediate",
    free: true,
    hiragana: [
      { char: 'が', romaji: 'ga', note: '゛= Dakuten (voix sonore)' },
      { char: 'ぎ', romaji: 'gi', note: '' },
      { char: 'ぐ', romaji: 'gu', note: '' },
      { char: 'げ', romaji: 'ge', note: '' },
      { char: 'ご', romaji: 'go', note: '' },
      { char: 'ざ', romaji: 'za', note: '' },
      { char: 'じ', romaji: 'ji', note: '⚠️ ji (comme ち devient chi)' },
      { char: 'ず', romaji: 'zu', note: '' },
      { char: 'ぜ', romaji: 'ze', note: '' },
      { char: 'ぞ', romaji: 'zo', note: '' }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des dakuten",
        instruction: "Le dakuten (゛) transforme K→G et S→Z. Attention : し devient じ (ji)"
      },
      {
        type: "mcq",
        title: "Exercice de reconnaissance",
        instruction: "Quelle est la lecture de ce hiragana ?",
        questions: [
          { hiragana: 'が', options: ['ga', 'ka', 'gi', 'gu'], correct: 'ga' },
          { hiragana: 'ぎ', options: ['gi', 'ki', 'ga', 'gu'], correct: 'gi' },
          { hiragana: 'ざ', options: ['za', 'sa', 'zi', 'zu'], correct: 'za' },
          { hiragana: 'じ', options: ['ji', 'zi', 'shi', 'chi'], correct: 'ji' },
          { hiragana: 'ご', options: ['go', 'ko', 'gu', 'ga'], correct: 'go' },
          { hiragana: 'ず', options: ['zu', 'su', 'ji', 'tsu'], correct: 'zu' }
        ]
      },
      {
        type: "intruder",
        title: "Trouvez l'intrus",
        instruction: "Quel hiragana n'appartient pas au groupe ?",
        questions: [
          {
            group: "série G (dakuten de K)",
            options: ['が', 'ぎ', 'ざ', 'ご'],
            intruder: 'ざ',
            explanation: "'ざ' (za) est le dakuten de S, pas K"
          },
          {
            group: "série Z (dakuten de S)",
            options: ['ざ', 'じ', 'ず', 'ぐ'],
            intruder: 'ぐ',
            explanation: "'ぐ' (gu) est le dakuten de K, pas S"
          }
        ]
      },
      {
        type: "transcription",
        title: "Transcription",
        instruction: "Écrivez la transcription en romaji",
        questions: [
          { hiragana: 'がっこう', correct: 'gakkou', alternatives: ['gakkō', 'gakko'], meaning: 'école' },
          { hiragana: 'かぞく', correct: 'kazoku', alternatives: [], meaning: 'famille' },
          { hiragana: 'ぎんこう', correct: 'ginkou', alternatives: ['ginkō', 'ginko'], meaning: 'banque' },
          { hiragana: 'じかん', correct: 'jikan', alternatives: [], meaning: 'temps/heure' },
          { hiragana: 'かぐ', correct: 'kagu', alternatives: [], meaning: 'meuble' },
          { hiragana: 'ざっし', correct: 'zasshi', alternatives: [], meaning: 'magazine' },
          { hiragana: 'くすり', correct: 'kusuri', alternatives: [], meaning: 'médicament' },
          { hiragana: 'かぜ', correct: 'kaze', alternatives: [], meaning: 'vent/rhume' }
        ]
      },
      {
        type: "inputKana",
        title: "Exercice d'écriture",
        instruction: "Écrivez le hiragana correspondant en romaji",
        questions: [
          { hiragana: 'が', correct: 'ga' },
          { hiragana: 'じ', correct: 'ji' },
          { hiragana: 'ぎ', correct: 'gi' },
          { hiragana: 'ず', correct: 'zu' },
          { hiragana: 'ご', correct: 'go' }
        ]
      },
      {
        type: "sentence",
        title: "Lecture en contexte",
        instruction: "Lisez ces mots et phrases réels",
        content: [
          {
            type: "word",
            japanese: "ぎんこう",
            romaji: "ginkou",
            meaning: "banque",
            question: "Que signifie ce mot ?",
            options: ['banque (ginkō)', 'école (gakkō)', 'hôpital (byōin)', 'magasin (mise)'],
            correct: 'banque (ginkō)'
          },
          {
            type: "word",
            japanese: "かぞく",
            romaji: "kazoku",
            meaning: "famille",
            question: "Que signifie ce mot ?",
            options: ['famille (kazoku)', 'ami (tomodachi)', 'voisin (rinjin)', 'collègue (dōryō)'],
            correct: 'famille (kazoku)'
          },
          {
            type: "miniText",
            title: "Mini-dialogue",
            text: [
              { speaker: "A", line: "がっこうへいく", romaji: "gakkou he iku", translation: "aller à l'école" },
              { speaker: "B", line: "じかんがない", romaji: "jikan ga nai", translation: "je n'ai pas le temps" }
            ],
            question: "Quel mot signifie 'temps' ?",
            options: ['じかん', 'がっこう', 'いく', 'ない'],
            correct: 'じかん'
          }
        ]
      }
    ]
  },
  {
    id: "lesson7",
    title: "Leçon 7 : Dakuten D + B",
    description: "da, ji, zu, de, do, ba, bi, bu, be, bo",
    level: "intermediate",
    free: true,
    hiragana: [
      { char: 'だ', romaji: 'da', note: '' },
      { char: 'ぢ', romaji: 'ji', note: '⚠️ Rare, même son que じ' },
      { char: 'づ', romaji: 'zu', note: '⚠️ Rare, même son que ず' },
      { char: 'で', romaji: 'de', note: '' },
      { char: 'ど', romaji: 'do', note: '' },
      { char: 'ば', romaji: 'ba', note: '' },
      { char: 'び', romaji: 'bi', note: '' },
      { char: 'ぶ', romaji: 'bu', note: '' },
      { char: 'べ', romaji: 'be', note: '' },
      { char: 'ぼ', romaji: 'bo', note: '' }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des dakuten",
        instruction: "Dakuten T→D et H→B. Attention : ぢ et づ sont rares !"
      },
      {
        type: "mcq",
        title: "Exercice de reconnaissance",
        instruction: "Quelle est la lecture de ce hiragana ?",
        questions: [
          { hiragana: 'だ', options: ['da', 'ta', 'di', 'du'], correct: 'da' },
          { hiragana: 'で', options: ['de', 'te', 'da', 'do'], correct: 'de' },
          { hiragana: 'ば', options: ['ba', 'ha', 'bi', 'pa'], correct: 'ba' },
          { hiragana: 'び', options: ['bi', 'hi', 'ba', 'pi'], correct: 'bi' },
          { hiragana: 'ぶ', options: ['bu', 'fu', 'ba', 'pu'], correct: 'bu' },
          { hiragana: 'ど', options: ['do', 'to', 'da', 'de'], correct: 'do' }
        ]
      },
      {
        type: "intruder",
        title: "Trouvez l'intrus",
        instruction: "Quel hiragana n'appartient pas au groupe ?",
        questions: [
          {
            group: "série D (dakuten de T)",
            options: ['だ', 'で', 'ど', 'ば'],
            intruder: 'ば',
            explanation: "'ば' (ba) est le dakuten de H, pas T"
          },
          {
            group: "série B (dakuten de H)",
            options: ['ば', 'び', 'ぶ', 'だ'],
            intruder: 'だ',
            explanation: "'だ' (da) est le dakuten de T, pas H"
          }
        ]
      },
      {
        type: "transcription",
        title: "Transcription",
        instruction: "Écrivez la transcription en romaji",
        questions: [
          { hiragana: 'たべる', correct: 'taberu', alternatives: [], meaning: 'manger' },
          { hiragana: 'だれ', correct: 'dare', alternatives: [], meaning: 'qui' },
          { hiragana: 'でんしゃ', correct: 'densha', alternatives: [], meaning: 'train' },
          { hiragana: 'とても', correct: 'totemo', alternatives: [], meaning: 'très' },
          { hiragana: 'あたま', correct: 'atama', alternatives: [], meaning: 'tête' },
          { hiragana: 'さばく', correct: 'sabaku', alternatives: [], meaning: 'désert' },
          { hiragana: 'ばんごはん', correct: 'bangohan', alternatives: [], meaning: 'dîner' },
          { hiragana: 'どこ', correct: 'doko', alternatives: [], meaning: 'où' }
        ]
      },
      {
        type: "inputKana",
        title: "Exercice d'écriture",
        instruction: "Écrivez le hiragana correspondant en romaji",
        questions: [
          { hiragana: 'だ', correct: 'da' },
          { hiragana: 'ば', correct: 'ba' },
          { hiragana: 'で', correct: 'de' },
          { hiragana: 'び', correct: 'bi' },
          { hiragana: 'ぶ', correct: 'bu' }
        ]
      },
      {
        type: "sentence",
        title: "Lecture en contexte",
        instruction: "Lisez ces mots et phrases réels",
        content: [
          {
            type: "word",
            japanese: "だれ",
            romaji: "dare",
            meaning: "qui",
            question: "Que signifie ce mot ?",
            options: ['qui (dare)', 'quoi (nani)', 'où (doko)', 'quand (itsu)'],
            correct: 'qui (dare)'
          },
          {
            type: "word",
            japanese: "たべる",
            romaji: "taberu",
            meaning: "manger",
            question: "Que signifie ce mot ?",
            options: ['manger (taberu)', 'boire (nomu)', 'dormir (neru)', 'marcher (aruku)'],
            correct: 'manger (taberu)'
          },
          {
            type: "miniText",
            title: "Mini-dialogue",
            text: [
              { speaker: "A", line: "どこにいく", romaji: "doko ni iku", translation: "où vas-tu ?" },
              { speaker: "B", line: "でんしゃでいく", romaji: "densha de iku", translation: "j'y vais en train" }
            ],
            question: "Quel mot signifie 'train' ?",
            options: ['でんしゃ', 'どこ', 'いく', 'に'],
            correct: 'でんしゃ'
          }
        ]
      }
    ]
  },
  {
    id: "lesson8",
    title: "Leçon 8 : Handakuten P",
    description: "pa, pi, pu, pe, po",
    level: "intermediate",
    free: true,
    hiragana: [
      { char: 'ぱ', romaji: 'pa', note: '゜= Handakuten (marque P)' },
      { char: 'ぴ', romaji: 'pi', note: '' },
      { char: 'ぷ', romaji: 'pu', note: '' },
      { char: 'ぺ', romaji: 'pe', note: '' },
      { char: 'ぽ', romaji: 'po', note: '' }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation du handakuten",
        instruction: "Le handakuten (゜) transforme H→P. C'est la seule série avec ce symbole !"
      },
      {
        type: "mcq",
        title: "Exercice de reconnaissance",
        instruction: "Quelle est la lecture de ce hiragana ?",
        questions: [
          { hiragana: 'ぱ', options: ['pa', 'ha', 'ba', 'pi'], correct: 'pa' },
          { hiragana: 'ぴ', options: ['pi', 'hi', 'bi', 'pa'], correct: 'pi' },
          { hiragana: 'ぷ', options: ['pu', 'fu', 'bu', 'pa'], correct: 'pu' },
          { hiragana: 'ぺ', options: ['pe', 'he', 'be', 'po'], correct: 'pe' },
          { hiragana: 'ぽ', options: ['po', 'ho', 'bo', 'pu'], correct: 'po' }
        ]
      },
      {
        type: "intruder",
        title: "Trouvez l'intrus",
        instruction: "Quel hiragana n'appartient pas au groupe ?",
        questions: [
          {
            group: "série P (handakuten)",
            options: ['ぱ', 'ぴ', 'ば', 'ぽ'],
            intruder: 'ば',
            explanation: "'ば' (ba) a un dakuten (゛), pas un handakuten (゜)"
          }
        ]
      },
      {
        type: "transcription",
        title: "Transcription",
        instruction: "Écrivez la transcription en romaji",
        questions: [
          { hiragana: 'ぱん', correct: 'pan', alternatives: [], meaning: 'pain' },
          { hiragana: 'てんぷら', correct: 'tenpura', alternatives: ['tempura'], meaning: 'tempura (beignet)' },
          { hiragana: 'ぴざ', correct: 'piza', alternatives: ['pizza'], meaning: 'pizza' },
          { hiragana: 'さんぽ', correct: 'sanpo', alternatives: [], meaning: 'promenade' },
          { hiragana: 'かっぱ', correct: 'kappa', alternatives: [], meaning: 'kappa (créature)' },
          { hiragana: 'きっぷ', correct: 'kippu', alternatives: [], meaning: 'billet' },
          { hiragana: 'さっぽろ', correct: 'sapporo', alternatives: [], meaning: 'Sapporo (ville)' },
          { hiragana: 'ぴんく', correct: 'pinku', alternatives: ['pink'], meaning: 'rose (couleur)' }
        ]
      },
      {
        type: "inputKana",
        title: "Exercice d'écriture",
        instruction: "Écrivez le hiragana correspondant en romaji",
        questions: [
          { hiragana: 'ぱ', correct: 'pa' },
          { hiragana: 'ぴ', correct: 'pi' },
          { hiragana: 'ぷ', correct: 'pu' },
          { hiragana: 'ぺ', correct: 'pe' },
          { hiragana: 'ぽ', correct: 'po' }
        ]
      },
      {
        type: "sentence",
        title: "Lecture en contexte",
        instruction: "Lisez ces mots et phrases réels",
        content: [
          {
            type: "word",
            japanese: "ぱん",
            romaji: "pan",
            meaning: "pain",
            question: "Que signifie ce mot ?",
            options: ['pain (pan)', 'riz (gohan)', 'viande (niku)', 'poisson (sakana)'],
            correct: 'pain (pan)'
          },
          {
            type: "word",
            japanese: "てんぷら",
            romaji: "tenpura",
            meaning: "tempura (beignet)",
            question: "Que signifie ce mot ?",
            options: ['beignet (tenpura)', 'soupe (supu)', 'salade (sarada)', 'gâteau (kēki)'],
            correct: 'beignet (tenpura)'
          },
          {
            type: "miniText",
            title: "Mini-dialogue",
            text: [
              { speaker: "A", line: "ぱんをかう", romaji: "pan wo kau", translation: "acheter du pain" },
              { speaker: "B", line: "ぴざもかう", romaji: "piza mo kau", translation: "acheter aussi une pizza" }
            ],
            question: "Quel mot signifie 'pizza' ?",
            options: ['ぴざ', 'ぱん', 'かう', 'も'],
            correct: 'ぴざ'
          }
        ]
      }
    ]
  },
  {
    id: "lesson9",
    title: "Leçon 9 : Combinaisons",
    description: "kya, kyu, kyo, sha, shu, sho, cha, chu, cho, nya, nyu, nyo",
    level: "intermediate",
    free: true,
    hiragana: [
      { char: 'きゃ', romaji: 'kya', note: 'き + petit や' },
      { char: 'きゅ', romaji: 'kyu', note: 'き + petit ゆ' },
      { char: 'きょ', romaji: 'kyo', note: 'き + petit よ' },
      { char: 'しゃ', romaji: 'sha', note: 'し + petit や' },
      { char: 'しゅ', romaji: 'shu', note: 'し + petit ゆ' },
      { char: 'しょ', romaji: 'sho', note: 'し + petit よ' },
      { char: 'ちゃ', romaji: 'cha', note: 'ち + petit や' },
      { char: 'ちゅ', romaji: 'chu', note: 'ち + petit ゆ' },
      { char: 'ちょ', romaji: 'cho', note: 'ち + petit よ' },
      { char: 'にゃ', romaji: 'nya', note: 'に + petit や' },
      { char: 'にゅ', romaji: 'nyu', note: 'に + petit ゆ' },
      { char: 'にょ', romaji: 'nyo', note: 'に + petit よ' }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des combinaisons",
        instruction: "Les yōon combinent un hiragana en -i avec un petit や/ゆ/よ"
      },
      {
        type: "mcq",
        title: "Exercice de reconnaissance",
        instruction: "Quelle est la lecture de cette combinaison ?",
        questions: [
          { hiragana: 'きゃ', options: ['kya', 'kiya', 'ka', 'ki'], correct: 'kya' },
          { hiragana: 'しゃ', options: ['sha', 'shiya', 'sa', 'shi'], correct: 'sha' },
          { hiragana: 'ちゃ', options: ['cha', 'chiya', 'ta', 'chi'], correct: 'cha' },
          { hiragana: 'きゅ', options: ['kyu', 'kiyu', 'ku', 'ki'], correct: 'kyu' },
          { hiragana: 'しゅ', options: ['shu', 'shiyu', 'su', 'shi'], correct: 'shu' },
          { hiragana: 'ちゅ', options: ['chu', 'chiyu', 'tsu', 'chi'], correct: 'chu' }
        ]
      },
      {
        type: "intruder",
        title: "Trouvez l'intrus",
        instruction: "Quelle combinaison n'appartient pas au groupe ?",
        questions: [
          {
            group: "combinaisons en 'ya'",
            options: ['きゃ', 'しゃ', 'きゅ', 'ちゃ'],
            intruder: 'きゅ',
            explanation: "'きゅ' (kyu) se termine en 'yu', pas 'ya'"
          },
          {
            group: "combinaisons de K",
            options: ['きゃ', 'きゅ', 'しゃ', 'きょ'],
            intruder: 'しゃ',
            explanation: "'しゃ' (sha) commence par S, pas K"
          }
        ]
      },
      {
        type: "transcription",
        title: "Transcription",
        instruction: "Écrivez la transcription en romaji",
        questions: [
          { hiragana: 'しゃしん', correct: 'shashin', alternatives: [], meaning: 'photo' },
          { hiragana: 'ちゃ', correct: 'cha', alternatives: [], meaning: 'thé' },
          { hiragana: 'ちゅうごく', correct: 'chuugoku', alternatives: ['chūgoku'], meaning: 'Chine' },
          { hiragana: 'きょう', correct: 'kyou', alternatives: ['kyō'], meaning: 'aujourd\'hui' },
          { hiragana: 'しゅくだい', correct: 'shukudai', alternatives: [], meaning: 'devoirs' },
          { hiragana: 'びょういん', correct: 'byouin', alternatives: ['byōin'], meaning: 'hôpital' },
          { hiragana: 'りょうり', correct: 'ryouri', alternatives: ['ryōri'], meaning: 'cuisine' },
          { hiragana: 'ひゃく', correct: 'hyaku', alternatives: [], meaning: 'cent' }
        ]
      },
      {
        type: "inputKana",
        title: "Exercice d'écriture",
        instruction: "Écrivez la combinaison correspondante en romaji",
        questions: [
          { hiragana: 'きゃ', correct: 'kya' },
          { hiragana: 'しゃ', correct: 'sha' },
          { hiragana: 'ちゃ', correct: 'cha' },
          { hiragana: 'しゅ', correct: 'shu' },
          { hiragana: 'ちょ', correct: 'cho' }
        ]
      },
      {
        type: "sentence",
        title: "Lecture en contexte",
        instruction: "Lisez ces mots et phrases réels",
        content: [
          {
            type: "word",
            japanese: "ちゃ",
            romaji: "cha",
            meaning: "thé",
            question: "Que signifie ce mot ?",
            options: ['thé (cha)', 'café (kōhī)', 'eau (mizu)', 'jus (jūsu)'],
            correct: 'thé (cha)'
          },
          {
            type: "word",
            japanese: "しゃしん",
            romaji: "shashin",
            meaning: "photo",
            question: "Que signifie ce mot ?",
            options: ['photo (shashin)', 'vidéo (bideo)', 'dessin (e)', 'peinture (kaiga)'],
            correct: 'photo (shashin)'
          },
          {
            type: "miniText",
            title: "Mini-dialogue",
            text: [
              { speaker: "A", line: "おちゃをのむ", romaji: "ocha wo nomu", translation: "boire du thé" },
              { speaker: "B", line: "ちゅうごくのちゃ", romaji: "chuugoku no cha", translation: "thé chinois" }
            ],
            question: "Quel mot signifie 'Chine' ?",
            options: ['ちゅうごく', 'おちゃ', 'のむ', 'の'],
            correct: 'ちゅうごく'
          }
        ]
      }
    ]
  },
  {
    id: "lesson10",
    title: "Leçon 10 : Révision complète",
    description: "Tous les hiragana - Test final",
    level: "advanced",
    free: true,
    hiragana: [
      { char: 'あ', romaji: 'a', note: 'Voyelles' },
      { char: 'か', romaji: 'ka', note: 'Série K' },
      { char: 'さ', romaji: 'sa', note: 'Série S' },
      { char: 'た', romaji: 'ta', note: 'Série T' },
      { char: 'な', romaji: 'na', note: 'Série N' },
      { char: 'は', romaji: 'ha', note: 'Série H' },
      { char: 'ま', romaji: 'ma', note: 'Série M' },
      { char: 'や', romaji: 'ya', note: 'Série Y' },
      { char: 'ら', romaji: 'ra', note: 'Série R' },
      { char: 'わ', romaji: 'wa', note: 'Série W' },
      { char: 'が', romaji: 'ga', note: 'Dakuten' },
      { char: 'ぱ', romaji: 'pa', note: 'Handakuten' },
      { char: 'きゃ', romaji: 'kya', note: 'Combinaisons' }
    ],
    steps: [
      {
        type: "presentation",
        title: "Révision complète",
        instruction: "Bravo ! Vous avez appris tous les hiragana de base. Testez vos connaissances !"
      },
      {
        type: "mcq",
        title: "Test de reconnaissance aléatoire",
        instruction: "Quelle est la lecture de ce hiragana ?",
        questions: [
          { hiragana: 'し', options: ['shi', 'si', 'chi', 'thi'], correct: 'shi' },
          { hiragana: 'ち', options: ['chi', 'ti', 'shi', 'thi'], correct: 'chi' },
          { hiragana: 'つ', options: ['tsu', 'tu', 'su', 'chu'], correct: 'tsu' },
          { hiragana: 'ふ', options: ['fu', 'hu', 'pu', 'bu'], correct: 'fu' },
          { hiragana: 'を', options: ['wo', 'o', 'wa', 'we'], correct: 'wo' },
          { hiragana: 'ん', options: ['n', 'm', 'ng', 'nn'], correct: 'n' },
          { hiragana: 'じ', options: ['ji', 'zi', 'shi', 'chi'], correct: 'ji' },
          { hiragana: 'ぢ', options: ['ji', 'di', 'chi', 'dji'], correct: 'ji' },
          { hiragana: 'しゃ', options: ['sha', 'shiya', 'sya', 'sa'], correct: 'sha' },
          { hiragana: 'ちゅ', options: ['chu', 'chiyu', 'tyu', 'tu'], correct: 'chu' },
          { hiragana: 'きょ', options: ['kyo', 'kiyo', 'kio', 'ko'], correct: 'kyo' },
          { hiragana: 'ぎゃ', options: ['gya', 'giya', 'ga', 'giya'], correct: 'gya' }
        ]
      },
      {
        type: "intruder",
        title: "Classification avancée",
        instruction: "Quel hiragana n'appartient pas au groupe ?",
        questions: [
          {
            group: "exceptions de prononciation",
            options: ['し', 'ち', 'つ', 'さ'],
            intruder: 'さ',
            explanation: "'さ' (sa) se prononce normalement, les autres ont des exceptions"
          },
          {
            group: "hiragana avec dakuten",
            options: ['が', 'ざ', 'だ', 'ぱ'],
            intruder: 'ぱ',
            explanation: "'ぱ' (pa) a un handakuten (゜), pas un dakuten (゛)"
          },
          {
            group: "combinaisons",
            options: ['きゃ', 'しゃ', 'ちゃ', 'か'],
            intruder: 'か',
            explanation: "'か' (ka) n'est pas une combinaison, c'est un hiragana simple"
          }
        ]
      },
      {
        type: "transcription",
        title: "Transcription finale",
        instruction: "Écrivez la transcription en romaji de ces expressions courantes",
        questions: [
          { hiragana: 'ありがとう', correct: 'arigatou', alternatives: ['arigatō'], meaning: 'merci' },
          { hiragana: 'こんにちは', correct: 'konnichiwa', alternatives: ['konnichiha'], meaning: 'bonjour' },
          { hiragana: 'さようなら', correct: 'sayounara', alternatives: ['sayōnara'], meaning: 'au revoir' },
          { hiragana: 'すみません', correct: 'sumimasen', alternatives: [], meaning: 'excusez-moi/désolé' },
          { hiragana: 'おはよう', correct: 'ohayou', alternatives: ['ohayō'], meaning: 'bonjour (matin)' },
          { hiragana: 'おやすみ', correct: 'oyasumi', alternatives: [], meaning: 'bonne nuit' },
          { hiragana: 'いただきます', correct: 'itadakimasu', alternatives: [], meaning: 'bon appétit' },
          { hiragana: 'ごちそうさま', correct: 'gochisousama', alternatives: ['gochisōsama'], meaning: 'merci pour le repas' }
        ]
      },
      {
        type: "inputKana",
        title: "Test d'écriture final",
        instruction: "Écrivez le hiragana correspondant en romaji",
        questions: [
          { hiragana: 'を', correct: 'wo' },
          { hiragana: 'ん', correct: 'n' },
          { hiragana: 'じ', correct: 'ji' },
          { hiragana: 'ぢ', correct: 'ji' },
          { hiragana: 'づ', correct: 'zu' },
          { hiragana: 'しゃ', correct: 'sha' },
          { hiragana: 'ちゅ', correct: 'chu' },
          { hiragana: 'きょ', correct: 'kyo' }
        ]
      },
      {
        type: "sentence",
        title: "Lecture complète",
        instruction: "Lisez ces phrases complexes",
        content: [
          {
            type: "word",
            japanese: "ありがとう",
            romaji: "arigatou",
            meaning: "merci",
            question: "Que signifie cette expression ?",
            options: ['merci (arigatō)', 'bonjour (konnichiwa)', 'au revoir (sayōnara)', 'désolé (gomen)'],
            correct: 'merci (arigatō)'
          },
          {
            type: "word",
            japanese: "こんにちは",
            romaji: "konnichiwa",
            meaning: "bonjour",
            question: "Que signifie cette expression ?",
            options: ['bonjour (konnichiwa)', 'bonsoir (konbanwa)', 'salut (yā)', 'à bientôt (mata ne)'],
            correct: 'bonjour (konnichiwa)'
          },
          {
            type: "miniText",
            title: "Conversation complète",
            text: [
              { speaker: "A", line: "きょうはいいてんきですね", romaji: "kyou wa ii tenki desu ne", translation: "il fait beau aujourd'hui, n'est-ce pas ?" },
              { speaker: "B", line: "そうですね。さんぽしましょう", romaji: "sou desu ne. sanpo shimashou", translation: "oui. allons nous promener" }
            ],
            question: "Quel mot signifie 'promenade' ?",
            options: ['さんぽ', 'てんき', 'きょう', 'そう'],
            correct: 'さんぽ'
          }
        ]
      }
    ]
  }
];

export default lessons;
