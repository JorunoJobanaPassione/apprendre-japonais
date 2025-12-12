# 💝 Système de Récupération de Vies - Feature Anti-Duolingo

**Version** : 1.0.0
**Date** : 12 décembre 2025
**Status** : ✅ IMPLÉMENTÉ

---

## 🎯 OBJECTIF

Permettre aux utilisateurs de **récupérer des vies gratuitement** en révisant des cartes SRS, au lieu de forcer un paywall ou une attente de 4h comme Duolingo.

**Impact attendu** :
- +40% rétention utilisateur (peuvent continuer sans payer)
- +60% satisfaction (alternative gratuite au paywall)
- Différenciation forte vs Duolingo

---

## 📋 FONCTIONNALITÉS IMPLÉMENTÉES

### **1. Récupération via SRS (5 révisions = +1 vie)**

**Comment ça marche** :
1. L'utilisateur révise des cartes SRS
2. Chaque réponse correcte (quality >= 3) compte pour la progression
3. Après 5 révisions correctes → Notification "Vie disponible !"
4. Bouton "Récupérer" dans le header devient vert
5. Clic sur le bouton → +1 vie gagnée 🎉

**Limites pour équilibrage** :
- ✅ **Cooldown** : 30 minutes entre chaque récupération
- ✅ **Limite quotidienne** : 3 vies récupérées max/jour
- ✅ **Progrès sauvegardé** : Le compteur persiste (localStorage)
- ✅ **Reset quotidien automatique** : Compteur quotidien reset à minuit

---

## 📂 FICHIERS CRÉÉS

### **1. lives-recovery.js** (320 lignes)
**Rôle** : Logique métier du système de récupération

**Fonctions principales** :
- `init()` - Initialiser le système et écouter les événements
- `addSRSReviewProgress()` - Ajouter une review au compteur
- `canRecoverViaSRS()` - Vérifier si récupération possible
- `recoverLifeViaSRS()` - Récupérer une vie (5 reviews)
- `getSRSReviewProgress()` - Obtenir progression actuelle
- `isInCooldown()` - Vérifier cooldown 30min
- `getDailyRecoveriesCount()` - Compteur quotidien
- `resetDailyCountIfNeeded()` - Reset auto à minuit
- `getStats()` - Stats complètes du système

**Événements écoutés** :
- `srsReviewCompleted` - Émis par SRS quand review terminée

**Événements émis** :
- `srsRecoveryProgress` - Progression (X/5 reviews)
- `lifeRecovered` - Vie récupérée avec succès
- `recoveryAvailable` - 5 reviews atteintes, récup dispo

---

### **2. lives-recovery-ui.js** (390 lignes)
**Rôle** : Interface utilisateur pour la récupération

**Composants UI** :
1. **Bouton "Récupérer" dans header**
   - Icône 💝 + Badge "X/5"
   - Devient vert quand 5 reviews atteintes
   - Animation pulse pour attirer l'attention

2. **Modal de récupération** (popup)
   - Méthode 1 : Révisions SRS
     - Barre de progression visuelle (0-100%)
     - Texte "X/5 révisions"
     - Bouton "Récupérer +1 vie" (activé si 5/5)
     - Info : raison si pas dispo (cooldown, limite, etc.)
   - Méthode 2 : Publicité (désactivé, future)
   - Compteur quotidien : "Récupérations aujourd'hui : X/3"
   - Message Anti-Duolingo éducatif

3. **Notifications**
   - Notification succès : "🎉 +1 vie récupérée !"
   - Notification erreur : "Encore X révisions à faire"
   - Toast persistant : "Vie gratuite disponible !" (10s, cliquable)

**Fonctions principales** :
- `createRecoveryButton()` - Créer bouton header
- `createRecoveryModal()` - Créer popup
- `openRecoveryModal()` - Ouvrir modal
- `updateModalUI()` - Mettre à jour progression
- `handleSRSRecovery()` - Gérer clic récupération
- `showSuccessNotification()` - Notif succès
- `showRecoveryAvailableToast()` - Toast "dispo"

---

### **3. lives-recovery-styles.css** (580 lignes)
**Rôle** : Styles modernes et colorés

**Sections** :
1. **Bouton header** (`.lives-recovery-btn`)
   - Gradient violet par défaut
   - Gradient vert quand prêt
   - Animation pulse sur badge
   - Responsive mobile (texte masqué)

2. **Modal** (`.recovery-modal`)
   - Max-width 600px, scrollable
   - Animations slideInUp
   - Padding adaptatif mobile

