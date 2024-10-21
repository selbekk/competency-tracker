import { z } from "zod";

export const ActivitySchema = z.object({
  id: z.number(),
  type: z.enum(["book", "video", "article", "course", "podcast", "other"]),
  title: z.string(),
  description: z.string(),
  created_at: z.string(),
  status: z.enum(["completed", "in_progress", "not_started"]),
  link: z.string().url().optional(),
});

export type Activity = z.infer<typeof ActivitySchema>;
