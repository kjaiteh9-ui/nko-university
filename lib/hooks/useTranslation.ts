'use client';

import { useState, useEffect, useCallback } from 'react';
import type { SupportedLang } from '@/lib/types';
import { loadTranslations, getSavedLang, saveLang, isRTL, getLangConfig } from '@/lib/i18n';
// Seed with English so keys never appear raw while locale loads
import enTranslations from '@/locales/en.json';

const LANG_EVENT = 'nko-lang-change';

interface UseTranslationReturn {
  t: (key: string, vars?: Record<string, string>) => string;
  lang: SupportedLang;
  setLang: (lang: SupportedLang) => void;
  dir: 'ltr' | 'rtl';
  isLoading: boolean;
}

export function useTranslation(): UseTranslationReturn {
  const [lang, setLangState] = useState<SupportedLang>('en');
  const [translations, setTranslations] = useState<Record<string, string>>(enTranslations as Record<string, string>);
  const [isLoading, setIsLoading] = useState(true);

  const applyLang = useCallback((newLang: SupportedLang) => {
    setLangState(newLang);
    setIsLoading(true);
    loadTranslations(newLang).then(t => {
      setTranslations(t);
      setIsLoading(false);
    });
    if (typeof document !== 'undefined') {
      document.documentElement.dir = isRTL(newLang) ? 'rtl' : 'ltr';
      document.documentElement.lang = newLang;
    }
  }, []);

  useEffect(() => {
    applyLang(getSavedLang());
  }, [applyLang]);

  // Listen for language changes from any component
  useEffect(() => {
    const handler = (e: Event) => {
      applyLang((e as CustomEvent<SupportedLang>).detail);
    };
    window.addEventListener(LANG_EVENT, handler);
    return () => window.removeEventListener(LANG_EVENT, handler);
  }, [applyLang]);

  const setLang = useCallback((newLang: SupportedLang) => {
    saveLang(newLang);
    applyLang(newLang);
    window.dispatchEvent(new CustomEvent(LANG_EVENT, { detail: newLang }));
  }, [applyLang]);

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

  return { t: translate, lang, setLang, dir: getLangConfig(lang).dir, isLoading };
}
