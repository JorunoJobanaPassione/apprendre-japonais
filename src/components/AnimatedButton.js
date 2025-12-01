import React, { useRef } from 'react';
import {
  Animated,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * AnimatedButton - Bouton avec animation de pression
 * @param {function} onPress - Callback lors du clic
 * @param {string} title - Texte du bouton
 * @param {object} style - Style personnalisé du bouton
 * @param {object} textStyle - Style personnalisé du texte
 * @param {boolean} disabled - Bouton désactivé
 * @param {ReactNode} children - Contenu personnalisé (alternative au title)
 */
const AnimatedButton = ({
  onPress,
  title,
  style,
  textStyle,
  disabled = false,
  children,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[disabled && styles.disabled]}
    >
      <Animated.View
        style={[
          styles.button,
          style,
          {
            transform: [{ scale: scaleAnim }],
          },
          disabled && styles.disabledButton,
        ]}
      >
        {children || <Text style={[styles.text, textStyle]}>{title}</Text>}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#667eea',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
    shadowOpacity: 0,
  },
});

export default AnimatedButton;