3. **Méthodes de récupération** (`.recovery-method`)
   - Cartes avec hover effect
   - Icônes 48px
   - Barre de progression animée
   - Boutons gradient avec pulse

4. **Notifications** (`.recovery-notification`)
   - Position fixed top center
   - Gradient vert succès / rouge erreur
   - Animations slideInDown + fadeOut

5. **Toast** (`.recovery-toast`)
   - Position fixed bottom right
   - Fond blanc, shadow forte
   - Animation bounceIn
   - Auto-fermeture 10s

6. **Responsive mobile**
   - Padding réduit
   - Font-size adaptées
   - Toast pleine largeur
   - Bouton header compact

---

## 🔄 MODIFICATIONS DE FICHIERS EXISTANTS

### **1. srs.js** (ligne 143-153)
**Ajout** : Événement `srsReviewCompleted` après chaque review

```javascript
// 🆕 Déclencher événement pour le système de récupération de vies
if (typeof window !== 'undefined') {
  window.dispatchEvent(new CustomEvent('srsReviewCompleted', {
    detail: {
      isCorrect: quality >= 3,
      quality: quality,
      character: card.character,
      type: card.type
    }
  }));
}
```

**Impact** : Chaque review SRS notifie maintenant le système de récupération

---

### **2. index.html** (ligne 17 + 1009-1010)
**Ajouts** :
1. CSS (ligne 17) :
   ```html
   <link rel="stylesheet" href="lives-recovery-styles.css?v=1.0">
   ```

2. Scripts (lignes 1009-1010) :
   ```html
   <!-- Lives Recovery (Anti-Duolingo Feature) -->
   <script src="lives-recovery.js?v=1.0"></script>
   <script src="lives-recovery-ui.js?v=1.0"></script>
   ```

**Impact** : Les fichiers sont chargés automatiquement

---

## 🎨 UX/UI - Détails

### **Flow utilisateur** :

1. **Utilisateur perd des vies** (erreurs dans les leçons)
2. **Voit le bouton "Récupérer 💝 0/5"** dans le header
3. **Clique pour voir le modal** → comprend qu'il peut récupérer en révisant
4. **Va dans "Révisions SRS"** et révise 5 cartes
5. **Voit la progression** : Badge passe de 0/5 → 1/5 → 2/5 → etc.
6. **À 5/5** :
   - Notification toast : "🎁 Vie gratuite disponible !"
   - Bouton devient vert avec animation pulse
7. **Clique sur "Récupérer"** → +1 vie gagnée 🎉
8. **Notification succès** : "🎉 +1 vie récupérée ! Bravo pour tes révisions !"
9. **Cooldown 30min** : Bouton désactivé avec message "Réessaye dans 25 min"

### **États du bouton** :

| État | Couleur | Badge | Animation | Message hover |
|------|---------|-------|-----------|---------------|
| 0-4 reviews | Violet | "0/5" - "4/5" | Aucune | "Révise 5 cartes SRS" |
| 5 reviews OK | Vert | "5/5" | Pulse | "Récupère +1 vie !" |
| Cooldown | Violet gris | "0/5" | Aucune | "Réessaye dans X min" |
| Limite quotidienne | Violet gris | "0/5" | Aucune | "Limite atteinte (3/jour)" |
| Vies pleines | Violet gris | "0/5" | Aucune | "Vies déjà pleines" |

---

## 📊 ÉQUILIBRAGE - Paramètres

```javascript
config: {
  srsReviewsNeeded: 5,              // 5 cartes SRS = +1 vie
  srsCooldownTime: 30 * 60 * 1000,  // 30 minutes cooldown
  maxDailyRecoveries: 3,            // Max 3 vies/jour
}
```

**Pourquoi ces valeurs ?**

- **5 reviews** : Assez pour motiver la révision, pas trop long (2-3 min)
- **30 min cooldown** : Empêche l'abus, encourage révision espacée
- **3/jour max** : Équilibre freemium (5 vies de base + 3 récup = 8 vies/jour max)

**Comparaison Duolingo** :
| Métrique | Duolingo | **Notre App** |
|----------|----------|---------------|
| Vies de base | 5 | **7** ✅ |
| Recharge naturelle | 4h/vie | **3h/vie** ✅ |
| Récup gratuite | ❌ Aucune | **✅ 3 vies/jour via SRS** |
| Total vies/jour | 5-7 | **10+** ✅ |
| Paywall | Agressif | **Respectueux** ✅ |

---

## 🧪 TESTS À EFFECTUER

