import { getAuthenticatedUser } from "@/app/utils/auth";
import { PersonalInfoComponent } from "@/components/personal-info";
import { redirect } from "next/navigation";

export default async function WelcomePage() {
  const user = await getAuthenticatedUser();
  if (user.first_name && user.last_name) {
    // If we have the user's name, we can redirect them to the tracker
    redirect("/tracker");
  }
  return <PersonalInfoComponent />;
}
