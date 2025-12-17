# JaponaisApp - Stratégie Premium 9,99€/mois

## Vision : Devenir LA référence du japonais mobile

---

## 1. Modèle Freemium

### Version Gratuite (Acquisition)

```
✅ Inclus Gratuit:
├── Hiragana (46 caractères) - 100%
├── Katakana (46 caractères) - 100%
├── Kanji N5 - 10 premiers seulement
├── Vocabulaire basique - 100 mots
├── Exercices - 20/jour max
├── Vies - 3/jour
├── Révisions SRS - 10/jour
├── Audio TTS standard
└── Publicités (bannières non-intrusives)

❌ Non inclus:
├── Kanji N5 complet (90 restants)
├── Niveaux N4, N3, N2, N1
├── Vies illimitées
├── Exercices illimités
├── Mode hors-ligne
├── Audio natif HD
├── Streak protection
├── Grammaire avancée
├── Tests JLPT
├── IA Tutor
└── Sans publicité
```

### Version Premium 9,99€/mois

```
🌟 TOUT débloqué:
├── 2136 kanji (N5 → N1)
├── 10000+ mots de vocabulaire
├── Grammaire structurée
├── Vies illimitées
├── Exercices illimités
├── Révisions SRS illimitées
├── Mode hors-ligne
├── Audio natif professionnel
├── Streak protection totale
├── Tests JLPT officiels
├── Pitch accent training
├── IA Tutor personnel
├── Sans publicité
└── Support prioritaire
```

---

## 2. Features Différenciantes (vs Concurrence)

### Ce que PERSONNE ne fait bien :

| Feature | Status Concurrence | Notre Avantage |
|---------|-------------------|----------------|
| **Pitch Accent** | Ignoré partout | Entraînement dédié |
| **IA Tutor** | Aucun | Claude/GPT intégré |
| **JLPT-focused** | Généraliste | Curriculum aligné JLPT |
| **Kanji Mnémoniques** | WaniKani payant | Gratuit en partie |
| **Handwriting** | Rare | Reconnaissance écriture |
| **Context Culturel** | Superficiel | Immersion profonde |

---

## 3. Roadmap Développement

### Phase 1 : MVP Premium (1-2 mois)
**Objectif : Lancer le paywall**

- [ ] Système d'abonnement (RevenueCat/Stripe)
- [ ] Limites quotidiennes (exercices, SRS, vies)
- [ ] Bannières pub (AdMob)
- [ ] Paywall UI élégant
- [ ] Restore purchases
- [ ] Kanji N5 complet (100 kanji)

### Phase 2 : Contenu (2-3 mois)
**Objectif : Plus de valeur premium**

- [ ] Kanji N4 (300 kanji)
- [ ] Kanji N3 (650 kanji)
- [ ] Vocabulaire N5 complet (800 mots)
- [ ] Vocabulaire N4 (1500 mots)
- [ ] Grammaire N5 structurée (20 points)
- [ ] Tests JLPT N5 (5 examens blancs)
- [ ] Audio natif (recordings pro)

### Phase 3 : Différenciation (3-4 mois)
**Objectif : Features uniques**

- [ ] IA Tutor (intégration Claude API)
- [ ] Pitch Accent training
- [ ] Mode hors-ligne
- [ ] Handwriting recognition
- [ ] Conversations IA
- [ ] Leaderboards

### Phase 4 : Excellence (4-6 mois)
**Objectif : Devenir #1**

- [ ] Kanji N2, N1 (2136 total)
- [ ] Vocabulaire complet (10000+ mots)
- [ ] Grammaire N4→N1
- [ ] Tests JLPT tous niveaux
- [ ] Certificats de progression
- [ ] Communauté in-app

---

## 4. Détail des Features Clés

### 4.1 IA Tutor (Différenciateur Principal)

**Concept :** Un tuteur IA disponible 24/7 pour expliquer n'importe quoi.

```
Utilisateur: "Pourquoi 人 se lit 'hito' seul mais 'nin' dans 三人?"

IA Tutor: "Excellente question !
• Seul (訓読み kun'yomi) : ひと (hito) - lecture japonaise native
• En composé (音読み on'yomi) : にん (nin) - lecture sino-japonaise

三人 = さんにん car c'est un composé nombre + 人
一人 = ひとり (exception historique)
二人 = ふたり (exception historique)

💡 Astuce: À partir de 三人, c'est toujours ~にん"
```

**Implémentation :**
- Claude API (Anthropic) ou GPT-4
- Contexte de la leçon actuelle
- Limité en gratuit (3 questions/jour)
- Illimité en premium

### 4.2 Pitch Accent Training

**Concept :** Le japonais a des accents tonaux que 99% des apps ignorent.

