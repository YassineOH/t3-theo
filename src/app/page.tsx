export const dynamic = "force-dynamic";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
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
        <Link key={i.id} href={`/img/${i.id}`}>
          <Image
            src={i.url}
            alt={i.name}
            className="h-auto w-96"
            width={384}
            height={384}
          />
        </Link>
      ))}
    </div>
  );
}
