import { CompetencyTrackerComponent } from "@/components/competency-tracker";
import { createClient } from "@/lib/supabase/server";
import { Activity } from "../types/activity";
import { getAuthenticatedUser } from "../utils/auth";

export default async function AppPage() {
  await getAuthenticatedUser();
  const activities = await getActivities();

  return <CompetencyTrackerComponent activities={activities} />;
}

async function getActivities(): Promise<Activity[]> {
  const supabase = await createClient();
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
