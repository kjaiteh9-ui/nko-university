-- ============================================================
-- NKO UNIVERSITY — DATABASE SCHEMA
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── Profiles (extends Supabase auth.users) ──────────────────
create table if not exists profiles (
  id                uuid references auth.users on delete cascade primary key,
  name              text,
  country           text,
  preferred_language text default 'en' check (preferred_language in ('en','fr','ar','pt','es','nko')),
  role              text default 'student' check (role in ('student','admin')),
  current_level     int default 1 check (current_level between 1 and 6),
  streak_days       int default 0,
  last_active_at    timestamptz,
  created_at        timestamptz default now()
);

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, name, preferred_language)
  values (
    new.id,
    new.raw_user_meta_data->>'name',
    coalesce(new.raw_user_meta_data->>'preferred_language', 'en')
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ── Courses ──────────────────────────────────────────────────
create table if not exists courses (
  id              uuid primary key default gen_random_uuid(),
  title           jsonb not null default '{"en": ""}',
  description     jsonb default '{"en": ""}',
  language_focus  text default 'nko',
  thumbnail_url   text,
  is_published    boolean default false,
  created_at      timestamptz default now()
);

-- ── Lessons ──────────────────────────────────────────────────
create table if not exists lessons (
  id                uuid primary key default gen_random_uuid(),
  course_id         uuid references courses(id) on delete cascade,
  level             int not null check (level between 1 and 6),
  order_index       int not null default 0,
  title             jsonb not null default '{"en": ""}',
  description       jsonb default '{"en": ""}',
  content_json      jsonb,
  estimated_minutes int default 15,
  is_published      boolean default false,
  created_at        timestamptz default now()
);

create index if not exists idx_lessons_course on lessons(course_id);
create index if not exists idx_lessons_level on lessons(level);

-- ── Quiz Questions ────────────────────────────────────────────
create table if not exists quiz_questions (
  id          uuid primary key default gen_random_uuid(),
  lesson_id   uuid references lessons(id) on delete cascade,
  type        text check (type in ('multiple_choice','true_false','fill_blank','matching')),
  prompt      jsonb not null default '{"en": ""}',
  options_json jsonb,
  answer_json jsonb not null,
  explanation jsonb,
  order_index int default 0
);

create index if not exists idx_quiz_lesson on quiz_questions(lesson_id);

-- ── Progress ──────────────────────────────────────────────────
create table if not exists progress (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references profiles(id) on delete cascade,
  lesson_id   uuid references lessons(id) on delete cascade,
  status      text default 'not_started' check (status in ('not_started','in_progress','completed')),
  score       int,
  attempts    int default 0,
  updated_at  timestamptz default now(),
  unique(user_id, lesson_id)
);

create index if not exists idx_progress_user on progress(user_id);

-- ── AI Tutor Conversations ────────────────────────────────────
create table if not exists tutor_chats (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references profiles(id) on delete cascade,
  lesson_id     uuid references lessons(id),
  messages_json jsonb default '[]',
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ── Support / Contact Submissions ────────────────────────────
create table if not exists support_submissions (
  id         uuid primary key default gen_random_uuid(),
  type       text check (type in ('support','contact')),
  name       text,
  email      text,
  whatsapp   text,
  subject    text,
  message    text not null,
  created_at timestamptz default now()
);

-- ── Row Level Security ────────────────────────────────────────
alter table profiles enable row level security;
alter table courses enable row level security;
alter table lessons enable row level security;
alter table quiz_questions enable row level security;
alter table progress enable row level security;
alter table tutor_chats enable row level security;
alter table support_submissions enable row level security;

-- Profiles: users can read/write their own
create policy "Users can view their own profile"
  on profiles for select using (auth.uid() = id);
create policy "Users can update their own profile"
  on profiles for update using (auth.uid() = id);

-- Admins can read all profiles
create policy "Admins can view all profiles"
  on profiles for select
  using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- Courses: everyone can read published, admins can CRUD
create policy "Published courses are public"
  on courses for select using (is_published = true);
create policy "Admins manage courses"
  on courses for all
  using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- Lessons: everyone can read published
create policy "Published lessons are public"
  on lessons for select using (is_published = true);
create policy "Admins manage lessons"
  on lessons for all
  using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- Quiz questions: same as lessons
create policy "Quiz questions for published lessons"
  on quiz_questions for select
  using (
    exists (select 1 from lessons where id = lesson_id and is_published = true)
  );
create policy "Admins manage quiz questions"
  on quiz_questions for all
  using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- Progress: own only
create policy "Users manage their own progress"
  on progress for all using (auth.uid() = user_id);

-- Tutor chats: own only
create policy "Users manage their own chats"
  on tutor_chats for all using (auth.uid() = user_id);

-- Support: insert only (service role reads)
create policy "Anyone can submit support"
  on support_submissions for insert with check (true);
