import { SignUpComponent } from "@/components/sign-up";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { signup } from "./action";

export default async function SignUpPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    redirect("/tracker");
  }
  return <SignUpComponent signup={signup} />;
}
