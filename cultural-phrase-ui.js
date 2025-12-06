/**
 * 🌸 PHRASES CULTURELLES DU JOUR - UI Logic
 * Gestion de l'interface utilisateur des phrases culturelles
 */

let currentPhrase = null;

// Initialisation
function initCulturalPhrase() {
  console.log('🌸 Initialisation des Phrases Culturelles...');

  try {
    // Afficher la phrase du jour
    displayTodayPhrase();

    // Bouton "Découvrir"
    const viewBtn = document.getElementById('view-phrase-detail-btn');
    if (viewBtn) {
      viewBtn.addEventListener('click', () => {
        showPhraseModal(currentPhrase);
      });
      console.log('✅ Bouton "Découvrir" attaché');
    } else {
      console.error('❌ Bouton "Découvrir" non trouvé dans le DOM');
    }

    // Fermer le modal
    const closeBtn = document.getElementById('close-phrase-modal');
    if (closeBtn) {
      closeBtn.addEventListener('click', hidePhraseModal);
    }

    const overlay = document.getElementById('phrase-modal-overlay');
    if (overlay) {
      overlay.addEventListener('click', hidePhraseModal);
    }

    // Boutons de partage
    setupShareButtons();

    // Afficher le compteur de phrases vues
    updateViewedCount();

    console.log('✅ Phrases Culturelles initialisées avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation des phrases:', error);
  }
}

// Afficher la phrase du jour sur la carte
function displayTodayPhrase() {
  const phrase = getTodayPhrase();
  currentPhrase = phrase;

  // Mettre à jour la carte
  document.getElementById('today-phrase-hiragana').textContent = phrase.hiragana;
  document.getElementById('today-phrase-romaji').textContent = phrase.romaji;
  document.getElementById('today-phrase-french').textContent = phrase.french;

  // Animation d'entrée
  const card = document.getElementById('cultural-phrase-card');
  if (card) {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'all 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100);
  }
}

// Afficher le modal de détail
function showPhraseModal(phrase) {
  if (!phrase) return;

  // Remplir les données du modal
  document.getElementById('modal-phrase-icon').textContent = phrase.icon;
  document.getElementById('modal-phrase-category').textContent = phrase.category;
  document.getElementById('modal-phrase-hiragana').textContent = phrase.hiragana;
  document.getElementById('modal-phrase-romaji').textContent = phrase.romaji;
  document.getElementById('modal-phrase-french').textContent = phrase.french;

  const literalElement = document.getElementById('modal-phrase-literal');
  literalElement.innerHTML = `<strong>Sens littéral :</strong> ${phrase.literal}`;

  document.getElementById('modal-phrase-context').textContent = phrase.context;
  document.getElementById('modal-phrase-cultural').textContent = phrase.culturalExplanation;
  document.getElementById('modal-phrase-historical').textContent = phrase.historicalOrigin;
  document.getElementById('modal-phrase-usage').textContent = phrase.usage;

  // Marquer comme vue
  const result = markPhraseAsViewed(phrase.id);
  updateViewedCount();

  // Vérifier badge
  if (result.badge) {
    setTimeout(() => {
      showBadgeNotification(result.badge, result.count);
    }, 500);
  }

  // Afficher le modal
  const modal = document.getElementById('phrase-modal');
  modal.style.display = 'flex';
  setTimeout(() => {
    modal.style.opacity = '1';
  }, 10);
}

// Masquer le modal
function hidePhraseModal() {
  const modal = document.getElementById('phrase-modal');
  modal.style.opacity = '0';
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}

// Mettre à jour le compteur de phrases vues
function updateViewedCount() {
  const count = getViewedPhrasesCount();
  const element = document.getElementById('viewed-phrases-count');
  if (element) {
    element.textContent = count;

    // Animation du compteur
    element.style.transform = 'scale(1.3)';
    element.style.color = '#667eea';
    setTimeout(() => {
      element.style.transform = 'scale(1)';
      element.style.color = '';
    }, 300);
  }
}

// Configuration des boutons de partage
function setupShareButtons() {
  // Twitter
  const twitterBtn = document.getElementById('share-twitter');
  if (twitterBtn) {
    twitterBtn.addEventListener('click', () => {
      shareOnTwitter(currentPhrase);
    });
  }

  // Facebook
  const facebookBtn = document.getElementById('share-facebook');
  if (facebookBtn) {
    facebookBtn.addEventListener('click', () => {
      shareOnFacebook(currentPhrase);
    });
  }

  // Copier
  const copyBtn = document.getElementById('copy-phrase');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      copyPhraseToClipboard(currentPhrase);
    });
  }
}

// Partager sur Twitter
function shareOnTwitter(phrase) {
  const text = `🌸 Phrase japonaise du jour :\n\n${phrase.hiragana} (${phrase.romaji})\n${phrase.french}\n\n#ApprendreLeJaponais #CultureJaponaise`;
  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'width=550,height=420');
}

// Partager sur Facebook
function shareOnFacebook(phrase) {
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
  window.open(url, '_blank', 'width=550,height=420');
}

// Copier la phrase dans le presse-papier
function copyPhraseToClipboard(phrase) {
  const text = `${phrase.hiragana} (${phrase.romaji})\n${phrase.french}\n\n${phrase.culturalExplanation}`;

  navigator.clipboard.writeText(text).then(() => {
    // Notification de succès
    showCopyNotification();
  }).catch(err => {
    console.error('Erreur de copie:', err);
  });
}

// Notification de copie réussie
function showCopyNotification() {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    padding: 16px 32px;
    border-radius: 12px;
    z-index: 10000;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    font-weight: 600;
    animation: slideUp 0.3s ease;
  `;

  notification.textContent = '✅ Copié dans le presse-papier !';

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideDown 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 2000);
}

// Notification de badge débloqué
function showBadgeNotification(badgeType, count) {
  const badgeNames = {
    'cultural_bronze': '🥉 Explorateur Culturel',
    'cultural_gold': '🥇 Maître de la Culture'
  };

  const badgeDescriptions = {
    'cultural_bronze': `${count} phrases découvertes !`,
    'cultural_gold': `${count} phrases maîtrisées !`
  };

  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 48px;
    border-radius: 24px;
    z-index: 10001;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
    text-align: center;
    animation: bounceIn 0.5s ease;
    max-width: 400px;
  `;

  notification.innerHTML = `
    <div style="font-size: 80px; margin-bottom: 16px;">🎉</div>
    <h3 style="font-size: 24px; color: #667eea; margin: 0 0 12px 0;">
      Nouveau Badge Débloqué !
    </h3>
    <h4 style="font-size: 20px; margin: 0 0 8px 0;">${badgeNames[badgeType]}</h4>
    <p style="font-size: 16px; color: #666; margin: 0 0 24px 0;">${badgeDescriptions[badgeType]}</p>
    <button onclick="this.parentElement.remove()" style="
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 12px 32px;
      border-radius: 24px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;
    ">
      Génial ! 🎊
    </button>
  `;

  document.body.appendChild(notification);
}

// Ajouter les animations CSS
const culturalPhraseStyle = document.createElement('style');
culturalPhraseStyle.textContent = `
  @keyframes bounceIn {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.3);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.05);
    }
    70% {
      transform: translate(-50%, -50%) scale(0.9);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }

  #phrase-modal {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .cultural-phrase-card {
    transition: all 0.5s ease;
  }
`;
document.head.appendChild(culturalPhraseStyle);

// Initialiser immédiatement si le DOM est prêt, sinon attendre
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initCulturalPhrase, 600);
  });
} else {
  setTimeout(initCulturalPhrase, 600);
}
