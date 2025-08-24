"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/sessionUtils";
import { UserSession } from "@/data/types/session";
import QuizContainer from "./components/QuizContainer";
import PageHeader from "@/components/shared/PageHeader";

export default function QuizPage() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const currentSession = getSession();

    if (!currentSession) {
      router.push("/");
      return;
    }

    setSession(currentSession);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader />
        <main>
          <QuizContainer />
        </main>
      </div>
    </div>
  );
}
