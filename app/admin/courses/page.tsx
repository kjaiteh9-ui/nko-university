'use client';

import { useState, useEffect } from 'react';
import { getSupabase } from '@/lib/supabase';
import type { Course } from '@/lib/types';
import { GraduationCap, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);

  async function load() {
    const { data } = await getSupabase().from('courses').select('*').order('created_at');
    setCourses(data ?? []);
    setLoading(false);
  }

  async function togglePublish(course: Course) {
    await getSupabase().from('courses').update({ is_published: !course.is_published }).eq('id', course.id);
    toast.success(`Course ${course.is_published ? 'unpublished' : 'published'}.`);
    load();
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="mb-1">Courses</h2>
          <p style={{ color: 'var(--text)' }}>{courses.length} total courses</p>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div className="p-8 text-center"><div className="spinner mx-auto" /></div>
        ) : (
          <table className="nko-table">
            <thead>
              <tr>
                <th>Course</th>
                <th>Language Focus</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <GraduationCap size={14} style={{ color: 'var(--textd)' }} />
                      <span style={{ color: 'var(--white)' }}>{course.title?.['en'] ?? 'Untitled'}</span>
                    </div>
                  </td>
                  <td className="uppercase text-xs">{course.language_focus}</td>
                  <td>
                    <span className={`tag ${course.is_published ? 'tag-green' : ''}`}>
                      {course.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td>{new Date(course.created_at).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => togglePublish(course)}
                      className="p-1.5 rounded hover:bg-white/5 transition-colors"
                      title={course.is_published ? 'Unpublish' : 'Publish'}
                    >
                      {course.is_published
                        ? <EyeOff size={14} style={{ color: 'var(--textd)' }} />
                        : <Eye size={14} style={{ color: 'var(--gold)' }} />
                      }
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
