# 🚀 Déploiement GitHub Pages - SUPER SIMPLE

## Méthode la Plus Rapide (5 minutes)

### Option 1 : Expo Publishing (RECOMMANDÉ)

```bash
# 1. Installez expo-cli globalement
npm install -g eas-cli

# 2. Publiez votre app
npx expo publish --web
```

Expo hébergera votre app gratuitement ! Vous obtiendrez un lien comme :
`https://expo.dev/@votre-username/JaponaisApp`

---

### Option 2 : GitHub Pages Classique

#### 1️⃣ Créer le repo GitHub

```bash
cd "C:\Users\dosso\Desktop\Projets\Japonais\JaponaisApp"

# Init git
git init
git add .
git commit -m "Initial commit - App Japonais PWA"
```

Créez un repo sur GitHub (par exemple : `apprendre-japonais`)

```bash
git remote add origin https://github.com/VOTRE-USERNAME/apprendre-japonais.git
git branch -M main
git push -u origin main
```

#### 2️⃣ Installer gh-pages

```bash
npm install --save-dev gh-pages
```

#### 3️⃣ Modifier package.json

Ajoutez en haut du fichier :

```json
{
  "homepage": "https://VOTRE-USERNAME.github.io/apprendre-japonais",
  ...
}
```

Et dans scripts :

```json
"scripts": {
  ...
  "predeploy": "expo export:web",
  "deploy": "gh-pages -d web-build"
}
```

#### 4️⃣ Déployer

```bash
npm run deploy
```

Votre app sera sur : `https://VOTRE-USERNAME.github.io/apprendre-japonais` 🎉

---

### Option 3 : Partage Local via Ngrok (Tests Rapides)

Pour partager **immédiatement** sans déploiement :

```bash
# 1. Installez ngrok
npm install -g ngrok

# 2. Lancez votre app
npm run web

# 3. Dans un autre terminal
ngrok http 8083
```

Vous obtenez un lien public comme `https://abc123.ngrok.io` que vous pouvez partager instantanément ! ⚡

**Note :** Le lien expire quand vous fermez ngrok.

---

## 🎯 Quelle Option Choisir ?

| Option | Temps | Permanent | Gratuit | Facile |
|--------|-------|-----------|---------|--------|
| **Expo Publish** | 2 min | ✅ Oui | ✅ Oui | ⭐⭐⭐⭐⭐ |
| **GitHub Pages** | 5 min | ✅ Oui | ✅ Oui | ⭐⭐⭐⭐ |
| **Ngrok** | 30 sec | ❌ Non | ✅ Oui | ⭐⭐⭐⭐⭐ |

**Recommandation :**
- Pour tests rapides → **Ngrok**
- Pour partage durable → **Expo Publish** ou **GitHub Pages**

---

## 📱 Après le Déploiement

Partagez le lien :

```
🎌 Testez mon app d'apprentissage du Japonais !
👉 [VOTRE-LIEN]

✨ Installable sur votre écran d'accueil !
📝 Vos retours sont précieux !
```

---

## 🐛 Si ça ne marche toujours pas

**Plan B - Version HTML Statique Pure**

Je peux créer une version HTML/CSS/JS pure (sans React Native) qui marchera 100% sur GitHub Pages. Dites-moi si vous voulez cette version !

---

Besoin d'aide ? Faites-moi signe ! 🚀
