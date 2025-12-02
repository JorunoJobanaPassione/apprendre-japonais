/**
 * 📱 App Japonais - HTML Version
 * Logique principale de l'application
 */

// ===== ÉTAT DE L'APPLICATION =====
let appState = {
  currentScreen: 'loading',
  currentLesson: null,
  currentStep: 0,
  currentQuestion: 0,
  score: 0,
  totalQuestions: 10,
  selectedQuestions: [],
  answers: [],
  userProgress: null,
  startTime: null
};

// ===== GESTION DU LOCALSTORAGE =====
const Storage = {
  // Récupérer la progression
  getProgress: function() {
    const data = localStorage.getItem('japonais_progress');
    return data ? JSON.parse(data) : {
      level: 1,
      totalPoints: 0,
      streak: 0,
      lastStudyDate: null,
      lessons: {},
      badges: [],
      stats: {
        lessonsCompleted: 0,
        transcriptionsCompleted: 0,
        wordsLearned: 0
      }
    };
  },

  // Sauvegarder la progression
  saveProgress: function(progress) {
    localStorage.setItem('japonais_progress', JSON.stringify(progress));
  },

  // Sauvegarder la préférence du nombre de questions
  saveQuestionPreference: function(count) {
    localStorage.setItem('japonais_question_count', count);
  },

  // Récupérer la préférence du nombre de questions
  getQuestionPreference: function() {
    return parseInt(localStorage.getItem('japonais_question_count')) || 10;
  },

  // Mettre à jour les stats de leçon
  updateLessonProgress: function(lessonId, score, total) {
    const progress = this.getProgress();
    if (!progress.lessons[lessonId]) {
      progress.lessons[lessonId] = {
        completed: false,
        bestScore: 0,
        attempts: 0,
        lastAttempt: null
      };
    }

    progress.lessons[lessonId].attempts++;
    progress.lessons[lessonId].lastAttempt = new Date().toISOString();

    const percentage = (score / total) * 100;
    if (percentage > progress.lessons[lessonId].bestScore) {
      progress.lessons[lessonId].bestScore = Math.round(percentage);
    }

    if (percentage >= 70 && !progress.lessons[lessonId].completed) {
      progress.lessons[lessonId].completed = true;
      progress.stats.lessonsCompleted++;
    }

    // Calcul des points
    const points = Math.round(score * 10);
    progress.totalPoints += points;

    // Mise à jour du niveau (1 niveau par 100 points)
    progress.level = Math.floor(progress.totalPoints / 100) + 1;

    // Mise à jour du streak
    const today = new Date().toDateString();
    if (progress.lastStudyDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (progress.lastStudyDate === yesterday.toDateString()) {
        progress.streak++;
      } else if (progress.lastStudyDate !== today) {
        progress.streak = 1;
      }
      progress.lastStudyDate = today;
    }

    this.saveProgress(progress);
    return { points, newBadges: this.checkBadges(progress) };
  },

  // Vérifier et débloquer les badges
  checkBadges: function(progress) {
    const newBadges = [];
    badgesData.forEach(badge => {
      if (!progress.badges.includes(badge.id)) {
        let unlocked = false;

        switch(badge.condition) {
          case 'complete_lesson_1':
            unlocked = progress.lessons['lesson1']?.completed;
            break;
          case 'perfect_lesson':
            unlocked = Object.values(progress.lessons).some(l => l.bestScore === 100);
            break;
          case 'streak_3':
            unlocked = progress.streak >= 3;
            break;
          case 'streak_7':
            unlocked = progress.streak >= 7;
            break;
          case 'complete_5_lessons':
            unlocked = progress.stats.lessonsCompleted >= 5;
            break;
          case 'complete_10_lessons':
            unlocked = progress.stats.lessonsCompleted >= 10;
            break;
          case 'score_500':
            unlocked = progress.totalPoints >= 500;
            break;
          case 'score_1000':
            unlocked = progress.totalPoints >= 1000;
            break;
          case 'transcription_20':
            unlocked = progress.stats.transcriptionsCompleted >= 20;
            break;
        }

        if (unlocked) {
          progress.badges.push(badge.id);
          newBadges.push(badge);
        }
      }
    });

    if (newBadges.length > 0) {
      this.saveProgress(progress);
    }

    return newBadges;
  }
};

