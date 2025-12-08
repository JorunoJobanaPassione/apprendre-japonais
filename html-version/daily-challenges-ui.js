/**
 * 🎯 UI DES DÉFIS QUOTIDIENS
 * Interface pour afficher les proverbes et menus
 */

// Variable globale pour le défi actuel
let currentChallenge = null;

// Initialiser les défis quotidiens
function initDailyChallenges() {
  console.log('🎯 Initialisation des Défis Quotidiens...');

  // Charger le défi du jour
  currentChallenge = getDailyChallenge();

  // Mettre à jour la carte sur l'accueil
  updateDailyChallengeCard();

  // Bouton pour ouvrir le défi
  const challengeBtn = document.getElementById('start-challenge-btn');
  if (challengeBtn) {
    challengeBtn.addEventListener('click', openChallengeModal);
  }

  console.log('✅ Défis Quotidiens initialisés');
}

// Mettre à jour la carte du défi sur l'écran d'accueil
function updateDailyChallengeCard() {
  const icon = document.getElementById('challenge-icon');
  const title = document.getElementById('challenge-title');
  const description = document.getElementById('challenge-description');
  const completed = document.getElementById('challenges-completed');

  if (icon) icon.textContent = getChallengeIcon(currentChallenge.type);
  if (title) title.textContent = getChallengeTitle(currentChallenge.type);
  if (description) description.textContent = getChallengeDescription(currentChallenge);
  if (completed) completed.textContent = getTotalChallengesCompleted();

  // Badge "Complété" si déjà fait aujourd'hui
  const btn = document.getElementById('start-challenge-btn');
  if (btn && isTodayChallengeCompleted()) {
    btn.innerHTML = '✓ Complété';
    btn.style.background = '#10b981';
  }
}

// Ouvrir le modal du défi
function openChallengeModal() {
  const modal = document.getElementById('challenge-modal');
  if (!modal) return;

  // Afficher le modal
  modal.style.display = 'flex';

  // Rendre le contenu selon le type
  if (currentChallenge.type === 'proverb') {
    renderProverbChallenge();
  } else if (currentChallenge.type === 'menu') {
    renderMenuChallenge();
  }

  // Animation d'entrée
  setTimeout(() => {
    modal.style.opacity = '1';
  }, 10);
}

// Fermer le modal
function closeChallengeModal() {
  const modal = document.getElementById('challenge-modal');
  if (!modal) return;

  modal.style.opacity = '0';
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}

// Rendre un proverbe
function renderProverbChallenge() {
  const content = document.getElementById('challenge-modal-content');
  if (!content) return;

  const proverb = currentChallenge.data;
  const isRevealed = isTodayChallengeCompleted();

  content.innerHTML = `
    <div class="challenge-header">
      <h2>🎋 Proverbe Japonais</h2>
      <div class="challenge-difficulty difficulty-${proverb.difficulty}">
        ${proverb.difficulty === 'easy' ? 'Facile' : proverb.difficulty === 'medium' ? 'Moyen' : 'Difficile'}
      </div>
    </div>

    <div class="proverb-container">
      <div class="proverb-japanese">${proverb.japanese}</div>
      <div class="proverb-hiragana">${proverb.hiragana}</div>
      <div class="proverb-romaji">${proverb.romaji}</div>

      <div class="proverb-challenge ${isRevealed ? 'revealed' : 'hidden'}" id="proverb-answer">
        <div class="challenge-separator">
          <span>Traduction</span>
        </div>
        <div class="proverb-translation">${proverb.translation}</div>

        <div class="challenge-separator">
          <span>Signification</span>
        </div>
        <p class="proverb-meaning">${proverb.meaning}</p>

        <div class="challenge-separator">
          <span>Contexte Culturel</span>
        </div>
        <p class="proverb-cultural">${proverb.culturalContext}</p>

        <div class="proverb-category">
          <span class="category-tag">${proverb.category}</span>
        </div>
      </div>

      ${!isRevealed ? `
        <button class="reveal-btn" id="reveal-proverb-btn" onclick="revealProverb()">
          Révéler la réponse 🔓
        </button>
      ` : `
        <div class="completed-badge">
          ✓ Défi complété !
        </div>
      `}
    </div>
  `;
}

