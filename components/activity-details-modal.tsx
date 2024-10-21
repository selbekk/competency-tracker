import { changeActivityStatus, deleteActivity } from "@/app/tracker/actions";
import { Activity } from "@/app/types/activity";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ActivityIcon } from "./activity-icon";
import { StatusBadge } from "./status-badge";
import { Button } from "./ui/button";

interface ActivityDetailsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  activity?: Activity | null;
}

export function ActivityDetailsModal({
  isOpen,
  onOpenChange,
  activity,
}: ActivityDetailsModalProps) {
  if (!activity) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800 text-white border-gray-700">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <ActivityIcon type={activity.type} className="w-6 h-6" />
            <span>{activity.title}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <StatusBadge status={activity.status} />
          <p>
            <strong>Type:</strong> {capitalizeFirstLetter(activity.type)}
          </p>
          <p>
            <strong>Description:</strong> {activity.description}
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {new Date(activity.created_at).toLocaleDateString()}
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
