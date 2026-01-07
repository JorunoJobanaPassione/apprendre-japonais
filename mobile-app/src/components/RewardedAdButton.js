/**
 * RewardedAdButton - Bouton pour regarder une pub et gagner une vie
 *
 * IMPORTANT: Ce composant fonctionne SEULEMENT en build natif (EAS Build)
 * En Expo Go, il affiche un placeholder de test
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Modal,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../styles/theme';
import {
  canWatchRewardedAd,
  logRewardedAdWatched,
  getRewardedAdCooldown,
  formatCooldown,
  AdUnitIds,
} from '../services/adService';
import { gainLife, getLives, CONFIG as LIVES_CONFIG } from '../services/livesSystem';

// Flag pour détecter si on est en Expo Go ou build natif
const isExpoGo = !global.HermesInternal;

export default function RewardedAdButton({
  onRewardEarned,
  onError,
  style,
  disabled = false,
}) {
  const [loading, setLoading] = useState(false);
  const [canWatch, setCanWatch] = useState(true);
  const [cooldown, setCooldown] = useState(0);
  const [currentLives, setCurrentLives] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Charger l'état initial
  useEffect(() => {
    checkAvailability();
    loadLives();

    // Mettre à jour le cooldown toutes les secondes
    const interval = setInterval(() => {
      updateCooldown();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const loadLives = async () => {
    const lives = await getLives();
    setCurrentLives(lives);
  };

  const checkAvailability = async () => {
    const result = await canWatchRewardedAd();
    setCanWatch(result.canWatch);
    if (!result.canWatch && result.remainingTime) {
      setCooldown(result.remainingTime);
    }
  };

  const updateCooldown = async () => {
    const remaining = await getRewardedAdCooldown();
    setCooldown(remaining);
    if (remaining <= 0) {
      checkAvailability();
    }
  };

  const handlePress = () => {
    if (currentLives >= LIVES_CONFIG.MAX_LIVES) {
      Alert.alert(
        'Vies au maximum',
        `Tu as déjà ${LIVES_CONFIG.MAX_LIVES} vies !`,
        [{ text: 'OK' }]
      );
      return;
    }

    setShowConfirmModal(true);
  };

  const watchAd = async () => {
    setShowConfirmModal(false);
    setLoading(true);

    try {
      // Vérifier la disponibilité
      const availability = await canWatchRewardedAd();
      if (!availability.canWatch) {
        Alert.alert('Impossible', availability.message);
        setLoading(false);
        return;
      }

      // En Expo Go, simuler la pub (car AdMob ne fonctionne pas)
      if (isExpoGo || __DEV__) {
        // Simuler un délai de pub
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Donner la récompense
        const newLives = await gainLife();
        await logRewardedAdWatched('life');

        setCurrentLives(newLives);
        checkAvailability();

        Alert.alert(
          '🎉 Récompense !',
          `Tu as gagné +1 vie !\nVies actuelles: ${newLives}/${LIVES_CONFIG.MAX_LIVES}`,
          [{ text: 'Super !' }]
        );

        if (onRewardEarned) {
          onRewardEarned({ type: 'life', amount: 1, newLives });
        }
      } else {
        // Build natif - utiliser les vraies pubs AdMob
        // TODO: Implémenter avec react-native-google-mobile-ads
        // const { RewardedAd, RewardedAdEventType } = require('react-native-google-mobile-ads');
        // ... code AdMob réel

        // Pour l'instant, fallback sur simulation
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const newLives = await gainLife();
        await logRewardedAdWatched('life');

        setCurrentLives(newLives);
        checkAvailability();

        if (onRewardEarned) {
          onRewardEarned({ type: 'life', amount: 1, newLives });
        }
      }
    } catch (error) {
      console.error('Error watching rewarded ad:', error);
      Alert.alert('Erreur', 'Impossible de charger la publicité');
      if (onError) {
        onError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = disabled || loading || !canWatch || currentLives >= LIVES_CONFIG.MAX_LIVES;

  return (
    <>
      <TouchableOpacity
        style={[
          styles.button,
          isDisabled && styles.buttonDisabled,
          style,
        ]}
        onPress={handlePress}
        disabled={isDisabled}
        activeOpacity={0.7}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.text} size="small" />
        ) : (
          <>
            <Text style={styles.icon}>📺</Text>
            <View style={styles.textContainer}>
              <Text style={[styles.text, isDisabled && styles.textDisabled]}>
                {currentLives >= LIVES_CONFIG.MAX_LIVES
                  ? 'Vies au max'
                  : cooldown > 0
                  ? `Attendre ${formatCooldown(cooldown)}`
                  : 'Regarder une pub'}
              </Text>
              {currentLives < LIVES_CONFIG.MAX_LIVES && cooldown <= 0 && (
                <Text style={styles.reward}>+1 ❤️ gratuit</Text>
              )}
            </View>
          </>
        )}
      </TouchableOpacity>

      {/* Modal de confirmation */}
      <Modal
        visible={showConfirmModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalIcon}>📺</Text>
            <Text style={styles.modalTitle}>Regarder une pub ?</Text>
            <Text style={styles.modalDescription}>
              Regarde une courte publicité pour gagner une vie gratuite !
            </Text>

            <View style={styles.rewardPreview}>
              <Text style={styles.rewardPreviewText}>Récompense : +1 ❤️</Text>
            </View>

            <View style={styles.livesPreview}>
              <Text style={styles.livesPreviewText}>
                Vies actuelles : {currentLives}/{LIVES_CONFIG.MAX_LIVES}
              </Text>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowConfirmModal(false)}
              >
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.watchButton}
                onPress={watchAd}
              >
                <Text style={styles.watchButtonText}>Regarder</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

