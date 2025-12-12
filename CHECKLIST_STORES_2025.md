# 📱 Checklist Publication - App Store (iOS) & Play Store (Android)

**App** : Apprendre le Japonais
**Version actuelle** : 5.8.0 (Web HTML/CSS/JS)
**Date** : 12 Décembre 2025
**Objectif** : Publier sur iOS App Store + Android Play Store

---

## 🎯 STATUT GLOBAL

| Catégorie | Progression | Critique | Temps estimé |
|-----------|-------------|----------|--------------|
| **🔧 Technique** | 30% | 🔴 BLOQUANT | 3-4 semaines |
| **📱 Assets** | 20% | 🔴 BLOQUANT | 1 semaine |
| **📄 Légal** | 0% | 🔴 BLOQUANT | 2-3 jours |
| **💼 Business** | 50% | 🟡 IMPORTANT | 1 semaine |
| **🎨 Marketing** | 10% | 🟡 IMPORTANT | 1 semaine |
| **💰 Paiement** | 0% | 🟡 OPTIONNEL | 1-2 semaines |

**🚀 ESTIMATION TOTALE : 6-8 semaines pour être 100% prêt**

---

## 🔴 BLOQUANTS CRITIQUES (Sans ça = Impossible de publier)

### 1. 🔧 CONVERSION EN APP NATIVE (3-4 semaines)

**❌ PROBLÈME** : L'app est actuellement en **HTML/CSS/JS pur** (web)
**✅ SOLUTION** : Convertir en app **React Native** ou **wrapper natif**

#### **Option A : React Native** (Recommandé) ⭐
**Avantages** :
- ✅ Performances natives
- ✅ Accès aux APIs iOS/Android (notifications, camera, etc.)
- ✅ Un seul codebase pour iOS + Android
- ✅ Meilleure UX (60 FPS garanti)

**Étapes** :
1. ✅ Installer React Native CLI
   ```bash
   npx react-native init ApprendreJaponais
   ```
2. ⏳ Convertir le code HTML → React components (2 semaines)
   - `app.js` → `App.tsx` (TypeScript recommandé)
   - Chaque "screen" → Composant React
   - CSS → StyleSheet ou styled-components
3. ⏳ Migrer les données (localStorage → AsyncStorage)
4. ⏳ Tester sur simulateur iOS + émulateur Android
5. ⏳ Build release iOS (.ipa) + Android (.apk/.aab)

**Temps estimé** : **3-4 semaines**

---

#### **Option B : Capacitor/Cordova** (Plus rapide mais moins performant)
**Avantages** :
- ✅ Garde le code HTML/CSS/JS actuel
- ✅ Wrapper WebView natif
- ✅ Plus rapide à implémenter (1-2 semaines)

