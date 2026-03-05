'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getSupabase } from '@/lib/supabase';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { useUser } from '@/lib/hooks/useUser';
import { getLocalizedField } from '@/lib/i18n';
import { LEVEL_CONFIG } from '@/lib/types';
import type { Course, Lesson, Progress } from '@/lib/types';
import { BookOpen, Clock, CheckCircle, ArrowRight, Lock } from 'lucide-react';

export default function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const { t, lang } = useTranslation();
  const { user, profile } = useUser();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<Record<string, Progress>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = getSupabase();
      const [courseRes, lessonsRes] = await Promise.all([
        supabase.from('courses').select('*').eq('id', courseId).single(),
        supabase.from('lessons').select('*').eq('course_id', courseId).eq('is_published', true).order('level').order('order_index'),
      ]);
      setCourse(courseRes.data);
      setLessons(lessonsRes.data ?? []);

      if (user) {
        const { data: progData } = await supabase
          .from('progress')
          .select('*')
          .eq('user_id', user.id)
          .in('lesson_id', (lessonsRes.data ?? []).map(l => l.id));
        const map: Record<string, Progress> = {};
        (progData ?? []).forEach(p => { map[p.lesson_id] = p; });
        setProgress(map);
      }
      setLoading(false);
    }
    load();
  }, [courseId, user]);

  if (loading) return <div className="section flex justify-center"><div className="spinner" /></div>;
  if (!course) return <div className="section container text-center"><p style={{ color: 'var(--text)' }}>Course not found.</p></div>;

  const completedCount = Object.values(progress).filter(p => p.status === 'completed').length;
  const progressPct = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;
  const currentLevel = profile?.current_level ?? 1;

  return (
    <div>
      {/* Header */}
      <section className="section" style={{ background: 'var(--bg2)', paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="container max-w-4xl mx-auto">
          <div className="tag mb-4">{t('courses.free')}</div>
          <h1 className="mb-4">{getLocalizedField(course.title, lang as 'en')}</h1>
          <p className="text-lg mb-6" style={{ color: 'var(--text)' }}>
            {getLocalizedField(course.description, lang as 'en')}
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--textd)' }}>
              <BookOpen size={16} /> {lessons.length} {t('courses.lessons')}
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--textd)' }}>
              <Clock size={16} /> {Math.round(lessons.length * 20 / 60)}h estimated
            </div>
            {user && (
              <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--green)' }}>
                <CheckCircle size={16} /> {completedCount}/{lessons.length} completed
              </div>
            )}
          </div>
          {user && (
            <div className="mt-6 max-w-sm">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progressPct}%` }} />
              </div>
              <p className="text-xs mt-1" style={{ color: 'var(--textd)' }}>{progressPct}% complete</p>
            </div>
          )}
        </div>
      </section>

      {/* Lessons by Level */}
      <section className="section">
        <div className="container max-w-4xl mx-auto">
          {LEVEL_CONFIG.map(lvlInfo => {
            const lvlLessons = lessons.filter(l => l.level === lvlInfo.level);
            if (lvlLessons.length === 0) return null;
            return (
              <div key={lvlInfo.level} className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="level-badge"
                    style={{ background: `${lvlInfo.color}18`, color: lvlInfo.color, borderColor: `${lvlInfo.color}30` }}
                  >
                    {lvlInfo.level}
                  </div>
                  <div>
                    <h3 style={{ color: lvlInfo.color }}>Level {lvlInfo.level}: {lvlInfo.name}</h3>
                    <p className="text-xs" style={{ color: 'var(--textd)' }}>{lvlInfo.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {lvlLessons.map(lesson => {
                    const prog = progress[lesson.id];
                    const isCompleted = prog?.status === 'completed';
                    const isLocked = !user || lesson.level > currentLevel + 1;

                    return (
                      <div
                        key={lesson.id}
                        className="card flex items-center justify-between gap-4"
                        style={{ padding: '1rem 1.5rem', opacity: isLocked ? 0.6 : 1 }}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                            style={{
                              background: isCompleted ? 'rgba(34,197,94,0.1)' : `${lvlInfo.color}10`,
                              color: isCompleted ? 'var(--green)' : isLocked ? 'var(--textd)' : lvlInfo.color,
                            }}
                          >
                            {isCompleted ? <CheckCircle size={20} /> : isLocked ? <Lock size={18} /> : <BookOpen size={18} />}
                          </div>
                          <div>
                            <h4 className="text-sm">{getLocalizedField(lesson.title, lang as 'en')}</h4>
                            <div className="flex items-center gap-3 mt-0.5">
                              <span className="text-xs" style={{ color: 'var(--textd)' }}>
                                <Clock size={10} className="inline mr-1" />
                                {lesson.estimated_minutes} min
                              </span>
                              {prog?.score != null && (
                                <span className="text-xs" style={{ color: 'var(--gold)' }}>
                                  Score: {prog.score}%
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {!isLocked ? (
                          <Link href={`/lessons/${lesson.id}`} className="btn-gold btn-sm shrink-0">
                            {isCompleted ? 'Review' : 'Start'} <ArrowRight size={14} />
                          </Link>
                        ) : (
                          <span className="text-xs shrink-0" style={{ color: 'var(--textd)' }}>
                            Complete previous levels
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {!user && (
            <div className="card-gold text-center p-8 mt-8">
              <h3 className="mb-3">Sign up to Track Your Progress</h3>
              <p className="mb-4" style={{ color: 'var(--text)' }}>
                Create a free account to unlock all lessons, track your progress, and use the expert tutor.
              </p>
              <Link href="/signup" className="btn-gold">
                Create Free Account <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
