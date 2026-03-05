'use client';

import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { LANGUAGES } from '@/lib/i18n';
import type { SupportedLang } from '@/lib/types';

interface Props {
  current: SupportedLang;
  onChange: (lang: SupportedLang) => void;
}

export default function LanguageSwitcher({ current, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const currentLang = LANGUAGES.find(l => l.code === current) ?? LANGUAGES[0];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/4 hover:border-white/20 transition-all text-sm text-[var(--text)] hover:text-[var(--white)]"
        aria-label="Language selector"
      >
        <Globe size={14} />
        <span className="hidden sm:inline">{currentLang.nativeName}</span>
        <span className="sm:hidden">{currentLang.flag}</span>
        <ChevronDown size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-[var(--bg2)] border border-[var(--bord2)] shadow-2xl overflow-hidden z-50 animate-fade-in-up">
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => { onChange(lang.code); setOpen(false); }}
              className="w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm hover:bg-white/5 transition-colors text-left"
              dir="ltr"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">{lang.flag}</span>
                <div>
                  <div className="text-[var(--white)] font-medium text-xs">{lang.nativeName}</div>
                  <div className="text-[var(--textd)] text-xs">{lang.name}</div>
                </div>
              </div>
              {current === lang.code && (
                <Check size={14} className="text-[var(--gold)]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
