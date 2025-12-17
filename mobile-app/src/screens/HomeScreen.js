/**
 * Home Screen - Version Connectée aux Services
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS, FONTS, SIZES } from '../styles/theme';
import { getLives, gainLife } from '../services/livesSystem';
import { getAllCards, getCardsForReview } from '../services/srsSystem';
import { getDailyChallenge } from '../services/dailyChallengesSystem';
import { getDailyQuests } from '../services/questsSystem';
import { getCurrentStreak, updateStreak } from '../services/streakSystem';
import LivesIndicator from '../components/LivesIndicator';
import DailyChallengeCard from '../components/DailyChallengeCard';
import QuestCard from '../components/QuestCard';
import LivesRecoveryModal from '../components/LivesRecoveryModal';
import StreakIndicator from '../components/StreakIndicator';
import AdBanner from '../components/AdBanner';

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [lives, setLives] = useState(7);
  const [reviewCount, setReviewCount] = useState(0);
  const [totalCards, setTotalCards] = useState(0);
  const [dailyChallenge, setDailyChallenge] = useState(null);
  const [dailyQuests, setDailyQuests] = useState([]);
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);

  const loadData = async () => {
    try {
      setLoading(true);

      // Charger les vies
      const currentLives = await getLives();
      setLives(currentLives);

      // Charger les cartes SRS
      const cards = await getAllCards();
      const cardsToReview = await getCardsForReview();
      setTotalCards(cards.length);
      setReviewCount(cardsToReview.length);

      // Charger le défi quotidien
      const todayChallenge = await getDailyChallenge();
      setDailyChallenge(todayChallenge);

      // Charger les quêtes quotidiennes
      const quests = await getDailyQuests();
      setDailyQuests(quests);

      // Charger et mettre à jour le streak (Feature Anti-Duolingo)
      const streakResult = await updateStreak();
      const streak = await getCurrentStreak();
      setCurrentStreak(streak);

      // Afficher message si milestone atteint
      if (streakResult.milestone?.unlocked) {
        console.log(`🏆 Milestone atteint : ${streakResult.milestone.milestone.name}`);
      }
    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Recharger les données à chaque fois que l'écran est affiché
  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  // Handler pour récupération de vie
  const handleLifeRecovered = async () => {
    const newLives = await gainLife();
    setLives(newLives);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Bonjour ! 👋</Text>
          <Text style={styles.subtitle}>Prêt à apprendre le japonais ?</Text>

          {/* Lives Indicator */}
          <View style={styles.livesContainer}>
            <LivesIndicator lives={lives} maxLives={7} />
            {lives < 7 && (
              <TouchableOpacity
                style={styles.recoveryButton}
                onPress={() => setShowRecoveryModal(true)}
              >
                <Text style={styles.recoveryButtonText}>
                  ❤️ Récupérer une vie
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Daily Challenge Card */}
        {dailyChallenge && (
          <DailyChallengeCard
            challenge={dailyChallenge}
            onPress={() => navigation.navigate('DailyChallenge')}
          />
        )}

        {/* Quêtes du Jour */}
        {dailyQuests.length > 0 && (
          <View style={styles.card}>
            <View style={styles.questsHeader}>
              <Text style={styles.cardTitle}>🎯 Quêtes du Jour</Text>
              <Text style={styles.questsProgress}>
                {`${dailyQuests.filter((q) => q.completed).length}/${dailyQuests.length}`}
              </Text>
            </View>
            {dailyQuests.map((quest, index) => (
              <QuestCard key={quest.id || index} quest={quest} />
            ))}
            {dailyQuests.every((q) => q.completed) && (
              <View style={styles.allCompletedBanner}>
                <Text style={styles.allCompletedText}>
                  ✨ Toutes les quêtes complétées !
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Streak Indicator */}
        <StreakIndicator />

        {/* Stats Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📊 Ta Progression</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{`${totalCards}`}</Text>
              <Text style={styles.statLabel}>Cartes SRS</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{`${currentStreak}`}</Text>
              <Text style={styles.statLabel}>Jours 🔥</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Points XP</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎯 Actions Rapides</Text>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Lessons')}
          >
            <Text style={styles.actionEmoji}>📚</Text>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Commencer une leçon</Text>
              <Text style={styles.actionSubtitle}>22 leçons disponibles</Text>
            </View>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('SRS')}
          >
            <Text style={styles.actionEmoji}>🔄</Text>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Révisions SRS</Text>
              <Text style={styles.actionSubtitle}>
                {reviewCount > 0
                  ? `${reviewCount} carte${reviewCount > 1 ? 's' : ''} à réviser`
                  : 'Aucune révision pour le moment'}
              </Text>
            </View>
            {reviewCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{`${reviewCount}`}</Text>
              </View>
            )}
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.actionEmoji}>👤</Text>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Voir ton profil</Text>
              <Text style={styles.actionSubtitle}>Stats et badges</Text>
            </View>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Info */}
        <View style={styles.card}>
          <Text style={styles.infoText}>
            ✨ App Version 1.5.0{'\n'}
            🎯 42 leçons • 102 kanji • 400+ exercices
          </Text>
        </View>

        {/* Ad Banner (hidden for Premium users) */}
        <AdBanner style={styles.adBanner} />
      </ScrollView>

      {/* Lives Recovery Modal */}
      <LivesRecoveryModal
        visible={showRecoveryModal}
        onClose={() => setShowRecoveryModal(false)}
        onRecovered={handleLifeRecovered}
      />
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
  scrollView: {
    flex: 1,
    padding: SIZES.screenPadding,
  },
  header: {
    marginBottom: SIZES.marginLarge,
  },
  greeting: {
    fontSize: FONTS.xxxLarge,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: FONTS.regular,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  livesContainer: {
    marginTop: SIZES.margin,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    marginBottom: SIZES.margin,
  },
  cardTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.margin,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONTS.xxxLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.marginSmall,
  },
  actionEmoji: {
    fontSize: 32,
    marginRight: SIZES.margin,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: FONTS.regular,
    fontWeight: '600',
    color: COLORS.text,
  },
  actionSubtitle: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  actionArrow: {
    fontSize: 32,
    color: COLORS.textMuted,
  },
  badge: {
    backgroundColor: COLORS.error,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginRight: SIZES.marginSmall,
  },
  badgeText: {
    color: 'white',
    fontSize: FONTS.small,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  questsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.margin,
  },
  questsProgress: {
    fontSize: FONTS.regular,
    fontWeight: 'bold',
    color: COLORS.primary,
    backgroundColor: COLORS.primary + '20',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: SIZES.radiusSmall,
  },
  allCompletedBanner: {
    backgroundColor: COLORS.success + '20',
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginTop: SIZES.marginSmall,
    alignItems: 'center',
  },
  allCompletedText: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: COLORS.success,
  },
  recoveryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginTop: SIZES.marginSmall,
    alignItems: 'center',
  },
  recoveryButtonText: {
    fontSize: FONTS.medium,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  adBanner: {
    marginVertical: SIZES.margin,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
  },
});
