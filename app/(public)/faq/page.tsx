'use client';

import { useState } from 'react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { ChevronDown } from 'lucide-react';

export default function FAQPage() {
  const { t } = useTranslation();
  const [open, setOpen] = useState<number | null>(0);

  const faqs = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
    { q: 'What is the N\'Ko script?', a: 'N\'Ko (ߒߞߏ) is an alphabet created in 1949 by Solomana Kante specifically for the Manding language family of West Africa. It is written right-to-left and has 27 letters (7 vowels + 19 consonants + 1 extension).' },
    { q: 'Do I need to create an account?', a: 'You can browse courses and the landing page without an account. To access lessons, quizzes, the expert tutor, and track your progress, you need a free account.' },
    { q: 'Can I skip the placement test?', a: 'Yes! The placement test is optional. If you skip it, you\'ll start at Level 1 — the perfect place to begin if you\'ve never seen N\'Ko before.' },
    { q: 'How does the tutor know about my lesson?', a: 'When you open the tutor chat on a lesson page, the system automatically receives context about your current lesson, your level, and your preferred language. It can answer questions specific to what you\'re studying.' },
  ];

  return (
    <div>
      <section className="section" style={{ background: 'var(--bg)', paddingBottom: '40px' }}>
        <div className="container text-center max-w-2xl mx-auto">
          <div className="tag mb-6 mx-auto">Support</div>
          <h1 className="mb-4">{t('faq.title')}</h1>
          <p style={{ color: 'var(--text)' }}>
            Can&apos;t find what you&apos;re looking for? <a href="/contact" style={{ color: 'var(--gold)' }}>Contact us</a>.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '40px' }}>
        <div className="container max-w-2xl mx-auto">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="card overflow-hidden" style={{ padding: 0 }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/3 transition-colors"
                >
                  <span className="font-medium text-sm pr-4" style={{ color: 'var(--white)' }}>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    style={{ color: 'var(--text)' }}
                    className={`transition-transform ${open === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {open === i && (
                  <div className="px-5 pb-5" style={{ borderTop: '1px solid var(--bord2)' }}>
                    <p className="text-sm pt-4" style={{ color: 'var(--text)', lineHeight: 1.7 }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