/**
 * Version compacte du bouton (pour afficher dans les modals de vies)
 */
export function RewardedAdButtonCompact({ onRewardEarned, style }) {
  const [loading, setLoading] = useState(false);
  const [canWatch, setCanWatch] = useState(true);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    checkAvailability();
    const interval = setInterval(updateCooldown, 1000);
    return () => clearInterval(interval);
  }, []);

  const checkAvailability = async () => {
    const result = await canWatchRewardedAd();
    setCanWatch(result.canWatch);
  };

  const updateCooldown = async () => {
    const remaining = await getRewardedAdCooldown();
    setCooldown(remaining);
    if (remaining <= 0) checkAvailability();
  };

  const watchAd = async () => {
    setLoading(true);
    try {
      const availability = await canWatchRewardedAd();
      if (!availability.canWatch) {
        setLoading(false);
        return;
      }

      // Simuler pub en dev
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const newLives = await gainLife();
      await logRewardedAdWatched('life');

      if (onRewardEarned) {
        onRewardEarned({ type: 'life', amount: 1, newLives });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      checkAvailability();
    }
  };

  if (!canWatch && cooldown > 0) {
    return (
      <View style={[styles.compactButton, styles.compactDisabled, style]}>
        <Text style={styles.compactText}>{formatCooldown(cooldown)}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.compactButton, style]}
      onPress={watchAd}
      disabled={loading || !canWatch}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.textOnPrimary} size="small" />
      ) : (
        <>
          <Text style={styles.compactIcon}>📺</Text>
          <Text style={styles.compactText}>+1 ❤️</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Main button
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.success,
  },
  buttonDisabled: {
    borderColor: COLORS.border,
    opacity: 0.6,
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: FONTS.regular,
    fontWeight: '600',
    color: COLORS.text,
  },
  textDisabled: {
    color: COLORS.textSecondary,
  },
  reward: {
    fontSize: FONTS.small,
    color: COLORS.success,
    marginTop: 2,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.screenPadding,
  },
  modalContent: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLarge,
    padding: SIZES.paddingLarge,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
  },
  modalIcon: {
    fontSize: 48,
    marginBottom: SIZES.margin,
  },
  modalTitle: {
    fontSize: FONTS.xLarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.margin,
  },
  rewardPreview: {
    backgroundColor: COLORS.successLight,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: SIZES.radius,
    marginBottom: 8,
  },
  rewardPreviewText: {
    fontSize: FONTS.regular,
    fontWeight: '600',
    color: COLORS.success,
  },
  livesPreview: {
    marginBottom: SIZES.margin,
  },
  livesPreviewText: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.surfaceLight,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: FONTS.regular,
    color: COLORS.textSecondary,
  },
  watchButton: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.success,
    alignItems: 'center',
  },
  watchButtonText: {
    fontSize: FONTS.regular,
    fontWeight: 'bold',
    color: COLORS.textOnPrimary,
  },

  // Compact button
  compactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.success,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  compactDisabled: {
    backgroundColor: COLORS.surfaceLight,
  },
  compactIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  compactText: {
    fontSize: FONTS.small,
    fontWeight: '600',
    color: COLORS.textOnPrimary,
  },
});
