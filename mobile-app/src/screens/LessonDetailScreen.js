/**
 * Lesson Detail Screen - Détail d'une leçon avec exercices
 * Supporte Hiragana, Katakana, Vocabulaire ET Kanji
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { getLessonById } from '../data/lessonsData';
import audioService from '../services/audioService';
import { COLORS, FONTS, SIZES } from '../styles/theme';
import globalStyles from '../styles/globalStyles';
import KanjiCard from '../components/KanjiCard';
import GrammarTips from '../components/GrammarTips';

export default function LessonDetailScreen({ route, navigation }) {
  const { lessonId } = route.params;
  const lesson = getLessonById(lessonId);
  const [playingRomaji, setPlayingRomaji] = useState(null);
  const [currentKanjiIndex, setCurrentKanjiIndex] = useState(0);
  const [showGrammar, setShowGrammar] = useState(false);

  // Détermine si c'est une leçon de kanji
  const isKanjiLesson = lesson?.type === 'kanji' || lesson?.category === 'kanji';

  const handlePlayAudio = async (romaji) => {
    setPlayingRomaji(romaji);
    await audioService.play(romaji);
    setTimeout(() => setPlayingRomaji(null), 800);
  };

  if (!lesson) {
    return (
      <View style={globalStyles.centerContainer}>
        <Text style={globalStyles.text}>Leçon introuvable</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={globalStyles.card}>
          <Text style={styles.title}>{lesson.title}</Text>
          <Text style={globalStyles.textSecondary}>{lesson.description}</Text>

          {/* Bouton conseils grammaticaux */}
          <TouchableOpacity
            style={styles.grammarButton}
            onPress={() => setShowGrammar(true)}
          >
            <Text style={styles.grammarButtonIcon}>📖</Text>
            <Text style={styles.grammarButtonText}>Conseils & Explications</Text>
          </TouchableOpacity>
        </View>

        {/* Contenu selon le type de leçon */}
        {isKanjiLesson ? (
          /* Affichage Kanji avec KanjiCard */
          <View style={globalStyles.card}>
            <Text style={styles.sectionTitle}>{`🈳 Kanji (${lesson.kanji?.length || 0})`}</Text>
            {lesson.kanji && lesson.kanji.length > 0 && (
              <KanjiCard
                kanji={lesson.kanji[currentKanjiIndex]}
                showNavigation={true}
                currentIndex={currentKanjiIndex}
                totalCount={lesson.kanji.length}
                onNext={() => setCurrentKanjiIndex(prev => Math.min(prev + 1, lesson.kanji.length - 1))}
                onPrevious={() => setCurrentKanjiIndex(prev => Math.max(prev - 1, 0))}
              />
            )}

            {/* Liste des kanji de la leçon */}
            <View style={styles.kanjiListContainer}>
              <Text style={styles.kanjiListTitle}>Tous les kanji de cette leçon</Text>
              <View style={styles.kanjiGrid}>
                {lesson.kanji?.map((k, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.kanjiGridItem,
                      currentKanjiIndex === index && styles.kanjiGridItemActive,
                    ]}
                    onPress={() => setCurrentKanjiIndex(index)}
                  >
                    <Text style={[
                      styles.kanjiGridChar,
                      currentKanjiIndex === index && styles.kanjiGridCharActive,
                    ]}>
                      {k.kanji}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        ) : (
          /* Affichage standard Hiragana/Katakana/Vocabulaire */
          <View style={globalStyles.card}>
            <Text style={styles.sectionTitle}>{`📝 Caractères (${lesson.characters?.length || 0})`}</Text>
            {lesson.characters?.map((char, index) => {
              // Supporter hiragana, katakana, ou autre type de caractère
              const displayChar = char.hiragana || char.katakana || char.kanji || '?';
              const isPlaying = playingRomaji === char.romaji;

              return (
                <View key={index} style={styles.characterCard}>
                  <Text style={styles.characterHiragana}>{displayChar}</Text>
                  <View style={styles.characterInfo}>
                    <View style={styles.romajiRow}>
                      <Text style={styles.characterRomaji}>{char.romaji}</Text>
                      <TouchableOpacity
                        style={[styles.audioButton, isPlaying && styles.audioButtonPlaying]}
                        onPress={() => handlePlayAudio(char.romaji)}
                      >
                        <Text style={styles.audioIcon}>{isPlaying ? '▶️' : '🔊'}</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={globalStyles.textSecondary}>{char.pronunciation}</Text>
                    {char.meaning && (
                      <Text style={globalStyles.textSecondary}>Signification: {char.meaning}</Text>
                    )}
                    <Text style={[globalStyles.textMuted, { marginTop: 8 }]}>
                      💡 {char.mnemonic}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        <View style={globalStyles.card}>
          <Text style={styles.sectionTitle}>
            {`🎯 Exercices (${lesson.exercises?.length || 0})`}
          </Text>
          {lesson.exercises && lesson.exercises.length > 0 ? (
            <>
              <Text style={globalStyles.textSecondary}>
                {`Testez vos connaissances avec ${lesson.exercises.length} exercices variés !`}
              </Text>
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => navigation.navigate('Exercise', { lesson })}
              >
                <Text style={styles.startButtonText}>Commencer les exercices</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={globalStyles.textSecondary}>
              Aucun exercice disponible pour cette leçon.
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Modal Conseils Grammaticaux */}
      <GrammarTips
        visible={showGrammar}
        onClose={() => setShowGrammar(false)}
        lessonType={lesson?.type || lesson?.category}
        lessonId={lessonId}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SIZES.screenPadding,
    paddingBottom: 100, // Espace pour permettre le scroll jusqu'en bas
  },
  title: {
    fontSize: FONTS.xxLarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.marginSmall,
  },
  sectionTitle: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.margin,
  },
  characterCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surfaceLight,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.marginSmall,
  },
  characterHiragana: {
    fontSize: 48,
    color: COLORS.primary,
    marginRight: SIZES.margin,
    minWidth: 60,
    textAlign: 'center',
  },
  characterInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  romajiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  characterRomaji: {
    fontSize: FONTS.xLarge,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  audioButton: {
    backgroundColor: COLORS.primary + '20',
    borderRadius: SIZES.radiusSmall,
    padding: 8,
    marginLeft: 12,
  },
  audioButtonPlaying: {
    backgroundColor: COLORS.primary + '40',
  },
  audioIcon: {
    fontSize: 20,
  },
  startButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    alignItems: 'center',
    marginTop: SIZES.margin,
  },
  startButtonText: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  // Style bouton grammaire
  grammarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceLight,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginTop: SIZES.margin,
    borderWidth: 1,
    borderColor: COLORS.primary + '40',
  },
  grammarButtonIcon: {
    fontSize: 20,
    marginRight: SIZES.marginSmall,
  },
  grammarButtonText: {
    fontSize: FONTS.medium,
    color: COLORS.primary,
    fontWeight: '600',
  },
  // Styles pour la grille de kanji
  kanjiListContainer: {
    marginTop: SIZES.margin,
    paddingTop: SIZES.margin,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  kanjiListTitle: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
    marginBottom: SIZES.marginSmall,
    textAlign: 'center',
  },
  kanjiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SIZES.marginSmall,
  },
  kanjiGridItem: {
    width: 50,
    height: 50,
    borderRadius: SIZES.radiusSmall,
    backgroundColor: COLORS.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kanjiGridItemActive: {
    backgroundColor: COLORS.primary,
  },
  kanjiGridChar: {
    fontSize: 28,
    color: COLORS.text,
  },
  kanjiGridCharActive: {
    color: COLORS.background,
    fontWeight: 'bold',
  },
});
