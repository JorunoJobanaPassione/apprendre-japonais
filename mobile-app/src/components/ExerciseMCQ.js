/**
 * Exercise MCQ Component - Questions à choix multiples
 * Affiche une question avec 2-4 options
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../styles/theme';

export default function ExerciseMCQ({ exercise, onAnswer }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [scaleAnims] = useState(
    exercise.options.map(() => new Animated.Value(1))
  );

  useEffect(() => {
    // Réinitialiser l'état quand l'exercice change
    setSelectedOption(null);
    setAnswered(false);
    // Réinitialiser les animations
    scaleAnims.forEach(anim => anim.setValue(1));
  }, [exercise]);

  const handleOptionPress = (option, index) => {
    if (answered) return;

    setSelectedOption(option);
    setAnswered(true);

    // Animation de pression
    Animated.sequence([
      Animated.timing(scaleAnims[index], {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnims[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Délai pour montrer la sélection avant de valider
    setTimeout(() => {
      onAnswer(option);
    }, 600);
  };

  const getOptionStyle = (option, index) => {
    if (!answered) {
      return styles.option;
    }

    const isCorrect = option === exercise.correct;
    const isSelected = option === selectedOption;

    if (isSelected && isCorrect) {
      return [styles.option, styles.optionCorrect];
    } else if (isSelected && !isCorrect) {
      return [styles.option, styles.optionIncorrect];
    } else if (isCorrect) {
      return [styles.option, styles.optionCorrect];
    }

    return [styles.option, styles.optionFaded];
  };

  return (
    <View style={styles.container}>
      {/* Question */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{exercise.question}</Text>
        {exercise.character && (
          <Text style={styles.character}>{exercise.character}</Text>
        )}
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {exercise.options.map((option, index) => (
          <Animated.View
            key={index}
            style={{ transform: [{ scale: scaleAnims[index] }] }}
          >
            <TouchableOpacity
              style={getOptionStyle(option, index)}
              onPress={() => handleOptionPress(option, index)}
              disabled={answered}
              activeOpacity={0.7}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      {/* Explication (si disponible et répondu) */}
      {answered && exercise.explanation && (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationText}>💡 {exercise.explanation}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.screenPadding,
  },
  questionContainer: {
    alignItems: 'center',
    marginBottom: SIZES.margin * 2,
    paddingTop: SIZES.padding * 2,
  },
  questionText: {
    fontSize: FONTS.xLarge,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SIZES.margin,
  },
  character: {
    fontSize: 72,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginTop: SIZES.margin,
  },
  optionsContainer: {
    gap: SIZES.marginSmall,
  },
  option: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    borderWidth: 2,
    borderColor: COLORS.surfaceLight,
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionCorrect: {
    backgroundColor: COLORS.success + '20',
    borderColor: COLORS.success,
  },
  optionIncorrect: {
    backgroundColor: COLORS.error + '20',
    borderColor: COLORS.error,
  },
  optionFaded: {
    opacity: 0.5,
  },
  optionText: {
    fontSize: FONTS.large,
    fontWeight: '600',
    color: COLORS.text,
  },
  explanationContainer: {
    marginTop: SIZES.margin * 2,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  explanationText: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },
});
