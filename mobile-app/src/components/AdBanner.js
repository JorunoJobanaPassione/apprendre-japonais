/**
 * AdBanner Component
 * Affiche une bannière publicitaire AdMob
 *
 * NOTE: AdMob nécessite un build natif (EAS Build)
 * En mode Expo Go, un placeholder est affiché
 */

import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../styles/theme';

// Mode développement : désactiver AdMob pour Expo Go
const ADMOB_ENABLED = false; // Mettre à true après EAS Build

export default function AdBanner({ style }) {
  // Placeholder pour Expo Go / développement
  if (!ADMOB_ENABLED) {
    if (__DEV__) {
      return (
        <View style={[styles.placeholder, style]}>
          <Text style={styles.placeholderText}>
            [Ad Banner - Dev Mode]
          </Text>
        </View>
      );
    }
    return null;
  }

  // Le vrai code AdMob sera activé après EAS Build
  return null;
}

const styles = StyleSheet.create({
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontSize: FONTS.small,
    color: COLORS.textMuted,
  },
});
