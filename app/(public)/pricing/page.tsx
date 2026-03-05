'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { Check, Heart, ArrowRight, X, ExternalLink } from 'lucide-react';

const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'XOF', symbol: 'CFA', name: 'West African Franc' },
  { code: 'GNF', symbol: 'GF', name: 'Guinean Franc' },
];

const PRESET_AMOUNTS = [5, 10, 25, 50, 100];

export default function PricingPage() {
  const { t } = useTranslation();
  const [showDonate, setShowDonate] = useState(false);
  const [amount, setAmount] = useState(10);
  const [customAmount, setCustomAmount] = useState('');
  const [currency, setCurrency] = useState('USD');

  const freeFeatures = [
    'All 6 learning levels',
    '18+ expert lessons',
    'Interactive exercises & quizzes',
    'Expert Tutor (24/7 chat)',
    'Progress tracking & dashboard',
    'Multi-language support (6 languages)',
    "N'Ko script support",
    'Mobile-friendly platform',
    'Completion certificate',
  ];

  const donateViaPayPal = () => {
    const finalAmount = customAmount ? parseFloat(customAmount) : amount;
    if (!finalAmount || finalAmount <= 0) return;
    const cur = currency === 'XOF' || currency === 'GNF' ? 'USD' : currency;
    const url = `https://www.paypal.com/donate/?business=kjaiteh9%40gmail.com&amount=${finalAmount}&currency_code=${cur}&item_name=NKO+University+Donation`;
    window.open(url, '_blank');
  };

  return (
    <div>
      {/* Header */}
      <section className="section" style={{ background: 'var(--bg)', paddingBottom: '40px' }}>
        <div className="container text-center max-w-2xl mx-auto">
          <div className="tag mb-6 mx-auto">Simple Pricing</div>
          <h1 className="mb-4">{t('pricing.title')}</h1>
          <p className="text-lg" style={{ color: 'var(--text)' }}>{t('pricing.subtitle')}</p>
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
                <p className="text-sm" style={{ color: 'var(--text)' }}>Your donation helps us:</p>
                {[
                  'Keep the platform free for everyone',
                  'Expand to more African languages',
                  'Improve lesson quality and content',
                  'Translate content for more regions',
                  "Support N'Ko literacy programs in Africa",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm" style={{ color: 'var(--text)' }}>
                    <Heart size={14} style={{ color: 'var(--terra)' }} />
                    {item}
                  </div>
                ))}
              </div>
              <button onClick={() => setShowDonate(true)} className="btn-terra w-full justify-center">
                <Heart size={16} /> {t('pricing.donate_btn')}
              </button>
            </div>
          </div>

          <div className="text-center mt-12">
            <p style={{ color: 'var(--textd)' }}>
              Have questions?{' '}
              <Link href="/faq" style={{ color: 'var(--gold)' }} className="hover:underline">See our FAQ</Link>
              {' '}or{' '}
              <Link href="/contact" style={{ color: 'var(--gold)' }} className="hover:underline">contact us</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Donation Modal */}
      {showDonate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)' }} onClick={() => setShowDonate(false)}>
          <div className="card-gold w-full max-w-md p-8" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3>Support NKO University</h3>
              <button onClick={() => setShowDonate(false)} style={{ color: 'var(--textd)' }}>
                <X size={20} />
              </button>
            </div>

            <p className="text-sm mb-6" style={{ color: 'var(--text)' }}>
              Choose your donation amount and currency. You will be redirected to PayPal to complete the payment securely.
            </p>

            {/* Currency */}
            <div className="mb-4">
              <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text)' }}>Currency</label>
              <select className="nko-input" value={currency} onChange={e => setCurrency(e.target.value)}>
                {CURRENCIES.map(c => (
                  <option key={c.code} value={c.code}>{c.symbol} {c.name} ({c.code})</option>
                ))}
              </select>
            </div>

            {/* Preset amounts */}
            <div className="mb-4">
              <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text)' }}>Amount</label>
              <div className="grid grid-cols-5 gap-2 mb-3">
                {PRESET_AMOUNTS.map(a => (
                  <button key={a} onClick={() => { setAmount(a); setCustomAmount(''); }}
                    className="py-2 rounded-lg text-sm font-medium transition-all"
                    style={{
                      background: amount === a && !customAmount ? 'var(--terra)' : 'var(--bg2)',
                      color: amount === a && !customAmount ? 'white' : 'var(--text)',
                      border: '1px solid var(--border)',
                    }}>
                    {a}
                  </button>
                ))}
              </div>
              <input className="nko-input" type="number" min="1" placeholder="Or enter custom amount"
                value={customAmount} onChange={e => setCustomAmount(e.target.value)} />
            </div>

            <div className="p-3 rounded-lg mb-6 text-center" style={{ background: 'rgba(212,102,42,0.08)', border: '1px solid rgba(212,102,42,0.2)' }}>
              <span className="text-sm font-medium" style={{ color: 'var(--terra)' }}>
                Donating:{' '}
                {CURRENCIES.find(c => c.code === currency)?.symbol}
                {customAmount || amount} {currency}
              </span>
            </div>

            <button onClick={donateViaPayPal} className="btn-terra w-full justify-center mb-3">
              <ExternalLink size={16} /> Donate via PayPal
            </button>
            <p className="text-xs text-center" style={{ color: 'var(--textd)' }}>
              Secure payment via PayPal. Accepts all major cards and PayPal balance.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
