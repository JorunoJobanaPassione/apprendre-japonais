import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import { AnimatedCard, AnimatedButton } from '../components';

const QUESTION_OPTIONS = [
  {
    value: 10,
    label: 'Rapide',
    icon: '⚡',
    duration: '~3-5 minutes',
    description: 'Parfait pour une session courte'
  },
  {
    value: 15,
    label: 'Standard',
    icon: '📚',
    duration: '~5-8 minutes',
    description: 'Équilibre entre rapidité et pratique'
  },
  {
    value: 20,
    label: 'Complet',
    icon: '🎯',
    duration: '~8-12 minutes',
    description: 'Pour une pratique approfondie'
  }
];

export default function LessonConfigScreen({ route, navigation }) {
  const { lesson, lessonIndex } = route.params;
  const [selectedCount, setSelectedCount] = useState(null);
  const [defaultChoice, setDefaultChoice] = useState(15); // Par défaut : Standard

  useEffect(() => {
    loadDefaultChoice();
  }, []);

  const loadDefaultChoice = async () => {
    try {
      const saved = await AsyncStorage.getItem('@japonais_preferred_question_count');
      if (saved) {
        const count = parseInt(saved);
        setDefaultChoice(count);
        setSelectedCount(count); // Présélectionner le choix par défaut
      } else {
        setSelectedCount(15); // Présélectionner Standard par défaut
      }
    } catch (error) {
      console.log('Erreur chargement choix:', error);
      setSelectedCount(15);
    }
  };

  const saveDefaultChoice = async (count) => {
    try {
      await AsyncStorage.setItem('@japonais_preferred_question_count', count.toString());
    } catch (error) {
      console.log('Erreur sauvegarde choix:', error);
    }
  };

  const handleSelectOption = (value) => {
    setSelectedCount(value);
    saveDefaultChoice(value);
  };

  const handleStart = () => {
    navigation.navigate('Lesson', {
      lesson,
      lessonIndex,
      questionCount: selectedCount
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{lesson.title}</Text>
          <Text style={styles.headerSubtitle}>Choisissez la durée</Text>
        </View>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {QUESTION_OPTIONS.map((option) => (
          <AnimatedCard
            key={option.value}
            style={[
              styles.optionCard,
              selectedCount === option.value && styles.selectedCard
            ]}
            onPress={() => handleSelectOption(option.value)}
          >
            <View style={styles.optionHeader}>
              <Text style={styles.optionIcon}>{option.icon}</Text>
              <View style={styles.optionTitleContainer}>
                <Text style={styles.optionLabel}>{option.label}</Text>
                <Text style={styles.optionQuestions}>{option.value} questions</Text>
              </View>
              {selectedCount === option.value && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </View>
            <Text style={styles.optionDuration}>{option.duration}</Text>
            <Text style={styles.optionDescription}>{option.description}</Text>
          </AnimatedCard>
        ))}
      </View>

      {/* Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoIcon}>💡</Text>
        <Text style={styles.infoText}>
          Les questions seront sélectionnées aléatoirement parmi tous les exercices de la leçon.
        </Text>
      </View>

      {/* Bouton Commencer */}
      <AnimatedButton
        onPress={handleStart}
        disabled={!selectedCount}
        style={styles.startButton}
      >
        <Text style={styles.startButtonText}>
          {selectedCount ? `Commencer (${selectedCount} questions)` : 'Sélectionnez une option'}
        </Text>
      </AnimatedButton>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    backgroundColor: '#667eea',
    padding: 20,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  backIcon: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  optionsContainer: {
    padding: 20,
    gap: 15,
  },
  optionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 3,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedCard: {
    borderColor: '#667eea',
    backgroundColor: '#f0f3ff',
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  optionTitleContainer: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  optionQuestions: {
    fontSize: 16,
    color: '#667eea',
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 28,
    color: '#667eea',
    fontWeight: 'bold',
  },
  optionDuration: {
    fontSize: 15,
    color: '#6b7280',
    marginBottom: 8,
    fontWeight: '500',
  },
  optionDescription: {
    fontSize: 14,
    color: '#9ca3af',
    lineHeight: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff3cd',
    margin: 20,
    padding: 15,
    borderRadius: 12,
    alignItems: 'flex-start',
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 10,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
  startButton: {
    margin: 20,
    marginTop: 'auto',
    backgroundColor: '#667eea',
    padding: 18,
    borderRadius: 16,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
