import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qqygqderrewsjvoeoqww.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key-for-builds";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
  global: {
    fetch: (url, options) =>
      fetch(url, {
        ...options,
        cache: "no-store",
      }),
  },
});
