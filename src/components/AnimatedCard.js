import React, { useRef } from 'react';
import { Animated, TouchableOpacity } from 'react-native';

/**
 * AnimatedCard - Card avec animation de pression
 * @param {function} onPress - Callback lors du clic
 * @param {object} style - Style personnalisé de la card
 * @param {boolean} disabled - Card désactivée
 * @param {ReactNode} children - Contenu de la card
 */
const AnimatedCard = ({ onPress, style, disabled = false, children }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
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
      activeOpacity={0.9}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[disabled && { opacity: 0.6 }]}
    >
      <Animated.View
        style={[
          style,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default AnimatedCard;
