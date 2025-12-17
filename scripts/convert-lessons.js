/**
 * Script de conversion des leçons HTML vers React Native
 * Convertit lessons-data.js (web) vers le format React Native
 */

const fs = require('fs');
const path = require('path');

// Chemins des fichiers
const webLessonsPath = path.join(__dirname, 'html-version', 'lessons-data.js');
const outputPath = path.join(__dirname, 'mobile-app', 'src', 'data', 'lessonsData.js');

console.log('🔄 Début de la conversion des leçons...\n');

// Lire le fichier web
const webContent = fs.readFileSync(webLessonsPath, 'utf8');

// Extraire lessonsData du fichier web (eval sécurisé pour ce contexte)
const lessonsDataMatch = webContent.match(/const lessonsData = (\[[\s\S]*?\]);/);
if (!lessonsDataMatch) {
  console.error('❌ Impossible de trouver lessonsData dans le fichier web');
  process.exit(1);
}

// Parser le JSON (conversion string -> array)
let webLessons;
try {
  // Remplacer 'const lessonsData = ' par rien et évaluer
  const lessonsString = lessonsDataMatch[1];
  webLessons = eval('(' + lessonsString + ')');
  console.log(`✅ ${webLessons.length} leçons trouvées dans la version web`);
} catch (error) {
  console.error('❌ Erreur lors du parsing des leçons:', error.message);
  process.exit(1);
}

// Fonction de conversion
function convertLesson(webLesson, index) {
  const lessonId = index + 1;

  // Déterminer le type de leçon (hiragana, katakana, ou vocabulaire)
  const isKatakana = webLesson.katakana && webLesson.katakana.length > 0;
  const isHiragana = webLesson.hiragana && webLesson.hiragana.length > 0;
  const isVocab = lessonId === 11; // Leçon 11 = chiffres

  // Convertir les caractères
  const sourceChars = isKatakana ? webLesson.katakana : webLesson.hiragana || [];
  const characters = sourceChars.map(charData => ({
    [isKatakana ? 'katakana' : 'hiragana']: charData.char,
    romaji: charData.romaji,
    pronunciation: `${charData.romaji}`,
    mnemonic: `Caractère ${charData.char}`,
    examples: [],
    audio: `${charData.romaji}.mp3`,
    ...(charData.meaning && { meaning: charData.meaning })
  }));

  // Convertir les exercices (extraire les MCQ, intruder, transcription)
  const exercises = [];

  if (webLesson.steps) {
    webLesson.steps.forEach(step => {
      if (step.type === 'mcq' && step.questions) {
        step.questions.forEach(q => {
          exercises.push({
            type: 'mcq',
            question: `Quel est le romaji de ${q.hiragana} ?`,
            options: q.options,
            correct: q.correct,
            character: q.hiragana
          });
        });
      }

      if (step.type === 'intruder' && step.questions) {
        step.questions.forEach(q => {
          exercises.push({
            type: 'intruder',
            question: 'Trouvez l\'intrus',
            options: q.options,
            correct: q.intruder,
            explanation: q.explanation
          });
        });
      }

      if (step.type === 'transcription' && step.questions) {
        step.questions.forEach(q => {
          exercises.push({
            type: 'transcription',
            question: `Tapez le romaji de: ${q.hiragana}`,
            correct: q.correct,
            character: q.hiragana,
            ...(q.meaning && { meaning: q.meaning })
          });
        });
      }
    });
  }

  // Créer la leçon convertie
  return {
    id: lessonId,
    title: webLesson.title.replace(/^Leçon \d+\s*:\s*/, ''), // Enlever "Leçon X : "
    description: webLesson.description,
    difficulty: webLesson.level === 'beginner' ? 'Débutant' :
                 webLesson.level === 'intermediate' ? 'Intermédiaire' : 'Avancé',
    category: isKatakana ? 'katakana' : isVocab ? 'vocabulary' : 'hiragana',
    free: webLesson.free !== false, // Par défaut true sauf si explicitement false
    characters,
    exercises
  };
}

// Convertir toutes les leçons
const convertedLessons = webLessons.map((lesson, index) => convertLesson(lesson, index));

