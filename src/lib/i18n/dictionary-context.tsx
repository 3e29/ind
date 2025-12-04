"use client";

import React, { createContext, useContext } from "react";
import type { Dictionary, Locale } from "./config";

interface DictionaryContextType {
  dictionary: Dictionary;
  locale: Locale;
}

const DictionaryContext = createContext<DictionaryContextType | null>(null);

interface DictionaryProviderProps {
  children: React.ReactNode;
  dictionary: Dictionary;
  locale: Locale;
}

export function DictionaryProvider({
  children,
  dictionary,
  locale,
}: DictionaryProviderProps) {
  return (
    <DictionaryContext.Provider value={{ dictionary, locale }}>
      {children}
    </DictionaryContext.Provider>
  );
}

// Hook for client components to access dictionary directly
export function useDictionary(): Dictionary {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error("useDictionary must be used within a DictionaryProvider");
  }
  return context.dictionary;
}

// Hook for client components to access the current locale
export function useLocale(): Locale {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error("useLocale must be used within a DictionaryProvider");
  }
  return context.locale;
}
