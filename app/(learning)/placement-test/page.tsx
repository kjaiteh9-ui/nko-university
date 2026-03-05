'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/lib/hooks/useUser';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { getSupabase } from '@/lib/supabase';
import { ArrowRight, SkipForward, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const QUESTIONS = [
  { id: 1, level: 1, q: 'What does N\'Ko (ߒߞߏ) mean?', options: ['I write', 'I say', 'I know', 'I read'], answer: 'I say' },
  { id: 2, level: 1, q: 'In which direction is N\'Ko written?', options: ['Left to right', 'Top to bottom', 'Right to left', 'Bottom to top'], answer: 'Right to left' },
  { id: 3, level: 1, q: 'Who created the N\'Ko script?', options: ['Sundiata Keita', 'Solomana Kante', 'Cheikh Anta Diop', 'Seydou Badian'], answer: 'Solomana Kante' },
  { id: 4, level: 2, q: 'What N\'Ko character is this? ߊ', options: ['K', 'A', 'N', 'B'], answer: 'A' },
  { id: 5, level: 2, q: 'N\'Ko has how many vowel letters?', options: ['5', '6', '7', '8'], answer: '7' },
  { id: 6, level: 3, q: 'What is the sentence order in N\'Ko?', options: ['SVO (Subject-Verb-Object)', 'SOV (Subject-Object-Verb)', 'VSO (Verb-Subject-Object)', 'OVS (Object-Verb-Subject)'], answer: 'SOV (Subject-Object-Verb)' },
  { id: 7, level: 3, q: 'The N\'Ko past tense marker is:', options: ['ߊ', 'ߞߊ߬', 'ߓߊ', 'ߡߊ'], answer: 'ߞߊ߬' },
  { id: 8, level: 4, q: 'What does ߝߊ߬ mean?', options: ['Mother', 'Child', 'Father', 'Brother'], answer: 'Father' },
  { id: 9, level: 4, q: 'The N\'Ko word ߛߏ means:', options: ['Water', 'Food', 'House', 'Market'], answer: 'Food' },
  { id: 10, level: 5, q: 'What does the N\'Ko relative clause marker ߡߍ߲ translate to?', options: ['Who/Which/That', 'And', 'But', 'Because'], answer: 'Who/Which/That' },
];

export default function PlacementTestPage() {
  const { t } = useTranslation();
  const { user, profile } = useUser();
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ level: number; explanation: string } | null>(null);

  async function handleSkip() {
    router.push('/dashboard');
  }

  function selectAnswer(answer: string) {
    setAnswers(a => ({ ...a, [current]: answer }));
  }

  function next() {
    if (current < QUESTIONS.length - 1) setCurrent(c => c + 1);
    else handleSubmit();
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const res = await fetch('/api/placement-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: QUESTIONS.map((q, i) => ({
          question: q.q,
          userAnswer: answers[i] ?? '',
          correctAnswer: q.answer,
        })) }),
      });
      const data = await res.json();
      setResult(data);

      // Update user level
      if (user) {
        await getSupabase()
          .from('profiles')
          .update({ current_level: data.level })
          .eq('id', user.id);
      }
    } catch {
      toast.error('Error processing test.');
    }
    setSubmitting(false);
  }

  if (result) {
    const levelNames = ['', 'Alphabet', 'Words', 'Grammar', 'Conversation', 'Reading', 'Advanced'];
    return (
      <div className="section flex items-center justify-center min-h-screen" style={{ paddingTop: '0' }}>
        <div className="card-gold text-center p-12 max-w-lg mx-auto">
          <CheckCircle size={56} style={{ color: 'var(--green)', margin: '0 auto 1.5rem' }} />
          <h2 className="mb-2">{t('placement.result')}</h2>
          <div className="text-6xl font-bold grad-text mb-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            {result.level}
          </div>
          <div className="tag mb-6 mx-auto">Level {result.level}: {levelNames[result.level]}</div>
          <p className="mb-8" style={{ color: 'var(--text)' }}>{result.explanation}</p>
          <button onClick={() => router.push('/dashboard')} className="btn-gold mx-auto">
            Start Learning <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="section flex items-center justify-center min-h-screen" style={{ paddingTop: '0' }}>
        <div className="card-gold text-center p-12 max-w-lg mx-auto">
          <h2 className="mb-2">{t('placement.title')}</h2>
          <p className="mb-8" style={{ color: 'var(--text)' }}>{t('placement.subtitle')}</p>
          <div className="space-y-3">
            <button onClick={() => setStarted(true)} className="btn-gold w-full justify-center">
              {t('placement.start')} <ArrowRight size={16} />
            </button>
            <button onClick={handleSkip} className="btn-outline w-full justify-center">
              <SkipForward size={16} /> {t('placement.skip')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[current];
  const selected = answers[current];

  return (
    <div className="section">
      <div className="container max-w-xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-xs mb-2" style={{ color: 'var(--textd)' }}>
            <span>Question {current + 1} of {QUESTIONS.length}</span>
            <span>Level {q.level} question</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${((current + 1) / QUESTIONS.length) * 100}%` }} />
          </div>
        </div>

        <div className="card p-8">
          <h3 className="mb-8">{q.q}</h3>

          <div className="space-y-3 mb-8">
            {q.options.map(opt => (
              <button
                key={opt}
                onClick={() => selectAnswer(opt)}
                className={`quiz-option w-full text-left ${selected === opt ? 'selected' : ''}`}
              >
                <span className="w-6 h-6 rounded-full border flex items-center justify-center text-xs shrink-0"
                  style={{
                    borderColor: selected === opt ? 'var(--gold)' : 'var(--bord2)',
                    background: selected === opt ? 'rgba(200,165,80,0.15)' : 'transparent',
                    color: selected === opt ? 'var(--gold)' : 'var(--textd)',
                  }}
                >
                  {String.fromCharCode(65 + q.options.indexOf(opt))}
                </span>
                {opt}
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrent(c => Math.max(0, c - 1))}
              className="btn-outline btn-sm"
              disabled={current === 0}
            >
              ← Previous
            </button>
            <button
              onClick={next}
              disabled={!selected || submitting}
              className="btn-gold btn-sm"
            >
              {submitting ? <span className="spinner w-4 h-4" /> : current === QUESTIONS.length - 1 ? t('placement.submit') : 'Next →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
