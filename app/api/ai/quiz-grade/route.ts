import { NextRequest, NextResponse } from 'next/server';
import { gradeQuiz } from '@/lib/ai';
import { createServiceClient } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { questions, userAnswers, lessonId, userId } = body;

  if (!questions || !userAnswers) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const result = gradeQuiz(questions, userAnswers);

  // Optionally save score to progress
  if (userId && lessonId) {
    try {
      const supabase = createServiceClient();
      const score = Math.round((result.score / result.total) * 100);
      await supabase.from('progress').upsert({
        user_id: userId,
        lesson_id: lessonId,
        status: 'completed',
        score,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id,lesson_id' });
    } catch {
      // Non-blocking
    }
  }

  return NextResponse.json(result);
}
