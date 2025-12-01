import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

/**
 * AnimatedFeedback - Composant pour afficher un feedback animé
 * @param {boolean} visible - Afficher ou masquer le feedback
 * @param {boolean} isCorrect - true = correct (vert), false = incorrect (rouge)
 * @param {string} message - Message à afficher (optionnel)
 */
const AnimatedFeedback = ({ visible, isCorrect, message }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Animation d'entrée : scale + fade in
      Animated.sequence([
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 6,
            tension: 80,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
        // Pause
        Animated.delay(800),
        // Animation de sortie : fade out
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Reset après animation
        scaleAnim.setValue(0);
      });
    }
  }, [visible, isCorrect]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <View
        style={[
          styles.feedbackBox,
          { backgroundColor: isCorrect ? '#10b981' : '#ef4444' },
        ]}
      >
        <Text style={styles.icon}>{isCorrect ? '✓' : '✗'}</Text>
        <Text style={styles.text}>
          {message || (isCorrect ? 'Correct !' : 'Incorrect')}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  feedbackBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  icon: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 12,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default AnimatedFeedback;
