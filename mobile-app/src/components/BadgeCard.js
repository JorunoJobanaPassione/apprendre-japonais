/**
 * BadgeCard - Composant d'affichage d'un badge
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../styles/theme';
import { RARITY_COLORS } from '../services/badgesSystem';

export default function BadgeCard({ badge, onPress, size = 'normal' }) {
  const isLocked = !badge.unlocked;
  const isSmall = size === 'small';

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSmall && styles.containerSmall,
        isLocked && styles.containerLocked,
      ]}
      onPress={() => onPress && onPress(badge)}
      activeOpacity={0.7}
    >
      {/* Badge Icon */}
      <View
        style={[
          styles.iconContainer,
          isSmall && styles.iconContainerSmall,
          { borderColor: isLocked ? COLORS.border : RARITY_COLORS[badge.rarity] },
          isLocked && styles.iconContainerLocked,
        ]}
      >
        <Text style={[styles.icon, isSmall && styles.iconSmall, isLocked && styles.iconLocked]}>
          {isLocked ? '🔒' : badge.icon}
        </Text>
      </View>

      {/* Badge Info */}
      {!isSmall && (
        <View style={styles.info}>
          <Text
            style={[styles.name, isLocked && styles.textLocked]}
            numberOfLines={1}
          >
            {badge.name}
          </Text>

          {/* Progress Bar */}
          {isLocked && badge.progress && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${badge.progress.percentage}%` },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {badge.progress.current}/{badge.progress.target}
              </Text>
            </View>
          )}

          {/* Unlocked indicator */}
          {!isLocked && (
            <View style={styles.unlockedRow}>
              <View
                style={[
                  styles.rarityDot,
                  { backgroundColor: RARITY_COLORS[badge.rarity] },
                ]}
              />
              <Text style={styles.rarityText}>
                {getRarityLabel(badge.rarity)}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Small size: show name below */}
      {isSmall && (
        <Text
          style={[styles.nameSmall, isLocked && styles.textLocked]}
          numberOfLines={1}
        >
          {isLocked ? '???' : badge.name}
        </Text>
      )}
    </TouchableOpacity>
  );
}

/**
 * Badge Grid pour afficher plusieurs badges
 */
export function BadgeGrid({ badges, onBadgePress, columns = 4 }) {
  return (
    <View style={styles.grid}>
      {badges.map((badge) => (
        <View
          key={badge.id}
          style={[styles.gridItem, { width: `${100 / columns}%` }]}
        >
          <BadgeCard badge={badge} onPress={onBadgePress} size="small" />
        </View>
      ))}
    </View>
  );
}

/**
 * Badge récemment débloqué (pour notifications)
 */
export function NewBadgeCard({ badge, onClose }) {
  return (
    <View style={styles.newBadgeContainer}>
      <View style={styles.newBadgeContent}>
        <Text style={styles.newBadgeTitle}>Nouveau Badge !</Text>

        <View
          style={[
            styles.newBadgeIcon,
            { borderColor: RARITY_COLORS[badge.rarity] },
          ]}
        >
          <Text style={styles.newBadgeEmoji}>{badge.icon}</Text>
        </View>

        <Text style={styles.newBadgeName}>{badge.name}</Text>
        <Text style={styles.newBadgeDescription}>{badge.description}</Text>

        {/* Reward */}
        {badge.reward && (
          <View style={styles.rewardContainer}>
            {badge.reward.xp && (
              <View style={styles.rewardItem}>
                <Text style={styles.rewardText}>+{badge.reward.xp} XP</Text>
              </View>
            )}
            {badge.reward.lives && (
              <View style={styles.rewardItem}>
                <Text style={styles.rewardText}>+{badge.reward.lives} ❤️</Text>
              </View>
            )}
          </View>
        )}

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Super !</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getRarityLabel = (rarity) => {
  const labels = {
    common: 'Commun',
    uncommon: 'Peu commun',
    rare: 'Rare',
    legendary: 'Légendaire',
    mythic: 'Mythique',
  };
  return labels[rarity] || rarity;
};

const styles = StyleSheet.create({
  // Container styles
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.marginSmall,
  },
  containerSmall: {
    flexDirection: 'column',
    padding: SIZES.paddingSmall,
    marginBottom: 0,
  },
  containerLocked: {
    opacity: 0.7,
  },

  // Icon styles
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    marginRight: SIZES.margin,
  },
  iconContainerSmall: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 0,
    marginBottom: 4,
  },
  iconContainerLocked: {
    backgroundColor: COLORS.surfaceLight,
  },
  icon: {
    fontSize: 28,
  },
  iconSmall: {
    fontSize: 22,
  },
  iconLocked: {
    opacity: 0.5,
  },

  // Info styles
  info: {
    flex: 1,
  },
  name: {
    fontSize: FONTS.regular,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  nameSmall: {
    fontSize: FONTS.tiny,
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 2,
  },
  textLocked: {
    color: COLORS.textSecondary,
  },

  // Progress styles
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.border,
    borderRadius: 3,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: FONTS.tiny,
    color: COLORS.textSecondary,
    minWidth: 40,
    textAlign: 'right',
  },

  // Unlocked row
  unlockedRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rarityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  rarityText: {
    fontSize: FONTS.small,
    color: COLORS.textSecondary,
  },

  // Grid styles
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  gridItem: {
    padding: 4,
  },

  // New badge modal styles
  newBadgeContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.screenPadding,
  },
  newBadgeContent: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusLarge,
    padding: SIZES.paddingLarge,
    alignItems: 'center',
    width: '100%',
    maxWidth: 300,
  },
  newBadgeTitle: {
    fontSize: FONTS.xLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SIZES.margin,
  },
  newBadgeIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    marginBottom: SIZES.margin,
  },
  newBadgeEmoji: {
    fontSize: 40,
  },
  newBadgeName: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  newBadgeDescription: {
    fontSize: FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.margin,
  },
  rewardContainer: {
    flexDirection: 'row',
    marginBottom: SIZES.margin,
  },
  rewardItem: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginHorizontal: 4,
  },
  rewardText: {
    fontSize: FONTS.regular,
    fontWeight: '600',
    color: COLORS.primary,
  },
  closeButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: SIZES.radius,
  },
  closeButtonText: {
    fontSize: FONTS.regular,
    fontWeight: 'bold',
    color: COLORS.textOnPrimary,
  },
});
