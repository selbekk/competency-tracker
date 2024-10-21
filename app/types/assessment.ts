import { z } from "zod";

export const AssessmentSchema = z.object({
  id: z.bigint(),
  created_at: z.string().datetime(),
  focus_area: z.string(),
  current_skill_level: z.string(),
  challenges: z.string(),
  user_id: z.string().uuid(),
});

export type Assessment = z.infer<typeof AssessmentSchema>;
