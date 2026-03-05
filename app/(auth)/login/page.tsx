'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getSupabase } from '@/lib/supabase';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { BookOpen, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    const supabase = getSupabase();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(t('auth.error_invalid'));
    } else {
      toast.success('Welcome back!');
      router.push('/dashboard');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg)' }}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'var(--forest)', border: '1px solid var(--border)' }}>
            <BookOpen size={24} style={{ color: 'var(--gold)' }} />
          </div>
          <h2 className="mb-1">{t('auth.login_title')}</h2>
          <p className="text-sm" style={{ color: 'var(--text)' }}>{t('auth.login_sub')}</p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text)' }}>
                {t('auth.email')}
              </label>
              <input
                className="nko-input"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-medium" style={{ color: 'var(--text)' }}>
                  {t('auth.password')}
                </label>
                <a href="#" className="text-xs hover:underline" style={{ color: 'var(--gold)' }}>
                  {t('auth.forgot')}
                </a>
              </div>
              <div className="relative">
                <input
                  className="nko-input pr-10"
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--textd)' }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-gold w-full justify-center mt-2">
              {loading ? <span className="spinner w-4 h-4" /> : t('auth.login_btn')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: 'var(--text)' }}>
              {t('auth.no_account')}{' '}
              <Link href="/signup" style={{ color: 'var(--gold)' }} className="font-medium hover:underline">
                {t('nav.signup')}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
