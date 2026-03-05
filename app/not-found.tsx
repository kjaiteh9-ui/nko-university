import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="section flex items-center justify-center min-h-screen" style={{ paddingTop: 0 }}>
      <div className="text-center max-w-lg mx-auto">
        <div className="text-8xl font-bold mb-4 grad-text" style={{ fontFamily: 'Plus Jakarta Sans' }}>404</div>
        <div className="nko-text mb-6" style={{ color: 'var(--gold)', fontSize: '2rem' }}>ߛ߭ ߘߌ ߣ</div>
        <h2 className="mb-4">Page Not Found</h2>
        <p className="mb-8" style={{ color: 'var(--text)' }}>
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back on track.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="btn-gold">
            <BookOpen size={16} /> Go Home
          </Link>
          <Link href="/courses" className="btn-outline">Browse Courses</Link>
        </div>
      </div>
    </div>
  );
}
