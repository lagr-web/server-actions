
//src/app/page.tsx
import { addName } from "@/actions/actions";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import DataWrapper from "@/app/components/DataWrapper";


export default async function Home() {

  const supabase = createSupabaseServerClient();

//await new Promise(resolve => setTimeout(resolve, 3000)); 

  const { data } = await supabase
    .from("testarea")
    .select("*")
    .order("id", { ascending: false });


  return (

    <>
 
        <DataWrapper initialData={data || []} />
      
    </>

  );
}
