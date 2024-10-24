import { LearningGoalsComponent } from "@/components/learning-goals";
import { getAuthenticatedUser } from "../utils/auth";

export default async function LearningAssessment() {
  await getAuthenticatedUser();

  return <LearningGoalsComponent />;
}
