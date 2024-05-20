import { auth } from "@clerk/nextjs/server";
import "server-only";
import { db } from "./db";

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
