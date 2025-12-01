import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { getAdvancedStats, loadStats, loadStreak } from '../utils/storage';
import { lessons } from '../data/lessons';

const { width } = Dimensions.get('window');

const StatsScreen = ({ navigation }) => {
  const [stats, setStats] = useState(null);
  const [streak, setStreak] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const advancedStats = await getAdvancedStats();
    const statsData = await loadStats();
    const streakData = await loadStreak();
    setStats(advancedStats);
    setStreak(streakData);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  const getLevel = () => {
    const completed = stats?.completedLessons || 0;
    if (completed === 0) return 'Débutant';
    if (completed < 5) return 'Apprenti';
    if (completed < 8) return 'Intermédiaire';
    if (completed === 10) return 'Maître';
    return 'Débutant';
  };

  const getLevelProgress = () => {
    const completed = stats?.completedLessons || 0;
    return Math.min((completed / 10) * 100, 100);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Retour</Text>
        </TouchableOpacity>
        <Text style={styles.title}>📊 Statistiques</Text>
      </View>

      <ScrollView style={styles.scroll}>
        {/* Niveau */}
        <View style={styles.card}>
          <View style={styles.levelHeader}>
            <Text style={styles.levelIcon}>🎓</Text>
            <View style={styles.levelInfo}>
              <Text style={styles.levelTitle}>Niveau actuel</Text>
              <Text style={styles.levelName}>{getLevel()}</Text>
            </View>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${getLevelProgress()}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {stats?.completedLessons || 0} / 10 leçons complétées
          </Text>
        </View>

        {/* Série (Streak) */}
        <View style={styles.card}>
          <View style={styles.streakHeader}>
            <Text style={styles.streakIcon}>🔥</Text>
            <View>
              <Text style={styles.cardTitle}>Série actuelle</Text>
              <Text style={styles.streakNumber}>{streak?.currentStreak || 0} jours</Text>
            </View>
          </View>
          <View style={styles.streakDetails}>
            <View style={styles.streakItem}>
              <Text style={styles.streakLabel}>Record</Text>
              <Text style={styles.streakValue}>{streak?.longestStreak || 0} jours</Text>
            </View>
            <View style={styles.streakDivider} />
            <View style={styles.streakItem}>
              <Text style={styles.streakLabel}>Dernière étude</Text>
              <Text style={styles.streakValue}>
                {streak?.lastStudyDate
                  ? new Date(streak.lastStudyDate).toLocaleDateString('fr-FR')
                  : 'Jamais'}
              </Text>
            </View>
          </View>
        </View>

        {/* Stats principales */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>⭐</Text>
            <Text style={styles.statValue}>{Math.round(stats?.averageScore || 0)}%</Text>
            <Text style={styles.statLabel}>Score moyen</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🎯</Text>
            <Text style={styles.statValue}>{stats?.bestScore || 0}%</Text>
            <Text style={styles.statLabel}>Meilleur score</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>💯</Text>
            <Text style={styles.statValue}>{stats?.perfectScores || 0}</Text>
            <Text style={styles.statLabel}>Scores parfaits</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🏆</Text>
            <Text style={styles.statValue}>{stats?.unlockedBadges || 0}</Text>
            <Text style={styles.statLabel}>Badges</Text>
          </View>
        </View>

        {/* Progression par leçon */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📚 Progression par leçon</Text>
          {lessons.map((lesson, index) => {
            const completed = stats?.completedLessons >= index + 1;
            return (
              <View key={lesson.id} style={styles.lessonRow}>
                <View style={styles.lessonLeft}>
                  <View style={[
                    styles.lessonIndicator,
                    completed && styles.lessonIndicatorCompleted
                  ]}>
                    <Text style={styles.lessonNumber}>
                      {completed ? '✓' : index + 1}
                    </Text>
                  </View>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                </View>
                {completed && (
                  <View style={styles.lessonBadge}>
                    <Text style={styles.lessonBadgeText}>Terminée</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Activité récente */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📅 Activité récente</Text>
          <View style={styles.activityCalendar}>
            {[...Array(7)].map((_, i) => {
              const date = new Date();
              date.setDate(date.getDate() - (6 - i));
              const dayName = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'][date.getDay()];
              const isToday = i === 6;
              const hasActivity = Math.random() > 0.5; // À remplacer par vraies données

              return (
                <View key={i} style={styles.calendarDay}>
                  <Text style={styles.calendarDayName}>{dayName}</Text>
                  <View style={[
                    styles.calendarDot,
                    hasActivity && styles.calendarDotActive,
                    isToday && styles.calendarDotToday
                  ]} />
                </View>
              );
            })}
          </View>
        </View>

        {/* Objectifs */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎯 Objectifs</Text>
          <View style={styles.goalItem}>
            <View style={styles.goalHeader}>
              <Text style={styles.goalTitle}>Terminer toutes les leçons</Text>
              <Text style={styles.goalPercent}>{getLevelProgress().toFixed(0)}%</Text>
            </View>
            <View style={styles.goalBar}>
              <View style={[styles.goalFill, { width: `${getLevelProgress()}%` }]} />
            </View>
          </View>

          <View style={styles.goalItem}>
            <View style={styles.goalHeader}>
              <Text style={styles.goalTitle}>Série de 7 jours</Text>
              <Text style={styles.goalPercent}>
                {Math.min(((streak?.currentStreak || 0) / 7) * 100, 100).toFixed(0)}%
              </Text>
            </View>
            <View style={styles.goalBar}>
              <View style={[
                styles.goalFill,
                { width: `${Math.min(((streak?.currentStreak || 0) / 7) * 100, 100)}%` }
              ]} />
            </View>
          </View>

          <View style={styles.goalItem}>
            <View style={styles.goalHeader}>
              <Text style={styles.goalTitle}>5 scores parfaits</Text>
              <Text style={styles.goalPercent}>
                {Math.min(((stats?.perfectScores || 0) / 5) * 100, 100).toFixed(0)}%
              </Text>
            </View>
            <View style={styles.goalBar}>
              <View style={[
                styles.goalFill,
                { width: `${Math.min(((stats?.perfectScores || 0) / 5) * 100, 100)}%` }
              ]} />
            </View>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa'
  },
  header: {
    backgroundColor: '#667eea',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20
  },
  backButton: {
    marginBottom: 10
  },
  backText: {
    color: '#fff',
    fontSize: 16
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff'
  },
  scroll: {
    flex: 1
  },
  card: {
    backgroundColor: '#fff',
    margin: 15,
    marginBottom: 0,
    marginTop: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15
  },
  levelIcon: {
    fontSize: 48,
    marginRight: 15
  },
  levelInfo: {
    flex: 1
  },
  levelTitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5
  },
  levelName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#667eea'
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e5e7eb',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#667eea',
    borderRadius: 5
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center'
  },
  streakHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  streakIcon: {
    fontSize: 48,
    marginRight: 15
  },
  streakNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f59e0b'
  },
  streakDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb'
  },
  streakItem: {
    alignItems: 'center',
    flex: 1
  },
  streakDivider: {
    width: 1,
    backgroundColor: '#e5e7eb'
  },
  streakLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 5
  },
  streakValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937'
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 7.5,
    marginTop: 15
  },
  statCard: {
    width: (width - 45) / 2,
    backgroundColor: '#fff',
    margin: 7.5,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  statIcon: {
    fontSize: 36,
    marginBottom: 10
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center'
  },
  lessonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6'
  },
  lessonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  lessonIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  lessonIndicatorCompleted: {
    backgroundColor: '#10b981'
  },
  lessonNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff'
  },
  lessonTitle: {
    fontSize: 14,
    color: '#1f2937',
    flex: 1
  },
  lessonBadge: {
    backgroundColor: '#d1fae5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12
  },
  lessonBadgeText: {
    fontSize: 12,
    color: '#065f46',
    fontWeight: '600'
  },
  activityCalendar: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  calendarDay: {
    alignItems: 'center'
  },
  calendarDayName: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8
  },
  calendarDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f3f4f6'
  },
  calendarDotActive: {
    backgroundColor: '#10b981'
  },
  calendarDotToday: {
    borderWidth: 2,
    borderColor: '#667eea'
  },
  goalItem: {
    marginBottom: 20
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  goalTitle: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '500'
  },
  goalPercent: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600'
  },
  goalBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden'
  },
  goalFill: {
    height: '100%',
    backgroundColor: '#667eea',
    borderRadius: 4
  }
});

export default StatsScreen;
