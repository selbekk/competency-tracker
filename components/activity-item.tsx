import { Activity } from "@/app/types/activity";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { ActivityIcon } from "./activity-icon";
import { StatusBadge } from "./status-badge";
import { Button } from "./ui/button";

interface ActivityItemProps {
  activity: Activity;
  onClick?: () => void;
  showAddButton?: boolean;
  onAddClick?: () => void;
}

export function ActivityItem({
  activity,
  onClick,
  showAddButton,
  onAddClick,
}: ActivityItemProps) {
  return (
    <motion.div
      className="bg-gray-700 bg-opacity-50 p-4 rounded-lg flex items-center justify-between cursor-pointer hover:bg-opacity-70 transition-all"
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
    >
      <div className="flex flex-col items-start justify-between w-full gap-2 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <ActivityIcon type={activity.type} className="w-6 h-6" />
          <div>
            <h3 className="font-semibold">{activity.title}</h3>
            <p className="text-sm text-gray-400">
              {activity.created_at &&
                new Date(activity.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        {activity.status && (
          <StatusBadge status={activity.status} variant="secondary" />
        )}
      </div>
      {showAddButton && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onAddClick?.();
          }}
          className="bg-blue-600 hover:bg-blue-700 ml-4"
        >
          <PlusCircle className="w-4 h-4 mr-2" /> Add
        </Button>
      )}
    </motion.div>
  );
}
