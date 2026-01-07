/**
 * Feedback Animation Component
 * Confetti pour succès, shake pour erreur
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { COLORS } from '../styles/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Confetti particle component
function ConfettiParticle({ delay, startX, color }) {
  const translateY = useRef(new Animated.Value(-50)).current;
  const translateX = useRef(new Animated.Value(startX)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const randomEndX = startX + (Math.random() - 0.5) * 150;
    const duration = 1500 + Math.random() * 500;

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT * 0.6,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: randomEndX,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: Math.random() * 10,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration,
        delay: delay + duration - 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 10],
    outputRange: ['0deg', '720deg'],
  });

  return (
    <Animated.View
      style={[
        styles.confetti,
        {
          backgroundColor: color,
          transform: [
            { translateY },
            { translateX },
            { rotate: rotateInterpolate },
          ],
          opacity,
        },
      ]}
    />
  );
}

// Sparkle component for subtle effect
function Sparkle({ x, y, delay }) {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          friction: 4,
          tension: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.sparkle,
        {
          left: x,
          top: y,
          transform: [{ scale }],
          opacity,
        },
      ]}
    >
      <View style={styles.sparkleInner} />
    </Animated.View>
  );
}

// Success Animation (Subtle confetti - reduced for focus on learning)
export function SuccessAnimation({ visible }) {
  if (!visible) return null;

  // Couleurs sobres - moins de distraction
  const confettiColors = [
    COLORS.primary,
    COLORS.success,
  ];

  // Seulement 8 confettis (au lieu de 30) - feedback subtil
  const confetti = [];
  for (let i = 0; i < 8; i++) {
    const startX = (i / 8) * SCREEN_WIDTH;
    const color = confettiColors[i % confettiColors.length];
    const delay = Math.random() * 100;
    confetti.push(
      <ConfettiParticle key={i} startX={startX} color={color} delay={delay} />
    );
  }

  // Seulement 3 sparkles (au lieu de 8)
  const sparkles = [];
  for (let i = 0; i < 3; i++) {
    sparkles.push(
      <Sparkle
        key={`sparkle-${i}`}
        x={SCREEN_WIDTH * 0.3 + Math.random() * SCREEN_WIDTH * 0.4}
        y={150 + Math.random() * 100}
        delay={i * 150}
      />
    );
  }

  return (
    <View style={styles.container} pointerEvents="none">
      {confetti}
      {sparkles}
    </View>
  );
}

// Error Animation (Shake effect wrapper)
export function ErrorShake({ children, shake }) {
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (shake) {
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 5, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }
  }, [shake]);

  return (
    <Animated.View style={{ flex: 1, transform: [{ translateX: shakeAnim }] }}>
      {children}
    </Animated.View>
  );
}

// Pulse animation for correct answer
export function PulseAnimation({ children, pulse }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (pulse) {
      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1.1,
          friction: 3,
          tension: 100,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 3,
          tension: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [pulse]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    zIndex: 1000,
  },
  confetti: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  sparkle: {
    position: 'absolute',
    width: 20,
    height: 20,
  },
  sparkleInner: {
    width: 20,
    height: 20,
    backgroundColor: '#FFD700',
    borderRadius: 10,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
});

export default { SuccessAnimation, ErrorShake, PulseAnimation };
