import React, { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

/**
 * AnimatedBadgeUnlock - Modal animée pour afficher un badge débloqué
 * @param {boolean} visible - Afficher ou masquer la modal
 * @param {object} badge - Objet badge avec { emoji, name, description, rarity }
 * @param {function} onClose - Callback lors de la fermeture
 */
const AnimatedBadgeUnlock = ({ visible, badge, onClose }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible && badge) {
      // Animation d'entrée
      Animated.sequence([
        Animated.parallel([
          // Background fade in
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          // Badge apparition avec rotation
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 5,
            tension: 50,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
        // Animation de pulsation continue
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1.1,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 800,
              useNativeDriver: true,
            }),
          ])
        ),
      ]).start();
    } else {
      // Reset animations
      scaleAnim.setValue(0);
      rotateAnim.setValue(0);
      pulseAnim.setValue(1);
      fadeAnim.setValue(0);
    }
  }, [visible, badge]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'Légendaire':
        return '#F59E0B';
      case 'Épique':
        return '#8B5CF6';
      case 'Rare':
        return '#3B82F6';
      default:
        return '#9CA3AF';
    }
  };

  if (!badge) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={styles.overlayTouchable}
          activeOpacity={1}
          onPress={onClose}
        >
          <View style={styles.modalContent}>
            <Text style={styles.title}>🎉 Badge Débloqué !</Text>

            {/* Badge animé */}
            <Animated.View
              style={[
                styles.badgeContainer,
                {
                  transform: [
                    { scale: Animated.multiply(scaleAnim, pulseAnim) },
                    { rotate },
                  ],
                },
              ]}
            >
              <View
                style={[
                  styles.badgeCircle,
                  { borderColor: getRarityColor(badge.rarity) },
                ]}
              >
                <Text style={styles.badgeEmoji}>{badge.emoji}</Text>
              </View>
            </Animated.View>

            {/* Info badge */}
            <Animated.View
              style={[styles.infoContainer, { opacity: fadeAnim }]}
            >
              <Text style={styles.badgeName}>{badge.name}</Text>
              <Text style={styles.badgeDescription}>{badge.description}</Text>
              <View
                style={[
                  styles.rarityBadge,
                  { backgroundColor: getRarityColor(badge.rarity) },
                ]}
              >
                <Text style={styles.rarityText}>{badge.rarity}</Text>
              </View>
            </Animated.View>

            {/* Bouton fermer */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Continuer</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayTouchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    width: width * 0.85,
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 24,
  },
  badgeContainer: {
    marginVertical: 24,
  },
  badgeCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#f5f7fa',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  badgeEmoji: {
    fontSize: 80,
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  badgeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  badgeDescription: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  rarityBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 8,
  },
  rarityText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 24,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AnimatedBadgeUnlock;
