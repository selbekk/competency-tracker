"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { containerVariants, itemVariants } from "@/lib/animations";
import { motion } from "framer-motion";
import { Lock, LogIn, Mail } from "lucide-react";
import Link from "next/link";

type SignInComponentProps = {
  login: (formData: FormData) => Promise<void>;
};

export function SignInComponent({ login }: SignInComponentProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-gray-700 p-8"
          variants={itemVariants}
        >
          <motion.h1
            className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
            variants={itemVariants}
          >
            Sign In
          </motion.h1>
          <form className="space-y-6">
            <motion.div variants={itemVariants}>
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-300"
              >
                Email
              </Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  className="bg-gray-700 border-gray-600 text-white pl-10 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-300"
              >
                Password
              </Label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  className="bg-gray-700 border-gray-600 text-white pl-10 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md"
                  required
                />
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button formAction={login} className="w-full">
                Sign In
                <LogIn className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </form>
          <motion.div
            className="mt-6 text-center text-sm"
            variants={itemVariants}
          >
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Sign up
            </Link>
          </motion.div>
          <motion.div
            className="mt-2 text-center text-sm"
            variants={itemVariants}
          >
            <Link
              href="/forgot-password"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Forgot your password?
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
