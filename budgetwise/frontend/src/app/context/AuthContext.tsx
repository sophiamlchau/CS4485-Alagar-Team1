'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { apiJson } from '../lib/api';

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  user: { id: string; email: string; name: string } | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const router = useRouter();

  useEffect(() => {
    // Restore auth session
    const t = localStorage.getItem('bw_token');
    const u = localStorage.getItem('bw_user');
    if (t) setToken(t);
    if (u) {
      try {
        setUser(JSON.parse(u));
      } catch {
        // ignore
      }
    }
    setIsAuthenticated(Boolean(t));
    setIsInitialized(true);
  }, []);

  const login = async (email: string, password: string) => {
    const data = await apiJson('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const nextToken = data?.token as string | undefined;
    const nextUser = data?.user as AuthContextType['user'] | undefined;
    if (!nextToken || !nextUser) throw new Error('Login failed');

    localStorage.setItem('bw_token', nextToken);
    localStorage.setItem('bw_user', JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
    setIsAuthenticated(true);
    router.push('/expenses');
  };

  const register = async (email: string, password: string, name: string) => {
    const data = await apiJson('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });

    const nextToken = data?.token as string | undefined;
    const nextUser = data?.user as AuthContextType['user'] | undefined;
    if (!nextToken || !nextUser) throw new Error('Registration failed');

    localStorage.setItem('bw_token', nextToken);
    localStorage.setItem('bw_user', JSON.stringify(nextUser));
    setToken(nextToken);
    setUser(nextUser);
    setIsAuthenticated(true);
    router.push('/expenses');
  };

  const logout = () => {
    localStorage.removeItem('bw_token');
    localStorage.removeItem('bw_user');
    setIsAuthenticated(false);
    setToken(null);
    setUser(null);
    router.push('/login');
  };

  // Don't render children until we've checked auth state
  if (!isInitialized) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}