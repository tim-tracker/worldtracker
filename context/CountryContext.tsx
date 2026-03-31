'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CountryCode, DEFAULT_COUNTRY } from '@/lib/config';

interface CountryContextType {
  selectedCountry: CountryCode;
  setSelectedCountry: (c: CountryCode) => void;
}

const CountryContext = createContext<CountryContextType>({
  selectedCountry: DEFAULT_COUNTRY,
  setSelectedCountry: () => {},
});

export function CountryProvider({ children }: { children: ReactNode }) {
  const [selectedCountry, setSelectedCountryState] = useState<CountryCode>(DEFAULT_COUNTRY);

  useEffect(() => {
    const saved = localStorage.getItem('selectedCountry') as CountryCode | null;
    if (saved) setSelectedCountryState(saved);
  }, []);

  const setSelectedCountry = (c: CountryCode) => {
    setSelectedCountryState(c);
    localStorage.setItem('selectedCountry', c);
  };

  return (
    <CountryContext.Provider value={{ selectedCountry, setSelectedCountry }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  return useContext(CountryContext);
}
