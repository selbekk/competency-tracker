"use client";

import { saveAssessment } from "@/app/learning-goals/action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { containerVariants, itemVariants } from "@/lib/animations";
import { motion } from "framer-motion";
import { Brain, Target } from "lucide-react";

export function LearningGoalsComponent() {
  return (
    <div>
      <motion.div
        className="w-full max-w-lg"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg border-gray-700">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Learning goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-400 mb-4">
              In order to get the most out of your learning, we need to know a
              little bit about you, and what you want to learn.
            </p>
            <form className="space-y-8">
              <motion.div variants={itemVariants}>
                <Label
                  htmlFor="focusArea"
                  className="text-lg font-medium text-gray-300 flex items-center"
                >
                  <Target className="mr-2 h-5 w-5 text-blue-400" />
                  What do you want to learn?
                </Label>
                <Input
                  id="focusArea"
                  name="focusArea"
                  className="mt-2 bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Machine Learning, Web Development, Data Science"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Label
                  htmlFor="skillLevel"
                  className="text-lg font-medium text-gray-300 flex items-center"
                >
                  <Brain className="mr-2 h-5 w-5 text-purple-400" />
                  What&apos;s your current skill level?
                </Label>
                <Select name="currentSkillLevel">
                  <SelectTrigger className="mt-2 bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500">
                    <SelectValue placeholder="Select your skill level" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600 text-white">
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button formAction={saveAssessment} className="w-full">
                  Submit Assessment
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
