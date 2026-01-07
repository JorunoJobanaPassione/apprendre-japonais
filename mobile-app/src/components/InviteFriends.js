/**
 * Invite Friends Component - Interface de parrainage
 *
 * Affiche le code de parrainage et permet de le partager
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../styles/theme';
import {
  getReferralStats,
  shareReferralCode,
  copyReferralCode,
  setReferredBy,
  hasReferrer,
  REFERRAL_REWARDS,
} from '../services/referralService';

/**
 * Carte d'invitation compacte (pour ProfileScreen)
 */
export function InviteCard({ onPress, style }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const data = await getReferralStats();
    setStats(data);
  };

  if (!stats) return null;

  return (
    <TouchableOpacity style={[styles.inviteCard, style]} onPress={onPress}>
      <View style={styles.inviteCardLeft}>
        <Text style={styles.inviteCardEmoji}>🎁</Text>
        <View>
          <Text style={styles.inviteCardTitle}>Invite tes amis</Text>
          <Text style={styles.inviteCardSubtitle}>
            Gagne {REFERRAL_REWARDS.referrer.xp} XP + {REFERRAL_REWARDS.referrer.lives} vies par ami
          </Text>
        </View>
      </View>
      <Text style={styles.inviteCardArrow}>›</Text>
    </TouchableOpacity>
  );
}

/**
 * Section de parrainage complète
 */
export function InviteSection({ onShare }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [hasExistingReferrer, setHasExistingReferrer] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsData, referred] = await Promise.all([
        getReferralStats(),
        hasReferrer(),
      ]);
      setStats(statsData);
      setHasExistingReferrer(referred);
    } catch (error) {
      console.error('Error loading invite data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    const result = await shareReferralCode('default');
    if (result.shared) {
      onShare?.();
    }
  };

  const handleCopyCode = async () => {
    const result = await copyReferralCode();
    if (result.success) {
      Alert.alert('Copié !', `Code ${result.code} copié dans le presse-papier.`);
    }
  };

  const handleEnterCode = async () => {
    if (!inputCode.trim()) {
      Alert.alert('Erreur', 'Entre un code de parrainage.');
      return;
    }

    const result = await setReferredBy(inputCode.trim());

    if (result.success) {
      Alert.alert('Félicitations !', result.message);
      setShowCodeInput(false);
      setInputCode('');
      setHasExistingReferrer(true);
    } else {
      Alert.alert('Erreur', result.message || 'Code invalide.');
    }
  };

  if (loading || !stats) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerEmoji}>🎁</Text>
        <Text style={styles.headerTitle}>Invite tes amis</Text>
        <Text style={styles.headerSubtitle}>
          Gagne des récompenses pour chaque ami qui rejoint !
        </Text>
      </View>

      {/* Code Section */}
      <View style={styles.codeSection}>
        <Text style={styles.codeLabel}>Ton code de parrainage</Text>
        <View style={styles.codeBox}>
          <Text style={styles.codeText}>{stats.code}</Text>
          <TouchableOpacity style={styles.copyButton} onPress={handleCopyCode}>
            <Text style={styles.copyButtonText}>Copier</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Rewards Info */}
      <View style={styles.rewardsSection}>
        <Text style={styles.rewardsTitle}>Récompenses</Text>

        <View style={styles.rewardRow}>
          <View style={styles.rewardIcon}>
            <Text style={styles.rewardEmoji}>👤</Text>
          </View>
          <View style={styles.rewardInfo}>
            <Text style={styles.rewardLabel}>Pour toi (parrain)</Text>
            <Text style={styles.rewardValue}>
              +{REFERRAL_REWARDS.referrer.xp} XP, +{REFERRAL_REWARDS.referrer.lives} vies,{' '}
              {REFERRAL_REWARDS.referrer.premiumDays}j Premium
            </Text>
          </View>
        </View>

        <View style={styles.rewardRow}>
          <View style={styles.rewardIcon}>
            <Text style={styles.rewardEmoji}>🆕</Text>
          </View>
          <View style={styles.rewardInfo}>
            <Text style={styles.rewardLabel}>Pour ton ami</Text>
            <Text style={styles.rewardValue}>
              +{REFERRAL_REWARDS.referee.xp} XP, +{REFERRAL_REWARDS.referee.lives} vies,{' '}
              {REFERRAL_REWARDS.referee.premiumDays}j Premium
            </Text>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.totalReferrals}</Text>
          <Text style={styles.statLabel}>Amis invités</Text>
        </View>

        {stats.nextMilestone && (
          <View style={styles.milestoneBox}>
            <Text style={styles.milestoneText}>
              Encore {stats.nextMilestone.remaining} pour le bonus{' '}
              {stats.nextMilestone.target} invitations !
            </Text>
            <View style={styles.milestoneProgress}>
              <View
                style={[
                  styles.milestoneProgressFill,
                  {
                    width: `${
                      ((stats.nextMilestone.target - stats.nextMilestone.remaining) /
                        stats.nextMilestone.target) *
                      100
                    }%`,
                  },
                ]}
              />
            </View>
          </View>
        )}
      </View>

      {/* Share Button */}
      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Text style={styles.shareButtonText}>Partager avec mes amis</Text>
      </TouchableOpacity>

      {/* Enter Code Section */}
      {!hasExistingReferrer && (
        <TouchableOpacity
          style={styles.enterCodeButton}
          onPress={() => setShowCodeInput(true)}
        >
          <Text style={styles.enterCodeText}>J'ai un code de parrainage</Text>
        </TouchableOpacity>
      )}

      {/* Code Input Modal */}
      <Modal
        visible={showCodeInput}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCodeInput(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Entre le code</Text>
            <Text style={styles.modalSubtitle}>
              Reçois {REFERRAL_REWARDS.referee.lives} vies et{' '}
              {REFERRAL_REWARDS.referee.premiumDays} jours de Premium !
            </Text>

            <TextInput
              style={styles.codeInput}
              value={inputCode}
              onChangeText={setInputCode}
              placeholder="XXXXXX"
              placeholderTextColor={COLORS.textMuted}
              maxLength={6}
              autoCapitalize="characters"
              autoCorrect={false}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => {
                  setShowCodeInput(false);
                  setInputCode('');
                }}
              >
                <Text style={styles.modalCancelText}>Annuler</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalConfirmButton}
                onPress={handleEnterCode}
              >
                <Text style={styles.modalConfirmText}>Valider</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