**Inconvénients** :
- ❌ Performances inférieures à React Native
- ❌ WebView = pas de vraie app native
- ❌ Problèmes potentiels iOS (Apple n'aime pas les WebViews)

**Étapes** :
1. ✅ Installer Capacitor
   ```bash
   npm install @capacitor/core @capacitor/cli
   npx cap init
   npx cap add ios
   npx cap add android
   ```
2. ⏳ Configurer les permissions (Info.plist, AndroidManifest.xml)
3. ⏳ Tester sur devices réels
4. ⏳ Build release

**Temps estimé** : **1-2 semaines**

---

### 2. 📱 ASSETS REQUIS PAR LES STORES (1 semaine)

#### **iOS App Store**
- ❌ **Icône app** : 1024x1024 px (PNG sans alpha)
- ❌ **Screenshots iPhone** :
  - 6.7" (iPhone 15 Pro Max) : 1290 x 2796 px (3-10 images)
  - 5.5" (iPhone 8 Plus) : 1242 x 2208 px (3-10 images)
- ❌ **Screenshots iPad** (si support iPad) :
  - 12.9" (iPad Pro) : 2048 x 2732 px (3-10 images)
- ❌ **App Preview video** (Optionnel mais recommandé) : 15-30s

#### **Android Play Store**
- ❌ **Icône app** : 512x512 px (PNG)
- ❌ **Screenshots** :
  - Téléphone : 1080 x 1920 px minimum (2-8 images)
  - Tablette (optionnel) : 1536 x 2048 px (2-8 images)
- ❌ **Feature Graphic** : 1024 x 500 px (bannière Play Store)
- ❌ **Promo Video** (Optionnel) : YouTube link

#### **Autres assets**
- ❌ **Splash Screen** : Image de démarrage (plusieurs tailles)
- ❌ **Icônes de tailles variées** (iOS : 20pt à 1024pt, Android : mdpi à xxxhdpi)

**Outil recommandé** : [App Icon Generator](https://www.appicon.co/) ou Figma

**Temps estimé** : **3-5 jours** (design + optimisation)

---

### 3. 📄 DOCUMENTS LÉGAUX (2-3 jours)

#### **Obligatoires pour iOS + Android**
- ❌ **Politique de confidentialité** (Privacy Policy)
  - Données collectées (email, progression, stats)
  - Utilisation des données
  - Partage avec tiers (analytics, paiement)
  - Droits utilisateur (RGPD)
  - Page web publique (ex: https://votre-site.com/privacy)

- ❌ **Conditions d'utilisation** (Terms of Service)
  - Règles d'usage de l'app
  - Propriété intellectuelle
  - Limitation de responsabilité
  - Page web publique (ex: https://votre-site.com/terms)

- ❌ **Page de support** (Support URL)
  - Email de contact : support@votre-app.com
  - Formulaire de contact ou page FAQ
  - Page web publique (ex: https://votre-site.com/support)

**Générateurs utiles** :
- [TermsFeed](https://www.termsfeed.com/privacy-policy-generator/) (Privacy Policy)
- [GetTerms](https://getterms.io/) (Terms & Privacy)

**Temps estimé** : **1-2 jours** (rédaction + hébergement)

---

### 4. 💼 COMPTES DÉVELOPPEURS (1 jour)

#### **Apple Developer Program**
- ❌ Inscription : https://developer.apple.com/programs/
- ❌ **Coût** : **99 USD/an** (obligatoire pour publier)
- ❌ Documents requis :
  - Carte d'identité ou passeport
  - Numéro de téléphone
  - Carte bancaire (renouvellement auto annuel)
- ⏱️ Délai d'approbation : **24-48h**

#### **Google Play Console**
- ❌ Inscription : https://play.google.com/console/signup
- ❌ **Coût** : **25 USD** (paiement unique à vie)
- ❌ Documents requis :
  - Compte Google
  - Carte bancaire
- ⏱️ Délai d'approbation : **Immédiat**

**Temps estimé** : **1 jour** (inscription + validation)

---

## 🟡 IMPORTANT (Non bloquant mais fortement recommandé)

### 5. 🔧 TESTS SUR DEVICES RÉELS (1 semaine)

**❌ Actuellement** : Tests uniquement sur navigateur web (localhost:8080)
**✅ Nécessaire** : Tester sur vrais iPhones + Android

#### **Checklist Tests iOS**
- ⏳ iPhone 15 Pro (iOS 17+)
- ⏳ iPhone SE (petit écran)
- ⏳ iPad (si support tablette)
- ⏳ Dark mode + Light mode
- ⏳ Différentes tailles de police (Accessibilité)
- ⏳ Mode avion (offline)
- ⏳ Notifications (si implémenté)

#### **Checklist Tests Android**
- ⏳ Samsung Galaxy S23 (Android 13+)
- ⏳ Pixel 6 (Android pur)
- ⏳ Xiaomi/Huawei (ROM custom)
- ⏳ Petit écran (5") + Grand écran (6.7")
- ⏳ Mode sombre + clair
- ⏳ Permissions (stockage, notifications)

**Temps estimé** : **1 semaine** (tests + corrections bugs)

---

### 6. 📊 ANALYTICS & MONITORING (3-5 jours)

**Objectif** : Savoir comment l'app est utilisée + détecter les crashs

#### **Analytics** (Comportement utilisateur)
- ⏳ **Firebase Analytics** (Gratuit, recommandé)
  - Événements : `lesson_started`, `srs_review_completed`, `life_recovered`, etc.
  - Propriétés user : `days_since_install`, `total_lessons_completed`, `premium_user`
  - Funnels : Combien passent de "Install" → "First Lesson" → "Day 7" ?

- ⏳ **Alternative** : Mixpanel, Amplitude (plus avancés mais payants)

#### **Crash Reporting** (Bugs en production)
- ⏳ **Firebase Crashlytics** (Gratuit)
  - Détecte les crashs automatiquement
  - Stack traces détaillées
  - Priorité par nombre d'utilisateurs affectés

- ⏳ **Alternative** : Sentry (plus détaillé mais payant après 5K events/mois)

**Temps estimé** : **3-5 jours** (setup + intégration)

---

### 7. 🔔 NOTIFICATIONS PUSH (1 semaine)

**Pourquoi c'est critique** : +40% de rétention avec notifications intelligentes

#### **Use Cases**
- ⏳ "Ton streak de 7 jours est en danger ! Reviens réviser 🔥"
- ⏳ "5 nouvelles cartes SRS à réviser aujourd'hui 📚"
- ⏳ "Bravo ! Tu as débloqué le badge 'Maître Hiragana' 🏆"
- ⏳ "Défi quotidien : Traduis un proverbe japonais 🎯"

#### **Setup**
- ⏳ **Firebase Cloud Messaging (FCM)** pour iOS + Android
- ⏳ **Apple Push Notification service (APNs)** pour iOS
- ⏳ Permission request (iOS : popup, Android : auto-accordée)
- ⏳ Segmentation (ex: notifier seulement si inactif depuis 24h)

**Temps estimé** : **1 semaine** (setup + tests + stratégie)

---

### 8. 🎨 DESCRIPTION APP STORE (2-3 jours)

#### **Textes à rédiger**
- ❌ **Nom de l'app** (30 chars max)
  - Exemple : "Japonais - Apprendre Facile"

- ❌ **Sous-titre** (30 chars max - iOS uniquement)
  - Exemple : "Hiragana, Katakana, Kanji, SRS"

- ❌ **Description courte** (80 chars - Android uniquement)
  - Exemple : "Maîtrise le japonais avec des leçons fun, SRS intelligent et culture immersive"

- ❌ **Description complète** (4000 chars max)
  ```
  🇯🇵 APPRENDRE LE JAPONAIS - L'app #1 pour maîtriser la langue

  ✨ POURQUOI NOTRE APP ?

  💝 Récupération GRATUITE de vies
  Contrairement à Duolingo, révise 5 cartes SRS = +1 vie gratuite !
  Pas de paywall agressif. Apprends sans limites.

  🔥 Streak protégé automatiquement
  1 à 7 jours de grâce selon ton niveau. On ne punit pas les oublis.

  📚 Système SRS intelligent
  Algorithme SM-2 (comme Anki) pour mémoriser 10x plus vite

  🎯 30 leçons complètes
  - Hiragana (46 caractères)
  - Katakana (46 caractères)
  - Kanji (150+ caractères)
  - Vocabulaire (500+ mots)
  - Phrases culturelles

  🎮 Gamification motivante
  - Quêtes quotidiennes
  - Leaderboard hebdo/mensuel
  - 15 badges à débloquer
  - Audio natif professionnel

  📊 Stats détaillées
  Suis ta progression, identifie tes points faibles

  ❤️ SANS PUB, RESPECTUEUX
  On te récompense, on ne te punit pas.

  TÉLÉCHARGE MAINTENANT et rejoins 10 000+ apprenants ! 🚀
  ```

- ❌ **Mots-clés** (100 chars - iOS)
  - Exemple : "japonais,hiragana,katakana,kanji,apprendre,langue,SRS,flashcards,vocabulaire,JLPT"

**Temps estimé** : **2-3 jours** (rédaction + optimisation ASO)

---

## 🟢 OPTIONNEL (Améliore l'app mais pas urgent)

### 9. 💰 SYSTÈME DE PAIEMENT (1-2 semaines)

**Objectif** : Monétiser avec abonnement Premium (7.99€/mois)

#### **Features Premium à définir**
- ⏳ Vies illimitées
- ⏳ Mode hors ligne complet
- ⏳ Stats SRS avancées
- ⏳ Accès à toutes les leçons
- ⏳ Audio haute qualité
- ⏳ Support prioritaire
- ⏳ Badge "Premium" sur leaderboard

#### **Intégration**
- ⏳ **iOS** : StoreKit 2 (In-App Purchase)
  - Auto-renewable subscription
  - Family Sharing (optionnel)
  - Introductory offer (7 jours gratuits puis 7.99€/mois)

- ⏳ **Android** : Google Play Billing
  - Subscription
  - Free trial (7 jours)

- ⏳ **Backend** : Vérifier les reçus (éviter la fraude)
  - RevenueCat (recommandé, simplifie tout)
  - Ou API custom avec serveur

**Temps estimé** : **1-2 semaines** (setup + tests + validation Apple/Google)

---

### 10. 🌐 MODE HORS LIGNE (1 semaine)

**Actuellement** : L'app a besoin d'internet pour tout

**Objectif** : Permettre d'apprendre dans le métro/avion

#### **Implémentation**
- ⏳ Stocker les leçons localement (AsyncStorage)
- ⏳ Télécharger les audio MP3 (cache local)
- ⏳ Sync quand connexion revient
- ⏳ Indicator "Mode hors ligne" si pas de réseau

**Temps estimé** : **1 semaine**

---

### 11. 🔗 DEEP LINKING (3 jours)

**Use Cases** :
- ⏳ Partager une leçon : `apprendrejaponais://lesson/hiragana-1`
- ⏳ Inviter un ami : `apprendrejaponais://invite/CODE123`
- ⏳ Notification → Ouvre directement la bonne page

**Temps estimé** : **3 jours**

---

### 12. 🌍 LOCALISATION (1 semaine)

**Actuellement** : Interface en français uniquement

**Objectif** : Toucher un marché plus large

#### **Langues prioritaires**
- ⏳ **Anglais** (x10 le marché)
- ⏳ **Espagnol** (Amérique Latine)
- ⏳ **Japonais** (ironique mais utile pour les Japonais apprenant le français)

**Outil** : i18next (React Native) ou fichiers de traduction JSON

**Temps estimé** : **1 semaine** (traduction + intégration)

---

## 📋 CHECKLIST FINALE AVANT SOUMISSION

### **iOS App Store**
- [ ] Compte Apple Developer actif (99$/an)
- [ ] App en React Native ou Capacitor
- [ ] Build .ipa signé avec certificat de distribution
- [ ] Screenshots (3-10 par taille d'écran)
- [ ] Icône 1024x1024 px
- [ ] Privacy Policy + Terms (URLs publiques)
- [ ] Support URL (email ou page web)
- [ ] Description + mots-clés
- [ ] Âge minimum : 4+ (pas de contenu mature)
- [ ] Catégorie : Education
- [ ] Testé sur iPhone réel (pas seulement simulateur)
- [ ] Pas de crash critique
- [ ] Temps de chargement < 3s
- [ ] Taille de l'app < 100 MB (idéal)

**⏱️ Délai de review Apple : 1-3 jours** (après soumission)

---

### **Android Play Store**
- [ ] Compte Google Play Console (25$ one-time)
- [ ] Build .aab (Android App Bundle) signé
- [ ] Screenshots (2-8 images)
- [ ] Feature Graphic 1024x500 px
- [ ] Icône 512x512 px
- [ ] Privacy Policy + Terms (URLs publiques)
- [ ] Description courte + complète
- [ ] Catégorie : Education
- [ ] Classification de contenu (questionnaire Google)
- [ ] Testé sur Android réel
- [ ] Pas de permission abusive (seulement ce qui est nécessaire)
- [ ] Taille de l'app < 100 MB (recommandé)

**⏱️ Délai de review Google : Quelques heures à 1 jour** (plus rapide qu'Apple)

---

## 🎯 PLAN D'ACTION RECOMMANDÉ

### **Phase 1 : CRITIQUE (Semaines 1-4)**
1. ✅ **Semaine 1** : Conversion React Native + Setup comptes développeurs
2. ✅ **Semaine 2** : Migration code + Tests sur devices
3. ✅ **Semaine 3** : Design assets (icône, screenshots) + Documents légaux
4. ✅ **Semaine 4** : Tests finaux + Analytics/Crashlytics + First build

### **Phase 2 : IMPORTANT (Semaines 5-6)**
5. ✅ **Semaine 5** : Notifications Push + Optimisations performances
6. ✅ **Semaine 6** : Rédaction descriptions stores + ASO

### **Phase 3 : SOUMISSION (Semaine 7)**
7. ✅ **Semaine 7** : Soumission iOS + Android + Attente validation

### **Phase 4 : POST-LANCEMENT (Semaines 8+)**
8. ✅ **Semaine 8+** : Paiement Premium + Mode hors ligne + Localisation

---

## 💡 CONSEILS POUR MAXIMISER CHANCES D'APPROBATION

### **iOS (Apple est strict)**
- ✅ **Testez sur vrai iPhone** (simulateur ne suffit pas)
- ✅ **Pas de bugs critiques** (crash = rejet immédiat)
- ✅ **Privacy Policy claire** avec toutes les données collectées
- ✅ **Pas de liens externes** pour paiement (seulement In-App Purchase)
- ✅ **Metadata précis** (description doit correspondre à l'app)
- ✅ **Age rating correct** (4+ pour éducation)
- ❌ **Éviter** : WebView uniquement (Apple n'aime pas)

### **Android (Google plus souple)**
- ✅ **Testez sur plusieurs devices** (Samsung, Pixel, Xiaomi)
- ✅ **Permissions justifiées** (n'en demandez pas trop)
- ✅ **Privacy Policy obligatoire** si vous collectez des données
- ✅ **Classification de contenu** (questionnaire honnête)
- ✅ **Taille optimale** : < 100 MB (sinon download lent)
- ❌ **Éviter** : Spam de keywords, contenu copié

---

## 🚀 PRÊT À LANCER ?

### **Checklist Minimaliste (MVP Stores)**

Si tu veux lancer **VITE** (4 semaines au lieu de 8) :

**Obligatoire** :
- [x] Conversion React Native OU Capacitor
- [x] Assets (icône + 3 screenshots minimum)
- [x] Privacy Policy + Terms + Support page
- [x] Comptes développeurs (99$ iOS + 25$ Android)
- [x] Tests sur 1 iPhone + 1 Android réel

**Optionnel pour V1** (ajouter après) :
- [ ] Analytics (peut attendre V1.1)
- [ ] Notifications Push (V1.2)
- [ ] Paiement Premium (V1.3)
- [ ] Mode hors ligne (V1.4)

**Timeline accélérée** : **4-5 semaines** pour un MVP fonctionnel sur les stores

---

## 📞 BESOIN D'AIDE ?

**React Native** :
- Docs officielles : https://reactnative.dev/
- Expo (plus facile) : https://expo.dev/

**Capacitor** :
- Docs : https://capacitorjs.com/

**Comptes Stores** :
- Apple Developer : https://developer.apple.com/
- Google Play Console : https://play.google.com/console/

**Assets** :
- App Icon Generator : https://www.appicon.co/
- Screenshot Templates : https://www.figma.com/

**Légal** :
- Privacy Policy Generator : https://www.termsfeed.com/
- Terms Generator : https://getterms.io/

---

**Dernière mise à jour** : 12 Décembre 2025
**Version de l'app** : 5.8.0
**Status** : ⏳ EN PRÉPARATION POUR STORES
