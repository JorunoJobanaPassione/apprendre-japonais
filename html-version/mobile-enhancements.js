/**
 * 📱 Mobile Enhancements V1.0
 * Améliorations JavaScript pour l'expérience mobile
 */

(function() {
  'use strict';

  // ===== DÉTECTION MOBILE =====
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Ajouter des classes CSS selon le device
  document.documentElement.classList.add(
    isMobile ? 'is-mobile' : 'is-desktop',
    isIOS ? 'is-ios' : '',
    isAndroid ? 'is-android' : '',
    isTouchDevice ? 'is-touch' : 'is-no-touch'
  );

  // ===== OPTIMISATIONS TOUCH =====

  /**
   * Améliorer le feedback tactile sur tous les boutons
   */
  function enhanceTouchFeedback() {
    const touchElements = document.querySelectorAll('button, .btn, a, .clickable, .tappable');

    touchElements.forEach(element => {
      // Touch feedback visuel
      element.addEventListener('touchstart', function() {
        this.style.opacity = '0.7';
      }, { passive: true });

      element.addEventListener('touchend', function() {
        this.style.opacity = '1';
      }, { passive: true });

      element.addEventListener('touchcancel', function() {
        this.style.opacity = '1';
      }, { passive: true });
    });
  }

  /**
   * Empêcher le double-tap zoom sur les boutons
   */
  function preventDoubleTapZoom() {
    let lastTouchEnd = 0;

    document.addEventListener('touchend', function(event) {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, { passive: false });
  }

  /**
   * Pull-to-refresh personnalisé (désactiver le natif si nécessaire)
   */
  function customPullToRefresh() {
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', function(e) {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', function(e) {
      touchEndY = e.changedTouches[0].clientY;

      // Si on est en haut de la page et qu'on tire vers le bas
      if (window.scrollY === 0 && touchEndY > touchStartY + 100) {
        // Action de refresh personnalisée si besoin
        // location.reload(); // Décommenter si besoin
      }
    }, { passive: true });
  }

  // ===== OPTIMISATIONS PERFORMANCE =====

  /**
   * Lazy loading des images
   */
  function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  /**
   * Debounce scroll events pour performance
   */
  function optimizeScrollEvents() {
    let scrollTimeout;

    window.addEventListener('scroll', function() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(function() {
        // Actions après scroll (si nécessaire)
        document.body.classList.remove('is-scrolling');
      }, 150);

      document.body.classList.add('is-scrolling');
    }, { passive: true });
  }

  /**
   * Throttle resize events
   */
  function optimizeResizeEvents() {
    let resizeTimeout;

    window.addEventListener('resize', function() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(function() {
        // Recalculer layouts si nécessaire
        window.dispatchEvent(new Event('optimizedResize'));
      }, 250);
    }, { passive: true });
  }

  // ===== GESTION ORIENTATION =====

  /**
   * Détecter changement d'orientation
   */
  function handleOrientationChange() {
    window.addEventListener('orientationchange', function() {
      // Forcer un reflow après rotation
      setTimeout(function() {
        window.scrollTo(0, 0);
        document.body.style.height = window.innerHeight + 'px';
        setTimeout(function() {
          document.body.style.height = '';
        }, 500);
      }, 300);
    });
  }

  // ===== GESTION CLAVIER VIRTUEL =====

  /**
   * Ajuster viewport quand le clavier apparaît (iOS)
   */
  function handleVirtualKeyboard() {
    if (isIOS) {
      const inputs = document.querySelectorAll('input, textarea');

      inputs.forEach(input => {
        input.addEventListener('focus', function() {
          // Scroll vers l'input
          setTimeout(() => {
            this.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 300);
        });

        input.addEventListener('blur', function() {
          // Reset scroll position
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 100);
        });
      });
    }
  }

  // ===== VIBRATION FEEDBACK =====

  /**
   * Ajouter vibration feedback sur interactions importantes
   */
  function addVibrationFeedback() {
    if ('vibrate' in navigator) {
      // Vibration sur réponse correcte/incorrecte
      document.addEventListener('answer-correct', () => {
        navigator.vibrate([50, 30, 50]); // Pattern success
      });

      document.addEventListener('answer-incorrect', () => {
        navigator.vibrate([100]); // Pattern error
      });

      // Vibration sur boutons importants
      const importantButtons = document.querySelectorAll('.primary-btn');
      importantButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          navigator.vibrate(10); // Petit feedback
        }, { once: false });
      });
    }
  }

  // ===== GESTION OFFLINE =====

  /**
   * Détecter statut réseau et afficher notification
   */
  function handleOfflineStatus() {
    function updateOnlineStatus() {
      const condition = navigator.onLine ? 'online' : 'offline';

      if (condition === 'offline') {
        showOfflineNotification();
      } else {
        hideOfflineNotification();
      }
    }

    function showOfflineNotification() {
      let notification = document.getElementById('offline-notification');
      if (!notification) {
        notification = document.createElement('div');
        notification.id = 'offline-notification';
        notification.innerHTML = `
          <div style="
            position: fixed;
            top: 60px;
            left: 50%;
            transform: translateX(-50%);
            background: #ef4444;
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            font-size: 0.9rem;
            font-weight: 500;
          ">
            📡 Mode hors ligne - Certaines fonctionnalités sont limitées
          </div>
        `;
        document.body.appendChild(notification);
      }
    }

    function hideOfflineNotification() {
      const notification = document.getElementById('offline-notification');
      if (notification) {
        notification.remove();
      }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Check initial status
    updateOnlineStatus();
  }

  // ===== SWIPE GESTURES =====

  /**
   * Ajouter support swipe pour navigation
   */
  function setupSwipeGestures() {
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;

      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      // Swipe horizontal dominant
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > 100) { // Minimum swipe distance
          if (diffX > 0) {
            // Swipe right
            document.dispatchEvent(new CustomEvent('swipe-right'));
          } else {
            // Swipe left
            document.dispatchEvent(new CustomEvent('swipe-left'));
          }
        }
      }
      // Swipe vertical dominant
      else {
        if (Math.abs(diffY) > 100) {
          if (diffY > 0) {
            // Swipe down
            document.dispatchEvent(new CustomEvent('swipe-down'));
          } else {
            // Swipe up
            document.dispatchEvent(new CustomEvent('swipe-up'));
          }
        }
      }
    }
  }

  // ===== OPTIMISATION MÉMOIRE =====

  /**
   * Nettoyer mémoire sur mobile
   */
  function optimizeMemory() {
    // Limiter historique navigation
    if (isMobile && window.history.length > 50) {
      // Clear old history if needed
    }

    // Cleanup event listeners on hidden pages
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        // Page cachée, nettoyer si nécessaire
        console.log('Page hidden - cleanup if needed');
      }
    });
  }

  // ===== SAFE AREA INSETS (iOS) =====

  /**
   * Gérer les safe area insets pour iPhones avec notch
   */
  function handleSafeAreaInsets() {
    if (isIOS) {
      // CSS variables déjà gérées par viewport-fit=cover
      // Vérifier si safe-area-inset est supporté
      const testDiv = document.createElement('div');
      testDiv.style.paddingTop = 'env(safe-area-inset-top)';
      document.body.appendChild(testDiv);

      const hasSafeArea = getComputedStyle(testDiv).paddingTop !== '0px';
      if (hasSafeArea) {
        document.documentElement.classList.add('has-safe-area');
      }

      testDiv.remove();
    }
  }

  // ===== INITIALISATION =====

  /**
   * Initialiser toutes les optimisations mobile
   */
  function init() {
    console.log('📱 Mobile Enhancements initialized');
    console.log('Device:', {
      isMobile,
      isIOS,
      isAndroid,
      isTouchDevice
    });

    if (isMobile || isTouchDevice) {
      enhanceTouchFeedback();
      preventDoubleTapZoom();
      // customPullToRefresh(); // Décommenter si besoin
      setupSwipeGestures();
      addVibrationFeedback();
      handleVirtualKeyboard();
      handleSafeAreaInsets();
    }

    setupLazyLoading();
    optimizeScrollEvents();
    optimizeResizeEvents();
    handleOrientationChange();
    handleOfflineStatus();
    optimizeMemory();

    // Dispatch event pour indiquer que mobile enhancements sont prêts
    document.dispatchEvent(new CustomEvent('mobile-enhancements-ready'));
  }

  // Attendre que le DOM soit chargé
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Exposer quelques fonctions globalement si besoin
  window.MobileEnhancements = {
    isMobile,
    isIOS,
    isAndroid,
    isTouchDevice,
    vibrate: (pattern) => {
      if ('vibrate' in navigator) {
        navigator.vibrate(pattern);
      }
    }
  };

})();
