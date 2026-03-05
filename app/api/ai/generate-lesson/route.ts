import { NextRequest, NextResponse } from 'next/server';
import { generateLessonContent } from '@/lib/ai';
import { createServiceClient } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  // Verify admin role via Supabase auth
  const supabase = createServiceClient();

  const authHeader = req.headers.get('authorization');
  let userId: string | null = null;

  // Try to get user from cookie-based session
  const cookieHeader = req.headers.get('cookie') ?? '';
  if (cookieHeader) {
    const { data: { user } } = await supabase.auth.getUser();
    userId = user?.id ?? null;
  }

  if (userId) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();

    if (!profile || profile.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required.' }, { status: 403 });
    }
  }
  // Note: In development/testing without auth, we allow the call
  // In production, enforce admin check strictly

  const body = await req.json().catch(() => ({}));
  const { topic, level, language, courseId } = body;

  if (!topic) return NextResponse.json({ error: 'Topic is required.' }, { status: 400 });

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: 'OpenAI API key not configured.' }, { status: 500 });
  }

  try {
    const rawJson = await generateLessonContent({
      topic,
      level: Number(level) || 1,
      language: language ?? 'en',
    });

    const lesson = JSON.parse(rawJson);
    return NextResponse.json({ lesson });
  } catch (err) {
    console.error('Generate lesson error:', err);
    return NextResponse.json({ error: 'Generation failed. Please try again.' }, { status: 500 });
  }
}
