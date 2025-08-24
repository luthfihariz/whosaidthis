"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, createSession } from "@/lib/sessionUtils";
import PageHeader from "@/components/shared/PageHeader";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const session = getSession();
    if (session) {
      router.push("/");
      return;
    }
    setIsCheckingSession(false);
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedUsername = username.trim();
    if (!trimmedUsername) return;

    setIsLoading(true);

    try {
      createSession(trimmedUsername);
      router.push("/"); // Redirect to home after successful login
    } catch (error) {
      console.error("Error creating session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8 flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <PageHeader />

        <main>
          <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome!
              </h2>
              <p className="text-gray-600">
                Enter your username to start playing
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={handleInputChange}
                  placeholder="Enter your username"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  maxLength={50}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!username.trim() || isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
              >
                {isLoading ? "Starting..." : "Play"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
