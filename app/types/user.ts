import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().uuid(),
  first_name: z.string().nullable(),
  last_name: z.string().nullable(),
  occupation: z.string().nullable(),
  points: z.number().int().nonnegative(),
});

export type User = z.infer<typeof UserSchema>;
