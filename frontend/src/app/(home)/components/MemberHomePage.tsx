"use client";

import { useRouter } from "next/navigation";
import { clearSession } from "@/lib/sessionUtils";
import LeaderboardTable from "./LeaderboardTable";

interface MemberHomePageProps {
  username: string;
}

export default function MemberHomePage({ username }: MemberHomePageProps) {
  const router = useRouter();

  const handlePlayClick = () => {
    router.push("/quiz");
  };

  const handleLogout = () => {
    clearSession();
    router.push("/login");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-md w-full flex flex-col gap-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Welcome, {username}!
        </h2>
        <p className="text-gray-600">Ready to test your knowledge?</p>
      </div>

      <div>
        <button
          onClick={handlePlayClick}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export type { MemberHomePageProps };