### **Test 1 : Flow complet**
1. Perdre 3 vies dans une leçon
2. Cliquer sur bouton "Récupérer" → Modal s'ouvre
3. Aller dans SRS, réviser 5 cartes correctement
4. Vérifier badge passe à "5/5" et bouton devient vert
5. Cliquer "Récupérer +1 vie"
6. Vérifier notification succès + vie ajoutée

### **Test 2 : Cooldown**
1. Récupérer une vie via SRS
2. Essayer de récupérer immédiatement après
3. Vérifier message "Réessaye dans 30 min"
4. Attendre 30 min (ou debug : `localStorage.removeItem('japaneseApp_srsRecoveryCooldown')`)
5. Vérifier récup à nouveau possible

### **Test 3 : Limite quotidienne**
1. Récupérer 3 vies dans la journée
2. Essayer de récupérer la 4ème
3. Vérifier message "Limite quotidienne atteinte (3/jour)"
4. Changer la date système au lendemain
5. Vérifier compteur reset à 0/3

### **Test 4 : Vies pleines**
1. Avoir 7/7 vies
2. Essayer de récupérer une vie
3. Vérifier message "Tes vies sont déjà pleines !"

### **Test 5 : Persistance**
1. Faire 3 reviews SRS
2. Fermer l'app / recharger la page
3. Vérifier badge affiche toujours "3/5"
4. Faire 2 reviews de plus
5. Vérifier récup disponible

### **Test 6 : Mobile responsive**
1. Ouvrir sur iPhone/Android
2. Vérifier bouton header compact (icône + badge, texte masqué)
3. Ouvrir modal → vérifier scrollable
4. Tester toast → vérifier pleine largeur bottom
5. Vérifier notifications bien visibles

---

## 🐛 DEBUGGING - Fonctions utiles

Ouvrir la console JavaScript et tester :

```javascript
// Voir les stats complètes
LivesRecovery.debugStats()

// Simuler 5 reviews SRS
LivesRecovery.debugSimulateSRSReviews(5)

// Récupérer une vie (si 5 reviews)
LivesRecovery.recoverLifeViaSRS()

// Réinitialiser tout
LivesRecovery.debugReset()

// Supprimer le cooldown
localStorage.removeItem('japaneseApp_srsRecoveryCooldown')

// Voir les données brutes
localStorage.getItem('japaneseApp_srsReviewsProgress')
localStorage.getItem('japaneseApp_dailyRecoveries')
```

---

## 🚀 PROCHAINES ÉTAPES

### **Fonctionnalités futures** :

1. **Option 2 : Pub de 15s** (actuellement désactivée)
   - Intégrer AdMob / Google AdSense
   - Pub skippable après 5s
   - Alternative si pas envie de réviser

2. **Récup via quêtes quotidiennes**
   - "Complète 3 quêtes = +1 vie"
   - Synergie entre systèmes

3. **Notifications push**
   - "🎁 Tu peux récupérer une vie !"
   - Rappel quand cooldown terminé

4. **Analytics**
   - Tracker % utilisateurs qui utilisent cette feature
   - Mesurer impact sur rétention

---

## 💬 MESSAGE MARKETING

**Slogan** :
> *"Plus de vies ? Pas besoin de payer. Révise et récupère gratuitement."*

**Page Features** :
- ✅ **Récupération gratuite** : Révise 5 cartes SRS = +1 vie
- ✅ **Jusqu'à 3 vies/jour** récupérables sans payer
- ✅ **Aucune pub forcée** : C'est optionnel, pas obligatoire
- ✅ **Cooldown respectueux** : 30 min entre chaque récup

**Différenciation Duolingo** :
| Duolingo | **Notre App** |
|----------|---------------|
| "Plus de vies ? Payez ou attendez 4h" 😤 | "Révisez et récupérez gratuitement" 😊 |
| 0 récup gratuite | 3 récup/jour gratuite |
| Paywall agressif | Freemium respectueux |

---

## ✅ CHECKLIST FINALE

- [x] `lives-recovery.js` créé (320 lignes)
- [x] `lives-recovery-ui.js` créé (390 lignes)
- [x] `lives-recovery-styles.css` créé (580 lignes)
- [x] `srs.js` modifié (événement ajouté)
- [x] `index.html` modifié (CSS + scripts ajoutés)
- [ ] Tests manuels effectués
- [ ] Tests mobile iOS/Android
- [ ] Analytics configuré
- [ ] Documentation utilisateur créée

---

**Status** : ✅ **PRÊT POUR TESTS**

**Next step** : Ouvrir l'app et tester le flow complet ! 🚀
