"use client";

import { signup } from "@/app/sign-up/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export function SignUpComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const [state, formAction] = useFormState(signup, { success: false });
  const formStatus = useFormStatus();

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
          {state.success ? (
            <motion.div className="text-center" variants={itemVariants}>
              <h2 className="text-2xl font-bold mb-4">Sign Up Successful!</h2>
              <p className="text-gray-300">
                Please check your email for a confirmation link.
              </p>
            </motion.div>
          ) : (
            <>
              <motion.h1
                className="text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
                variants={itemVariants}
              >
                Sign Up
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white pl-10 focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Button
                    disabled={formStatus.pending}
                    formAction={formAction}
                    className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                  >
                    {formStatus.pending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing up…
                      </>
                    ) : (
                      <>
                        Sign up
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
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
    </div>
  );
}
