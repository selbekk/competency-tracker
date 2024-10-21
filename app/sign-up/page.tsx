import { SignUpComponent } from "@/components/sign-up";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    redirect("/tracker");
  }
  return <SignUpComponent />;
}
