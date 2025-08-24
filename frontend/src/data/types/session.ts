export interface UserSession {
  id: string;
  username: string;
  createdAt: Date;
}

export type SessionState = "loading" | "authenticated" | "unauthenticated";