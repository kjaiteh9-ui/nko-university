'use client';

import Link from 'next/link';
import { BookOpen, Heart } from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: 'var(--bg2)', borderTop: '1px solid var(--bord2)' }}>
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--forest)', border: '1px solid var(--border)' }}>
                <BookOpen size={16} style={{ color: 'var(--gold)' }} />
              </div>
              <span className="font-bold" style={{ fontFamily: 'Plus Jakarta Sans', color: 'var(--white)' }}>
                NKO <span style={{ color: 'var(--gold)' }}>University</span>
              </span>
            </div>
            <p className="text-sm mb-3" style={{ color: 'var(--text)' }}>
              {t('footer.tagline')}
            </p>
            <p className="text-xs" style={{ color: 'var(--textd)' }}>
              {t('footer.founder')}
            </p>
            {/* N'Ko sample */}
            <div className="mt-4 p-3 rounded-lg border border-[var(--bord2)] inline-block">
              <p className="nko-text" style={{ color: 'var(--gold)', fontSize: '1.3rem' }}>
                ߒߞߏ ߘߌ߫ ߓߊ
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--textd) '}}>
                &ldquo;N&apos;Ko is the path&rdquo;
              </p>
            </div>
          </div>

          {/* Learning */}
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: 'var(--white)' }}>Learning</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/courses', label: 'All Courses' },
                { href: '/courses', label: 'N\'Ko Level 1' },
                { href: '/placement-test', label: 'Placement Test' },
                { href: '/dashboard', label: 'Dashboard' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm transition-colors hover:text-[var(--gold)]" style={{ color: 'var(--text)' }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: 'var(--white)' }}>Company</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/pricing', label: 'Pricing' },
                { href: '/faq', label: 'FAQ' },
                { href: '/contact', label: 'Contact' },
                { href: '/support', label: 'Student Support' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm transition-colors hover:text-[var(--gold)]" style={{ color: 'var(--text)' }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[var(--bord2)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: 'var(--textd)' }}>
            © {year} NKO University. {t('footer.rights')}
          </p>
          <p className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--textd)' }}>
            Made with <Heart size={12} style={{ color: 'var(--terra)' }} fill="currentColor" /> for Africa
          </p>
        </div>
      </div>
    </footer>
  );
}
