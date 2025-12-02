# 🚀 Guide de Déploiement - GitHub Pages

Guide étape par étape pour déployer votre application sur GitHub Pages.

---

## 📋 Pré-requis

- ✅ Compte GitHub (gratuit)
- ✅ Git installé sur votre ordinateur
- ✅ Icônes PWA téléchargées (icon-192.png et icon-512.png)

---

## 🎯 Étape 1 : Télécharger les icônes

1. Ouvrez le fichier `generate-icons.html` dans votre navigateur
2. Cliquez sur les deux boutons pour télécharger :
   - `icon-192.png`
   - `icon-512.png`
3. Placez ces fichiers dans le dossier `html-version/`

---

## 🔧 Étape 2 : Initialiser Git

Ouvrez un terminal dans le dossier `html-version/` et exécutez :

```bash
# Initialiser le repository
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Initial commit - App Japonais v4.1"
```

---

## 📦 Étape 3 : Créer le repository GitHub

### Option A : Via l'interface web

1. Allez sur [GitHub](https://github.com/)
2. Cliquez sur le bouton **"New"** (en haut à droite)
3. Donnez un nom au repository : `apprendre-japonais`
4. Choisissez **"Public"**
5. **NE COCHEZ PAS** "Add a README file"
6. Cliquez sur **"Create repository"**

### Option B : Via GitHub CLI

```bash
gh repo create apprendre-japonais --public --source=. --remote=origin
```

---

## 🔗 Étape 4 : Lier et pousser le code

Copiez les commandes affichées par GitHub (ou utilisez celles-ci) :

```bash
# Ajouter le remote GitHub
git remote add origin https://github.com/VOTRE-USERNAME/apprendre-japonais.git

# Renommer la branche en main
git branch -M main

# Pousser le code
git push -u origin main
```

**Remplacez `VOTRE-USERNAME` par votre nom d'utilisateur GitHub !**

---

## 🌐 Étape 5 : Activer GitHub Pages

1. Allez sur votre repository GitHub
2. Cliquez sur **"Settings"** (en haut)
3. Dans le menu de gauche, cliquez sur **"Pages"**
4. Dans **"Source"**, sélectionnez :
   - Branch : `main`
   - Folder : `/ (root)`
5. Cliquez sur **"Save"**
6. Attendez 1-2 minutes ⏳

---

## ✅ Étape 6 : Accéder à votre application

Votre app sera disponible à l'adresse :

```
https://VOTRE-USERNAME.github.io/apprendre-japonais/
```

**Remplacez `VOTRE-USERNAME` par votre nom d'utilisateur GitHub !**

---

## 🎉 C'est fait !

Votre application est maintenant en ligne et accessible à tous !

### 📱 Installer comme PWA

Sur mobile ou desktop, vous pouvez maintenant :
1. Ouvrir l'URL de votre app
2. Cliquer sur "Ajouter à l'écran d'accueil" (mobile)
3. Ou cliquer sur l'icône d'installation (desktop)

---

## 🔄 Mettre à jour l'application

Pour mettre à jour votre application après modifications :

```bash
# Ajouter les fichiers modifiés
git add .

# Créer un commit
git commit -m "Description des modifications"

# Pousser les changements
git push
```

Les changements seront en ligne dans 1-2 minutes ! ⚡

---

## 🐛 Problèmes courants

### L'app ne se charge pas

**Problème** : Page blanche ou erreur 404

**Solution** :
1. Vérifiez que tous les fichiers sont bien poussés sur GitHub
2. Vérifiez que GitHub Pages est activé dans les settings
3. Attendez 2-3 minutes pour que GitHub Pages se mette à jour
4. Videz le cache du navigateur (Ctrl + Shift + R)

### Les icônes ne s'affichent pas

**Problème** : Icônes manquantes ou erreur dans la console

**Solution** :
1. Vérifiez que `icon-192.png` et `icon-512.png` sont bien dans le dossier
2. Vérifiez que les fichiers ont été ajoutés et poussés sur GitHub :
   ```bash
   git add icon-192.png icon-512.png
   git commit -m "Add PWA icons"
   git push
   ```

### Le service worker ne fonctionne pas

**Problème** : L'app ne fonctionne pas hors ligne

**Solution** :
1. Le service worker nécessite HTTPS (GitHub Pages utilise HTTPS ✅)
2. Ouvrez les DevTools (F12) → Application → Service Workers
3. Vérifiez que le service worker est enregistré
4. Si nécessaire, cliquez sur "Unregister" puis rechargez la page

### Git push demande un mot de passe

**Problème** : Git demande un nom d'utilisateur et mot de passe

**Solution** :
1. Utilisez un Personal Access Token (PAT) au lieu du mot de passe
2. Allez sur GitHub → Settings → Developer settings → Personal access tokens
3. Créez un nouveau token avec les permissions "repo"
4. Utilisez ce token comme mot de passe

**Ou utilisez SSH** :
```bash
# Changer le remote pour SSH
git remote set-url origin git@github.com:VOTRE-USERNAME/apprendre-japonais.git
```

---

## 📊 Statistiques GitHub Pages

Une fois déployé, vous pouvez voir les statistiques de votre app :
1. Repository → Insights → Traffic
2. Vous verrez le nombre de visiteurs, de vues, etc.

---

## 🔒 Domaine personnalisé (optionnel)

Si vous avez un domaine personnalisé :

1. Dans Settings → Pages → Custom domain
2. Entrez votre domaine : `japonais.monsite.com`
3. Configurez les DNS de votre domaine :
   ```
   Type: CNAME
   Name: japonais
   Value: VOTRE-USERNAME.github.io
   ```

---

## 💡 Astuces

### Partager votre app

Partagez simplement l'URL :
```
https://VOTRE-USERNAME.github.io/apprendre-japonais/
```

### QR Code

Créez un QR Code de votre URL pour partager facilement sur mobile :
- [QR Code Generator](https://www.qr-code-generator.com/)

### Analytics

Pour suivre les visites, ajoutez Google Analytics :
1. Créez un compte [Google Analytics](https://analytics.google.com/)
2. Ajoutez le script de tracking dans `index.html`

---

## 🎓 Ressources

- [Documentation GitHub Pages](https://docs.github.com/en/pages)
- [Documentation PWA](https://web.dev/progressive-web-apps/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

---

## ✉️ Support

Si vous rencontrez des problèmes :
1. Vérifiez la console du navigateur (F12)
2. Vérifiez les settings GitHub Pages
3. Attendez 2-3 minutes après chaque modification

---

## 🎉 Félicitations !

Votre application d'apprentissage du japonais est maintenant en ligne et accessible dans le monde entier ! 🌍

頑張りましょう！(Ganbarimashō - Bon courage !)

---

**Version** : 1.0
**Date** : 2 décembre 2025
