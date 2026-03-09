import OpenAI from 'openai';
import type { LessonContent } from '@/lib/types';

let _client: OpenAI | null = null;

export function getOpenAI(): OpenAI {
  if (!_client) {
    _client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _client;
}

// ── Lesson Generation ────────────────────────────────────
export async function generateLessonContent(params: {
  topic: string;
  level: number;
  language: string;
  courseTitle?: string;
}): Promise<string> {
  const ai = getOpenAI();
  const levelNames = ['', 'Alphabet', 'Words', 'Grammar', 'Conversation', 'Reading', 'Advanced'];

  const prompt = `You are an expert curriculum designer for N'Ko language education.

Generate a complete lesson for:
- Topic: ${params.topic}
- Level: ${params.level} (${levelNames[params.level] ?? 'Unknown'})
- Output language: ${params.language}
${params.courseTitle ? `- Course: ${params.courseTitle}` : ''}

Return ONLY valid JSON matching this structure:
{
  "title": { "en": "...", "fr": "...", "ar": "..." },
  "description": { "en": "...", "fr": "..." },
  "content_json": {
    "sections": [
      {
        "type": "intro|alphabet|vocabulary|grammar|culture|reading",
        "title": "...",
        "body": "...",
        "characters": [{"char": "ߒ", "name": "...", "sound": "..."}],
        "words": [{"nko": "ߒߞߏ", "en": "...", "fr": "..."}]
      }
    ],
    "exercises": [
      {"type": "fill_blank|matching", "prompt": "...", "answer": "..."}
    ]
  },
  "quiz_questions": [
    {
      "type": "multiple_choice",
      "prompt": {"en": "..."},
      "options_json": ["A", "B", "C", "D"],
      "answer_json": "A",
      "explanation": {"en": "..."}
    }
  ]
}

Include:
- 3-5 content sections
- 3-5 exercises
- 5 quiz questions
- Real N'Ko script (ߒߞߏ alphabet) where relevant
- Cultural context for African learners`;

  const res = await ai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
    temperature: 0.7,
    max_tokens: 3000,
  });

  return res.choices[0]?.message?.content ?? '{}';
}

// ── Tutor Chat ───────────────────────────────────────────
export async function tutorChat(params: {
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  lessonTitle: string;
  level: number;
  userLanguage: string;
  lessonContent?: LessonContent | null;
}): Promise<string> {
  const ai = getOpenAI();
  const levelNames = ['', 'Alphabet', 'Words', 'Grammar', 'Conversation', 'Reading', 'Advanced'];

  // Build a concise lesson summary so the tutor knows the actual material
  let lessonSummary = '';
  if (params.lessonContent?.sections) {
    const parts: string[] = [];
    for (const s of params.lessonContent.sections.slice(0, 4)) {
      if (s.title) parts.push(`Section: ${s.title}`);
      if (s.body) parts.push(s.body.slice(0, 200));
      if (s.rule) parts.push(`Grammar rule: ${s.rule}`);
      if (s.characters?.length) {
        parts.push(`Characters: ${s.characters.map(c => `${c.char}=${c.name}(${c.sound})`).join(', ')}`);
      }
      if (s.words?.length) {
        parts.push(`Vocabulary: ${s.words.slice(0, 6).map(w => `${w.nko}=${w.en}`).join(', ')}`);
      }
    }
    if (parts.length) lessonSummary = `\n\nLesson content:\n${parts.join('\n')}`;
  }

  const system = `You are Musa, an expert and encouraging N'Ko language tutor at NKO Online University.
Current student level: ${params.level} (${levelNames[params.level] ?? 'Unknown'})
Current lesson: "${params.lessonTitle}"${lessonSummary}
Respond in: ${params.userLanguage}

Rules:
- Be warm, encouraging, and culturally aware of African heritage
- Use N'Ko script (ߒߞߏ) examples when relevant — you know the actual lesson content above
- Keep responses under 150 words unless explaining complex grammar
- Answer questions using the specific words, characters, and rules from this lesson
- If asked about something outside this lesson, gently redirect`;

  const res = await ai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: system },
      ...params.messages,
    ],
    temperature: 0.8,
    max_tokens: 400,
  });

  return res.choices[0]?.message?.content ?? 'I apologize, I could not process your question. Please try again.';
}

// ── Placement Test Evaluation ────────────────────────────
export async function evaluatePlacementTest(params: {
  answers: Array<{ question: string; userAnswer: string; correctAnswer: string }>;
  userLanguage: string;
}): Promise<{ level: number; explanation: string }> {
  const ai = getOpenAI();
  const score = params.answers.filter(a =>
    a.userAnswer.trim().toLowerCase() === a.correctAnswer.trim().toLowerCase()
  ).length;
  const total = params.answers.length;
  const pct = (score / total) * 100;

  let level = 1;
  if (pct >= 90) level = 6;
  else if (pct >= 75) level = 5;
  else if (pct >= 60) level = 4;
  else if (pct >= 45) level = 3;
  else if (pct >= 30) level = 2;

  const explanation = `You scored ${score}/${total} (${Math.round(pct)}%). We recommend starting at Level ${level}.`;
  return { level, explanation };
}

// ── Quiz Grading ─────────────────────────────────────────
export function gradeQuiz(
  questions: Array<{ answer_json: string | string[]; options_json?: string[] | null }>,
  userAnswers: Record<number, string>
): { score: number; total: number; results: boolean[] } {
  const results = questions.map((q, i) => {
    const answer = userAnswers[i];
    if (!answer) return false;
    const correct = q.answer_json;
    if (Array.isArray(correct)) return correct.includes(answer);
    return answer.trim().toLowerCase() === String(correct).trim().toLowerCase();
  });

  return {
    score: results.filter(Boolean).length,
    total: questions.length,
    results,
  };
}
