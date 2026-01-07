/**
 * Streak Freeze Components - UI pour les streak freezes
 *
 * Affiche:
 * - Nombre de freezes disponibles
 * - Bouton d'achat
 * - Shop modal avec options d'achat
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../styles/theme';
import {
  getFreezeStats,
  purchaseFreezeWithXP,
  FREEZE_CONFIG,
  FREEZE_IAP,
} from '../services/streakFreezeService';

/**
 * Badge compact montrant les freezes disponibles
 */
export function FreezeBadge({ style }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    loadCount();
  }, []);

  const loadCount = async () => {
    const stats = await getFreezeStats();
    setCount(stats.available);
  };

  return (
    <View style={[styles.badge, style]}>
      <Text style={styles.badgeIcon}>🛡️</Text>
      <Text style={styles.badgeCount}>{count}</Text>
    </View>
  );
}

/**
 * Carte de Streak Freeze pour le HomeScreen
 */
export function StreakFreezeCard({ userXP, onXPUpdate, style }) {
  const [stats, setStats] = useState(null);
  const [showShop, setShowShop] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const data = await getFreezeStats();
    setStats(data);
  };

  const handleBuyWithXP = async () => {
    if (!stats?.canBuyMore) {
      Alert.alert('Maximum atteint', `Tu as déjà ${FREEZE_CONFIG.maxFreezes} freezes.`);
      return;
    }

    setPurchasing(true);

    const result = await purchaseFreezeWithXP(userXP, async (amount) => {
      // Callback pour déduire les XP
      if (onXPUpdate) {
        await onXPUpdate(-amount);
      }
    });

    setPurchasing(false);

    if (result.success) {
      Alert.alert('Acheté !', result.message);
      loadStats();
    } else {
      Alert.alert('Erreur', result.message || 'Impossible d\'acheter le freeze.');
    }
  };

  if (!stats) return null;

  return (
    <View style={[styles.card, style]}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleRow}>
          <Text style={styles.cardEmoji}>🛡️</Text>
          <Text style={styles.cardTitle}>Streak Freeze</Text>
        </View>
        <View style={styles.freezeCounter}>
          <Text style={styles.freezeCount}>{stats.available}</Text>
          <Text style={styles.freezeMax}>/{stats.maxFreezes}</Text>
        </View>
      </View>

      <Text style={styles.cardDescription}>
        Protège automatiquement ton streak si tu manques un jour.
      </Text>

      {stats.canBuyMore ? (
        <View style={styles.buySection}>
          <TouchableOpacity
            style={[styles.buyButton, purchasing && styles.buyButtonDisabled]}
            onPress={handleBuyWithXP}
            disabled={purchasing || userXP < stats.xpPrice}
          >
            <Text style={styles.buyButtonText}>
              {purchasing ? 'Achat...' : `Acheter (${stats.xpPrice} XP)`}
            </Text>
          </TouchableOpacity>

          {userXP < stats.xpPrice && (
            <Text style={styles.notEnoughXP}>
              Il te manque {stats.xpPrice - userXP} XP
            </Text>
          )}

          <TouchableOpacity
            style={styles.shopLink}
            onPress={() => setShowShop(true)}
          >
            <Text style={styles.shopLinkText}>Voir la boutique</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.maxReached}>
          <Text style={styles.maxReachedText}>
            Tu as le maximum de freezes !
          </Text>
        </View>
      )}

      {/* Shop Modal */}
      <FreezeShopModal
        visible={showShop}
        onClose={() => setShowShop(false)}
        stats={stats}
        userXP={userXP}
        onBuyWithXP={handleBuyWithXP}
        onRefresh={loadStats}
      />
    </View>
  );
}

/**
 * Modal de la boutique de freezes
 */
