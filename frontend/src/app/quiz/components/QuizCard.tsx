"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { QuizQuestion } from "@/data/types/quiz";

// Component-specific types
interface QuizCardProps {
  question: QuizQuestion;
  onContinue: (isCorrect: boolean, timeTaken: number) => void;
}

type AnswerState = "unanswered" | "correct" | "incorrect";

export default function QuizCard({ question, onContinue }: QuizCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>("unanswered");
  const [questionStartTime, setQuestionStartTime] = useState<number>(0);
  const [timeTaken, setTimeTaken] = useState<number>(0);

  useEffect(() => {
    setQuestionStartTime(Date.now());
  }, [question]);

  const handleAnswerSelect = (optionIndex: number) => {
    if (answerState !== "unanswered") return; // Prevent changing answer after selection

    const answerTime = Date.now();
    const timeTaken = (answerTime - questionStartTime) / 1000; // in seconds
    setTimeTaken(timeTaken);
    console.log(`Time taken: ${timeTaken}s for question: ${question.quote}`);

    setSelectedAnswer(optionIndex);
    const isCorrect = optionIndex === question.correct_answer;
    setAnswerState(isCorrect ? "correct" : "incorrect");
  };

  const getOptionStyle = (optionIndex: number) => {
    if (answerState === "unanswered") {
      return "bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer";
    }

    if (optionIndex === question.correct_answer) {
      return "bg-green-100 border-green-500 text-green-800";
    }

    if (
      optionIndex === selectedAnswer &&
      optionIndex !== question.correct_answer
    ) {
      return "bg-red-100 border-red-500 text-red-800";
    }

    return "bg-gray-50 border-gray-200 text-gray-500";
  };

  const getOptionIcon = (optionIndex: number) => {
    if (answerState === "unanswered") return null;

    if (optionIndex === question.correct_answer) {
      return (
        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">
          ✓
        </span>
      );
    }

    if (
      optionIndex === selectedAnswer &&
      optionIndex !== question.correct_answer
    ) {
      return (
        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-bold">
          ✗
        </span>
      );
    }

    return null;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Question Section */}
      <div className="mb-8">
        <div className="mb-4">
          <span className="text-md font-medium text-gray-600 flex items-center">
            {question.category === "global" ? (
              <>
                <span className="mr-3">🌍</span>
                <span>Global Figure</span>
              </>
            ) : (
              <>
                <span className="mr-3">🇮🇩</span>
                <span>Indonesian Figure</span>
              </>
            )}
          </span>
        </div>

        <blockquote className="text-lg italic text-gray-700 border-l-4 border-gray-300 pl-6 py-4 bg-gray-50 rounded-r-lg">
          &ldquo;{question.quote}&rdquo;
        </blockquote>
      </div>

      {/* Options Section */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            disabled={answerState !== "unanswered"}
            className={cn(
              "w-full p-4 text-left border-2 rounded-lg transition-all duration-200 flex items-center justify-between",
              getOptionStyle(index),
              answerState === "unanswered" && "transform hover:scale-[1.02]"
            )}
          >
            <span className="font-medium">{option}</span>
            {getOptionIcon(index)}
          </button>
        ))}
      </div>

      {/* Feedback and Continue Section */}
      {answerState !== "unanswered" && (
        <div className="text-center">
          <button
            onClick={() => onContinue(answerState === "correct", timeTaken)}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}

export type { QuizCardProps };