```
箸 (hashi) = baguettes [accent sur HA]
橋 (hashi) = pont [accent sur SHI]
端 (hashi) = bord [pas d'accent]
```

**Implémentation :**
- Visualisation de l'accent (courbe)
- Audio comparatif
- Exercices de discrimination
- Recording & comparaison

### 4.3 Mode JLPT

**Concept :** Préparation ciblée aux examens officiels.

```
JLPT N5 → N1 comprend:
├── Kanji requis (liste officielle)
├── Vocabulaire requis
├── Points de grammaire
├── Exercices type examen
├── Examens blancs chronométrés
├── Scoring et analyse
└── Prédiction de réussite
```

### 4.4 Handwriting Recognition

**Concept :** Apprendre à écrire, pas juste reconnaître.

```
- Tracer le kanji sur l'écran
- Vérification ordre des traits
- Score de précision
- Animations de démonstration
```

**Tech :** ML Kit (Google) ou Core ML (Apple)

---

## 5. Pricing Strategy

### Options d'Abonnement (Prix d'Attaque)

| Plan | Prix | Équivalent | Économie |
|------|------|------------|----------|
| Mensuel | **7,99€** | 7,99€/mois | - |
| Annuel | **39,99€** | 3,33€/mois | **58%** |
| Lifetime | **99,99€** | - | Accès permanent |

### Pourquoi ces prix ?
1. **7,99€ < 9€ WaniKani < 12,99€ Duolingo < 14,99€ LingoDeer**
2. **39,99€/an** = Argument marketing massue "Moins de 3,50€/mois"
3. **99,99€** = Seuil psychologique sous les 100€

### Conversions Cibles

| Métrique | Cible |
|----------|-------|
| Free → Premium | 3-5% |
| Trial → Paid | 40-60% |
| Churn mensuel | < 8% |
| LTV (Lifetime Value) | > 60€ |

### Trial Strategy

```
7 jours gratuits Premium complet
→ Carte requise à l'inscription
→ Rappel J5 avant facturation
→ Onboarding orienté valeur
```

---

## 6. Comparatif Final

| Feature | Duolingo | WaniKani | LingoDeer | **JaponaisApp** |
|---------|----------|----------|-----------|-----------------|
| Prix/mois | 12,99€ | 9€ | 14,99€ | **9,99€** |
| Kanji | 100 | 2000 | 250 | **2136** (terme) |
| IA Tutor | Non | Non | Non | **Oui** |
| Pitch Accent | Non | Non | Non | **Oui** |
| JLPT-focused | Non | Non | Partiel | **100%** |
| Handwriting | Non | Non | Non | **Oui** |
| Hors-ligne | Payant | Non | Payant | **Oui** |

---

## 7. Stack Technique Recommandée

### Paiements
- **RevenueCat** : Gestion abonnements cross-platform
- **Stripe** : Backend paiements
- Alternative : in-app purchases natifs

### IA
- **Claude API** (Anthropic) : Meilleur pour explications
- **OpenAI GPT-4** : Alternative
- Coût estimé : ~0,01€/question

### Audio Natif
- **ElevenLabs** : Voix clonées ultra-réalistes
- **Amazon Polly Neural** : Alternative moins chère
- Coût : ~4€/million caractères

### Offline
- **SQLite** : Base locale
- **expo-file-system** : Stockage audio

### Handwriting
- **ML Kit** (Google) : Gratuit
- **Apple Core ML** : iOS natif

---

## 8. Métriques de Succès

### Lancement (Mois 1-3)
- 10,000 téléchargements
- 500 abonnés premium (5%)
- 4.5+ étoiles stores

### Croissance (Mois 4-12)
- 100,000 téléchargements
- 5,000 abonnés premium
- MRR : 50,000€

### Maturité (Année 2+)
- 500,000+ utilisateurs
- 25,000+ abonnés
- MRR : 250,000€
- Top 10 apps langue japonaise

---

## 9. Actions Immédiates

### Cette Semaine
1. Implémenter système de limites (gratuit vs premium)
2. Créer paywall UI
3. Intégrer RevenueCat

### Ce Mois
4. Compléter Kanji N5 (100 kanji)
5. Ajouter bannières pub (AdMob)
6. Préparer assets stores (icône, screenshots)
7. Soumettre aux stores

### Mois Suivant
8. Analyser métriques conversion
9. Itérer sur paywall
10. Commencer Kanji N4

---

## Conclusion

**Positionnement unique :**
"L'app JLPT la plus complète avec IA Tutor personnel"

**Différenciateurs clés :**
1. IA Tutor (personne ne l'a)
2. Pitch Accent (ignoré par tous)
3. 100% JLPT-focused
4. Prix compétitif (9,99€)

**Premier objectif :**
Lancer MVP Premium avec paywall fonctionnel et 100 kanji N5.
