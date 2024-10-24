import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ForgotPasswordConfirmation() {
  return (
    <div className="w-full max-w-md bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-gray-700 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
        Check Your Email
      </h1>
      <p className="text-center text-gray-300 mb-6">
        We&apos;ve sent a password reset link to your email address. Please
        check your inbox and follow the instructions to reset your password.
      </p>
      <Button asChild className="w-full">
        <Link href="/sign-in">Return to Sign In</Link>
      </Button>
    </div>
  );
}
