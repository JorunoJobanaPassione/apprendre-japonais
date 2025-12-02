# 📱 App Japonais - Version HTML Pure

Version HTML/CSS/JavaScript pure de l'application d'apprentissage du japonais (hiragana).

## 🎯 Caractéristiques

- ✅ **100% HTML/CSS/JS vanilla** - Aucun framework requis
- ✅ **10 leçons complètes** d'hiragana
- ✅ **6 types d'exercices** (présentation, QCM, intrus, transcription, sentence)
- ✅ **Gamification** (badges, points, streak, niveaux)
- ✅ **Progressive Web App** (PWA) - Installable et fonctionne hors ligne
- ✅ **LocalStorage** - Sauvegarde automatique de la progression
- ✅ **Responsive** - Compatible mobile et desktop
- ✅ **Design moderne** - Violet/blanc avec animations CSS

## 🚀 Installation & Utilisation

### Option 1 : Ouvrir directement dans un navigateur

1. Ouvrez simplement `index.html` dans votre navigateur
2. L'application se lance automatiquement
3. Votre progression est sauvegardée dans le LocalStorage

### Option 2 : Serveur local (recommandé pour PWA)

```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (npx)
npx serve .

# Avec PHP
php -S localhost:8000
```

Puis ouvrez : `http://localhost:8000`

### Option 3 : Déploiement sur Netlify

