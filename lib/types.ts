// ── Supported Languages ──────────────────────────────────
export type SupportedLang = 'en' | 'fr' | 'ar' | 'pt' | 'es' | 'nko';

export interface LangConfig {
  code: SupportedLang;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
  flag: string;
}

// ── Database Types ───────────────────────────────────────
export interface Profile {
  id: string;
  name: string | null;
  country: string | null;
  preferred_language: SupportedLang;
  role: 'student' | 'admin';
  current_level: number;
  streak_days: number;
  last_active_at: string | null;
  created_at: string;
}

export interface Course {
  id: string;
  title: Record<string, string>;        // { en: '...', fr: '...', ar: '...' }
  description: Record<string, string>;
  language_focus: string;
  thumbnail_url: string | null;
  is_published: boolean;
  created_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  level: number;
  order_index: number;
  title: Record<string, string>;
  description: Record<string, string>;
  content_json: LessonContent | null;
  estimated_minutes: number;
  is_published: boolean;
  created_at: string;
}

export interface LessonContent {
  sections: ContentSection[];
  exercises: Exercise[];
}

export interface ContentSection {
  type: 'intro' | 'alphabet' | 'vocabulary' | 'grammar' | 'culture' | 'reading';
  title: string;
  body?: string;
  characters?: AlphabetChar[];
  words?: VocabWord[];
  rule?: string;
  examples?: string[];
}

export interface AlphabetChar {
  char: string;
  name: string;
  sound: string;
  example?: string;
}

export interface VocabWord {
  nko: string;
  en: string;
  fr?: string;
  audio_hint?: string;
}

export interface Exercise {
  type: 'fill_blank' | 'matching' | 'arrange' | 'identify';
  prompt: string;
  answer: string | string[];
  pairs?: [string, string][];
  hint?: string;
}

export interface QuizQuestion {
  id: string;
  lesson_id: string;
  type: 'multiple_choice' | 'true_false' | 'fill_blank' | 'matching';
  prompt: Record<string, string>;
  options_json: string[] | null;
  answer_json: string | string[];
  explanation: Record<string, string> | null;
  order_index: number;
}

export interface Progress {
  id: string;
  user_id: string;
  lesson_id: string;
  status: 'not_started' | 'in_progress' | 'completed';
  score: number | null;
  attempts: number;
  updated_at: string;
}

export interface TutorChat {
  id: string;
  user_id: string;
  lesson_id: string | null;
  messages_json: ChatMessage[];
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface SupportSubmission {
  id: string;
  type: 'support' | 'contact';
  name: string | null;
  email: string | null;
  whatsapp: string | null;
  subject: string | null;
  message: string;
  created_at: string;
}

// ── API Response Types ───────────────────────────────────
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
}

// ── Level Config ─────────────────────────────────────────
export interface LevelInfo {
  level: number;
  name: string;
  description: string;
  color: string;
}

export const LEVEL_CONFIG: LevelInfo[] = [
  { level: 1, name: 'Alphabet', description: 'Learn the N\'Ko script fundamentals', color: '#c8a550' },
  { level: 2, name: 'Words', description: 'Build your vocabulary', color: '#d4662a' },
  { level: 3, name: 'Grammar', description: 'Master sentence structure', color: '#22c55e' },
  { level: 4, name: 'Conversation', description: 'Real-world communication', color: '#3b82f6' },
  { level: 5, name: 'Reading', description: 'Read N\'Ko texts and stories', color: '#8b5cf6' },
  { level: 6, name: 'Advanced', description: 'Master complex expressions', color: '#f43f5e' },
];
