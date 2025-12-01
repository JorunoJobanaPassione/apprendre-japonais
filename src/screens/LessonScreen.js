import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert
} from 'react-native';
import { saveProgress, saveStats, loadStats, saveBadges, loadBadges, updateStreak } from '../utils/storage';
import { selectRandomQuestions } from '../utils/questionSelector';
import { badges } from '../data/badges';
import {
  AnimatedFeedback,
  AnimatedExerciseTransition,
  AnimatedBadgeUnlock,
  AnimatedButton
} from '../components';

export default function LessonScreen({ route, navigation }) {
  const { lesson, questionCount = 20 } = route.params; // Par défaut 20 questions

  // Sélectionner les questions aléatoirement selon le nombre choisi
  const selectedLesson = useMemo(() => {
    const selectedSteps = selectRandomQuestions(lesson, questionCount);
    return { ...lesson, steps: selectedSteps };
  }, [lesson, questionCount]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [shuffledOptions, setShuffledOptions] = useState([]);

  // États pour les animations
  const [showAnimatedFeedback, setShowAnimatedFeedback] = useState(false);
  const [badgeToShow, setBadgeToShow] = useState(null);
  const [showBadgeModal, setShowBadgeModal] = useState(false);

  const currentStep = selectedLesson.steps[currentStepIndex];
  const progress = ((currentStepIndex + 1) / selectedLesson.steps.length) * 100;

  // Fonction pour mélanger un tableau
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Calculer le nombre total de questions dans la leçon
  const calculateTotalQuestions = () => {
    let total = 0;
    selectedLesson.steps.forEach(step => {
      if (step.questions) {
        total += step.questions.length;
      } else if (step.content) {
        total += step.content.length;
      }
    });
    return total;
  };

  // Calculer le numéro de la question actuelle
  const getCurrentQuestionNumber = () => {
    let questionNumber = 1;
    for (let i = 0; i < currentStepIndex; i++) {
      const step = selectedLesson.steps[i];
      if (step.questions) {
        questionNumber += step.questions.length;
      } else if (step.content) {
        questionNumber += step.content.length;
      }
    }
    questionNumber += currentQuestionIndex + 1;
    return questionNumber;
  };

  const totalQuestionsInLesson = calculateTotalQuestions();

  useEffect(() => {
    navigation.setOptions({
      title: lesson.title
    });
  }, []);

  // Mélanger les options quand une nouvelle question apparaît
  useEffect(() => {
    if (currentStep.type === 'mcq' && currentStep.questions) {
      const question = currentStep.questions[currentQuestionIndex];
      setShuffledOptions(shuffleArray(question.options));
    } else if (currentStep.type === 'intruder' && currentStep.questions) {
      const question = currentStep.questions[currentQuestionIndex];
      setShuffledOptions(shuffleArray(question.options));
    } else if (currentStep.type === 'sentence' && currentStep.content) {
      const content = currentStep.content[currentQuestionIndex];
      if (content.options) {
        setShuffledOptions(shuffleArray(content.options));
      }
    }
  }, [currentQuestionIndex, currentStepIndex]);

  const handleExit = () => {
    Alert.alert(
      'Quitter la leçon ?',
      'Votre progression sera perdue',
      [
        {
          text: 'Annuler',
          style: 'cancel'
        },
        {
          text: 'Quitter',
          style: 'destructive',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  const handleAnswer = (answer) => {
    if (currentStep.type === 'mcq') {
      const question = currentStep.questions[currentQuestionIndex];
      const correct = answer === question.correct;

      setSelectedAnswer(answer);
      setIsCorrect(correct);
      setShowFeedback(true);
      setShowAnimatedFeedback(true);

      if (correct) {
        setScore(score + 1);
      }
      setTotalQuestions(totalQuestions + 1);
    } else if (currentStep.type === 'intruder') {
      const question = currentStep.questions[currentQuestionIndex];
      const correct = answer === question.intruder;

      setSelectedAnswer(answer);
      setIsCorrect(correct);
      setShowFeedback(true);
      setShowAnimatedFeedback(true);

      if (correct) {
        setScore(score + 1);
      }
      setTotalQuestions(totalQuestions + 1);
    } else if (currentStep.type === 'sentence') {
      const question = currentStep.content[currentQuestionIndex];
      const correct = answer === question.correct;

      setSelectedAnswer(answer);
      setIsCorrect(correct);
      setShowFeedback(true);
      setShowAnimatedFeedback(true);

      if (correct) {
        setScore(score + 1);
      }
      setTotalQuestions(totalQuestions + 1);
    }
  };

  const handleInputSubmit = () => {
    if (currentStep.type === 'inputKana' || currentStep.type === 'transcription') {
      const question = currentStep.questions[currentQuestionIndex];
      const userAnswer = userInput.toLowerCase().trim();
      const correctAnswer = question.correct.toLowerCase();

      // Vérifier si la réponse est correcte (exact ou alternative)
      let correct = userAnswer === correctAnswer;

      // Si pas correct, vérifier les alternatives si elles existent
      if (!correct && question.alternatives) {
        correct = question.alternatives.some(alt => userAnswer === alt.toLowerCase());
      }

      setIsCorrect(correct);
      setShowFeedback(true);
      setShowAnimatedFeedback(true);

      if (correct) {
        setScore(score + 1);
      }
      setTotalQuestions(totalQuestions + 1);
    }
  };

  const handleNext = () => {
    if (currentStep.type === 'presentation') {
      // Passer à l'étape suivante
      if (currentStepIndex < selectedLesson.steps.length - 1) {
        setCurrentStepIndex(currentStepIndex + 1);
        setCurrentQuestionIndex(0);
        setShowFeedback(false);
        setShowAnimatedFeedback(false);
      } else {
        completeLesson();
      }
    } else if (showFeedback) {
      // Question suivante
      const hasQuestions = currentStep.questions || currentStep.content;
      if (currentQuestionIndex < hasQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setShowAnimatedFeedback(false);
        setUserInput('');
      } else {
        // Étape suivante
        if (currentStepIndex < selectedLesson.steps.length - 1) {
          setCurrentStepIndex(currentStepIndex + 1);
          setCurrentQuestionIndex(0);
          setSelectedAnswer(null);
          setShowFeedback(false);
          setShowAnimatedFeedback(false);
          setUserInput('');
        } else {
          completeLesson();
        }
      }
    }
  };

  // Fonction pour vérifier les nouveaux badges débloqués
  const checkForNewBadges = async (stats) => {
    const unlockedBadges = await loadBadges();
    const newBadges = [];

    for (const badge of badges) {
      // Vérifier si le badge n'est pas déjà débloqué
      if (!unlockedBadges.find(b => b.id === badge.id)) {
        // Vérifier si la condition est remplie
        if (badge.condition(stats)) {
          newBadges.push({
            id: badge.id,
            emoji: badge.icon,
            name: badge.title,
            description: badge.description,
            rarity: badge.rarity,
            unlockedAt: new Date().toISOString()
          });
        }
      }
    }

    // Sauvegarder les nouveaux badges
    if (newBadges.length > 0) {
      const allBadges = [...unlockedBadges, ...newBadges];
      await saveBadges(allBadges);
      // Afficher le premier nouveau badge
      setBadgeToShow(newBadges[0]);
      setShowBadgeModal(true);
    }

    return newBadges;
  };

  const completeLesson = async () => {
    const finalScore = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

    // Sauvegarder la progression
    await saveProgress(lesson.id, currentStepIndex, finalScore);

    // Mettre à jour la série
    await updateStreak();

    // Mettre à jour les stats
    const stats = await loadStats();
    if (!stats.lessonsCompleted.includes(lesson.id)) {
      stats.lessonsCompleted.push(lesson.id);
    }
    stats.totalScore += finalScore;
    stats.averageScore = stats.totalScore / stats.lessonsCompleted.length;

    // Mettre à jour le meilleur score
    if (finalScore > (stats.bestScore || 0)) {
      stats.bestScore = finalScore;
    }

    // Compter les scores parfaits
    if (finalScore === 100) {
      stats.perfectScores = (stats.perfectScores || 0) + 1;
    }

    stats.completedLessons = stats.lessonsCompleted.length;
    await saveStats(stats);

    // Charger la série pour les badges
    const { currentStreak } = await loadStreak();
    stats.currentStreak = currentStreak;

    // Vérifier les nouveaux badges
    const newBadges = await checkForNewBadges(stats);

    // Si pas de badge, afficher l'alerte de fin
    if (newBadges.length === 0) {
      Alert.alert(
        'Leçon terminée !',
        `Votre score : ${Math.round(finalScore)}%`,
        [
          {
            text: 'Retour à l\'accueil',
            onPress: () => navigation.navigate('Home')
          }
        ]
      );
    }
  };

  const renderStep = () => {
    switch (currentStep.type) {
      case 'presentation':
        return (
          <ScrollView style={styles.stepContent}>
            <Text style={styles.instruction}>{currentStep.instruction}</Text>
            <View style={styles.hiraganaGrid}>
              {lesson.hiragana.map((item, index) => (
                <View key={index} style={styles.hiraganaCard}>
                  <Text style={styles.hiraganaChar}>{item.char}</Text>
                  <Text style={styles.hiraganaRomaji}>{item.romaji}</Text>
                  {item.note ? (
                    <Text style={styles.hiraganaNote}>{item.note}</Text>
                  ) : null}
                </View>
              ))}
            </View>
          </ScrollView>
        );

      case 'mcq':
        const mcqQuestion = currentStep.questions[currentQuestionIndex];
        return (
          <View style={styles.stepContent}>
            <Text style={styles.instruction}>{currentStep.instruction}</Text>
            <View style={styles.questionContainer}>
              <Text style={styles.hiraganaQuestion}>{mcqQuestion.hiragana}</Text>
            </View>
            <View style={styles.optionsContainer}>
              {shuffledOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedAnswer === option && styles.selectedOption,
                    showFeedback && option === mcqQuestion.correct && styles.correctOption,
                    showFeedback && selectedAnswer === option && !isCorrect && styles.incorrectOption
                  ]}
                  onPress={() => handleAnswer(option)}
                  disabled={Boolean(showFeedback)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 'intruder':
        const intruderQuestion = currentStep.questions[currentQuestionIndex];
        return (
          <View style={styles.stepContent}>
            <Text style={styles.instruction}>{currentStep.instruction}</Text>
            <Text style={styles.groupLabel}>Groupe : {intruderQuestion.group}</Text>
            <View style={styles.optionsContainer}>
              {shuffledOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedAnswer === option && styles.selectedOption,
                    showFeedback && option === intruderQuestion.intruder && styles.correctOption,
                    showFeedback && selectedAnswer === option && !isCorrect && styles.incorrectOption
                  ]}
                  onPress={() => handleAnswer(option)}
                  disabled={Boolean(showFeedback)}
                >
                  <Text style={styles.hiraganaOptionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {showFeedback && (
              <Text style={styles.explanation}>{intruderQuestion.explanation}</Text>
            )}
          </View>
        );

      case 'inputKana':
        const inputQuestion = currentStep.questions[currentQuestionIndex];
        return (
          <View style={styles.stepContent}>
            <Text style={styles.instruction}>{currentStep.instruction}</Text>
            <View style={styles.questionContainer}>
              <Text style={styles.hiraganaQuestion}>{inputQuestion.hiragana}</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Tapez en romaji"
              value={userInput}
              onChangeText={setUserInput}
              onSubmitEditing={handleInputSubmit}
              autoCapitalize="none"
              autoCorrect={false}
              editable={showFeedback ? false : true}
            />
            {!showFeedback && (
              <AnimatedButton
                onPress={handleInputSubmit}
                style={styles.submitButton}
                title="Valider"
                textStyle={styles.submitButtonText}
              />
            )}
          </View>
        );

      case 'transcription':
        const transcriptionQuestion = currentStep.questions[currentQuestionIndex];
        return (
          <View style={styles.stepContent}>
            <Text style={styles.instruction}>{currentStep.instruction}</Text>
            <View style={styles.transcriptionCard}>
              <Text style={styles.hiraganaQuestion}>{transcriptionQuestion.hiragana}</Text>
              {transcriptionQuestion.meaning && (
                <Text style={styles.meaningText}>({transcriptionQuestion.meaning})</Text>
              )}
            </View>
            <TextInput
              style={styles.input}
              placeholder="Transcrivez en romaji..."
              value={userInput}
              onChangeText={setUserInput}
              onSubmitEditing={handleInputSubmit}
              autoCapitalize="none"
              autoCorrect={false}
              editable={showFeedback ? false : true}
            />
            {showFeedback && (
              <View style={styles.correctAnswerBox}>
                <Text style={styles.correctAnswerLabel}>Réponse correcte :</Text>
                <Text style={styles.correctAnswerText}>{transcriptionQuestion.correct}</Text>
              </View>
            )}
            {!showFeedback && (
              <AnimatedButton
                onPress={handleInputSubmit}
                style={styles.submitButton}
                title="Valider"
                textStyle={styles.submitButtonText}
              />
            )}
          </View>
        );

      case 'sentence':
        const sentenceContent = currentStep.content[currentQuestionIndex];
        return (
          <ScrollView style={styles.stepContent}>
            <Text style={styles.instruction}>{currentStep.instruction}</Text>
            {sentenceContent.type === 'word' ? (
              <View>
                <View style={styles.wordCard}>
                  <Text style={styles.japanese}>{sentenceContent.japanese}</Text>
                  {/* <Text style={styles.romaji}>{sentenceContent.romaji}</Text> */}
                  {/* <Text style={styles.meaning}>{sentenceContent.meaning}</Text> */}
                </View>
                <Text style={styles.question}>{sentenceContent.question}</Text>
                <View style={styles.optionsContainer}>
                  {shuffledOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.optionButton,
                        selectedAnswer === option && styles.selectedOption,
                        showFeedback && option === sentenceContent.correct && styles.correctOption,
                        showFeedback && selectedAnswer === option && !isCorrect && styles.incorrectOption
                      ]}
                      onPress={() => handleAnswer(option)}
                      disabled={showFeedback}
                    >
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ) : (
              <View>
                <Text style={styles.miniTextTitle}>{sentenceContent.title}</Text>
                {sentenceContent.text.map((line, index) => (
                  <View key={index} style={styles.dialogueLine}>
                    <Text style={styles.speaker}>{line.speaker}:</Text>
                    <Text style={styles.japanese}>{line.line}</Text>
                    {/* <Text style={styles.romaji}>{line.romaji}</Text> */}
                    {/* <Text style={styles.translation}>{line.translation}</Text> */}
                  </View>
                ))}
                <Text style={styles.question}>{sentenceContent.question}</Text>
                <View style={styles.optionsContainer}>
                  {shuffledOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.optionButton,
                        selectedAnswer === option && styles.selectedOption,
                        showFeedback && option === sentenceContent.correct && styles.correctOption,
                        showFeedback && selectedAnswer === option && !isCorrect && styles.incorrectOption
                      ]}
                      onPress={() => handleAnswer(option)}
                      disabled={showFeedback}
                    >
                      <Text style={styles.hiraganaOptionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          </ScrollView>
        );

      default:
        return <Text>Type d'étape inconnu</Text>;
    }
  };

  const canProceed = () => {
    if (currentStep.type === 'presentation') {
      return true;
    }
    return showFeedback;
  };

  // Afficher le compteur de questions uniquement pour les types avec questions
  const shouldShowQuestionCounter = () => {
    return currentStep.type !== 'presentation';
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header avec X et compteur */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.exitButton}
          onPress={handleExit}
        >
          <Text style={styles.exitIcon}>✕</Text>
        </TouchableOpacity>

        {shouldShowQuestionCounter() && (
          <Text style={styles.questionCounter}>
            Question {getCurrentQuestionNumber()} / {totalQuestionsInLesson}
          </Text>
        )}
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>{currentStep.title}</Text>
        <Text style={styles.stepNumber}>
          Étape {currentStepIndex + 1}/{selectedLesson.steps.length}
        </Text>
      </View>

      {/* Animation de transition entre exercices */}
      <AnimatedExerciseTransition exerciseIndex={currentStepIndex * 1000 + currentQuestionIndex}>
        {renderStep()}
      </AnimatedExerciseTransition>

      {/* Feedback animé */}
      <AnimatedFeedback
        visible={showAnimatedFeedback}
        isCorrect={isCorrect}
      />

      {/* Badge unlock modal */}
      <AnimatedBadgeUnlock
        visible={showBadgeModal}
        badge={badgeToShow}
        onClose={() => {
          setShowBadgeModal(false);
          setBadgeToShow(null);
          // Retourner à l'accueil après avoir fermé le badge
          Alert.alert(
            'Leçon terminée !',
            `Vous avez débloqué un nouveau badge ! 🎉`,
            [
              {
                text: 'Retour à l\'accueil',
                onPress: () => navigation.navigate('Home')
              }
            ]
          );
        }}
      />

      {/* Bouton suivant avec animation */}
      <AnimatedButton
        onPress={handleNext}
        disabled={!canProceed()}
        style={styles.nextButton}
        textStyle={styles.nextButtonText}
      >
        <Text style={styles.nextButtonText}>
          {currentStepIndex === selectedLesson.steps.length - 1 &&
          (currentStep.type === 'presentation' ||
            (currentStep.questions || currentStep.content) &&
            currentQuestionIndex === (currentStep.questions || currentStep.content).length - 1)
            ? 'Terminer'
            : 'Suivant'}
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#2d2d2d',
  },
  exitButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitIcon: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  questionCounter: {
    fontSize: 14,
    color: '#9ca3af',
    fontWeight: '500',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#3d3d3d',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#667eea',
  },
  stepHeader: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  stepNumber: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  stepContent: {
    flex: 1,
    padding: 20,
  },
  instruction: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  hiraganaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  hiraganaCard: {
    backgroundColor: 'white',
    width: '30%',
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hiraganaChar: {
    fontSize: 48,
    color: '#333',
  },
  hiraganaRomaji: {
    fontSize: 18,
    color: '#667eea',
    marginTop: 5,
  },
  hiraganaNote: {
    fontSize: 10,
    color: '#999',
    marginTop: 5,
    textAlign: 'center',
  },
  questionContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  hiraganaQuestion: {
    fontSize: 80,
    color: '#333',
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionButton: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: '#667eea',
  },
  correctOption: {
    backgroundColor: '#d4edda',
    borderColor: '#4caf50',
  },
  incorrectOption: {
    backgroundColor: '#f8d7da',
    borderColor: '#f44336',
  },
  optionText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
  hiraganaOptionText: {
    fontSize: 32,
    textAlign: 'center',
    color: '#333',
  },
  groupLabel: {
    fontSize: 16,
    color: '#667eea',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  explanation: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 15,
    padding: 15,
    backgroundColor: '#fff3cd',
    borderRadius: 8,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    fontSize: 18,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#667eea',
    padding: 15,
    borderRadius: 12,
    marginTop: 15,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  transcriptionCard: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 16,
    marginBottom: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  meaningText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 10,
    fontStyle: 'italic',
  },
  correctAnswerBox: {
    backgroundColor: '#f0f9ff',
    padding: 15,
    borderRadius: 12,
    marginTop: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  correctAnswerLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 5,
  },
  correctAnswerText: {
    fontSize: 18,
    color: '#667eea',
    fontWeight: 'bold',
  },
  wordCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  japanese: {
    fontSize: 36,
    color: '#333',
    marginBottom: 10,
  },
  romaji: {
    fontSize: 18,
    color: '#667eea',
    marginBottom: 5,
  },
  meaning: {
    fontSize: 16,
    color: '#666',
  },
  question: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
  miniTextTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  dialogueLine: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  speaker: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 5,
  },
  translation: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    fontStyle: 'italic',
  },
  feedback: {
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 12,
  },
  correctFeedback: {
    backgroundColor: '#d4edda',
  },
  incorrectFeedback: {
    backgroundColor: '#f8d7da',
  },
  feedbackText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#667eea',
    padding: 18,
    margin: 20,
    borderRadius: 12,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