1. Créez un compte sur [Netlify](https://www.netlify.com/)
2. Glissez-déposez le dossier `html-version` sur Netlify
3. Votre app est en ligne en quelques secondes !

### Option 4 : Déploiement sur GitHub Pages

1. Créez un repository GitHub
2. Poussez le contenu du dossier `html-version`
3. Activez GitHub Pages dans les settings
4. Accédez à : `https://votre-username.github.io/nom-repo/`

## 📁 Structure des fichiers

```
html-version/
├── index.html           # Structure HTML principale
├── style.css            # Styles CSS (design violet/blanc)
├── app.js              # Logique JavaScript (navigation, exercices, gamification)
├── lessons-data.js     # Données des 10 leçons et badges
├── manifest.json       # Manifest PWA
├── service-worker.js   # Service Worker (cache hors ligne)
└── README.md          # Ce fichier
```

## 🎨 Personnalisation

### Changer les couleurs

Éditez les variables CSS dans `style.css` (lignes 10-25) :

```css
:root {
    --primary: #667eea;        /* Couleur principale */
    --success: #10b981;        /* Couleur succès */
    --error: #ef4444;          /* Couleur erreur */
    --background: #f9fafb;     /* Fond de l'app */
    --text: #1f2937;           /* Couleur du texte */
}
```

### Ajouter des leçons

Éditez `lessons-data.js` et ajoutez de nouveaux objets dans le tableau `lessonsData`.

### Ajouter des badges

Éditez `lessons-data.js` et ajoutez de nouveaux objets dans le tableau `badgesData`.

## 📱 Installation comme PWA

### Sur mobile (Android/iOS)

1. Ouvrez l'app dans Chrome/Safari
2. Cliquez sur le menu (⋮ ou ⋯)
3. Sélectionnez "Ajouter à l'écran d'accueil"
4. L'app s'installe comme une vraie app native !

### Sur desktop (Chrome/Edge)

1. Ouvrez l'app dans Chrome ou Edge
2. Cliquez sur l'icône d'installation (➕) dans la barre d'adresse
3. Cliquez sur "Installer"

## 🎯 Fonctionnalités implémentées

### Système d'apprentissage
- ✅ 10 leçons progressives (voyelles → combinaisons)
- ✅ Présentation avec table des hiragana
- ✅ QCM de reconnaissance
- ✅ Exercice "trouvez l'intrus"
- ✅ Transcription en romaji
- ✅ Lecture en contexte (mots réels)

### Gamification
- ✅ Système de points (XP)
- ✅ Niveaux (1 niveau tous les 100 points)
- ✅ Streak de jours consécutifs
- ✅ 15 badges à débloquer
- ✅ Meilleur score par leçon
- ✅ Statistiques détaillées

### UX
- ✅ Écran de chargement animé
- ✅ Navigation fluide entre écrans
- ✅ Feedback visuel immédiat
- ✅ Animations CSS (bounce, slide, fade)
- ✅ Modal de badge débloqué
- ✅ Barre de progression
- ✅ Responsive mobile/tablet/desktop

### Technique
- ✅ LocalStorage pour sauvegarde
- ✅ Service Worker pour offline
- ✅ Manifest PWA complet
- ✅ Code propre et commenté
- ✅ Aucune dépendance externe

## 🐛 Déboggage

### L'app ne se charge pas
- Vérifiez que tous les fichiers sont présents
- Ouvrez la console (F12) pour voir les erreurs
- Vérifiez que vous utilisez un navigateur moderne

### La progression n'est pas sauvegardée
- Vérifiez que le LocalStorage n'est pas désactivé
- En navigation privée, le LocalStorage est temporaire
- Vérifiez dans DevTools > Application > Local Storage

### Le service worker ne fonctionne pas
- Le service worker nécessite HTTPS (ou localhost)
- Vérifiez dans DevTools > Application > Service Workers
- Essayez de "Unregister" puis recharger la page

## 📊 Données de progression

Les données sont stockées dans le LocalStorage avec la clé `japonais_progress` :

```javascript
{
  level: 1,                    // Niveau de l'utilisateur
  totalPoints: 0,              // Points totaux
  streak: 0,                   // Jours consécutifs
  lastStudyDate: null,         // Dernière date d'étude
  lessons: {},                 // Progression par leçon
  badges: [],                  // Badges débloqués
  stats: {
    lessonsCompleted: 0,       // Leçons complétées
    transcriptionsCompleted: 0, // Transcriptions réussies
    wordsLearned: 0            // Mots appris
  }
}
```

## 🔧 Développement

### Réinitialiser la progression

Ouvrez la console (F12) et exécutez :

```javascript
localStorage.removeItem('japonais_progress');
location.reload();
```

### Débloquer tous les badges

```javascript
const progress = JSON.parse(localStorage.getItem('japonais_progress'));
progress.badges = badgesData.map(b => b.id);
localStorage.setItem('japonais_progress', JSON.stringify(progress));
location.reload();
```

## 🎓 Pédagogie

L'application suit une méthode d'apprentissage progressive :

1. **Présentation** - Familiarisation visuelle
2. **Reconnaissance** - QCM pour mémoriser
3. **Discrimination** - Exercice "intrus" pour affiner
4. **Production** - Transcription active
5. **Contexte** - Lecture de vrais mots

Cette méthode combine :
- 📖 **Input** (lecture, reconnaissance)
- ✍️ **Output** (écriture, production)
- 🎯 **Active Recall** (récupération active)
- 🔄 **Spaced Repetition** (via les refaire)

## 📈 Statistiques

- **~500 lignes** HTML
- **~800 lignes** CSS
- **~600 lignes** JavaScript
- **~300 lignes** de données (10 leçons)
- **15 badges** prédéfinis
- **71 hiragana** à apprendre
- **100+ exercices** au total

## 🎉 Avantages de cette version

### Par rapport à React Native Web

- ✅ **Compatibilité** : Fonctionne sur tous les navigateurs
- ✅ **Performance** : Plus rapide (pas de bundle React)
- ✅ **Simplicité** : Code plus simple et maintenable
- ✅ **Poids** : ~50 KB vs plusieurs MB
- ✅ **Déploiement** : Aucune configuration requise
- ✅ **SEO** : Meilleur référencement
- ✅ **Debugging** : Plus facile à déboguer

## 🚀 Prochaines étapes

- [ ] Créer les icônes PWA (192x192 et 512x512)
- [ ] Ajouter l'audio de prononciation
- [ ] Ajouter les katakana
- [ ] Système de révision espacée (SRS)
- [ ] Mode multijoueur
- [ ] Export/import de progression
- [ ] Thèmes personnalisables

## 📄 Licence

Ce projet est open source. Libre d'utilisation et de modification.

---

**Version** : 4.1 HTML Pure
**Date** : 2 décembre 2025
**Auteur** : Votre nom

頑張りましょう！(Ganbarimash\u014d - Bon courage !)
