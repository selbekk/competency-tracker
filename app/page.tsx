"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { containerVariants, itemVariants } from "@/lib/animations";
import { motion } from "framer-motion";
import { BarChart, Book, Users, Zap } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.section className="text-center py-20" variants={itemVariants}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Elevate Your Skills to the Next Level
          </h1>
          <p className="text-xl mb-8 text-gray-300">
            Track, analyze, and accelerate your professional growth with our
            cutting-edge competency tracker.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/sign-up">
                Get Started
                <Zap className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
          </div>
        </motion.section>

        <motion.section className="py-20" variants={containerVariants}>
          <h2 className="text-3xl font-bold mb-12 text-center">
            Keep your professional growth going
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Book className="h-8 w-8 mb-4" />,
                title: "Smart Learning Paths",
                description: "AI-driven personalized learning recommendations",
              },
              {
                icon: <BarChart className="h-8 w-8 mb-4" />,
                title: "Real-time Analytics",
                description:
                  "Visualize your progress with interactive dashboards",
              },
              {
                icon: <Users className="h-8 w-8 mb-4" />,
                title: "Collaborative Growth",
                description: "Connect and learn from peers in your industry",
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg border-gray-700 hover:border-blue-500 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center text-white">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Testimonial Section */}
        <motion.section className="py-20" variants={itemVariants}>
          <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg border-gray-700 p-8">
            <CardContent>
              <blockquote className="text-xl italic text-center text-white">
                &quot;This competency tracker has revolutionized how I approach
                my professional development. It&apos;s like having a personal
                career coach!&quot;
              </blockquote>
              <p className="text-center mt-4 font-semibold text-white">
                - Kristofer Giltvedt Selbekk, Software Engineer
              </p>
            </CardContent>
          </Card>
        </motion.section>

        <motion.footer
          className="py-12 border-t border-gray-800"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>
                &copy; {new Date().getFullYear()} Competency Tracker. All rights
                reserved.
              </p>
            </div>
            <nav className="flex space-x-4">
              <Link href="/about" className="hover:text-blue-400">
                About
              </Link>
              <Link href="/contact" className="hover:text-blue-400">
                Contact
              </Link>
              <Link href="/privacy" className="hover:text-blue-400">
                Privacy Policy
              </Link>
            </nav>
          </div>
        </motion.footer>
      </motion.div>
    </div>
  );
}
