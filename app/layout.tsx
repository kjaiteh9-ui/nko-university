import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'NKO Online University — AI-Powered N\'Ko & African Language Learning',
  description: 'The world\'s first AI-powered university for N\'Ko language. Learn from scratch with personalized AI lessons, adaptive quizzes, and a 24/7 AI tutor. Free forever.',
  keywords: ['N\'Ko', 'NKo', 'African language', 'Manding', 'online university', 'AI learning', 'Solomana Kante'],
  authors: [{ name: 'Karlang Diate' }],
  openGraph: {
    title: 'NKO Online University',
    description: 'AI-Powered N\'Ko & African Language Learning',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&family=Noto+Sans+NKo&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navigation />
        <main style={{ minHeight: '100vh', paddingTop: '64px' }}>
          {children}
        </main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: 'var(--bg2)',
              color: 'var(--white)',
              border: '1px solid var(--bord2)',
              borderRadius: '10px',
              fontSize: '0.875rem',
            },
            success: { iconTheme: { primary: '#22c55e', secondary: 'var(--bg2)' } },
            error: { iconTheme: { primary: '#ef4444', secondary: 'var(--bg2)' } },
          }}
        />
      </body>
    </html>
  );
}
