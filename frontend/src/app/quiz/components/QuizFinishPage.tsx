"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getSession } from "@/lib/sessionUtils";

interface QuizFinishPageProps {
  score: number;
}

type SubmissionStatus = "idle" | "loading" | "success" | "error";

export default function QuizFinishPage({ score }: QuizFinishPageProps) {
  const router = useRouter();
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const saveScore = async () => {
      setStatus("loading");
      const session = getSession();
      if (!session) {
        setErrorMessage("You must be logged in to save your score.");
        setStatus("error");
        return;
      }

      try {
        const response = await fetch("/api/score", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ score, username: session.username }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to save score.");
        }

        setStatus("success");
      } catch (error) {
        setStatus("error");
        setErrorMessage(
          error instanceof Error ? error.message : "An unknown error occurred."
        );
      }
    };

    saveScore();
  }, [score]);

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-700">
              Saving your score...
            </p>
          </div>
        );
      case "error":
        return (
          <div className="text-center">
            <p className="text-xl font-semibold text-red-600 mb-4">
              Error
            </p>
            <p className="text-gray-700 mb-6">
              {errorMessage || "Could not save your score. Please try again."}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
              >
                Retry
              </button>
              <button
                onClick={() => router.push("/")}
                className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700"
              >
                Back to Home
              </button>
            </div>
          </div>
        );
      case "success":
      case "idle": // Fallback to success view
      default:
        return (
          <>
            <div className="mb-6">
              <p className="text-2xl font-bold text-blue-600 mt-4">
                You scored {score} points!
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700">
                Great job testing your knowledge of famous quotes!
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Take Quiz Again
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
      {renderContent()}
    </div>
  );
}

export type { QuizFinishPageProps };