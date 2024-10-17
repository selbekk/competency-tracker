import { SignInComponent } from "@/components/sign-in";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
import { login } from "./action";

export default async function SignInPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    redirect("/tracker");
  }
  return <SignInComponent login={login} />;
}