// ===== NAVIGATION =====
const Navigation = {
  showScreen: function(screenId) {
    // Cacher tous les écrans
    document.querySelectorAll('.screen').forEach(screen => {
      screen.style.display = 'none';
    });

    // Afficher l'écran demandé
    const screen = document.getElementById(screenId);
    if (screen) {
      screen.style.display = 'flex';
      appState.currentScreen = screenId;
    }
  },

  goToHome: function() {
    this.showScreen('home-screen');
    this.renderHome();
  },

  goToConfig: function(lessonId) {
    appState.currentLesson = lessonsData.find(l => l.id === lessonId);
    if (!appState.currentLesson) return;

    this.showScreen('config-screen');
    this.renderConfig();
  },

  goToLesson: function() {
    this.showScreen('lesson-screen');
    LessonController.start();
  },

  goToResults: function() {
    this.showScreen('results-screen');
    this.renderResults();
  },

  goToBadges: function() {
    this.showScreen('badges-screen');
    this.renderBadges();
  },

  renderHome: function() {
    const progress = Storage.getProgress();

    // Mettre à jour les stats utilisateur
    document.getElementById('user-level').textContent = progress.level;
    document.getElementById('user-points').textContent = progress.totalPoints;
    document.getElementById('user-streak').textContent = progress.streak;

    // Mettre à jour la progression globale
    const completedLessons = progress.stats.lessonsCompleted;
    const percentage = (completedLessons / 10) * 100;
    document.getElementById('global-progress').style.width = percentage + '%';
    document.getElementById('completed-lessons').textContent = completedLessons;

    // Afficher les leçons
    const lessonsList = document.getElementById('lessons-list');
    lessonsList.innerHTML = '';

    lessonsData.forEach((lesson, index) => {
      const isLocked = index > 0 && !progress.lessons[lessonsData[index - 1].id]?.completed;
      const lessonProgress = progress.lessons[lesson.id] || { completed: false, bestScore: 0 };

      const card = document.createElement('div');
      card.className = 'lesson-card' + (isLocked ? ' locked' : '') + (lessonProgress.completed ? ' completed' : '');

      card.innerHTML = `
        <div class="lesson-header-content">
          <span class="lesson-number">Leçon ${index + 1}</span>
          <span class="lesson-status">${lessonProgress.completed ? '✅' : isLocked ? '🔒' : '⭕'}</span>
        </div>
        <h3 class="lesson-card-title">${lesson.title}</h3>
        <p class="lesson-description">${lesson.description}</p>
        <div class="lesson-progress-info">
          <span class="lesson-difficulty">${lesson.level === 'beginner' ? 'Débutant' : lesson.level === 'intermediate' ? 'Intermédiaire' : 'Avancé'}</span>
          ${lessonProgress.bestScore > 0 ? `<span class="lesson-score">Meilleur: ${lessonProgress.bestScore}%</span>` : ''}
        </div>
      `;

      if (!isLocked) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => Navigation.goToConfig(lesson.id));
      }

      lessonsList.appendChild(card);
    });
  },

  renderConfig: function() {
    document.getElementById('config-lesson-title').textContent = appState.currentLesson.title;
    document.getElementById('config-description').textContent = appState.currentLesson.description;

    // Récupérer la préférence sauvegardée
    const savedPreference = Storage.getQuestionPreference();

    // Gérer la sélection des options
    document.querySelectorAll('.config-option').forEach(option => {
      option.classList.remove('active');
      if (parseInt(option.dataset.questions) === savedPreference) {
        option.classList.add('active');
      }

      option.addEventListener('click', function() {
        document.querySelectorAll('.config-option').forEach(o => o.classList.remove('active'));
        this.classList.add('active');
        appState.totalQuestions = parseInt(this.dataset.questions);
        Storage.saveQuestionPreference(appState.totalQuestions);
      });
    });

    appState.totalQuestions = savedPreference;
  },

  renderResults: function() {
    const accuracy = Math.round((appState.score / appState.totalQuestions) * 100);
    const progress = Storage.getProgress();
    const results = Storage.updateLessonProgress(appState.currentLesson.id, appState.score, appState.totalQuestions);

    // Déterminer l'icône et le titre selon le score
    let icon, title, subtitle;
    if (accuracy >= 90) {
      icon = '🎉';
      title = 'Excellent !';
      subtitle = 'Performance exceptionnelle !';
    } else if (accuracy >= 70) {
      icon = '👏';
      title = 'Bien joué !';
      subtitle = 'Vous progressez bien !';
    } else if (accuracy >= 50) {
      icon = '💪';
      title = 'Pas mal !';
      subtitle = 'Continuez vos efforts !';
    } else {
      icon = '🤔';
      title = 'À améliorer';
      subtitle = 'Réessayez pour progresser !';
    }

    document.getElementById('results-icon').textContent = icon;
    document.getElementById('results-title').textContent = title;
    document.getElementById('results-subtitle').textContent = subtitle;
    document.getElementById('final-score').textContent = `${appState.score}/${appState.totalQuestions}`;
    document.getElementById('final-accuracy').textContent = accuracy + '%';
    document.getElementById('points-earned').textContent = '+' + results.points;

    // Afficher les nouveaux badges
    if (results.newBadges.length > 0) {
      document.getElementById('results-badges').style.display = 'block';
      const badgesList = document.getElementById('unlocked-badges-list');
      badgesList.innerHTML = '';
      results.newBadges.forEach(badge => {
        badgesList.innerHTML += `
          <div class="badge-card">
            <div class="badge-icon">${badge.icon}</div>
            <div class="badge-name">${badge.name}</div>
          </div>
        `;
      });

      // Afficher le premier badge dans une modal
      setTimeout(() => showBadgeModal(results.newBadges[0]), 500);
    } else {
      document.getElementById('results-badges').style.display = 'none';
    }
  },

  renderBadges: function() {
    const progress = Storage.getProgress();
    const badgesList = document.getElementById('badges-list');
    badgesList.innerHTML = '';

    badgesData.forEach(badge => {
      const unlocked = progress.badges.includes(badge.id);
      const card = document.createElement('div');
      card.className = 'badge-card' + (unlocked ? '' : ' locked');
      card.innerHTML = `
        <div class="badge-icon">${unlocked ? badge.icon : '🔒'}</div>
        <div class="badge-name">${unlocked ? badge.name : '???'}</div>
        <div class="badge-description">${unlocked ? badge.description : 'Badge verrouillé'}</div>
      `;
      badgesList.appendChild(card);
    });
  }
};

