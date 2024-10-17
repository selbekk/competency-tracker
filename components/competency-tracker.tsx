"use client";

import { ActivityDetailsModal } from "@/components/activity-details-modal";
import { ActivityItem } from "@/components/activity-item";
import { AddActivityForm } from "@/components/add-activity-form";
import { ProgressBar } from "@/components/progress-bar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { useState } from "react";

interface Activity {
  type: string;
  title: string;
  date: string;
  link?: string;
}

export function CompetencyTrackerComponent() {
  const [activities, setActivities] = useState<Activity[]>([
    {
      type: "book",
      title: "The Future of AI",
      date: "2023-06-15",
      link: "https://example.com/future-ai",
    },
    { type: "talk", title: "Quantum Computing Basics", date: "2023-06-10" },
    {
      type: "workshop",
      title: "Advanced Data Visualization",
      date: "2023-06-05",
      link: "https://example.com/data-viz",
    },
  ]);

  const [newActivity, setNewActivity] = useState<Activity>({
    type: "book",
    title: "",
    date: "",
    link: "",
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const suggestedActivities: Activity[] = [
    {
      type: "book",
      title: "Artificial Intelligence: A Modern Approach",
      date: "",
    },
    { type: "talk", title: "The Impact of Blockchain on Finance", date: "" },
    { type: "workshop", title: "Machine Learning with TensorFlow", date: "" },
    {
      type: "book",
      title: "Clean Code: A Handbook of Agile Software Craftsmanship",
      date: "",
    },
    { type: "talk", title: "Cybersecurity in the Age of IoT", date: "" },
  ];

  const addActivity = (e: React.FormEvent) => {
    e.preventDefault();
    setActivities([newActivity, ...activities]);
    setNewActivity({ type: "book", title: "", date: "", link: "" });
    setIsAddModalOpen(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center justify-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="w-full max-w-4xl bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-gray-700"
        variants={itemVariants}
      >
        <div className="p-8">
          <motion.h1
            className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
            variants={itemVariants}
          >
            Futuristic Competency Tracker
          </motion.h1>

          <motion.div className="space-y-6" variants={itemVariants}>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Recent Activities</h2>
              <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <PlusCircle className="w-4 h-4 mr-2" /> Add New Activity
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 text-white border-gray-700">
                  <DialogHeader>
                    <DialogTitle>Add New Activity</DialogTitle>
                  </DialogHeader>
                  <AddActivityForm
                    newActivity={newActivity}
                    setNewActivity={setNewActivity}
                    addActivity={addActivity}
                    setIsAddModalOpen={setIsAddModalOpen}
                  />
                </DialogContent>
              </Dialog>
            </div>
            <motion.div className="space-y-4" variants={containerVariants}>
              {activities.map((activity, index) => (
                <ActivityItem
                  key={index}
                  activity={activity}
                  onClick={() => {
                    setSelectedActivity(activity);
                    setIsDetailsModalOpen(true);
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          <motion.div className="mt-12" variants={itemVariants}>
            <h2 className="text-2xl font-semibold mb-4">Progress Overview</h2>
            <div className="bg-gray-700 bg-opacity-50 p-6 rounded-lg">
              <ProgressBar
                label="Books Read"
                current={5}
                total={10}
                color="blue"
              />
              <ProgressBar
                label="Talks Given"
                current={3}
                total={5}
                color="purple"
              />
              <ProgressBar
                label="Workshops Attended"
                current={2}
                total={8}
                color="green"
              />
            </div>
          </motion.div>

          <motion.div className="mt-12" variants={itemVariants}>
            <h2 className="text-2xl font-semibold mb-4">
              Suggested Activities
            </h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={containerVariants}
            >
              {suggestedActivities.map((activity, index) => (
                <ActivityItem
                  key={index}
                  activity={activity}
                  showAddButton
                  onAddClick={() => {
                    setNewActivity({
                      ...activity,
                      date: new Date().toISOString().split("T")[0],
                    });
                    setIsAddModalOpen(true);
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <ActivityDetailsModal
        isOpen={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
        activity={selectedActivity}
      />
    </motion.div>
  );
}
