"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/user";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log(error);
    redirect("/error");
  }

  const user = await getUser();
  if (!user) {
    console.error("Could not find the database user");
    redirect("/error");
  }

  if (user.first_name === null) {
    redirect("/profile/welcome");
  }

  revalidatePath("/", "layout");
  redirect("/tracker");
}
