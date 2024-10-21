"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getAuthenticatedUser } from "../../utils/auth";

const UserProfileSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  occupation: z.string().min(1),
});

export async function saveUserProfile(formData: FormData) {
  const user = await getAuthenticatedUser();
  const supabase = await createClient();

  const profileInput = {
    first_name: formData.get("firstName"),
    last_name: formData.get("lastName"),
    occupation: formData.get("occupation"),
  };

  try {
    const validatedProfile = UserProfileSchema.parse(profileInput);

    const { error } = await supabase
      .from("users")
      .update({
        first_name: validatedProfile.first_name,
        last_name: validatedProfile.last_name,
        occupation: validatedProfile.occupation,
      })
      .eq("id", user.id)
      .select()
      .single();

    if (error) {
      console.error("Error saving user profile:", error);
      throw new Error("Failed to save user profile");
    }

    redirect("/learning-assessment");
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
      throw new Error("Invalid user profile data");
    }
    throw error;
  }
}
