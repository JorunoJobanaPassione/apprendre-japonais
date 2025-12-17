/**
 * Paywall Modal - Interface d'achat Premium
 * Affiche les avantages premium et les options d'abonnement
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  getOfferings,
  purchasePackage,
  restorePurchases,
  FREE_LIMITS,
  PREMIUM_LIMITS,
  DISPLAY_PRICES,
} from '../services/premiumService';
import { COLORS, FONTS, SIZES } from '../styles/theme';

// Liste des avantages Premium
const PREMIUM_BENEFITS = [
  {
    emoji: '\u{1F4DA}',
    title: '2136 Kanji',
    description: 'Tous les kanji JLPT N5 à N1',
    free: `${FREE_LIMITS.KANJI_UNLOCKED} kanji`,
  },
  {
    emoji: '\u{267E}\u{FE0F}',
    title: 'Exercices illimités',
    description: 'Pratique sans restriction',
    free: `${FREE_LIMITS.EXERCISES_PER_DAY}/jour`,
  },
  {
    emoji: '\u{1F9E0}',
    title: 'Révisions SRS illimitées',
    description: 'Mémorisation optimale',
    free: `${FREE_LIMITS.SRS_REVIEWS_PER_DAY}/jour`,
  },
  {
    emoji: '\u{2764}\u{FE0F}',
    title: '7 vies',
    description: 'Plus de marge pour apprendre',
    free: `${FREE_LIMITS.LIVES_MAX} vies`,
  },
  {
    emoji: '\u{1F916}',
    title: 'IA Tutor',
    description: 'Questions illimitées à l\'IA',
    free: `${FREE_LIMITS.AI_QUESTIONS_PER_DAY}/jour`,
  },
  {
    emoji: '\u{1F3A7}',
    title: 'Audio natif HD',
    description: 'Prononciation professionnelle',
    free: 'TTS basique',
  },
  {
    emoji: '\u{1F4F6}',
    title: 'Mode hors-ligne',
    description: 'Apprenez partout',
    free: 'Non',
  },
  {
    emoji: '\u{1F6AB}',
    title: 'Sans publicité',
    description: 'Expérience immersive',
    free: 'Avec pubs',
  },
];

export default function PaywallModal({ visible, onClose, onPurchaseSuccess }) {
  const [offerings, setOfferings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('yearly');

  useEffect(() => {
    if (visible) {
      loadOfferings();
    }
  }, [visible]);

  const loadOfferings = async () => {
    setLoading(true);
    const offers = await getOfferings();
    setOfferings(offers);
    setLoading(false);
  };

  const handlePurchase = async (packageToPurchase) => {
    if (!packageToPurchase) {
      Alert.alert('Erreur', 'Offre non disponible');
      return;
    }

    setPurchasing(true);
    const result = await purchasePackage(packageToPurchase);
    setPurchasing(false);

    if (result.success) {
      Alert.alert(
        'Bienvenue Premium !',
        'Merci pour votre abonnement. Profitez de toutes les fonctionnalités !',
        [{ text: 'Super !', onPress: () => {
          onPurchaseSuccess?.();
          onClose();
        }}]
      );
    } else if (result.cancelled) {
      // Utilisateur a annulé, ne rien faire
    } else {
      Alert.alert('Erreur', result.error || 'Une erreur est survenue');
    }
  };

  const handleRestore = async () => {
    setPurchasing(true);
    const result = await restorePurchases();
    setPurchasing(false);

    if (result.success && result.isPremium) {
      Alert.alert(
        'Achats restaurés',
        'Votre abonnement Premium a été restauré !',
        [{ text: 'Super !', onPress: () => {
          onPurchaseSuccess?.();
          onClose();
        }}]
      );
    } else if (result.success) {
      Alert.alert('Aucun achat', 'Aucun abonnement actif trouvé.');
    } else {
      Alert.alert('Erreur', result.error || 'Impossible de restaurer les achats');
    }
  };

  const getPlanDetails = () => {
    // Utiliser les prix de RevenueCat si disponibles, sinon fallback
    const plans = [
      {
        id: 'monthly',
        name: 'Mensuel',
        price: offerings?.monthly?.product?.priceString || DISPLAY_PRICES.MONTHLY,
        period: DISPLAY_PRICES.MONTHLY_PERIOD,
        package: offerings?.monthly,
        savings: null,
      },
      {
        id: 'yearly',
        name: 'Annuel',
        price: offerings?.yearly?.product?.priceString || DISPLAY_PRICES.YEARLY,
        period: DISPLAY_PRICES.YEARLY_PERIOD,
        package: offerings?.yearly,
        savings: `${DISPLAY_PRICES.YEARLY_SAVINGS} d'économie`,
        subPrice: DISPLAY_PRICES.YEARLY_MONTHLY_EQUIVALENT,
        popular: true,
      },
      {
        id: 'lifetime',
        name: 'À vie',
        price: offerings?.lifetime?.product?.priceString || DISPLAY_PRICES.LIFETIME,
        period: DISPLAY_PRICES.LIFETIME_PERIOD,
        package: offerings?.lifetime,
        savings: 'Accès permanent',
      },
    ];
    return plans;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Hero Section */}
          <View style={styles.hero}>
            <Text style={styles.heroEmoji}>{'\u{1F451}'}</Text>
            <Text style={styles.heroTitle}>JaponaisApp Premium</Text>
            <Text style={styles.heroSubtitle}>
              Débloquez tout le potentiel de votre apprentissage
            </Text>
          </View>

          {/* Benefits */}
          <View style={styles.benefitsSection}>
            <Text style={styles.sectionTitle}>Avantages Premium</Text>
            {PREMIUM_BENEFITS.map((benefit, index) => (
              <View key={index} style={styles.benefitRow}>
                <View style={styles.benefitIcon}>
                  <Text style={styles.benefitEmoji}>{benefit.emoji}</Text>
                </View>
                <View style={styles.benefitContent}>
                  <Text style={styles.benefitTitle}>{benefit.title}</Text>
                  <Text style={styles.benefitDesc}>{benefit.description}</Text>
                </View>
                <View style={styles.benefitComparison}>
                  <Text style={styles.freeLabel}>Gratuit</Text>
                  <Text style={styles.freeValue}>{benefit.free}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Pricing Plans */}
          <View style={styles.plansSection}>
            <Text style={styles.sectionTitle}>Choisissez votre plan</Text>

            {loading ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
              <View style={styles.plansContainer}>
                {getPlanDetails().map((plan) => (
                  <TouchableOpacity
                    key={plan.id}
                    style={[
                      styles.planCard,
                      selectedPlan === plan.id && styles.planCardSelected,
                      plan.popular && styles.planCardPopular,
                    ]}
                    onPress={() => setSelectedPlan(plan.id)}
                  >
                    {plan.popular && (
                      <View style={styles.popularBadge}>
                        <Text style={styles.popularText}>Populaire</Text>
                      </View>
                    )}
                    <Text style={styles.planName}>{plan.name}</Text>
                    <Text style={styles.planPrice}>{plan.price}</Text>
                    <Text style={styles.planPeriod}>{plan.period}</Text>
                    {plan.subPrice && (
                      <Text style={styles.planSubPrice}>{plan.subPrice}</Text>
                    )}
                    {plan.savings && (
                      <Text style={styles.planSavings}>{plan.savings}</Text>
                    )}
                    {selectedPlan === plan.id && (
                      <View style={styles.selectedIndicator}>
                        <Text style={styles.selectedCheck}>{'\u{2713}'}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Purchase Button */}
          <TouchableOpacity
            style={[styles.purchaseButton, purchasing && styles.purchaseButtonDisabled]}
            onPress={() => {
              const plan = getPlanDetails().find(p => p.id === selectedPlan);
              handlePurchase(plan?.package);
            }}
            disabled={purchasing || loading}
          >
            {purchasing ? (
              <ActivityIndicator color={COLORS.background} />
            ) : (
              <Text style={styles.purchaseButtonText}>
                Devenir Premium
              </Text>
            )}
          </TouchableOpacity>

          {/* Restore & Terms */}
          <View style={styles.footer}>
            <TouchableOpacity onPress={handleRestore} disabled={purchasing}>
              <Text style={styles.restoreText}>Restaurer mes achats</Text>
            </TouchableOpacity>

            <Text style={styles.termsText}>
              L'abonnement se renouvelle automatiquement sauf annulation 24h avant la fin de la période.
              En continuant, vous acceptez nos Conditions d'utilisation.
            </Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: SIZES.padding,
    paddingTop: 50,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 20,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SIZES.screenPadding,
    paddingBottom: 40,
  },
  hero: {
    alignItems: 'center',
    marginBottom: SIZES.margin * 2,
  },
  heroEmoji: {
    fontSize: 64,
    marginBottom: SIZES.margin,
  },
  heroTitle: {
    fontSize: FONTS.xxLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.marginSmall,
  },
  heroSubtitle: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  benefitsSection: {
    marginBottom: SIZES.margin * 2,
  },
  sectionTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.margin,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.marginSmall,
  },
  benefitIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.margin,
  },
  benefitEmoji: {
    fontSize: 20,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: COLORS.text,
  },
  benefitDesc: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
  },
  benefitComparison: {
    alignItems: 'flex-end',
  },
  freeLabel: {
    fontSize: FONTS.tiny,
    color: COLORS.textMuted,
  },
  freeValue: {
    fontSize: FONTS.small,
    color: COLORS.error,
    fontWeight: '500',
  },
  plansSection: {
    marginBottom: SIZES.margin * 2,
  },
  plansContainer: {
    flexDirection: 'row',
    gap: SIZES.marginSmall,
  },
  planCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  planCardSelected: {
    borderColor: COLORS.primary,
  },
  planCardPopular: {
    backgroundColor: COLORS.primary + '10',
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  popularText: {
    fontSize: FONTS.tiny,
    color: COLORS.background,
    fontWeight: 'bold',
  },
  planName: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: SIZES.marginSmall,
  },
  planPrice: {
    fontSize: FONTS.xLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: SIZES.marginSmall,
  },
  planPeriod: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
  },
  planSubPrice: {
    fontSize: FONTS.tiny,
    color: COLORS.primary,
    fontWeight: '500',
    marginTop: 2,
  },
  planSavings: {
    fontSize: FONTS.tiny,
    color: COLORS.success,
    fontWeight: '600',
    marginTop: SIZES.marginSmall,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCheck: {
    fontSize: 14,
    color: COLORS.background,
  },
  purchaseButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    alignItems: 'center',
    marginBottom: SIZES.margin,
  },
  purchaseButtonDisabled: {
    opacity: 0.7,
  },
  purchaseButtonText: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  footer: {
    alignItems: 'center',
  },
  restoreText: {
    fontSize: FONTS.medium,
    color: COLORS.primary,
    marginBottom: SIZES.margin,
  },
  termsText: {
    fontSize: FONTS.tiny,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 16,
  },
});