/**
 * Modal complet d'invitation
 */
export function InviteFriendsModal({ visible, onClose }) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.fullModalOverlay}>
        <View style={styles.fullModalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          <InviteSection onShare={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SIZES.padding,
  },
  loadingText: {
    color: COLORS.textSecondary,
    textAlign: 'center',
  },

  // Compact Card
  inviteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primaryLight,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  inviteCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  inviteCardEmoji: {
    fontSize: 28,
    marginRight: 12,
  },
  inviteCardTitle: {
    fontSize: FONTS.regular,
    fontWeight: '600',
    color: COLORS.primary,
  },
  inviteCardSubtitle: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  inviteCardArrow: {
    fontSize: 24,
    color: COLORS.primary,
  },

  // Header
  header: {
    alignItems: 'center',
    marginBottom: SIZES.paddingLarge,
  },
  headerEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: FONTS.xLarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },

  // Code Section
  codeSection: {
    marginBottom: SIZES.paddingLarge,
  },
  codeLabel: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  codeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
  },
  codeText: {
    fontSize: FONTS.xxxLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 4,
    marginRight: 16,
  },
  copyButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: SIZES.radiusSmall,
  },
  copyButtonText: {
    fontSize: FONTS.small,
    fontWeight: '600',
    color: COLORS.textOnPrimary,
  },

  // Rewards Section
  rewardsSection: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.paddingLarge,
  },
  rewardsTitle: {
    fontSize: FONTS.regular,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.margin,
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.marginSmall,
  },
  rewardIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rewardEmoji: {
    fontSize: 18,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardLabel: {
    fontSize: FONTS.regular,
    color: COLORS.text,
  },
  rewardValue: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
  },

  // Stats Section
  statsSection: {
    alignItems: 'center',
    marginBottom: SIZES.paddingLarge,
  },
  statItem: {
    alignItems: 'center',
    marginBottom: SIZES.margin,
  },
  statValue: {
    fontSize: FONTS.xxxLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
  },
  milestoneBox: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
  },
  milestoneText: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
  },
  milestoneProgress: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  milestoneProgressFill: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: 4,
  },

  // Share Button
  shareButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    marginBottom: SIZES.margin,
  },
  shareButtonText: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.textOnPrimary,
  },

  // Enter Code
  enterCodeButton: {
    alignItems: 'center',
    paddingVertical: SIZES.paddingSmall,
  },
  enterCodeText: {
    fontSize: FONTS.regular,
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.screenPadding,
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLarge,
    padding: SIZES.paddingLarge,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: FONTS.xLarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.paddingLarge,
  },
  codeInput: {
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    fontSize: FONTS.xLarge,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    letterSpacing: 8,
    width: '100%',
    marginBottom: SIZES.paddingLarge,
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
  },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 8,
  },
  modalCancelText: {
    fontSize: FONTS.regular,
    color: COLORS.textSecondary,
  },
  modalConfirmButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    marginLeft: 8,
  },
  modalConfirmText: {
    fontSize: FONTS.regular,
    fontWeight: '600',
    color: COLORS.textOnPrimary,
  },

  // Full Modal
  fullModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'flex-end',
  },
  fullModalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: SIZES.radiusLarge,
    borderTopRightRadius: SIZES.radiusLarge,
    maxHeight: '90%',
    paddingTop: SIZES.paddingLarge,
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
});

export default {
  InviteCard,
  InviteSection,
  InviteFriendsModal,
};
