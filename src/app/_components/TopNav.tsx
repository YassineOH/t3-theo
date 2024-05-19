import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React from "react";

function TopNav() {
  return (
    <div className="container  inset-0 mx-auto  w-full bg-transparent py-4 backdrop-blur-xl">
      <nav className="flex w-full items-center justify-between">
        <h1 className="font-bold"> T3 Gallery</h1>
        <div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </div>
  );
}

export default TopNav;
