"use client";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { UploadButton } from "~/utlis/uploadthing";

function TopNav() {
  const router = useRouter();
  return (
    <div className="container  inset-0 mx-auto  w-full bg-transparent py-4 backdrop-blur-xl">
      <nav className="flex w-full items-center justify-between">
        <h1 className="font-bold"> T3 Gallery</h1>
        <div>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-x-4">
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={() => {
                  router.refresh();
                }}
              />
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </nav>
    </div>
  );
}

export default TopNav;
