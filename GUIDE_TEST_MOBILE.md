# 📱 Guide de Test Mobile - Version Corrigée

## 🎯 Corrections Apportées

### 1. ✅ Texte "Votre progression" lisible
- Couleur plus foncée (#374151 au lieu de #6b7280)
- Font-weight augmenté à 600
- Font-size à 15px pour meilleure lisibilité

### 2. ✅ Boutons footer (Stats) non coupés
- Font-size réduit à 10px (9px pour "Statistiques")
- Padding optimisé
- `text-overflow: ellipsis` pour éviter les débordements
- `flex: 1` pour distribution égale de l'espace

### 3. ✅ Swipe gauche/droite pour naviguer entre questions
- Déjà implémenté dans la mise à jour précédente

---

## 🧪 Option 1 : Test Direct sur Safari Mobile (RECOMMANDÉ)

### Étape 1 : Lancer un serveur HTTP local

**Sur Windows (PowerShell)** :
```powershell
cd "C:\Users\dosso\Desktop\Projets\Japonais\JaponaisApp\html-version"
python -m http.server 8080
```

**Alternative avec Node.js** :
```bash
cd "C:\Users\dosso\Desktop\Projets\Japonais\JaponaisApp\html-version"
npx http-server -p 8080
```

### Étape 2 : Trouver l'adresse IP de ton PC

**Sur Windows (CMD)** :
```cmd
ipconfig
```

Cherche "Adresse IPv4" sous "Carte réseau sans fil Wi-Fi"
Exemple : `192.168.1.10`

### Étape 3 : Ouvrir sur iPhone

**Sur Safari iOS** :
```
http://192.168.1.10:8080/index.html
```

⚠️ **Important** : Ton iPhone et ton PC doivent être sur le **même réseau Wi-Fi** !

---

## 🧪 Option 2 : Test via Expo (nécessite déploiement GitHub)

### Problème actuel
L'app Expo charge depuis :
```
https://jorunojobanapassione.github.io/apprendre-japonais/html-version/
```

Cette URL n'a pas encore les dernières modifications.

### Solution : Pousser sur GitHub Pages

```bash
cd "C:\Users\dosso\Desktop\Projets\Japonais\JaponaisApp"

# 1. Vérifier le statut
git status

# 2. Ajouter les modifications
git add html-version/mobile-optimizations.css
git add html-version/mobile-swipe.js
git add html-version/index.html
git add html-version/app.js
git add MOBILE_UPDATE_11DEC2025.md
git add GUIDE_TEST_MOBILE.md

# 3. Commit
git commit -m "fix(mobile): Correction UI mobile - texte progression + bouton Stats + swipe navigation

- Fix: Texte 'Votre progression' plus lisible (contraste amélioré)
- Fix: Bouton 'Statistiques' non coupé sur mobile
- Fix: Bouton retour visible sur écran d'exercice
- Feat: Navigation swipe gauche/droite entre questions
- Add: mobile-swipe.js (398 lignes)
- Update: mobile-optimizations.css (+161 lignes)"

# 4. Pousser sur GitHub
git push origin main

# 5. Attendre 2-3 minutes que GitHub Pages se mette à jour
```

### Ensuite : Tester sur Expo

```bash
cd mobile-app
npm start
```

Scanner le QR code avec Expo Go, l'app chargera la version à jour depuis GitHub Pages.

---

## ✅ Checklist de Test

### Test 1 : Texte "Votre progression" ✅
- [ ] Ouvrir l'app sur mobile
- [ ] Le titre "Votre progression" est bien visible
- [ ] Le texte "0/10 leçons complétées" est lisible
- [ ] Bon contraste avec le fond gris

### Test 2 : Boutons Footer ✅
- [ ] Les 4 boutons du footer sont visibles
- [ ] Le texte "Statistiques" n'est pas coupé
- [ ] Aucun bouton ne déborde ou n'est tronqué
- [ ] Tous les labels sont lisibles

### Test 3 : Bouton Retour (déjà testé) ✅
- [ ] Lancer une leçon (cliquer sur "GO!")
- [ ] Le bouton "← Quitter" est visible en haut à gauche
- [ ] Taille suffisante pour être cliqué facilement
- [ ] Background coloré pour bien le voir

### Test 4 : Swipe Navigation (déjà testé) ✅
- [ ] Lancer une leçon
- [ ] Répondre à une question
- [ ] Swipe gauche → Question suivante
- [ ] Swipe droite → Question précédente
- [ ] Indicateurs ← → apparaissent pendant le swipe
- [ ] Message "Swipe ← → pour naviguer" s'affiche au début

### Test 5 : Bouton "Découvrir" Proverbe (déjà testé) ✅
- [ ] Scroll jusqu'à "PHRASE DU JOUR"
- [ ] Le bouton "Découvrir →" est entièrement visible
- [ ] Pas de texte coupé

---

## 🔧 Dépannage

### Problème : Le serveur local ne marche pas
**Solution** : Installe Python ou Node.js
- Python : https://www.python.org/downloads/
- Node.js : https://nodejs.org/

### Problème : iPhone ne se connecte pas
**Vérifications** :
1. iPhone et PC sur le même Wi-Fi ?
2. Firewall Windows bloque le port 8080 ?
3. Bonne adresse IP (`ipconfig`) ?

**Désactiver temporairement le firewall Windows** :
```
Paramètres > Réseau et Internet > Pare-feu Windows > Désactiver (temporaire)
```

### Problème : GitHub Pages pas à jour
**Solution** : Vider le cache
- Sur Safari iOS : Réglages > Safari > Effacer l'historique et les données de sites web
- Attendre 2-3 minutes après le `git push`

---

## 📊 Résumé des Modifications

### Fichiers modifiés : 1
- `html-version/mobile-optimizations.css` (+57 lignes)

### Lignes ajoutées : +57
- Section "Progress Section Mobile Fix" : 23 lignes
- Section "Footer Buttons Mobile Fix" : 34 lignes

### Total depuis début : +632 lignes de code

---

## 🚀 Prochaine Étape

Une fois les tests OK, tu pourras :
1. ✅ Valider que tous les bugs sont corrigés
2. 📝 Mettre à jour le PROJECT_STATUS.md
3. 🎉 Passer à la prochaine feature (SRS, Contenu N4, etc.)

---

**Date** : 11 décembre 2025, 20h30
**Version** : 5.6.1 (Mobile UI Fixes)
**Status** : ✅ Prêt pour tests
