/**
 * Exercise Intruder Component - Trouver l'intrus
 * L'utilisateur doit identifier quel caractère ne fait pas partie du groupe
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

export default function ExerciseIntruder({ exercise, onAnswer }) {
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
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnims[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Délai pour montrer la sélection
    setTimeout(() => {
      onAnswer(option);
    }, 800);
  };

  const getOptionStyle = (option, index) => {
    if (!answered) {
      return styles.option;
    }

    const isIntruder = option === exercise.correct;
    const isSelected = option === selectedOption;

    if (isSelected && isIntruder) {
      return [styles.option, styles.optionCorrect];
    } else if (isSelected && !isIntruder) {
      return [styles.option, styles.optionIncorrect];
    } else if (isIntruder) {
      return [styles.option, styles.optionCorrect];
    }

    return [styles.option, styles.optionFaded];
  };

  return (
    <View style={styles.container}>
      {/* Question */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{exercise.question}</Text>
        <Text style={styles.hint}>
          Trouvez le caractère qui n'appartient pas au groupe
        </Text>
      </View>

      {/* Options */}
      <View style={styles.optionsGrid}>
        {exercise.options.map((option, index) => (
          <Animated.View
            key={index}
            style={[
              styles.optionWrapper,
              { transform: [{ scale: scaleAnims[index] }] },
            ]}
          >
            <TouchableOpacity
              style={getOptionStyle(option, index)}
              onPress={() => handleOptionPress(option, index)}
              disabled={answered}
              activeOpacity={0.7}
            >
              <Text style={styles.optionCharacter}>{option}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>

      {/* Explication */}
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
    marginBottom: SIZES.margin * 3,
    paddingTop: SIZES.padding * 2,
  },
  questionText: {
    fontSize: FONTS.xLarge,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SIZES.marginSmall,
  },
  hint: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SIZES.margin,
  },
  optionWrapper: {
    width: '45%',
    aspectRatio: 1,
  },
  option: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    borderWidth: 3,
    borderColor: COLORS.surfaceLight,
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
    opacity: 0.4,
  },
  optionCharacter: {
    fontSize: 56,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  explanationContainer: {
    marginTop: SIZES.margin * 3,
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