// ===== CONTRÔLEUR DE LEÇON =====
const LessonController = {
  start: function() {
    appState.currentStep = 0;
    appState.currentQuestion = 0;
    appState.score = 0;
    appState.answers = [];
    appState.startTime = Date.now();

    // Sélectionner les questions aléatoirement pour chaque étape
    this.selectQuestions();
    this.renderCurrentExercise();
  },

  selectQuestions: function() {
    appState.selectedQuestions = [];
    const lesson = appState.currentLesson;

    lesson.steps.forEach(step => {
      if (step.type === 'presentation') {
        appState.selectedQuestions.push({ type: 'presentation', data: step });
      } else {
        const questions = step.questions || [];
        const selected = this.shuffleArray([...questions]).slice(0, Math.min(appState.totalQuestions, questions.length));
        appState.selectedQuestions.push(...selected.map(q => ({ type: step.type, data: q, instruction: step.instruction, title: step.title })));
      }
    });
  },

  shuffleArray: function(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  },

  renderCurrentExercise: function() {
    if (appState.currentQuestion >= appState.selectedQuestions.length) {
      Navigation.goToResults();
      return;
    }

    const question = appState.selectedQuestions[appState.currentQuestion];
    const container = document.getElementById('exercise-container');

    // Mettre à jour la barre de progression
    const progress = ((appState.currentQuestion) / appState.selectedQuestions.length) * 100;
    document.getElementById('lesson-progress-bar').style.width = progress + '%';
    document.getElementById('current-question').textContent = appState.currentQuestion + 1;
    document.getElementById('total-questions').textContent = appState.selectedQuestions.length;
    document.getElementById('current-score').textContent = appState.score;

    // Rendre l'exercice selon le type
    switch(question.type) {
      case 'presentation':
        this.renderPresentation(container, question);
        break;
      case 'mcq':
        this.renderMCQ(container, question);
        break;
      case 'intruder':
        this.renderIntruder(container, question);
        break;
      case 'transcription':
        this.renderTranscription(container, question);
        break;
      case 'sentence':
        this.renderSentence(container, question);
        break;
    }
  },

  renderPresentation: function(container, question) {
    const lesson = appState.currentLesson;
    container.innerHTML = `
      <div class="exercise">
        <h2 class="exercise-title">📚 ${question.data.title}</h2>
        <p class="exercise-instruction">${question.data.instruction}</p>
        <div class="hiragana-table">
          ${lesson.hiragana.map(h => `
            <div class="hiragana-card">
              <div class="hiragana-char">${h.char}</div>
              <div class="hiragana-romaji">${h.romaji}</div>
            </div>
          `).join('')}
        </div>
        <button class="primary-btn next-btn" onclick="LessonController.nextQuestion()">
          Suivant →
        </button>
      </div>
    `;
  },

  renderMCQ: function(container, question) {
    container.innerHTML = `
      <div class="exercise">
        <h2 class="exercise-title">❓ ${question.title}</h2>
        <p class="exercise-instruction">${question.instruction}</p>
        <div class="question-hiragana">${question.data.hiragana}</div>
        <div class="options-grid">
          ${question.data.options.map(option => `
            <button class="option-btn" data-answer="${option}">${option}</button>
          `).join('')}
        </div>
        <div id="feedback"></div>
      </div>
    `;

    // Ajouter les event listeners
    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const selected = this.dataset.answer;
        const correct = question.data.correct;
        const isCorrect = selected === correct;

        // Désactiver tous les boutons
        document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);

        // Colorer la réponse
        this.classList.add(isCorrect ? 'correct' : 'incorrect');
        if (!isCorrect) {
          document.querySelector(`[data-answer="${correct}"]`).classList.add('correct');
        }

        // Afficher le feedback
        const feedback = document.getElementById('feedback');
        feedback.className = 'feedback ' + (isCorrect ? 'success' : 'error');
        feedback.innerHTML = isCorrect ? '✅ Bonne réponse !' : `❌ La bonne réponse était : ${correct}`;

        // Mettre à jour le score
        if (isCorrect) appState.score++;

        // Passer à la question suivante après un délai
        setTimeout(() => LessonController.nextQuestion(), 1500);
      });
    });
  },

  renderIntruder: function(container, question) {
    container.innerHTML = `
      <div class="exercise">
        <h2 class="exercise-title">🔍 ${question.title}</h2>
        <p class="exercise-instruction">${question.instruction}</p>
        <div class="options-grid">
          ${question.data.options.map(option => `
            <button class="option-btn" data-answer="${option}" style="font-size: 48px;">${option}</button>
          `).join('')}
        </div>
        <div id="feedback"></div>
      </div>
    `;

    document.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const selected = this.dataset.answer;
        const correct = question.data.intruder;
        const isCorrect = selected === correct;

        document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
        this.classList.add(isCorrect ? 'correct' : 'incorrect');
        if (!isCorrect) {
          document.querySelector(`[data-answer="${correct}"]`).classList.add('correct');
        }

        const feedback = document.getElementById('feedback');
        feedback.className = 'feedback ' + (isCorrect ? 'success' : 'error');
        feedback.innerHTML = (isCorrect ? '✅ Bonne réponse ! ' : '❌ ') + question.data.explanation;

        if (isCorrect) appState.score++;

        setTimeout(() => LessonController.nextQuestion(), 2000);
      });
    });
  },

  renderTranscription: function(container, question) {
    container.innerHTML = `
      <div class="exercise">
        <h2 class="exercise-title">✍️ ${question.title}</h2>
        <p class="exercise-instruction">${question.instruction}</p>
        <div class="transcription-word">${question.data.hiragana}</div>
        <p class="transcription-meaning">${question.data.meaning}</p>
        <div class="input-container">
          <input type="text" class="transcription-input" id="transcription-input" placeholder="Écrivez en romaji..." autocomplete="off">
        </div>
        <div id="feedback"></div>
        <button class="primary-btn next-btn" onclick="LessonController.checkTranscription()">
          Valider
        </button>
      </div>
    `;

    // Focus sur l'input
    const input = document.getElementById('transcription-input');
    input.focus();

    // Validation avec Enter
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        LessonController.checkTranscription();
      }
    });
  },

  checkTranscription: function() {
    const question = appState.selectedQuestions[appState.currentQuestion];
    const input = document.getElementById('transcription-input');
    const answer = input.value.toLowerCase().trim();
    const correct = question.data.correct.toLowerCase();
    const alternatives = question.data.alternatives || [];

    const isCorrect = answer === correct || alternatives.some(alt => alt.toLowerCase() === answer);

    input.classList.add(isCorrect ? 'correct' : 'incorrect');
    input.disabled = true;

    const feedback = document.getElementById('feedback');
    feedback.className = 'feedback ' + (isCorrect ? 'success' : 'error');
    feedback.innerHTML = isCorrect
      ? '✅ Bonne réponse !'
      : `❌ La bonne réponse était : ${correct}${alternatives.length > 0 ? ' (ou ' + alternatives.join(', ') + ')' : ''}`;

    if (isCorrect) appState.score++;

    // Comptabiliser les transcriptions
    const progress = Storage.getProgress();
    progress.stats.transcriptionsCompleted++;
    Storage.saveProgress(progress);

    setTimeout(() => LessonController.nextQuestion(), 1500);
  },

  renderSentence: function(container, question) {
    container.innerHTML = `
      <div class="exercise">
        <h2 class="exercise-title">📖 ${question.title}</h2>
        <p class="exercise-instruction">${question.instruction}</p>
        <div class="transcription-word">${question.data.hiragana}</div>
        <p class="transcription-meaning">${question.data.meaning}</p>
        <div id="feedback" class="feedback success" style="display: block;">
          <strong>Lecture :</strong> ${question.data.romaji}
        </div>
        <button class="primary-btn next-btn" onclick="LessonController.nextQuestion()">
          Suivant →
        </button>
      </div>
    `;

    // Auto-score pour les exercices de lecture
    appState.score++;
  },

  nextQuestion: function() {
    appState.currentQuestion++;
    this.renderCurrentExercise();
  }
};

