# 📱 Guide d'utilisation sur iPhone

## 🎯 Utiliser l'application sur votre iPhone avec Expo Go

### Prérequis

✅ **Expo Go** installé sur votre iPhone (App Store)
✅ **PC et iPhone sur le même réseau Wi-Fi**
✅ **Node.js** installé sur votre PC

---

## 🚀 Étape 1 : Démarrer le serveur Expo

Sur votre PC, ouvrez un terminal et naviguez vers le dossier du projet :

```bash
cd C:\Users\dosso\Desktop\Projets\Japonais\JaponaisApp\mobile-app
```

Démarrez le serveur Expo :

```bash
npx expo start
```

Vous verrez un **QR Code** s'afficher dans le terminal.

---

## 📲 Étape 2 : Scanner le QR Code avec Expo Go

### Sur votre iPhone :

1. **Ouvrez l'app Expo Go**
2. **Cliquez sur "Scan QR code"**
3. **Scannez le QR Code** affiché dans votre terminal PC
4. **Attendez le chargement** (première fois peut prendre 30-60 secondes)

---

## ✨ Étape 3 : Profiter de l'application !

L'application va se charger et vous pourrez :

- ✅ Accéder aux **30 leçons** (Hiragana + Katakana)
- ✅ Utiliser le **système SRS** pour réviser
- ✅ Voir vos **statistiques avancées** avec graphiques
- ✅ Compléter les **quêtes quotidiennes**
- ✅ Consulter le **leaderboard**
- ✅ Profiter de l'**optimisation mobile complète**

---

## 🔧 Alternative : Tunnel Expo (sans même réseau)

Si votre iPhone et PC ne sont **pas sur le même réseau Wi-Fi** :

```bash
npx expo start --tunnel
```

Cette commande crée un tunnel public. Scannez simplement le nouveau QR Code.

⚠️ **Note** : Le tunnel peut être un peu plus lent.

---

## 🌐 Alternative 2 : Accès direct GitHub Pages

Si vous ne voulez pas utiliser Expo, vous pouvez simplement ouvrir l'application dans **Safari** sur votre iPhone :

**URL** : https://jorunojobanapassione.github.io/apprendre-japonais/html-version/

Ensuite, pour installer comme PWA :
1. Cliquez sur le bouton **Partager** (icône carré avec flèche)
2. Sélectionnez **"Sur l'écran d'accueil"**
3. L'app s'installera comme une vraie application native !

---

## 🐛 Dépannage

### Le QR Code ne scan pas
- Vérifiez que votre iPhone et PC sont sur le **même Wi-Fi**
- Essayez la commande `npx expo start --tunnel`
- Redémarrez Expo Go

### L'app ne charge pas
- Vérifiez votre **connexion internet**
- Le serveur Expo doit **rester actif** sur votre PC
- Attendez quelques secondes, le chargement initial peut être long

### L'app affiche une page blanche
- L'application charge depuis GitHub Pages
- Vérifiez que https://jorunojobanapassione.github.io/apprendre-japonais/html-version/ fonctionne dans Safari
- Attendez quelques secondes pour le chargement

---

## 📊 Fonctionnalités disponibles sur iPhone

### ✅ Optimisations mobiles incluses :
- Touch targets 44x44px (Apple HIG)
- Safe area insets (support notch iPhone)
- Virtual keyboard auto-scroll
- Swipe gestures
- Vibration feedback
- Offline mode
- Responsive design parfait

### ✅ Toutes les fonctionnalités :
- 30 leçons complètes (Hiragana + Katakana)
- Système SRS avec algorithme optimisé
- Statistiques avancées avec graphiques Chart.js
- Quêtes quotidiennes
- Leaderboard mondial
- Mode hors ligne (PWA)

---

## 🎓 Astuces d'utilisation

1. **Ajoutez à l'écran d'accueil** pour un accès rapide
2. **Activez les notifications** pour les révisions SRS
3. **Utilisez en mode portrait** pour une meilleure expérience
4. **Profitez du mode sombre** automatique
5. **Swipez** pour naviguer entre les écrans

---

## 🚀 Commandes Expo utiles

### Démarrer normalement
```bash
npx expo start
```

### Démarrer avec tunnel (différent Wi-Fi)
```bash
npx expo start --tunnel
```

### Démarrer en mode production
```bash
npx expo start --no-dev --minify
```

### Vider le cache
```bash
npx expo start -c
```

---

## 📝 Informations techniques

- **Expo SDK** : 54.0.0
- **React Native WebView** : Dernière version
- **URL chargée** : https://jorunojobanapassione.github.io/apprendre-japonais/html-version/
- **Mode** : Production (PWA complète)

---

## ❓ Questions fréquentes

**Q: Puis-je utiliser l'app sans Expo ?**
A: Oui ! Ouvrez simplement l'URL dans Safari et ajoutez-la à l'écran d'accueil.

**Q: L'app fonctionne-t-elle hors ligne ?**
A: Oui, grâce au Service Worker PWA.

**Q: Mes progrès sont-ils sauvegardés ?**
A: Oui, tout est sauvegardé dans le localStorage de votre navigateur.

**Q: Puis-je utiliser sur iPad ?**
A: Oui, l'app est compatible iPad !

---

**Bon apprentissage du japonais ! がんばって！📱🇯🇵**
