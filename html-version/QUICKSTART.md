# ⚡ Démarrage Rapide - GitHub Pages

Guide ultra-rapide pour déployer en 5 minutes ! ⏱️

---

## 🎯 Étape 1 : Télécharger les icônes (30 secondes)

1. Ouvrez `generate-icons.html` dans votre navigateur
2. Cliquez sur les 2 boutons pour télécharger les icônes
3. Placez `icon-192.png` et `icon-512.png` dans ce dossier

---

## 🚀 Étape 2 : Commandes Git (2 minutes)

```bash
# 1. Initialiser Git
git init

# 2. Ajouter tous les fichiers
git add .

# 3. Premier commit
git commit -m "Initial commit - App Japonais v4.1"

# 4. Créer le repository sur GitHub (remplacez VOTRE-USERNAME)
# Allez sur github.com et créez un nouveau repository "apprendre-japonais"

# 5. Lier au repository GitHub (REMPLACEZ VOTRE-USERNAME !)
git remote add origin https://github.com/VOTRE-USERNAME/apprendre-japonais.git

# 6. Pousser le code
git branch -M main
git push -u origin main
```

---

## 🌐 Étape 3 : Activer GitHub Pages (1 minute)

1. Allez sur votre repository GitHub
2. **Settings** → **Pages**
3. Source : `main` / `/ (root)`
4. Cliquez sur **Save**

---

## ✅ C'est fait !

Votre app sera disponible dans 2 minutes à :

```
https://VOTRE-USERNAME.github.io/apprendre-japonais/
```

---

## 📱 Commandes rapides

### Mettre à jour l'app

```bash
git add .
git commit -m "Update"
git push
```

### Voir le statut

```bash
git status
```

### Voir l'historique

```bash
git log --oneline
```

---

## 🆘 Problèmes ?

### Page blanche ?
- Attendez 2-3 minutes
- Rechargez avec Ctrl+Shift+R

### Git demande un mot de passe ?
- Utilisez un Personal Access Token au lieu du mot de passe
- Ou configurez SSH

### Icônes manquantes ?
```bash
git add icon-192.png icon-512.png
git commit -m "Add icons"
git push
```

---

## 📚 Documentation complète

Voir `DEPLOIEMENT_GITHUB.md` pour le guide détaillé.

---

**Temps total : 5 minutes ⚡**

頑張りましょう！
