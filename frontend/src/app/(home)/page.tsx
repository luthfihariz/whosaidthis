"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/sessionUtils";
import { UserSession } from "@/data/types/session";
import MemberHomePage from "./components/MemberHomePage";
import LeaderboardTable from "./components/LeaderboardTable";
import PageHeader from "@/components/shared/PageHeader";

export default function Home() {
  const [session, setSession] = useState<UserSession | null>(null);
  const router = useRouter();

  useEffect(() => {
    const currentSession = getSession();

    if (!currentSession) {
      router.push("/login");
      return;
    }

    setSession(currentSession);
  }, [router]);

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader showLogout={true} />
        <main className="flex flex-row items-start gap-8">
          <MemberHomePage username={session.username} />
          <LeaderboardTable />
        </main>
      </div>
    </div>
  );
}
