"use client";

import { saveUserProfile } from "@/app/profile/welcome/action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { containerVariants, itemVariants } from "@/lib/animations";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, User } from "lucide-react";
import { useFormState } from "react-dom";
import { SubmitButton } from "./ui/submit-button";

export function PersonalInfoComponent() {
  const [, formAction] = useFormState(saveUserProfile, null);
  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg border-gray-700">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-400">
            In order to get started, we need to know a little bit about you and
            what you do for a living.
          </p>
          <form className="space-y-6" action={formAction}>
            <motion.div variants={itemVariants}>
              <Label
                htmlFor="firstName"
                className="text-lg font-medium text-gray-300 flex items-center"
              >
                <User className="mr-2 h-5 w-5 text-blue-400" />
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                className="mt-2 bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your first name"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Label
                htmlFor="lastName"
                className="text-lg font-medium text-gray-300 flex items-center"
              >
                <User className="mr-2 h-5 w-5 text-purple-400" />
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                className="mt-2 bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your last name"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Label
                htmlFor="occupation"
                className="text-lg font-medium text-gray-300 flex items-center"
              >
                <Briefcase className="mr-2 h-5 w-5 text-green-400" />
                Occupation
              </Label>
              <Input
                id="occupation"
                name="occupation"
                className="mt-2 bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your occupation"
                required
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <SubmitButton loadingText="Saving…" className="w-full">
                Fill out assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </SubmitButton>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
