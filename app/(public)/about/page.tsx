'use client';

import { useTranslation } from '@/lib/hooks/useTranslation';
import { BookOpen, Brain, Globe, Users, Heart, Award } from 'lucide-react';

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero */}
      <section className="section" style={{ background: 'var(--bg)', borderBottom: '1px solid var(--bord2)' }}>
        <div className="container text-center max-w-3xl mx-auto">
          <div className="tag mb-6 mx-auto">Our Story</div>
          <h1 className="mb-6">{t('about.title')}</h1>
          <p className="text-lg" style={{ color: 'var(--text)' }}>
            {t('about.mission_body')}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="tag mb-6">Our Mission</div>
              <h2 className="mb-6">{t('about.mission_title')}</h2>
              <p className="mb-4" style={{ color: 'var(--text)' }}>
                The N&apos;Ko script, created by the visionary scholar Solomana Kante in 1949, is one of humanity&apos;s most remarkable achievements — an indigenous writing system designed specifically for the Manding language family spoken across West Africa.
              </p>
              <p className="mb-4" style={{ color: 'var(--text)' }}>
                At NKO University, we believe that language is identity. When a language loses its written form, part of a people&apos;s soul is lost. Our mission is to reverse that — to put the power of N&apos;Ko literacy in the hands of every person with African roots, wherever they are in the world.
              </p>
              <p style={{ color: 'var(--text)' }}>
                We use modern AI not to replace culture, but to amplify it. Every lesson, every quiz, every tutoring session draws from authentic Manding traditions, history, and language — just delivered through the most powerful educational technology ever built.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: <Brain size={20} />, title: 'AI-First Education', desc: 'Personalized learning paths powered by GPT-4o, available 24/7 in 6 languages.' },
                { icon: <Globe size={20} />, title: 'Global Reach', desc: 'Students from Guinea, Mali, Senegal, Côte d\'Ivoire, and the diaspora worldwide.' },
                { icon: <Heart size={20} />, title: 'Free for Everyone', desc: 'Education is a right. Our full platform is free, always.' },
                { icon: <Award size={20} />, title: 'Cultural Preservation', desc: 'Every lesson carries authentic N\'Ko script, proverbs, and Manding heritage.' },
              ].map((item, i) => (
                <div key={i} className="card flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(200,165,80,0.1)', color: 'var(--gold)' }}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="mb-1">{item.title}</h4>
                    <p className="text-sm" style={{ color: 'var(--text)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section">
        <div className="container max-w-2xl mx-auto text-center">
          <div className="tag mb-6 mx-auto">{t('about.founder')}</div>
          <div className="card-gold p-10">
            <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold" style={{ background: 'var(--forest)', border: '2px solid var(--border)', color: 'var(--gold)', fontFamily: 'Plus Jakarta Sans' }}>
              KD
            </div>
            <h3 className="mb-2">Karlang Diate</h3>
            <p className="tag mb-6 mx-auto">Founder &amp; CEO</p>
            <p style={{ color: 'var(--text)' }}>
              &ldquo;I built NKO University because I believe every African person deserves to read and write in a language that is truly theirs. N&apos;Ko is not just an alphabet — it is a revolution. And AI is the tool to bring that revolution to every phone, every home, every heart across Africa and the diaspora.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* Solomana Kante */}
      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="tag mb-4">History</div>
            <h2>The Story of Solomana Kante</h2>
          </div>
          <div className="card p-8">
            <p className="mb-4" style={{ color: 'var(--text)' }}>
              <strong style={{ color: 'var(--white)' }}>Solomana Kante</strong> (1922–1987) was a Guinean scholar, linguist, and autodidact from Kankan, Guinea. In 1949, frustrated that he could not write his own Manding language, he invented the N&apos;Ko alphabet — a complete, phonetically precise writing system.
            </p>
            <p className="mb-4" style={{ color: 'var(--text)' }}>
              He spent the rest of his life writing N&apos;Ko books on history, medicine, philosophy, and science — giving the Manding peoples their first indigenous written literature in modern times. He never sought fame or money; he gave everything he created freely to his people.
            </p>
            <div className="p-4 rounded-lg mt-6" style={{ background: 'rgba(200,165,80,0.06)', border: '1px solid var(--border)' }}>
              <p className="nko-text text-center mb-2" style={{ color: 'var(--gold)', fontSize: '1.5rem' }}>
                ߒߞߏ ߘߐ߫ ߟߊ߬ߓߊ߰ ߛ߭ ߘߌ
              </p>
              <p className="text-center text-sm" style={{ color: 'var(--textd)' }}>
                &ldquo;In N&apos;Ko, learning is the path&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
