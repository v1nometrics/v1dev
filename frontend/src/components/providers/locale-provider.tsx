"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import type { Locale } from "@/i18n";

// Import both locale files for instant client-side switching
import ptBR from "@/locales/pt-BR.json";
import en from "@/locales/en.json";

type Messages = typeof ptBR;

interface LocaleContextValue {
  locale: Locale;
  messages: Messages;
  toggleLocale: () => void;
  t: (key: string) => string;
  /** Timestamp of last locale change - used to trigger animations */
  lastChange: number;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

const MESSAGES: Record<Locale, Messages> = {
  "pt-BR": ptBR,
  en: en,
};

interface LocaleProviderProps {
  children: ReactNode;
  initialLocale: Locale;
}

/**
 * Pure client-side locale provider.
 * No navigation, no refresh - just state change with animation trigger.
 */
export function LocaleProvider({ children, initialLocale }: LocaleProviderProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [lastChange, setLastChange] = useState(0);

  const messages = MESSAGES[locale];

  // Update URL without navigation (for bookmarking/sharing)
  useEffect(() => {
    const currentPath = window.location.pathname;
    const pathWithoutLocale = currentPath.replace(/^\/(pt-BR|en)/, "") || "/";
    const newPath = locale === "pt-BR" ? pathWithoutLocale : `/en${pathWithoutLocale}`;
    
    if (currentPath !== newPath) {
      window.history.replaceState(null, "", newPath);
    }
    
    document.documentElement.lang = locale;
    localStorage.setItem("v1-locale", locale);
  }, [locale]);

  const toggleLocale = useCallback(() => {
    const newTimestamp = Date.now();
    setLastChange(newTimestamp);
    setLocale((prev) => {
      const next = prev === "pt-BR" ? "en" : "pt-BR";
      return next;
    });
  }, []);

  // Helper to get nested translation by dot notation
  const t = useCallback(
    (key: string): string => {
      const keys = key.split(".");
      let value: unknown = messages;
      
      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return key;
        }
      }
      
      return typeof value === "string" ? value : key;
    },
    [messages]
  );

  return (
    <LocaleContext.Provider value={{ locale, messages, toggleLocale, t, lastChange }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
