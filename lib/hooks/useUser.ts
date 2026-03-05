'use client';

import { useState, useEffect } from 'react';
import { getSupabase } from '@/lib/supabase';
import type { Profile } from '@/lib/types';
import type { User } from '@supabase/supabase-js';

interface UseUserReturn {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  isAdmin: boolean;
}

export function useUser(): UseUserReturn {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabase();

    async function load(userId: string) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      setProfile(data);
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) load(session.user.id).finally(() => setIsLoading(false));
      else setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) load(session.user.id);
      else setProfile(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    user,
    profile,
    isLoading,
    isAdmin: profile?.role === 'admin',
  };
}
