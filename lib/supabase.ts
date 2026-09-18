import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://whsmavzihqgnzrmygjdc.supabase.co';
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_BBh7OSR1xqA4cG9rIPyhmg_ztzjLpox';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// 1. Public Browser Client (Always safe, reads & uploads to public media)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 2. Secret Server Client (Kept strictly private on server only)
export const supabaseAdmin =
  typeof window === 'undefined' && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      })
    : (null as any);