// ===== MODAL DE BADGE =====
function showBadgeModal(badge) {
  const modal = document.getElementById('badge-modal');
  document.getElementById('modal-badge-icon').textContent = badge.icon;
  document.getElementById('modal-badge-name').textContent = badge.name;
  document.getElementById('modal-badge-description').textContent = badge.description;
  modal.style.display = 'flex';
}

function closeBadgeModal() {
  document.getElementById('badge-modal').style.display = 'none';
}

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', function() {
  // Boutons de navigation
  document.getElementById('config-back-btn')?.addEventListener('click', () => Navigation.goToHome());
  document.getElementById('lesson-back-btn')?.addEventListener('click', () => Navigation.goToHome());
  document.getElementById('start-lesson-btn')?.addEventListener('click', () => Navigation.goToLesson());
  document.getElementById('retry-btn')?.addEventListener('click', () => Navigation.goToConfig(appState.currentLesson.id));
  document.getElementById('continue-btn')?.addEventListener('click', () => Navigation.goToHome());
  document.getElementById('badges-btn')?.addEventListener('click', () => Navigation.goToBadges());
  document.getElementById('badges-back-btn')?.addEventListener('click', () => Navigation.goToHome());
  document.getElementById('close-badge-modal')?.addEventListener('click', closeBadgeModal);

  // Initialisation
  setTimeout(() => {
    Navigation.goToHome();
  }, 1500);
});
