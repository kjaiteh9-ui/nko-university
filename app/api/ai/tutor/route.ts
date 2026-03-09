import { NextRequest, NextResponse } from 'next/server';
import { tutorChat } from '@/lib/ai';

// Simple in-memory rate limiter (per user/IP)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;  // requests per window
const WINDOW_MS = 60 * 60 * 1000;  // 1 hour

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  const body = await req.json().catch(() => ({}));
  const { messages, lessonTitle, level, userLanguage, userId, lessonContent } = body;

  const rateKey = userId ?? ip;
  if (!checkRateLimit(rateKey)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  if (!messages || !Array.isArray(messages)) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ reply: 'AI tutor is not configured. Please add an OpenAI API key.' });
  }

  try {
    const reply = await tutorChat({
      messages: messages.slice(-10),
      lessonTitle: lessonTitle ?? 'N\'Ko Lesson',
      level: Number(level) || 1,
      userLanguage: userLanguage ?? 'en',
      lessonContent: lessonContent ?? null,
    });
    return NextResponse.json({ reply });
  } catch (err) {
    console.error('Tutor error:', err);
    return NextResponse.json(
      { error: 'AI tutor encountered an error. Please try again.' },
      { status: 500 }
    );
  }
}
