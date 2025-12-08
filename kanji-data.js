/**
 * 📘 Données des Kanji N5 - 80 kanji essentiels JLPT N5
 * Organisés par thèmes avec lectures ON/KUN, mnémoniques et ordre des traits
 */

// ===== KANJI N5 : Les 80 kanji essentiels =====
// Organisés en 8 leçons thématiques de ~10 kanji chacune

const kanjiN5Data = {
  // ===== LEÇON 1 : CHIFFRES (1-10) =====
  lesson1: {
    id: "kanji-lesson1",
    title: "Kanji 1 : Chiffres (1-10)",
    description: "Les 10 premiers chiffres en kanji",
    level: "N5",
    free: true,
    kanji: true,
    kanjis: [
      {
        kanji: '一',
        meaning: 'un, 1',
        onyomi: ['イチ', 'イツ'],
        kunyomi: ['ひと', 'ひと-つ'],
        strokes: 1,
        strokeOrder: 'https://jisho.org/search/一%20%23kanji',
        mnemonic: 'Une seule ligne horizontale = le chiffre 1',
        examples: [
          { word: '一つ', reading: 'ひとつ', meaning: 'un (objet)' },
          { word: '一人', reading: 'ひとり', meaning: 'une personne' },
          { word: '一月', reading: 'いちがつ', meaning: 'janvier' }
        ]
      },
      {
        kanji: '二',
        meaning: 'deux, 2',
        onyomi: ['ニ'],
        kunyomi: ['ふた', 'ふた-つ'],
        strokes: 2,
        strokeOrder: 'https://jisho.org/search/二%20%23kanji',
        mnemonic: 'Deux lignes horizontales = le chiffre 2',
        examples: [
          { word: '二つ', reading: 'ふたつ', meaning: 'deux (objets)' },
          { word: '二人', reading: 'ふたり', meaning: 'deux personnes' },
          { word: '二月', reading: 'にがつ', meaning: 'février' }
        ]
      },
      {
        kanji: '三',
        meaning: 'trois, 3',
        onyomi: ['サン'],
        kunyomi: ['み', 'み-つ', 'みっ-つ'],
        strokes: 3,
        strokeOrder: 'https://jisho.org/search/三%20%23kanji',
        mnemonic: 'Trois lignes horizontales = le chiffre 3',
        examples: [
          { word: '三つ', reading: 'みっつ', meaning: 'trois (objets)' },
          { word: '三人', reading: 'さんにん', meaning: 'trois personnes' },
          { word: '三月', reading: 'さんがつ', meaning: 'mars' }
        ]
      },
      {
        kanji: '四',
        meaning: 'quatre, 4',
        onyomi: ['シ'],
        kunyomi: ['よ', 'よ-つ', 'よっ-つ', 'よん'],
        strokes: 5,
        strokeOrder: 'https://jisho.org/search/四%20%23kanji',
        mnemonic: 'Un carré enfermé = 4 côtés',
        examples: [
          { word: '四つ', reading: 'よっつ', meaning: 'quatre (objets)' },
          { word: '四人', reading: 'よにん', meaning: 'quatre personnes' },
          { word: '四月', reading: 'しがつ', meaning: 'avril' }
        ]
      },
      {
        kanji: '五',
        meaning: 'cinq, 5',
        onyomi: ['ゴ'],
        kunyomi: ['いつ', 'いつ-つ'],
        strokes: 4,
        strokeOrder: 'https://jisho.org/search/五%20%23kanji',
        mnemonic: '5 lignes formant le kanji',
        examples: [
          { word: '五つ', reading: 'いつつ', meaning: 'cinq (objets)' },
          { word: '五人', reading: 'ごにん', meaning: 'cinq personnes' },
          { word: '五月', reading: 'ごがつ', meaning: 'mai' }
        ]
      },
      {
        kanji: '六',
        meaning: 'six, 6',
        onyomi: ['ロク'],
        kunyomi: ['む', 'む-つ', 'むっ-つ', 'むい'],
        strokes: 4,
        strokeOrder: 'https://jisho.org/search/六%20%23kanji',
        mnemonic: 'Un chapeau sur un point = 6',
        examples: [
          { word: '六つ', reading: 'むっつ', meaning: 'six (objets)' },
          { word: '六人', reading: 'ろくにん', meaning: 'six personnes' },
          { word: '六月', reading: 'ろくがつ', meaning: 'juin' }
        ]
      },
      {
        kanji: '七',
        meaning: 'sept, 7',
        onyomi: ['シチ'],
        kunyomi: ['なな', 'なな-つ', 'なの'],
        strokes: 2,
        strokeOrder: 'https://jisho.org/search/七%20%23kanji',
        mnemonic: 'Une croix coupée = 7',
        examples: [
          { word: '七つ', reading: 'ななつ', meaning: 'sept (objets)' },
          { word: '七人', reading: 'しちにん', meaning: 'sept personnes' },
          { word: '七月', reading: 'しちがつ', meaning: 'juillet' }
        ]
      },
      {
        kanji: '八',
        meaning: 'huit, 8',
        onyomi: ['ハチ'],
        kunyomi: ['や', 'や-つ', 'やっ-つ', 'よう'],
        strokes: 2,
        strokeOrder: 'https://jisho.org/search/八%20%23kanji',
        mnemonic: 'Deux lignes qui s\'écartent = diviser en 8',
        examples: [
          { word: '八つ', reading: 'やっつ', meaning: 'huit (objets)' },
          { word: '八人', reading: 'はちにん', meaning: 'huit personnes' },
          { word: '八月', reading: 'はちがつ', meaning: 'août' }
        ]
      },
      {
        kanji: '九',
        meaning: 'neuf, 9',
        onyomi: ['キュウ', 'ク'],
        kunyomi: ['ここの', 'ここの-つ'],
        strokes: 2,
        strokeOrder: 'https://jisho.org/search/九%20%23kanji',
        mnemonic: 'Un coude plié = presque 10 (9)',
        examples: [
          { word: '九つ', reading: 'ここのつ', meaning: 'neuf (objets)' },
          { word: '九人', reading: 'きゅうにん', meaning: 'neuf personnes' },
          { word: '九月', reading: 'くがつ', meaning: 'septembre' }
        ]
      },
      {
        kanji: '十',
        meaning: 'dix, 10',
        onyomi: ['ジュウ', 'ジッ'],
        kunyomi: ['とお', 'と'],
        strokes: 2,
        strokeOrder: 'https://jisho.org/search/十%20%23kanji',
        mnemonic: 'Une croix = 10',
        examples: [
          { word: '十', reading: 'じゅう', meaning: 'dix' },
          { word: '十人', reading: 'じゅうにん', meaning: 'dix personnes' },
          { word: '十月', reading: 'じゅうがつ', meaning: 'octobre' }
        ]
      }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des Kanji - Chiffres",
        instruction: "Étudiez ces 10 kanji de base. Observez leur forme et leur signification."
      },
      {
        type: "mcq",
        title: "Reconnaissance des Kanji",
        instruction: "Quelle est la signification de ce kanji ?",
        questions: [
          { kanji: '一', options: ['un', 'deux', 'trois', 'quatre'], correct: 'un' },
          { kanji: '二', options: ['deux', 'un', 'trois', 'cinq'], correct: 'deux' },
          { kanji: '三', options: ['trois', 'deux', 'quatre', 'cinq'], correct: 'trois' },
          { kanji: '四', options: ['quatre', 'trois', 'cinq', 'six'], correct: 'quatre' },
          { kanji: '五', options: ['cinq', 'quatre', 'six', 'sept'], correct: 'cinq' },
          { kanji: '六', options: ['six', 'cinq', 'sept', 'huit'], correct: 'six' },
          { kanji: '七', options: ['sept', 'six', 'huit', 'neuf'], correct: 'sept' },
          { kanji: '八', options: ['huit', 'sept', 'neuf', 'dix'], correct: 'huit' },
          { kanji: '九', options: ['neuf', 'huit', 'dix', 'six'], correct: 'neuf' },
          { kanji: '十', options: ['dix', 'neuf', 'huit', 'onze'], correct: 'dix' }
        ]
      },
      {
        type: "reading-mcq",
        title: "Lecture ON/KUN",
        instruction: "Quelle est la lecture de ce kanji dans ce contexte ?",
        questions: [
          { kanji: '一人', options: ['ひとり', 'いちにん', 'いちじん', 'ひとじん'], correct: 'ひとり', meaning: 'une personne' },
          { kanji: '二月', options: ['にがつ', 'ふたつき', 'じがつ', 'ふたがつ'], correct: 'にがつ', meaning: 'février' },
          { kanji: '三つ', options: ['みっつ', 'さんつ', 'さみつ', 'みつ'], correct: 'みっつ', meaning: 'trois (objets)' },
          { kanji: '四月', options: ['しがつ', 'よんがつ', 'よつき', 'しつき'], correct: 'しがつ', meaning: 'avril' },
          { kanji: '五人', options: ['ごにん', 'いつにん', 'ごひと', 'いつひと'], correct: 'ごにん', meaning: 'cinq personnes' }
        ]
      },
      {
        type: "vocabulary",
        title: "Vocabulaire avec Kanji",
        instruction: "Lisez ces mots utilisant les kanji appris",
        questions: [
          { word: '一月', reading: 'いちがつ', meaning: 'janvier' },
          { word: '二つ', reading: 'ふたつ', meaning: 'deux (objets)' },
          { word: '三人', reading: 'さんにん', meaning: 'trois personnes' },
          { word: '四つ', reading: 'よっつ', meaning: 'quatre (objets)' },
          { word: '五月', reading: 'ごがつ', meaning: 'mai' },
          { word: '六人', reading: 'ろくにん', meaning: 'six personnes' },
          { word: '七月', reading: 'しちがつ', meaning: 'juillet' },
          { word: '八つ', reading: 'やっつ', meaning: 'huit (objets)' },
          { word: '九人', reading: 'きゅうにん', meaning: 'neuf personnes' },
          { word: '十月', reading: 'じゅうがつ', meaning: 'octobre' }
        ]
      },
      {
        type: "transcription",
        title: "Transcription en Romaji",
        instruction: "Écrivez la lecture en romaji",
        questions: [
          { kanji: '一つ', correct: 'hitotsu', alternatives: [], meaning: 'un (objet)' },
          { kanji: '二人', correct: 'futari', alternatives: [], meaning: 'deux personnes' },
          { kanji: '三月', correct: 'sangatsu', alternatives: [], meaning: 'mars' },
          { kanji: '四人', correct: 'yonin', alternatives: ['yonnin'], meaning: 'quatre personnes' },
          { kanji: '五つ', correct: 'itsutsu', alternatives: [], meaning: 'cinq (objets)' },
          { kanji: '六月', correct: 'rokugatsu', alternatives: [], meaning: 'juin' }
        ]
      }
    ]
  },

  // ===== LEÇON 2 : GRANDS NOMBRES =====
  lesson2: {
    id: "kanji-lesson2",
    title: "Kanji 2 : Grands Nombres",
    description: "百 (100), 千 (1000), 万 (10000), etc.",
    level: "N5",
    free: true,
    kanji: true,
    kanjis: [
      {
        kanji: '百',
        meaning: 'cent, 100',
        onyomi: ['ヒャク'],
        kunyomi: ['もも'],
        strokes: 6,
        strokeOrder: 'https://jisho.org/search/百%20%23kanji',
        mnemonic: 'Un (一) + blanc (白) = 100 fois un',
        examples: [
          { word: '百円', reading: 'ひゃくえん', meaning: '100 yens' },
          { word: '二百', reading: 'にひゃく', meaning: '200' },
          { word: '三百', reading: 'さんびゃく', meaning: '300' }
        ]
      },
      {
        kanji: '千',
        meaning: 'mille, 1000',
        onyomi: ['セン'],
        kunyomi: ['ち'],
        strokes: 3,
        strokeOrder: 'https://jisho.org/search/千%20%23kanji',
        mnemonic: 'Une personne (人) avec un trait = 1000',
        examples: [
          { word: '千円', reading: 'せんえん', meaning: '1000 yens' },
          { word: '二千', reading: 'にせん', meaning: '2000' },
          { word: '三千', reading: 'さんぜん', meaning: '3000' }
        ]
      },
      {
        kanji: '万',
        meaning: 'dix mille, 10000',
        onyomi: ['マン', 'バン'],
        kunyomi: [],
        strokes: 3,
        strokeOrder: 'https://jisho.org/search/万%20%23kanji',
        mnemonic: 'Beaucoup (多) simplifié = 10000',
        examples: [
          { word: '一万円', reading: 'いちまんえん', meaning: '10000 yens' },
          { word: '二万', reading: 'にまん', meaning: '20000' },
          { word: '十万', reading: 'じゅうまん', meaning: '100000' }
        ]
      },
      {
        kanji: '円',
        meaning: 'yen, cercle, rond',
        onyomi: ['エン'],
        kunyomi: ['まる-い'],
        strokes: 4,
        strokeOrder: 'https://jisho.org/search/円%20%23kanji',
        mnemonic: 'Un cercle = monnaie ronde (yen)',
        examples: [
          { word: '円', reading: 'えん', meaning: 'yen (monnaie)' },
          { word: '百円', reading: 'ひゃくえん', meaning: '100 yens' },
          { word: '千円', reading: 'せんえん', meaning: '1000 yens' }
        ]
      }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des Kanji - Grands Nombres",
        instruction: "Apprenez à compter jusqu'à 10000 et utiliser la monnaie japonaise"
      },
      {
        type: "mcq",
        title: "Reconnaissance des Kanji",
        instruction: "Quelle est la signification de ce kanji ?",
        questions: [
          { kanji: '百', options: ['cent', 'mille', 'dix mille', 'dix'], correct: 'cent' },
          { kanji: '千', options: ['mille', 'cent', 'dix mille', 'million'], correct: 'mille' },
          { kanji: '万', options: ['dix mille', 'mille', 'cent mille', 'million'], correct: 'dix mille' },
          { kanji: '円', options: ['yen', 'dollar', 'euro', 'livre'], correct: 'yen' }
        ]
      },
      {
        type: "reading-mcq",
        title: "Lecture des Prix",
        instruction: "Comment lit-on ce prix en japonais ?",
        questions: [
          { kanji: '百円', options: ['ひゃくえん', 'せんえん', 'まんえん', 'ももえん'], correct: 'ひゃくえん', meaning: '100 yens' },
          { kanji: '千円', options: ['せんえん', 'ひゃくえん', 'まんえん', 'ちえん'], correct: 'せんえん', meaning: '1000 yens' },
          { kanji: '一万円', options: ['いちまんえん', 'せんえん', 'じゅうえん', 'ひゃくえん'], correct: 'いちまんえん', meaning: '10000 yens' },
          { kanji: '五百円', options: ['ごひゃくえん', 'ごせんえん', 'いつひゃく', 'ごまん'], correct: 'ごひゃくえん', meaning: '500 yens' }
        ]
      },
      {
        type: "vocabulary",
        title: "Vocabulaire - Prix courants",
        instruction: "Lisez ces prix en japonais",
        questions: [
          { word: '二百円', reading: 'にひゃくえん', meaning: '200 yens' },
          { word: '三百円', reading: 'さんびゃくえん', meaning: '300 yens' },
          { word: '五百円', reading: 'ごひゃくえん', meaning: '500 yens' },
          { word: '千円', reading: 'せんえん', meaning: '1000 yens' },
          { word: '二千円', reading: 'にせんえん', meaning: '2000 yens' },
          { word: '一万円', reading: 'いちまんえん', meaning: '10000 yens' }
        ]
      }
    ]
  },

  // ===== LEÇON 3 : TEMPS (日、月、年 etc.) =====
  lesson3: {
    id: "kanji-lesson3",
    title: "Kanji 3 : Temps",
    description: "日, 月, 年, 時, 分, 曜, 今, 昨, 明, 毎",
    level: "N5",
    free: true,
    kanji: true,
    kanjis: [
      {
        kanji: '日',
        meaning: 'jour, soleil',
        onyomi: ['ニチ', 'ジツ'],
        kunyomi: ['ひ', 'か'],
        strokes: 4,
        strokeOrder: 'https://jisho.org/search/日%20%23kanji',
        mnemonic: 'Le soleil avec un trait au centre',
        examples: [
          { word: '日本', reading: 'にほん', meaning: 'Japon' },
          { word: '今日', reading: 'きょう', meaning: 'aujourd\'hui' },
          { word: '毎日', reading: 'まいにち', meaning: 'chaque jour' }
        ]
      },
      {
        kanji: '月',
        meaning: 'mois, lune',
        onyomi: ['ゲツ', 'ガツ'],
        kunyomi: ['つき'],
        strokes: 4,
        strokeOrder: 'https://jisho.org/search/月%20%23kanji',
        mnemonic: 'Croissant de lune',
        examples: [
          { word: '月曜日', reading: 'げつようび', meaning: 'lundi' },
          { word: '一月', reading: 'いちがつ', meaning: 'janvier' },
          { word: '毎月', reading: 'まいつき', meaning: 'chaque mois' }
        ]
      },
      {
        kanji: '年',
        meaning: 'année',
        onyomi: ['ネン'],
        kunyomi: ['とし'],
        strokes: 6,
        strokeOrder: 'https://jisho.org/search/年%20%23kanji',
        mnemonic: 'Une personne portant une charge = une année de vie',
        examples: [
          { word: '今年', reading: 'ことし', meaning: 'cette année' },
          { word: '去年', reading: 'きょねん', meaning: 'l\'année dernière' },
          { word: '来年', reading: 'らいねん', meaning: 'l\'année prochaine' }
        ]
      },
      {
        kanji: '時',
        meaning: 'temps, heure',
        onyomi: ['ジ'],
        kunyomi: ['とき'],
        strokes: 10,
        strokeOrder: 'https://jisho.org/search/時%20%23kanji',
        mnemonic: '日 (soleil) + 寺 (temple) = heure du temple',
        examples: [
          { word: '時間', reading: 'じかん', meaning: 'temps, heure' },
          { word: '三時', reading: 'さんじ', meaning: '3 heures' },
          { word: '何時', reading: 'なんじ', meaning: 'quelle heure' }
        ]
      },
      {
        kanji: '分',
        meaning: 'minute, diviser',
        onyomi: ['フン', 'ブン', 'ブ'],
        kunyomi: ['わ-ける', 'わ-かる'],
        strokes: 4,
        strokeOrder: 'https://jisho.org/search/分%20%23kanji',
        mnemonic: 'Un couteau (八) coupant (|) = diviser',
        examples: [
          { word: '十分', reading: 'じゅっぷん', meaning: '10 minutes' },
          { word: '三十分', reading: 'さんじゅっぷん', meaning: '30 minutes' },
          { word: '分かる', reading: 'わかる', meaning: 'comprendre' }
        ]
      },
      {
        kanji: '曜',
        meaning: 'jour de la semaine',
        onyomi: ['ヨウ'],
        kunyomi: [],
        strokes: 18,
        strokeOrder: 'https://jisho.org/search/曜%20%23kanji',
        mnemonic: '日 (jour) + élément complexe = jour de la semaine',
        examples: [
          { word: '月曜日', reading: 'げつようび', meaning: 'lundi' },
          { word: '火曜日', reading: 'かようび', meaning: 'mardi' },
          { word: '何曜日', reading: 'なんようび', meaning: 'quel jour' }
        ]
      },
      {
        kanji: '今',
        meaning: 'maintenant',
        onyomi: ['コン', 'キン'],
        kunyomi: ['いま'],
        strokes: 4,
        strokeOrder: 'https://jisho.org/search/今%20%23kanji',
        mnemonic: 'Couvercle sur le présent',
        examples: [
          { word: '今', reading: 'いま', meaning: 'maintenant' },
          { word: '今日', reading: 'きょう', meaning: 'aujourd\'hui' },
          { word: '今年', reading: 'ことし', meaning: 'cette année' }
        ]
      },
      {
        kanji: '昨',
        meaning: 'passé, hier',
        onyomi: ['サク'],
        kunyomi: [],
        strokes: 9,
        strokeOrder: 'https://jisho.org/search/昨%20%23kanji',
        mnemonic: '日 (jour) + 作 (faire) = jour passé',
        examples: [
          { word: '昨日', reading: 'きのう', meaning: 'hier' },
          { word: '昨年', reading: 'さくねん', meaning: 'l\'année dernière' },
          { word: '昨夜', reading: 'さくや', meaning: 'hier soir' }
        ]
      },
      {
        kanji: '明',
        meaning: 'lumineux, demain',
        onyomi: ['メイ', 'ミョウ'],
        kunyomi: ['あ-かり', 'あか-るい'],
        strokes: 8,
        strokeOrder: 'https://jisho.org/search/明%20%23kanji',
        mnemonic: '日 (soleil) + 月 (lune) = lumineux',
        examples: [
          { word: '明日', reading: 'あした', meaning: 'demain' },
          { word: '明るい', reading: 'あかるい', meaning: 'lumineux' },
          { word: '説明', reading: 'せつめい', meaning: 'explication' }
        ]
      },
      {
        kanji: '毎',
        meaning: 'chaque',
        onyomi: ['マイ'],
        kunyomi: [],
        strokes: 6,
        strokeOrder: 'https://jisho.org/search/毎%20%23kanji',
        mnemonic: 'Personnage avec chapeau = chaque',
        examples: [
          { word: '毎日', reading: 'まいにち', meaning: 'chaque jour' },
          { word: '毎朝', reading: 'まいあさ', meaning: 'chaque matin' },
          { word: '毎週', reading: 'まいしゅう', meaning: 'chaque semaine' }
        ]
      }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des Kanji - Temps",
        instruction: "Apprenez à exprimer le temps en japonais"
      },
      {
        type: "mcq",
        title: "Reconnaissance des Kanji",
        instruction: "Quelle est la signification de ce kanji ?",
        questions: [
          { kanji: '日', options: ['jour', 'mois', 'année', 'heure'], correct: 'jour' },
          { kanji: '月', options: ['mois', 'jour', 'année', 'semaine'], correct: 'mois' },
          { kanji: '年', options: ['année', 'mois', 'jour', 'heure'], correct: 'année' },
          { kanji: '時', options: ['heure', 'minute', 'jour', 'mois'], correct: 'heure' },
          { kanji: '今', options: ['maintenant', 'hier', 'demain', 'toujours'], correct: 'maintenant' }
        ]
      },
      {
        type: "reading-mcq",
        title: "Lecture du Temps",
        instruction: "Comment lit-on ce mot ?",
        questions: [
          { kanji: '今日', options: ['きょう', 'こんにち', 'いまひ', 'きょうひ'], correct: 'きょう', meaning: 'aujourd\'hui' },
          { kanji: '昨日', options: ['きのう', 'さくじつ', 'さくにち', 'きさく'], correct: 'きのう', meaning: 'hier' },
          { kanji: '明日', options: ['あした', 'めいにち', 'あかるひ', 'みょうひ'], correct: 'あした', meaning: 'demain' },
          { kanji: '毎日', options: ['まいにち', 'まいひ', 'ごとひ', 'ごとにち'], correct: 'まいにち', meaning: 'chaque jour' }
        ]
      },
      {
        type: "vocabulary",
        title: "Vocabulaire - Expressions temporelles",
        instruction: "Lisez ces expressions",
        questions: [
          { word: '今年', reading: 'ことし', meaning: 'cette année' },
          { word: '来年', reading: 'らいねん', meaning: 'l\'année prochaine' },
          { word: '時間', reading: 'じかん', meaning: 'temps, heure' },
          { word: '十分', reading: 'じゅっぷん', meaning: '10 minutes' },
          { word: '月曜日', reading: 'げつようび', meaning: 'lundi' }
        ]
      }
    ]
  },

  // ===== LEÇON 4 : DIRECTIONS & POSITIONS =====
  lesson4: {
    id: "kanji-lesson4",
    title: "Kanji 4 : Directions & Positions",
    description: "上, 下, 左, 右, 中, 外, 前, 後, 東, 西, 南, 北",
    level: "N5",
    free: true,
    kanji: true,
    kanjis: [
      {
        kanji: '上',
        meaning: 'dessus, haut',
        onyomi: ['ジョウ'],
        kunyomi: ['うえ', 'あ-がる', 'あ-げる'],
        strokes: 3,
        strokeOrder: 'https://jisho.org/search/上%20%23kanji',
        mnemonic: 'Une ligne au-dessus d\'une autre',
        examples: [
          { word: '上', reading: 'うえ', meaning: 'dessus' },
          { word: '上げる', reading: 'あげる', meaning: 'lever, donner' },
          { word: '上手', reading: 'じょうず', meaning: 'habile' }
        ]
      },
      {
        kanji: '下',
        meaning: 'dessous, bas',
        onyomi: ['カ', 'ゲ'],
        kunyomi: ['した', 'さ-がる', 'さ-げる', 'お-りる'],
        strokes: 3,
        strokeOrder: 'https://jisho.org/search/下%20%23kanji',
        mnemonic: 'Une ligne en-dessous d\'une autre',
        examples: [
          { word: '下', reading: 'した', meaning: 'dessous' },
          { word: '下さい', reading: 'ください', meaning: 's\'il vous plaît (donnez)' },
          { word: '下手', reading: 'へた', meaning: 'maladroit' }
        ]
      },
      {
        kanji: '左',
        meaning: 'gauche',
        onyomi: ['サ'],
        kunyomi: ['ひだり'],
        strokes: 5,
        strokeOrder: 'https://jisho.org/search/左%20%23kanji',
        mnemonic: 'Main gauche tenant un outil',
        examples: [
          { word: '左', reading: 'ひだり', meaning: 'gauche' },
          { word: '左手', reading: 'ひだりて', meaning: 'main gauche' },
          { word: '左側', reading: 'ひだりがわ', meaning: 'côté gauche' }
        ]
      },
      {
        kanji: '右',
        meaning: 'droite',
        onyomi: ['ウ', 'ユウ'],
        kunyomi: ['みぎ'],
        strokes: 5,
        strokeOrder: 'https://jisho.org/search/右%20%23kanji',
        mnemonic: 'Main droite et bouche',
        examples: [
          { word: '右', reading: 'みぎ', meaning: 'droite' },
          { word: '右手', reading: 'みぎて', meaning: 'main droite' },
          { word: '右側', reading: 'みぎがわ', meaning: 'côté droit' }
        ]
      },
      {
        kanji: '中',
        meaning: 'milieu, intérieur',
        onyomi: ['チュウ'],
        kunyomi: ['なか'],
        strokes: 4,
        strokeOrder: 'https://jisho.org/search/中%20%23kanji',
        mnemonic: 'Une ligne au milieu d\'un carré',
        examples: [
          { word: '中', reading: 'なか', meaning: 'intérieur' },
          { word: '中国', reading: 'ちゅうごく', meaning: 'Chine' },
          { word: '一日中', reading: 'いちにちじゅう', meaning: 'toute la journée' }
        ]
      },
      {
        kanji: '外',
        meaning: 'extérieur, dehors',
        onyomi: ['ガイ', 'ゲ'],
        kunyomi: ['そと', 'ほか'],
        strokes: 5,
        strokeOrder: 'https://jisho.org/search/外%20%23kanji',
        mnemonic: 'Divination du dehors',
        examples: [
          { word: '外', reading: 'そと', meaning: 'dehors' },
          { word: '外国', reading: 'がいこく', meaning: 'pays étranger' },
          { word: '海外', reading: 'かいがい', meaning: 'outre-mer' }
        ]
      },
      {
        kanji: '前',
        meaning: 'devant, avant',
        onyomi: ['ゼン'],
        kunyomi: ['まえ'],
        strokes: 9,
        strokeOrder: 'https://jisho.org/search/前%20%23kanji',
        mnemonic: 'Bateau avançant',
        examples: [
          { word: '前', reading: 'まえ', meaning: 'devant' },
          { word: '名前', reading: 'なまえ', meaning: 'nom' },
          { word: '午前', reading: 'ごぜん', meaning: 'matin (AM)' }
        ]
      },
      {
        kanji: '後',
        meaning: 'derrière, après',
        onyomi: ['ゴ', 'コウ'],
        kunyomi: ['うし-ろ', 'あと', 'のち'],
        strokes: 9,
        strokeOrder: 'https://jisho.org/search/後%20%23kanji',
        mnemonic: 'Marcher derrière',
        examples: [
          { word: '後ろ', reading: 'うしろ', meaning: 'derrière' },
          { word: '午後', reading: 'ごご', meaning: 'après-midi (PM)' },
          { word: '後で', reading: 'あとで', meaning: 'plus tard' }
        ]
      },
      {
        kanji: '東',
        meaning: 'est',
        onyomi: ['トウ'],
        kunyomi: ['ひがし'],
        strokes: 8,
        strokeOrder: 'https://jisho.org/search/東%20%23kanji',
        mnemonic: 'Soleil (日) derrière un arbre (木) = est',
        examples: [
          { word: '東', reading: 'ひがし', meaning: 'est' },
          { word: '東京', reading: 'とうきょう', meaning: 'Tokyo' },
          { word: '関東', reading: 'かんとう', meaning: 'Kantō (région)' }
        ]
      },
      {
        kanji: '西',
        meaning: 'ouest',
        onyomi: ['セイ', 'サイ'],
        kunyomi: ['にし'],
        strokes: 6,
        strokeOrder: 'https://jisho.org/search/西%20%23kanji',
        mnemonic: 'Oiseau dans son nid = ouest',
        examples: [
          { word: '西', reading: 'にし', meaning: 'ouest' },
          { word: '関西', reading: 'かんさい', meaning: 'Kansai (région)' },
          { word: '西洋', reading: 'せいよう', meaning: 'occident' }
        ]
      },
      {
        kanji: '南',
        meaning: 'sud',
        onyomi: ['ナン'],
        kunyomi: ['みなみ'],
        strokes: 9,
        strokeOrder: 'https://jisho.org/search/南%20%23kanji',
        mnemonic: 'Plante poussant vers le sud',
        examples: [
          { word: '南', reading: 'みなみ', meaning: 'sud' },
          { word: '南口', reading: 'みなみぐち', meaning: 'sortie sud' },
          { word: '東南アジア', reading: 'とうなんあじあ', meaning: 'Asie du Sud-Est' }
        ]
      },
      {
        kanji: '北',
        meaning: 'nord',
        onyomi: ['ホク'],
        kunyomi: ['きた'],
        strokes: 5,
        strokeOrder: 'https://jisho.org/search/北%20%23kanji',
        mnemonic: 'Deux personnes dos à dos = nord',
        examples: [
          { word: '北', reading: 'きた', meaning: 'nord' },
          { word: '北口', reading: 'きたぐち', meaning: 'sortie nord' },
          { word: '東北', reading: 'とうほく', meaning: 'Tōhoku (région)' }
        ]
      }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des Kanji - Directions",
        instruction: "Apprenez à vous orienter en japonais"
      },
      {
        type: "mcq",
        title: "Reconnaissance des Kanji",
        instruction: "Quelle est la signification de ce kanji ?",
        questions: [
          { kanji: '上', options: ['dessus', 'dessous', 'gauche', 'droite'], correct: 'dessus' },
          { kanji: '下', options: ['dessous', 'dessus', 'gauche', 'droite'], correct: 'dessous' },
          { kanji: '左', options: ['gauche', 'droite', 'haut', 'bas'], correct: 'gauche' },
          { kanji: '右', options: ['droite', 'gauche', 'haut', 'bas'], correct: 'droite' },
          { kanji: '中', options: ['milieu', 'extérieur', 'avant', 'après'], correct: 'milieu' },
          { kanji: '東', options: ['est', 'ouest', 'nord', 'sud'], correct: 'est' }
        ]
      },
      {
        type: "vocabulary",
        title: "Vocabulaire - Positions",
        instruction: "Lisez ces mots de position",
        questions: [
          { word: '上手', reading: 'じょうず', meaning: 'habile' },
          { word: '下さい', reading: 'ください', meaning: 's\'il vous plaît' },
          { word: '名前', reading: 'なまえ', meaning: 'nom' },
          { word: '午後', reading: 'ごご', meaning: 'après-midi' },
          { word: '東京', reading: 'とうきょう', meaning: 'Tokyo' }
        ]
      }
    ]
  },

  // ===== LEÇON 5 : NATURE =====
  lesson5: {
    id: "kanji-lesson5",
    title: "Kanji 5 : Nature",
    description: "山, 川, 木, 水, 火, 土, 天, 雨, 花, 車",
    level: "N5",
    free: true,
    kanji: true,
    kanjis: [
      {
        kanji: '山',
        meaning: 'montagne',
        onyomi: ['サン'],
        kunyomi: ['やま'],
        strokes: 3,
        strokeOrder: 'https://jisho.org/search/山%20%23kanji',
        mnemonic: 'Trois pics de montagne',
        examples: [
          { word: '山', reading: 'やま', meaning: 'montagne' },
          { word: '富士山', reading: 'ふじさん', meaning: 'Mont Fuji' },
          { word: '登山', reading: 'とざん', meaning: 'alpinisme' }
        ]
      },
      {
        kanji: '川',
        meaning: 'rivière',
        onyomi: ['セン'],
        kunyomi: ['かわ'],
        strokes: 3,
        strokeOrder: 'https://jisho.org/search/川%20%23kanji',
        mnemonic: 'Trois flux d\'eau = rivière',
        examples: [
          { word: '川', reading: 'かわ', meaning: 'rivière' },
          { word: '小川', reading: 'おがわ', meaning: 'ruisseau' },
          { word: '川口', reading: 'かわぐち', meaning: 'embouchure' }
        ]
      },
      {
        kanji: '木',
        meaning: 'arbre, bois',
        onyomi: ['モク', 'ボク'],
        kunyomi: ['き'],
        strokes: 4,
        strokeOrder: 'https://jisho.org/search/木%20%23kanji',
        mnemonic: 'Un arbre avec des branches',
        examples: [
          { word: '木', reading: 'き', meaning: 'arbre' },
          { word: '木曜日', reading: 'もくようび', meaning: 'jeudi' },
          { word: '木材', reading: 'もくざい', meaning: 'bois (matériau)' }
        ]
      },
      {
        kanji: '水',
        meaning: 'eau',
        onyomi: ['スイ'],
        kunyomi: ['みず'],
        strokes: 4,
        strokeOrder: 'https://jisho.org/search/水%20%23kanji',
        mnemonic: 'Gouttes d\'eau qui coulent',
        examples: [
          { word: '水', reading: 'みず', meaning: 'eau' },
          { word: '水曜日', reading: 'すいようび', meaning: 'mercredi' },
          { word: '水道', reading: 'すいどう', meaning: 'eau courante' }
        ]
      },
      {
        kanji: '火',
        meaning: 'feu',
        onyomi: ['カ'],
        kunyomi: ['ひ'],
        strokes: 4,
        strokeOrder: 'https://jisho.org/search/火%20%23kanji',
        mnemonic: 'Personne avec des flammes',
        examples: [
          { word: '火', reading: 'ひ', meaning: 'feu' },
          { word: '火曜日', reading: 'かようび', meaning: 'mardi' },
          { word: '花火', reading: 'はなび', meaning: 'feu d\'artifice' }
        ]
      },
      {
        kanji: '土',
        meaning: 'terre, sol',
        onyomi: ['ド', 'ト'],
        kunyomi: ['つち'],
        strokes: 3,
        strokeOrder: 'https://jisho.org/search/土%20%23kanji',
        mnemonic: 'Sol avec une croix',
        examples: [
          { word: '土', reading: 'つち', meaning: 'terre' },
          { word: '土曜日', reading: 'どようび', meaning: 'samedi' },
          { word: '土地', reading: 'とち', meaning: 'terrain' }
        ]
      },
      {
        kanji: '天',
        meaning: 'ciel, paradis',
        onyomi: ['テン'],
        kunyomi: ['あま', 'あめ'],
        strokes: 4,
        strokeOrder: 'https://jisho.org/search/天%20%23kanji',
        mnemonic: 'Personne étendue = ciel',
        examples: [
          { word: '天気', reading: 'てんき', meaning: 'météo' },
          { word: '天国', reading: 'てんごく', meaning: 'paradis' },
          { word: '天才', reading: 'てんさい', meaning: 'génie' }
        ]
      },
      {
        kanji: '雨',
        meaning: 'pluie',
        onyomi: ['ウ'],
        kunyomi: ['あめ', 'あま'],
        strokes: 8,
        strokeOrder: 'https://jisho.org/search/雨%20%23kanji',
        mnemonic: 'Nuage avec des gouttes de pluie',
        examples: [
          { word: '雨', reading: 'あめ', meaning: 'pluie' },
          { word: '大雨', reading: 'おおあめ', meaning: 'forte pluie' },
          { word: '梅雨', reading: 'つゆ', meaning: 'saison des pluies' }
        ]
      },
      {
        kanji: '花',
        meaning: 'fleur',
        onyomi: ['カ'],
        kunyomi: ['はな'],
        strokes: 7,
        strokeOrder: 'https://jisho.org/search/花%20%23kanji',
        mnemonic: 'Plante qui fleurit',
        examples: [
          { word: '花', reading: 'はな', meaning: 'fleur' },
          { word: '花見', reading: 'はなみ', meaning: 'admirer les cerisiers' },
          { word: '生け花', reading: 'いけばな', meaning: 'ikebana (art floral)' }
        ]
      },
      {
        kanji: '車',
        meaning: 'voiture, véhicule',
        onyomi: ['シャ'],
        kunyomi: ['くるま'],
        strokes: 7,
        strokeOrder: 'https://jisho.org/search/車%20%23kanji',
        mnemonic: 'Chariot vu de dessus',
        examples: [
          { word: '車', reading: 'くるま', meaning: 'voiture' },
          { word: '電車', reading: 'でんしゃ', meaning: 'train' },
          { word: '自転車', reading: 'じてんしゃ', meaning: 'vélo' }
        ]
      }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des Kanji - Nature",
        instruction: "Découvrez les kanji liés à la nature"
      },
      {
        type: "mcq",
        title: "Reconnaissance des Kanji",
        instruction: "Quelle est la signification de ce kanji ?",
        questions: [
          { kanji: '山', options: ['montagne', 'rivière', 'arbre', 'mer'], correct: 'montagne' },
          { kanji: '川', options: ['rivière', 'montagne', 'mer', 'lac'], correct: 'rivière' },
          { kanji: '木', options: ['arbre', 'fleur', 'herbe', 'feuille'], correct: 'arbre' },
          { kanji: '水', options: ['eau', 'feu', 'terre', 'air'], correct: 'eau' },
          { kanji: '火', options: ['feu', 'eau', 'terre', 'air'], correct: 'feu' },
          { kanji: '花', options: ['fleur', 'arbre', 'herbe', 'fruit'], correct: 'fleur' }
        ]
      },
      {
        type: "vocabulary",
        title: "Vocabulaire - Nature",
        instruction: "Lisez ces mots de la nature",
        questions: [
          { word: '天気', reading: 'てんき', meaning: 'météo' },
          { word: '電車', reading: 'でんしゃ', meaning: 'train' },
          { word: '花見', reading: 'はなみ', meaning: 'admirer les cerisiers' },
          { word: '火曜日', reading: 'かようび', meaning: 'mardi' },
          { word: '水曜日', reading: 'すいようび', meaning: 'mercredi' },
          { word: '木曜日', reading: 'もくようび', meaning: 'jeudi' }
        ]
      }
    ]
  },

  // ===== LEÇON 6 : PERSONNES & FAMILLE =====
  lesson6: {
    id: "kanji-lesson6",
    title: "Kanji 6 : Personnes & Famille",
    description: "人, 男, 女, 子, 父, 母, 友, 先, 生, 名",
    level: "N5",
    free: true,
    kanji: true,
    kanjis: [
      {
        kanji: '人',
        meaning: 'personne, être humain',
        onyomi: ['ジン', 'ニン'],
        kunyomi: ['ひと'],
        strokes: 2,
        strokeOrder: 'https://jisho.org/search/人%20%23kanji',
        mnemonic: 'Deux jambes d\'une personne debout',
        examples: [
          { word: '人', reading: 'ひと', meaning: 'personne' },
          { word: '日本人', reading: 'にほんじん', meaning: 'Japonais' },
          { word: '二人', reading: 'ふたり', meaning: 'deux personnes' }
        ]
      },
      {
        kanji: '男',
        meaning: 'homme',
        onyomi: ['ダン', 'ナン'],
        kunyomi: ['おとこ'],
        strokes: 7,
        strokeOrder: 'https://jisho.org/search/男%20%23kanji',
        mnemonic: 'Force (力) dans un champ (田) = homme',
        examples: [
          { word: '男', reading: 'おとこ', meaning: 'homme' },
          { word: '男の子', reading: 'おとこのこ', meaning: 'garçon' },
          { word: '長男', reading: 'ちょうなん', meaning: 'fils aîné' }
        ]
      },
      {
        kanji: '女',
        meaning: 'femme',
        onyomi: ['ジョ', 'ニョ'],
        kunyomi: ['おんな', 'め'],
        strokes: 3,
        strokeOrder: 'https://jisho.org/search/女%20%23kanji',
        mnemonic: 'Femme agenouillée',
        examples: [
          { word: '女', reading: 'おんな', meaning: 'femme' },
          { word: '女の子', reading: 'おんなのこ', meaning: 'fille' },
          { word: '美女', reading: 'びじょ', meaning: 'belle femme' }
        ]
      },
      {
        kanji: '子',
        meaning: 'enfant',
        onyomi: ['シ', 'ス'],
        kunyomi: ['こ'],
        strokes: 3,
        strokeOrder: 'https://jisho.org/search/子%20%23kanji',
        mnemonic: 'Bébé emmailloté',
        examples: [
          { word: '子供', reading: 'こども', meaning: 'enfant' },
          { word: '男の子', reading: 'おとこのこ', meaning: 'garçon' },
          { word: '椅子', reading: 'いす', meaning: 'chaise' }
        ]
      },
      {
        kanji: '父',
        meaning: 'père',
        onyomi: ['フ'],
        kunyomi: ['ちち'],
        strokes: 4,
        strokeOrder: 'https://jisho.org/search/父%20%23kanji',
        mnemonic: 'Personne avec une hache = père',
        examples: [
          { word: '父', reading: 'ちち', meaning: 'père' },
          { word: 'お父さん', reading: 'おとうさん', meaning: 'papa' },
          { word: '父親', reading: 'ちちおや', meaning: 'père (parent)' }
        ]
      },
      {
        kanji: '母',
        meaning: 'mère',
        onyomi: ['ボ'],
        kunyomi: ['はは'],
        strokes: 5,
        strokeOrder: 'https://jisho.org/search/母%20%23kanji',
        mnemonic: 'Femme avec deux seins = mère',
        examples: [
          { word: '母', reading: 'はは', meaning: 'mère' },
          { word: 'お母さん', reading: 'おかあさん', meaning: 'maman' },
          { word: '母親', reading: 'ははおや', meaning: 'mère (parent)' }
        ]
      },
      {
        kanji: '友',
        meaning: 'ami',
        onyomi: ['ユウ'],
        kunyomi: ['とも'],
        strokes: 4,
        strokeOrder: 'https://jisho.org/search/友%20%23kanji',
        mnemonic: 'Deux mains qui se serrent = amis',
        examples: [
          { word: '友達', reading: 'ともだち', meaning: 'ami' },
          { word: '友人', reading: 'ゆうじん', meaning: 'ami (formel)' },
          { word: '親友', reading: 'しんゆう', meaning: 'meilleur ami' }
        ]
      },
      {
        kanji: '先',
        meaning: 'avant, précédent',
        onyomi: ['セン'],
        kunyomi: ['さき'],
        strokes: 6,
        strokeOrder: 'https://jisho.org/search/先%20%23kanji',
        mnemonic: 'Jambes avançant = avant',
        examples: [
          { word: '先生', reading: 'せんせい', meaning: 'professeur' },
          { word: '先週', reading: 'せんしゅう', meaning: 'la semaine dernière' },
          { word: '先月', reading: 'せんげつ', meaning: 'le mois dernier' }
        ]
      },
      {
        kanji: '生',
        meaning: 'naissance, vie',
        onyomi: ['セイ', 'ショウ'],
        kunyomi: ['い-きる', 'う-まれる', 'なま'],
        strokes: 5,
        strokeOrder: 'https://jisho.org/search/生%20%23kanji',
        mnemonic: 'Plante poussant = vie',
        examples: [
          { word: '先生', reading: 'せんせい', meaning: 'professeur' },
          { word: '学生', reading: 'がくせい', meaning: 'étudiant' },
          { word: '生きる', reading: 'いきる', meaning: 'vivre' }
        ]
      },
      {
        kanji: '名',
        meaning: 'nom',
        onyomi: ['メイ', 'ミョウ'],
        kunyomi: ['な'],
        strokes: 6,
        strokeOrder: 'https://jisho.org/search/名%20%23kanji',
        mnemonic: 'Bouche (口) dans le noir = nom',
        examples: [
          { word: '名前', reading: 'なまえ', meaning: 'nom' },
          { word: '有名', reading: 'ゆうめい', meaning: 'célèbre' },
          { word: '名刺', reading: 'めいし', meaning: 'carte de visite' }
        ]
      }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des Kanji - Personnes",
        instruction: "Apprenez les kanji pour parler des personnes"
      },
      {
        type: "mcq",
        title: "Reconnaissance des Kanji",
        instruction: "Quelle est la signification de ce kanji ?",
        questions: [
          { kanji: '人', options: ['personne', 'homme', 'femme', 'enfant'], correct: 'personne' },
          { kanji: '男', options: ['homme', 'femme', 'enfant', 'père'], correct: 'homme' },
          { kanji: '女', options: ['femme', 'homme', 'enfant', 'mère'], correct: 'femme' },
          { kanji: '子', options: ['enfant', 'adulte', 'bébé', 'personne'], correct: 'enfant' },
          { kanji: '父', options: ['père', 'mère', 'frère', 'sœur'], correct: 'père' },
          { kanji: '母', options: ['mère', 'père', 'sœur', 'frère'], correct: 'mère' }
        ]
      },
      {
        type: "vocabulary",
        title: "Vocabulaire - Famille",
        instruction: "Lisez ces mots de famille",
        questions: [
          { word: '先生', reading: 'せんせい', meaning: 'professeur' },
          { word: '学生', reading: 'がくせい', meaning: 'étudiant' },
          { word: '友達', reading: 'ともだち', meaning: 'ami' },
          { word: '名前', reading: 'なまえ', meaning: 'nom' },
          { word: '子供', reading: 'こども', meaning: 'enfant' }
        ]
      }
    ]
  },

  // ===== LEÇON 7 : ACTIONS & VERBES =====
  lesson7: {
    id: "kanji-lesson7",
    title: "Kanji 7 : Actions & Verbes",
    description: "見, 聞, 食, 飲, 行, 来, 出, 入, 書, 読, 話, 買",
    level: "N5",
    free: true,
    kanji: true,
    kanjis: [
      {
        kanji: '見',
        meaning: 'voir',
        onyomi: ['ケン'],
        kunyomi: ['み-る'],
        strokes: 7,
        strokeOrder: 'https://jisho.org/search/見%20%23kanji',
        mnemonic: 'Œil (目) avec des jambes = voir',
        examples: [
          { word: '見る', reading: 'みる', meaning: 'voir' },
          { word: '花見', reading: 'はなみ', meaning: 'admirer les fleurs' },
          { word: '見学', reading: 'けんがく', meaning: 'visite (éducative)' }
        ]
      },
      {
        kanji: '聞',
        meaning: 'entendre, demander',
        onyomi: ['ブン', 'モン'],
        kunyomi: ['き-く'],
        strokes: 14,
        strokeOrder: 'https://jisho.org/search/聞%20%23kanji',
        mnemonic: 'Oreille à la porte = entendre',
        examples: [
          { word: '聞く', reading: 'きく', meaning: 'écouter, entendre' },
          { word: '新聞', reading: 'しんぶん', meaning: 'journal' },
          { word: '聞こえる', reading: 'きこえる', meaning: 'être audible' }
        ]
      },
      {
        kanji: '食',
        meaning: 'manger',
        onyomi: ['ショク', 'ジキ'],
        kunyomi: ['た-べる', 'く-う'],
        strokes: 9,
        strokeOrder: 'https://jisho.org/search/食%20%23kanji',
        mnemonic: 'Personne avec un bon repas',
        examples: [
          { word: '食べる', reading: 'たべる', meaning: 'manger' },
          { word: '食事', reading: 'しょくじ', meaning: 'repas' },
          { word: '夕食', reading: 'ゆうしょく', meaning: 'dîner' }
        ]
      },
      {
        kanji: '飲',
        meaning: 'boire',
        onyomi: ['イン'],
        kunyomi: ['の-む'],
        strokes: 12,
        strokeOrder: 'https://jisho.org/search/飲%20%23kanji',
        mnemonic: 'Nourriture (食) qui entre = boire',
        examples: [
          { word: '飲む', reading: 'のむ', meaning: 'boire' },
          { word: '飲み物', reading: 'のみもの', meaning: 'boisson' },
          { word: '飲料', reading: 'いんりょう', meaning: 'boisson (formel)' }
        ]
      },
      {
        kanji: '行',
        meaning: 'aller',
        onyomi: ['コウ', 'ギョウ'],
        kunyomi: ['い-く', 'ゆ-く'],
        strokes: 6,
        strokeOrder: 'https://jisho.org/search/行%20%23kanji',
        mnemonic: 'Intersection = aller',
        examples: [
          { word: '行く', reading: 'いく', meaning: 'aller' },
          { word: '銀行', reading: 'ぎんこう', meaning: 'banque' },
          { word: '旅行', reading: 'りょこう', meaning: 'voyage' }
        ]
      },
      {
        kanji: '来',
        meaning: 'venir',
        onyomi: ['ライ'],
        kunyomi: ['く-る', 'き-たる'],
        strokes: 7,
        strokeOrder: 'https://jisho.org/search/来%20%23kanji',
        mnemonic: 'Grain de riz qui vient',
        examples: [
          { word: '来る', reading: 'くる', meaning: 'venir' },
          { word: '来年', reading: 'らいねん', meaning: 'l\'année prochaine' },
          { word: '未来', reading: 'みらい', meaning: 'futur' }
        ]
      },
      {
        kanji: '出',
        meaning: 'sortir',
        onyomi: ['シュツ', 'スイ'],
        kunyomi: ['で-る', 'だ-す'],
        strokes: 5,
        strokeOrder: 'https://jisho.org/search/出%20%23kanji',
        mnemonic: 'Pousse sortant de terre',
        examples: [
          { word: '出る', reading: 'でる', meaning: 'sortir' },
          { word: '出す', reading: 'だす', meaning: 'faire sortir' },
          { word: '出口', reading: 'でぐち', meaning: 'sortie' }
        ]
      },
      {
        kanji: '入',
        meaning: 'entrer',
        onyomi: ['ニュウ'],
        kunyomi: ['い-る', 'はい-る'],
        strokes: 2,
        strokeOrder: 'https://jisho.org/search/入%20%23kanji',
        mnemonic: 'Flèche vers l\'intérieur = entrer',
        examples: [
          { word: '入る', reading: 'はいる', meaning: 'entrer' },
          { word: '入口', reading: 'いりぐち', meaning: 'entrée' },
          { word: '入学', reading: 'にゅうがく', meaning: 'admission (école)' }
        ]
      },
      {
        kanji: '書',
        meaning: 'écrire',
        onyomi: ['ショ'],
        kunyomi: ['か-く'],
        strokes: 10,
        strokeOrder: 'https://jisho.org/search/書%20%23kanji',
        mnemonic: 'Pinceau écrivant',
        examples: [
          { word: '書く', reading: 'かく', meaning: 'écrire' },
          { word: '辞書', reading: 'じしょ', meaning: 'dictionnaire' },
          { word: '教科書', reading: 'きょうかしょ', meaning: 'manuel scolaire' }
        ]
      },
      {
        kanji: '読',
        meaning: 'lire',
        onyomi: ['ドク', 'トク', 'トウ'],
        kunyomi: ['よ-む'],
        strokes: 14,
        strokeOrder: 'https://jisho.org/search/読%20%23kanji',
        mnemonic: 'Parler (言) en vendant (売) = lire',
        examples: [
          { word: '読む', reading: 'よむ', meaning: 'lire' },
          { word: '読書', reading: 'どくしょ', meaning: 'lecture' },
          { word: '音読', reading: 'おんどく', meaning: 'lecture à voix haute' }
        ]
      },
      {
        kanji: '話',
        meaning: 'parler',
        onyomi: ['ワ'],
        kunyomi: ['はな-す', 'はなし'],
        strokes: 13,
        strokeOrder: 'https://jisho.org/search/話%20%23kanji',
        mnemonic: 'Paroles (言) + langue (舌) = parler',
        examples: [
          { word: '話す', reading: 'はなす', meaning: 'parler' },
          { word: '話', reading: 'はなし', meaning: 'histoire, conversation' },
          { word: '電話', reading: 'でんわ', meaning: 'téléphone' }
        ]
      },
      {
        kanji: '買',
        meaning: 'acheter',
        onyomi: ['バイ'],
        kunyomi: ['か-う'],
        strokes: 12,
        strokeOrder: 'https://jisho.org/search/買%20%23kanji',
        mnemonic: 'Filet (网) + coquillage (貝) = acheter',
        examples: [
          { word: '買う', reading: 'かう', meaning: 'acheter' },
          { word: '買い物', reading: 'かいもの', meaning: 'shopping' },
          { word: '売買', reading: 'ばいばい', meaning: 'achat et vente' }
        ]
      }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des Kanji - Actions",
        instruction: "Apprenez les verbes d\'action essentiels"
      },
      {
        type: "mcq",
        title: "Reconnaissance des Kanji",
        instruction: "Quelle est la signification de ce kanji ?",
        questions: [
          { kanji: '見', options: ['voir', 'entendre', 'parler', 'lire'], correct: 'voir' },
          { kanji: '聞', options: ['entendre', 'voir', 'parler', 'écrire'], correct: 'entendre' },
          { kanji: '食', options: ['manger', 'boire', 'cuisiner', 'goûter'], correct: 'manger' },
          { kanji: '飲', options: ['boire', 'manger', 'cuisiner', 'avaler'], correct: 'boire' },
          { kanji: '行', options: ['aller', 'venir', 'sortir', 'entrer'], correct: 'aller' },
          { kanji: '来', options: ['venir', 'aller', 'sortir', 'entrer'], correct: 'venir' }
        ]
      },
      {
        type: "vocabulary",
        title: "Vocabulaire - Verbes courants",
        instruction: "Lisez ces verbes",
        questions: [
          { word: '見る', reading: 'みる', meaning: 'voir' },
          { word: '聞く', reading: 'きく', meaning: 'écouter' },
          { word: '食べる', reading: 'たべる', meaning: 'manger' },
          { word: '飲む', reading: 'のむ', meaning: 'boire' },
          { word: '行く', reading: 'いく', meaning: 'aller' },
          { word: '来る', reading: 'くる', meaning: 'venir' },
          { word: '書く', reading: 'かく', meaning: 'écrire' },
          { word: '読む', reading: 'よむ', meaning: 'lire' }
        ]
      }
    ]
  },

  // ===== LEÇON 8 : VIE QUOTIDIENNE =====
  lesson8: {
    id: "kanji-lesson8",
    title: "Kanji 8 : Vie Quotidienne",
    description: "学, 校, 本, 語, 文, 白, 赤, 青, 小, 大, 高, 安",
    level: "N5",
    free: true,
    kanji: true,
    kanjis: [
      {
        kanji: '学',
        meaning: 'étude, école',
        onyomi: ['ガク'],
        kunyomi: ['まな-ぶ'],
        strokes: 8,
        strokeOrder: 'https://jisho.org/search/学%20%23kanji',
        mnemonic: 'Enfant sous un toit = apprendre',
        examples: [
          { word: '学校', reading: 'がっこう', meaning: 'école' },
          { word: '学生', reading: 'がくせい', meaning: 'étudiant' },
          { word: '大学', reading: 'だいがく', meaning: 'université' }
        ]
      },
      {
        kanji: '校',
        meaning: 'école',
        onyomi: ['コウ'],
        kunyomi: [],
        strokes: 10,
        strokeOrder: 'https://jisho.org/search/校%20%23kanji',
        mnemonic: 'Arbre (木) + échange (交) = école',
        examples: [
          { word: '学校', reading: 'がっこう', meaning: 'école' },
          { word: '高校', reading: 'こうこう', meaning: 'lycée' },
          { word: '校長', reading: 'こうちょう', meaning: 'directeur' }
        ]
      },
      {
        kanji: '本',
        meaning: 'livre, origine',
        onyomi: ['ホン'],
        kunyomi: ['もと'],
        strokes: 5,
        strokeOrder: 'https://jisho.org/search/本%20%23kanji',
        mnemonic: 'Arbre (木) avec racine = origine, livre',
        examples: [
          { word: '本', reading: 'ほん', meaning: 'livre' },
          { word: '日本', reading: 'にほん', meaning: 'Japon' },
          { word: '本当', reading: 'ほんとう', meaning: 'vrai' }
        ]
      },
      {
        kanji: '語',
        meaning: 'langue, mot',
        onyomi: ['ゴ'],
        kunyomi: ['かた-る'],
        strokes: 14,
        strokeOrder: 'https://jisho.org/search/語%20%23kanji',
        mnemonic: 'Parole (言) + moi (吾) = langue',
        examples: [
          { word: '日本語', reading: 'にほんご', meaning: 'japonais (langue)' },
          { word: '英語', reading: 'えいご', meaning: 'anglais' },
          { word: '物語', reading: 'ものがたり', meaning: 'conte, histoire' }
        ]
      },
      {
        kanji: '文',
        meaning: 'phrase, écriture',
        onyomi: ['ブン', 'モン'],
        kunyomi: ['ふみ'],
        strokes: 4,
        strokeOrder: 'https://jisho.org/search/文%20%23kanji',
        mnemonic: 'Décoration croisée = écriture',
        examples: [
          { word: '文', reading: 'ぶん', meaning: 'phrase' },
          { word: '作文', reading: 'さくぶん', meaning: 'rédaction' },
          { word: '文化', reading: 'ぶんか', meaning: 'culture' }
        ]
      },
      {
        kanji: '白',
        meaning: 'blanc',
        onyomi: ['ハク', 'ビャク'],
        kunyomi: ['しろ', 'しろ-い'],
        strokes: 5,
        strokeOrder: 'https://jisho.org/search/白%20%23kanji',
        mnemonic: 'Soleil (日) avec un point = blanc',
        examples: [
          { word: '白い', reading: 'しろい', meaning: 'blanc' },
          { word: '白', reading: 'しろ', meaning: 'blanc (nom)' },
          { word: '白黒', reading: 'しろくろ', meaning: 'noir et blanc' }
        ]
      },
      {
        kanji: '赤',
        meaning: 'rouge',
        onyomi: ['セキ', 'シャク'],
        kunyomi: ['あか', 'あか-い'],
        strokes: 7,
        strokeOrder: 'https://jisho.org/search/赤%20%23kanji',
        mnemonic: 'Terre (土) + grand (大) = rouge',
        examples: [
          { word: '赤い', reading: 'あかい', meaning: 'rouge' },
          { word: '赤', reading: 'あか', meaning: 'rouge (nom)' },
          { word: '赤ちゃん', reading: 'あかちゃん', meaning: 'bébé' }
        ]
      },
      {
        kanji: '青',
        meaning: 'bleu, vert',
        onyomi: ['セイ', 'ショウ'],
        kunyomi: ['あお', 'あお-い'],
        strokes: 8,
        strokeOrder: 'https://jisho.org/search/青%20%23kanji',
        mnemonic: 'Plante poussant = bleu/vert',
        examples: [
          { word: '青い', reading: 'あおい', meaning: 'bleu' },
          { word: '青', reading: 'あお', meaning: 'bleu (nom)' },
          { word: '青年', reading: 'せいねん', meaning: 'jeune homme' }
        ]
      },
      {
        kanji: '小',
        meaning: 'petit',
        onyomi: ['ショウ'],
        kunyomi: ['ちい-さい', 'こ', 'お'],
        strokes: 3,
        strokeOrder: 'https://jisho.org/search/小%20%23kanji',
        mnemonic: 'Point divisé = petit',
        examples: [
          { word: '小さい', reading: 'ちいさい', meaning: 'petit' },
          { word: '小学校', reading: 'しょうがっこう', meaning: 'école primaire' },
          { word: '小川', reading: 'おがわ', meaning: 'ruisseau' }
        ]
      },
      {
        kanji: '大',
        meaning: 'grand',
        onyomi: ['ダイ', 'タイ'],
        kunyomi: ['おお-きい'],
        strokes: 3,
        strokeOrder: 'https://jisho.org/search/大%20%23kanji',
        mnemonic: 'Personne bras écartés = grand',
        examples: [
          { word: '大きい', reading: 'おおきい', meaning: 'grand' },
          { word: '大学', reading: 'だいがく', meaning: 'université' },
          { word: '大切', reading: 'たいせつ', meaning: 'important' }
        ]
      },
      {
        kanji: '高',
        meaning: 'haut, cher',
        onyomi: ['コウ'],
        kunyomi: ['たか-い'],
        strokes: 10,
        strokeOrder: 'https://jisho.org/search/高%20%23kanji',
        mnemonic: 'Tour haute = haut',
        examples: [
          { word: '高い', reading: 'たかい', meaning: 'haut, cher' },
          { word: '高校', reading: 'こうこう', meaning: 'lycée' },
          { word: '最高', reading: 'さいこう', meaning: 'le meilleur' }
        ]
      },
      {
        kanji: '安',
        meaning: 'bon marché, paix',
        onyomi: ['アン'],
        kunyomi: ['やす-い'],
        strokes: 6,
        strokeOrder: 'https://jisho.org/search/安%20%23kanji',
        mnemonic: 'Femme (女) sous un toit = paix/bon marché',
        examples: [
          { word: '安い', reading: 'やすい', meaning: 'bon marché' },
          { word: '安心', reading: 'あんしん', meaning: 'tranquillité d\'esprit' },
          { word: '安全', reading: 'あんぜん', meaning: 'sécurité' }
        ]
      }
    ],
    steps: [
      {
        type: "presentation",
        title: "Présentation des Kanji - Vie quotidienne",
        instruction: "Découvrez les kanji du quotidien"
      },
      {
        type: "mcq",
        title: "Reconnaissance des Kanji",
        instruction: "Quelle est la signification de ce kanji ?",
        questions: [
          { kanji: '学', options: ['étude', 'école', 'professeur', 'livre'], correct: 'étude' },
          { kanji: '本', options: ['livre', 'école', 'papier', 'crayon'], correct: 'livre' },
          { kanji: '語', options: ['langue', 'parler', 'mot', 'écriture'], correct: 'langue' },
          { kanji: '白', options: ['blanc', 'noir', 'rouge', 'bleu'], correct: 'blanc' },
          { kanji: '赤', options: ['rouge', 'blanc', 'bleu', 'noir'], correct: 'rouge' },
          { kanji: '小', options: ['petit', 'grand', 'moyen', 'énorme'], correct: 'petit' },
          { kanji: '大', options: ['grand', 'petit', 'moyen', 'minuscule'], correct: 'grand' }
        ]
      },
      {
        type: "vocabulary",
        title: "Vocabulaire - Quotidien",
        instruction: "Lisez ces mots de la vie quotidienne",
        questions: [
          { word: '学校', reading: 'がっこう', meaning: 'école' },
          { word: '日本語', reading: 'にほんご', meaning: 'japonais' },
          { word: '大学', reading: 'だいがく', meaning: 'université' },
          { word: '小学校', reading: 'しょうがっこう', meaning: 'école primaire' },
          { word: '高校', reading: 'こうこう', meaning: 'lycée' },
          { word: '白い', reading: 'しろい', meaning: 'blanc' },
          { word: '赤い', reading: 'あかい', meaning: 'rouge' },
          { word: '青い', reading: 'あおい', meaning: 'bleu' }
        ]
      }
    ]
  }
};

// Fonction helper pour obtenir tous les kanji N5
function getAllKanjiN5() {
  const allKanji = [];
  Object.keys(kanjiN5Data).forEach(lessonKey => {
    const lesson = kanjiN5Data[lessonKey];
    if (lesson.kanjis) {
      allKanji.push(...lesson.kanjis);
    }
  });
  return allKanji;
}

// Fonction helper pour rechercher un kanji spécifique
function findKanji(kanjiChar) {
  const allKanji = getAllKanjiN5();
  return allKanji.find(k => k.kanji === kanjiChar);
}

// Export pour utilisation dans app.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { kanjiN5Data, getAllKanjiN5, findKanji };
}
