import { Activity } from "@/app/types/activity";
import { Badge } from "./ui/badge";

interface StatusBadgeProps {
  status: Activity["status"];
  variant?: "default" | "secondary" | "destructive" | "outline";
}

const statusTexts: Record<Activity["status"], string> = {
  completed: "Completed",
  in_progress: "In Progress",
  not_started: "Not Started",
};

export function StatusBadge({ status, variant = "default" }: StatusBadgeProps) {
  return <Badge variant={variant}>{statusTexts[status]}</Badge>;
}
