/**
 * ShareButton - Composants de partage social
 *
 * VIRALITÉ: Chaque partage = acquisition gratuite
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../styles/theme';
import {
  shareStreak,
  shareBadge,
  shareLevelUp,
} from '../services/shareService';

/**
 * Bouton de partage de streak
 */
export default function ShareStreakButton({
  streak,
  onShare,
  style,
  variant = 'default', // 'default' | 'compact' | 'icon'
}) {
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    setLoading(true);
    try {
      const result = await shareStreak();

      if (result.success && result.action === 'shared') {
        if (onShare) {
          onShare(result);
        }
      }
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert('Erreur', 'Impossible de partager');
    } finally {
      setLoading(false);
    }
  };

  if (variant === 'icon') {
    return (
      <TouchableOpacity
        style={[styles.iconButton, style]}
        onPress={handleShare}
        disabled={loading}
        activeOpacity={0.7}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.primary} size="small" />
        ) : (
          <Text style={styles.iconEmoji}>📤</Text>
        )}
      </TouchableOpacity>
    );
  }

  if (variant === 'compact') {
    return (
      <TouchableOpacity
        style={[styles.compactButton, style]}
        onPress={handleShare}
        disabled={loading}
        activeOpacity={0.7}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.textOnPrimary} size="small" />
        ) : (
          <>
            <Text style={styles.compactIcon}>📤</Text>
            <Text style={styles.compactText}>Partager</Text>
          </>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={handleShare}
      disabled={loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.text} size="small" />
      ) : (
        <>
          <Text style={styles.icon}>📤</Text>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Partager mon streak</Text>
            <Text style={styles.subtext}>
              {streak ? `${streak} jours de japonais !` : 'Montre ta progression'}
            </Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
}

/**
 * Bouton de partage de badge
 */
export function ShareBadgeButton({ badge, onShare, style }) {
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    if (!badge) return;

    setLoading(true);
    try {
      const result = await shareBadge(badge);

      if (result.success && result.action === 'shared') {
        if (onShare) {
          onShare(result);
        }
      }
    } catch (error) {
      console.error('Error sharing badge:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.badgeShareButton, style]}
      onPress={handleShare}
      disabled={loading || !badge}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.textOnPrimary} size="small" />
      ) : (
        <>
          <Text style={styles.badgeShareIcon}>📤</Text>
          <Text style={styles.badgeShareText}>Partager</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

/**
 * Bouton de partage de level up
 */
export function ShareLevelUpButton({ levelInfo, onShare, style }) {
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    if (!levelInfo) return;

    setLoading(true);
    try {
      const result = await shareLevelUp(levelInfo);

      if (result.success && result.action === 'shared') {
        if (onShare) {
          onShare(result);
        }
      }
    } catch (error) {
      console.error('Error sharing level up:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.levelShareButton, style]}
      onPress={handleShare}
      disabled={loading || !levelInfo}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.textOnPrimary} size="small" />
      ) : (
        <>
          <Text style={styles.levelShareIcon}>📤</Text>
          <Text style={styles.levelShareText}>Partager mon niveau</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

/**
 * Card de partage avec preview
 */
export function ShareCard({ streak, onShare, style }) {
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    setLoading(true);
    try {
      const result = await shareStreak();
      if (result.success && onShare) {
        onShare(result);
      }
    } finally {
      setLoading(false);
    }
  };

  const emoji = getStreakEmoji(streak);

  return (
    <View style={[styles.card, style]}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>📤 Partager ma progression</Text>
      </View>

      {/* Preview */}
      <View style={styles.preview}>
        <Text style={styles.previewEmoji}>{emoji}</Text>
        <Text style={styles.previewStreak}>{streak} jours</Text>
        <Text style={styles.previewText}>de japonais !</Text>
      </View>

      {/* Share button */}
      <TouchableOpacity
        style={styles.cardButton}
        onPress={handleShare}
        disabled={loading}
        activeOpacity={0.7}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.textOnPrimary} size="small" />
        ) : (
          <Text style={styles.cardButtonText}>Partager sur les réseaux</Text>
        )}
      </TouchableOpacity>

      {/* Platforms hint */}
      <View style={styles.platforms}>
        <Text style={styles.platformIcon}>📱</Text>
        <Text style={styles.platformIcon}>💬</Text>
        <Text style={styles.platformIcon}>📸</Text>
        <Text style={styles.platformIcon}>🐦</Text>
      </View>
    </View>
  );
}

// Helper
const getStreakEmoji = (streak) => {
  if (streak >= 365) return '👑';
  if (streak >= 100) return '💎';
  if (streak >= 30) return '⭐';
  if (streak >= 7) return '🔥';
  return '🌱';
};

const styles = StyleSheet.create({
  // Default button
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  text: {
    fontSize: FONTS.regular,
    fontWeight: '600',
    color: COLORS.text,
  },
  subtext: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  // Icon button
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconEmoji: {
    fontSize: 18,
  },

  // Compact button
  compactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
  },
  compactIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  compactText: {
    fontSize: FONTS.small,
    fontWeight: '600',
    color: COLORS.textOnPrimary,
  },

  // Badge share
  badgeShareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: SIZES.radius,
  },
  badgeShareIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  badgeShareText: {
    fontSize: FONTS.small,
    fontWeight: '600',
    color: COLORS.primary,
  },

  // Level share
  levelShareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.success,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: SIZES.radius,
  },
  levelShareIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  levelShareText: {
    fontSize: FONTS.regular,
    fontWeight: '600',
    color: COLORS.textOnPrimary,
  },

  // Share card
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLarge,
    padding: SIZES.padding,
    alignItems: 'center',
  },
  cardHeader: {
    marginBottom: SIZES.margin,
  },
  cardTitle: {
    fontSize: FONTS.regular,
    fontWeight: '600',
    color: COLORS.text,
  },
  preview: {
    alignItems: 'center',
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.paddingLarge,
    backgroundColor: COLORS.background,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.margin,
    width: '100%',
  },
  previewEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  previewStreak: {
    fontSize: FONTS.xxLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  previewText: {
    fontSize: FONTS.regular,
    color: COLORS.textSecondary,
  },
  cardButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: SIZES.radius,
    width: '100%',
    alignItems: 'center',
    marginBottom: SIZES.marginSmall,
  },
  cardButtonText: {
    fontSize: FONTS.regular,
    fontWeight: 'bold',
    color: COLORS.textOnPrimary,
  },
  platforms: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  platformIcon: {
    fontSize: 20,
    marginHorizontal: 8,
    opacity: 0.6,
  },
});
