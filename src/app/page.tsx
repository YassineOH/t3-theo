export const dynamic = "force-dynamic";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";

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
  const { userId } = auth();
  const images = await db.query.images.findMany({
    where: (i, { eq }) => eq(i.userId, userId!),
  });
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {images.map((i) => (
        <img src={i.url} alt={i.name} key={i.id} className="h-auto w-96" />
      ))}
    </div>
  );
}
