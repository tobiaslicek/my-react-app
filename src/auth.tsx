import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

const AUTH_TOKEN_STORAGE_KEY = 'authToken';

/** Odpověď backendu po přihlášení – token ukládáme jen když isAuthenticated === true */
export type LoginResponse = {
  isAuthenticated: boolean;
  token?: string;
};

type AuthContextValue = {
  isAuthenticated: boolean;
  authToken: string | null;
  /** Předá se odpověď backendu; token se uloží jen když backend vrátí isAuthenticated true a token. */
  login: (response: LoginResponse) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (authToken) {
      window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, authToken);
    } else {
      window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    }
  }, [authToken]);

  const login = (response: LoginResponse) => {
    if (!response.message) return;
    const token =
      response.token ??
      `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setAuthToken(token);
  };
  const logout = () => setAuthToken(null);
  const isAuthenticated = !!authToken;

  return (
    <AuthContext.Provider value={{ isAuthenticated, authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};

