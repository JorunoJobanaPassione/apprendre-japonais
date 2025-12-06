/**
 * 📖 MODE HISTOIRE/AVENTURE - UI Logic
 * Gestion de l'interface utilisateur du mode histoire
 */

// Variables globales
let currentChapter = null;

// Initialisation du mode histoire
function initStoryMode() {
  console.log('📖 Initialisation du Mode Histoire...');

  try {
    // Bouton "Explorer" dans l'accueil
    const storyBtn = document.getElementById('start-story-btn');
    console.log('Bouton Explorer trouvé:', storyBtn);
    if (storyBtn) {
      storyBtn.addEventListener('click', openStoryMap);
      console.log('✅ Event listener ajouté au bouton Explorer');
    } else {
      console.error('❌ Bouton Explorer non trouvé dans le DOM !');
      console.log('Elements disponibles:', document.querySelectorAll('[id*="story"]'));
    }

  // Bouton retour depuis la carte
  const backBtn = document.getElementById('story-back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      hideScreen('story-map-screen');
      showScreen('home-screen');
    });
  }

  // Fermer le modal de chapitre
  const closeChapterModal = document.getElementById('close-chapter-modal');
  if (closeChapterModal) {
    closeChapterModal.addEventListener('click', hideChapterModal);
  }

  const chapterOverlay = document.getElementById('chapter-modal-overlay');
  if (chapterOverlay) {
    chapterOverlay.addEventListener('click', hideChapterModal);
  }

  // Commencer une leçon depuis le modal
  const startLessonBtn = document.getElementById('modal-start-lesson');
  if (startLessonBtn) {
    startLessonBtn.addEventListener('click', startChapterLesson);
  }

  // Mettre à jour le pourcentage de progression sur l'accueil
  updateStoryProgressDisplay();

  console.log('✅ Mode Histoire initialisé avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation du Mode Histoire:', error);
  }
}

// Ouvrir la carte du mode histoire
function openStoryMap() {
  hideScreen('home-screen');
  showScreen('story-map-screen');
  renderStoryMap();
  renderChaptersList();
  updateStoryProgress();
}

// Afficher/Masquer les écrans
function showScreen(screenId) {
  document.getElementById(screenId).style.display = 'flex';
}

function hideScreen(screenId) {
  document.getElementById(screenId).style.display = 'none';
}

// Rendre la carte interactive
function renderStoryMap() {
  const mapPointsContainer = document.getElementById('map-points');
  mapPointsContainer.innerHTML = '';

  storyData.chapters.forEach((chapter, index) => {
    const point = document.createElement('div');
    point.className = 'map-point';
    point.style.left = `${chapter.coordinates.x}%`;
    point.style.top = `${chapter.coordinates.y}%`;
    point.textContent = chapter.location.split(' ')[0]; // Juste l'emoji

    // Ajouter les classes selon le statut
    if (chapter.unlocked) {
      point.classList.add('unlocked');
      // Vérifier si c'est le chapitre actuel (dernier débloqué)
      const nextChapter = storyData.chapters[index + 1];
      if (!nextChapter || !nextChapter.unlocked) {
        point.classList.add('current');
      }
    } else {
      point.classList.add('locked');
    }

    // Event listener
    if (chapter.unlocked) {
      point.addEventListener('click', () => showChapterModal(chapter));
    }

    mapPointsContainer.appendChild(point);
  });
}

