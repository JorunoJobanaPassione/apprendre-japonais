/**
 * 📱 MOBILE SWIPE NAVIGATION
 * Gestion des gestes de swipe pour naviguer entre les questions/exercices
 * Compatible avec tous les types d'exercices (MCQ, Hiragana, Katakana, Kanji, etc.)
 */

class MobileSwipeHandler {
  constructor() {
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.touchStartY = 0;
    this.touchEndY = 0;
    this.swipeThreshold = 80; // Distance minimale pour déclencher un swipe (en pixels)
    this.verticalThreshold = 50; // Tolérance verticale pour éviter les faux swipes
    this.isEnabled = false;
    this.currentContainer = null;
    this.swipeHintShown = false;
    this.swipeIndicators = {
      left: null,
      right: null
    };

    console.log('📱 MobileSwipeHandler initialisé');
  }

  /**
   * Initialiser le swipe pour un container donné
   */
  init(containerId) {
    if (!this.isMobileDevice()) {
      console.log('⏭️ Swipe désactivé (non mobile)');
      return;
    }

    this.currentContainer = document.getElementById(containerId);

    if (!this.currentContainer) {
      console.error(`❌ Container ${containerId} introuvable`);
      return;
    }

    // Créer les indicateurs visuels
    this.createSwipeIndicators();

    // Attacher les événements de touch
    this.attachTouchEvents();

    // Afficher le hint de swipe (une seule fois)
    this.showSwipeHint();

    this.isEnabled = true;
    console.log(`✅ Swipe activé pour ${containerId}`);
  }

  /**
   * Désactiver le swipe
   */
  disable() {
    if (this.currentContainer) {
      this.detachTouchEvents();
      this.removeSwipeIndicators();
      this.removeSwipeHint();
      this.isEnabled = false;
      this.currentContainer = null;
      console.log('⏸️ Swipe désactivé');
    }
  }

  /**
   * Vérifier si l'appareil est mobile
   */
  isMobileDevice() {
    return window.innerWidth <= 768 ||
           ('ontouchstart' in window) ||
           (navigator.maxTouchPoints > 0);
  }

  /**
   * Créer les indicateurs visuels de swipe
   */
  createSwipeIndicators() {
    // Indicateur gauche (←)
    this.swipeIndicators.left = document.createElement('div');
    this.swipeIndicators.left.className = 'swipe-indicator left';
    this.swipeIndicators.left.innerHTML = '←';
    document.body.appendChild(this.swipeIndicators.left);

    // Indicateur droit (→)
    this.swipeIndicators.right = document.createElement('div');
    this.swipeIndicators.right.className = 'swipe-indicator right';
    this.swipeIndicators.right.innerHTML = '→';
    document.body.appendChild(this.swipeIndicators.right);
  }

  /**
   * Supprimer les indicateurs visuels
   */
  removeSwipeIndicators() {
    if (this.swipeIndicators.left) {
      this.swipeIndicators.left.remove();
      this.swipeIndicators.left = null;
    }
    if (this.swipeIndicators.right) {
      this.swipeIndicators.right.remove();
      this.swipeIndicators.right = null;
    }
  }

  /**
   * Afficher le hint de swipe (première fois uniquement)
   */
  showSwipeHint() {
    // Vérifier si le hint a déjà été montré
    const hintShown = localStorage.getItem('swipe_hint_shown');
    if (hintShown) return;

    const hint = document.createElement('div');
    hint.className = 'swipe-hint';
    hint.innerHTML = '👆 Swipe ← → pour naviguer';
    document.body.appendChild(hint);

    // Masquer après 4 secondes
    setTimeout(() => {
      hint.style.opacity = '0';
      setTimeout(() => hint.remove(), 300);
    }, 4000);

    // Marquer comme montré
    localStorage.setItem('swipe_hint_shown', 'true');
  }

  /**
   * Supprimer le hint de swipe
   */
  removeSwipeHint() {
    const hint = document.querySelector('.swipe-hint');
    if (hint) hint.remove();
  }

