export const dynamic = "force-dynamic";
import { db } from "~/server/db";

export default async function HomePage() {
  const images = await db.query.images.findMany();

  return (
    <section className="">
      <div className="flex flex-wrap items-center justify-center gap-4">
        {images.map((i) => (
          <img src={i.url} alt={i.name} key={i.id} className="h-auto w-96" />
        ))}
      </div>
    </section>
  );
}
