import { UserSession } from "@/data/types/session";

const SESSION_KEY = "whosaidthis_session";

/**
 * Generates a random session ID
 */
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * Creates a new user session
 */
export function createSession(username: string): UserSession {
  const session: UserSession = {
    id: generateSessionId(),
    username: username.trim(),
    createdAt: new Date(),
  };
  
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

/**
 * Gets the current session from localStorage
 */
export function getSession(): UserSession | null {
  try {
    const sessionData = localStorage.getItem(SESSION_KEY);
    if (!sessionData) return null;
    
    const session = JSON.parse(sessionData);
    
    // Validate session structure
    if (!session.id || !session.username || !session.createdAt) {
      clearSession();
      return null;
    }
    
    // Convert createdAt back to Date object
    session.createdAt = new Date(session.createdAt);
    
    return session as UserSession;
  } catch (error) {
    console.error("Error retrieving session:", error);
    clearSession();
    return null;
  }
}

/**
 * Clears the current session
 */
export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

/**
 * Checks if user is authenticated
 */
export function isAuthenticated(): boolean {
  return getSession() !== null;
}