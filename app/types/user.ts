import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().uuid(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  occupation: z.string().nullable(),
  industry: z.string().nullable(),
  years_of_experience: z.number().nullable(),
  current_professional_role: z.string().nullable(),
  current_skills: z.string().nullable(),
  desired_skills: z.string().nullable(),
  learning_style: z.string().nullable(),
  time_availability: z.string().nullable(),
  points: z.number().int().nonnegative(),
});

export type User = z.infer<typeof UserSchema>;

export const UserProfileSchema = UserSchema.omit({
  id: true,
  points: true,
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
