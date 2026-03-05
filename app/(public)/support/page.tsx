'use client';

import { useState } from 'react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { MessageCircle, Mail, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SupportPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: '',
    email: '',
    whatsapp: '',
    problem: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.problem) {
      toast.error('Please fill in your name, email, and describe your problem.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: 'support' }),
      });
      if (res.ok) {
        setSubmitted(true);
        toast.success(t('support.success'));
      } else {
        toast.error('Failed to submit. Please try again.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <section className="section flex items-center justify-center min-h-screen" style={{ paddingTop: '0' }}>
        <div className="card-gold text-center p-12 max-w-lg mx-auto">
          <CheckCircle size={56} style={{ color: 'var(--green)', margin: '0 auto 1.5rem' }} />
          <h2 className="mb-4">Issue Submitted!</h2>
          <p className="mb-6" style={{ color: 'var(--text)' }}>
            {t('support.success')}
          </p>
          <p className="text-sm" style={{ color: 'var(--textd)' }}>
            We&apos;ll reach out via email or WhatsApp within 24 hours.
          </p>
          <button
            onClick={() => { setSubmitted(false); setForm({ name: '', email: '', whatsapp: '', problem: '' }); }}
            className="btn-outline mt-6"
          >
            Submit Another Issue
          </button>
        </div>
      </section>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="section" style={{ background: 'var(--bg)', paddingBottom: '40px' }}>
        <div className="container text-center max-w-xl mx-auto">
          <div className="tag mb-6 mx-auto">
            <AlertCircle size={12} /> Student Support
          </div>
          <h1 className="mb-4">{t('support.title')}</h1>
          <p style={{ color: 'var(--text)' }}>{t('support.subtitle')}</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '40px' }}>
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Options */}
            <div className="space-y-5">
              <div className="card">
                <div className="flex items-center gap-3 mb-2">
                  <MessageCircle size={18} style={{ color: 'var(--green)' }} />
                  <h4>WhatsApp</h4>
                </div>
                <p className="text-sm" style={{ color: 'var(--text)' }}>
                  Include your WhatsApp number below and we&apos;ll message you directly.
                </p>
              </div>
              <div className="card">
                <div className="flex items-center gap-3 mb-2">
                  <Mail size={18} style={{ color: 'var(--gold)' }} />
                  <h4>Email Support</h4>
                </div>
                <p className="text-sm" style={{ color: 'var(--text)' }}>
                  kjaiteh9@gmail.com
                </p>
              </div>
              <div className="card">
                <h4 className="mb-3">What to include</h4>
                <ul className="text-sm space-y-2" style={{ color: 'var(--text)' }}>
                  {[
                    'Your name and email',
                    'Your WhatsApp (for quick support)',
                    'The lesson or page with the issue',
                    'A clear description of the problem',
                    'Screenshots if possible',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: 'var(--gold)' }}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="card p-8">
                <h3 className="mb-6">Submit Your Issue</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text)' }}>
                      {t('support.name')} *
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
                      {t('support.email')} *
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

                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text)' }}>
                      {t('support.whatsapp')}
                      <span className="ml-2 font-normal" style={{ color: 'var(--textd)' }}>
                        ({t('support.whatsapp_hint')})
                      </span>
                    </label>
                    <div className="flex items-center">
                      <Phone size={16} className="absolute ml-3" style={{ color: 'var(--textd)', pointerEvents: 'none' }} />
                      <input
                        className="nko-input pl-9"
                        type="tel"
                        placeholder="+1 234 567 8900"
                        value={form.whatsapp}
                        onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))}
                        style={{ paddingLeft: '2.5rem' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text)' }}>
                      {t('support.problem')} *
                    </label>
                    <textarea
                      className="nko-input"
                      rows={6}
                      placeholder={t('support.problem_placeholder')}
                      value={form.problem}
                      onChange={e => setForm(f => ({ ...f, problem: e.target.value }))}
                      required
                    />
                  </div>

                  <button type="submit" disabled={loading} className="btn-gold w-full justify-center">
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="spinner w-4 h-4" /> Submitting...
                      </span>
                    ) : (
                      <><MessageCircle size={16} /> {t('support.send')}</>
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
