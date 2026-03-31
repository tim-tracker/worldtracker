'use client';
import { CountryProvider } from '@/context/CountryContext';
import { ReactNode } from 'react';

export function ClientProviders({ children }: { children: ReactNode }) {
  return <CountryProvider>{children}</CountryProvider>;
}
