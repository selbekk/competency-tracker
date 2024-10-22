"use server";

import { UserProfileSchema } from "@/app/types/user";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getAuthenticatedUser } from "../../utils/auth";

export async function saveUserProfile(formData: FormData) {
  const user = await getAuthenticatedUser();
  const supabase = await createClient();

  const profileInput = {
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    occupation: formData.get("occupation"),
    industry: formData.get("industry"),
    years_of_experience: Number(formData.get("years_of_experience") ?? "0"),
    current_professional_role: formData.get("current_professional_role"),
    current_skills: formData.get("current_skills"),
    desired_skills: formData.get("desired_skills"),
    learning_style: formData.get("learning_style"),
    time_availability: formData.get("time_availability"),
  };

  try {
    const validatedProfile = UserProfileSchema.parse(profileInput);

    const { error } = await supabase
      .from("users")
      .update(validatedProfile)
      .eq("id", user.id)
      .select()
      .single();

    if (error) {
      console.error("Error saving user profile:", error);
      throw new Error("Failed to save user profile");
    }

    // Check if the user has completed the assessment
    const { data: assessmentData, error: assessmentError } = await supabase
      .from("assessments")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (assessmentError) {
      console.error("Error checking user assessment:", assessmentError);
      throw new Error("Failed to check user assessment");
    }

    if (assessmentData) {
      // User has completed the assessment, redirect to tracker
      redirect("/tracker");
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
