"use server";

import { Activity, ActivitySchema } from "@/app/types/activity";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addActivity(formData: FormData) {
  const rawData = {
    id: 0, // This will be assigned by the database
    type: formData.get("type"),
    title: formData.get("title"),
    description: formData.get("description") || "",
    created_at: new Date().toISOString(),
    status: formData.get("status"),
    link: formData.get("link") || undefined,
  };

  const parsedData = ActivitySchema.omit({ id: true }).safeParse(rawData);

  if (!parsedData.success) {
    console.error("Validation error:", parsedData.error);
    return { error: parsedData.error.errors[0].message };
  }

  const { type, title, description, status, link } = parsedData.data;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("activities")
    .insert([
      {
        type,
        title,
        description,
        status,
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

export async function changeActivityStatus(
  activityId: number,
  newStatus: Activity["status"]
) {
  const supabase = await createClient();

  // Validate the new status
  const validStatus = ActivitySchema.shape.status.safeParse(newStatus);
  if (!validStatus.success) {
    console.error("Invalid status:", validStatus.error);
    return { error: "Invalid status provided" };
  }

  const { data, error } = await supabase
    .from("activities")
    .update({ status: newStatus })
    .eq("id", activityId)
    .select();

  if (error) {
    console.error("Error updating activity status:", error);
    return { error: error.message };
  }

  // Force a hard revalidation
  revalidatePath("/tracker", "layout");

  return { success: true, data };
}

export async function deleteActivity(activityId: number) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("activities")
    .delete()
    .eq("id", activityId);

  if (error) {
    console.error("Error deleting activity:", error);
    return { error: error.message };
  }

  revalidatePath("/tracker");
  return { success: true };
}