// Rendre la liste des chapitres
function renderChaptersList() {
  const chaptersContainer = document.getElementById('chapters-container');
  chaptersContainer.innerHTML = '';

  storyData.chapters.forEach((chapter, index) => {
    const card = document.createElement('div');
    card.className = 'chapter-card';

    // Ajouter les classes selon le statut
    if (chapter.unlocked) {
      card.classList.add('unlocked');
      // Vérifier si complété (basé sur la progression des leçons)
      const lessonCompleted = localStorage.getItem(`lesson_${chapter.lessonId}_completed`) === 'true';
      if (lessonCompleted) {
        card.classList.add('completed');
      }
    } else {
      card.classList.add('locked');
    }

    // Numéro du chapitre
    const number = document.createElement('div');
    number.className = 'chapter-number';
    number.textContent = index + 1;

    // Informations du chapitre
    const info = document.createElement('div');
    info.className = 'chapter-info';

    const location = document.createElement('p');
    location.className = 'chapter-location-text';
    location.textContent = chapter.location;

    const title = document.createElement('h4');
    title.className = 'chapter-title-text';
    title.textContent = chapter.title;

    info.appendChild(location);
    info.appendChild(title);

    // Statut
    const status = document.createElement('div');
    status.className = 'chapter-status';

    const lessonCompleted = localStorage.getItem(`lesson_${chapter.lessonId}_completed`) === 'true';
    if (lessonCompleted) {
      status.classList.add('completed');
      status.textContent = '✓';
    } else if (chapter.unlocked) {
      status.textContent = '▶️';
    } else {
      status.classList.add('locked');
      status.textContent = '🔒';
    }

    // Assembler la carte
    card.appendChild(number);
    card.appendChild(info);
    card.appendChild(status);

    // Event listener
    if (chapter.unlocked) {
      card.addEventListener('click', () => showChapterModal(chapter));
    }

    chaptersContainer.appendChild(card);
  });
}

// Afficher le modal de détail d'un chapitre
function showChapterModal(chapter) {
  currentChapter = chapter;

  // Remplir les données du modal
  document.getElementById('modal-chapter-location').textContent = chapter.location;
  document.getElementById('modal-chapter-title').textContent = chapter.title;
  document.getElementById('modal-chapter-intro').textContent = chapter.story.intro;
  document.getElementById('modal-chapter-challenge').textContent = chapter.story.challenge;
  document.getElementById('modal-chapter-reward').textContent = chapter.story.reward;

  // Afficher les personnages
  const charactersContainer = document.getElementById('modal-chapter-characters');
  charactersContainer.innerHTML = '';

  if (chapter.story.characters && chapter.story.characters.length > 0) {
    const charactersTitle = document.createElement('strong');
    charactersTitle.textContent = '👥 Personnages :';
    charactersContainer.appendChild(charactersTitle);

    const charactersDiv = document.createElement('div');
    charactersDiv.style.marginTop = '8px';

    chapter.story.characters.forEach(charId => {
      const charData = storyData.characters[charId];
      if (charData) {
        const badge = document.createElement('span');
        badge.className = 'character-badge';
        badge.innerHTML = `
          <span class="character-icon">${charData.icon}</span>
          <span class="character-name">${charData.name}</span>
        `;
        charactersDiv.appendChild(badge);
      }
    });

    charactersContainer.appendChild(charactersDiv);
  }

  // Afficher le modal
  document.getElementById('chapter-modal').style.display = 'flex';

  // Animation d'entrée
  setTimeout(() => {
    document.getElementById('chapter-modal').style.opacity = '1';
  }, 10);
}

// Masquer le modal de chapitre
function hideChapterModal() {
  const modal = document.getElementById('chapter-modal');
  modal.style.opacity = '0';
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
  currentChapter = null;
}

// Commencer la leçon du chapitre
function startChapterLesson() {
  if (!currentChapter) return;

  // Fermer le modal
  hideChapterModal();

  // Fermer l'écran de la carte
  hideScreen('story-map-screen');

  // Afficher l'histoire d'introduction en modal ou notification
  showChapterIntroNotification(currentChapter);

  // Démarrer la leçon correspondante (on utilise la fonction existante du projet)
  setTimeout(() => {
    // Trouver la leçon correspondante
    const lessonElement = document.querySelector(`[data-lesson-id="${currentChapter.lessonId}"]`);
    if (lessonElement) {
      lessonElement.click();
    } else {
      // Fallback: naviguer vers l'écran d'accueil et afficher les leçons
      showScreen('home-screen');
    }
  }, 1500);
}

