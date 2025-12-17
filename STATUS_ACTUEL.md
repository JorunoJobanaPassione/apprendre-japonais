# JaponaisApp - État du Projet

**Date** : 17 Décembre 2025
**Version** : 1.5.2
**Stack** : React Native (Expo SDK 54)

---

## Statut Actuel

```
Contenu           [####################] 100%
Gamification      [####################] 100%
Audio VOICEVOX    [####################] 100%
Premium/Paywall   [####################] 100%
Compatibilité     [####################] 100%
UI/UX             [==========          ] En cours (designer)
Publication       [                    ] Après UI/UX
```

---

## Contenu

### Leçons (42 total)
- 11 leçons Hiragana (46 caractères)
- 11 leçons Katakana (46 caractères)
- 20 leçons Kanji N5 (102 kanji)
- ~400 exercices (QCM, transcription, intrus, kanji)

### Audio
- 189 fichiers MP3 générés avec **VOICEVOX**
- Voix : ずんだもん (ID 3) - claire et naturelle
- Backup gTTS disponible dans `audio_backup_gtts/`

### Gamification
- Lives : 7 max, recharge 3h
- Streak : Protection gratuite (1-7 jours de grâce)
- Mode Vacances : 14 jours/an
- Quêtes quotidiennes : 5/jour
- SRS : Algorithme SM-2
- Daily Challenge : 10 proverbes

---

## Architecture

```
JaponaisApp/
├── mobile-app/
│   ├── src/
│   │   ├── data/           # lessonsData.js, kanjiN5.js
│   │   ├── components/     # 15 composants UI
│   │   ├── screens/        # 8 écrans
│   │   ├── services/       # 10 services
│   │   ├── contexts/       # PremiumContext
│   │   ├── styles/         # theme.js, globalStyles.js
│   │   └── utils/          # logger.js
│   ├── assets/
│   │   ├── audio/          # 189 MP3 VOICEVOX
│   │   ├── audio_backup_gtts/
│   │   └── icon.png
│   └── app.json
├── scripts/
│   ├── generate-audio-voicevox.py
│   └── regenerate-all-audio.py
├── README.md
├── STATUS_ACTUEL.md
└── STRATEGIE_PREMIUM.md
```

---

## Monétisation (prêt pour production)

### Premium (RevenueCat)
- Mensuel : 7,99€/mois
- Annuel : 39,99€/an (58% économie)
- Lifetime : 99,99€

### Limites Gratuit vs Premium
| Feature | Gratuit | Premium |
|---------|---------|---------|
| Exercices/jour | 20 | Illimité |
| Révisions SRS/jour | 10 | Illimité |
| Vies max | 3 | 7 |
| Kanji débloqués | 10 | Tous (102+) |
| Publicités | Oui | Non |

### AdMob
- Bannières sur Home, Lessons, SRS
- Masquées automatiquement pour Premium

**Note** : AdMob et RevenueCat nécessitent un EAS Build (pas compatible Expo Go)

---

## Commandes

```bash
# Lancer l'app (Expo Go)
cd mobile-app && npx expo start --clear

# Régénérer les audios VOICEVOX
cd scripts && python generate-audio-voicevox.py

# Build pour production (EAS)
cd mobile-app && eas build --platform all
```

---

## Prochaines étapes

1. **UI/UX Designer** - Améliorer l'interface
2. **EAS Build** - Build natif pour activer AdMob/RevenueCat
3. **Tests réels** - Tester sur iOS/Android physiques
4. **Configuration production** - Clés RevenueCat et AdMob
5. **Documents légaux** - Privacy Policy, Terms of Service
6. **Soumission stores** - App Store et Play Store

---

## Historique des versions

### v1.5.2 (17 Déc 2025)
- Audio régénéré avec voix ずんだもん (VOICEVOX)
- Nettoyage fichiers obsolètes (html-version supprimé)

### v1.5.1 (17 Déc 2025)
- Clés de stockage unifiées (correction bug critique)
- Compatibilité Expo Go (AdMob/RevenueCat désactivés en dev)
- Logger utilitaire pour production

### v1.5.0
- Audio VOICEVOX haute qualité
- 42 leçons complètes
- Système de gamification complet
