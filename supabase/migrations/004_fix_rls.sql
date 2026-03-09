-- ============================================================
-- FIX: Infinite recursion in RLS policies
-- Run this in Supabase SQL Editor
-- ============================================================

-- 1. Create a SECURITY DEFINER helper that checks admin role
--    without triggering RLS (runs as postgres, bypasses policies)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE SET search_path = public;

-- 2. Drop the broken recursive policy on profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;

-- 3. Re-create it using the helper (no more recursion)
CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (public.is_admin());

-- 4. Fix admin policies on other tables to use the helper too
DROP POLICY IF EXISTS "Admins manage courses" ON courses;
CREATE POLICY "Admins manage courses"
  ON courses FOR ALL
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins manage lessons" ON lessons;
CREATE POLICY "Admins manage lessons"
  ON lessons FOR ALL
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins manage quiz questions" ON quiz_questions;
CREATE POLICY "Admins manage quiz questions"
  ON quiz_questions FOR ALL
  USING (public.is_admin());

-- 5. Grant anon and authenticated users access to read published content
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.courses TO anon, authenticated;
GRANT SELECT ON public.lessons TO anon, authenticated;
GRANT SELECT ON public.quiz_questions TO anon, authenticated;
GRANT SELECT ON public.profiles TO authenticated;
GRANT ALL ON public.progress TO authenticated;
GRANT ALL ON public.tutor_chats TO authenticated;
GRANT INSERT ON public.support_submissions TO anon, authenticated;
