'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '../src/app/context/AuthContext';
import { Header } from '../src/app/components/Header';

function AppShell({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const isPublic = pathname === '/login' || pathname === '/register';
    if (!isAuthenticated && !isPublic) {
      router.push('/login');
    }

    if (isAuthenticated && (pathname === '/login' || pathname === '/register')) {
      router.push('/');
    }
  }, [isAuthenticated, pathname, router]);

  const isPublic = pathname === '/login' || pathname === '/register';
  if (!isAuthenticated && !isPublic) {
    return null;
  }

  if (pathname === '/login' || pathname === '/register') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      {children}
    </div>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AppShell>{children}</AppShell>
    </AuthProvider>
  );
}

