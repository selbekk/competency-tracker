"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function forgotPassword(
  prevState: { error: string | null },
  formData: FormData
) {
  const email = formData.get("email") as string;

  if (!email) {
    return { error: "Email is required" };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/reset-password`,
  });

  if (error) {
    console.error("Error in forgotPassword:", error);
    return { error: "Failed to send reset password email" };
  }

  console.info(`Successfully sent reset password email to ${email}`);

  // Redirect to a confirmation page
  redirect("/forgot-password/confirmation");
}
