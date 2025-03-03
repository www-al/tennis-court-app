"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
};

type Session = {
  user: User;
  expires: string;
};

type MockAuthContextType = {
  session: Session | null;
  status: 'authenticated' | 'loading' | 'unauthenticated';
  signIn: (credentials?: any) => Promise<any>;
  signOut: () => Promise<void>;
};

const MockAuthContext = createContext<MockAuthContextType | undefined>(undefined);

export function MockAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<'authenticated' | 'loading' | 'unauthenticated'>('loading');

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setStatus('loading');
        const response = await fetch('/api/mock/auth/session');
        const data = await response.json();

        if (data.session) {
          setSession(data.session);
          setStatus('authenticated');
        } else {
          setSession(null);
          setStatus('unauthenticated');
        }
      } catch (error) {
        console.error('Error fetching mock session:', error);
        setSession(null);
        setStatus('unauthenticated');
      }
    };

    fetchSession();
  }, []);

  const signIn = async () => {
    setStatus('loading');
    // Simulate a sign-in delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockSession = await fetch('/api/mock/auth/session').then(res => res.json());
    setSession(mockSession.session);
    setStatus('authenticated');
    return mockSession;
  };

  const signOut = async () => {
    setStatus('loading');
    // Simulate a sign-out delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setSession(null);
    setStatus('unauthenticated');
  };

  return (
    <MockAuthContext.Provider value={{ session, status, signIn, signOut }}>
      {children}
    </MockAuthContext.Provider>
  );
}

export function useMockSession() {
  const context = useContext(MockAuthContext);
  if (context === undefined) {
    throw new Error('useMockSession must be used within a MockAuthProvider');
  }
  return context;
} 