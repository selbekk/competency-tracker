"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function signup(prevState: unknown, formData: FormData) {
  const supabase = await createClient();

  const { error, data: signUpData } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error || !signUpData.user) {
    console.log(error);
    return { success: false };
  }
  revalidatePath("/", "layout");
  return { success: true };
}
