import { CompetencyTrackerComponent } from "@/components/competency-tracker";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AppPage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    console.log({ data, error });
    redirect("/sign-in");
  }
  console.log(data);
  return <CompetencyTrackerComponent />;
}
