//src/lib/supabase/client.ts

import { createClient } from '@supabase/supabase-js';

let supabaseClient: ReturnType<typeof createClient> | null = null;

export function createSupabaseBrowserClient() {

  if (supabaseClient) { // Singleton pattern for at undgå flere goTrue klienter instansieret
    
    return supabaseClient;
  }

  supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: { persistSession: false }
    }
  );

  return supabaseClient;
}
