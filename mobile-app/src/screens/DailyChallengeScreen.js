/**
 * Daily Challenge Screen - Écran du défi quotidien
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../styles/theme';
import { getDailyChallenge, completeDailyChallenge } from '../services/dailyChallengesSystem';
import { incrementQuestProgress } from '../services/questsSystem';

export default function DailyChallengeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [challenge, setChallenge] = useState(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    loadChallenge();
  }, []);

  const loadChallenge = async () => {
    try {
      setLoading(true);
      const todayChallenge = await getDailyChallenge();
      setChallenge(todayChallenge);
      setRevealed(todayChallenge.completed);
    } catch (error) {
      console.error('Error loading challenge:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReveal = () => {
    setRevealed(true);
  };

  const handleComplete = async () => {
    try {
      const xpEarned = await completeDailyChallenge();

      // Incrémenter quête daily_challenge
      await incrementQuestProgress('daily_challenge');

      Alert.alert(
        '🎉 Défi complété !',
        `Bravo ! Tu as gagné ${xpEarned} XP.\n\nReviens demain pour un nouveau défi !`,
        [
          {
            text: 'OK',
            onPress: () => {
              setChallenge({ ...challenge, completed: true });
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error completing challenge:', error);
      Alert.alert('Erreur', 'Impossible de compléter le défi.');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Chargement du défi...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!challenge) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Aucun défi disponible</Text>
        </View>
      </SafeAreaView>
    );
  }

  const difficultyColor =
    challenge.difficulty === 'easy'
      ? '#10b981'
      : challenge.difficulty === 'medium'
      ? '#f59e0b'
      : '#ef4444';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>🎯 Défi du Jour</Text>
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

        {/* Category */}
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryLabel}>Catégorie</Text>
          <Text style={styles.categoryValue}>{challenge.category}</Text>
        </View>

        {/* Proverb Card */}
        <View style={styles.proverbCard}>
          {/* Japanese */}
          <View style={styles.textSection}>
            <Text style={styles.label}>Japonais (Kanji)</Text>
            <Text style={styles.japanese}>{challenge.japanese}</Text>
          </View>

          {/* Hiragana */}
          <View style={styles.textSection}>
            <Text style={styles.label}>Hiragana</Text>
            <Text style={styles.hiragana}>{challenge.hiragana}</Text>
          </View>

          {/* Romaji */}
          <View style={styles.textSection}>
            <Text style={styles.label}>Prononciation (Romaji)</Text>
            <Text style={styles.romaji}>{challenge.romaji}</Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Reveal Section */}
          {!revealed ? (
            <TouchableOpacity style={styles.revealButton} onPress={handleReveal}>
              <Text style={styles.revealButtonText}>🔍 Voir la traduction et le sens</Text>
            </TouchableOpacity>
          ) : (
            <View>
              {/* Translation */}
              <View style={styles.textSection}>
                <Text style={styles.label}>Traduction littérale</Text>
                <Text style={styles.translation}>{challenge.translation}</Text>
              </View>

              {/* Meaning */}
              <View style={styles.textSection}>
                <Text style={styles.label}>Signification</Text>
                <Text style={styles.meaning}>{challenge.meaning}</Text>
              </View>

              {/* Cultural Context */}
              <View style={styles.culturalSection}>
                <Text style={styles.culturalLabel}>💡 Contexte culturel</Text>
                <Text style={styles.culturalText}>{challenge.culturalContext}</Text>
              </View>
            </View>
          )}
        </View>

        {/* XP Reward */}
        <View style={styles.rewardCard}>
          <Text style={styles.rewardLabel}>Récompense</Text>
          <Text style={styles.rewardValue}>{`+${challenge.xpReward} XP`}</Text>
        </View>

        {/* Complete Button */}
        {revealed && !challenge.completed && (
          <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
            <Text style={styles.completeButtonText}>✅ Marquer comme complété</Text>
          </TouchableOpacity>
        )}

        {challenge.completed && (
          <View style={styles.completedBanner}>
            <Text style={styles.completedText}>✅ Défi complété !</Text>
            <Text style={styles.completedSubtext}>Reviens demain pour un nouveau défi</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: SIZES.margin,
    fontSize: FONTS.regular,
    color: COLORS.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: FONTS.regular,
    color: COLORS.textSecondary,
  },
  scrollView: {
    flex: 1,
    padding: SIZES.screenPadding,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.marginLarge,
  },
  title: {
    fontSize: FONTS.xxLarge,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  difficultyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  difficultyText: {
    color: 'white',
    fontSize: FONTS.small,
    fontWeight: 'bold',
  },
  categoryContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.margin,
    alignItems: 'center',
  },
  categoryLabel: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  categoryValue: {
    fontSize: FONTS.regular,
    fontWeight: '600',
    color: COLORS.primary,
    textTransform: 'capitalize',
  },
  proverbCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    marginBottom: SIZES.margin,
  },
  textSection: {
    marginBottom: SIZES.margin,
  },
  label: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    marginBottom: 4,
    fontWeight: '500',
  },
  japanese: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
  },
  hiragana: {
    fontSize: 24,
    color: COLORS.text,
    textAlign: 'center',
  },
  romaji: {
    fontSize: FONTS.large,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SIZES.margin,
  },
  revealButton: {
    backgroundColor: COLORS.primary,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  revealButtonText: {
    color: 'white',
    fontSize: FONTS.regular,
    fontWeight: 'bold',
  },
  translation: {
    fontSize: FONTS.large,
    color: COLORS.text,
    fontWeight: '600',
  },
  meaning: {
    fontSize: FONTS.regular,
    color: COLORS.text,
    lineHeight: 24,
  },
  culturalSection: {
    backgroundColor: COLORS.surfaceLight,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginTop: SIZES.margin,
  },
  culturalLabel: {
    fontSize: FONTS.regular,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  culturalText: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  rewardCard: {
    backgroundColor: COLORS.success + '20',
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.margin,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.success,
  },
  rewardLabel: {
    fontSize: FONTS.regular,
    fontWeight: '600',
    color: COLORS.success,
  },
  rewardValue: {
    fontSize: FONTS.xLarge,
    fontWeight: 'bold',
    color: COLORS.success,
  },
  completeButton: {
    backgroundColor: COLORS.success,
    padding: SIZES.padding * 1.5,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    marginBottom: SIZES.margin,
  },
  completeButtonText: {
    color: 'white',
    fontSize: FONTS.regular,
    fontWeight: 'bold',
  },
  completedBanner: {
    backgroundColor: COLORS.success + '20',
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.success,
  },
  completedText: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.success,
    marginBottom: 4,
  },
  completedSubtext: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
  },
});
