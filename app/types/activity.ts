export type Activity = {
  id: number;
  type: "book" | "video" | "article" | "course" | "podcast" | "blog" | "other";
  title: string;
  description: string;
  created_at: string;
  link?: string;
};
