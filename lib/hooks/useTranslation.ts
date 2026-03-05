'use client';

import { useState, useEffect, useCallback } from 'react';
import type { SupportedLang } from '@/lib/types';
import { loadTranslations, getSavedLang, saveLang, isRTL, getLangConfig } from '@/lib/i18n';

interface UseTranslationReturn {
  t: (key: string, vars?: Record<string, string>) => string;
  lang: SupportedLang;
  setLang: (lang: SupportedLang) => void;
  dir: 'ltr' | 'rtl';
  isLoading: boolean;
}

export function useTranslation(): UseTranslationReturn {
  const [lang, setLangState] = useState<SupportedLang>('en');
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = getSavedLang();
    setLangState(saved);
    loadTranslations(saved).then(t => {
      setTranslations(t);
      setIsLoading(false);
    });
  }, []);

  const setLang = useCallback((newLang: SupportedLang) => {
    saveLang(newLang);
    setLangState(newLang);
    setIsLoading(true);
    loadTranslations(newLang).then(t => {
      setTranslations(t);
      setIsLoading(false);
      // Update html dir attribute
      document.documentElement.dir = isRTL(newLang) ? 'rtl' : 'ltr';
      document.documentElement.lang = newLang;
    });
  }, []);

  const translate = useCallback(
    (key: string, vars?: Record<string, string>) => {
      let text = translations[key] ?? key;
      if (vars) {
        Object.entries(vars).forEach(([k, v]) => {
          text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
        });
      }
      return text;
    },
    [translations]
  );

  const config = getLangConfig(lang);

  return {
    t: translate,
    lang,
    setLang,
    dir: config.dir,
    isLoading,
  };
}
