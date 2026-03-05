'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BookOpen, Menu, X, LayoutDashboard, User, LogOut, Settings } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';
import { useTranslation } from '@/lib/hooks/useTranslation';
import { useUser } from '@/lib/hooks/useUser';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, lang, setLang } = useTranslation();
  const { user, profile, isAdmin } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { href: '/', key: 'nav.home' },
    { href: '/courses', key: 'nav.courses' },
    { href: '/about', key: 'nav.about' },
    { href: '/faq', key: 'nav.faq' },
    { href: '/pricing', key: 'nav.pricing' },
  ];

  async function handleLogout() {
    await getSupabase().auth.signOut();
    router.push('/');
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(17,26,20,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--bord2)',
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--forest)', border: '1px solid var(--border)' }}
            >
              <BookOpen size={16} style={{ color: 'var(--gold)' }} />
            </div>
            <div>
              <span className="font-bold text-sm" style={{ fontFamily: 'Plus Jakarta Sans', color: 'var(--white)' }}>
                NKO{' '}
                <span style={{ color: 'var(--gold)' }}>University</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-all ${
                  pathname === link.href
                    ? 'text-[var(--white)] bg-white/8'
                    : 'text-[var(--text)] hover:text-[var(--white)] hover:bg-white/5'
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher current={lang} onChange={setLang} />

            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/dashboard" className="btn-outline btn-sm flex items-center gap-1.5">
                  <LayoutDashboard size={14} />
                  {t('nav.dashboard')}
                </Link>
                {isAdmin && (
                  <Link href="/admin" className="btn-outline btn-sm flex items-center gap-1.5">
                    <Settings size={14} />
                    Admin
                  </Link>
                )}
                <div className="relative group">
                  <button className="w-8 h-8 rounded-full bg-[var(--forest)] border border-[var(--border)] flex items-center justify-center text-[var(--gold)] text-xs font-bold">
                    {profile?.name?.[0]?.toUpperCase() ?? <User size={14} />}
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-44 rounded-xl bg-[var(--bg2)] border border-[var(--bord2)] shadow-2xl hidden group-hover:block z-50">
                    <Link href="/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--text)] hover:text-[var(--white)] hover:bg-white/5 transition-colors rounded-t-xl">
                      <User size={14} /> {t('nav.profile')}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-[var(--text)] hover:text-[var(--white)] hover:bg-white/5 transition-colors rounded-b-xl text-left"
                    >
                      <LogOut size={14} /> {t('nav.logout')}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login" className="btn-outline btn-sm">{t('nav.login')}</Link>
                <Link href="/signup" className="btn-gold btn-sm">{t('nav.signup')}</Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-lg text-[var(--text)] hover:text-[var(--white)] hover:bg-white/5"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[var(--bord2)] py-4 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm text-[var(--text)] hover:text-[var(--white)] hover:bg-white/5 transition-colors"
              >
                {t(link.key)}
              </Link>
            ))}
            <div className="border-t border-[var(--bord2)] pt-3 mt-3 space-y-1">
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-lg text-sm text-[var(--text)] hover:bg-white/5 transition-colors">
                    {t('nav.dashboard')}
                  </Link>
                  <Link href="/profile" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-lg text-sm text-[var(--text)] hover:bg-white/5 transition-colors">
                    {t('nav.profile')}
                  </Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2.5 rounded-lg text-sm text-[var(--text)] hover:bg-white/5 transition-colors">
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-lg text-sm text-center btn-outline">{t('nav.login')}</Link>
                  <Link href="/signup" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-lg text-sm text-center btn-gold mt-2">{t('nav.signup')}</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
