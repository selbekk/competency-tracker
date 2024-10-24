"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/user";

export async function login(
  prevState: { message: { email: string; password: string } },
  formData: FormData
) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    switch (error.code) {
      case "email_not_confirmed": {
        return {
          message: {
            email: "Please confirm your email before signing in.",
            password: "",
          },
        };
      }
      case "invalid_credentials":
      case "user_not_found": {
        return {
          message: {
            email: "",
            password:
              "We couldn't find an account with that email and password.",
          },
        };
      }
      default:
        return { message: { email: "", password: "Something went wrong" } };
    }
  }

  const user = await getUser();
  if (!user) {
    return { message: { email: "", password: "Something went wrong" } };
  }

  if (user.first_name === null) {
    redirect("/profile/welcome");
  }

  revalidatePath("/", "layout");
  redirect("/tracker");
}
