import { changeActivityStatus, deleteActivity } from "@/app/tracker/actions";
import { Activity } from "@/app/types/activity";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ActivityIcon } from "./activity-icon";
import { StatusBadge } from "./status-badge";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface ActivityDetailsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  activity?: Activity | null;
}

function getRelativeTimeInfo(date: Date): {
  value: number;
  unit: Intl.RelativeTimeFormatUnit;
} {
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 60) {
    return { value: -diffInMinutes, unit: "minutes" };
  } else if (diffInMinutes < 24 * 60) {
    return { value: -Math.floor(diffInMinutes / 60), unit: "hours" };
  } else if (diffInMinutes < 7 * 24 * 60) {
    return { value: -Math.floor(diffInMinutes / (24 * 60)), unit: "days" };
  } else {
    return { value: -Math.floor(diffInMinutes / (7 * 24 * 60)), unit: "weeks" };
  }
}

export function ActivityDetailsModal({
  isOpen,
  onOpenChange,
  activity,
}: ActivityDetailsModalProps) {
  if (!activity) {
    return null;
  }

  const rtf = new Intl.RelativeTimeFormat("en", {
    numeric: "always",
    style: "long",
  });

  const createdAtDate = new Date(activity.created_at);
  const { value, unit } = getRelativeTimeInfo(createdAtDate);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ActivityIcon type={activity.type} className="w-6 h-6" />
            <span>{activity.title}</span>
          </DialogTitle>
          <DialogDescription>{activity.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <StatusBadge status={activity.status} />
          <Badge variant="gray">{capitalizeFirstLetter(activity.type)}</Badge>
          <p>
            <strong>Added</strong> {rtf.format(value, unit)}
          </p>
          {activity.link && (
            <p>
              <strong>Link:</strong>{" "}
              <a
                href={activity.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                {activity.link}
              </a>
            </p>
          )}
          <div className="flex justify-end gap-4">
            {activity.status === "not_started" ? (
              <Button
                onClick={() => changeActivityStatus(activity.id, "in_progress")}
              >
                Mark as In Progress
              </Button>
            ) : activity.status === "in_progress" ? (
              <Button
                onClick={() => changeActivityStatus(activity.id, "completed")}
              >
                Mark as Completed
              </Button>
            ) : null}
            <Button
              variant="destructive"
              onClick={() => {
                deleteActivity(activity.id);
                onOpenChange(false);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
