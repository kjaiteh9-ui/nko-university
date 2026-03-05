import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createServiceClient } from '@/lib/supabase-server';

// Simple rate limiter (5 per IP per hour)
const ipMap = new Map<string, { count: number; resetAt: number }>();
function checkIP(ip: string) {
  const now = Date.now();
  const e = ipMap.get(ip);
  if (!e || e.resetAt < now) { ipMap.set(ip, { count: 1, resetAt: now + 3600000 }); return true; }
  if (e.count >= 5) return false;
  e.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  if (!checkIP(ip)) return NextResponse.json({ error: 'Too many submissions.' }, { status: 429 });

  const body = await req.json().catch(() => ({}));
  const { name, email, subject, message, type } = body;

  if (!email || !message) {
    return NextResponse.json({ error: 'Email and message are required.' }, { status: 400 });
  }

  const toEmail = process.env.CONTACT_EMAIL_TO ?? 'kjaiteh9@gmail.com';
  const fromEmail = process.env.CONTACT_EMAIL_FROM ?? 'noreply@nkouniversity.com';

  // Save to Supabase
  try {
    const supabase = createServiceClient();
    await supabase.from('support_submissions').insert({
      type: type ?? 'contact',
      name,
      email,
      subject,
      message,
    });
  } catch { /* non-blocking */ }

  // Send email via nodemailer (SMTP) or fallback log
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: false,
        auth: { user: process.env.SMTP_USER, pass: (process.env.SMTP_PASS ?? '').replace(/\s/g, '') },
      });

      await transporter.sendMail({
        from: `"NKO University" <${process.env.SMTP_USER}>`,
        to: toEmail,
        subject: `[Contact Form] ${subject ?? 'New Message'} — from ${name ?? email}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px;">
            <h2 style="color: #c8a550;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name ?? 'N/A'}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject ?? 'N/A'}</p>
            <hr/>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
            <hr/>
            <p style="color: #888; font-size: 12px;">Submitted at ${new Date().toISOString()} from NKO University</p>
          </div>
        `,
      });
    } catch (err) {
      console.error('Email send error:', err);
    }
  }

  // Also notify via n8n webhook (writes to Google Sheets)
  const webhookUrl = process.env.NEXT_PUBLIC_N8N_CONTACT_WEBHOOK;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message, type: 'contact', timestamp: new Date().toISOString() }),
      });
    } catch { /* non-blocking */ }
  }

  return NextResponse.json({ success: true });
}
