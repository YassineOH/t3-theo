import Image from "next/image";
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";
const mockImages = [
  "https://utfs.io/f/a2022d48-671c-4767-bb48-32842cc8bef7-4bo6yw.jpg",
  "https://utfs.io/f/9cee3877-9ba1-4a8a-9baf-fd2dbb3e416f-3vryfv.jpg",
  "https://utfs.io/f/8575cbbb-f98b-4f87-97e1-72933c0c5916-3v9f3p.jpg",
  "https://utfs.io/f/d4945b11-5871-4d4b-a9f9-2aba80643350-66scre.jpg",
];

export default async function HomePage() {
  const posts = await db.query.posts.findMany();
  console.log(posts);

  return (
    <section className="">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {mockImages.map((src, index) => (
          <img src={src} alt="image" key={index} className="h-auto w-96" />
        ))}
      </div>
    </section>
  );
}
