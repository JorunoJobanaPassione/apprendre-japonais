/**
 * Lives Recovery Modal - 3 options gratuites pour récupérer des vies
 * DIFFÉRENCIATION vs Duolingo : 100% gratuit (Duolingo = paywall)
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, FONTS, SIZES } from '../styles/theme';
import { getSRSRecoveryProgress, resetSRSRecoveryProgress } from '../services/livesSystem';
import { getDailyQuests } from '../services/questsSystem';

export default function LivesRecoveryModal({ visible, onClose, onRecovered }) {
  const [srsProgress, setSrsProgress] = useState(0);
  const [availableQuests, setAvailableQuests] = useState([]);
  const [recovering, setRecovering] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const scaleAnim = new Animated.Value(0);

  useEffect(() => {
    if (visible) {
      loadData();
      // Animation d'entrée du modal
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [visible]);

  const loadData = async () => {
    // Charger la progression SRS
    const progress = await getSRSRecoveryProgress();
    setSrsProgress(progress);

    // Charger les quêtes complétées non utilisées pour récupération
    const quests = await getDailyQuests();
    const completedQuests = quests.filter(
      (q) => q.completed && !q.usedForRecovery
    );
    setAvailableQuests(completedQuests);
  };

  const handleSRSRecovery = () => {
    // Naviguer vers SRS Review
    onClose();
    // Le parent (HomeScreen) va gérer la navigation
  };

  const handleQuestRecovery = async (questId) => {
    if (recovering) return;

    setRecovering(true);
    // Marquer la quête comme utilisée
    const quests = await getDailyQuests();
    const updatedQuests = quests.map((q) =>
      q.id === questId ? { ...q, usedForRecovery: true } : q
    );
    await AsyncStorage.setItem('dailyQuests', JSON.stringify(updatedQuests));

    // Récupérer une vie
    await onRecovered();

    // Animation de succès
    showSuccessAnimation();
  };

  const handleAdRecovery = async () => {
    if (recovering) return;

    setRecovering(true);
    // TODO: Intégrer AdMob/Expo Ads plus tard
    // Pour l'instant, simuler la pub
    setTimeout(async () => {
      await onRecovered();
      showSuccessAnimation();
    }, 1000);
  };

  const showSuccessAnimation = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setRecovering(false);
      onClose();
    }, 2000);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          {!showSuccess ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>❤️ Récupérer une vie</Text>
                <Text style={styles.subtitle}>
                  Choisis comment récupérer gratuitement une vie
                </Text>
              </View>

              {/* Option 1: SRS Reviews */}
              <TouchableOpacity
                style={styles.optionCard}
                onPress={handleSRSRecovery}
                disabled={recovering}
              >
                <View style={styles.optionHeader}>
                  <Text style={styles.optionEmoji}>🧠</Text>
                  <View style={styles.optionInfo}>
                    <Text style={styles.optionTitle}>Révisions SRS</Text>
                    <Text style={styles.optionDescription}>
                      Complète 5 révisions pour gagner une vie
                    </Text>
                  </View>
                </View>

                {/* Progress bar */}
                <View style={styles.progressContainer}>
                  <View style={styles.progressBackground}>
                    <View
                      style={[
                        styles.progressBar,
                        { width: `${(srsProgress / 5) * 100}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>{`${srsProgress}/5`}</Text>
                </View>

                {srsProgress >= 5 ? (
                  <View style={styles.readyBadge}>
                    <Text style={styles.readyText}>✅ Prêt à récupérer</Text>
                  </View>
                ) : (
                  <Text style={styles.optionCTA}>
                    Faire des révisions →
                  </Text>
                )}
              </TouchableOpacity>

              {/* Option 2: Complete Quest */}
              <View style={styles.optionCard}>
                <View style={styles.optionHeader}>
                  <Text style={styles.optionEmoji}>🎯</Text>
                  <View style={styles.optionInfo}>
                    <Text style={styles.optionTitle}>Quête complétée</Text>
                    <Text style={styles.optionDescription}>
                      Utilise une quête complétée pour gagner une vie
                    </Text>
                  </View>
                </View>

                {availableQuests.length > 0 ? (
                  availableQuests.map((quest) => (
                    <TouchableOpacity
                      key={quest.id}
                      style={styles.questButton}
                      onPress={() => handleQuestRecovery(quest.id)}
                      disabled={recovering}
                    >
                      <Text style={styles.questTitle}>
                        {quest.icon} {quest.title}
                      </Text>
                      <Text style={styles.questCTA}>Utiliser →</Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>
                      Aucune quête complétée disponible
                    </Text>
                    <Text style={styles.emptySubtext}>
                      Complète une quête quotidienne d'abord
                    </Text>
                  </View>
                )}
              </View>

              {/* Option 3: Watch Ad (optionnel) */}
              <TouchableOpacity
                style={styles.optionCard}
                onPress={handleAdRecovery}
                disabled={recovering}
              >
                <View style={styles.optionHeader}>
                  <Text style={styles.optionEmoji}>📺</Text>
                  <View style={styles.optionInfo}>
                    <Text style={styles.optionTitle}>Regarder une pub</Text>
                    <Text style={styles.optionDescription}>
                      Regarde une courte publicité (30 sec)
                    </Text>
                  </View>
                </View>

                <Text style={styles.optionCTA}>Regarder →</Text>
              </TouchableOpacity>

              {/* Footer */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  💡 Astuce : Les vies se rechargent automatiquement toutes les 3h
                </Text>
              </View>

              {/* Close button */}
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Fermer</Text>
              </TouchableOpacity>
            </ScrollView>
          ) : (
            // Success state
            <View style={styles.successContainer}>
              <Text style={styles.successEmoji}>🎉</Text>
              <Text style={styles.successTitle}>Vie récupérée !</Text>
              <Text style={styles.successSubtitle}>
                Continue ton apprentissage
              </Text>
            </View>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.screenPadding,
  },
  modalContainer: {
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radiusLarge,
    width: '100%',
    maxHeight: '85%',
    padding: SIZES.padding * 1.5,
  },
  header: {
    alignItems: 'center',
    marginBottom: SIZES.margin * 1.5,
  },
  title: {
    fontSize: FONTS.xxLarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.marginSmall,
  },
  subtitle: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  optionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.margin,
    borderWidth: 2,
    borderColor: COLORS.surfaceLight,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.marginSmall,
  },
  optionEmoji: {
    fontSize: 40,
    marginRight: SIZES.marginSmall,
  },
  optionInfo: {
    flex: 1,
  },
  optionTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
  },
  optionCTA: {
    fontSize: FONTS.medium,
    color: COLORS.primary,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: SIZES.marginSmall,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.marginSmall,
    marginBottom: SIZES.marginSmall,
  },
  progressBackground: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: SIZES.marginSmall,
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: FONTS.small,
    fontWeight: '600',
    color: COLORS.text,
    minWidth: 40,
  },
  readyBadge: {
    backgroundColor: COLORS.success + '20',
    borderRadius: SIZES.radiusSmall,
    padding: SIZES.paddingSmall,
    alignItems: 'center',
    marginTop: SIZES.marginSmall,
  },
  readyText: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: COLORS.success,
  },
  questButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    borderRadius: SIZES.radiusSmall,
    padding: SIZES.padding,
    marginTop: SIZES.marginSmall,
  },
  questTitle: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
  },
  questCTA: {
    fontSize: FONTS.medium,
    color: COLORS.primary,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    padding: SIZES.padding,
    marginTop: SIZES.marginSmall,
  },
  emptyText: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: FONTS.small,
    color: COLORS.textMuted,
  },
  footer: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: SIZES.radiusSmall,
    padding: SIZES.padding,
    marginTop: SIZES.margin,
    marginBottom: SIZES.margin,
  },
  footerText: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  closeButton: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  successContainer: {
    alignItems: 'center',
    padding: SIZES.padding * 2,
  },
  successEmoji: {
    fontSize: 80,
    marginBottom: SIZES.margin,
  },
  successTitle: {
    fontSize: FONTS.xxxLarge,
    fontWeight: 'bold',
    color: COLORS.success,
    marginBottom: SIZES.marginSmall,
  },
  successSubtitle: {
    fontSize: FONTS.large,
    color: COLORS.textSecondary,
  },
});
