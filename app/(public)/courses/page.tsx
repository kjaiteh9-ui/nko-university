'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSupabase } from '@/lib/supabase';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { getLocalizedField } from '@/lib/i18n';
import { LEVEL_CONFIG } from '@/lib/types';
import type { Course, Lesson } from '@/lib/types';
import { BookOpen, Clock, ArrowRight, Loader } from 'lucide-react';

export default function CoursesPage() {
  const { t, lang } = useTranslation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [lessonCounts, setLessonCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = getSupabase();
      const { data: coursesData } = await supabase
        .from('courses')
        .select('*')
        .eq('is_published', true)
        .order('created_at');

      if (coursesData) {
        setCourses(coursesData);

        // Count lessons per course
        const counts: Record<string, number> = {};
        for (const course of coursesData) {
          const { count } = await supabase
            .from('lessons')
            .select('id', { count: 'exact' })
            .eq('course_id', course.id)
            .eq('is_published', true);
          counts[course.id] = count ?? 0;
        }
        setLessonCounts(counts);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="section flex justify-center items-center">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <section className="section" style={{ background: 'var(--bg)', borderBottom: '1px solid var(--bord2)', paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="container text-center max-w-2xl mx-auto">
          <div className="tag mb-6 mx-auto">{t('courses.levels')}</div>
          <h1 className="mb-4">{t('courses.title')}</h1>
          <p className="text-lg" style={{ color: 'var(--text)' }}>
            {t('courses.subtitle')}
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="section">
        <div className="container">
          {courses.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen size={48} style={{ color: 'var(--textd)', margin: '0 auto 1rem' }} />
              <p style={{ color: 'var(--text)' }}>No courses published yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {courses.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  lessonCount={lessonCounts[course.id] ?? 0}
                  lang={lang}
                  t={t}
                />
              ))}
            </div>
          )}

          {/* Level Breakdown */}
          <div className="mt-16">
            <h3 className="text-center mb-8" style={{ color: 'var(--white)' }}>
              What You&apos;ll Learn at Each Level
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {LEVEL_CONFIG.map(lvl => (
                <div key={lvl.level} className="card text-center p-4">
                  <div
                    className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center text-lg font-bold"
                    style={{ background: `${lvl.color}18`, color: lvl.color, fontFamily: 'Plus Jakarta Sans' }}
                  >
                    {lvl.level}
                  </div>
                  <h4 className="text-xs font-bold mb-1" style={{ color: lvl.color }}>{lvl.name}</h4>
                  <p className="text-xs" style={{ color: 'var(--textd)' }}>{lvl.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CourseCard({ course, lessonCount, lang, t }: {
  course: Course;
  lessonCount: number;
  lang: string;
  t: (k: string) => string;
}) {
  const title = getLocalizedField(course.title, lang as 'en');
  const desc = getLocalizedField(course.description, lang as 'en');

  return (
    <div className="card-gold overflow-hidden">
      {/* Thumbnail */}
      <div
        className="h-36 rounded-lg mb-5 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, var(--forest) 0%, var(--bg) 100%)', border: '1px solid var(--bord2)' }}
      >
        <p className="nko-lg" style={{ color: 'var(--gold)', fontSize: '2.5rem' }}>ߒߞߏ</p>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className="tag">{t('courses.free')}</span>
        <span className="tag-green tag">{LEVEL_CONFIG.length} {t('courses.levels')}</span>
      </div>

      <h3 className="mb-2">{title}</h3>
      <p className="text-sm mb-5" style={{ color: 'var(--text)' }}>{desc}</p>

      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--textd)' }}>
          <BookOpen size={14} />
          <span>{lessonCount} {t('courses.lessons')}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--textd)' }}>
          <Clock size={14} />
          <span>{Math.round(lessonCount * 20 / 60)}h total</span>
        </div>
      </div>

      <Link href={`/courses/${course.id}`} className="btn-gold w-full justify-center">
        {t('courses.start')} <ArrowRight size={16} />
      </Link>
    </div>
  );
}
