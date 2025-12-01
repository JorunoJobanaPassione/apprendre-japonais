# 🌐 Guide de Déploiement Web - Application Japonais

## ✅ Configuration PWA Terminée

Votre application est maintenant configurée comme une **Progressive Web App (PWA)** qui peut être installée sur l'écran d'accueil comme une application native !

---

## 🚀 Tester Localement

```bash
npm run web
# ou avec un port spécifique
npx expo start --web --port 8083
```

Ouvrez **http://localhost:8083** dans votre navigateur.

---

## 📱 Installer comme Application (Localement)

### Sur Chrome/Edge Desktop :
1. Ouvrez l'application web
2. Cliquez sur l'icône "Installer" dans la barre d'adresse
3. Ou : Menu ⋮ → "Installer Apprendre le Japonais"

### Sur Mobile (Chrome) :
1. Ouvrez l'application web
2. Menu ⋮ → "Ajouter à l'écran d'accueil"
3. L'app s'ouvrira en plein écran comme une app native

### Sur Safari iOS :
1. Ouvrez l'application web
2. Bouton Partager 📤
3. "Sur l'écran d'accueil"

---

## 🌍 Déploiement en Ligne

### Option 1 : Netlify (RECOMMANDÉ - Gratuit)

#### Étape 1 : Créer un compte
- Allez sur https://www.netlify.com
- Créez un compte gratuit

#### Étape 2 : Build de l'application
```bash
# Installer les dépendances de build
npm install -g @expo/ngrok

# Build pour le web
npx expo export:web

# Cela créera un dossier web-build/
```

#### Étape 3 : Déployer sur Netlify

**Méthode A - Glisser-déposer (Plus simple)**
1. Connectez-vous sur https://app.netlify.com
2. Glissez-déposez le dossier `web-build` sur Netlify
3. Votre app est en ligne ! 🎉

**Méthode B - Avec Git (Recommandé pour updates)**
1. Initialisez Git dans votre projet :
```bash
git init
git add .
git commit -m "Initial commit - PWA Japonais"
```

2. Créez un repo sur GitHub et poussez votre code

3. Sur Netlify :
   - "Add new site" → "Import an existing project"
   - Connectez votre repo GitHub
   - Build command: `npx expo export:web`
   - Publish directory: `web-build`
   - Cliquez "Deploy"

#### Étape 4 : Configuration Netlify (netlify.toml)
Créez un fichier `netlify.toml` à la racine :

```toml
[build]
  command = "npx expo export:web"
  publish = "web-build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Option 2 : Vercel (Gratuit)

```bash
# Installer Vercel CLI
npm install -g vercel

# Build
npx expo export:web

# Déployer
cd web-build
vercel --prod
```

---

### Option 3 : GitHub Pages (Gratuit)

1. Build l'app :
```bash
npx expo export:web
```

2. Installez gh-pages :
```bash
npm install --save-dev gh-pages
```

3. Ajoutez dans `package.json` :
```json
{
  "scripts": {
    "predeploy": "npx expo export:web",
    "deploy": "gh-pages -d web-build"
  },
  "homepage": "https://VOTRE-USERNAME.github.io/VOTRE-REPO"
}
```

4. Déployez :
```bash
npm run deploy
```

---

## 📋 Checklist Avant Déploiement

- ✅ Testé localement avec `npm run web`
- ✅ Vérifié que toutes les fonctionnalités marchent
- ✅ Icônes PWA en place (192x192 et 512x512)
- ✅ Manifest.json configuré
- ✅ Service Worker actif
- ✅ Build réussi avec `npx expo export:web`

---

## 🎯 Après le Déploiement

### Tester le PWA
1. Ouvrez votre app en ligne
2. Testez l'installation sur mobile
3. Vérifiez le mode hors ligne (coupez la connexion)

### Lighthouse Audit (Chrome DevTools)
1. Ouvrez DevTools (F12)
2. Onglet "Lighthouse"
3. Cochez "Progressive Web App"
4. "Generate report"
5. Score > 90 = Excellent PWA ✅

### Partager avec des Testeurs
```
🎌 Testez mon app d'apprentissage du Japonais !

📱 Version Web : https://votre-app.netlify.app
✨ Installable sur votre écran d'accueil !

Pour installer :
• Mobile : Menu → "Ajouter à l'écran d'accueil"
• Desktop : Icône "Installer" dans la barre d'adresse

Donnez-moi vos retours ! 🙏
```

---

## 🔧 Mise à Jour de l'App

### Méthode Netlify Git
```bash
# Faites vos modifications
git add .
git commit -m "Update: description des changements"
git push

# Netlify rebuild automatiquement !
```

### Méthode Glisser-Déposer
```bash
# Rebuild
npx expo export:web

# Glissez-déposez le nouveau web-build/ sur Netlify
```

---

## 🐛 Résolution de Problèmes

### "App ne s'installe pas"
- Vérifiez que vous êtes en HTTPS (requis pour PWA)
- Vérifiez manifest.json dans DevTools
- Vérifiez que le Service Worker est enregistré

### "Icône ne s'affiche pas"
- Vérifiez que icon-192.png et icon-512.png existent dans public/
- Clear cache du navigateur
- Vérifiez les chemins dans manifest.json

### "Build échoue"
```bash
# Nettoyez le cache
rm -rf node_modules
rm -rf .expo
npm install
npx expo export:web
```

---

## 📊 Statistiques & Analytics (Optionnel)

Pour suivre l'utilisation de votre app :

### Google Analytics
```html
<!-- Dans public/index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🎉 Félicitations !

Votre application est maintenant :
- ✅ Accessible sur le web
- ✅ Installable comme app native
- ✅ Fonctionne hors ligne
- ✅ Optimisée pour mobile et desktop
- ✅ Prête à recevoir des retours utilisateurs !

---

## 📞 Support

En cas de problème :
1. Vérifiez les logs de build
2. Consultez la console navigateur (F12)
3. Testez d'abord en local
4. Vérifiez que tous les fichiers sont bien déployés

Bon courage pour le partage ! 🚀
