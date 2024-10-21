"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addActivity(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as
    | "book"
    | "article"
    | "video"
    | "workshop"
    | "other";
  const link = formData.get("link") as string | null;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("activities")
    .insert([
      {
        title,
        description,
        type,
        link,
        user_id: (await supabase.auth.getUser()).data.user?.id,
      },
    ])
    .select();

  if (error) {
    console.error("Error adding activity:", error);
    return { error: error.message };
  }

  revalidatePath("/tracker");
  return { success: true, data };
}
