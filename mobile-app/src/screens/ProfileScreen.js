/**
 * Profile Screen - Profil utilisateur avec stats et badges
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { getProgress } from '../services/storage';
import { COLORS, FONTS, SIZES } from '../styles/theme';
import globalStyles from '../styles/globalStyles';

export default function ProfileScreen() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const userProgress = await getProgress();
      setProgress(userProgress);
    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={globalStyles.loadingContainer}>
        <Text style={globalStyles.text}>Chargement...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarEmoji}>👤</Text>
          </View>
          <Text style={styles.name}>Apprenant Japonais</Text>
          <Text style={styles.level}>{`Niveau ${progress?.level || 1}`}</Text>
        </View>

        {/* Stats */}
        <View style={globalStyles.card}>
          <Text style={styles.cardTitle}>📊 Statistiques</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{`${progress?.totalPoints || 0}`}</Text>
              <Text style={styles.statLabel}>Points XP</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{`${progress?.streak || 0}`}</Text>
              <Text style={styles.statLabel}>Jours de suite 🔥</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>
                {`${progress?.stats?.lessonsCompleted || 0}`}
              </Text>
              <Text style={styles.statLabel}>Leçons complétées</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>
                {`${progress?.stats?.wordsLearned || 0}`}
              </Text>
              <Text style={styles.statLabel}>Mots appris</Text>
            </View>
          </View>
        </View>

        {/* Badges */}
        <View style={globalStyles.card}>
          <Text style={styles.cardTitle}>🏆 Badges</Text>
          <Text style={globalStyles.textSecondary}>
            {`${progress?.badges?.length || 0} badges débloqués`}
          </Text>
          <Text style={[globalStyles.textMuted, { marginTop: 8 }]}>
            Le système de badges arrive bientôt !
          </Text>
        </View>

        {/* Progression */}
        <View style={globalStyles.card}>
          <Text style={styles.cardTitle}>📈 Progression</Text>
          <Text style={globalStyles.textSecondary}>
            Tu as commencé ton apprentissage !
          </Text>
          <Text style={[globalStyles.textMuted, { marginTop: 8 }]}>
            Continue comme ça pour débloquer plus de statistiques.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: 'center',
    padding: SIZES.screenPadding,
    paddingTop: SIZES.paddingLarge,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.margin,
  },
  avatarEmoji: {
    fontSize: 48,
  },
  name: {
    fontSize: FONTS.xxLarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  level: {
    fontSize: FONTS.regular,
    color: COLORS.primary,
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.margin,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SIZES.marginSmall,
  },
  statBox: {
    width: '50%',
    padding: SIZES.marginSmall,
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
    textAlign: 'center',
    marginTop: 4,
  },
});
