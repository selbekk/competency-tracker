"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { createClient } from "@/lib/supabase/client";
import { FileText, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Menu() {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/");
  };

  return (
    <>
      <Sheet>
        <SheetTrigger
          className="fixed top-4 right-4 z-50 p-2"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-0.5 bg-white mb-1.5" />
          <div className="w-6 h-0.5 bg-white mb-1.5" />
          <div className="w-6 h-0.5 bg-white" />
        </SheetTrigger>
        <SheetContent side="right" className="bg-gray-800 text-white">
          <SheetHeader>
            <SheetTitle className="text-white">Menu</SheetTitle>
            <SheetDescription>This is the main menu</SheetDescription>
          </SheetHeader>
          <nav className="mt-6 flex flex-col space-y-4">
            <Link
              href="/profile"
              className="flex items-center space-x-2 text-white hover:text-blue-400"
            >
              <User size={20} />
              <span>Profile</span>
            </Link>
            <Link
              href="/learning-assessment"
              className="flex items-center space-x-2 text-white hover:text-blue-400"
            >
              <FileText size={20} />
              <span>Assessment</span>
            </Link>
            <button
              className="flex items-center space-x-2 text-white hover:text-blue-400"
              onClick={handleSignOut}
              type="button"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
