/**
 * Ad Service - Configuration et gestion des publicités AdMob
 * Utilise react-native-google-mobile-ads
 */

import { Platform } from 'react-native';

// IDs de test Google (remplacer par vos vrais IDs en production)
const TEST_IDS = {
  BANNER: Platform.select({
    ios: 'ca-app-pub-3940256099942544/2934735716',
    android: 'ca-app-pub-3940256099942544/6300978111',
  }),
  INTERSTITIAL: Platform.select({
    ios: 'ca-app-pub-3940256099942544/4411468910',
    android: 'ca-app-pub-3940256099942544/1033173712',
  }),
  REWARDED: Platform.select({
    ios: 'ca-app-pub-3940256099942544/1712485313',
    android: 'ca-app-pub-3940256099942544/5224354917',
  }),
};

// IDs de production (à remplir avec vos vrais IDs AdMob)
const PRODUCTION_IDS = {
  BANNER: Platform.select({
    ios: 'ca-app-pub-XXXX/YYYY', // Remplacer
    android: 'ca-app-pub-XXXX/YYYY', // Remplacer
  }),
  INTERSTITIAL: Platform.select({
    ios: 'ca-app-pub-XXXX/YYYY',
    android: 'ca-app-pub-XXXX/YYYY',
  }),
  REWARDED: Platform.select({
    ios: 'ca-app-pub-XXXX/YYYY',
    android: 'ca-app-pub-XXXX/YYYY',
  }),
};

// Utiliser les IDs de test en développement
const IS_DEVELOPMENT = __DEV__;
const AD_IDS = IS_DEVELOPMENT ? TEST_IDS : PRODUCTION_IDS;

export const AdUnitIds = {
  banner: AD_IDS.BANNER,
  interstitial: AD_IDS.INTERSTITIAL,
  rewarded: AD_IDS.REWARDED,
};

/**
 * Initialise les ads (à appeler au démarrage de l'app)
 */
export const initializeAds = async () => {
  try {
    // L'initialisation est automatique avec react-native-google-mobile-ads
    // Mais on peut configurer des options ici si besoin
    console.log('Ads initialized (using test IDs:', IS_DEVELOPMENT, ')');
    return true;
  } catch (error) {
    console.error('Failed to initialize ads:', error);
    return false;
  }
};

export default {
  AdUnitIds,
  initializeAds,
  IS_DEVELOPMENT,
};
