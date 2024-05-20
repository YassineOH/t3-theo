/* eslint-disable @next/next/no-img-element */
import { clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";
import { getImage } from "~/server/queries";

interface Params {
  id: string;
}

async function ImagePage({ params }: { params: Params }) {
  const id = Number(params.id);

  if (Number.isNaN(id)) throw new Error("Invalid Id");

  const img = await getImage(id);
  const userInfo = await clerkClient.users.getUser(img.userId);
  return (
    <div className="gap container mx-auto grid grid-cols-3 gap-x-4">
      <img src={img.url} alt={img.name} className="col-span-2 w-full" />
      <div className="flex flex-col items-start justify-start gap-y-4">
        <h1>{img.name}</h1>
        <div>
          <p>Uploaded by:</p>
          <p>{userInfo.fullName}</p>
        </div>
        <div>
          <p>Created on:</p>
          <p>{new Date(img.createdAt).toLocaleDateString()}</p>
        </div>
        <Link href="/" className="font-bold">
          Go back
        </Link>
      </div>
    </div>
  );
}

export default ImagePage;
