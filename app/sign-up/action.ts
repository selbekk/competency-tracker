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
    switch (error?.code) {
      case "weak_password": {
        return {
          message: {
            email: "",
            password: "Password must be at least 8 characters long.",
          },
        };
      }
      case "user_already_exists":
      case "email_exists": {
        // We pretend the sign up was successful to prevent user enumeration
        return {
          message: {
            email: "",
            password: "",
          },
          success: true,
        };
      }
      default:
        return {
          message: {
            email: "",
            password: "Something went wrong",
          },
        };
    }
  }
  revalidatePath("/", "layout");
  return { message: { email: "", password: "" }, success: true };
}
