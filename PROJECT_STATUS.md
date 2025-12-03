# 📊 Apprendre le Japonais - État du Projet

**Version** : 4.2.0
**Dernière mise à jour** : 3 décembre 2025
**Status** : ✅ Déployée et fonctionnelle
**URL** : https://jorunojobanapassione.github.io/apprendre-japonais/

**🎯 VISION** : Devenir l'app de référence pour apprendre à lire le japonais (viser l'échelle Duolingo)
**📈 OBJECTIF 3 MOIS** : 2000 utilisateurs actifs · 100 utilisateurs premium · 1000€/mois MRR

---

## 🎯 Description

Application web d'apprentissage des **hiragana** (71 caractères) avec :
- ✅ 10 leçons progressives complètes
- ✅ 6 types d'exercices variés (~220 exercices)
- ✅ Système de gamification (badges, points, streak, niveaux)
- ✅ **Mode révision intelligent** basé sur les erreurs
- ✅ **Écran de statistiques détaillées** avec progression
- ✅ PWA installable fonctionnant hors ligne
- ✅ Design responsive mobile et desktop

**Technologies** : HTML, CSS, JavaScript vanilla (pas de framework)

---

## ✅ Fonctionnalités Principales

### 🎓 Apprentissage
- **10 leçons** : Voyelles → K → S/T → N/H → M/Y/R → W/N → Dakuten → Handakuten → Combinaisons → Révision
- **6 types d'exercices** :
  - Présentation (table des hiragana)
  - QCM (reconnaissance avec options mélangées)
  - Intrus (trouver l'intrus avec positions aléatoires)
  - Transcription (écriture en romaji avec alternatives)
  - Lecture en contexte (saisie de texte)
  - Input Kana (écriture en romaji)
- **Vocabulaire** : 150+ mots pratiques avec traduction

### 🎮 Gamification
- **Système de progression** : Niveaux, points, streak
- **15+ badges** à débloquer
- **Sauvegarde automatique** (LocalStorage)
- **Personnalisation** : Choix du nombre de questions (10/15/20)

### 🌐 PWA
- **Installable** sur mobile et desktop
- **Fonctionne hors ligne** (Service Worker)
- **Mises à jour automatiques** (Network First strategy)
- **Cache-busting** pour garantir la dernière version

---

## 📦 Structure du Projet

```
/html-version
├── index.html           # HTML principal
├── style.css            # Styles (design violet/blanc)
├── app.js               # Logique applicative
├── lessons-data.js      # Données des leçons et badges
├── manifest.json        # Manifest PWA
├── service-worker.js    # Service Worker (offline + cache)
├── icon-192.png         # Icône PWA 192x192
└── icon-512.png         # Icône PWA 512x512

/.github/workflows
└── deploy.yml           # Workflow de déploiement automatique

/
├── PROJECT_STATUS.md    # État du projet (ce fichier)
└── README.md            # Documentation technique
```

---

## 📊 Statistiques

- **~2000 lignes de code** (HTML/CSS/JS)
- **~220 exercices** au total
- **71 hiragana** enseignés
- **150+ mots** de vocabulaire
- **15+ badges** à débloquer

---

## 🚀 Historique des Versions

### V4.2.0 (3 décembre 2025) - ✅ ACTUELLE
**Nouvelles fonctionnalités : Mode Révision + Statistiques détaillées**
- 📊 **Écran de statistiques complet** :
  - Carte de profil avec niveau et progression
  - Vue détaillée de chaque leçon (score, tentatives, dates)
  - Activité récente et métriques
  - Visualisation des caractères à réviser
- 🔄 **Mode révision intelligent** :
  - Tracking automatique des erreurs par caractère
  - Génération de leçons personnalisées
  - Exercices ciblés sur les hiragana problématiques
  - Affichage dans statistiques avec compteur d'erreurs
- 🎨 Design responsive pour toutes les nouvelles pages
- 📦 Nettoyage du projet (suppression fichiers obsolètes React/Node)

### V4.1.1 (2 décembre 2025)
**Corrections pédagogiques et cache**
- Exercices "Lecture en contexte" : réponses cachées, saisie obligatoire
- QCM et Intrus : mélange aléatoire des options à chaque question
- Cache-busting : paramètres de version (?v=4.1.1)
- Service Worker : stratégie Network First pour garantir la dernière version
- Workflow GitHub Actions : déploiement automatique

### V4.1 (2 décembre 2025)
**Refonte HTML/CSS/JS pure**
- Recréation complète en vanilla JS (abandon React Native Web)
- PWA fonctionnelle avec Service Worker
- 10 leçons + 6 types d'exercices
- Gamification complète
- Déployée sur GitHub Pages

---

## 🚀 ROADMAP AGGRESSIVE (3 mois pour devenir incontournable)

### 🔥 MOIS 1 : Fondations Addictives (100 utilisateurs quotidiens)

**Semaine 1 : 🎧 Audio Natif**
- [ ] Générer 71 fichiers MP3 (Amazon Polly / ElevenLabs)
- [ ] Intégrer lecteur audio dans app.js
- [ ] Ajouter bouton de prononciation sur chaque hiragana
- [ ] Tester qualité audio sur tous les exercices
- [ ] Déployer V4.3.0

**Semaine 2 : ⚡ Mode Express 90 secondes**
- [ ] Créer UI du mode Express (écran d'accueil)
- [ ] Implémenter timer 90 secondes
- [ ] Logique de sélection 5 questions (hiragana les plus ratés)
- [ ] Écran de résultats avec partage social
- [ ] Animations de célébration (confettis)
- [ ] Déployer V4.4.0

**Semaine 3 : 🏆 Leaderboard Réel**
- [ ] Setup Supabase (compte + projet)
- [ ] Créer table leaderboard (username, total_xp, streak, last_active)
- [ ] Implémenter sync XP automatique
- [ ] Créer écran Leaderboard (Top 50 mondial)
- [ ] Ajouter Realtime subscriptions
- [ ] Déployer V4.5.0

**Semaine 4 : 🎨 Animations & Push Notifications**
- [ ] Ajouter animations CSS (correct/wrong/celebrate)
- [ ] Intégrer sons (ding, buzz, fanfare)
- [ ] Implémenter Push Notifications PWA
- [ ] Message quotidien "Ne perds pas ton streak"
- [ ] Améliorer feedback visuel global
- [ ] Déployer V4.6.0

**Objectif fin Mois 1 : 100 utilisateurs actifs quotidiens**

---

### 💎 MOIS 2 : Expansion + Monétisation (500 utilisateurs · 10 payants)

**Semaine 5-6 : 📚 Katakana Complet**
- [ ] Créer 10 leçons Katakana (structure identique Hiragana)
- [ ] Générer 46 fichiers audio katakana
- [ ] Adapter exercices pour katakana
- [ ] Badges katakana (15 nouveaux badges)
- [ ] Déployer V5.0.0 (mise à jour majeure)

**Semaine 7 : 💳 Tier Premium + Stripe**
- [ ] Créer compte Stripe
- [ ] Définir features Free vs Premium
- [ ] Implémenter système de vies (5 erreurs/jour en Free)
- [ ] Écran d'upgrade vers Premium
- [ ] Intégrer Stripe Checkout
- [ ] Déployer V5.1.0

**Semaine 8 : 🧠 SRS Basique (Révision Espacée)**
- [ ] Implémenter algorithme SRS simple (localStorage)
- [ ] Tracking dates de révision par caractère
- [ ] Notifications de révision intelligentes
- [ ] Écran "Révisions du jour"
- [ ] Déployer V5.2.0

**Objectif fin Mois 2 : 500 utilisateurs · 10 premium (100€/mois MRR)**

---

### 🌟 MOIS 3 : Scale + Viral (2000 utilisateurs · 100 payants)

**Semaine 9-10 : 🔤 Kanji N5 (100 premiers kanji)**
- [ ] Implémenter leçons kanji (sens, lecture, exemples)
- [ ] Exercices spécifiques kanji (reconnaissance, écriture)
- [ ] Audio pour les lectures kun/on
- [ ] Mini-phrases avec kanji en contexte
- [ ] Déployer V6.0.0 (feature Premium exclusive)

**Semaine 11 : 🎁 Système de Parrainage Viral**
- [ ] Créer système de codes de parrainage
- [ ] "Invite 3 amis → 1 mois Premium gratuit"
- [ ] Écran de partage (social media)
- [ ] Tracking des invitations
- [ ] Déployer V6.1.0

**Semaine 12 : 📊 Analytics Avancés + A/B Testing**
- [ ] Intégrer Google Analytics 4
- [ ] Setup Plausible.io (privacy-friendly)
- [ ] Créer dashboard metrics clés
- [ ] A/B test sur CTA Premium
- [ ] Optimisation conversion
- [ ] Déployer V6.2.0

**Objectif fin Mois 3 : 2000 utilisateurs · 100 premium (1000€/mois MRR)**

---

## 💰 Modèle de Monétisation

### FREE (80% des utilisateurs)
- ✅ Tous les hiragana + katakana
- ✅ Exercices illimités
- ✅ Gamification de base
- ✅ Leaderboards
- ❌ 5 vies/jour (5 erreurs max)
- ❌ Pub discrète entre leçons

### PREMIUM @ 9.99€/mois (20% des utilisateurs)
- ✅ Vies illimitées
- ✅ Pas de publicité
- ✅ **Kanji N5 + N4 (valeur ajoutée énorme)**
- ✅ SRS avancé (révision optimale)
- ✅ Téléchargement offline
- ✅ Badge exclusif 👑
- ✅ Support prioritaire

### Projections Financières
| Utilisateurs | Premium (20%) | MRR        | Annuel    |
|--------------|---------------|------------|-----------|
| 100          | 20            | 200€       | 2.4K€     |
| 500          | 100           | 1K€        | 12K€      |
| 2000         | 400           | 4K€        | 48K€      |
| 10K          | 2000          | 20K€       | 240K€     |
| 100K         | 20K           | 200K€      | 2.4M€     |

---

## 🎯 Stratégie de Croissance Virale

### Phase 1 : Early Adopters (Mois 1)
- ✅ Google Form de feedback envoyé
- 📢 Reddit r/LearnJapanese (300K membres)
- 📢 Discord communautés japonais
- 🎁 100 premiers = 1 mois Premium gratuit

### Phase 2 : Influenceurs (Mois 2)
- 📧 Contacter créateurs YouTube japonais
  - Dogen (250K subs)
  - That Japanese Man Yuta (1M+ subs)
- 💰 Programme d'affiliation (30% commission)
- 🎥 Vidéo de présentation professionnelle

### Phase 3 : Viral & PR (Mois 3)
- 🚀 Product Hunt launch (objectif Top 5)
- 📱 TikTok content strategy
- 📰 Pitch à TechCrunch, The Verge
- 🎁 Système de parrainage actif

---

## 🔑 Notre Unfair Advantage

**Vs Duolingo** : 30 jours pour maîtriser hiragana (vs 6 mois chez eux)
**Vs Anki** : UX moderne 2025 (vs UI de 2005)
**Vs WaniKani** : Gratuit au départ (vs $9/mois dès le début)
**Vs Busuu** : Focus 100% lecture japonaise (pas générique)

**Notre positionnement** :
> "La SEULE app qui t'apprend à VRAIMENT lire le japonais en 30 jours, avec la méthode des polyglotes."

---

## 🐛 Bugs Connus

Aucun bug critique identifié ✅

---

## 🎉 Points Forts

### Pédagogie
✅ Progression naturelle et logique
✅ 6 types d'exercices variés
✅ Active Recall (transcription et production)
✅ Vocabulaire authentique et utile
✅ Feedback immédiat sur les réponses

### UX
✅ Design moderne et épuré
✅ Animations CSS fluides
✅ Personnalisation du rythme
✅ Gamification motivante
✅ Responsive mobile et desktop

### Technique
✅ Code simple et maintenable (vanilla JS)
✅ PWA fonctionnelle hors ligne
✅ Déploiement automatique (GitHub Actions)
✅ Mises à jour garanties (Network First + cache-busting)
✅ Performance excellente (pas de framework lourd)

---

## 🔒 Limitations Actuelles (à résoudre en priorité)

### 🎯 CRITIQUES (Semaines 1-4)
- ❌ **Pas d'audio** → Bloquant pour apprentissage prononciation
- ❌ **Pas de mode Express 90s** → Manque d'engagement rapide
- ❌ **Pas de leaderboard réel** → Pas de compétition sociale
- ❌ **Pas de push notifications** → Faible rétention

### ⚠️ IMPORTANTES (Mois 2)
- ⚠️ Pas de katakana (46 caractères manquants)
- ⚠️ Pas de tier Premium (pas de revenu)
- ⚠️ Pas de SRS (révision non optimale)
- ⚠️ Pas de backend (pas de sync multi-device)

### 💡 LONG TERME (Mois 3+)
- 💡 Pas de kanji (limite à hiragana/katakana)
- 💡 Pas d'analytics avancés
- 💡 Pas de système de parrainage
- 💡 Pas de A/B testing

---

## 📞 Contact

- 🌐 **Application** : https://jorunojobanapassione.github.io/apprendre-japonais/
- 🐛 **Issues** : https://github.com/JorunoJobanaPassione/apprendre-japonais/issues
- 📦 **Repository** : https://github.com/JorunoJobanaPassione/apprendre-japonais

---

## 🏆 Conclusion

Application complète et fonctionnelle pour apprendre les hiragana, déployée et accessible publiquement. Prête pour la collecte de feedbacks et l'amélioration continue.

頑張りましょう！ (Ganbarimashou - Bon courage !)

---

**Version du document** : 4.0 (Roadmap Business Agressive)
**Prochaine revue** : Fin de Mois 1 (4 janvier 2026)
**Objectif 2026** : 10K utilisateurs · 2000 premium · 20K€/mois MRR
