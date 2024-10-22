import { FullProfileComponent } from "@/components/full-profile";
import { getAuthenticatedUser } from "../utils/auth";

export default async function ProfilePage() {
  const user = await getAuthenticatedUser();
  return <FullProfileComponent user={user} />;
}
