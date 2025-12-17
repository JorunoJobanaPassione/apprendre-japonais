/**
 * Quest Card Component - Affichage d'une quête quotidienne
 * Design: Progress bar animée + reward badge + check animation
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../styles/theme';

export default function QuestCard({ quest }) {
  if (!quest) return null;

  const { title, description, icon, target, progress, completed, reward } = quest;

  // Calculer le pourcentage de progression
  const percentage = Math.min((progress / target) * 100, 100);

  // Formater la description avec la target
  const formattedDescription = description.replace('{target}', target);

  return (
    <View style={[styles.container, completed && styles.containerCompleted]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{icon}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{formattedDescription}</Text>

          {/* Progress */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progressBar,
                  { width: `${percentage}%` },
                  completed && styles.progressBarCompleted,
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {`${progress}/${target}`}
            </Text>
          </View>
        </View>

        {/* Reward badge */}
        {!completed ? (
          <View style={styles.rewardBadge}>
            <Text style={styles.rewardText}>
              {`+${reward.xp} XP`}
            </Text>
            {reward.lives && (
              <Text style={styles.rewardLives}>{`+${reward.lives} ❤️`}</Text>
            )}
          </View>
        ) : (
          <View style={styles.completedBadge}>
            <Text style={styles.completedCheck}>✅</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.marginSmall,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  containerCompleted: {
    borderColor: COLORS.success,
    backgroundColor: COLORS.success + '10',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.margin,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: FONTS.medium,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 2,
  },
  description: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    marginBottom: SIZES.marginSmall,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.marginSmall,
  },
  progressBackground: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    transition: 'width 0.3s ease',
  },
  progressBarCompleted: {
    backgroundColor: COLORS.success,
  },
  progressText: {
    fontSize: FONTS.small,
    fontWeight: '600',
    color: COLORS.textMuted,
    minWidth: 40,
    textAlign: 'right',
  },
  rewardBadge: {
    backgroundColor: COLORS.primary + '20',
    borderRadius: SIZES.radiusSmall,
    padding: SIZES.paddingSmall,
    marginLeft: SIZES.marginSmall,
    alignItems: 'center',
    minWidth: 60,
  },
  rewardText: {
    fontSize: FONTS.small,
    fontWeight: '700',
    color: COLORS.primary,
  },
  rewardLives: {
    fontSize: FONTS.tiny,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  completedBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.success + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SIZES.marginSmall,
  },
  completedCheck: {
    fontSize: 24,
  },
});
