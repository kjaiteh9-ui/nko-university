'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/lib/hooks/useUser';
import { LayoutDashboard, BookOpen, Wand2, Users, GraduationCap } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, isLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (!user) router.push('/login');
      else if (profile && profile.role !== 'admin') router.push('/dashboard');
    }
  }, [user, profile, isLoading, router]);

  if (isLoading || !profile) return <div className="section flex justify-center"><div className="spinner" /></div>;
  if (profile.role !== 'admin') return null;

  const links = [
    { href: '/admin', label: 'Overview', icon: <LayoutDashboard size={16} /> },
    { href: '/admin/courses', label: 'Courses', icon: <GraduationCap size={16} /> },
    { href: '/admin/lessons', label: 'Lessons', icon: <BookOpen size={16} /> },
    { href: '/admin/generate', label: 'AI Generate', icon: <Wand2 size={16} /> },
    { href: '/admin/students', label: 'Students', icon: <Users size={16} /> },
  ];

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 64px)' }}>
      {/* Admin Sidebar */}
      <aside
        className="w-56 shrink-0"
        style={{ background: 'var(--bg2)', borderRight: '1px solid var(--bord2)' }}
      >
        <div className="p-4 border-b border-[var(--bord2)]">
          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--gold)' }}>Admin Panel</p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--textd)' }}>{profile.name}</p>
        </div>
        <nav className="p-3 space-y-1">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`sidebar-link ${pathname === link.href ? 'active' : ''}`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
