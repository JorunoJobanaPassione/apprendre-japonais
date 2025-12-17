# 📱 Apprendre le Japonais - Application Mobile React Native

Une application mobile complète pour apprendre le japonais (Hiragana, Katakana, Kanji) avec un système de gamification unique et une approche anti-Duolingo (récupération gratuite de vies, protection automatique du streak).

## 🎯 Vision

L'app #1 mondiale pour apprendre le japonais - **Devenir le leader du marché**

**Positionnement** : *"La SEULE app qui combine fun, culture et efficacité pour maîtriser le japonais"*

## 📊 État Actuel du Projet

**Version** : 1.0.0-alpha (MVP + Leçons complètes)
**Dernière mise à jour** : 13 Décembre 2025
**Status** : ✅ MVP FONCTIONNEL - 22 leçons importées ! Prêt pour système d'exercices

### Progression de la Migration React Native

- **Progression globale** : ~25% des fonctionnalités web migrées
- **MVP fonctionnel** : ✅ OUI - L'app démarre avec 22 leçons complètes !

Voir [MIGRATION_REACT_NATIVE_STATUS.md](./MIGRATION_REACT_NATIVE_STATUS.md) pour les détails complets.

## ✨ Fonctionnalités Actuelles

### ✅ Implémenté (MVP)

- **22 leçons complètes**
  - 10 leçons Hiragana (voyelles, K, S, T, N, H, M/Y/R, W/N, Dakuten, Handakuten, Combinaisons, Révision)
  - 11 leçons Katakana (série complète)
  - 1 leçon Vocabulaire (Chiffres 1-100)
- **189 caractères** avec romaji et mnémoniques
- **286 exercices** (MCQ, Transcription, Intruder)
- Navigation fluide (React Navigation)
- Stockage persistant (AsyncStorage)
- 4 écrans fonctionnels (Home, Lessons, SRS, Profile)
- Système de vies affiché
- Design dark moderne
- Interface 100% native (pas de WebView)

### ⏳ En Cours

- Système d'exercices interactifs
- Système de vies complet avec récupération
- Système SRS (Spaced Repetition)
- Audio (153 fichiers MP3)

## 📂 Structure du Projet

```
JaponaisApp/
├── html-version/           # Version web originale (HTML/CSS/JS)
│   ├── lessons-data.js     # Données source des leçons
│   ├── srs.js              # Système SRS à migrer
│   ├── lives-system.js     # Système de vies à migrer
│   └── ...
├── mobile-app/             # Version React Native (en cours)
│   ├── src/
│   │   ├── screens/        # 5 écrans
│   │   ├── data/           # lessonsData.js (22 leçons)
│   │   ├── services/       # storage.js (AsyncStorage)
│   │   ├── styles/         # theme.js, globalStyles.js
│   │   ├── navigation/     # AppNavigator.js
│   │   ├── components/     # (à venir)
│   │   └── utils/          # (à venir)
│   ├── App.js              # Point d'entrée
│   └── package.json
├── scripts/                # Scripts utilitaires
│   └── convert-lessons.js  # Conversion HTML → React Native
├── MIGRATION_REACT_NATIVE_STATUS.md  # Suivi détaillé
├── CHECKLIST_STORES_2025.md          # Guide publication stores
├── PROJECT_STATUS.md                  # État version web
└── README.md              # Ce fichier
```

## 🚀 Installation & Lancement

### Prérequis

- Node.js 18+
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)

### Lancer l'app React Native

```bash
cd mobile-app
npm install
npx expo start
```

Puis :
- Appuyez sur `w` pour ouvrir dans le navigateur
- Appuyez sur `i` pour lancer sur simulateur iOS
- Appuyez sur `a` pour lancer sur émulateur Android
- Scannez le QR code avec Expo Go sur votre téléphone

### Lancer la version Web (HTML)

```bash
cd html-version
python -m http.server 8080
# Ouvrir http://localhost:8080
```

## 📝 Prochaines Étapes (Phase 2)

### Haute Priorité

1. ✅ **Importer toutes les leçons** - TERMINÉ (13/12/2025)
2. ⏳ **Système d'exercices** (3-4 jours)
   - Composants Exercise (MCQ, Transcription, Intruder)
   - Validation des réponses
   - Système de points/XP
   - Animations de feedback
3. ⏳ **Système de vies** (2-3 jours)
   - Récupération gratuite (5 SRS = +1 vie)
   - Timer de recharge (3h)
   - Modal de récupération
4. ⏳ **Système SRS** (4-5 jours)
   - Algorithme SM-2
   - Écran de révision
   - Scheduling automatique

Voir [MIGRATION_REACT_NATIVE_STATUS.md](./MIGRATION_REACT_NATIVE_STATUS.md) pour la roadmap complète.

## 📄 Documentation

- **MIGRATION_REACT_NATIVE_STATUS.md** - Suivi détaillé de la migration HTML → React Native
- **CHECKLIST_STORES_2025.md** - Guide complet pour publier sur App Store & Play Store
- **PROJECT_STATUS.md** - État de la version web originale (v5.8.0)
- **ANALYSE_CONCURRENCE_DUOLINGO.md** - Analyse des faiblesses de Duolingo et stratégie de différenciation

## 🛠️ Scripts Utilitaires

- **scripts/convert-lessons.js** - Convertit automatiquement les leçons HTML vers React Native
  ```bash
  node scripts/convert-lessons.js
  ```

## 📊 Statistiques

- **Version Web** : 5.8.0 (HTML/CSS/JS - ~10,000 lignes)
- **Version React Native** : 1.0.0-alpha (~2,000 lignes)
- **Leçons** : 22 (10 Hiragana + 11 Katakana + 1 Vocabulaire)
- **Caractères** : 189
- **Exercices** : 286
- **Taille** : ~50 MB (avec node_modules)

## 🎯 Objectifs Business

**Objectif financier** : 10,000€/mois
**Stratégie** : 20K MAU + 1,250 premium @ 9.99€/mois
**Plateformes** : iOS, Android, Web (PWA)

## 📱 Publication Stores

**Timeline estimée** : 6-8 semaines pour être 100% prêt

Voir [CHECKLIST_STORES_2025.md](./CHECKLIST_STORES_2025.md) pour tous les détails.

## 🤝 Contribution

Ce projet est en développement actif. Toute contribution est la bienvenue !

## 📄 Licence

Propriétaire - Tous droits réservés

---

**Dernière mise à jour** : 13 Décembre 2025, 09h30
