# JaponaisApp - État du Projet

**Date** : 17 Décembre 2025
**Version** : 1.5.1
**Stack** : React Native (Expo SDK 54)

---

## Statut Actuel : En attente UI/UX Designer

```
Contenu           [####################] 100%
Gamification      [####################] 100%
Audio             [####################] 100%
Premium/Paywall   [####################] 100%
AdMob             [####################] 100%
Icône App         [####################] 100%
UI/UX             [==========          ]  En cours (designer)
Screenshots       [                    ]  Après UI/UX
Publication       [                    ]  Après screenshots
```

---

## Ce qui est terminé

### Contenu (42 leçons)
- 11 leçons Hiragana (46 caractères)
- 11 leçons Katakana (46 caractères)
- 20 leçons Kanji N5 (102 kanji)
- ~400 exercices (QCM, transcription, intrus, kanji)

### Audio
- 189 fichiers MP3 (gTTS)
- Tous les kana + lectures kanji

### Gamification
- Lives : 7 max, recharge 3h
- Streak : Protection gratuite (1-7 jours)
- Mode Vacances : 14 jours/an
- Quêtes quotidiennes : 5/jour
- SRS : Algorithme SM-2
- Daily Challenge : 10 proverbes

### Monétisation
- **Premium (RevenueCat)** : 7,99€/mois, 39,99€/an, 99,99€ lifetime
- **AdMob** : Bannières sur Home, Lessons, SRS (masquées pour Premium)

### Assets
- Icône app : 1024x1024 (kanji stylisé + soleil rouge)
- Splash screen : Configuré

---

## Architecture

```
JaponaisApp/
├── mobile-app/
│   ├── src/
│   │   ├── data/           # Leçons + Kanji
│   │   ├── components/     # 15 composants UI
│   │   ├── screens/        # 8 écrans
│   │   ├── services/       # 10 services (SRS, lives, ads...)
│   │   └── contexts/       # PremiumContext
│   ├── assets/
│   │   ├── audio/          # 189 MP3
│   │   ├── icon.png        # Icône app
│   │   └── adaptive-icon.png
│   └── app.json            # Config Expo + AdMob
├── scripts/
│   └── regenerate-all-audio.py
├── html-version/           # Archive (ancienne version web)
└── STATUS_ACTUEL.md
```

---

## Corrections v1.5.1 (17 Déc 2025)

### Bugs critiques corrigés
- **Clés de stockage unifiées** : `livesSystem.js` et `srsSystem.js` utilisent maintenant les mêmes clés que `storage.js`
- **Initialisation lives** : `LivesIndicator` initialise maintenant à `CONFIG.MAX_LIVES` (7) au lieu de 5
- **useEffect dépendances** : `PremiumContext` a maintenant la dépendance `userId` correcte

### Améliorations code
- **TabIcon simplifié** : Suppression View inutile et import View non utilisé
- **Logger utilitaire** : Nouveau fichier `src/utils/logger.js` pour logs conditionnels en production
- **Commentaires corrigés** : `gainLife` indique maintenant "max 7" au lieu de "max 5"
- **Version HomeScreen** : Mise à jour vers 1.5.0

---

## Prochaines étapes

1. **UI/UX Designer** (en cours)
   - Revoir les écrans principaux
   - Améliorer l'expérience utilisateur
   - Créer une identité visuelle cohérente

2. **Après le design**
   - Intégrer les nouveaux designs
   - Créer screenshots stores
   - Tester sur iOS/Android réels
   - Configurer RevenueCat (clés production)
   - Privacy Policy + Terms of Service
   - Soumettre aux stores

---

## Commandes

```bash
# Lancer l'app
cd mobile-app && npx expo start

# Régénérer les audios
cd scripts && python regenerate-all-audio.py
```

---

## Brief pour le Designer

```
App : Apprentissage du japonais
Cible : Débutants francophones
Ton : Fun mais sérieux (style Duolingo)
Couleurs actuelles : #1a1a2e (fond), #6C63FF (accent)
Écrans : Home, Leçons, Exercices, SRS, Profil
```
