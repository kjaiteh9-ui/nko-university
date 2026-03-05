'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { getSupabase } from '@/lib/supabase';
import { useUser } from '@/lib/hooks/useUser';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { getLocalizedField } from '@/lib/i18n';
import { LEVEL_CONFIG } from '@/lib/types';
import type { Lesson, QuizQuestion, Progress } from '@/lib/types';
import LessonContent from '@/components/lesson/LessonContent';
import QuizSection from '@/components/lesson/QuizSection';
import AiTutorChat from '@/components/lesson/AiTutorChat';
import LessonSidebar from '@/components/lesson/LessonSidebar';
import { Clock, MessageSquare, ChevronRight, ChevronLeft, CheckCircle, Menu, X, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';

type ActiveTab = 'lesson' | 'quiz' | 'tutor';

export default function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { t, lang } = useTranslation();
  const { user, profile } = useUser();
  const router = useRouter();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [progressMap, setProgressMap] = useState<Record<string, Progress>>({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>('lesson');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [marking, setMarking] = useState(false);
  const [marked, setMarked] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = getSupabase();
      const [lessonRes, questionsRes] = await Promise.all([
        supabase.from('lessons').select('*').eq('id', lessonId).single(),
        supabase.from('quiz_questions').select('*').eq('lesson_id', lessonId).order('order_index'),
      ]);

      setLesson(lessonRes.data);
      setQuestions(questionsRes.data ?? []);

      if (lessonRes.data?.course_id) {
        const { data: allLessonsData } = await supabase
          .from('lessons')
          .select('*')
          .eq('course_id', lessonRes.data.course_id)
          .eq('is_published', true)
          .order('level')
          .order('order_index');
        setAllLessons(allLessonsData ?? []);
      }

      if (user) {
        const { data: prog } = await supabase
          .from('progress')
          .select('*')
          .eq('user_id', user.id);
        const map: Record<string, Progress> = {};
        (prog ?? []).forEach(p => { map[p.lesson_id] = p; });
        setProgressMap(map);

        const thisProgress = map[lessonId];
        if (thisProgress?.status === 'completed') setMarked(true);

        // Track "in_progress"
        if (!thisProgress || thisProgress.status === 'not_started') {
          await supabase.from('progress').upsert({
            user_id: user.id,
            lesson_id: lessonId,
            status: 'in_progress',
            updated_at: new Date().toISOString(),
          }, { onConflict: 'user_id,lesson_id' });
        }
      }

      setLoading(false);
    }
    load();
  }, [lessonId, user]);

  async function markComplete() {
    if (!user) { toast.error('Sign in to track progress.'); return; }
    setMarking(true);
    await getSupabase().from('progress').upsert({
      user_id: user.id,
      lesson_id: lessonId,
      status: 'completed',
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id,lesson_id' });
    setMarked(true);
    toast.success('Lesson marked complete!');
    setMarking(false);
  }

  async function handleQuizComplete(score: number) {
    if (!user) return;
    await getSupabase().from('progress').upsert({
      user_id: user.id,
      lesson_id: lessonId,
      status: 'completed',
      score,
      attempts: (progressMap[lessonId]?.attempts ?? 0) + 1,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id,lesson_id' });
    setMarked(true);
  }

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><div className="spinner" /></div>;
  if (!lesson) return <div className="container section text-center"><p style={{ color: 'var(--text)' }}>Lesson not found.</p></div>;

  const levelInfo = LEVEL_CONFIG.find(l => l.level === lesson.level);
  const currentIdx = allLessons.findIndex(l => l.id === lessonId);
  const prevLesson = currentIdx > 0 ? allLessons[currentIdx - 1] : null;
  const nextLesson = currentIdx < allLessons.length - 1 ? allLessons[currentIdx + 1] : null;
  const title = getLocalizedField(lesson.title, lang as 'en');
  const desc = getLocalizedField(lesson.description, lang as 'en');

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>
      {/* Sidebar — Desktop */}
      <aside
        className="hidden lg:block shrink-0"
        style={{ width: '260px', overflowY: 'auto', borderRight: '1px solid var(--bord2)', background: 'var(--bg)' }}
      >
        <LessonSidebar lessons={allLessons} currentLessonId={lessonId} progress={progressMap} lang={lang} />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.6)' }} />
          <aside
            className="relative w-72 overflow-y-auto"
            style={{ background: 'var(--bg)', borderRight: '1px solid var(--bord2)' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-end p-3">
              <button onClick={() => setSidebarOpen(false)}><X size={20} style={{ color: 'var(--text)' }} /></button>
            </div>
            <LessonSidebar lessons={allLessons} currentLessonId={lessonId} progress={progressMap} lang={lang} />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Lesson Header */}
        <div
          className="shrink-0 px-6 py-4 border-b border-[var(--bord2)]"
          style={{ background: 'var(--bg2)' }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <button className="lg:hidden p-1" onClick={() => setSidebarOpen(true)}>
                <Menu size={20} style={{ color: 'var(--text)' }} />
              </button>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className="level-badge"
                    style={{ background: `${levelInfo?.color}18`, color: levelInfo?.color, borderColor: `${levelInfo?.color}30` }}
                  >
                    {lesson.level}
                  </div>
                  <span className="text-xs" style={{ color: 'var(--textd)' }}>{levelInfo?.name}</span>
                  {marked && <CheckCircle size={14} style={{ color: 'var(--green)' }} />}
                </div>
                <h3 className="text-lg">{title}</h3>
                <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: 'var(--textd)' }}>
                  <span><Clock size={11} className="inline mr-1" />{lesson.estimated_minutes} min</span>
                  <span>{questions.length} quiz questions</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {!marked && (
                <button onClick={markComplete} disabled={marking} className="btn-outline btn-sm">
                  {marking ? <span className="spinner w-3 h-3" /> : <><CheckCircle size={14} /> {t('lesson.complete')}</>}
                </button>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4">
            {(['lesson', 'quiz', 'tutor'] as ActiveTab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === tab
                    ? 'text-[var(--white)]'
                    : 'text-[var(--text)] hover:text-[var(--white)]'
                }`}
                style={{
                  background: activeTab === tab ? 'rgba(200,165,80,0.12)' : 'transparent',
                  border: activeTab === tab ? '1px solid var(--border)' : '1px solid transparent',
                }}
              >
                {tab === 'lesson' && <><BookOpen size={12} className="inline mr-1" />{t('lesson.exercises').split(' ')[0]}</>}
                {tab === 'quiz' && <><BookOpen size={12} className="inline mr-1" />{t('lesson.quiz')}</>}
                {tab === 'tutor' && <><MessageSquare size={12} className="inline mr-1" />{t('lesson.ai_tutor')}</>}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'lesson' && (
            <div className="p-6 max-w-3xl">
              {desc && (
                <p className="text-base mb-8" style={{ color: 'var(--text)', lineHeight: 1.8 }}>{desc}</p>
              )}
              {lesson.content_json ? (
                <LessonContent content={lesson.content_json} />
              ) : (
                <div className="text-center py-12">
                  <p style={{ color: 'var(--textd)' }}>This lesson is being prepared. Check back soon!</p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-12 pt-6 border-t border-[var(--bord2)]">
                {prevLesson ? (
                  <Link href={`/lessons/${prevLesson.id}`} className="btn-outline btn-sm">
                    <ChevronLeft size={14} /> {t('lesson.prev')}
                  </Link>
                ) : <div />}
                {nextLesson ? (
                  <Link href={`/lessons/${nextLesson.id}`} className="btn-gold btn-sm">
                    {t('lesson.next')} <ChevronRight size={14} />
                  </Link>
                ) : (
                  <Link href="/dashboard" className="btn-gold btn-sm">
                    Back to Dashboard <ChevronRight size={14} />
                  </Link>
                )}
              </div>
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="p-6 max-w-2xl">
              {questions.length > 0 ? (
                <QuizSection
                  questions={questions}
                  lessonId={lessonId}
                  userId={user?.id}
                  onComplete={handleQuizComplete}
                />
              ) : (
                <div className="text-center py-12 card">
                  <p style={{ color: 'var(--textd)' }}>No quiz questions for this lesson yet.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'tutor' && (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <AiTutorChat
                lessonId={lessonId}
                lessonTitle={title}
                level={lesson.level}
                userId={user?.id}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
