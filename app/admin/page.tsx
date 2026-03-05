'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSupabase } from '@/lib/supabase';
import { Users, BookOpen, GraduationCap, Wand2, TrendingUp } from 'lucide-react';

export default function AdminOverviewPage() {
  const [stats, setStats] = useState({ students: 0, lessons: 0, courses: 0, submissions: 0 });
  const [recentStudents, setRecentStudents] = useState<Array<{ name: string; email: string; created_at: string; current_level: number }>>([]);

  useEffect(() => {
    async function load() {
      const supabase = getSupabase();
      const [studentsRes, lessonsRes, coursesRes, subRes, recentRes] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact' }).eq('role', 'student'),
        supabase.from('lessons').select('id', { count: 'exact' }),
        supabase.from('courses').select('id', { count: 'exact' }),
        supabase.from('support_submissions').select('id', { count: 'exact' }),
        supabase.from('profiles').select('name, email, current_level, created_at').eq('role', 'student').order('created_at', { ascending: false }).limit(5),
      ]);
      setStats({
        students: studentsRes.count ?? 0,
        lessons: lessonsRes.count ?? 0,
        courses: coursesRes.count ?? 0,
        submissions: subRes.count ?? 0,
      });
      setRecentStudents(recentRes.data ?? []);
    }
    load();
  }, []);

  const cards = [
    { label: 'Total Students', value: stats.students, icon: <Users size={20} />, color: 'var(--gold)', href: '/admin/students' },
    { label: 'Total Lessons', value: stats.lessons, icon: <BookOpen size={20} />, color: 'var(--terra)', href: '/admin/lessons' },
    { label: 'Total Courses', value: stats.courses, icon: <GraduationCap size={20} />, color: 'var(--green)', href: '/admin/courses' },
    { label: 'Support Tickets', value: stats.submissions, icon: <TrendingUp size={20} />, color: '#3b82f6', href: '/admin/students' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="mb-1">Admin Overview</h2>
        <p style={{ color: 'var(--text)' }}>NKO University Dashboard</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((c, i) => (
          <Link key={i} href={c.href} className="card hover:no-underline block">
            <div className="flex items-center justify-between mb-3">
              <div style={{ color: c.color }}>{c.icon}</div>
            </div>
            <div className="text-3xl font-bold mb-1" style={{ color: 'var(--white)', fontFamily: 'Plus Jakarta Sans' }}>
              {c.value}
            </div>
            <div className="text-xs" style={{ color: 'var(--textd)' }}>{c.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="card">
          <h4 className="mb-4">Quick Actions</h4>
          <div className="space-y-2">
            <Link href="/admin/generate" className="btn-gold w-full justify-center">
              <Wand2 size={16} /> Generate New Lesson with AI
            </Link>
            <Link href="/admin/courses" className="btn-outline w-full justify-center">
              <GraduationCap size={16} /> Manage Courses
            </Link>
            <Link href="/admin/lessons" className="btn-outline w-full justify-center">
              <BookOpen size={16} /> Manage Lessons
            </Link>
          </div>
        </div>

        {/* Recent Students */}
        <div className="card">
          <h4 className="mb-4">Recent Students</h4>
          {recentStudents.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--textd)' }}>No students yet.</p>
          ) : (
            <div className="space-y-3">
              {recentStudents.map((s, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--white)' }}>{s.name || 'Anonymous'}</p>
                    <p className="text-xs" style={{ color: 'var(--textd)' }}>
                      {new Date(s.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="tag">Level {s.current_level}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
