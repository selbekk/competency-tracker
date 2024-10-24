"use client";

import { login } from "@/app/sign-in/action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { containerVariants, itemVariants } from "@/lib/animations";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { SubmitButton } from "./ui/submit-button";

export function SignInComponent() {
  const [state, formAction] = useFormState(login, {
    message: { email: "", password: "" },
  });
  return (
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
        <form className="space-y-6" action={formAction}>
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
                aria-invalid={state.message.email ? "true" : "false"}
              />
            </div>
            {state.message.email && (
              <p aria-live="polite" className="text-red-500 text-sm mt-1">
                {state.message.email}
              </p>
            )}
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
                aria-invalid={state.message.password ? "true" : "false"}
              />
            </div>
            {state.message.password && (
              <p aria-live="polite" className="text-red-500 text-sm mt-1">
                {state.message.password}
              </p>
            )}
          </motion.div>
          <motion.div variants={itemVariants}>
            <SubmitButton loadingText="Signing in…" className="w-full">
              Sign In
            </SubmitButton>
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
  );
}
