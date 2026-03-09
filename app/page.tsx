'use client';

import Link from 'next/link';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { BookOpen, Brain, Globe, Star, ArrowRight, Play, CheckCircle, Zap, Users, Award } from 'lucide-react';
import { LEVEL_CONFIG } from '@/lib/types';

export default function HomePage() {
  const { t } = useTranslation();

  const stats = [
    { label: t('hero.stat_students'), value: '12,400+' },
    { label: t('hero.stat_lessons'), value: '108' },
    { label: t('hero.stat_languages'), value: '6' },
    { label: t('hero.stat_free'), value: '100%' },
  ];

  const features = [
    {
      icon: <Brain size={24} style={{ color: 'var(--gold)' }} />,
      title: 'Expert-Crafted Lessons',
      desc: 'Every lesson is carefully designed for your level and preferred language.',
    },
    {
      icon: <Zap size={24} style={{ color: 'var(--terra)' }} />,
      title: 'Adaptive Learning',
      desc: 'The system tracks your progress and automatically recommends the right next step.',
    },
    {
      icon: <Globe size={24} style={{ color: 'var(--gold)' }} />,
      title: 'Multi-Language Support',
      desc: 'Study in English, French, Arabic, Portuguese, Spanish, or N\'Ko itself.',
    },
    {
      icon: <Users size={24} style={{ color: 'var(--terra)' }} />,
      title: '24/7 Expert Tutor',
      desc: 'Ask anything, anytime. Your tutor knows your current lesson and level.',
    },
    {
      icon: <Award size={24} style={{ color: 'var(--gold)' }} />,
      title: '6 Structured Levels',
      desc: 'From alphabet to advanced — a clear, progressive path to fluency.',
    },
    {
      icon: <CheckCircle size={24} style={{ color: 'var(--terra)' }} />,
      title: 'Instant Quizzes',
      desc: 'Auto-graded quizzes after every lesson to reinforce your learning.',
    },
  ];

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section
        className="section"
        style={{
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          background: 'var(--bg)',
          backgroundImage: 'var(--hero-gradient)',
          paddingTop: '80px',
        }}
      >
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="eyebrow mx-auto">
              <span className="eyebrow-dot" />
              {t('hero.eyebrow')}
            </div>

            <h1 className="grad-text mb-6">
              {t('hero.title')}
            </h1>

            {/* N'Ko script showcase */}
            <div className="nko-lg mb-6" style={{ color: 'var(--gold)', opacity: 0.8 }}>
              ߒߞߏ ߘߐ߫ ߟߊ߬ߓߊ߰
            </div>

            <p className="text-lg mb-8 mx-auto max-w-xl" style={{ color: 'var(--text)' }}>
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-wrap gap-3 justify-center mb-12">
              <Link href="/courses" className="btn-gold">
                {t('hero.cta_primary')} <ArrowRight size={16} />
              </Link>
              <Link href="/courses" className="btn-outline">
                <Play size={16} /> {t('hero.cta_secondary')}
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="card-gold text-center py-4">
                  <div className="text-2xl font-bold mb-1" style={{ color: 'var(--gold)', fontFamily: 'Plus Jakarta Sans' }}>
                    {stat.value}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--textd)' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <div className="text-center mb-12">
            <div className="tag mb-4">Why NKO University</div>
            <h2>Learn the Way Your Brain Works</h2>
            <p className="mt-4 max-w-lg mx-auto" style={{ color: 'var(--text)' }}>
              No textbooks. No waiting. Just you and an expert system that knows exactly where you are in your journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => (
              <div key={i} className="card">
                <div className="mb-4 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(200,165,80,0.08)', border: '1px solid var(--border)' }}>
                  {feat.icon}
                </div>
                <h4 className="mb-2">{feat.title}</h4>
                <p className="text-sm" style={{ color: 'var(--text)' }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Learning Path ──────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <div className="tag mb-4">Your Path</div>
            <h2>6 Levels to Fluency</h2>
            <p className="mt-4 max-w-lg mx-auto" style={{ color: 'var(--text)' }}>
              A clear, structured journey from your first letter to advanced conversation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {LEVEL_CONFIG.map(lvl => (
              <div key={lvl.level} className="card group hover:scale-[1.01] transition-transform cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="level-badge"
                    style={{ background: `${lvl.color}18`, borderColor: `${lvl.color}30`, color: lvl.color }}
                  >
                    {lvl.level}
                  </div>
                  <span className="tag-green tag text-xs">3 Lessons</span>
                </div>
                <h4 className="mb-1" style={{ color: lvl.color }}>{lvl.name}</h4>
                <p className="text-sm" style={{ color: 'var(--text)' }}>{lvl.description}</p>
                <div className="progress-bar mt-4">
                  <div className="progress-fill" style={{ width: '0%', background: `linear-gradient(90deg, ${lvl.color}80, ${lvl.color})` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/courses" className="btn-gold">
              {t('hero.cta_secondary')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── N'Ko Showcase ──────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="card-gold text-center p-8">
              <div className="tag mb-6 mx-auto">N&apos;Ko Script</div>
              <p className="nko-lg mb-4" style={{ color: 'var(--gold)', fontSize: '2.5rem' }}>
                ߒߞߏ ߛߓߍߛߎ߲
              </p>
              <p className="text-sm mb-6" style={{ color: 'var(--text)' }}>
                &ldquo;N&apos;Ko Script&rdquo; — written right to left in the beautiful N&apos;Ko alphabet
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {['ߊ', 'ߓ', 'ߒ', 'ߞ', 'ߟ', 'ߡ'].map(char => (
                  <div key={char} className="bg-[var(--bg)] rounded-lg p-3 text-center">
                    <div className="nko-lg" style={{ color: 'var(--white)', fontSize: '1.8rem' }}>{char}</div>
                  </div>
                ))}
              </div>
              <Link href="/courses" className="btn-gold mx-auto">
                Start Learning N&apos;Ko Today <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="text-center mb-12">
            <div className="tag mb-4">Community</div>
            <h2>Students Around the World</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Mamadou D.', country: 'Guinée', text: 'Enfin une plateforme qui honore notre héritage. Le tuteur IA est incroyable!', level: 'Level 3' },
              { name: 'Aisha K.', country: 'Mali', text: 'I never thought I could read N\'Ko in just 2 months. The AI lessons are perfect.', level: 'Level 2' },
              { name: 'Ibrahim S.', country: 'Senegal', text: 'The tutor answers my questions at 2am when I study. Always available, any time.', level: 'Level 4' },
            ].map((testimonial, i) => (
              <div key={i} className="card">
                <div className="flex gap-1 mb-3">
                  {[1,2,3,4,5].map(s => <Star key={s} size={12} fill="var(--gold)" style={{ color: 'var(--gold)' }} />)}
                </div>
                <p className="text-sm mb-4" style={{ color: 'var(--text)' }}>&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold" style={{ color: 'var(--white)' }}>{testimonial.name}</div>
                    <div className="text-xs" style={{ color: 'var(--textd)' }}>{testimonial.country}</div>
                  </div>
                  <span className="tag text-xs">{testimonial.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <div className="card-gold text-center p-12">
            <BookOpen size={40} style={{ color: 'var(--gold)', margin: '0 auto 1rem' }} />
            <h2 className="mb-4">Ready to Connect with Your Roots?</h2>
            <p className="mb-8 max-w-md mx-auto" style={{ color: 'var(--text)' }}>
              Join thousands of learners preserving and celebrating African linguistic heritage. Start free, today.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/courses" className="btn-gold">
                Start Learning Free <ArrowRight size={16} />
              </Link>
              <Link href="/placement-test" className="btn-outline">
                Take Placement Test
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
