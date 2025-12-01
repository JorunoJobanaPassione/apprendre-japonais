import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { badges, BADGE_CATEGORIES, getAllUnlockedBadges, getBadgesByCategory } from '../data/badges';
import { loadBadges, getAdvancedStats } from '../utils/storage';

const { width } = Dimensions.get('window');

const BadgesScreen = ({ navigation }) => {
  const [unlockedBadges, setUnlockedBadges] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [userStats, setUserStats] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const savedBadges = await loadBadges();
    const stats = await getAdvancedStats();
    setUnlockedBadges(savedBadges);
    setUserStats(stats);
  };

  const isUnlocked = (badgeId) => {
    return unlockedBadges.some(b => b.id === badgeId);
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return '#9CA3AF';
      case 'rare': return '#3B82F6';
      case 'epic': return '#8B5CF6';
      case 'legendary': return '#F59E0B';
      default: return '#9CA3AF';
    }
  };

  const getRarityLabel = (rarity) => {
    switch (rarity) {
      case 'common': return 'Commun';
      case 'rare': return 'Rare';
      case 'epic': return 'Épique';
      case 'legendary': return 'Légendaire';
      default: return 'Commun';
    }
  };

  const filteredBadges = selectedCategory === 'all'
    ? badges
    : badges.filter(b => b.category === selectedCategory);

  const categories = [
    { key: 'all', label: 'Tous', icon: '🏆' },
    { key: BADGE_CATEGORIES.PROGRESS, label: 'Progression', icon: '🎯' },
    { key: BADGE_CATEGORIES.MASTERY, label: 'Maîtrise', icon: '⭐' },
    { key: BADGE_CATEGORIES.STREAK, label: 'Séries', icon: '🔥' },
    { key: BADGE_CATEGORIES.PERFECT, label: 'Parfaits', icon: '💯' },
    { key: BADGE_CATEGORIES.SPEED, label: 'Vitesse', icon: '⚡' },
    { key: BADGE_CATEGORIES.SPECIAL, label: 'Spéciaux', icon: '🎊' }
  ];

  const progress = Math.round((unlockedBadges.length / badges.length) * 100);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Retour</Text>
        </TouchableOpacity>
        <Text style={styles.title}>🏆 Badges</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {unlockedBadges.length} / {badges.length}
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressPercent}>{progress}%</Text>
        </View>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map(cat => (
          <TouchableOpacity
            key={cat.key}
            style={[
              styles.categoryButton,
              selectedCategory === cat.key && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory(cat.key)}
          >
            <Text style={styles.categoryIcon}>{cat.icon}</Text>
            <Text style={[
              styles.categoryText,
              selectedCategory === cat.key && styles.categoryTextActive
            ]}>
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Badges Grid */}
      <ScrollView style={styles.badgesScroll}>
        <View style={styles.badgesGrid}>
          {filteredBadges.map(badge => {
            const unlocked = isUnlocked(badge.id);
            return (
              <View
                key={badge.id}
                style={[
                  styles.badgeCard,
                  !unlocked && styles.badgeCardLocked
                ]}
              >
                <View style={[
                  styles.badgeIconContainer,
                  { borderColor: getRarityColor(badge.rarity) }
                ]}>
                  <Text style={[
                    styles.badgeIcon,
                    !unlocked && styles.badgeIconLocked
                  ]}>
                    {badge.icon}
                  </Text>
                </View>
                <Text style={[
                  styles.badgeTitle,
                  !unlocked && styles.badgeTextLocked
                ]}>
                  {badge.title}
                </Text>
                <Text style={[
                  styles.badgeDescription,
                  !unlocked && styles.badgeTextLocked
                ]}>
                  {badge.description}
                </Text>
                <Text style={[
                  styles.badgeRarity,
                  { color: getRarityColor(badge.rarity) }
                ]}>
                  {getRarityLabel(badge.rarity)}
                </Text>
                {unlocked && (
                  <View style={styles.unlockedBadge}>
                    <Text style={styles.unlockedText}>✓ Débloqué</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
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
    color: '#fff',
    marginBottom: 15
  },
  progressContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 15
  },
  progressText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 5
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4
  },
  progressPercent: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'right'
  },
  categoriesScroll: {
    maxHeight: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  categoriesContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 10
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 10
  },
  categoryButtonActive: {
    backgroundColor: '#667eea'
  },
  categoryIcon: {
    fontSize: 18,
    marginRight: 6
  },
  categoryText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600'
  },
  categoryTextActive: {
    color: '#fff'
  },
  badgesScroll: {
    flex: 1
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    gap: 10
  },
  badgeCard: {
    width: (width - 40) / 2,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  badgeCardLocked: {
    opacity: 0.5,
    backgroundColor: '#f9fafb'
  },
  badgeIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f3f4f6',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  badgeIcon: {
    fontSize: 36
  },
  badgeIconLocked: {
    opacity: 0.3
  },
  badgeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 5
  },
  badgeDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 8
  },
  badgeTextLocked: {
    color: '#9ca3af'
  },
  badgeRarity: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginTop: 5
  },
  unlockedBadge: {
    marginTop: 10,
    backgroundColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12
  },
  unlockedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600'
  }
});

export default BadgesScreen;