// Rendre un menu
function renderMenuChallenge() {
  const content = document.getElementById('challenge-modal-content');
  if (!content) return;

  const menu = currentChallenge.data;
  const isRevealed = isTodayChallengeCompleted();

  content.innerHTML = `
    <div class="challenge-header">
      <h2>🍜 Menu à Déchiffrer</h2>
      <div class="restaurant-name">${menu.restaurantName}</div>
    </div>

    <div class="menu-container">
      <div class="menu-items">
        ${menu.items.map((item, index) => `
          <div class="menu-item ${isRevealed ? 'revealed' : 'hidden'}" id="menu-item-${index}">
            <div class="menu-item-japanese">
              <span class="menu-number">${index + 1}</span>
              ${item.japanese}
            </div>
            <div class="menu-item-hiragana">${item.hiragana}</div>
            <div class="menu-item-romaji">${item.romaji}</div>
            <div class="menu-item-details">
              <span class="menu-item-french">${item.french}</span>
              <span class="menu-item-price">${item.price}</span>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="menu-cultural-note">
        <strong>📚 Note culturelle :</strong>
        <p>${menu.culturalNote}</p>
      </div>

      ${!isRevealed ? `
        <button class="reveal-btn" id="reveal-menu-btn" onclick="revealMenu()">
          Révéler les réponses 🔓
        </button>
      ` : `
        <div class="completed-badge">
          ✓ Défi complété !
        </div>
      `}
    </div>
  `;
}

// Révéler le proverbe
function revealProverb() {
  const answer = document.getElementById('proverb-answer');
  const btn = document.getElementById('reveal-proverb-btn');

  if (answer) {
    answer.classList.remove('hidden');
    answer.classList.add('revealed');
  }

  if (btn) {
    btn.style.display = 'none';
  }

  // Marquer comme complété
  markTodayChallengeCompleted();
  updateDailyChallengeCard();

  // Ajouter le badge de complétion
  const container = document.querySelector('.proverb-container');
  if (container && !document.querySelector('.completed-badge')) {
    const badge = document.createElement('div');
    badge.className = 'completed-badge';
    badge.innerHTML = '✓ Défi complété ! +10 XP';
    container.appendChild(badge);
  }

  // Ajouter 10 XP
  addExperience(10);
}

// Révéler le menu
function revealMenu() {
  const items = document.querySelectorAll('.menu-item');
  const btn = document.getElementById('reveal-menu-btn');

  // Animation séquentielle
  items.forEach((item, index) => {
    setTimeout(() => {
      item.classList.remove('hidden');
      item.classList.add('revealed');
    }, index * 100);
  });

  if (btn) {
    setTimeout(() => {
      btn.style.display = 'none';
    }, items.length * 100);
  }

  // Marquer comme complété
  markTodayChallengeCompleted();
  updateDailyChallengeCard();

  // Ajouter le badge de complétion
  setTimeout(() => {
    const container = document.querySelector('.menu-container');
    if (container && !document.querySelector('.completed-badge')) {
      const badge = document.createElement('div');
      badge.className = 'completed-badge';
      badge.innerHTML = '✓ Défi complété ! +10 XP';
      container.appendChild(badge);
    }
  }, items.length * 100 + 200);

  // Ajouter 10 XP
  addExperience(10);
}

// Ajouter de l'XP (intégration avec le système existant)
function addExperience(xp) {
  if (typeof updateStats === 'function') {
    const currentXP = parseInt(localStorage.getItem('totalScore') || '0');
    localStorage.setItem('totalScore', (currentXP + xp).toString());
    updateStats();
  }
}

// Initialiser au chargement du DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDailyChallenges);
} else {
  initDailyChallenges();
}

// Exporter les fonctions pour l'utiliser depuis l'HTML
window.closeChallengeModal = closeChallengeModal;
window.revealProverb = revealProverb;
window.revealMenu = revealMenu;
