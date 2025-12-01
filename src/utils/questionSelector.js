/**
 * Utilitaire pour sélectionner aléatoirement les questions d'une leçon
 */

/**
 * Mélange un tableau (Fisher-Yates shuffle)
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Compte le nombre total de questions dans une liste de steps
 */
export const countQuestions = (steps) => {
  let total = 0;
  steps.forEach(step => {
    if (step.type === 'presentation') {
      // La présentation ne compte pas comme une question
      return;
    }
    if (step.questions) {
      total += step.questions.length;
    } else if (step.content) {
      total += step.content.length;
    }
  });
  return total;
};

/**
 * Sélectionne aléatoirement les questions d'une leçon
 * @param {Object} lesson - La leçon complète
 * @param {number} targetCount - Nombre de questions souhaitées
 * @returns {Array} - Liste des steps sélectionnés
 */
export const selectRandomQuestions = (lesson, targetCount) => {
  // Toujours inclure la présentation en premier
  const presentation = lesson.steps.filter(s => s.type === 'presentation');

  // Récupérer tous les autres steps (exercices)
  const exerciseSteps = lesson.steps.filter(s => s.type !== 'presentation');

  // Si pas assez de questions au total, retourner tout
  const totalQuestions = countQuestions(exerciseSteps);
  if (totalQuestions <= targetCount) {
    return lesson.steps; // Retourner tous les steps
  }

  // Mélanger les steps d'exercices
  const shuffledSteps = shuffleArray(exerciseSteps);

  // Sélectionner les steps jusqu'à atteindre le nombre cible
  const selectedSteps = [...presentation];
  let questionCount = 0;

  for (const step of shuffledSteps) {
    const stepQuestionCount = step.questions?.length || step.content?.length || 0;

    // Si ajouter ce step ne dépasse pas trop le target, on l'ajoute
    if (questionCount + stepQuestionCount <= targetCount + 3) {
      selectedSteps.push(step);
      questionCount += stepQuestionCount;

      // Si on a atteint ou dépassé le target, on s'arrête
      if (questionCount >= targetCount) {
        break;
      }
    }
  }

  return selectedSteps;
};

/**
 * Sélectionne aléatoirement des questions spécifiques dans un step
 * @param {Object} step - Le step contenant les questions
 * @param {number} count - Nombre de questions à sélectionner
 * @returns {Object} - Step modifié avec questions sélectionnées
 */
export const selectQuestionsFromStep = (step, count) => {
  if (step.type === 'presentation') {
    return step; // Ne pas modifier la présentation
  }

  let questions = step.questions || step.content;
  if (!questions || questions.length <= count) {
    return step; // Pas assez de questions, retourner tel quel
  }

  // Mélanger et sélectionner
  const shuffled = shuffleArray(questions);
  const selected = shuffled.slice(0, count);

  // Créer un nouveau step avec les questions sélectionnées
  if (step.questions) {
    return { ...step, questions: selected };
  } else {
    return { ...step, content: selected };
  }
};

/**
 * Calcule le temps estimé d'une leçon en minutes
 * @param {number} questionCount - Nombre de questions
 * @returns {string} - Temps estimé formaté
 */
export const estimateTime = (questionCount) => {
  const minMinutes = Math.floor(questionCount * 0.3);
  const maxMinutes = Math.ceil(questionCount * 0.6);
  return `${minMinutes}-${maxMinutes} minutes`;
};
