'use client';

import { useState, useEffect } from 'react';
import { getSupabase } from '@/lib/supabase';
import type { Profile } from '@/lib/types';
import { LEVEL_CONFIG } from '@/lib/types';
import { Search, Users } from 'lucide-react';

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getSupabase()
      .from('profiles')
      .select('*')
      .eq('role', 'student')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setStudents(data ?? []);
        setLoading(false);
      });
  }, []);

  const filtered = students.filter(s =>
    search === '' ||
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.country?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="mb-1">Students</h2>
          <p style={{ color: 'var(--text)' }}>{students.length} total students</p>
        </div>
      </div>

      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--textd)' }} />
        <input
          className="nko-input pl-9 max-w-sm"
          placeholder="Search by name or country..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div className="p-8 text-center"><div className="spinner mx-auto" /></div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Users size={32} style={{ color: 'var(--textd)', margin: '0 auto 1rem' }} />
            <p style={{ color: 'var(--textd)' }}>No students found.</p>
          </div>
        ) : (
          <table className="nko-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Level</th>
                <th>Language</th>
                <th>Streak</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(student => {
                const lvl = LEVEL_CONFIG.find(l => l.level === student.current_level);
                return (
                  <tr key={student.id}>
                    <td>
                      <div>
                        <p style={{ color: 'var(--white)', fontWeight: 500 }}>{student.name || 'Anonymous'}</p>
                      </div>
                    </td>
                    <td>{student.country || '—'}</td>
                    <td>
                      <span
                        className="tag"
                        style={{ background: `${lvl?.color}18`, color: lvl?.color, borderColor: `${lvl?.color}30` }}
                      >
                        L{student.current_level} {lvl?.name}
                      </span>
                    </td>
                    <td style={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>{student.preferred_language}</td>
                    <td>{student.streak_days}d</td>
                    <td>{new Date(student.created_at).toLocaleDateString()}</td>
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
