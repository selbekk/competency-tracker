"use client";

import { signOut } from "@/app/auth/sign-out/action";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FileText, LogOut, Menu, User } from "lucide-react";
import Link from "next/link";
import { SubmitButton } from "./ui/submit-button";

export function SiteMenu() {
  return (
    <>
      <Sheet>
        <SheetTrigger
          className="absolute top-0 right-0 p-4 text-white"
          aria-label="Toggle menu"
        >
          <Menu />
        </SheetTrigger>
        <SheetContent
          side="right"
          className="bg-gray-800 text-white flex flex-col"
        >
          <SheetHeader>
            <SheetTitle className="text-white">Menu</SheetTitle>
            <SheetDescription>
              Feel free to navigate around the app using the links below.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col justify-between flex-1">
            <nav className="mt-6 flex flex-col space-y-4">
              <Link
                href="/profile"
                className="flex items-center space-x-2 text-white hover:text-blue-400"
              >
                <User size={20} />
                <span>Profile</span>
              </Link>
              <Link
                href="/learning-goals"
                className="flex items-center space-x-2 text-white hover:text-blue-400"
              >
                <FileText size={20} />
                <span>Learning goals</span>
              </Link>
            </nav>
            <form action={signOut}>
              <SubmitButton
                variant="ghost"
                className="flex items-center space-x-2 text-white hover:text-blue-400 p-1 text-md"
              >
                <LogOut size={20} />
                Sign Out
              </SubmitButton>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
