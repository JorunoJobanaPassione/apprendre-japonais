/**
 * App Navigator - Configuration de la navigation principale
 * Utilise React Navigation avec Stack et Bottom Tabs
 */

import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Screens
import HomeScreen from '../screens/HomeScreen';
import LessonsScreen from '../screens/LessonsScreen';
import LessonDetailScreen from '../screens/LessonDetailScreen';
import ExerciseScreen from '../screens/ExerciseScreen';
import SRSScreen from '../screens/SRSScreen';
import SRSReviewScreen from '../screens/SRSReviewScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DailyChallengeScreen from '../screens/DailyChallengeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';

// Theme
import { COLORS } from '../styles/theme';

// Composant simple pour les icônes de tab (emoji)
function TabIcon({ emoji }) {
  return (
    <Text style={{ fontSize: 24, textAlign: 'center' }}>{emoji}</Text>
  );
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator pour les écrans principaux
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 70,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color }) => (
            <TabIcon emoji="🏠" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Lessons"
        component={LessonsScreen}
        options={{
          tabBarLabel: 'Leçons',
          tabBarIcon: ({ color }) => (
            <TabIcon emoji="📚" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SRS"
        component={SRSScreen}
        options={{
          tabBarLabel: 'Révisions',
          tabBarIcon: ({ color }) => (
            <TabIcon emoji="🧠" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color }) => (
            <TabIcon emoji="👤" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Stack Navigator principal
function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.background,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.border,
          },
          headerTintColor: COLORS.text,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LessonDetail"
          component={LessonDetailScreen}
          options={({ route }) => ({
            title: route.params?.lessonTitle || 'Leçon',
          })}
        />
        <Stack.Screen
          name="Exercise"
          component={ExerciseScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SRSReview"
          component={SRSReviewScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DailyChallenge"
          component={DailyChallengeScreen}
          options={{
            title: 'Défi du Jour',
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Paramètres',
          }}
        />
        <Stack.Screen
          name="Leaderboard"
          component={LeaderboardScreen}
          options={{
            title: 'Classement',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
