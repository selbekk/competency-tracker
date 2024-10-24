"use client";

import { forgotPassword } from "@/app/forgot-password/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { containerVariants, itemVariants } from "@/lib/animations";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

export default function ForgotPassword() {
  const [state, formAction] = useFormState(forgotPassword, { error: "" });
  return (
    <div>
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
            Forgot your password?
          </motion.h1>
          <motion.p
            className="text-center text-gray-300 mb-6"
            variants={itemVariants}
          >
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </motion.p>
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
                  name="email"
                  id="email"
                  className="bg-gray-700 border-gray-600 text-white pl-10 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md"
                  placeholder="you@example.com"
                  required
                  aria-invalid={state.error ? "true" : "false"}
                />
              </div>
              {state.error && (
                <p aria-live="polite" className="text-red-500 text-sm mt-1">
                  {state.error}
                </p>
              )}
            </motion.div>
            <motion.div variants={itemVariants}>
              <SubmitButton />
            </motion.div>
          </form>
          <motion.div
            className="mt-6 text-center text-sm"
            variants={itemVariants}
          >
            Remember your password?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Sign in
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Resetting..." : "Reset Password"}
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  );
}
