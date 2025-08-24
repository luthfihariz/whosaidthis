"use client";

import { useRouter } from "next/navigation";
import { clearSession } from "@/lib/sessionUtils";

interface PageHeaderProps {
  showLogout?: boolean;
}

export default function PageHeader({ showLogout = false }: PageHeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    clearSession();
    router.push("/login");
  };

  return (
    <header className="text-center mb-8 relative">
      {/* Subtle logout link in top-right corner - only shown when showLogout is true */}
      {showLogout && (
        <button
          onClick={handleLogout}
          className="absolute top-0 right-0 text-xs text-gray-400 hover:text-gray-600 transition-colors underline"
        >
          logout
        </button>
      )}
      
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
        <span role="img" aria-label="thinking face">
          🤔
        </span>
        Who Said This?
      </h1>
      <p className="text-lg text-gray-600 flex items-center justify-center gap-2">
        Test your knowledge of famous quotes from Global and Indonesian figures
      </p>
    </header>
  );
}

export type { PageHeaderProps };
