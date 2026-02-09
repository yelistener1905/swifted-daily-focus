import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { UserProfile } from "@/types/content";

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = "swifted-auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      const user = JSON.parse(stored) as UserProfile;
      return { user, isAuthenticated: true, isLoading: false };
    }
    return { user: null, isAuthenticated: false, isLoading: false };
  });

  const loginWithGoogle = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }));

    // Mock delay to simulate OAuth flow
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock user — backend will replace this with real Google OAuth
    const mockUser: UserProfile = {
      id: "user_" + Math.random().toString(36).slice(2, 10),
      email: "learner@example.com",
      name: "Learner",
      avatar: null,
    };

    localStorage.setItem(AUTH_KEY, JSON.stringify(mockUser));
    setState({ user: mockUser, isAuthenticated: true, isLoading: false });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
