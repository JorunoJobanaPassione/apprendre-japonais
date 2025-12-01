import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

/**
 * AnimatedExerciseTransition - Composant wrapper pour animer les transitions d'exercices
 * @param {ReactNode} children - Contenu de l'exercice
 * @param {number} exerciseIndex - Index de l'exercice actuel (pour déclencher l'animation)
 */
const AnimatedExerciseTransition = ({ children, exerciseIndex }) => {
  const slideAnim = useRef(new Animated.Value(width)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Reset position
    slideAnim.setValue(width);
    fadeAnim.setValue(0);

    // Animation d'entrée : slide from right + fade in
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [exerciseIndex]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateX: slideAnim }],
          opacity: fadeAnim,
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AnimatedExerciseTransition;
