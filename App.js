import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import LessonConfigScreen from './src/screens/LessonConfigScreen';
import LessonScreen from './src/screens/LessonScreen';
import StatsScreen from './src/screens/StatsScreen';
import BadgesScreen from './src/screens/BadgesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right'
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LessonConfig" component={LessonConfigScreen} />
        <Stack.Screen name="Lesson" component={LessonScreen} />
        <Stack.Screen name="Stats" component={StatsScreen} />
        <Stack.Screen name="Badges" component={BadgesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
