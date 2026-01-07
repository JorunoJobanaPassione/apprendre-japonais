/**
 * ExerciseKanji Component - Exercices spécifiques aux kanji
 * Gère 3 types: reconnaissance, lecture, signification de mot
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../styles/theme';
import audioService from '../services/audioService';

export default function ExerciseKanji({ exercise, onAnswer }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handlePlayAudio = async () => {
    if (exercise.audio) {
      setIsPlayingAudio(true);
      await audioService.play(exercise.audio);
      setTimeout(() => setIsPlayingAudio(false), 800);
    }
  };

  const handleSelectOption = (option) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    // Envoyer la réponse après un court délai pour montrer la sélection
    setTimeout(() => {
      onAnswer(option);
      // Reset pour le prochain exercice
      setSelectedOption(null);
      setIsAnswered(false);
    }, 500);
  };

  const getOptionStyle = (option) => {
    if (!isAnswered) {
      return option === selectedOption ? styles.optionSelected : styles.option;
    }

    const isCorrect = option === exercise.correct;
    const isSelected = option === selectedOption;

    if (isCorrect) return styles.optionCorrect;
    if (isSelected && !isCorrect) return styles.optionIncorrect;
    return styles.option;
  };

  const getOptionTextStyle = (option) => {
    if (!isAnswered) {
      return option === selectedOption ? styles.optionTextSelected : styles.optionText;
    }

    const isCorrect = option === exercise.correct;
    const isSelected = option === selectedOption;

    if (isCorrect || isSelected) return styles.optionTextSelected;
    return styles.optionText;
  };

  // Rendu selon le type d'exercice
  const renderQuestion = () => {
    switch (exercise.type) {
      case 'kanji_recognition':
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{exercise.question}</Text>
            <View style={styles.kanjiDisplay}>
              {exercise.audio && (
                <TouchableOpacity
                  style={styles.audioButton}
                  onPress={handlePlayAudio}
                >
                  <Text style={styles.audioIcon}>
                    {isPlayingAudio ? '▶️' : '🔊'}
                  </Text>
                </TouchableOpacity>
              )}
              <Text style={styles.kanjiCharacter}>{exercise.character}</Text>
            </View>
            {exercise.hint && (
              <Text style={styles.hintText}>💡 {exercise.hint}</Text>
            )}
          </View>
        );

      case 'kanji_reading':
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{exercise.question}</Text>
            <View style={styles.kanjiDisplay}>
              {exercise.audio && (
                <TouchableOpacity
                  style={styles.audioButton}
                  onPress={handlePlayAudio}
                >
                  <Text style={styles.audioIcon}>
                    {isPlayingAudio ? '▶️' : '🔊'}
                  </Text>
                </TouchableOpacity>
              )}
              <Text style={styles.kanjiCharacter}>{exercise.character}</Text>
            </View>
            {exercise.hint && (
              <Text style={styles.hintText}>💡 Signification: {exercise.hint}</Text>
            )}
          </View>
        );

      case 'kanji_meaning':
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{exercise.question}</Text>
            <View style={styles.wordDisplay}>
              <Text style={styles.wordText}>{exercise.word}</Text>
              <Text style={styles.readingText}>{exercise.reading}</Text>
            </View>
          </View>
        );

      default:
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{exercise.question}</Text>
            <Text style={styles.kanjiCharacter}>{exercise.character}</Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {/* Question et caractère */}
      {renderQuestion()}

      {/* Options */}
      <View style={styles.optionsContainer}>
        {exercise.options?.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.optionBase, getOptionStyle(option)]}
            onPress={() => handleSelectOption(option)}
            disabled={isAnswered}
          >
            <Text style={[styles.optionTextBase, getOptionTextStyle(option)]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.screenPadding,
    justifyContent: 'space-between',
  },
  questionContainer: {
    alignItems: 'center',
    paddingVertical: SIZES.padding * 2,
  },
  questionText: {
    fontSize: FONTS.xLarge,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SIZES.margin * 2,
    lineHeight: 30,
    minHeight: 30,
  },
  kanjiDisplay: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.padding * 2,
  },
  audioButton: {
    position: 'absolute',
    top: 0,
    right: -50,
    padding: 10,
    backgroundColor: COLORS.primary + '20',
    borderRadius: 25,
    zIndex: 10,
  },
  audioIcon: {
    fontSize: 24,
  },
  kanjiCharacter: {
    fontSize: 120,
    color: COLORS.text,
    lineHeight: 140,
  },
  wordDisplay: {
    alignItems: 'center',
    paddingVertical: SIZES.padding * 2,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLarge,
    paddingHorizontal: SIZES.padding * 3,
  },
  wordText: {
    fontSize: 64,
    color: COLORS.text,
    marginBottom: SIZES.marginSmall,
  },
  readingText: {
    fontSize: FONTS.xxLarge,
    color: COLORS.primary,
    fontWeight: '500',
  },
  hintText: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
    marginTop: SIZES.margin,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: SIZES.marginSmall,
    paddingBottom: SIZES.padding * 2,
  },
  optionBase: {
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.25,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  option: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
  },
  optionSelected: {
    backgroundColor: COLORS.primary + '20',
    borderColor: COLORS.primary,
  },
  optionCorrect: {
    backgroundColor: COLORS.success + '20',
    borderColor: COLORS.success,
  },
  optionIncorrect: {
    backgroundColor: COLORS.error + '20',
    borderColor: COLORS.error,
  },
  optionTextBase: {
    fontSize: FONTS.large,
    textAlign: 'center',
    fontWeight: '500',
  },
  optionText: {
    color: COLORS.text,
  },
  optionTextSelected: {
    color: COLORS.text,
    fontWeight: '600',
  },
});
