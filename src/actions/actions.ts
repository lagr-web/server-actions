//src/actions/actions.ts

'use server';

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache"; // <-- Importér revalidatePath nøglen til opdatering af UI efter en action
import { z } from 'zod';

interface NameData {

  id?: number; // ID er valgfrit ved indsættelse, men nødvendigt ved opdatering/sletning
  name: string;
  lastname: string;
}

const NameSchema = z.object({
  name: z.string().trim().min(1, { message: "Fornavn skal udfyldes." }),
  lastname: z.string().trim().min(1, { message: "Efternavn skal udfyldes." }),
});


export async function addName(formData: FormData): Promise<void> {

  const supabase = createSupabaseServerClient();


  const validatedFields = NameSchema.safeParse({
    name: formData.get("name"),
    lastname: formData.get("lastname")
  });

  if (!validatedFields.success) {
    throw new Error("Venligst udfyld alle felter korrekt.");
  }


  const { data, error } = await supabase
    .from("testarea")
    .insert(validatedFields.data);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/"); // <-- Revalidér roden for at opdatere UI'et efter indsættelse

}

//** OPdater data */

export async function updateName(id: number, formData: FormData): Promise<void> {

  const supabase = createSupabaseServerClient();

  if (isNaN(id) || id < 1) {
    throw new Error("Ugyldigt ID angivet for opdatering.");
  }


  const validatedFields = NameSchema.safeParse({
    name: formData.get("name"),
    lastname: formData.get("lastname")
  });

  if (!validatedFields.success) {
    throw new Error("Venligst udfyld alle felter korrekt.");
  }

  /*   const newUpdatedData: NameData = {
      name: formData.get("name") as string,
      lastname: formData.get("lastname") as string
    }; */


  const { error } = await supabase
    .from("testarea")
    .update(validatedFields.data)
    .eq('id', id); // Brug det bundne ID her!

  if (error) {
    console.error("UPDATE error:", error);
    throw new Error(error.message);
  }


  revalidatePath("/");

}

export async function deleteName(id: number): Promise<void> {

  const supabase = createSupabaseServerClient();

  if (isNaN(id) || id < 1) {
    throw new Error("Ugyldigt ID angivet for sletning.");
  }

  const { error } = await supabase
    .from("testarea")
    .delete()
    .eq('id', id); // Brug det bundne ID her!   
  if (error) {
    console.error("DELETE error:", error);
    throw new Error(error.message);
  }

  revalidatePath("/");

}


/* function validateNameData(data: NameData): void {

  if (!data.name || data.name.trim().length === 0) {
    throw new Error("Fornavn skal udfyldes.");
  }

  if (!data.lastname || data.lastname.trim().length === 0) {
    throw new Error("Efternavn skal udfyldes.");
  }

} */
