/**
 * Exercise Screen - Écran principal des exercices
 * Gère le flux des exercices, le scoring, les vies, et les résultats
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Modal,
} from 'react-native';
import ExerciseMCQ from '../components/ExerciseMCQ';
import ExerciseTranscription from '../components/ExerciseTranscription';
import ExerciseIntruder from '../components/ExerciseIntruder';
import ExerciseKanji from '../components/ExerciseKanji';
import { ErrorShake } from '../components/FeedbackAnimation';
import {
  prepareExercises,
  validateAnswer,
  calculatePoints,
  calculateSessionStats,
  shouldLoseLife,
  EXERCISE_TYPES,
} from '../services/exerciseService';
import { getCognitiveFeedback, trackError } from '../services/confusionTracker';
import { getProgress, saveProgress } from '../services/storage';
import { getLives, loseLife, checkAutoRecharge, CONFIG } from '../services/livesSystem';
import { incrementQuestProgress } from '../services/questsSystem';
import audioService from '../services/audioService';
import haptic from '../services/hapticService';
import { COLORS, FONTS, SIZES } from '../styles/theme';
import globalStyles from '../styles/globalStyles';
import { usePremium } from '../contexts/PremiumContext';

export default function ExerciseScreen({ route, navigation }) {
  const { lesson } = route.params;
  const { checkCanDoExercise, logExerciseCompleted, limits, openPaywall, isPremium } = usePremium();

  const [exercises, setExercises] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState([]);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(CONFIG.MAX_LIVES);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState({ isCorrect: false, message: '', cognitive: '' });
  const [showResults, setShowResults] = useState(false);
  const [shakeError, setShakeError] = useState(false);
  const [limitReached, setLimitReached] = useState(false);

  // Animations
  const feedbackAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    checkExerciseLimit();
    initializeExercises();
    loadLives();
  }, []);

  const checkExerciseLimit = async () => {
    const result = await checkCanDoExercise();
    if (!result.allowed) {
      setLimitReached(true);
    }
  };


  useEffect(() => {
    // Jouer l'audio du caractère au début de chaque exercice (Feature Audio Intégré)
    if (exercises.length > 0 && currentIndex < exercises.length) {
      const currentExercise = exercises[currentIndex];

      // Attendre un peu pour laisser l'UI se charger, puis jouer l'audio
      const playAudio = async () => {
        // Extraire le romaji selon le type d'exercice
        let romaji = null;

        if (currentExercise.question?.romaji) {
          romaji = currentExercise.question.romaji;
        } else if (currentExercise.character?.romaji) {
          romaji = currentExercise.character.romaji;
        } else if (currentExercise.correctAnswer?.romaji) {
          romaji = currentExercise.correctAnswer.romaji;
        }

        if (romaji) {
          await audioService.play(romaji);
        }
      };

      // Delay de 300ms pour laisser l'animation se terminer
      const timeout = setTimeout(playAudio, 300);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, exercises]);

  const initializeExercises = () => {
    const prepared = prepareExercises(lesson.exercises);
    setExercises(prepared);
  };

  const loadLives = async () => {
    // Vérifier recharge automatique puis récupérer les vies
    const currentLives = await checkAutoRecharge();
    setLives(currentLives);
  };

  const handleAnswer = async (userAnswer) => {
    const currentExercise = exercises[currentIndex];
    const isCorrect = validateAnswer(currentExercise, userAnswer);

    // Calculer points
    const points = calculatePoints(currentExercise.type, isCorrect, streak);

    // Mettre à jour streak
    const newStreak = isCorrect ? streak + 1 : 0;
    setStreak(newStreak);

    // Enregistrer le résultat
    const result = {
      exercise: currentExercise,
      userAnswer,
      isCorrect,
      points,
    };
    const newResults = [...results, result];
    setResults(newResults);

    // Enregistrer exercice complété pour les limites premium
    await logExerciseCompleted();

    // Incrémenter quête "perfect_exercise" si correct
    if (isCorrect) {
      await incrementQuestProgress('perfect_exercise');
    }

    // Préparer le feedback cognitif (Anti-Duolingo: feedback sobre et utile)
    let cognitiveFeedback = '';
    if (!isCorrect) {
      // Tracker l'erreur pour le système cognitif
      const expected = currentExercise.correct || currentExercise.correctAnswer?.character;
      await trackError(expected, userAnswer, currentExercise.type);
      cognitiveFeedback = await getCognitiveFeedback(expected, userAnswer) || '';
    }

    // Afficher feedback toast (pas de "Superbe!" excessif)
    setFeedbackData({
      isCorrect,
      message: isCorrect ? 'Correct' : 'Incorrect',
      cognitive: cognitiveFeedback,
      correctAnswer: !isCorrect ? (currentExercise.correct || currentExercise.correctAnswer?.character) : null,
    });
    setShowFeedback(true);

    // Animations de feedback visuelles + haptic (sans confettis)
    if (isCorrect) {
      haptic.success(); // Vibration de succès
    } else {
      setShakeError(true);
      haptic.error(); // Vibration d'erreur
      setTimeout(() => setShakeError(false), 500);
    }

    // Animation feedback
    Animated.sequence([
      Animated.timing(feedbackAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
      Animated.timing(feedbackAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowFeedback(false);
    });

    // Vérifier perte de vie (3 erreurs consécutives)
    if (shouldLoseLife(newResults, 3) && lives > 0) {
      const newLives = await loseLife();
      setLives(newLives);
      // Haptic feedback pour perte de vie
      if (newLives === 1) {
        haptic.lastLife(); // Warning intense pour dernière vie
      } else {
        haptic.lifeLost();
      }
    }

    // Passer à l'exercice suivant ou afficher résultats
    setTimeout(() => {
      if (currentIndex < exercises.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        showFinalResults(newResults);
      }
    }, 1500);
  };

  const showFinalResults = async (finalResults) => {
    const stats = calculateSessionStats(finalResults);

    // Haptic feedback pour leçon terminée
    haptic.lessonCompleted();

    // Sauvegarder progression
    const progress = await getProgress();
    const updatedProgress = {
      ...progress,
      totalXP: (progress.totalXP || 0) + stats.totalPoints,
      lessonsCompleted: [...new Set([...(progress.lessonsCompleted || []), lesson.id])],
      exercisesCompleted: (progress.exercisesCompleted || 0) + stats.total,
      correctAnswers: (progress.correctAnswers || 0) + stats.correct,
    };
    await saveProgress(updatedProgress);

    // Incrémenter quête "studied_today"
    await incrementQuestProgress('studied_today');

    // Si nouvelle leçon complétée, incrémenter quête
    const isNewLesson = !progress.lessonsCompleted?.includes(lesson.id);
    if (isNewLesson) {
      await incrementQuestProgress('lesson_completed');
    }

    setShowResults(true);
  };

  const renderLimitReached = () => (
    <View style={styles.limitContainer}>
      <Text style={styles.limitEmoji}>{'\u{1F512}'}</Text>
      <Text style={styles.limitTitle}>Limite quotidienne atteinte</Text>
      <Text style={styles.limitText}>
        Vous avez utilisé vos {limits?.exercises?.limit || 20} exercices gratuits aujourd'hui.
      </Text>
      <Text style={styles.limitSubtext}>
        Revenez demain ou passez Premium pour un accès illimité !
      </Text>
      <TouchableOpacity style={styles.premiumButton} onPress={openPaywall}>
        <Text style={styles.premiumButtonText}>{'\u{1F451}'} Devenir Premium</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Retour</Text>
      </TouchableOpacity>
    </View>
  );

  const renderExercise = () => {
    if (limitReached) {
      return renderLimitReached();
    }

    if (exercises.length === 0 || currentIndex >= exercises.length) {
      return null;
    }

    const currentExercise = exercises[currentIndex];

    switch (currentExercise.type) {
      case EXERCISE_TYPES.MCQ:
        return <ExerciseMCQ exercise={currentExercise} onAnswer={handleAnswer} />;

      case EXERCISE_TYPES.TRANSCRIPTION:
        return <ExerciseTranscription exercise={currentExercise} onAnswer={handleAnswer} />;

      case EXERCISE_TYPES.INTRUDER:
        return <ExerciseIntruder exercise={currentExercise} onAnswer={handleAnswer} />;

      // Exercices Kanji (3 types)
      case EXERCISE_TYPES.KANJI_RECOGNITION:
      case EXERCISE_TYPES.KANJI_READING:
      case EXERCISE_TYPES.KANJI_MEANING:
        return <ExerciseKanji exercise={currentExercise} onAnswer={handleAnswer} />;

      default:
        return (
          <View style={styles.unsupportedContainer}>
            <Text style={styles.unsupportedText}>
              Type d'exercice non supporté: {currentExercise.type}
            </Text>
          </View>
        );
    }
  };

  const renderResultsModal = () => {
    const stats = calculateSessionStats(results);

    return (
      <Modal visible={showResults} animationType="slide" transparent={false}>
        <SafeAreaView style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>🎉 Leçon Terminée !</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{`${stats.accuracy}%`}</Text>
              <Text style={styles.statLabel}>Précision</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{`${stats.correct}/${stats.total}`}</Text>
              <Text style={styles.statLabel}>Correct</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={[styles.statValue, { color: COLORS.primary }]}>
                {`+${stats.totalPoints}`}
              </Text>
              <Text style={styles.statLabel}>XP</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.doneButtonText}>Terminé</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={styles.container}>
        {/* Header (Anti-Duolingo: texte simple au lieu de barre de progression) */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>

          {/* Progress Text (au lieu de barre de progression "game") */}
          <Text style={styles.progressText}>
            {currentIndex + 1} / {exercises.length}
          </Text>

          {/* Lives */}
          <View style={styles.livesContainer}>
            <Text style={styles.livesText}>❤️ {lives}</Text>
          </View>
        </View>

        {/* Exercices restants (utilisateurs gratuits) */}
        {!isPremium && limits?.exercises && (
          <View style={styles.remainingBanner}>
            <Text style={styles.remainingText}>
              {limits.exercises.remaining} exercices restants aujourd'hui
            </Text>
          </View>
        )}

        {/* Streak Banner retiré - Anti-Duolingo: focus sur la question, pas sur les stats */}
        {/* Le streak est toujours calculé mais affiché uniquement en fin de session */}

        {/* Exercise with Shake Animation */}
        <ErrorShake shake={shakeError}>
          {renderExercise()}
        </ErrorShake>

        {/* Feedback Toast (Anti-Duolingo: discret, en bas, pas de confettis) */}
        {showFeedback && (
          <Animated.View
            style={[
              styles.feedbackToast,
              feedbackData.isCorrect ? styles.feedbackToastCorrect : styles.feedbackToastIncorrect,
              { opacity: feedbackAnim },
            ]}
          >
            <View style={styles.feedbackToastHeader}>
              <Text style={styles.feedbackToastIcon}>
                {feedbackData.isCorrect ? '✓' : '✗'}
              </Text>
              <Text style={styles.feedbackToastMessage}>{feedbackData.message}</Text>
            </View>
            {!feedbackData.isCorrect && feedbackData.correctAnswer && (
              <Text style={styles.feedbackCorrectAnswer}>
                Réponse : {feedbackData.correctAnswer}
              </Text>
            )}
            {feedbackData.cognitive ? (
              <Text style={styles.feedbackCognitive}>{feedbackData.cognitive}</Text>
            ) : null}
          </Animated.View>
        )}

        {/* Results Modal */}
        {renderResultsModal()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.screenPadding,
    gap: SIZES.margin,
  },
  closeButton: {
    fontSize: 28,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  // Progress Text (Anti-Duolingo: texte sobre au lieu de barre game)
  progressText: {
    flex: 1,
    textAlign: 'center',
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  livesContainer: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.paddingSmall,
    borderRadius: SIZES.radiusSmall,
  },
  livesText: {
    fontSize: FONTS.medium,
    fontWeight: '600',
    color: COLORS.text,
  },
  remainingBanner: {
    backgroundColor: COLORS.warning + '20',
    padding: SIZES.paddingSmall,
    alignItems: 'center',
  },
  remainingText: {
    fontSize: FONTS.small,
    color: COLORS.warning,
    fontWeight: '500',
  },
  // streakBanner retiré - Anti-Duolingo
  unsupportedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.screenPadding,
  },
  unsupportedText: {
    fontSize: FONTS.large,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  // Feedback Toast (Anti-Duolingo: discret, en bas)
  feedbackToast: {
    position: 'absolute',
    bottom: 40,
    left: SIZES.screenPadding,
    right: SIZES.screenPadding,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    paddingVertical: SIZES.padding * 1.2,
  },
  feedbackToastCorrect: {
    backgroundColor: COLORS.success + 'E6', // 90% opacité
  },
  feedbackToastIncorrect: {
    backgroundColor: COLORS.error + 'E6', // 90% opacité
  },
  feedbackToastHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  feedbackToastIcon: {
    fontSize: FONTS.xLarge,
    fontWeight: 'bold',
    color: COLORS.text,
    marginRight: SIZES.marginSmall,
  },
  feedbackToastMessage: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  feedbackCorrectAnswer: {
    fontSize: FONTS.medium,
    color: COLORS.text,
    marginTop: 4,
    opacity: 0.9,
  },
  feedbackCognitive: {
    fontSize: FONTS.medium,
    color: COLORS.text,
    marginTop: SIZES.marginSmall,
    fontStyle: 'italic',
    opacity: 0.9,
  },
  resultsContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    padding: SIZES.screenPadding,
  },
  resultsTitle: {
    fontSize: FONTS.xxxLarge,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SIZES.margin * 3,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: SIZES.margin,
    marginBottom: SIZES.margin * 3,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 2,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONTS.xxxLarge,
    fontWeight: 'bold',
    color: COLORS.success,
    marginBottom: SIZES.marginSmall,
  },
  statLabel: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
  },
  doneButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  // Styles limite atteinte
  limitContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.screenPadding * 2,
  },
  limitEmoji: {
    fontSize: 64,
    marginBottom: SIZES.margin,
  },
  limitTitle: {
    fontSize: FONTS.xxLarge,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SIZES.margin,
  },
  limitText: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.marginSmall,
  },
  limitSubtext: {
    fontSize: FONTS.small,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginBottom: SIZES.margin * 2,
  },
  premiumButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 1.5,
    paddingHorizontal: SIZES.padding * 3,
    marginBottom: SIZES.margin,
  },
  premiumButtonText: {
    fontSize: FONTS.large,
    fontWeight: 'bold',
    color: COLORS.background,
  },
  backButton: {
    padding: SIZES.padding,
  },
  backButtonText: {
    fontSize: FONTS.medium,
    color: COLORS.textSecondary,
  },
});
