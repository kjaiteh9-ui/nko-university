import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase-server';

export async function POST(req: NextRequest) {
  const { name, email, password, preferred_language, country } = await req.json().catch(() => ({}));

  if (!email || !password || !name) {
    return NextResponse.json({ error: 'Name, email, and password are required.' }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 });
  }

  const supabase = createServiceClient();

  // Create user via admin API (bypasses email trigger issues)
  const { data: userData, error: createErr } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name, preferred_language: preferred_language ?? 'en' },
  });

  if (createErr) {
    if (createErr.message.toLowerCase().includes('already registered') || createErr.message.includes('already exists')) {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 });
    }
    return NextResponse.json({ error: createErr.message }, { status: 400 });
  }

  const userId = userData.user.id;

  // Upsert profile (trigger may have already created it)
  await supabase.from('profiles').upsert({
    id: userId,
    name,
    email,
    country: country ?? null,
    preferred_language: preferred_language ?? 'en',
    role: 'student',
  }, { onConflict: 'id' });

  // Sign in immediately to get a session
  const { data: signInData, error: signInErr } = await supabase.auth.admin.generateLink({
    type: 'magiclink',
    email,
  });

  // Return user info — client will sign in with password
  return NextResponse.json({ success: true, userId });
}
