import { createClient } from "@supabase/supabase-js";

// Retrieve environment variables if provided in Vercel or local .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://dummy-jimaa-hararge.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "dummy-anon-key";

export const isSupabaseConfigured = Boolean(
  import.meta.env.VITE_SUPABASE_URL && 
  import.meta.env.VITE_SUPABASE_ANON_KEY &&
  !import.meta.env.VITE_SUPABASE_URL.includes("dummy")
);

// Standard Supabase client export as specified in product configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});
