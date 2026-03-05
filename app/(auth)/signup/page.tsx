'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getSupabase } from '@/lib/supabase';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { LANGUAGES } from '@/lib/i18n';
import { BookOpen, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import type { SupportedLang } from '@/lib/types';

export default function SignupPage() {
  const { t, lang } = useTranslation();
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    country: '',
    preferred_language: lang as SupportedLang,
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return;
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);

    try {
      // Use server-side API to create user (avoids DB trigger issues)
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? 'Failed to create account.');
        setLoading(false);
        return;
      }

      // Now sign in with password
      const supabase = getSupabase();
      const { error: signInErr } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (signInErr) {
        toast.error('Account created! Please sign in.');
        router.push('/login');
      } else {
        toast.success('Welcome to NKO University!');
        router.push('/dashboard');
      }
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'var(--forest)', border: '1px solid var(--border)' }}>
            <BookOpen size={24} style={{ color: 'var(--gold)' }} />
          </div>
          <h2 className="mb-1">{t('auth.signup_title')}</h2>
          <p className="text-sm" style={{ color: 'var(--text)' }}>{t('auth.signup_sub')}</p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text)' }}>{t('auth.name')} *</label>
              <input className="nko-input" placeholder="Your full name" value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            </div>
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text)' }}>{t('auth.email')} *</label>
              <input className="nko-input" type="email" placeholder="your@email.com" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required autoComplete="email" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text)' }}>{t('auth.password')} *</label>
              <div className="relative">
                <input className="nko-input pr-10" type={showPass ? 'text' : 'password'}
                  placeholder="Min. 6 characters" value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required autoComplete="new-password" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--textd)' }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text)' }}>{t('auth.country')}</label>
                <input className="nko-input" placeholder="e.g. Guinea" value={form.country}
                  onChange={e => setForm(f => ({ ...f, country: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text)' }}>{t('profile.language')}</label>
                <select className="nko-input" value={form.preferred_language}
                  onChange={e => setForm(f => ({ ...f, preferred_language: e.target.value as SupportedLang }))}>
                  {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.flag} {l.nativeName}</option>)}
                </select>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-gold w-full justify-center mt-2">
              {loading ? <span className="spinner w-4 h-4" /> : t('auth.signup_btn')}
            </button>
          </form>
          <p className="text-xs mt-4 text-center" style={{ color: 'var(--textd)' }}>
            By signing up you agree to our Terms of Service.
          </p>
          <div className="mt-4 text-center">
            <p className="text-sm" style={{ color: 'var(--text)' }}>
              {t('auth.have_account')}{' '}
              <Link href="/login" style={{ color: 'var(--gold)' }} className="font-medium hover:underline">{t('auth.login_btn')}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
