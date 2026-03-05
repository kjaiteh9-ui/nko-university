'use client';

import Link from 'next/link';
import type { Lesson, Progress } from '@/lib/types';
import { LEVEL_CONFIG } from '@/lib/types';
import { getLocalizedField } from '@/lib/i18n';
import { CheckCircle, BookOpen } from 'lucide-react';
import type { SupportedLang } from '@/lib/types';

interface Props {
  lessons: Lesson[];
  currentLessonId: string;
  progress: Record<string, Progress>;
  lang: string;
}

export default function LessonSidebar({ lessons, currentLessonId, progress, lang }: Props) {
  const levelGroups = LEVEL_CONFIG.map(lvl => ({
    ...lvl,
    lessons: lessons.filter(l => l.level === lvl.level),
  })).filter(g => g.lessons.length > 0);

  return (
    <div className="sidebar-nav pr-2">
      <div className="p-4 border-b border-[var(--bord2)]">
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--textd)' }}>
          Course Lessons
        </p>
      </div>
      <div className="py-2">
        {levelGroups.map(group => (
          <div key={group.level} className="mb-2">
            <div className="flex items-center gap-2 px-4 py-2">
              <div
                className="w-5 h-5 rounded text-xs flex items-center justify-center font-bold shrink-0"
                style={{ background: `${group.color}18`, color: group.color }}
              >
                {group.level}
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: group.color }}>
                {group.name}
              </p>
            </div>

            {group.lessons.map(lesson => {
              const prog = progress[lesson.id];
              const isDone = prog?.status === 'completed';
              const isActive = lesson.id === currentLessonId;

              return (
                <Link
                  key={lesson.id}
                  href={`/lessons/${lesson.id}`}
                  className={`sidebar-link mx-2 ${isActive ? 'active' : ''}`}
                >
                  <div className="shrink-0">
                    {isDone
                      ? <CheckCircle size={14} style={{ color: 'var(--green)' }} />
                      : <BookOpen size={14} style={{ color: isActive ? 'var(--gold)' : 'var(--textd)' }} />
                    }
                  </div>
                  <span className="text-xs truncate">
                    {getLocalizedField(lesson.title, lang as SupportedLang)}
                  </span>
                  {prog?.score != null && (
                    <span className="ml-auto text-xs shrink-0" style={{ color: 'var(--gold)' }}>
                      {prog.score}%
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
