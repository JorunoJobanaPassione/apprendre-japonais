# 🚀 Déploiement Rapide - 3 Étapes

## ✅ Votre app est maintenant une PWA !

### 📱 Tester Localement

```bash
npm run web
```

Ouvrez **http://localhost:8083** et installez l'app sur votre écran d'accueil !

---

## 🌍 Déployer en Ligne (GRATUIT)

### Option Simple - Glisser-Déposer sur Netlify

#### 1️⃣ Build l'application

```bash
npm run build:web
```

Cela crée un dossier `web-build/`

#### 2️⃣ Créer un compte Netlify

- Allez sur https://app.netlify.com
- Créez un compte gratuit (GitHub/Email)

#### 3️⃣ Déployez !

1. Sur Netlify, cliquez sur **"Add new site"**
2. **Glissez-déposez** le dossier `web-build/` sur la page
3. ✨ **C'est tout !** Votre app est en ligne !

**Vous obtiendrez un lien comme :**
`https://nom-genere-12345.netlify.app`

---

### Option Pro - Avec Git (Mises à jour automatiques)

#### 1️⃣ Init Git et GitHub

```bash
git init
git add .
git commit -m "🚀 PWA Japonais prête"
```

Créez un repo sur GitHub et poussez :

```bash
git remote add origin https://github.com/VOTRE-USERNAME/VOTRE-REPO.git
git branch -M main
git push -u origin main
```

#### 2️⃣ Connecter à Netlify

1. Sur Netlify : **"Add new site"** → **"Import from Git"**
2. Sélectionnez votre repo GitHub
3. Paramètres :
   - **Build command :** `npx expo export:web`
   - **Publish directory :** `web-build`
4. Cliquez **"Deploy site"**

#### 3️⃣ Mises à jour automatiques

Chaque fois que vous faites `git push`, Netlify rebuild automatiquement ! 🎉

```bash
# Faire des changements
git add .
git commit -m "Update: nouvelle fonctionnalité"
git push

# Netlify rebuild automatiquement !
```

---

## 📱 Partager avec vos Testeurs

```
🎌 J'ai besoin de vos retours !

Testez mon app d'apprentissage du Japonais :
👉 https://votre-app.netlify.app

✨ Vous pouvez l'installer sur votre écran d'accueil :
• Mobile : Menu → "Ajouter à l'écran d'accueil"
• Desktop : Icône "Installer" dans la barre d'adresse

📝 Donnez-moi vos retours :
- Bugs rencontrés ?
- Fonctionnalités manquantes ?
- Difficultés d'utilisation ?

Merci ! 🙏
```

---

## ✨ Personnaliser votre URL Netlify

1. Sur Netlify : **Site settings** → **Change site name**
2. Choisissez un nom : `apprendre-japonais.netlify.app`
3. Ou ajoutez votre propre domaine !

---

## 🎯 Checklist Déploiement

- ✅ `npm run build:web` → Pas d'erreurs
- ✅ Testé en local avec `npm run web`
- ✅ Toutes les fonctionnalités marchent
- ✅ Déployé sur Netlify
- ✅ Testé l'app en ligne
- ✅ Installé l'app sur mobile pour vérifier
- ✅ Partagé le lien avec des testeurs

---

## 🆘 Besoin d'Aide ?

Consultez **DEPLOIEMENT_WEB.md** pour le guide complet avec :
- Résolution de problèmes
- Options de déploiement avancées
- Analytics
- Optimisations

Bon déploiement ! 🚀
