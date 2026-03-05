'use client';

import { useState } from 'react';
import type { QuizQuestion } from '@/lib/types';
import { getLocalizedField } from '@/lib/i18n';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';
import type { SupportedLang } from '@/lib/types';

interface Props {
  questions: QuizQuestion[];
  lessonId: string;
  userId?: string;
  onComplete?: (score: number) => void;
}

export default function QuizSection({ questions, lessonId, userId, onComplete }: Props) {
  const { t, lang } = useTranslation();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [score, setScore] = useState(0);
  const [saving, setSaving] = useState(false);

  async function handleSubmit() {
    setSaving(true);
    const res = await fetch('/api/ai/quiz-grade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questions: questions.map(q => ({ answer_json: q.answer_json })),
        userAnswers: answers,
        lessonId,
        userId,
      }),
    });
    const data = await res.json();
    setResults(data.results);
    setScore(data.score);
    setSubmitted(true);
    onComplete?.(Math.round((data.score / questions.length) * 100));
    setSaving(false);
  }

  function retry() {
    setAnswers({});
    setSubmitted(false);
    setResults([]);
    setScore(0);
  }

  if (submitted) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="space-y-4">
        {/* Result Summary */}
        <div className="card-gold p-6 text-center">
          <Trophy size={32} style={{ color: pct >= 70 ? 'var(--gold)' : 'var(--text)', margin: '0 auto 0.75rem' }} />
          <h3 className="mb-1">{t('lesson.score')}</h3>
          <div className="text-4xl font-bold mb-2" style={{ color: pct >= 70 ? 'var(--gold)' : 'var(--terra)', fontFamily: 'Plus Jakarta Sans' }}>
            {pct}%
          </div>
          <p className="text-sm mb-4" style={{ color: 'var(--text)' }}>
            {score}/{questions.length} correct
          </p>
          <button onClick={retry} className="btn-outline btn-sm">
            <RotateCcw size={14} /> Retry Quiz
          </button>
        </div>

        {/* Question Reviews */}
        <div className="space-y-3">
          {questions.map((q, i) => {
            const correct = results[i];
            const userAns = answers[i] ?? '(no answer)';
            const correctAns = Array.isArray(q.answer_json) ? q.answer_json.join(', ') : String(q.answer_json);

            return (
              <div key={q.id} className={`card ${correct ? '' : ''}`} style={{ borderColor: correct ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)' }}>
                <div className="flex items-start gap-3 mb-2">
                  {correct
                    ? <CheckCircle size={18} style={{ color: 'var(--green)' }} />
                    : <XCircle size={18} style={{ color: '#ef4444' }} />
                  }
                  <p className="text-sm font-medium" style={{ color: 'var(--white)' }}>
                    {getLocalizedField(q.prompt, lang as SupportedLang)}
                  </p>
                </div>
                {!correct && (
                  <div className="ml-7 space-y-1 text-xs">
                    <p style={{ color: '#f87171' }}>Your answer: {userAns}</p>
                    <p style={{ color: 'var(--green)' }}>Correct: {correctAns}</p>
                  </div>
                )}
                {q.explanation && !correct && (
                  <div className="ml-7 mt-2 text-xs p-2 rounded" style={{ background: 'rgba(255,255,255,0.03)', color: 'var(--text)' }}>
                    {t('lesson.explanation')}: {getLocalizedField(q.explanation, lang as SupportedLang)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h4>{t('lesson.quiz')}</h4>
        <span className="tag">{questions.length} questions</span>
      </div>

      {questions.map((q, i) => (
        <div key={q.id} className="card" style={{ padding: '1.25rem' }}>
          <p className="text-sm font-medium mb-3" style={{ color: 'var(--white)' }}>
            <span style={{ color: 'var(--textd)' }}>{i + 1}. </span>
            {getLocalizedField(q.prompt, lang as SupportedLang)}
          </p>

          {q.type === 'multiple_choice' && q.options_json && (
            <div className="space-y-2">
              {q.options_json.map((opt, j) => (
                <button
                  key={j}
                  onClick={() => setAnswers(a => ({ ...a, [i]: opt }))}
                  className={`quiz-option w-full text-left ${answers[i] === opt ? 'selected' : ''}`}
                >
                  <span className="w-5 h-5 rounded flex items-center justify-center text-xs shrink-0"
                    style={{
                      background: answers[i] === opt ? 'rgba(200,165,80,0.2)' : 'transparent',
                      border: `1px solid ${answers[i] === opt ? 'var(--gold)' : 'var(--bord2)'}`,
                      color: answers[i] === opt ? 'var(--gold)' : 'var(--textd)',
                    }}
                  >
                    {String.fromCharCode(65 + j)}
                  </span>
                  {opt}
                </button>
              ))}
            </div>
          )}

          {q.type === 'true_false' && (
            <div className="flex gap-3">
              {['True', 'False'].map(opt => (
                <button
                  key={opt}
                  onClick={() => setAnswers(a => ({ ...a, [i]: opt }))}
                  className={`quiz-option flex-1 justify-center ${answers[i] === opt ? 'selected' : ''}`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {q.type === 'fill_blank' && (
            <input
              className="nko-input text-sm"
              placeholder="Type your answer..."
              value={answers[i] ?? ''}
              onChange={e => setAnswers(a => ({ ...a, [i]: e.target.value }))}
            />
          )}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={saving || Object.keys(answers).length < questions.length}
        className="btn-gold w-full justify-center"
      >
        {saving ? <span className="spinner w-4 h-4" /> : t('lesson.submit')}
      </button>
      {Object.keys(answers).length < questions.length && (
        <p className="text-xs text-center" style={{ color: 'var(--textd)' }}>
          Answer all {questions.length} questions to submit
        </p>
      )}
    </div>
  );
}
