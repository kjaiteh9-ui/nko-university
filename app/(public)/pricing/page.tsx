'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { Check, Heart, ArrowRight } from 'lucide-react';

export default function PricingPage() {
  const { t } = useTranslation();

  const freeFeatures = [
    'All 6 learning levels',
    '18+ AI-generated lessons',
    'Interactive exercises & quizzes',
    'AI Tutor (24/7 chat)',
    'Progress tracking & dashboard',
    'Multi-language support (6 languages)',
    'N\'Ko script support',
    'Mobile-friendly platform',
    'Completion certificate',
  ];

  return (
    <div>
      {/* Header */}
      <section className="section" style={{ background: 'var(--bg)', paddingBottom: '40px' }}>
        <div className="container text-center max-w-2xl mx-auto">
          <div className="tag mb-6 mx-auto">Simple Pricing</div>
          <h1 className="mb-4">{t('pricing.title')}</h1>
          <p className="text-lg" style={{ color: 'var(--text)' }}>
            {t('pricing.subtitle')}
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section" style={{ paddingTop: '40px' }}>
        <div className="container max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="card-gold p-8">
              <div className="mb-6">
                <div className="tag-green tag mb-3">Most Popular</div>
                <h2 className="mb-2">{t('pricing.free_title')}</h2>
                <div className="flex items-end gap-2 mb-3">
                  <span className="text-5xl font-bold grad-text">$0</span>
                  <span style={{ color: 'var(--text)' }}>/ forever</span>
                </div>
                <p style={{ color: 'var(--text)' }}>{t('pricing.free_desc')}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {freeFeatures.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm" style={{ color: 'var(--text)' }}>
                    <Check size={16} style={{ color: 'var(--green)' }} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="/signup" className="btn-gold w-full justify-center">
                {t('pricing.free_btn')} <ArrowRight size={16} />
              </Link>
            </div>

            {/* Donation Plan */}
            <div className="card p-8 flex flex-col">
              <div className="mb-6">
                <div className="tag-terra tag mb-3">Support Our Mission</div>
                <h2 className="mb-2">{t('pricing.donate_title')}</h2>
                <div className="flex items-end gap-2 mb-3">
                  <span className="text-5xl font-bold" style={{ color: 'var(--terra)' }}>Any</span>
                  <span style={{ color: 'var(--text)' }}>amount</span>
                </div>
                <p style={{ color: 'var(--text)' }}>{t('pricing.donate_desc')}</p>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                <p className="text-sm" style={{ color: 'var(--text)' }}>
                  Your donation helps us:
                </p>
                {[
                  'Keep the platform free for everyone',
                  'Expand to more African languages',
                  'Improve AI lesson quality',
                  'Translate content for more regions',
                  'Support N\'Ko literacy programs in Africa',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm" style={{ color: 'var(--text)' }}>
                    <Heart size={14} style={{ color: 'var(--terra)' }} />
                    {item}
                  </div>
                ))}
              </div>

              <a
                href="mailto:kjaiteh9@gmail.com?subject=NKO University Donation"
                className="btn-terra w-full justify-center text-center"
              >
                <Heart size={16} /> {t('pricing.donate_btn')}
              </a>
            </div>
          </div>

          {/* FAQ note */}
          <div className="text-center mt-12">
            <p style={{ color: 'var(--textd)' }}>
              Have questions about pricing?{' '}
              <Link href="/faq" style={{ color: 'var(--gold)' }} className="hover:underline">
                See our FAQ
              </Link>{' '}
              or{' '}
              <Link href="/contact" style={{ color: 'var(--gold)' }} className="hover:underline">
                contact us
              </Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
