"use client";

import { signup } from "@/app/sign-up/action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { containerVariants, itemVariants } from "@/lib/animations";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { Button } from "./ui/button";
import { SubmitButton } from "./ui/submit-button";

export function SignUpComponent() {
  const [state, formAction] = useFormState(signup, {
    message: { email: "", password: "" },
    success: false,
  });

  return (
    <>
      <motion.div
        className="w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-gray-700 p-8 w-full"
          variants={itemVariants}
        >
          {state?.success ? (
            <motion.div className="text-center" variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-4">Sign Up Successful!</h2>
              <p className="text-gray-300 mb-4">
                Please check your email for a confirmation link. If the user
                already exists, you&apos;ll get a link to reset your password.
              </p>
              <Button asChild>
                <Link href="/">Go to front page</Link>
              </Button>
            </motion.div>
          ) : (
            <>
              <motion.h1
                className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
                variants={itemVariants}
              >
                Sign Up
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
                  <SubmitButton loadingText="Signing up…" className="w-full">
                    Sign up
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </SubmitButton>
                </motion.div>
              </form>
              <motion.div
                className="mt-6 text-center text-sm"
                variants={itemVariants}
              >
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-medium text-blue-400 hover:text-blue-300"
                >
                  Sign in
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
            </>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
