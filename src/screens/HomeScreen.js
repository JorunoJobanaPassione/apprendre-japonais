import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Animated
} from 'react-native';
import { lessons } from '../data/lessons';
import { loadStats, loadStreak, updateStreak, getAdvancedStats, loadBadges } from '../utils/storage';
import { checkUnlockedBadges, getAllUnlockedBadges } from '../data/badges';
import { AnimatedCard } from '../components';

export default function HomeScreen({ navigation }) {
  const [stats, setStats] = useState({
    lessonsCompleted: [],
    totalScore: 0,
    averageScore: 0
  });
  const [streak, setStreak] = useState({ currentStreak: 0, longestStreak: 0 });
  const [advancedStats, setAdvancedStats] = useState(null);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    loadAllData();

    // Focus listener pour recharger les données quand on revient à l'écran
    const unsubscribe = navigation.addListener('focus', () => {
      loadAllData();
    });

    return unsubscribe;
  }, [navigation]);

  const loadAllData = async () => {
    const savedStats = await loadStats();
    const streakData = await updateStreak();
    const advanced = await getAdvancedStats();
    const savedBadges = await loadBadges();

    setStats(savedStats);
    setStreak(streakData);
    setAdvancedStats(advanced);
    setBadges(savedBadges);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  const renderLessonItem = ({ item, index }) => {
    const isCompleted = stats.lessonsCompleted.includes(item.id);
    const isLocked = !item.free;

    return (
      <AnimatedCard
        style={[
          styles.lessonCard,
          isLocked && styles.lockedCard
        ]}
        onPress={() => {
          if (isLocked) {
            alert('Cette leçon est premium 🔒');
          } else {
            navigation.navigate('LessonConfig', { lesson: item, lessonIndex: index });
          }
        }}
        disabled={Boolean(isLocked)}
      >
        <View style={styles.lessonHeader}>
          <Text style={styles.lessonNumber}>Leçon {index + 1}</Text>
          {isLocked && <Text style={styles.lockIcon}>🔒</Text>}
          {isCompleted && !isLocked && <Text style={styles.checkIcon}>✓</Text>}
        </View>
        <Text style={styles.lessonTitle}>{item.title}</Text>
        <Text style={styles.lessonDescription}>{item.description}</Text>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>
            {item.level === 'beginner' ? '🟢 Débutant' :
             item.level === 'intermediate' ? '🟡 Intermédiaire' : '🔴 Avancé'}
          </Text>
        </View>
      </AnimatedCard>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />

      <View style={styles.header}>
        <Text style={styles.greeting}>{getGreeting()} 👋</Text>
        <Text style={styles.headerTitle}>App Japonais</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Streak Card */}
        <AnimatedCard
          style={styles.streakCard}
          onPress={() => navigation.navigate('Stats')}
        >
          <View style={styles.streakLeft}>
            <Text style={styles.streakIcon}>🔥</Text>
            <View>
              <Text style={styles.streakNumber}>{streak?.currentStreak || 0} jours</Text>
              <Text style={styles.streakLabel}>Série actuelle</Text>
            </View>
          </View>
          <View style={styles.streakRight}>
            <Text style={styles.streakRecord}>Record: {streak?.longestStreak || 0}</Text>
          </View>
        </AnimatedCard>

        {/* Quick Stats */}
        <View style={styles.quickStats}>
          <AnimatedCard
            style={styles.quickStatCard}
            onPress={() => navigation.navigate('Stats')}
          >
            <Text style={styles.quickStatIcon}>📊</Text>
            <Text style={styles.quickStatValue}>{stats.lessonsCompleted.length}/10</Text>
            <Text style={styles.quickStatLabel}>Leçons</Text>
          </AnimatedCard>

          <AnimatedCard
            style={styles.quickStatCard}
            onPress={() => navigation.navigate('Badges')}
          >
            <Text style={styles.quickStatIcon}>🏆</Text>
            <Text style={styles.quickStatValue}>{badges.length}</Text>
            <Text style={styles.quickStatLabel}>Badges</Text>
          </AnimatedCard>

          <AnimatedCard
            style={styles.quickStatCard}
            onPress={() => navigation.navigate('Stats')}
          >
            <Text style={styles.quickStatIcon}>⭐</Text>
            <Text style={styles.quickStatValue}>
              {stats.averageScore ? `${Math.round(stats.averageScore)}%` : '0%'}
            </Text>
            <Text style={styles.quickStatLabel}>Moyenne</Text>
          </AnimatedCard>
        </View>

        {/* Section Title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>📚 Vos leçons</Text>
        </View>

        {/* Lessons List */}
        <View style={styles.listContainer}>
          {lessons.map((item, index) => (
            <View key={item.id}>
              {renderLessonItem({ item, index })}
            </View>
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    backgroundColor: '#667eea',
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  streakCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  streakLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  streakNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f59e0b',
  },
  streakLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  streakRight: {
    alignItems: 'flex-end',
  },
  streakRecord: {
    fontSize: 14,
    color: '#9ca3af',
    fontWeight: '600',
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    gap: 10,
  },
  quickStatCard: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickStatIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  quickStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  quickStatLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  lessonCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lockedCard: {
    opacity: 0.6,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  lessonNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
  },
  lockIcon: {
    fontSize: 20,
  },
  checkIcon: {
    fontSize: 24,
    color: '#10b981',
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  lessonDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  levelBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#f3f4f6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  levelText: {
    fontSize: 12,
    color: '#4b5563',
    fontWeight: '600',
  },
});
