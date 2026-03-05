# NKO Online University

**AI-Powered N'Ko & African Language Learning Platform**

Built by Karlang Diate | Founded on the legacy of Solomana Kante (1949)

---

## What is NKO University?

NKO Online University is the world's first fully AI-powered learning platform dedicated to the N'Ko language and African cultural heritage. Every lesson, quiz, and tutoring session is AI-generated and delivered — available 24/7, in 6 languages, completely free.

**Features:**
- 6 structured levels (Alphabet → Advanced)
- AI-generated lessons with N'Ko script
- Auto-graded quizzes
- 24/7 AI tutor (context-aware, in your language)
- Optional placement test
- Multi-language UI: English, Français, العربية, Português, Español, ߒߞߏ
- RTL support for Arabic and N'Ko
- Student support & contact forms (→ email + Google Sheets via n8n)
- Admin panel with AI lesson generator

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 App Router + TypeScript |
| Styling | TailwindCSS + Custom CSS |
| Auth + DB | Supabase (Postgres + Auth) |
| AI | OpenAI GPT-4o |
| Email | Nodemailer (SMTP) |
| Sheets | n8n webhooks |
| Deploy | Vercel |

---

## Setup — Run Locally

### 1. Install dependencies
```bash
cd nko-university
npm install
```

### 2. Configure environment
```bash
cp .env.example .env.local
# Edit .env.local with your values (see below)
```

### 3. Set up Supabase
1. Go to [supabase.com](https://supabase.com) → Create new project
2. Copy your Project URL and API keys into `.env.local`
3. Open the **SQL Editor** in Supabase dashboard
4. Run `supabase/migrations/001_schema.sql` (copy + paste the entire file)
5. Run `supabase/migrations/002_seed.sql` (copy + paste — adds sample course + 18 lessons)

### 4. Set up OpenAI
1. Get API key from [platform.openai.com](https://platform.openai.com/api-keys)
2. Add to `.env.local` as `OPENAI_API_KEY`

### 5. Run the app
```bash
npm run dev
# Open http://localhost:3000
```

---

## Set Up Admin Account

1. Sign up at `http://localhost:3000/signup`
2. In Supabase → Table Editor → `profiles` table
3. Find your user → Edit `role` field → change from `student` to `admin`
4. Refresh the app → You'll see "Admin Panel" in navigation

---

## Email Configuration (SMTP)

For contact/support forms to send emails:

**Option A: Gmail**
1. Enable 2-factor auth on your Gmail
2. Go to Google Account → Security → App Passwords → Create app password
3. Add to `.env.local`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your-16-char-app-password
```

**Option B: Mailgun / SendGrid / Any SMTP**
Fill in the respective SMTP credentials.

---

## Google Sheets Integration (via n8n)

The support and contact forms automatically send data to Google Sheets when configured:

1. Open your n8n instance at `https://rossan.app.n8n.cloud`
2. Create two webhook workflows:

**Workflow: nko-support**
- Webhook node: path `nko-support`, method POST
- Google Sheets node: append row to a "NKO_Support" sheet
  - Columns: timestamp | name | email | whatsapp | problem | type

**Workflow: nko-contact**
- Webhook node: path `nko-contact`, method POST
- Google Sheets node: append row to "NKO_Contact" sheet
  - Columns: timestamp | name | email | subject | message | type

3. Activate both workflows
4. Update `.env.local` with the webhook URLs

---

## Deploy to Vercel

### Quick Deploy
1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → "Add New Project"
3. Import your GitHub repository
4. Add all environment variables from `.env.example` in Vercel dashboard
5. Click Deploy

### Vercel CLI
```bash
npm install -g vercel
vercel
# Follow prompts, then add env vars in Vercel dashboard
```

---

## Project Structure

```
nko-university/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home/landing
│   ├── (public)/               # Public pages
│   │   ├── about/
│   │   ├── courses/
│   │   ├── faq/
│   │   ├── pricing/
│   │   ├── contact/
│   │   └── support/            # Student issue form
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── (learning)/
│   │   ├── placement-test/
│   │   ├── courses/[courseId]/
│   │   └── lessons/[lessonId]/
│   ├── dashboard/
│   ├── profile/
│   ├── admin/                  # Admin panel (role-protected)
│   └── api/                    # API routes
├── components/
│   ├── layout/                 # Navigation, Footer, LanguageSwitcher
│   └── lesson/                 # LessonContent, QuizSection, AiTutorChat, LessonSidebar
├── lib/
│   ├── supabase.ts            # Client-side Supabase
│   ├── supabase-server.ts     # Server-side Supabase
│   ├── ai.ts                  # OpenAI wrapper
│   ├── i18n.ts                # Translation system
│   ├── types.ts               # TypeScript interfaces
│   └── hooks/                 # React hooks
├── locales/                    # Translation files (en, fr, ar, pt, es, nko)
├── supabase/migrations/        # Database schema + seed data
└── .env.example
```

---

## Launch in 1 Hour Checklist

- [ ] `npm install` — Install dependencies
- [ ] Create Supabase project — Get URL + API keys
- [ ] Create `.env.local` — Fill in Supabase + OpenAI keys
- [ ] Run SQL migrations in Supabase — `001_schema.sql` then `002_seed.sql`
- [ ] `npm run dev` — Test locally at localhost:3000
- [ ] Sign up for an account → Set role to `admin` in Supabase
- [ ] Push to GitHub repository
- [ ] Import to Vercel → Add env vars → Deploy
- [ ] Create n8n webhooks for Google Sheets (optional)
- [ ] Set up SMTP email (optional but recommended)
- [ ] Test full flow: signup → lesson → quiz → AI tutor → support form
- [ ] **LIVE!** 🎉

---

## Database Tables

| Table | Purpose |
|-------|---------|
| `profiles` | User profiles (extends Supabase auth) |
| `courses` | Learning courses |
| `lessons` | Individual lessons with AI-generated content |
| `quiz_questions` | Quiz questions per lesson |
| `progress` | Student progress per lesson |
| `tutor_chats` | AI tutor conversation history |
| `support_submissions` | Contact/support form submissions |

---

## Supported Languages

| Code | Language | Direction |
|------|---------|-----------|
| `en` | English | LTR |
| `fr` | Français | LTR |
| `ar` | العربية | **RTL** |
| `pt` | Português | LTR |
| `es` | Español | LTR |
| `nko` | ߒߞߏ (N'Ko) | **RTL** |

---

## About N'Ko

The N'Ko script (ߒߞߏ) was created in 1949 by **Solomana Kante** in Guinea, West Africa. It is a phonetically precise alphabet for the Manding language family (Bambara, Dyula, Mandinka, Soninke). The name means "I say" in Manding. N'Ko is written right-to-left and is supported in Unicode (U+07C0–U+07FF).

---

## Contact

- Founder: Karlang Diate
- Email: kjaiteh9@gmail.com
- Platform: https://nkouniversity.vercel.app

---

*Built with ❤️ for African linguistic heritage preservation*
