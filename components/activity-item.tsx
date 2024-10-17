import { Activity } from "@/app/types/activity";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { ActivityIcon } from "./activity-icon";
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
      <div className="flex items-center space-x-4">
        <ActivityIcon type={activity.type} className="w-6 h-6" />
        <div>
          <h3 className="font-semibold">{activity.title}</h3>
          <p className="text-sm text-gray-400">
            {new Date(activity.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
      {showAddButton && (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onAddClick?.();
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <PlusCircle className="w-4 h-4 mr-2" /> Add
        </Button>
      )}
    </motion.div>
  );
}
