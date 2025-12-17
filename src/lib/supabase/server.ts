//src/lib/supabase/server.ts

import { createClient } from '@supabase/supabase-js';

export function createSupabaseServerClient() {


  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, // <-- Ændret her
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // må kun køres på serveren ikke i browseren
    {
      auth: { persistSession: false }// sikrer at sessioner ikke gemmes i browserens local storage
    }
  );

}
