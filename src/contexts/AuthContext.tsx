import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { UserProfile } from "@/types/content";

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  needsName: boolean;
}

interface AuthContextType extends AuthState {
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  setDisplayName: (name: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = "swifted-auth";
const STARTUP_SHOWN_KEY = "swifted-startup-shown";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    const stored = localStorage.getItem(AUTH_KEY);
    if (stored) {
      const user = JSON.parse(stored) as UserProfile;
      return { user, isAuthenticated: true, isLoading: false, needsName: false };
    }
    return { user: null, isAuthenticated: false, isLoading: false, needsName: false };
  });

  const loginWithGoogle = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockUser: UserProfile = {
      id: "user_" + Math.random().toString(36).slice(2, 10),
      email: "learner@example.com",
      name: "",
      avatar: null,
    };

    localStorage.setItem(AUTH_KEY, JSON.stringify(mockUser));
    setState({ user: mockUser, isAuthenticated: true, isLoading: false, needsName: true });
  }, []);

  const setDisplayName = useCallback((name: string) => {
    setState(prev => {
      if (!prev.user) return prev;
      const updated = { ...prev.user, name };
      localStorage.setItem(AUTH_KEY, JSON.stringify(updated));
      return { ...prev, user: updated, needsName: false };
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(STARTUP_SHOWN_KEY);
    setState({ user: null, isAuthenticated: false, isLoading: false, needsName: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, loginWithGoogle, logout, setDisplayName }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
