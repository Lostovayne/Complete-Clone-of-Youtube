"use client";

import { Button } from "@/components/ui/button";
import { LoaderIcon, UserCircleIcon } from "lucide-react";

import {
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

export const AuthButton = () => {
  // TODO: Add different auth states
  return (
    <>
      <ClerkLoading>
        <div className="w-full flex items-center justify-center">
          <LoaderIcon className="h-5 w-5 text-gray-500/80 animate-spin" />
        </div>
      </ClerkLoading>
      <SignedIn>
        <UserButton />
        {/* Add menu items here for studio and User profile */}
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            variant={"outline"}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none"
          >
            <UserCircleIcon className="h-5 w-5" />
            Sign in
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  );
};