  /**
   * Attacher les événements de touch
   */
  attachTouchEvents() {
    this.handleTouchStart = this.onTouchStart.bind(this);
    this.handleTouchMove = this.onTouchMove.bind(this);
    this.handleTouchEnd = this.onTouchEnd.bind(this);

    this.currentContainer.addEventListener('touchstart', this.handleTouchStart, { passive: true });
    this.currentContainer.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    this.currentContainer.addEventListener('touchend', this.handleTouchEnd, { passive: true });
  }

  /**
   * Détacher les événements de touch
   */
  detachTouchEvents() {
    if (this.currentContainer) {
      this.currentContainer.removeEventListener('touchstart', this.handleTouchStart);
      this.currentContainer.removeEventListener('touchmove', this.handleTouchMove);
      this.currentContainer.removeEventListener('touchend', this.handleTouchEnd);
    }
  }

  /**
   * Gérer le début du touch
   */
  onTouchStart(event) {
    this.touchStartX = event.changedTouches[0].screenX;
    this.touchStartY = event.changedTouches[0].screenY;
  }

  /**
   * Gérer le mouvement du touch
   */
  onTouchMove(event) {
    const currentX = event.changedTouches[0].screenX;
    const currentY = event.changedTouches[0].screenY;

    const deltaX = currentX - this.touchStartX;
    const deltaY = Math.abs(currentY - this.touchStartY);

    // Afficher les indicateurs si le swipe horizontal est détecté
    if (Math.abs(deltaX) > 30 && deltaY < this.verticalThreshold) {
      if (deltaX > 0 && this.swipeIndicators.left) {
        this.swipeIndicators.left.classList.add('active');
        this.swipeIndicators.right.classList.remove('active');
      } else if (deltaX < 0 && this.swipeIndicators.right) {
        this.swipeIndicators.right.classList.add('active');
        this.swipeIndicators.left.classList.remove('active');
      }

      // Empêcher le scroll vertical si swipe horizontal
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        event.preventDefault();
      }
    }
  }

  /**
   * Gérer la fin du touch
   */
  onTouchEnd(event) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.touchEndY = event.changedTouches[0].screenY;

    // Masquer les indicateurs
    if (this.swipeIndicators.left) this.swipeIndicators.left.classList.remove('active');
    if (this.swipeIndicators.right) this.swipeIndicators.right.classList.remove('active');

    // Détecter le swipe
    this.handleSwipe();
  }

  /**
   * Détecter et gérer le swipe
   */
  handleSwipe() {
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = Math.abs(this.touchEndY - this.touchStartY);

    // Vérifier que c'est un swipe horizontal (pas vertical)
    if (deltaY > this.verticalThreshold) {
      console.log('⏭️ Swipe annulé (mouvement trop vertical)');
      return;
    }

    // Swipe vers la droite (→) = question précédente
    if (deltaX > this.swipeThreshold) {
      console.log('👆 Swipe droite détecté → Question précédente');
      this.onSwipeRight();
    }
    // Swipe vers la gauche (←) = question suivante
    else if (deltaX < -this.swipeThreshold) {
      console.log('👆 Swipe gauche détecté → Question suivante');
      this.onSwipeLeft();
    }
  }

  /**
   * Swipe vers la droite → Question précédente
   */
  onSwipeRight() {
    // Vérifier qu'on n'est pas à la première question
    if (appState.currentQuestion > 0) {
      // Retourner à la question précédente
      appState.currentQuestion--;

      // Animation de transition
      this.animateSwipeTransition('right');

      // Afficher la question précédente
      setTimeout(() => {
        // Utiliser la fonction de rendu appropriée selon le mode
        if (typeof LessonController !== 'undefined' && LessonController.renderCurrentExercise) {
          LessonController.renderCurrentExercise();
        } else if (typeof ExpressMode !== 'undefined' && ExpressMode.renderQuestion) {
          ExpressMode.renderQuestion();
        }
      }, 150);
    } else {
      // Feedback visuel : on est déjà à la première question
      this.showSwipeFeedback('⏪ Première question', 'info');
    }
  }

  /**
   * Swipe vers la gauche → Question suivante
   */
  onSwipeLeft() {
    // Vérifier qu'on n'est pas à la dernière question ET qu'on a répondu
    const currentQuestion = appState.selectedQuestions ? appState.selectedQuestions[appState.currentQuestion] : null;

    // Pour le mode Express, ne pas bloquer le swipe (pas de notion de "répondu")
    const isExpressMode = document.getElementById('express-game-screen')?.style.display !== 'none';

    if (!isExpressMode && currentQuestion && !currentQuestion.answered) {
      // Feedback visuel : il faut d'abord répondre
      this.showSwipeFeedback('⚠️ Réponds d\'abord à la question', 'warning');
      return;
    }

    const totalQuestions = appState.selectedQuestions ? appState.selectedQuestions.length :
                           (ExpressMode && ExpressMode.questions ? ExpressMode.questions.length : 0);

    if (appState.currentQuestion < totalQuestions - 1) {
      // Passer à la question suivante
      appState.currentQuestion++;

      // Animation de transition
      this.animateSwipeTransition('left');

      // Afficher la question suivante
      setTimeout(() => {
        // Utiliser la fonction de rendu appropriée selon le mode
        if (typeof LessonController !== 'undefined' && LessonController.renderCurrentExercise) {
          LessonController.renderCurrentExercise();
        } else if (typeof ExpressMode !== 'undefined' && ExpressMode.renderQuestion) {
          ExpressMode.renderQuestion();
        }
      }, 150);
    } else {
      // Feedback visuel : c'est la dernière question, afficher les résultats
      this.showSwipeFeedback('✅ Dernière question → Voir les résultats', 'success');

      // Afficher automatiquement les résultats après 1 seconde
      setTimeout(() => {
        if (typeof Navigation !== 'undefined' && Navigation.goToResults) {
          Navigation.goToResults();
        }
      }, 1000);
    }
  }

  /**
   * Animation de transition lors du swipe
   */
  animateSwipeTransition(direction) {
    if (!this.currentContainer) return;

    const translateValue = direction === 'left' ? '-100%' : '100%';

    // Slide out
    this.currentContainer.style.transition = 'transform 0.2s ease-out, opacity 0.2s ease-out';
    this.currentContainer.style.transform = `translateX(${translateValue})`;
    this.currentContainer.style.opacity = '0.5';

    // Slide in
    setTimeout(() => {
      this.currentContainer.style.transition = 'none';
      this.currentContainer.style.transform = `translateX(${direction === 'left' ? '100%' : '-100%'})`;

      setTimeout(() => {
        this.currentContainer.style.transition = 'transform 0.2s ease-out, opacity 0.2s ease-out';
        this.currentContainer.style.transform = 'translateX(0)';
        this.currentContainer.style.opacity = '1';
      }, 50);
    }, 200);
  }

  /**
   * Afficher un feedback visuel
   */
  showSwipeFeedback(message, type = 'info') {
    const feedback = document.createElement('div');
    feedback.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: ${type === 'warning' ? 'rgba(239, 68, 68, 0.95)' : type === 'success' ? 'rgba(34, 197, 94, 0.95)' : 'rgba(59, 130, 246, 0.95)'};
      color: white;
      padding: 16px 32px;
      border-radius: 16px;
      font-size: 16px;
      font-weight: 700;
      z-index: 10000;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
      animation: swipeFeedbackPop 0.3s ease;
      pointer-events: none;
    `;
    feedback.textContent = message;
    document.body.appendChild(feedback);

    // Supprimer après 2 secondes
    setTimeout(() => {
      feedback.style.animation = 'swipeFeedbackFade 0.3s ease';
      setTimeout(() => feedback.remove(), 300);
    }, 2000);
  }
}

// Ajouter les animations CSS
const swipeAnimationsStyle = document.createElement('style');
swipeAnimationsStyle.textContent = `
  @keyframes swipeFeedbackPop {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.7);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  @keyframes swipeFeedbackFade {
    0% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.9);
    }
  }
`;
document.head.appendChild(swipeAnimationsStyle);

// Créer une instance globale
const mobileSwipe = new MobileSwipeHandler();

// Export pour utilisation dans app.js
if (typeof window !== 'undefined') {
  window.MobileSwipeHandler = MobileSwipeHandler;
  window.mobileSwipe = mobileSwipe;
}

console.log('✅ mobile-swipe.js chargé');
