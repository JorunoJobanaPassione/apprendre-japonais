/**
 * App.js - Point d'entrée de l'application
 */

// IMPORTANT: react-native-gesture-handler doit être importé en premier
import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { PremiumProvider, usePremium } from './src/contexts/PremiumContext';
import PaywallModal from './src/components/PaywallModal';

// Composant wrapper pour le Paywall global
function AppWithPaywall() {
  const { showPaywall, closePaywall, handlePurchaseSuccess } = usePremium();

  return (
    <>
      <StatusBar style="light" />
      <AppNavigator />
      <PaywallModal
        visible={showPaywall}
        onClose={closePaywall}
        onPurchaseSuccess={handlePurchaseSuccess}
      />
    </>
  );
}

export default function App() {
  return (
    <PremiumProvider>
      <AppWithPaywall />
    </PremiumProvider>
  );
}
