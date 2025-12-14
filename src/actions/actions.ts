//src/actions/actions.ts

'use server';

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache"; // <-- Importér revalidatePath nøglen til opdatering af UI efter en action


interface NameData {

  id?: number; // ID er valgfrit ved indsættelse, men nødvendigt ved opdatering/sletning
  name: string;
  lastname: string;
}

export async function addName(formData: FormData): Promise<void> {

  const supabase = createSupabaseServerClient();

  const newData: NameData = {
    name: formData.get("name") as string,
    lastname: formData.get("lastname") as string
  };

  validateNameData(newData);

  const { data, error } = await supabase
    .from("testarea")
    .insert(newData);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");

}

//** OPdater data */

export async function updateName(id: number, formData: FormData): Promise<void> {

  const supabase = createSupabaseServerClient();

  if (isNaN(id) || id < 1) {
    throw new Error("Ugyldigt ID angivet for opdatering.");
  }

  const newUpdatedData: NameData = {
    name: formData.get("name") as string,
    lastname: formData.get("lastname") as string
  };

  validateNameData(newUpdatedData);

  const { error } = await supabase
    .from("testarea")
    .update(newUpdatedData)
    .eq('id', id); // Brug det bundne ID her!

  if (error) {
    console.error("UPDATE error:", error);
    throw new Error(error.message);
  }


  revalidatePath("/");

}



function validateNameData(data: NameData): void {

  if (!data.name || data.name.trim().length === 0) {
    throw new Error("Fornavn skal udfyldes.");
  }

  if (!data.lastname || data.lastname.trim().length === 0) {
    throw new Error("Efternavn skal udfyldes.");
  }

}
