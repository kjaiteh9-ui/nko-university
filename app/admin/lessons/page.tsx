'use client';

import { useState, useEffect } from 'react';
import { getSupabase } from '@/lib/supabase';
import type { Lesson } from '@/lib/types';
import { LEVEL_CONFIG } from '@/lib/types';
import { Eye, EyeOff, BookOpen, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function AdminLessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const { data } = await getSupabase()
      .from('lessons')
      .select('*')
      .order('level')
      .order('order_index');
    setLessons(data ?? []);
    setLoading(false);
  }

  async function togglePublish(lesson: Lesson) {
    await getSupabase()
      .from('lessons')
      .update({ is_published: !lesson.is_published })
      .eq('id', lesson.id);
    toast.success(`Lesson ${lesson.is_published ? 'unpublished' : 'published'}.`);
    load();
  }

  async function deleteLesson(id: string) {
    if (!confirm('Delete this lesson and all its quiz questions?')) return;
    await getSupabase().from('lessons').delete().eq('id', id);
    toast.success('Lesson deleted.');
    load();
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="mb-1">Lessons</h2>
          <p style={{ color: 'var(--text)' }}>{lessons.length} total lessons</p>
        </div>
        <Link href="/admin/generate" className="btn-gold btn-sm">+ Generate New</Link>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div className="p-8 text-center"><div className="spinner mx-auto" /></div>
        ) : (
          <table className="nko-table">
            <thead>
              <tr>
                <th>Lesson</th>
                <th>Level</th>
                <th>Order</th>
                <th>Est.</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map(lesson => {
                const lvl = LEVEL_CONFIG.find(l => l.level === lesson.level);
                return (
                  <tr key={lesson.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <BookOpen size={14} style={{ color: 'var(--textd)' }} />
                        <span style={{ color: 'var(--white)' }}>{lesson.title?.['en'] ?? 'Untitled'}</span>
                      </div>
                    </td>
                    <td>
                      <span className="tag" style={{ background: `${lvl?.color}18`, color: lvl?.color, borderColor: `${lvl?.color}30` }}>
                        L{lesson.level}
                      </span>
                    </td>
                    <td>{lesson.order_index}</td>
                    <td>{lesson.estimated_minutes}m</td>
                    <td>
                      <span className={`tag ${lesson.is_published ? 'tag-green' : ''}`}>
                        {lesson.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => togglePublish(lesson)}
                          className="p-1.5 rounded hover:bg-white/5 transition-colors"
                          title={lesson.is_published ? 'Unpublish' : 'Publish'}
                        >
                          {lesson.is_published
                            ? <EyeOff size={14} style={{ color: 'var(--textd)' }} />
                            : <Eye size={14} style={{ color: 'var(--gold)' }} />
                          }
                        </button>
                        <button
                          onClick={() => deleteLesson(lesson.id)}
                          className="p-1.5 rounded hover:bg-red-500/10 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} style={{ color: '#ef4444' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