// Séparer par catégorie
const hiraganaLessons = convertedLessons.filter(l => l.category === 'hiragana');
const katakanaLessons = convertedLessons.filter(l => l.category === 'katakana');
const vocabularyLessons = convertedLessons.filter(l => l.category === 'vocabulary');

console.log(`\n📊 Résultat de la conversion:`);
console.log(`   - ${hiraganaLessons.length} leçons Hiragana`);
console.log(`   - ${katakanaLessons.length} leçons Katakana`);
console.log(`   - ${vocabularyLessons.length} leçons Vocabulaire`);
console.log(`   - TOTAL: ${convertedLessons.length} leçons`);

// Générer le fichier React Native
const outputContent = `/**
 * Lessons Data - Structure des leçons Hiragana/Katakana/Vocabulaire
 * Converti automatiquement depuis html-version/lessons-data.js
 * Date de conversion: ${new Date().toLocaleString('fr-FR')}
 */

// ========================================
// HIRAGANA LESSONS (${hiraganaLessons.length} leçons)
// ========================================

export const hiraganaLessons = ${JSON.stringify(hiraganaLessons, null, 2)};

// ========================================
// KATAKANA LESSONS (${katakanaLessons.length} leçons)
// ========================================

export const katakanaLessons = ${JSON.stringify(katakanaLessons, null, 2)};

// ========================================
// VOCABULARY LESSONS (${vocabularyLessons.length} leçons)
// ========================================

export const vocabularyLessons = ${JSON.stringify(vocabularyLessons, null, 2)};

// ========================================
// KANJI LESSONS (À venir)
// ========================================

export const kanjiLessons = [
  // TODO: Ajouter les leçons Kanji JLPT N5
];

// ========================================
// LESSON CATEGORIES
// ========================================

export const LESSON_CATEGORIES = {
  HIRAGANA: 'hiragana',
  KATAKANA: 'katakana',
  VOCABULARY: 'vocabulary',
  KANJI: 'kanji',
};

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Obtenir toutes les leçons d'une catégorie
 */
export const getLessonsByCategory = (category) => {
  switch (category) {
    case LESSON_CATEGORIES.HIRAGANA:
      return hiraganaLessons;
    case LESSON_CATEGORIES.KATAKANA:
      return katakanaLessons;
    case LESSON_CATEGORIES.VOCABULARY:
      return vocabularyLessons;
    case LESSON_CATEGORIES.KANJI:
      return kanjiLessons;
    default:
      return [];
  }
};

/**
 * Obtenir une leçon spécifique par ID
 */
export const getLessonById = (lessonId) => {
  const allLessons = [
    ...hiraganaLessons,
    ...katakanaLessons,
    ...vocabularyLessons,
    ...kanjiLessons
  ];
  return allLessons.find(lesson => lesson.id === lessonId);
};

/**
 * Obtenir toutes les leçons (toutes catégories)
 */
export const getAllLessons = () => {
  return [
    ...hiraganaLessons,
    ...katakanaLessons,
    ...vocabularyLessons,
    ...kanjiLessons
  ];
};

/**
 * Obtenir le nombre total de caractères à apprendre
 */
export const getTotalCharacters = () => {
  const allLessons = getAllLessons();
  return allLessons.reduce((total, lesson) => total + lesson.characters.length, 0);
};

export default {
  hiraganaLessons,
  katakanaLessons,
  vocabularyLessons,
  kanjiLessons,
  LESSON_CATEGORIES,
  getLessonsByCategory,
  getLessonById,
  getAllLessons,
  getTotalCharacters,
};
`;

// Écrire le fichier
fs.writeFileSync(outputPath, outputContent, 'utf8');

console.log(`\n✅ Conversion terminée !`);
console.log(`📁 Fichier généré: ${outputPath}`);
console.log(`\n📈 Statistiques:`);
console.log(`   - Total caractères: ${convertedLessons.reduce((sum, l) => sum + l.characters.length, 0)}`);
console.log(`   - Total exercices: ${convertedLessons.reduce((sum, l) => sum + l.exercises.length, 0)}`);
console.log(`\n🎉 Toutes les leçons ont été converties avec succès !`);
