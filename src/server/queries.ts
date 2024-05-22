import { auth } from "@clerk/nextjs/server";
import "server-only";
import { db } from "./db";
import { images } from "./db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getMyImages() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const images = await db.query.images.findMany({
    where: (i, { eq }) => eq(i.userId, user.userId),
  });
  return images;
}

export async function getImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const img = await db.query.images.findFirst({
    where: (i, { eq }) => eq(i.id, id),
  });

  if (!img) throw new Error("not found");

  if (img.userId !== user.userId) throw new Error("Unauthorized");

  return img;
}

export async function deleteImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  revalidatePath("/");
  redirect("/");
}
