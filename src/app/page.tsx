export const dynamic = "force-dynamic";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import { getMyImages } from "~/server/queries";

export default async function HomePage() {
  return (
    <section className="w-full">
      <SignedOut>
        <div className="w-full  py-6 text-center text-2xl font-bold">
          Please Sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </section>
  );
}

async function Images() {
  const images = await getMyImages();
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {images.map((i) => (
        <Image
          src={i.url}
          alt={i.name}
          key={i.id}
          className="h-auto w-96"
          width={384}
          height={384}
        />
      ))}
    </div>
  );
}
