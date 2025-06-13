import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Translation, translations, isRTL, supportedLanguages } from '@shared/translations';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: Translation;
  supportedLanguages: typeof supportedLanguages;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<string>(() => {
    // Check localStorage first
    const saved = localStorage.getItem('smartrelocate-language');
    if (saved && supportedLanguages.some(lang => lang.code === saved)) {
      return saved;
    }
    
    // Try to detect browser language
    const browserLang = navigator.language.split('-')[0];
    if (supportedLanguages.some(lang => lang.code === browserLang)) {
      return browserLang;
    }
    
    // Default to English
    return 'en';
  });

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('smartrelocate-language', lang);
    
    // Set document direction for RTL languages
    if (lang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', lang);
    }
  };

  // Set initial direction on mount
  useEffect(() => {
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', language);
    }
  }, [language]);

  const t = translations[language] || translations.en;

  const value = {
    language,
    setLanguage,
    t,
    supportedLanguages
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function useTranslation() {
  const { t } = useLanguage();
  return t;
}