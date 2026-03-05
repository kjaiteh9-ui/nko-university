'use client';

import { useState, useEffect } from 'react';
import { getSupabase } from '@/lib/supabase';
import type { Course } from '@/lib/types';
import { LEVEL_CONFIG } from '@/lib/types';
import { LANGUAGES } from '@/lib/i18n';
import { Wand2, Save, Eye, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function GenerateLessonPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [form, setForm] = useState({
    topic: '',
    level: 1,
    language: 'en',
    courseId: '',
  });
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState<Record<string, unknown> | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getSupabase().from('courses').select('*').then(({ data }) => setCourses(data ?? []));
  }, []);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!form.topic) { toast.error('Please enter a topic.'); return; }
    setGenerating(true);
    setGenerated(null);
    setSaved(false);

    try {
      const res = await fetch('/api/ai/generate-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        setGenerated(data.lesson);
        toast.success('Lesson generated! Review and save below.');
      }
    } catch {
      toast.error('Generation failed. Check your OpenAI API key.');
    }
    setGenerating(false);
  }

  async function handleSave() {
    if (!generated) return;
    setSaving(true);
    const supabase = getSupabase();

    const lesson = generated as Record<string, unknown>;
    const { data: lessonData, error } = await supabase.from('lessons').insert({
      course_id: form.courseId || null,
      level: form.level,
      order_index: 99,
      title: lesson.title,
      description: lesson.description,
      content_json: lesson.content_json,
      estimated_minutes: 20,
      is_published: false,
    }).select().single();

    if (error) {
      toast.error('Failed to save lesson: ' + error.message);
    } else if (lessonData && lesson.quiz_questions) {
      const questions = lesson.quiz_questions as Array<Record<string, unknown>>;
      if (questions.length > 0) {
        await supabase.from('quiz_questions').insert(
          questions.map((q, i) => ({
            lesson_id: lessonData.id,
            type: q.type,
            prompt: q.prompt,
            options_json: q.options_json,
            answer_json: q.answer_json,
            explanation: q.explanation,
            order_index: i + 1,
          }))
        );
      }
      setSaved(true);
      toast.success(`Lesson saved! ID: ${lessonData.id} (unpublished — go to Lessons to publish)`);
    }
    setSaving(false);
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h2 className="mb-1">AI Lesson Generator</h2>
        <p style={{ color: 'var(--text)' }}>Generate a complete lesson with exercises and quiz using GPT-4o.</p>
      </div>

      {/* Generation Form */}
      <div className="card mb-8">
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text)' }}>
              Topic *
            </label>
            <input
              className="nko-input"
              placeholder="e.g. N'Ko pronouns, African proverbs, N'Ko numerals..."
              value={form.topic}
              onChange={e => setForm(f => ({ ...f, topic: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text)' }}>Level</label>
              <select
                className="nko-input"
                value={form.level}
                onChange={e => setForm(f => ({ ...f, level: +e.target.value }))}
              >
                {LEVEL_CONFIG.map(l => (
                  <option key={l.level} value={l.level}>Level {l.level}: {l.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text)' }}>Language</label>
              <select
                className="nko-input"
                value={form.language}
                onChange={e => setForm(f => ({ ...f, language: e.target.value }))}
              >
                {LANGUAGES.map(l => (
                  <option key={l.code} value={l.code}>{l.flag} {l.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium mb-2" style={{ color: 'var(--text)' }}>Course (optional)</label>
              <select
                className="nko-input"
                value={form.courseId}
                onChange={e => setForm(f => ({ ...f, courseId: e.target.value }))}
              >
                <option value="">— No course —</option>
                {courses.map(c => (
                  <option key={c.id} value={c.id}>{c.title?.['en'] ?? c.id}</option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" disabled={generating} className="btn-gold">
            {generating
              ? <><span className="spinner w-4 h-4" /> Generating with GPT-4o...</>
              : <><Wand2 size={16} /> Generate Lesson</>
            }
          </button>
        </form>
      </div>

      {/* Preview */}
      {generated && (
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Eye size={18} style={{ color: 'var(--gold)' }} />
              <h4>Generated Lesson Preview</h4>
            </div>
            {!saved ? (
              <button onClick={handleSave} disabled={saving} className="btn-gold btn-sm">
                {saving ? <span className="spinner w-4 h-4" /> : <><Save size={14} /> Save to Database</>}
              </button>
            ) : (
              <span className="flex items-center gap-2 text-sm" style={{ color: 'var(--green)' }}>
                <CheckCircle size={14} /> Saved!
              </span>
            )}
          </div>

          <pre className="text-xs overflow-auto max-h-96 p-4 rounded-lg" style={{
            background: 'rgba(0,0,0,0.3)',
            color: 'var(--text)',
            border: '1px solid var(--bord2)',
            lineHeight: 1.5,
          }}>
            {JSON.stringify(generated, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
