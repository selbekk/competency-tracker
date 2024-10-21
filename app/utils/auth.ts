import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/user";
import { redirect } from "next/navigation";

export async function getAuthenticatedUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/sign-in");
  }

  const userObject = await getUser();

  if (!userObject) {
    redirect("/sign-in");
  }

  return userObject;
}
