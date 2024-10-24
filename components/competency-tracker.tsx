"use client";

import type { Activity } from "@/app/types/activity";
import { ActivityDetailsModal } from "@/components/activity-details-modal";
import { ActivityItem } from "@/components/activity-item";
import { AddActivityForm } from "@/components/add-activity-form";
import { ProgressBar } from "@/components/progress-bar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSuggestedActivities } from "@/hooks/useSuggestedActivities";
import { containerVariants, itemVariants } from "@/lib/animations";
import { motion } from "framer-motion";
import { PlusCircle, RefreshCcwIcon, Zap } from "lucide-react";
import { useState } from "react";
import { SiteMenu } from "./site-menu";

type CompetencyTrackerComponentProps = {
  activities: Activity[];
};

export function CompetencyTrackerComponent({
  activities,
}: CompetencyTrackerComponentProps) {
  const [openModal, setOpenModal] = useState<"add" | "details" | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const { suggestedActivities, isGeneratingSuggestions, generateSuggestions } =
    useSuggestedActivities(activities);

  return (
    <motion.div
      className="w-full"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="w-full max-w-4xl mx-auto bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-gray-700 relative"
        variants={itemVariants}
      >
        <SiteMenu />
        <div className="p-4 md:p-8">
          <motion.h1
            className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
            variants={itemVariants}
          >
            Competency Tracker
          </motion.h1>

          <motion.div className="space-y-6" variants={itemVariants}>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Recent Activities</h2>
              <Dialog
                open={openModal === "add"}
                onOpenChange={(open) => setOpenModal(open ? "add" : null)}
              >
                <DialogTrigger asChild>
                  <Button onClick={() => setSelectedActivity(undefined)}>
                    <PlusCircle className="w-4 h-4 mr-2" /> Add New Activity
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 text-white border-gray-700">
                  <DialogHeader>
                    <DialogTitle>Add New Activity</DialogTitle>
                    <DialogDescription>
                      Track a new activity that you want to do, are working on,
                      or have completed.
                    </DialogDescription>
                  </DialogHeader>
                  <AddActivityForm
                    setIsAddModalOpen={() => setOpenModal(null)}
                    prefillActivity={selectedActivity}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <motion.div className="space-y-4" variants={containerVariants}>
              {activities.length === 0 && (
                <div className="text-center py-12">
                  <Zap className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    No activity yet
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Start tracking your competencies to see your progress here.
                  </p>
                  <Button
                    onClick={() => {
                      setOpenModal("add");
                    }}
                  >
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Add New Activity
                  </Button>
                </div>
              )}
              {activities
                .filter((activity) => activity.status !== "completed")
                .map((activity) => (
                  <ActivityItem
                    key={activity.id}
                    activity={activity}
                    onClick={() => {
                      setSelectedActivity(activity);
                      setOpenModal("details");
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
                current={
                  activities.filter(
                    (activity) =>
                      activity.type === "book" &&
                      activity.status === "completed"
                  ).length
                }
                total={10}
              />
              <ProgressBar
                label="Talks Seen"
                current={
                  activities.filter(
                    (activity) =>
                      activity.type === "video" &&
                      activity.status === "completed"
                  ).length
                }
                total={5}
              />
              <ProgressBar
                label="Podcasts Listened"
                current={
                  activities.filter(
                    (activity) =>
                      activity.type === "podcast" &&
                      activity.status === "completed"
                  ).length
                }
                total={5}
              />
            </div>
          </motion.div>

          <motion.div className="mt-12" variants={itemVariants}>
            <h2 className="text-2xl font-semibold mb-4">
              Suggested Activities{" "}
              {suggestedActivities.length > 0 && (
                <Button onClick={generateSuggestions} variant="ghost">
                  <RefreshCcwIcon />
                </Button>
              )}
            </h2>
            {isGeneratingSuggestions ? (
              <p className="text-center">Generating suggestions…</p>
            ) : (
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
                      setSelectedActivity(activity);
                      setOpenModal("add");
                    }}
                  />
                ))}
              </motion.div>
            )}
            {!isGeneratingSuggestions && suggestedActivities.length === 0 && (
              <div className="text-center py-12 mx-auto">
                <Zap className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold mb-4">
                  We don&apos;t have any suggested activities right now.
                </h3>
                <Button onClick={generateSuggestions}>
                  Generate Suggestions
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

      <ActivityDetailsModal
        isOpen={openModal === "details"}
        onOpenChange={(open) => setOpenModal(open ? "details" : null)}
        activity={selectedActivity}
      />
    </motion.div>
  );
}
