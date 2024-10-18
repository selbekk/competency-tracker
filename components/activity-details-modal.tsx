import { Activity } from "@/app/types/activity";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ActivityIcon } from "./activity-icon";

interface ActivityDetailsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  activity: Activity | null;
}

export function ActivityDetailsModal({
  isOpen,
  onOpenChange,
  activity,
}: ActivityDetailsModalProps) {
  if (!activity) return null;

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
        </div>
      </DialogContent>
    </Dialog>
  );
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
