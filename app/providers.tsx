"use client";

import React from 'react';
import { MockAuthProvider } from '@/lib/mock-auth-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MockAuthProvider>
      {children}
    </MockAuthProvider>
  );
} 