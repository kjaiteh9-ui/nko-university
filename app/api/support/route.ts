import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createServiceClient } from '@/lib/supabase-server';

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
  const { name, email, whatsapp, problem, type } = body;

  if (!email || !problem) {
    return NextResponse.json({ error: 'Email and problem description are required.' }, { status: 400 });
  }

  const toEmail = process.env.CONTACT_EMAIL_TO ?? 'kjaiteh9@gmail.com';
  const fromEmail = process.env.CONTACT_EMAIL_FROM ?? 'noreply@nkouniversity.com';

  // Save to Supabase
  try {
    const supabase = createServiceClient();
    await supabase.from('support_submissions').insert({
      type: type ?? 'support',
      name,
      email,
      whatsapp,
      message: problem,
    });
  } catch { /* non-blocking */ }

  // Send email
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: false,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });

      await transporter.sendMail({
        from: `"NKO University" <${fromEmail}>`,
        to: toEmail,
        subject: `[Student Support] Issue from ${name ?? email}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px;">
            <h2 style="color: #d4662a;">⚠️ Student Support Request</h2>
            <table style="border-collapse: collapse; width: 100%;">
              <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${name ?? 'N/A'}</td></tr>
              <tr style="background: #f9f9f9;"><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">WhatsApp:</td><td style="padding: 8px;">${whatsapp ?? 'Not provided'}</td></tr>
            </table>
            <hr/>
            <h3>Problem Description:</h3>
            <p style="white-space: pre-wrap; background: #f5f5f5; padding: 12px; border-radius: 6px;">${problem}</p>
            <hr/>
            <p style="color: #888; font-size: 12px;">Submitted at ${new Date().toISOString()} from NKO University Support Form</p>
          </div>
        `,
      });
    } catch (err) {
      console.error('Support email error:', err);
    }
  }

  // n8n webhook → Google Sheets
  const webhookUrl = process.env.NEXT_PUBLIC_N8N_SUPPORT_WEBHOOK;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, whatsapp, problem, type: 'support', timestamp: new Date().toISOString() }),
      });
    } catch { /* non-blocking */ }
  }

  return NextResponse.json({ success: true });
}
