import { CompetencyTrackerComponent } from "@/components/competency-tracker";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Activity } from "../types/activity";

export default async function AppPage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/sign-in");
  }

  const activities = await getActivities();

  return <CompetencyTrackerComponent activities={activities} />;
}

async function getActivities(): Promise<Activity[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching activities:", error);
    return [];
  }

  return data as Activity[];
}