function FreezeShopModal({ visible, onClose, stats, userXP, onBuyWithXP, onRefresh }) {
  const handleIAPPurchase = async (packId) => {
    // TODO: Intégrer avec RevenueCat
    Alert.alert(
      'Bientôt disponible',
      'L\'achat avec argent réel sera disponible dans la prochaine version.'
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.shopHeader}>
            <Text style={styles.shopEmoji}>🛡️</Text>
            <Text style={styles.shopTitle}>Streak Freeze</Text>
            <Text style={styles.shopSubtitle}>
              Protège ton streak automatiquement
            </Text>
          </View>

          {/* Current Status */}
          <View style={styles.statusBox}>
            <Text style={styles.statusLabel}>Tu possèdes</Text>
            <Text style={styles.statusValue}>
              {stats?.available || 0} / {FREEZE_CONFIG.maxFreezes}
            </Text>
            <Text style={styles.statusHint}>freezes</Text>
          </View>

          {/* How it works */}
          <View style={styles.howItWorks}>
            <Text style={styles.howTitle}>Comment ça marche ?</Text>
            <View style={styles.howStep}>
              <Text style={styles.howIcon}>🛡️</Text>
              <Text style={styles.howText}>
                Si tu manques un jour, un freeze est utilisé automatiquement
              </Text>
            </View>
            <View style={styles.howStep}>
              <Text style={styles.howIcon}>🔥</Text>
              <Text style={styles.howText}>
                Ton streak est préservé même sans étudier
              </Text>
            </View>
            <View style={styles.howStep}>
              <Text style={styles.howIcon}>⚠️</Text>
              <Text style={styles.howText}>
                Max 2 freezes actifs, 1 seul utilisé par jour
              </Text>
            </View>
          </View>

          {/* Buy Options */}
          {stats?.canBuyMore && (
            <View style={styles.buyOptions}>
              {/* XP Option */}
              <TouchableOpacity
                style={[
                  styles.buyOption,
                  userXP < FREEZE_CONFIG.xpPrice && styles.buyOptionDisabled,
                ]}
                onPress={() => {
                  onBuyWithXP();
                  onClose();
                }}
                disabled={userXP < FREEZE_CONFIG.xpPrice}
              >
                <View style={styles.buyOptionLeft}>
                  <Text style={styles.buyOptionEmoji}>⭐</Text>
                  <View>
                    <Text style={styles.buyOptionTitle}>1 Freeze</Text>
                    <Text style={styles.buyOptionPrice}>
                      {FREEZE_CONFIG.xpPrice} XP
                    </Text>
                  </View>
                </View>
                <Text style={styles.buyOptionButton}>Acheter</Text>
              </TouchableOpacity>

              {/* IAP Options */}
              {Object.values(FREEZE_IAP).map((pack) => (
                <TouchableOpacity
                  key={pack.id}
                  style={[styles.buyOption, pack.popular && styles.buyOptionPopular]}
                  onPress={() => handleIAPPurchase(pack.id)}
                >
                  <View style={styles.buyOptionLeft}>
                    <Text style={styles.buyOptionEmoji}>💎</Text>
                    <View>
                      <Text style={styles.buyOptionTitle}>{pack.label}</Text>
                      <Text style={styles.buyOptionPrice}>{pack.price}€</Text>
                    </View>
                  </View>
                  <View style={styles.buyOptionRight}>
                    {pack.savings && (
                      <View style={styles.savingsBadge}>
                        <Text style={styles.savingsText}>-{pack.savings}</Text>
                      </View>
                    )}
                    {pack.popular && (
                      <View style={styles.popularBadge}>
                        <Text style={styles.popularText}>Populaire</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {!stats?.canBuyMore && (
            <View style={styles.maxReachedBox}>
              <Text style={styles.maxReachedEmoji}>✓</Text>
              <Text style={styles.maxReachedTitle}>Maximum atteint !</Text>
              <Text style={styles.maxReachedHint}>
                Tu as déjà {FREEZE_CONFIG.maxFreezes} freezes
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

/**
 * Notification quand un freeze est utilisé
 */
export function FreezeUsedNotification({ visible, onClose, remaining }) {
  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.notifOverlay}>
        <View style={styles.notifContent}>
          <Text style={styles.notifEmoji}>🛡️</Text>
          <Text style={styles.notifTitle}>Streak protégé !</Text>
          <Text style={styles.notifText}>
            Un Streak Freeze a été utilisé pour protéger ton streak.
          </Text>
          <Text style={styles.notifRemaining}>
            Freezes restants : {remaining}
          </Text>
          <TouchableOpacity style={styles.notifButton} onPress={onClose}>
            <Text style={styles.notifButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  // Badge
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  badgeCount: {
    fontSize: FONTS.small,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  // Card
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.marginSmall,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: FONTS.regular,
    fontWeight: '600',
    color: COLORS.text,
  },
  freezeCounter: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  freezeCount: {
    fontSize: FONTS.xLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  freezeMax: {
    fontSize: FONTS.regular,
    color: COLORS.textSecondary,
  },
  cardDescription: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    marginBottom: SIZES.margin,
  },
  buySection: {
    alignItems: 'center',
  },
  buyButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: SIZES.radius,
    width: '100%',
    alignItems: 'center',
  },
  buyButtonDisabled: {
    opacity: 0.5,
  },
  buyButtonText: {
    fontSize: FONTS.regular,
    fontWeight: '600',
    color: COLORS.textOnPrimary,
  },
  notEnoughXP: {
    fontSize: FONTS.small,
    color: COLORS.error,
    marginTop: 8,
  },
  shopLink: {
    marginTop: SIZES.margin,
  },
  shopLinkText: {
    fontSize: FONTS.small,
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  maxReached: {
    backgroundColor: COLORS.successLight,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  maxReachedText: {
    fontSize: FONTS.regular,
    color: COLORS.success,
    fontWeight: '600',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: SIZES.radiusLarge,
    borderTopRightRadius: SIZES.radiusLarge,
    padding: SIZES.paddingLarge,
    maxHeight: '90%',
  },
  closeButton: {
    position: 'absolute',
    top: SIZES.padding,
    right: SIZES.padding,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: COLORS.textSecondary,
  },
  shopHeader: {
    alignItems: 'center',
    marginBottom: SIZES.paddingLarge,
    marginTop: SIZES.margin,
  },
  shopEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  shopTitle: {
    fontSize: FONTS.xxLarge,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  shopSubtitle: {
    fontSize: FONTS.regular,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  statusBox: {
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    marginBottom: SIZES.paddingLarge,
  },
  statusLabel: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
  },
  statusValue: {
    fontSize: FONTS.xxxLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statusHint: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
  },
  howItWorks: {
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.paddingLarge,
  },
  howTitle: {
    fontSize: FONTS.regular,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.margin,
  },
  howStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SIZES.marginSmall,
  },
  howIcon: {
    fontSize: 18,
    marginRight: 12,
    width: 24,
  },
  howText: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    flex: 1,
  },
  buyOptions: {
    marginBottom: SIZES.margin,
  },
  buyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  buyOptionPopular: {
    borderColor: COLORS.primary,
  },
  buyOptionDisabled: {
    opacity: 0.5,
  },
  buyOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buyOptionEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  buyOptionTitle: {
    fontSize: FONTS.regular,
    fontWeight: '600',
    color: COLORS.text,
  },
  buyOptionPrice: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
  },
  buyOptionRight: {
    alignItems: 'flex-end',
  },
  buyOptionButton: {
    fontSize: FONTS.regular,
    color: COLORS.primary,
    fontWeight: '600',
  },
  savingsBadge: {
    backgroundColor: COLORS.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 4,
  },
  savingsText: {
    fontSize: FONTS.tiny,
    color: COLORS.textOnPrimary,
    fontWeight: 'bold',
  },
  popularBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  popularText: {
    fontSize: FONTS.tiny,
    color: COLORS.textOnPrimary,
    fontWeight: 'bold',
  },
  maxReachedBox: {
    alignItems: 'center',
    padding: SIZES.paddingLarge,
    backgroundColor: COLORS.successLight,
    borderRadius: SIZES.radius,
  },
  maxReachedEmoji: {
    fontSize: 32,
    color: COLORS.success,
    marginBottom: 8,
  },
  maxReachedTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.success,
  },
  maxReachedHint: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    marginTop: 4,
  },

  // Notification
  notifOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.screenPadding,
  },
  notifContent: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLarge,
    padding: SIZES.paddingLarge,
    alignItems: 'center',
    width: '100%',
    maxWidth: 300,
  },
  notifEmoji: {
    fontSize: 48,
    marginBottom: SIZES.margin,
  },
  notifTitle: {
    fontSize: FONTS.xLarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  notifText: {
    fontSize: FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.margin,
  },
  notifRemaining: {
    fontSize: FONTS.small,
    color: COLORS.primary,
    marginBottom: SIZES.paddingLarge,
  },
  notifButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 48,
    paddingVertical: 12,
    borderRadius: SIZES.radius,
  },
  notifButtonText: {
    fontSize: FONTS.regular,
    fontWeight: '600',
    color: COLORS.textOnPrimary,
  },
});

export default StreakFreezeCard;