// Afficher une notification d'introduction de chapitre
function showChapterIntroNotification(chapter) {
  // Créer une notification temporaire
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 32px;
    border-radius: 16px;
    max-width: 500px;
    text-align: center;
    z-index: 10000;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    animation: slideDown 0.5s ease;
  `;

  notification.innerHTML = `
    <div style="font-size: 48px; margin-bottom: 16px;">${chapter.location.split(' ')[0]}</div>
    <h3 style="font-size: 24px; margin: 0 0 12px 0;">${chapter.title}</h3>
    <p style="font-size: 16px; opacity: 0.95; margin: 0;">${chapter.story.intro}</p>
  `;

  document.body.appendChild(notification);

  // Retirer après 3 secondes
  setTimeout(() => {
    notification.style.animation = 'slideUp 0.5s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 3000);
}

// Mettre à jour l'affichage de la progression
function updateStoryProgress() {
  const completed = storyData.chapters.filter(ch => ch.unlocked).length;
  document.getElementById('story-chapters-completed').textContent = completed;
}

// Mettre à jour l'affichage du pourcentage sur l'écran d'accueil
function updateStoryProgressDisplay() {
  const percentage = getStoryCompletionPercentage();
  const percentElement = document.getElementById('story-progress-percent');
  if (percentElement) {
    percentElement.textContent = `${percentage}%`;
  }
}

// Fonction appelée quand une leçon est terminée pour débloquer le chapitre suivant
function onLessonCompleted(lessonId) {
  // Trouver le chapitre correspondant
  const chapter = getChapterByLessonId(lessonId);
  if (chapter) {
    // Marquer comme complété
    localStorage.setItem(`lesson_${lessonId}_completed`, 'true');

    // Débloquer le chapitre suivant
    const nextChapter = unlockNextChapter(lessonId);

    if (nextChapter) {
      // Afficher une notification
      showChapterUnlockedNotification(nextChapter);
    }

    // Vérifier si c'est le dernier chapitre
    if (chapter.id === 'chapter11') {
      showFinalReward();
    }

    // Mettre à jour l'affichage
    updateStoryProgressDisplay();
  }
}

// Notification de déblocage de chapitre
function showChapterUnlockedNotification(chapter) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%);
    color: white;
    padding: 20px 32px;
    border-radius: 12px;
    z-index: 10000;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    animation: slideUp 0.5s ease;
    text-align: center;
  `;

  notification.innerHTML = `
    <div style="font-size: 32px; margin-bottom: 8px;">🗺️</div>
    <div style="font-size: 16px; font-weight: 700;">Nouveau lieu débloqué !</div>
    <div style="font-size: 14px; opacity: 0.95; margin-top: 4px;">${chapter.location} - ${chapter.title}</div>
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideDown 0.5s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 4000);
}

// Afficher la récompense finale
function showFinalReward() {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10001;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fadeIn 0.5s ease;
  `;

  modal.innerHTML = `
    <div style="background: white; padding: 48px; border-radius: 24px; max-width: 500px; text-align: center;">
      <div style="font-size: 80px; margin-bottom: 24px;">🎓</div>
      <h2 style="font-size: 32px; color: #667eea; margin: 0 0 16px 0;">
        ${storyData.finalReward.title}
      </h2>
      <p style="font-size: 18px; color: #555; margin-bottom: 32px;">
        ${storyData.finalReward.description}
      </p>
      <div style="text-align: left; margin-bottom: 32px;">
        <strong style="display: block; margin-bottom: 16px; color: #667eea;">Déblocages :</strong>
        ${storyData.finalReward.unlocks.map(unlock =>
          `<div style="padding: 8px; background: #f8f9fa; margin-bottom: 8px; border-radius: 8px;">✓ ${unlock}</div>`
        ).join('')}
      </div>
      <button onclick="this.parentElement.parentElement.remove()" style="
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 16px 48px;
        border-radius: 24px;
        font-size: 18px;
        font-weight: 700;
        cursor: pointer;
      ">
        Incroyable ! 🎉
      </button>
    </div>
  `;

  document.body.appendChild(modal);
}

// Ajouter les animations CSS
const storyModeStyle = document.createElement('style');
storyModeStyle.textContent = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translate(-50%, -60%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  #chapter-modal {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
`;
document.head.appendChild(storyModeStyle);

// Exporter la fonction pour l'utiliser dans app.js
window.onLessonCompleted = onLessonCompleted;
window.updateStoryProgressDisplay = updateStoryProgressDisplay;

// Initialiser immédiatement si le DOM est prêt, sinon attendre
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initStoryMode, 500);
  });
} else {
  setTimeout(initStoryMode, 500);
}
