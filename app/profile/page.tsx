'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabase } from '@/lib/supabase';
import { useUser } from '@/lib/hooks/useUser';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { LANGUAGES } from '@/lib/i18n';
import type { SupportedLang } from '@/lib/types';
import { User, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { t } = useTranslation();
  const { user, profile, isLoading } = useUser();
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    country: '',
    preferred_language: 'en' as SupportedLang,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) router.push('/login');
  }, [user, isLoading, router]);

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name ?? '',
        country: profile.country ?? '',
        preferred_language: profile.preferred_language,
      });
    }
  }, [profile]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const supabase = getSupabase();
    const { error } = await supabase
      .from('profiles')
      .update({ name: form.name, country: form.country, preferred_language: form.preferred_language })
      .eq('id', user!.id);

    if (error) toast.error('Failed to save. Please try again.');
    else toast.success(t('profile.saved'));
    setSaving(false);
  }

  if (isLoading) return <div className="section flex justify-center"><div className="spinner" /></div>;

  return (
    <div className="section">
      <div className="container max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2">{t('profile.title')}</h1>
          <p style={{ color: 'var(--text)' }}>{user?.email}</p>
        </div>

        <div className="card p-8">
          <div className="flex items-center gap-4 mb-8">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
              style={{ background: 'var(--forest)', border: '2px solid var(--border)', color: 'var(--gold)', fontFamily: 'Plus Jakarta Sans' }}
            >
              {form.name?.[0]?.toUpperCase() ?? <User size={24} />}
            </div>
            <div>
              <h3>{form.name || 'Your Name'}</h3>
              <p className="text-sm" style={{ color: 'var(--text)' }}>
                Level {profile?.current_level ?? 1} Student
              </p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text)' }}>
                {t('auth.name')}
              </label>
              <input
                className="nko-input"
                placeholder="Your full name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text)' }}>
                {t('auth.country')}
              </label>
              <input
                className="nko-input"
                placeholder="e.g. Guinea, Mali, United States..."
                value={form.country}
                onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text)' }}>
                {t('profile.language')}
              </label>
              <select
                className="nko-input"
                value={form.preferred_language}
                onChange={e => setForm(f => ({ ...f, preferred_language: e.target.value as SupportedLang }))}
              >
                {LANGUAGES.map(l => (
                  <option key={l.code} value={l.code}>
                    {l.flag} {l.nativeName} ({l.name})
                  </option>
                ))}
              </select>
              <p className="text-xs mt-1.5" style={{ color: 'var(--textd)' }}>
                This is the language used for the tutor and lesson explanations.
              </p>
            </div>

            <div className="divider" />

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text)' }}>Email</label>
              <input className="nko-input opacity-60 cursor-not-allowed" value={user?.email ?? ''} disabled />
              <p className="text-xs mt-1" style={{ color: 'var(--textd)' }}>Email cannot be changed.</p>
            </div>

            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text)' }}>Member Since</label>
              <p className="text-sm" style={{ color: 'var(--textd)' }}>
                {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : '—'}
              </p>
            </div>

            <button type="submit" disabled={saving} className="btn-gold">
              {saving ? <span className="spinner w-4 h-4" /> : <><Save size={16} /> {t('profile.save')}</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
