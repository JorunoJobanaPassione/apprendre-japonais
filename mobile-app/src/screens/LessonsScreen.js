/**
 * Lessons Screen - Liste des leçons disponibles
 * Hiragana, Katakana, Kanji
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {
  hiraganaLessons,
  katakanaLessons,
  vocabularyLessons,
  kanjiLessons,
  LESSON_CATEGORIES
} from '../data/lessonsData';
import { COLORS, FONTS, SIZES } from '../styles/theme';
import globalStyles from '../styles/globalStyles';
import AdBanner from '../components/AdBanner';

export default function LessonsScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(LESSON_CATEGORIES.HIRAGANA);

  const categories = [
    { id: LESSON_CATEGORIES.HIRAGANA, name: 'Hiragana', emoji: 'あ', count: hiraganaLessons.length },
    { id: LESSON_CATEGORIES.KATAKANA, name: 'Katakana', emoji: 'ア', count: katakanaLessons.length },
    { id: LESSON_CATEGORIES.VOCABULARY, name: 'Vocabulaire', emoji: '数', count: vocabularyLessons.length },
    { id: LESSON_CATEGORIES.KANJI, name: 'Kanji', emoji: '漢', count: kanjiLessons.length },
  ];

  const getLessons = () => {
    switch (selectedCategory) {
      case LESSON_CATEGORIES.HIRAGANA:
        return hiraganaLessons;
      case LESSON_CATEGORIES.KATAKANA:
        return katakanaLessons;
      case LESSON_CATEGORIES.VOCABULARY:
        return vocabularyLessons;
      case LESSON_CATEGORIES.KANJI:
        return kanjiLessons;
      default:
        return [];
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>📚 Leçons</Text>
          <Text style={styles.subtitle}>Choisis ce que tu veux apprendre</Text>
        </View>

        {/* Catégories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryCard,
                selectedCategory === category.id && styles.categoryCardActive,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={styles.categoryEmoji}>{category.emoji}</Text>
              <Text
                style={[
                  styles.categoryName,
                  selectedCategory === category.id && styles.categoryNameActive,
                ]}
              >
                {category.name}
              </Text>
              <Text style={styles.categoryCount}>{`${category.count} leçons`}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Liste des leçons */}
        <View style={styles.lessonsContainer}>
          {getLessons().length > 0 ? (
            getLessons().map((lesson) => (
              <TouchableOpacity
                key={lesson.id}
                style={globalStyles.card}
                onPress={() =>
                  navigation.navigate('LessonDetail', {
                    lessonId: lesson.id,
                    lessonTitle: lesson.title,
                    category: selectedCategory,
                  })
                }
              >
                <View style={styles.lessonHeader}>
                  <Text style={styles.lessonNumber}>{`Leçon ${lesson.id}`}</Text>
                  <View style={styles.difficultyBadge}>
                    <Text style={styles.difficultyText}>{lesson.difficulty}</Text>
                  </View>
                </View>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <Text style={styles.lessonDescription}>{lesson.description}</Text>
                <View style={styles.lessonFooter}>
                  <Text style={styles.lessonCharacters}>
                    {lesson.kanji
                      ? `${lesson.kanji.length} kanji`
                      : `${lesson.characters?.length || 0} caractères`
                    }
                  </Text>
                  <Text style={styles.lessonArrow}>›</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={globalStyles.card}>
              <Text style={globalStyles.textSecondary}>
                Aucune leçon disponible pour cette catégorie.
              </Text>
              <Text style={[globalStyles.textMuted, { marginTop: 8 }]}>
                Les leçons Kanji arrivent bientôt !
              </Text>
            </View>
          )}

          {/* Ad Banner */}
          <AdBanner style={styles.adBanner} />
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
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    padding: SIZES.screenPadding,
    paddingBottom: SIZES.paddingSmall,
  },
  title: {
    fontSize: FONTS.xxxLarge,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: FONTS.regular,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  categoriesContainer: {
    marginBottom: SIZES.margin,
  },
  categoriesContent: {
    paddingHorizontal: SIZES.screenPadding,
  },
  categoryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginRight: SIZES.marginSmall,
    alignItems: 'center',
    minWidth: 100,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryCardActive: {
    backgroundColor: COLORS.surfaceLight,
    borderColor: COLORS.primary,
  },
  categoryEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: FONTS.regular,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  categoryNameActive: {
    color: COLORS.primary,
  },
  categoryCount: {
    fontSize: FONTS.small,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  lessonsContainer: {
    padding: SIZES.screenPadding,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.marginSmall,
  },
  lessonNumber: {
    fontSize: FONTS.small,
    color: COLORS.primary,
    fontWeight: '600',
  },
  difficultyBadge: {
    backgroundColor: COLORS.surfaceLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: SIZES.radiusSmall,
  },
  difficultyText: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  lessonTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.marginSmall,
  },
  lessonDescription: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
    marginBottom: SIZES.margin,
  },
  lessonFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lessonCharacters: {
    fontSize: FONTS.small,
    color: COLORS.textMuted,
  },
  lessonArrow: {
    fontSize: 32,
    color: COLORS.textMuted,
  },
  adBanner: {
    marginTop: SIZES.margin,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
  },
});
