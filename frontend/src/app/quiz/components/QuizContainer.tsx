"use client";

import { useState, useEffect } from "react";
import QuizCard from "./QuizCard";
import QuizFinishPage from "./QuizFinishPage";
import { QuizState, initializeQuiz, getNextQuestion } from "../utils/quizUtils";

export default function QuizContainer() {
  const [quizState, setQuizState] = useState<QuizState | null>(null);

  useEffect(() => {
    const initialState = initializeQuiz();
    setQuizState(initialState);
  }, []);

  const handleContinue = (isCorrect: boolean, timeTaken: number) => {
    if (!quizState) return;

    const updatedState = { ...quizState };
    if (isCorrect) {
      updatedState.score += 10;
      const additionalScore = Math.floor(10 - timeTaken);
      if (additionalScore > 0) updatedState.score += additionalScore;
    }

    const nextState = getNextQuestion(updatedState);
    setQuizState(nextState);
  };

  if (!quizState) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
        <div className="text-lg text-gray-600">Loading quiz...</div>
      </div>
    );
  }

  if (quizState.isFinished || !quizState.currentQuestion) {
    return (
      <QuizFinishPage
        score={quizState.score}
      />
    );
  }

  return (
    <div>
      <div className="max-w-2xl mx-auto mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>
            Question {quizState.questionNumber} of {quizState.totalQuestions}
          </span>
          <span>
            {Math.round(
              ((quizState.questionNumber - 1) / quizState.totalQuestions) * 100
            )}
            % Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${
                ((quizState.questionNumber - 1) / quizState.totalQuestions) *
                100
              }%`,
            }}
          ></div>
        </div>
      </div>

      <QuizCard
        key={quizState.currentQuestion.id}
        question={quizState.currentQuestion}
        onContinue={handleContinue}
      />
    </div>
  );
}

export type { QuizContainerProps };
