import type { SupportedLang, LangConfig } from './types';

// ── Language Configuration ───────────────────────────────
export const LANGUAGES: LangConfig[] = [
  { code: 'en',  name: 'English',    nativeName: 'English',    dir: 'ltr', flag: '🇬🇧' },
  { code: 'fr',  name: 'French',     nativeName: 'Français',   dir: 'ltr', flag: '🇫🇷' },
  { code: 'ar',  name: 'Arabic',     nativeName: 'العربية',    dir: 'rtl', flag: '🇸🇦' },
  { code: 'pt',  name: 'Portuguese', nativeName: 'Português',  dir: 'ltr', flag: '🇧🇷' },
  { code: 'es',  name: 'Spanish',    nativeName: 'Español',    dir: 'ltr', flag: '🇪🇸' },
  { code: 'nko', name: "N'Ko",       nativeName: 'ߒߞߏ',        dir: 'rtl', flag: '🌍' },
];

export const RTL_LANGUAGES: SupportedLang[] = ['ar', 'nko'];

export function isRTL(lang: SupportedLang): boolean {
  return RTL_LANGUAGES.includes(lang);
}

export function getLangConfig(code: SupportedLang): LangConfig {
  return LANGUAGES.find(l => l.code === code) ?? LANGUAGES[0];
}

// ── Translation Cache ────────────────────────────────────
const cache: Partial<Record<SupportedLang, Record<string, string>>> = {};

export async function loadTranslations(lang: SupportedLang): Promise<Record<string, string>> {
  if (cache[lang]) return cache[lang]!;

  try {
    const mod = await import(`@/locales/${lang}.json`);
    cache[lang] = mod.default as Record<string, string>;
    return cache[lang]!;
  } catch {
    // Fallback to English
    if (lang !== 'en') {
      const fallback = await loadTranslations('en');
      cache[lang] = fallback;
      return fallback;
    }
    return {};
  }
}

// ── Translation Function ─────────────────────────────────
export function t(
  translations: Record<string, string>,
  key: string,
  vars?: Record<string, string>
): string {
  let text = translations[key] ?? key;
  if (vars) {
    Object.entries(vars).forEach(([k, v]) => {
      text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
    });
  }
  return text;
}

// ── Multilingual Field Helper ────────────────────────────
// Gets the best translation for a multilingual DB field like { en: '...', fr: '...' }
export function getLocalizedField(
  field: Record<string, string> | null | undefined,
  lang: SupportedLang
): string {
  if (!field) return '';
  return field[lang] ?? field['en'] ?? Object.values(field)[0] ?? '';
}

// ── localStorage helpers (client only) ──────────────────
export const LANG_KEY = 'nko_lang';

export function getSavedLang(): SupportedLang {
  if (typeof window === 'undefined') return 'en';
  const saved = localStorage.getItem(LANG_KEY) as SupportedLang | null;
  return saved && LANGUAGES.some(l => l.code === saved) ? saved : 'en';
}

export function saveLang(lang: SupportedLang): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LANG_KEY, lang);
}
