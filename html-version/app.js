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

// ===== SYSTÈME AUDIO =====
const AudioPlayer = {
  // Cache des objets Audio pour éviter de les recréer
  audioCache: {},

  // Mapper un hiragana vers le nom de fichier correspondant
  getAudioFilename: function(hiragana) {
    // Map special cases (combinaisons, etc.)
    const romajiMap = {
      'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
      'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
      'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
      'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
      'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
      'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
      'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
      'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
      'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
      'わ': 'wa', 'を': 'wo', 'ん': 'n',
      'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
      'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
      'だ': 'da', 'ぢ': 'ji2', 'づ': 'zu2', 'で': 'de', 'ど': 'do',
      'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
      'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
      'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
      'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
      'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho'
    };

    return romajiMap[hiragana] || null;
  },

  // Jouer l'audio d'un hiragana OU d'une phrase de dialogue
  play: function(text, dialogueId = null) {
    let audioPath = '';
    let cacheKey = '';

    // Si c'est un dialogue (avec ID), utiliser le chemin dialogues/
    if (dialogueId) {
      audioPath = `audio/dialogues/${dialogueId}.mp3`;
      cacheKey = `dialogue_${dialogueId}`;
    }
    // Sinon, c'est un hiragana individuel
    else {
      const filename = this.getAudioFilename(text);
      if (!filename) {
        console.warn(`Audio non disponible pour : ${text}`);
        return;
      }
      audioPath = `audio/${filename}.mp3`;
      cacheKey = filename;
    }

    // Utiliser le cache ou créer un nouvel objet Audio
    if (!this.audioCache[cacheKey]) {
      this.audioCache[cacheKey] = new Audio(audioPath);
    }

    const audio = this.audioCache[cacheKey];

    // Réinitialiser et jouer
    audio.currentTime = 0;
    audio.play().catch(error => {
      console.error(`Erreur lecture audio ${cacheKey}:`, error);
    });
  },

  // Créer un bouton audio HTML
  createButton: function(text, size = 'medium', dialogueId = null) {
    // Si c'est un dialogue
    if (dialogueId) {
      const sizeClass = size === 'small' ? 'audio-btn-small' : '';
      return `
        <button
          class="audio-btn ${sizeClass}"
          onclick="AudioPlayer.play('${text.replace(/'/g, "\\'")}', '${dialogueId}')"
          title="Écouter la prononciation"
          aria-label="Écouter ${text}">
          🔊
        </button>
      `;
    }

    // Sinon c'est un hiragana individuel
    const filename = this.getAudioFilename(text);
    if (!filename) return '';

    const sizeClass = size === 'small' ? 'audio-btn-small' : '';

    return `
      <button
        class="audio-btn ${sizeClass}"
        onclick="AudioPlayer.play('${text}')"
        title="Écouter la prononciation"
        aria-label="Écouter ${text}">
        🔊
      </button>
    `;
  }
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
      },
      mistakes: {} // Format: { "あ": { count: 2, lastSeen: "2024-01-01" } }
    };
  },

  // Enregistrer une erreur sur un caractère
  recordMistake: function(hiragana) {
    const progress = this.getProgress();

    if (!progress.mistakes) {
      progress.mistakes = {};
    }

    if (!progress.mistakes[hiragana]) {
      progress.mistakes[hiragana] = { count: 0, lastSeen: null };
    }

    progress.mistakes[hiragana].count++;
    progress.mistakes[hiragana].lastSeen = new Date().toISOString();

    this.saveProgress(progress);
  },

  // Récupérer les caractères à réviser (triés par nombre d'erreurs)
  getMistakesToReview: function() {
    const progress = this.getProgress();
    if (!progress.mistakes) return [];

    return Object.entries(progress.mistakes)
      .filter(([char, data]) => data.count > 0)
      .sort((a, b) => b[1].count - a[1].count)
      .map(([char, data]) => ({ char, ...data }));
  },

  // Réinitialiser les erreurs (après une révision réussie)
  clearMistake: function(hiragana) {
    const progress = this.getProgress();
    if (progress.mistakes && progress.mistakes[hiragana]) {
      delete progress.mistakes[hiragana];
      this.saveProgress(progress);
    }
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

    // Sync automatique avec le leaderboard Supabase
    if (typeof LeaderboardSystem !== 'undefined') {
      LeaderboardSystem.syncToLeaderboard().catch(err =>
        console.warn('⚠️ Sync leaderboard échoué (mode hors ligne?)', err)
      );
    }

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
    // Si lessonId est null, on utilise la leçon déjà dans appState (mode révision)
    if (lessonId !== null) {
      appState.currentLesson = lessonsData.find(l => l.id === lessonId);
      if (!appState.currentLesson) return;
    }

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

  goToStats: function() {
    this.showScreen('stats-screen');
    this.renderStats();
  },

  goToLeaderboard: function() {
    this.showScreen('leaderboard-screen');
    this.renderLeaderboard();
  },

  goToReview: function() {
    // Générer une leçon de révision personnalisée
    const mistakes = Storage.getMistakesToReview();
    if (mistakes.length === 0) {
      alert('Aucun caractère à réviser pour le moment !');
      return;
    }

    // Créer une leçon spéciale pour la révision
    const reviewLesson = this.generateReviewLesson(mistakes);
    appState.currentLesson = reviewLesson;
    appState.totalQuestions = Storage.getQuestionPreference();
    this.goToConfig(null);
  },

  generateReviewLesson: function(mistakes) {
    // Récupérer les données de caractères hiragana de toutes les leçons
    const allHiragana = [];
    lessonsData.forEach(lesson => {
      lesson.hiragana.forEach(h => allHiragana.push(h));
    });

    // Filtrer pour ne garder que les hiragana avec erreurs
    const hiraganaToReview = allHiragana.filter(h =>
      mistakes.some(m => m.char === h.char)
    );

    // Créer les exercices de révision
    const mcqQuestions = hiraganaToReview.map(h => ({
      hiragana: h.char,
      options: this.generateOptions(h.romaji, allHiragana),
      correct: h.romaji
    }));

    // Créer des paires pour transcription
    const transcriptionQuestions = [];
    for (let i = 0; i < hiraganaToReview.length - 1; i += 2) {
      if (hiraganaToReview[i + 1]) {
        transcriptionQuestions.push({
          hiragana: hiraganaToReview[i].char + hiraganaToReview[i + 1].char,
          correct: hiraganaToReview[i].romaji + hiraganaToReview[i + 1].romaji,
          alternatives: [],
          meaning: 'révision'
        });
      }
    }

    return {
      id: 'review',
      title: '🔄 Mode Révision',
      description: `Révision de ${hiraganaToReview.length} caractère(s)`,
      level: 'review',
      free: true,
      icon: '🔄',
      hiragana: hiraganaToReview,
      steps: [
        {
          type: 'presentation',
          title: 'Caractères à réviser',
          instruction: 'Voici les caractères où vous avez fait des erreurs'
        },
        {
          type: 'mcq',
          title: 'Exercice de reconnaissance',
          instruction: 'Quelle est la lecture de ce hiragana ?',
          questions: mcqQuestions
        },
        transcriptionQuestions.length > 0 ? {
          type: 'transcription',
          title: 'Transcription',
          instruction: 'Écrivez la transcription en romaji',
          questions: transcriptionQuestions
        } : null
      ].filter(step => step !== null)
    };
  },

  generateOptions: function(correct, allHiragana) {
    // Générer 3 mauvaises options + la bonne
    const options = [correct];
    const availableOptions = allHiragana
      .map(h => h.romaji)
      .filter(r => r !== correct);

    while (options.length < 4 && availableOptions.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableOptions.length);
      const option = availableOptions[randomIndex];
      if (!options.includes(option)) {
        options.push(option);
      }
      availableOptions.splice(randomIndex, 1);
    }

    return options;
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

    // Afficher le mode révision si des erreurs existent
    const mistakes = Storage.getMistakesToReview();
    const reviewSection = document.getElementById('review-mode-section');
    if (mistakes.length > 0) {
      reviewSection.style.display = 'block';
      document.getElementById('mistakes-count').textContent = mistakes.length;
    } else {
      reviewSection.style.display = 'none';
    }

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
  },

  renderStats: function() {
    const progress = Storage.getProgress();

    // Stats du profil
    document.getElementById('stats-level').textContent = progress.level;
    document.getElementById('stats-total-points').textContent = progress.totalPoints;
    document.getElementById('stats-streak').textContent = progress.streak;
    document.getElementById('stats-lessons-completed').textContent = progress.stats.lessonsCompleted;
    document.getElementById('stats-badges-count').textContent = progress.badges.length;

    // Barre de progression du niveau
    const pointsInCurrentLevel = progress.totalPoints % 100;
    const progressPercentage = pointsInCurrentLevel;
    document.getElementById('stats-level-progress').style.width = progressPercentage + '%';

    const pointsToNext = 100 - pointsInCurrentLevel;
    document.getElementById('stats-points-to-next').textContent = pointsToNext;

    // Dernière session
    if (progress.lastStudyDate) {
      const lastDate = new Date(progress.lastStudyDate);
      const today = new Date();
      const isToday = lastDate.toDateString() === today.toDateString();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const isYesterday = lastDate.toDateString() === yesterday.toDateString();

      let dateText;
      if (isToday) {
        dateText = "Aujourd'hui";
      } else if (isYesterday) {
        dateText = "Hier";
      } else {
        dateText = lastDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
      }
      document.getElementById('stats-last-study').textContent = dateText;
    } else {
      document.getElementById('stats-last-study').textContent = 'Jamais';
    }

    // Stats d'activité
    document.getElementById('stats-transcriptions').textContent = progress.stats.transcriptionsCompleted || 0;
    document.getElementById('stats-words').textContent = progress.stats.wordsLearned || 0;

    // Stats des leçons
    const lessonsStatsList = document.getElementById('lessons-stats-list');
    lessonsStatsList.innerHTML = '';

    if (Object.keys(progress.lessons).length === 0) {
      lessonsStatsList.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: var(--spacing-lg);">Aucune leçon commencée pour le moment.</p>';
    } else {
      lessonsData.forEach(lesson => {
        const lessonProgress = progress.lessons[lesson.id];
        if (lessonProgress) {
          const item = document.createElement('div');
          item.className = 'lesson-stat-item';

          const lastAttemptDate = lessonProgress.lastAttempt ? new Date(lessonProgress.lastAttempt).toLocaleDateString('fr-FR') : 'Jamais';

          item.innerHTML = `
            <div class="lesson-stat-icon">${lesson.icon}</div>
            <div class="lesson-stat-info">
              <div class="lesson-stat-name">${lesson.title}</div>
              <div class="lesson-stat-details">
                <span class="lesson-stat-detail">📝 ${lessonProgress.attempts} tentative${lessonProgress.attempts > 1 ? 's' : ''}</span>
                <span class="lesson-stat-detail">📅 ${lastAttemptDate}</span>
              </div>
            </div>
            <div class="lesson-stat-score">${lessonProgress.bestScore}%</div>
            ${lessonProgress.completed ? '<div class="lesson-stat-badge">✓ Réussie</div>' : ''}
          `;

          lessonsStatsList.appendChild(item);
        }
      });
    }

    // Caractères à réviser
    const mistakes = Storage.getMistakesToReview();
    const mistakesCard = document.getElementById('mistakes-stats-card');
    const mistakesList = document.getElementById('mistakes-stats-list');

    if (mistakes.length > 0) {
      mistakesCard.style.display = 'block';
      mistakesList.innerHTML = '';

      // Récupérer les données complètes des hiragana
      const allHiragana = [];
      lessonsData.forEach(lesson => {
        lesson.hiragana.forEach(h => allHiragana.push(h));
      });

      mistakes.forEach(mistake => {
        const hiraganaData = allHiragana.find(h => h.char === mistake.char);
        if (hiraganaData) {
          const item = document.createElement('div');
          item.className = 'mistake-item';
          item.innerHTML = `
            <div class="mistake-count">${mistake.count}</div>
            <div class="mistake-char">${mistake.char}</div>
            <div class="mistake-romaji">${hiraganaData.romaji}</div>
          `;
          mistakesList.appendChild(item);
        }
      });
    } else {
      mistakesCard.style.display = 'none';
    }
  },

  renderLeaderboard: async function() {
    // Afficher un loading
    const leaderboardList = document.getElementById('leaderboard-list');
    const userRankCard = document.getElementById('user-rank-card');

    leaderboardList.innerHTML = '<div class="loading-text">⏳ Chargement du classement...</div>';

    try {
      // Récupérer le Top 50
      const top50 = await LeaderboardSystem.getTop50();

      // Récupérer le rang de l'utilisateur
      const userRank = await LeaderboardSystem.getUserRank();

      // Afficher le rang de l'utilisateur
      if (userRank) {
        userRankCard.style.display = 'block';
        document.getElementById('user-rank-position').textContent = `#${userRank.rank}`;
        document.getElementById('user-rank-username').textContent = userRank.username;
        document.getElementById('user-rank-xp').textContent = userRank.total_xp;
      } else {
        userRankCard.style.display = 'none';
      }

      // Afficher le classement
      if (top50.length === 0) {
        leaderboardList.innerHTML = '<div class="empty-leaderboard">Aucun joueur pour le moment. Soyez le premier ! 🎉</div>';
        return;
      }

      leaderboardList.innerHTML = '';
      top50.forEach((player, index) => {
        const item = document.createElement('div');
        item.className = 'leaderboard-item';

        // Highlight si c'est l'utilisateur actuel
        if (player.username === LeaderboardSystem.currentUsername) {
          item.classList.add('current-user');
        }

        // Médailles pour le top 3
        let rankDisplay = `#${player.rank}`;
        if (player.rank === 1) rankDisplay = '🥇';
        else if (player.rank === 2) rankDisplay = '🥈';
        else if (player.rank === 3) rankDisplay = '🥉';

        item.innerHTML = `
          <div class="leaderboard-rank">${rankDisplay}</div>
          <div class="leaderboard-info">
            <div class="leaderboard-username">${player.username}</div>
            <div class="leaderboard-stats">
              <span class="leaderboard-stat">🏆 Niveau ${player.level}</span>
              <span class="leaderboard-stat">🔥 ${player.streak} jours</span>
              <span class="leaderboard-stat">📚 ${player.lessons_completed}/10</span>
            </div>
          </div>
          <div class="leaderboard-xp">${player.total_xp} XP</div>
        `;

        leaderboardList.appendChild(item);
      });

    } catch (error) {
      console.error('❌ Erreur chargement leaderboard:', error);
      leaderboardList.innerHTML = `
        <div class="error-message">
          ❌ Erreur de chargement du classement.<br>
          Vérifiez votre connexion internet.
        </div>
      `;
    }
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
      } else if (step.type === 'dialogue') {
        appState.selectedQuestions.push({ type: 'dialogue', data: step });
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
      case 'dialogue':
        this.renderDialogue(container, question);
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
              ${AudioPlayer.createButton(h.char, 'small')}
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

  renderDialogue: function(container, question) {
    const dialogueData = question.data.dialogue;
    const lesson = appState.currentLesson;

    // Extraire le numéro de leçon (lesson1 → l1, lesson2 → l2, etc.)
    const lessonNum = lesson.id.replace('lesson', 'l');

    container.innerHTML = `
      <div class="exercise">
        <h2 class="exercise-title">💬 ${question.data.title}</h2>
        <p class="exercise-instruction">${question.data.instruction}</p>
        <div class="dialogue-context">${question.data.context}</div>
        <div class="dialogue-container">
          ${dialogueData.lines.map((line, index) => {
            // Créer un ID unique pour chaque ligne de dialogue
            const dialogueId = `dialogue_${lessonNum}_line${index + 1}`;

            return `
              <div class="dialogue-line">
                <div class="dialogue-speaker">${line.speaker}</div>
                <div class="dialogue-content">
                  <div class="dialogue-hiragana">
                    ${AudioPlayer.createButton(line.hiragana, 'small', dialogueId)}
                    <span>${line.hiragana}</span>
                  </div>
                  <div class="dialogue-romaji">${line.romaji}</div>
                  <div class="dialogue-french">${line.french}</div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
        <button class="primary-btn next-btn" onclick="LessonController.nextQuestion()">
          Suivant →
        </button>
      </div>
    `;
  },

  renderMCQ: function(container, question) {
    // Mélanger les options pour chaque affichage
    const shuffledOptions = this.shuffleArray([...question.data.options]);

    container.innerHTML = `
      <div class="exercise">
        <h2 class="exercise-title">❓ ${question.title}</h2>
        <p class="exercise-instruction">${question.instruction}</p>
        <div class="question-hiragana-container">
          ${AudioPlayer.createButton(question.data.hiragana, 'medium')}
          <div class="question-hiragana">${question.data.hiragana}</div>
        </div>
        <div class="options-grid">
          ${shuffledOptions.map(option => `
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

        // Mettre à jour le score et enregistrer les erreurs
        if (isCorrect) {
          appState.score++;
        } else {
          // Enregistrer l'erreur pour ce hiragana
          Storage.recordMistake(question.data.hiragana);
        }

        // Passer à la question suivante après un délai
        setTimeout(() => LessonController.nextQuestion(), 1500);
      });
    });
  },

  renderIntruder: function(container, question) {
    // Mélanger les options pour chaque affichage
    const shuffledOptions = this.shuffleArray([...question.data.options]);

    container.innerHTML = `
      <div class="exercise">
        <h2 class="exercise-title">🔍 ${question.title}</h2>
        <p class="exercise-instruction">${question.instruction}</p>
        <div class="options-grid">
          ${shuffledOptions.map(option => `
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

        if (isCorrect) {
          appState.score++;
        } else {
          // Enregistrer l'intrus comme erreur (le caractère que l'utilisateur n'a pas su identifier)
          Storage.recordMistake(question.data.intruder);
        }

        setTimeout(() => LessonController.nextQuestion(), 2000);
      });
    });
  },

  renderTranscription: function(container, question) {
    container.innerHTML = `
      <div class="exercise">
        <h2 class="exercise-title">✍️ ${question.title}</h2>
        <p class="exercise-instruction">${question.instruction}</p>
        <div class="transcription-container">
          ${AudioPlayer.createButton(question.data.hiragana, 'medium')}
          <div class="transcription-word">${question.data.hiragana}</div>
        </div>
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

    if (isCorrect) {
      appState.score++;
    } else {
      // Enregistrer chaque hiragana du mot comme erreur
      const hiraganaChars = question.data.hiragana.split('');
      hiraganaChars.forEach(char => Storage.recordMistake(char));
    }

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
        <div class="transcription-container">
          ${AudioPlayer.createButton(question.data.hiragana, 'medium')}
          <div class="transcription-word">${question.data.hiragana}</div>
        </div>
        <p class="transcription-meaning">${question.data.meaning}</p>
        <div class="input-container">
          <input type="text" class="transcription-input" id="sentence-input" placeholder="Écrivez en romaji..." autocomplete="off">
        </div>
        <div id="feedback"></div>
        <button class="primary-btn next-btn" onclick="LessonController.checkSentence()">
          Valider
        </button>
      </div>
    `;

    // Focus sur l'input
    const input = document.getElementById('sentence-input');
    input.focus();

    // Validation avec Enter
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        LessonController.checkSentence();
      }
    });
  },

  checkSentence: function() {
    const question = appState.selectedQuestions[appState.currentQuestion];
    const input = document.getElementById('sentence-input');
    const answer = input.value.toLowerCase().trim();
    const correct = question.data.romaji.toLowerCase();

    const isCorrect = answer === correct;

    input.classList.add(isCorrect ? 'correct' : 'incorrect');
    input.disabled = true;

    const feedback = document.getElementById('feedback');
    feedback.className = 'feedback ' + (isCorrect ? 'success' : 'error');
    feedback.innerHTML = isCorrect
      ? '✅ Bonne réponse !'
      : `❌ La bonne réponse était : ${question.data.romaji}`;

    if (isCorrect) {
      appState.score++;
    } else {
      // Enregistrer chaque hiragana du mot comme erreur
      const hiraganaChars = question.data.hiragana.split('');
      hiraganaChars.forEach(char => Storage.recordMistake(char));
    }

    setTimeout(() => LessonController.nextQuestion(), 1500);
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

// ===== MODE EXPRESS 90s =====
const ExpressMode = {
  timer: null,
  timeRemaining: 90,
  currentQuestion: 0,
  questions: [],
  score: 0,
  startTime: 0,

  start: function() {
    this.reset();
    this.selectQuestions();
    Navigation.showScreen('express-game-screen');
    this.startTimer();
    this.renderQuestion();
  },

  reset: function() {
    this.timeRemaining = 90;
    this.currentQuestion = 0;
    this.score = 0;
    this.questions = [];
    this.startTime = Date.now();
    if (this.timer) clearInterval(this.timer);
  },

  selectQuestions: function() {
    // Récupérer tous les hiragana de toutes les leçons
    let allHiragana = [];
    lessonsData.forEach(lesson => {
      lesson.hiragana.forEach(h => {
        allHiragana.push({ char: h.char, romaji: h.romaji });
      });
    });

    // Récupérer les erreurs du Storage
    const progress = Storage.getProgress();
    const mistakesData = progress.mistakes || {};

    // Créer un pool pondéré basé sur les erreurs
    let weightedPool = [];
    allHiragana.forEach(h => {
      const mistakeCount = mistakesData[h.char]?.count || 0;
      const weight = Math.max(1, mistakeCount * 3); // Plus d'erreurs = plus de poids
      for (let i = 0; i < weight; i++) {
        weightedPool.push(h);
      }
    });

    // Sélectionner 5 hiragana aléatoires du pool pondéré
    const selectedHiragana = [];
    for (let i = 0; i < 5 && weightedPool.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * weightedPool.length);
      const selected = weightedPool[randomIndex];
      selectedHiragana.push(selected);
      // Retirer tous les exemplaires de ce hiragana du pool
      weightedPool = weightedPool.filter(h => h.char !== selected.char);
    }

    // Créer les questions MCQ
    this.questions = selectedHiragana.map(h => {
      // Générer 3 mauvaises options différentes
      const wrongOptions = allHiragana
        .filter(oh => oh.romaji !== h.romaji)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(oh => oh.romaji);

      const options = [h.romaji, ...wrongOptions].sort(() => Math.random() - 0.5);

      return {
        hiragana: h.char,
        correct: h.romaji,
        options: options
      };
    });
  },

  startTimer: function() {
    const timerEl = document.getElementById('express-timer');

    this.timer = setInterval(() => {
      this.timeRemaining--;
      timerEl.textContent = this.timeRemaining;

      // Ajouter classes warning/danger
      timerEl.classList.remove('warning', 'danger');
      if (this.timeRemaining <= 10) {
        timerEl.classList.add('danger');
      } else if (this.timeRemaining <= 30) {
        timerEl.classList.add('warning');
      }

      if (this.timeRemaining <= 0) {
        clearInterval(this.timer);
        this.showResults();
      }
    }, 1000);
  },

  renderQuestion: function() {
    if (this.currentQuestion >= this.questions.length) {
      this.showResults();
      return;
    }

    const question = this.questions[this.currentQuestion];
    const container = document.getElementById('express-question-container');

    // Mettre à jour le compteur
    document.getElementById('express-current-q').textContent = this.currentQuestion + 1;
    document.getElementById('express-total-q').textContent = this.questions.length;

    container.innerHTML = `
      <div class="exercise">
        <h2 class="exercise-title">⚡ Question ${this.currentQuestion + 1}</h2>
        <div class="question-hiragana-container">
          ${AudioPlayer.createButton(question.hiragana, 'medium')}
          <div class="question-hiragana">${question.hiragana}</div>
        </div>
        <div class="options-grid">
          ${question.options.map(option => `
            <button class="option-btn express-option-btn" data-answer="${option}">${option}</button>
          `).join('')}
        </div>
        <div id="express-feedback"></div>
      </div>
    `;

    // Ajouter les event listeners
    document.querySelectorAll('.express-option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleAnswer(e.target.dataset.answer));
    });
  },

  handleAnswer: function(answer) {
    const question = this.questions[this.currentQuestion];
    const isCorrect = answer === question.correct;

    if (isCorrect) {
      this.score++;
    } else {
      // Enregistrer l'erreur dans Storage
      Storage.recordMistake(question.hiragana);
    }

    // Feedback visuel rapide
    const feedback = document.getElementById('express-feedback');
    feedback.innerHTML = isCorrect ?
      '<p class="feedback-correct">✓ Correct !</p>' :
      '<p class="feedback-wrong">✗ ' + question.correct + '</p>';

    // Passer à la question suivante après un court délai
    setTimeout(() => {
      this.currentQuestion++;
      this.renderQuestion();
    }, 800);
  },

  showResults: function() {
    clearInterval(this.timer);
    const timeUsed = Math.floor((Date.now() - this.startTime) / 1000);
    const timeTaken = Math.min(timeUsed, 90);

    document.getElementById('express-final-score').textContent = this.score;
    document.getElementById('express-correct').textContent = this.score;
    document.getElementById('express-wrong').textContent = this.questions.length - this.score;
    document.getElementById('express-time-taken').textContent = timeTaken;

    // Titre selon le score
    const title = document.getElementById('express-results-title');
    if (this.score === 5) {
      title.textContent = 'Parfait ! 🎉';
    } else if (this.score >= 3) {
      title.textContent = 'Bien joué ! 👍';
    } else {
      title.textContent = 'Continue ! 💪';
    }

    // Ajouter des points bonus
    const bonusPoints = this.score * 10;
    const progress = Storage.getProgress();
    progress.totalPoints += bonusPoints;
    progress.level = Math.floor(progress.totalPoints / 100) + 1;
    Storage.saveProgress(progress);

    // Sync automatique avec le leaderboard
    if (typeof LeaderboardSystem !== 'undefined') {
      LeaderboardSystem.syncToLeaderboard().catch(err =>
        console.warn('⚠️ Sync leaderboard échoué', err)
      );
    }

    Navigation.showScreen('express-results-screen');

    // Lancer les confettis si score >= 4
    if (this.score >= 4) {
      setTimeout(() => this.launchConfetti(), 300);
    }
  },

  launchConfetti: function() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiCount = 100;
    const confetti = [];
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#FFD700'];

    for (let i = 0; i < confettiCount; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * confettiCount,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleIncremental: Math.random() * 0.07 + 0.05,
        tiltAngle: 0
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confetti.forEach((c, i) => {
        ctx.beginPath();
        ctx.lineWidth = c.r / 2;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + c.r / 3, c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 5);
        ctx.stroke();

        c.tiltAngle += c.tiltAngleIncremental;
        c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
        c.x += Math.sin(c.d);
        c.tilt = Math.sin(c.tiltAngle - i / 3) * 15;

        if (c.y > canvas.height) {
          confetti[i] = {
            x: Math.random() * canvas.width,
            y: -30,
            r: c.r,
            d: c.d,
            color: c.color,
            tilt: c.tilt,
            tiltAngle: c.tiltAngle,
            tiltAngleIncremental: c.tiltAngleIncremental
          };
        }
      });

      requestAnimationFrame(draw);
    }

    draw();

    // Arrêter après 5 secondes
    setTimeout(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, 5000);
  },

  quit: function() {
    if (confirm('Êtes-vous sûr de vouloir quitter ? Votre progression sera perdue.')) {
      clearInterval(this.timer);
      Navigation.goToHome();
    }
  }
};

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', function() {
  // Boutons de navigation
  document.getElementById('config-back-btn')?.addEventListener('click', () => Navigation.goToHome());
  document.getElementById('lesson-back-btn')?.addEventListener('click', () => Navigation.goToHome());
  document.getElementById('start-lesson-btn')?.addEventListener('click', () => Navigation.goToLesson());
  document.getElementById('retry-btn')?.addEventListener('click', () => {
    if (appState.currentLesson.id === 'review') {
      Navigation.goToReview();
    } else {
      Navigation.goToConfig(appState.currentLesson.id);
    }
  });
  document.getElementById('continue-btn')?.addEventListener('click', () => Navigation.goToHome());
  document.getElementById('badges-btn')?.addEventListener('click', () => Navigation.goToBadges());
  document.getElementById('badges-back-btn')?.addEventListener('click', () => Navigation.goToHome());
  document.getElementById('stats-btn')?.addEventListener('click', () => Navigation.goToStats());
  document.getElementById('stats-back-btn')?.addEventListener('click', () => Navigation.goToHome());
  document.getElementById('start-review-btn')?.addEventListener('click', () => Navigation.goToReview());
  document.getElementById('close-badge-modal')?.addEventListener('click', closeBadgeModal);

  // Leaderboard
  document.getElementById('leaderboard-btn')?.addEventListener('click', () => Navigation.goToLeaderboard());
  document.getElementById('leaderboard-back-btn')?.addEventListener('click', () => Navigation.goToHome());

  // Mode Express
  document.getElementById('start-express-btn')?.addEventListener('click', () => ExpressMode.start());
  document.getElementById('express-quit-btn')?.addEventListener('click', () => ExpressMode.quit());
  document.getElementById('express-retry-btn')?.addEventListener('click', () => ExpressMode.start());
  document.getElementById('express-home-btn')?.addEventListener('click', () => Navigation.goToHome());

  // Initialisation
  setTimeout(() => {
    Navigation.goToHome();
  }, 1500);
});
