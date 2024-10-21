"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { AssessmentSchema } from "../types/assessment";
import { getAuthenticatedUser } from "../utils/auth";

export async function saveAssessment(formData: FormData) {
  const user = await getAuthenticatedUser();
  const supabase = await createClient();

  const assessmentInput = {
    focus_area: formData.get("focusArea"),
    current_skill_level: formData.get("currentSkillLevel"),
    challenges: formData.get("challenges"),
    user_id: user.id,
    created_at: new Date().toISOString(),
  };

  try {
    const validatedAssessment = AssessmentSchema.omit({ id: true }).parse(
      assessmentInput
    );

    const { error } = await supabase
      .from("assessments")
      .insert(validatedAssessment)
      .select()
      .single();

    if (error) {
      console.error("Error saving assessment:", error);
      throw new Error("Failed to save assessment");
    }

    redirect("/tracker");
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
      throw new Error("Invalid assessment data");
    }
    throw error;
  }
}
