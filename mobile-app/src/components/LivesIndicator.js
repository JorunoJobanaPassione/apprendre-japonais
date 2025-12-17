/**
 * Lives Indicator Component - Affichage des vies avec timer
 * Affiche les cœurs, le timer de recharge, et permet la récupération
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import {
  getLives,
  checkAutoRecharge,
  getTimeUntilNextRecharge,
  recoverLifeWithSRS,
  getRecoveryStats,
  formatTime,
  CONFIG,
} from '../services/livesSystem';
import { COLORS, FONTS, SIZES } from '../styles/theme';

export default function LivesIndicator({ onLivesChange, srsReviewsCount = 0 }) {
  const [lives, setLives] = useState(CONFIG.MAX_LIVES);
  const [timeUntilRecharge, setTimeUntilRecharge] = useState(0);
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const [recoveryStats, setRecoveryStats] = useState(null);
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    loadLives();
    const interval = setInterval(updateLives, 1000); // Update every second
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Pulse animation when lives are low
    if (lives <= 2 && lives > 0) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [lives]);

  const loadLives = async () => {
    const currentLives = await checkAutoRecharge();
    setLives(currentLives);
    onLivesChange?.(currentLives);

    const timeLeft = await getTimeUntilNextRecharge();
    setTimeUntilRecharge(timeLeft);
  };

  const updateLives = async () => {
    await loadLives();
  };

  const handleRecoveryPress = async () => {
    const stats = await getRecoveryStats();
    setRecoveryStats(stats);
    setShowRecoveryModal(true);
  };

  const handleRecoverLife = async () => {
    const result = await recoverLifeWithSRS(srsReviewsCount);

    if (result.success) {
      setLives(result.newLives);
      onLivesChange?.(result.newLives);
      setShowRecoveryModal(false);
      // TODO: Show success toast
    } else {
      // TODO: Show error toast with result.message
      alert(result.message);
    }
  };

  const renderHearts = () => {
    const hearts = [];
    for (let i = 0; i < CONFIG.MAX_LIVES; i++) {
      hearts.push(
        <Animated.Text
          key={i}
          style={[
            styles.heart,
            i < lives ? styles.heartFull : styles.heartEmpty,
            lives <= 2 && i < lives && { transform: [{ scale: pulseAnim }] },
          ]}
        >
          {i < lives ? '❤️' : '🤍'}
        </Animated.Text>
      );
    }
    return hearts;
  };

  const renderRecoveryModal = () => {
    if (!recoveryStats) return null;

    const canRecover = srsReviewsCount >= CONFIG.SRS_REVIEWS_FOR_LIFE;
    const remaining = CONFIG.SRS_REVIEWS_FOR_LIFE - srsReviewsCount;

    return (
      <Modal
        visible={showRecoveryModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowRecoveryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>💝 Récupération de Vie</Text>

            <Text style={styles.modalSubtitle}>
              Feature Anti-Duolingo : 100% GRATUIT
            </Text>

            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${Math.min(
                        (srsReviewsCount / CONFIG.SRS_REVIEWS_FOR_LIFE) * 100,
                        100
                      )}%`,
                    },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {`${srsReviewsCount} / ${CONFIG.SRS_REVIEWS_FOR_LIFE} révisions SRS`}
              </Text>
            </View>

            {canRecover ? (
              <>
                <Text style={styles.modalMessage}>
                  🎉 Vous pouvez récupérer une vie gratuitement !
                </Text>
                <Text style={styles.modalInfo}>
                  {`Récupérations aujourd'hui : ${recoveryStats.recoveriesToday} / ${CONFIG.MAX_RECOVERIES_PER_DAY}`}
                </Text>
              </>
            ) : (
              <Text style={styles.modalMessage}>
                {`Encore ${remaining} révision${remaining > 1 ? 's' : ''} SRS pour débloquer une vie gratuite !`}
              </Text>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonSecondary]}
                onPress={() => setShowRecoveryModal(false)}
              >
                <Text style={styles.modalButtonTextSecondary}>Fermer</Text>
              </TouchableOpacity>

              {canRecover && recoveryStats.remainingRecoveries > 0 && (
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonPrimary]}
                  onPress={handleRecoverLife}
                >
                  <Text style={styles.modalButtonTextPrimary}>
                    Récupérer (+1 ❤️)
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.livesContainer}
        onPress={handleRecoveryPress}
        activeOpacity={0.7}
      >
        <View style={styles.heartsRow}>{renderHearts()}</View>

        {lives < CONFIG.MAX_LIVES && timeUntilRecharge > 0 && (
          <Text style={styles.timerText}>
            ⏱️ +1 dans {formatTime(timeUntilRecharge)}
          </Text>
        )}

        {lives < CONFIG.MAX_LIVES && (
          <Text style={styles.recoveryHint}>
            💝 Tap pour récupérer gratuitement
          </Text>
        )}
      </TouchableOpacity>

      {renderRecoveryModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  livesContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    alignItems: 'center',
    minWidth: 140,
  },
  heartsRow: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 4,
  },
  heart: {
    fontSize: 20,
  },
  heartFull: {
    opacity: 1,
  },
  heartEmpty: {
    opacity: 0.3,
  },
  timerText: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  recoveryHint: {
    fontSize: FONTS.tiny,
    color: COLORS.primary,
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.screenPadding,
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 2,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: FONTS.xxLarge,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SIZES.marginSmall,
  },
  modalSubtitle: {
    fontSize: FONTS.medium,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: SIZES.margin * 2,
  },
  progressContainer: {
    marginBottom: SIZES.margin * 2,
  },
  progressBar: {
    height: 12,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: SIZES.radiusSmall,
    overflow: 'hidden',
    marginBottom: SIZES.marginSmall,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  progressText: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: FONTS.large,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SIZES.margin,
  },
  modalInfo: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.margin * 2,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: SIZES.margin,
  },
  modalButton: {
    flex: 1,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    alignItems: 'center',
  },
  modalButtonPrimary: {
    backgroundColor: COLORS.primary,
  },
  modalButtonSecondary: {
    backgroundColor: COLORS.surfaceLight,
  },
  modalButtonTextPrimary: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  modalButtonTextSecondary: {
    fontSize: FONTS.large,
    fontWeight: '600',
    color: COLORS.text,
  },
});
