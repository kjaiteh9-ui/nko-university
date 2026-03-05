import { NextRequest, NextResponse } from 'next/server';
import { evaluatePlacementTest } from '@/lib/ai';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { answers, userLanguage } = body;

  if (!answers || !Array.isArray(answers)) {
    return NextResponse.json({ error: 'Invalid answers.' }, { status: 400 });
  }

  const result = await evaluatePlacementTest({
    answers,
    userLanguage: userLanguage ?? 'en',
  });

  return NextResponse.json(result);
}
