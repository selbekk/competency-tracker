import { LearningAssessmentComponent } from "@/components/learning-assessment";
import { getAuthenticatedUser } from "../utils/auth";

export default async function LearningAssessment() {
  await getAuthenticatedUser();

  return <LearningAssessmentComponent />;
}
