"use client";

import { saveAssessment } from "@/app/learning-assessment/action";
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
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Brain, Rocket, Target } from "lucide-react";

export function LearningAssessmentComponent() {
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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <motion.div
        className="w-full max-w-lg"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg border-gray-700">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Learning Assessment
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
                <Label
                  htmlFor="challenges"
                  className="text-lg font-medium text-gray-300 flex items-center"
                >
                  <Rocket className="mr-2 h-5 w-5 text-green-400" />
                  What are you struggling with?
                </Label>
                <Textarea
                  id="challenges"
                  name="challenges"
                  className="mt-2 bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe any challenges or specific areas you're finding difficult"
                  rows={4}
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button
                  formAction={saveAssessment}
                  className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                >
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
