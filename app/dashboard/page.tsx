'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getSupabase } from '@/lib/supabase';
import { useUser } from '@/lib/hooks/useUser';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { LEVEL_CONFIG } from '@/lib/types';
import type { Lesson, Progress } from '@/lib/types';
import { getLocalizedField } from '@/lib/i18n';
import { BookOpen, Flame, Trophy, ArrowRight, Clock, CheckCircle, Lock } from 'lucide-react';

export default function DashboardPage() {
  const { t, lang } = useTranslation();
  const { user, profile, isLoading } = useUser();
  const router = useRouter();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) router.push('/login');
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!user) return;
    async function load() {
      const supabase = getSupabase();
      const [lessonsRes, progressRes] = await Promise.all([
        supabase.from('lessons').select('*').eq('is_published', true).order('level').order('order_index'),
        supabase.from('progress').select('*').eq('user_id', user!.id),
      ]);
      setLessons(lessonsRes.data ?? []);
      setProgress(progressRes.data ?? []);
      setDataLoading(false);
    }
    load();
  }, [user]);

  if (isLoading || dataLoading) {
    return (
      <div className="section flex justify-center">
        <div className="spinner" />
      </div>
    );
  }

  const completedCount = progress.filter(p => p.status === 'completed').length;
  const totalLessons = lessons.length;
  const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const avgScore = progress
    .filter(p => p.score != null)
    .reduce((sum, p) => sum + (p.score ?? 0), 0) / Math.max(progress.filter(p => p.score != null).length, 1);

  const progressMap: Record<string, Progress> = {};
  progress.forEach(p => { progressMap[p.lesson_id] = p; });

  const currentLevel = profile?.current_level ?? 1;
  const currentLevelInfo = LEVEL_CONFIG.find(l => l.level === currentLevel);

  // Find next recommended lesson
  const nextLesson = lessons.find(l => {
    const prog = progressMap[l.id];
    return !prog || prog.status !== 'completed';
  });

  return (
    <div className="section">
      <div className="container max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-10">
          <h1 className="mb-2">
            {t('dashboard.welcome')}, {profile?.name ?? 'Student'} 👋
          </h1>
          <p style={{ color: 'var(--text)' }}>
            Here&apos;s your learning progress at NKO University.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="card text-center py-5">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{ background: `${currentLevelInfo?.color ?? 'var(--gold)'}18`, color: currentLevelInfo?.color ?? 'var(--gold)' }}
              >
                {currentLevel}
              </div>
            </div>
            <div className="text-xs uppercase tracking-wider" style={{ color: 'var(--textd)' }}>{t('dashboard.level')}</div>
            <div className="font-bold mt-1" style={{ color: 'var(--white)' }}>{currentLevelInfo?.name}</div>
          </div>

          <div className="card text-center py-5">
            <Flame size={20} style={{ color: 'var(--terra)', margin: '0 auto 4px' }} />
            <div className="text-2xl font-bold" style={{ color: 'var(--white)' }}>{profile?.streak_days ?? 0}</div>
            <div className="text-xs" style={{ color: 'var(--textd)' }}>{t('dashboard.streak')}</div>
          </div>

          <div className="card text-center py-5">
            <CheckCircle size={20} style={{ color: 'var(--green)', margin: '0 auto 4px' }} />
            <div className="text-2xl font-bold" style={{ color: 'var(--white)' }}>{completedCount}</div>
            <div className="text-xs" style={{ color: 'var(--textd)' }}>{t('dashboard.completed')}</div>
          </div>

          <div className="card text-center py-5">
            <Trophy size={20} style={{ color: 'var(--gold)', margin: '0 auto 4px' }} />
            <div className="text-2xl font-bold" style={{ color: 'var(--white)' }}>
              {isNaN(avgScore) ? '—' : `${Math.round(avgScore)}%`}
            </div>
            <div className="text-xs" style={{ color: 'var(--textd)' }}>{t('dashboard.score_avg')}</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="card mb-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold" style={{ color: 'var(--white)' }}>{t('dashboard.progress')}</span>
            <span className="text-sm" style={{ color: 'var(--gold)' }}>{progressPct}%</span>
          </div>
          <div className="progress-bar" style={{ height: '10px' }}>
            <div className="progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <p className="text-xs mt-2" style={{ color: 'var(--textd)' }}>
            {completedCount} of {totalLessons} lessons completed
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Next Lesson */}
          <div className="lg:col-span-1">
            <h3 className="mb-4">{t('dashboard.next_lesson')}</h3>
            {nextLesson ? (
              <div className="card-gold p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="level-badge"
                    style={{
                      background: `${LEVEL_CONFIG[nextLesson.level - 1]?.color}18`,
                      color: LEVEL_CONFIG[nextLesson.level - 1]?.color,
                      borderColor: `${LEVEL_CONFIG[nextLesson.level - 1]?.color}30`,
                    }}
                  >
                    {nextLesson.level}
                  </div>
                  <span className="text-xs" style={{ color: 'var(--textd)' }}>
                    {LEVEL_CONFIG[nextLesson.level - 1]?.name}
                  </span>
                </div>
                <h4 className="mb-2">{getLocalizedField(nextLesson.title, lang as 'en')}</h4>
                <p className="text-sm mb-4" style={{ color: 'var(--text)' }}>
                  {getLocalizedField(nextLesson.description, lang as 'en')}
                </p>
                <div className="flex items-center gap-2 mb-4 text-xs" style={{ color: 'var(--textd)' }}>
                  <Clock size={12} />
                  {nextLesson.estimated_minutes} {t('lesson.min')}
                </div>
                <Link href={`/lessons/${nextLesson.id}`} className="btn-gold w-full justify-center">
                  Start Lesson <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <div className="card text-center p-6">
                <Trophy size={32} style={{ color: 'var(--gold)', margin: '0 auto 1rem' }} />
                <h4 className="mb-2">Course Complete!</h4>
                <p className="text-sm" style={{ color: 'var(--text)' }}>
                  You&apos;ve completed all available lessons. More coming soon!
                </p>
              </div>
            )}

            {/* Take Placement Test CTA if at level 1 with no progress */}
            {currentLevel === 1 && completedCount === 0 && (
              <div className="card mt-4 p-4">
                <p className="text-sm mb-3" style={{ color: 'var(--text)' }}>
                  Not sure where to start?
                </p>
                <Link href="/placement-test" className="btn-outline w-full justify-center text-sm">
                  Take Placement Test
                </Link>
              </div>
            )}
          </div>

          {/* Lessons List by Level */}
          <div className="lg:col-span-2">
            <h3 className="mb-4">All Lessons</h3>
            <div className="space-y-3">
              {LEVEL_CONFIG.map(lvlInfo => {
                const lvlLessons = lessons.filter(l => l.level === lvlInfo.level);
                if (lvlLessons.length === 0) return null;
                return (
                  <div key={lvlInfo.level} className="card" style={{ padding: '1rem 1.5rem' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <div
                        className="level-badge"
                        style={{ background: `${lvlInfo.color}18`, color: lvlInfo.color, borderColor: `${lvlInfo.color}30` }}
                      >
                        {lvlInfo.level}
                      </div>
                      <span className="text-sm font-semibold" style={{ color: lvlInfo.color }}>
                        Level {lvlInfo.level}: {lvlInfo.name}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {lvlLessons.map(lesson => {
                        const prog = progressMap[lesson.id];
                        const isCompleted = prog?.status === 'completed';
                        const isLocked = lesson.level > currentLevel + 1;
                        return (
                          <div
                            key={lesson.id}
                            className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/3 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              {isCompleted ? (
                                <CheckCircle size={16} style={{ color: 'var(--green)' }} />
                              ) : isLocked ? (
                                <Lock size={16} style={{ color: 'var(--textd)' }} />
                              ) : (
                                <BookOpen size={16} style={{ color: 'var(--text)' }} />
                              )}
                              <span className="text-sm" style={{ color: isLocked ? 'var(--textd)' : 'var(--text)' }}>
                                {getLocalizedField(lesson.title, lang as 'en')}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              {prog?.score != null && (
                                <span className="text-xs" style={{ color: 'var(--gold)' }}>
                                  {prog.score}%
                                </span>
                              )}
                              {!isLocked && (
                                <Link
                                  href={`/lessons/${lesson.id}`}
                                  className="text-xs px-2 py-1 rounded"
                                  style={{
                                    background: 'rgba(200,165,80,0.1)',
                                    color: 'var(--gold)',
                                    border: '1px solid rgba(200,165,80,0.2)',
                                  }}
                                >
                                  {isCompleted ? 'Review' : 'Start'}
                                </Link>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
