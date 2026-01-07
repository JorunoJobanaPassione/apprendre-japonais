/**
 * Daily Goal Card - Affiche la progression vers l'objectif quotidien
 *
 * Comme Duolingo, affiche:
 * - Barre de progression circulaire ou linéaire
 * - Temps restant
 * - Message motivationnel
 * - Historique de la semaine
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Modal,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../styles/theme';
import {
  getDailyProgress,
  getStudyHistory,
  getGoalStreak,
  getMotivationalMessage,
  DAILY_GOALS,
} from '../services/dailyGoalService';
import { getUserGoal, saveUserGoal } from '../services/onboardingService';

/**
 * Carte compacte pour le HomeScreen
 */
export function DailyGoalCard({ onPress, style }) {
  const [progress, setProgress] = useState(null);
  const [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    loadProgress();
  }, []);

  useEffect(() => {
    if (progress) {
      Animated.timing(animatedValue, {
        toValue: progress.percentage,
        duration: 800,
        useNativeDriver: false,
      }).start();
    }
  }, [progress]);

  const loadProgress = async () => {
    const data = await getDailyProgress();
    setProgress(data);
  };

  if (!progress) return null;

  const { emoji, message } = getMotivationalMessage(progress.percentage);
  const progressWidth = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleRow}>
          <Text style={styles.cardEmoji}>🎯</Text>
          <Text style={styles.cardTitle}>Objectif du jour</Text>
        </View>
        <Text style={styles.goalLabel}>
          {progress.goal.label}
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progressFill,
              { width: progressWidth },
              progress.isComplete && styles.progressComplete,
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {progress.today.minutesStudied}/{progress.goal.minutes} min
        </Text>
      </View>

      {/* Message */}
      <View style={styles.messageRow}>
        <Text style={styles.messageEmoji}>{emoji}</Text>
        <Text style={styles.messageText}>{message}</Text>
        {progress.isComplete && (
          <Text style={styles.checkmark}>✓</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

/**
 * Section complète avec historique
 */
export function DailyGoalSection({ style }) {
  const [progress, setProgress] = useState(null);
  const [history, setHistory] = useState([]);
  const [goalStreak, setGoalStreak] = useState({ current: 0 });
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [progressData, historyData, streakData] = await Promise.all([
      getDailyProgress(),
      getStudyHistory(7),
      getGoalStreak(),
    ]);
    setProgress(progressData);
    setHistory(historyData.reverse()); // Oldest first
    setGoalStreak(streakData);
  };

  if (!progress) return null;

  const { emoji, message } = getMotivationalMessage(progress.percentage);

  return (
    <View style={[styles.section, style]}>
      {/* Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>🎯 Objectif quotidien</Text>
        <TouchableOpacity onPress={() => setShowSettings(true)}>
          <Text style={styles.settingsButton}>Modifier</Text>
        </TouchableOpacity>
      </View>

      {/* Main Progress */}
      <View style={styles.mainProgress}>
        <View style={styles.circularProgress}>
          <Text style={styles.circularEmoji}>{emoji}</Text>
          <Text style={styles.circularPercentage}>{progress.percentage}%</Text>
        </View>
        <View style={styles.progressInfo}>
          <Text style={styles.progressMain}>
            {progress.today.minutesStudied} / {progress.goal.minutes} min
          </Text>
          <Text style={styles.progressLabel}>{message}</Text>
          {progress.remaining > 0 && (
            <Text style={styles.remainingText}>
              Plus que {progress.remaining} min !
            </Text>
          )}
        </View>
      </View>

      {/* Weekly History */}
      <View style={styles.weekHistory}>
        <Text style={styles.weekTitle}>Cette semaine</Text>
        <View style={styles.weekDays}>
          {history.map((day, index) => (
            <View key={index} style={styles.dayColumn}>
              <View
                style={[
                  styles.dayDot,
                  day.goalReached && styles.dayDotComplete,
                  day.percentage > 0 && !day.goalReached && styles.dayDotPartial,
                ]}
              >
                {day.goalReached && <Text style={styles.dayCheck}>✓</Text>}
              </View>
              <Text style={styles.dayName}>{day.dayName}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Goal Streak */}
      {goalStreak.current > 0 && (
        <View style={styles.goalStreakBox}>
          <Text style={styles.goalStreakEmoji}>🏆</Text>
          <Text style={styles.goalStreakText}>
            {goalStreak.current} jour{goalStreak.current > 1 ? 's' : ''} d'objectifs atteints
          </Text>
        </View>
      )}

      {/* Settings Modal */}
      <GoalSettingsModal
        visible={showSettings}
        currentGoal={progress.goal}
        onClose={() => setShowSettings(false)}
        onSave={async (goalId) => {
          await saveUserGoal(goalId);
          loadData();
          setShowSettings(false);
        }}
      />
    </View>
  );
}

/**
 * Modal pour changer l'objectif
 */
function GoalSettingsModal({ visible, currentGoal, onClose, onSave }) {
  const [selectedGoal, setSelectedGoal] = useState(currentGoal?.id || 'regular');
  const { DAILY_GOALS } = require('../services/onboardingService');

  useEffect(() => {
    if (currentGoal) {
      setSelectedGoal(currentGoal.id);
    }
  }, [currentGoal]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Objectif quotidien</Text>
          <Text style={styles.modalSubtitle}>
            Combien de temps veux-tu étudier chaque jour ?
          </Text>

          <View style={styles.goalOptions}>
            {DAILY_GOALS.map((goal) => (
              <TouchableOpacity
                key={goal.id}
                style={[
                  styles.goalOption,
                  selectedGoal === goal.id && styles.goalOptionSelected,
                ]}
                onPress={() => setSelectedGoal(goal.id)}
              >
                <Text style={styles.goalEmoji}>{goal.emoji}</Text>
                <View style={styles.goalInfo}>
                  <Text
                    style={[
                      styles.goalLabel,
                      selectedGoal === goal.id && styles.goalLabelSelected,
                    ]}
                  >
                    {goal.label}
                  </Text>
                  <Text style={styles.goalDescription}>{goal.description}</Text>
                </View>
                {selectedGoal === goal.id && (
                  <Text style={styles.goalCheck}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => onSave(selectedGoal)}
            >
              <Text style={styles.saveButtonText}>Enregistrer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

/**
 * Popup de célébration quand l'objectif est atteint
 */
export function GoalCompletedPopup({ visible, onClose, reward }) {
  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.celebrationOverlay}>
        <View style={styles.celebrationContent}>
          <Text style={styles.celebrationEmoji}>🎉</Text>
          <Text style={styles.celebrationTitle}>Objectif atteint !</Text>
          <Text style={styles.celebrationSubtitle}>
            Tu as terminé ton objectif du jour
          </Text>

          {reward && (
            <View style={styles.rewardBox}>
              <Text style={styles.rewardText}>+{reward.xp} XP</Text>
            </View>
          )}

          <TouchableOpacity style={styles.celebrationButton} onPress={onClose}>
            <Text style={styles.celebrationButtonText}>Super !</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  // Card styles
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.margin,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardEmoji: {
    fontSize: 18,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: FONTS.regular,
    fontWeight: '600',
    color: COLORS.text,
  },
  goalLabel: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
  },
  progressContainer: {
    marginBottom: SIZES.marginSmall,
  },
  progressBar: {
    height: 12,
    backgroundColor: COLORS.border,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  progressComplete: {
    backgroundColor: COLORS.success,
  },
  progressText: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    textAlign: 'right',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  messageText: {
    fontSize: FONTS.small,
    color: COLORS.text,
    flex: 1,
  },
  checkmark: {
    fontSize: 18,
    color: COLORS.success,
    fontWeight: 'bold',
  },

  // Section styles
  section: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.margin,
  },
  sectionTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  settingsButton: {
    fontSize: FONTS.small,
    color: COLORS.primary,
  },
  mainProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.paddingLarge,
  },
  circularProgress: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.padding,
  },
  circularEmoji: {
    fontSize: 24,
  },
  circularPercentage: {
    fontSize: FONTS.regular,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  progressInfo: {
    flex: 1,
  },
  progressMain: {
    fontSize: FONTS.xLarge,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  progressLabel: {
    fontSize: FONTS.regular,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  remainingText: {
    fontSize: FONTS.small,
    color: COLORS.primary,
    marginTop: 4,
  },

  // Week history
  weekHistory: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SIZES.padding,
    marginBottom: SIZES.margin,
  },
  weekTitle: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    marginBottom: SIZES.marginSmall,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayColumn: {
    alignItems: 'center',
  },
  dayDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  dayDotComplete: {
    backgroundColor: COLORS.success,
  },
  dayDotPartial: {
    backgroundColor: COLORS.primaryLight,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  dayCheck: {
    fontSize: 14,
    color: COLORS.textOnPrimary,
    fontWeight: 'bold',
  },
  dayName: {
    fontSize: FONTS.tiny,
    color: COLORS.textSecondary,
  },

  // Goal streak
  goalStreakBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.warningLight,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: SIZES.radius,
  },
  goalStreakEmoji: {
    fontSize: 16,
    marginRight: 8,
  },
  goalStreakText: {
    fontSize: FONTS.small,
    color: COLORS.warning,
    fontWeight: '600',
  },

  // Modal styles
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
    maxWidth: 340,
  },
  modalTitle: {
    fontSize: FONTS.xLarge,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.paddingLarge,
  },
  goalOptions: {
    marginBottom: SIZES.paddingLarge,
  },
  goalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  goalOptionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  goalEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  goalInfo: {
    flex: 1,
  },
  goalLabelSelected: {
    color: COLORS.primary,
  },
  goalDescription: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
  },
  goalCheck: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: FONTS.regular,
    color: COLORS.textSecondary,
  },
  saveButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: FONTS.regular,
    fontWeight: '600',
    color: COLORS.textOnPrimary,
  },

  // Celebration popup
  celebrationOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  celebrationContent: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLarge,
    padding: SIZES.paddingLarge * 1.5,
    alignItems: 'center',
    width: '80%',
    maxWidth: 300,
  },
  celebrationEmoji: {
    fontSize: 64,
    marginBottom: SIZES.margin,
  },
  celebrationTitle: {
    fontSize: FONTS.xxLarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  celebrationSubtitle: {
    fontSize: FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.paddingLarge,
  },
  rewardBox: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.paddingLarge,
  },
  rewardText: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  celebrationButton: {
    backgroundColor: COLORS.success,
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: SIZES.radius,
  },
  celebrationButtonText: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.textOnPrimary,
  },
});

export default DailyGoalCard;
