/**
 * Daily Challenge Card - Carte du défi quotidien pour HomeScreen
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SIZES } from '../styles/theme';

export default function DailyChallengeCard({ challenge, onPress }) {
  if (!challenge) {
    return null;
  }

  const difficultyColor =
    challenge.difficulty === 'easy'
      ? '#10b981'
      : challenge.difficulty === 'medium'
      ? '#f59e0b'
      : '#ef4444';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>🎯 Défi du Jour</Text>
          <Text style={styles.category}>{challenge.category}</Text>
        </View>
        <View style={[styles.difficultyBadge, { backgroundColor: difficultyColor }]}>
          <Text style={styles.difficultyText}>
            {challenge.difficulty === 'easy'
              ? 'Facile'
              : challenge.difficulty === 'medium'
              ? 'Moyen'
              : 'Difficile'}
          </Text>
        </View>
      </View>

      {/* Proverb */}
      <View style={styles.proverbContainer}>
        <Text style={styles.japanese}>{challenge.japanese}</Text>
        <Text style={styles.romaji}>{challenge.romaji}</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {challenge.completed ? (
          <View style={styles.completedBadge}>
            <Text style={styles.completedText}>✅ Complété</Text>
          </View>
        ) : (
          <View style={styles.xpBadge}>
            <Text style={styles.xpText}>{`+${challenge.xpReward} XP`}</Text>
          </View>
        )}
        <Text style={styles.ctaText}>Toucher pour voir ›</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    marginBottom: SIZES.margin,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SIZES.margin,
  },
  title: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 2,
  },
  category: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    textTransform: 'capitalize',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    color: 'white',
    fontSize: FONTS.tiny,
    fontWeight: 'bold',
  },
  proverbContainer: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.margin,
  },
  japanese: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  romaji: {
    fontSize: FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  xpBadge: {
    backgroundColor: COLORS.success + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.success,
  },
  xpText: {
    color: COLORS.success,
    fontSize: FONTS.small,
    fontWeight: 'bold',
  },
  completedBadge: {
    backgroundColor: COLORS.success + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  completedText: {
    color: COLORS.success,
    fontSize: FONTS.small,
    fontWeight: 'bold',
  },
  ctaText: {
    fontSize: FONTS.small,
    color: COLORS.primary,
    fontWeight: '600',
  },
});
