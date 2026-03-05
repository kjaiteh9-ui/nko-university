'use client';

import { useState } from 'react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { Send, Mail, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: 'contact' }),
      });
      if (res.ok) {
        toast.success(t('contact.success'));
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error(t('contact.error'));
      }
    } catch {
      toast.error(t('contact.error'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <section className="section" style={{ background: 'var(--bg)', paddingBottom: '40px' }}>
        <div className="container text-center max-w-xl mx-auto">
          <div className="tag mb-6 mx-auto">Get in Touch</div>
          <h1 className="mb-4">{t('contact.title')}</h1>
          <p style={{ color: 'var(--text)' }}>{t('contact.subtitle')}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '40px' }}>
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Info */}
            <div className="space-y-6">
              <div className="card">
                <div className="flex items-center gap-3 mb-2">
                  <Mail size={18} style={{ color: 'var(--gold)' }} />
                  <h4>Email</h4>
                </div>
                <p className="text-sm" style={{ color: 'var(--text)' }}>kjaiteh9@gmail.com</p>
              </div>
              <div className="card">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin size={18} style={{ color: 'var(--gold)' }} />
                  <h4>Location</h4>
                </div>
                <p className="text-sm" style={{ color: 'var(--text)' }}>Online — Serving Africa & the Diaspora Worldwide</p>
              </div>
              <div className="card">
                <h4 className="mb-3">Response Time</h4>
                <p className="text-sm" style={{ color: 'var(--text)' }}>We typically respond within 24–48 hours.</p>
                <p className="text-xs mt-2" style={{ color: 'var(--textd)' }}>
                  For urgent student issues, use the <a href="/support" style={{ color: 'var(--gold)' }}>Support page</a>.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="card p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text)' }}>
                        {t('contact.name')} *
                      </label>
                      <input
                        className="nko-input"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text)' }}>
                        {t('contact.email')} *
                      </label>
                      <input
                        className="nko-input"
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text)' }}>
                      {t('contact.subject')}
                    </label>
                    <input
                      className="nko-input"
                      placeholder="What is this about?"
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text)' }}>
                      {t('contact.message')} *
                    </label>
                    <textarea
                      className="nko-input"
                      rows={6}
                      placeholder="Write your message here..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      required
                    />
                  </div>

                  <button type="submit" disabled={loading} className="btn-gold w-full justify-center">
                    {loading ? (
                      <span className="flex items-center gap-2"><span className="spinner w-4 h-4" /> Sending...</span>
                    ) : (
                      <><Send size={16} /> {t('contact.send')}</>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
