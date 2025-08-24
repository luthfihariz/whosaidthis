import { QuizQuestion } from "@/data/types/quiz";
import quizData from "@/data/quiz-questions.json";

export type QuizState = {
  currentQuestion: QuizQuestion | null;
  questionNumber: number;
  totalQuestions: number;
  score: number;
  answeredQuestionIds: number[];
  isFinished: boolean;
}

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Gets all available questions from the JSON data
 */
export function getAllQuestions(): QuizQuestion[] {
  return quizData.questions as QuizQuestion[];
}

/**
 * Initializes a new quiz session
 */
export function initializeQuiz(): QuizState {
  const allQuestions = getAllQuestions();
  const shuffledQuestions = shuffleArray(allQuestions);
  
  return {
    currentQuestion: shuffledQuestions[0] || null,
    questionNumber: 1,
    totalQuestions: 5, // Fixed at 5 questions per quiz
    score: 0,
    answeredQuestionIds: shuffledQuestions[0] ? [shuffledQuestions[0].id] : [],
    isFinished: false,
  };
}

/**
 * Gets the next random question that hasn't been answered yet
 */
export function getNextQuestion(currentState: QuizState): QuizState {
  const allQuestions = getAllQuestions();
  
  // Check if we've reached the question limit
  if (currentState.questionNumber >= currentState.totalQuestions) {
    return {
      ...currentState,
      currentQuestion: null,
      isFinished: true,
    };
  }
  
  // Filter out already answered questions
  const availableQuestions = allQuestions.filter(
    (question) => !currentState.answeredQuestionIds.includes(question.id)
  );
  
  // If no more questions available, finish the quiz
  if (availableQuestions.length === 0) {
    return {
      ...currentState,
      currentQuestion: null,
      isFinished: true,
    };
  }
  
  // Pick a random question from available ones
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  const nextQuestion = availableQuestions[randomIndex];
  
  return {
    ...currentState,
    currentQuestion: nextQuestion,
    questionNumber: currentState.questionNumber + 1,
    answeredQuestionIds: [...currentState.answeredQuestionIds, nextQuestion.id],
    isFinished: false,
  };
}