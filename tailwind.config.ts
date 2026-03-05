import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1a3a2a',
          light: '#2d5a3d',
          dark: '#0d1e16',
        },
        gold: {
          DEFAULT: '#c8a550',
          light: '#e4c76a',
          dark: '#8a6e30',
        },
        terra: {
          DEFAULT: '#d4662a',
          light: '#e8814d',
          dark: '#a44d1e',
        },
        cream: '#f7f3ee',
        nko: {
          dark: '#111a14',
          card: '#1a2620',
          muted: '#7a9a84',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        nko: ['Noto Sans NKo', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s infinite',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(ellipse at 20% 50%, rgba(200,165,80,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(26,58,42,0.3) 0%, transparent 50%)',
        'card-gradient': 'linear-gradient(135deg, rgba(26,38,32,0.8) 0%, rgba(26,58,42,0.4) 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
