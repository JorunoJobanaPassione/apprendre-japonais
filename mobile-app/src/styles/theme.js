/**
 * Theme - Couleurs, tailles et styles globaux de l'app
 * Basé sur le design de la version web
 */

export const COLORS = {
  // Couleurs principales (nouveau design)
  primary: '#e74c3c', // Rouge/rose du design
  primaryDark: '#c0392b',
  primaryLight: '#ff6b6b',

  // Accent violet (card quiz)
  accent: '#8b5cf6',
  accentLight: '#a78bfa',

  // Ancien primary (pour rétro-compatibilité)
  primaryOld: '#667eea',

  // Couleurs de fond
  background: '#1a1a2e',
  backgroundLight: '#16213e',
  backgroundDark: '#0f0f1e',

  // Couleurs de surface (cartes, modales)
  surface: '#16213e',
  surfaceLight: '#1e2f4f',
  surfaceDark: '#0f1929',

  // Couleurs de texte
  text: '#ffffff',
  textSecondary: '#b0b0b0',
  textMuted: '#808080',
  textOnPrimary: '#ffffff',

  // Couleurs d'état (Anti-Duolingo: bleu/teal pour correct, orange/ambre pour erreur)
  success: '#2bb3c0',
  error: '#e6a341',
  warning: '#ffa726',
  info: '#29b6f6',

  // Couleurs spécifiques
  accent: '#764ba2',
  accentSecondary: '#f093fb',

  // Vies
  lives: '#ff6b9d',
  livesGradientStart: '#ff6b9d',
  livesGradientEnd: '#c44569',

  // SRS (couleurs alignées avec feedback)
  srsEasy: '#2bb3c0',
  srsGood: '#29b6f6',
  srsHard: '#ffa726',
  srsAgain: '#e6a341',
  srsPerfect: '#9c27b0',

  // Badges
  badgeGold: '#ffd700',
  badgeSilver: '#c0c0c0',
  badgeBronze: '#cd7f32',

  // Streak
  streakFire: '#ff6348',

  // XP
  xpBar: '#4caf50',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.7)',
  overlayLight: 'rgba(0, 0, 0, 0.5)',

  // Bordures
  border: '#2d3561',
  borderLight: '#3d4571',

  // Transparent
  transparent: 'transparent',
};

export const GRADIENTS = {
  primary: ['#667eea', '#764ba2'],
  card: ['#16213e', '#0f1929'],
  lives: ['#ff6b9d', '#c44569'],
  success: ['#2bb3c0', '#1f8f9a'],
  accent: ['#f093fb', '#f5576c'],
};

export const FONTS = {
  // Tailles de police (sizes)
  tiny: 10,
  small: 12,
  medium: 14,
  regular: 16,
  large: 18,
  xLarge: 20,
  xxLarge: 24,
  xxxLarge: 32,
  huge: 48,

  // Familles de polices (pour fontFamily - doit être une chaîne)
  bold: 'System',
  // Note: Sur React Native, 'System' est la police par défaut
  // fontWeight: 'bold' gère le gras, pas fontFamily
};

export const SIZES = {
  // Padding & Margin
  padding: 16,
  paddingSmall: 8,
  paddingLarge: 24,
  margin: 16,
  marginSmall: 8,
  marginLarge: 24,

  // Border radius
  radius: 12,
  radiusSmall: 8,
  radiusLarge: 16,
  radiusRound: 50,

  // Heights
  buttonHeight: 50,
  buttonHeightSmall: 40,
  buttonHeightLarge: 60,
  inputHeight: 50,
  headerHeight: 60,
  footerHeight: 80,

  // Icons
  iconSmall: 20,
  icon: 24,
  iconLarge: 32,
  iconXLarge: 48,

  // Character cards
  characterCardSize: 80,

  // Screen
  screenPadding: 20,
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const ANIMATIONS = {
  duration: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  easing: 'ease-in-out',
};

export default {
  COLORS,
  GRADIENTS,
  FONTS,
  SIZES,
  SHADOWS,
  ANIMATIONS,
};
