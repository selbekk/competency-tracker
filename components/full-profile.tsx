"use client";

import { saveUserProfile } from "@/app/profile/welcome/action";
import { User as UserType } from "@/app/types/user";
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
import { containerVariants, itemVariants } from "@/lib/animations";
import { motion } from "framer-motion";
import { Book, Briefcase, Code, User } from "lucide-react";
import { useFormState } from "react-dom";
import { SiteMenu } from "./site-menu";
import { SubmitButton } from "./ui/submit-button";
type FullProfileComponentProps = {
  user: UserType;
};

export function FullProfileComponent({ user }: FullProfileComponentProps) {
  const [, formAction] = useFormState(saveUserProfile, null);
  return (
    <motion.div
      className=" w-full max-w-4xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg border-gray-700 relative">
        <SiteMenu />
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6 text-white" action={formAction}>
            <motion.div variants={itemVariants}>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <User className="mr-2 h-5 w-5 text-blue-400" />
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    defaultValue={user.first_name ?? undefined}
                    className="mt-1 bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    defaultValue={user.last_name ?? undefined}
                    className="mt-1 bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                  id="occupation"
                  name="occupation"
                  defaultValue={user.occupation ?? undefined}
                  className="mt-1 bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Briefcase className="mr-2 h-5 w-5 text-purple-400" />
                Professional Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    name="industry"
                    defaultValue={user.industry ?? undefined}
                    className="mt-1 bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="years_of_experience">
                    Years of Experience
                  </Label>
                  <Input
                    id="years_of_experience"
                    name="years_of_experience"
                    type="number"
                    defaultValue={user.years_of_experience ?? undefined}
                    className="mt-1 bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Code className="mr-2 h-5 w-5 text-green-400" />
                Skills and Interests
              </h2>
              <div>
                <Label htmlFor="current_skills">Current Skills</Label>
                <Textarea
                  id="current_skills"
                  name="current_skills"
                  defaultValue={user.current_skills ?? undefined}
                  className="mt-1 bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              <div className="mt-4">
                <Label htmlFor="desired_skills">Desired Skills</Label>
                <Textarea
                  id="desired_skills"
                  name="desired_skills"
                  defaultValue={user.desired_skills ?? undefined}
                  className="mt-1 bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Book className="mr-2 h-5 w-5 text-yellow-400" />
                Learning Preferences
              </h2>
              <div>
                <Label htmlFor="learning_style">Preferred Learning Style</Label>
                <Select
                  name="learning_style"
                  defaultValue={user.learning_style ?? undefined}
                >
                  <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select your learning style" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600 text-white">
                    <SelectItem value="visual">Visual</SelectItem>
                    <SelectItem value="auditory">Auditory</SelectItem>
                    <SelectItem value="reading">Reading/Writing</SelectItem>
                    <SelectItem value="kinesthetic">Kinesthetic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-4">
                <Label htmlFor="time_availability">Time Availability</Label>
                <Select
                  name="time_availability"
                  defaultValue={user.time_availability ?? undefined}
                >
                  <SelectTrigger className="mt-1 bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select your time availability" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600 text-white">
                    <SelectItem value="0-2">0-2 hours per week</SelectItem>
                    <SelectItem value="2-5">2-5 hours per week</SelectItem>
                    <SelectItem value="5-10">5-10 hours per week</SelectItem>
                    <SelectItem value="10+">10+ hours per week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex justify-end">
              <SubmitButton loadingText="Saving…">Save Profile</SubmitButton>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
