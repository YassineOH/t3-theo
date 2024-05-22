/* eslint-disable @next/next/no-img-element */
import { clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";
import { deleteImage, getImage } from "~/server/queries";

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
        <div className="">
          <form
            action={async () => {
              "use server";
              await deleteImage(img.id);
            }}
          >
            <button
              type="submit"
              className="cursor-pointer rounded-md bg-red-600 px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-red-800"
            >
              delete
            </button>
          </form>
        </div>
        <Link href="/" className="font-bold">
          Go back
        </Link>
      </div>
    </div>
  );
}

export default ImagePage;
