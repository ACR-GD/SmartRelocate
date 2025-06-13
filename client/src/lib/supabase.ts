import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Use server environment variables for client-side Supabase connection
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || window.location.origin + '/api/supabase-config';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'temp-key';

// Client-side Supabase client for browser operations
export const supabase: SupabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

export default supabase;