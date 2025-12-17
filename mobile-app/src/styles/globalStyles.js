/**
 * Global Styles - Styles réutilisables dans toute l'app
 */

import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from './theme';

export const globalStyles = StyleSheet.create({
  // Conteneurs
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screenContainer: {
    flex: 1,
    padding: SIZES.screenPadding,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Cards
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.margin,
    // Shadow for web compatibility
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  cardSmall: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radiusSmall,
    padding: SIZES.paddingSmall,
    marginBottom: SIZES.marginSmall,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  // Textes
  title: {
    fontSize: FONTS.xxxLarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SIZES.margin,
  },
  subtitle: {
    fontSize: FONTS.xLarge,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SIZES.marginSmall,
  },
  text: {
    fontSize: FONTS.regular,
    color: COLORS.text,
  },
  textSecondary: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
  },
  textMuted: {
    fontSize: FONTS.small,
    color: COLORS.textMuted,
  },
  textBold: {
    fontWeight: 'bold',
  },
  textCenter: {
    textAlign: 'center',
  },

  // Boutons
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    height: SIZES.buttonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: COLORS.text,
    fontSize: FONTS.regular,
    fontWeight: 'bold',
  },
  buttonSecondary: {
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    height: SIZES.buttonHeight,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  buttonSecondaryText: {
    color: COLORS.primary,
    fontSize: FONTS.regular,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    opacity: 0.5,
  },

  // Rows & Columns
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  column: {
    flexDirection: 'column',
  },

  // Spacing
  mt1: { marginTop: SIZES.marginSmall },
  mt2: { marginTop: SIZES.margin },
  mt3: { marginTop: SIZES.marginLarge },
  mb1: { marginBottom: SIZES.marginSmall },
  mb2: { marginBottom: SIZES.margin },
  mb3: { marginBottom: SIZES.marginLarge },
  ml1: { marginLeft: SIZES.marginSmall },
  ml2: { marginLeft: SIZES.margin },
  mr1: { marginRight: SIZES.marginSmall },
  mr2: { marginRight: SIZES.margin },
  p1: { padding: SIZES.paddingSmall },
  p2: { padding: SIZES.padding },
  p3: { padding: SIZES.paddingLarge },

  // Progress bar
  progressBarContainer: {
    height: 8,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: SIZES.radiusSmall,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusSmall,
  },

  // Badge
  badge: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusRound,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: SIZES.marginSmall,
  },
  badgeText: {
    color: COLORS.text,
    fontSize: FONTS.small,
    fontWeight: 'bold',
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SIZES.margin,
  },

  // Loading
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },

  // Error
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: SIZES.padding,
  },
  errorText: {
    color: COLORS.error,
    fontSize: FONTS.regular,
    textAlign: 'center',
    marginTop: SIZES.margin,
  },
});

export default globalStyles;
