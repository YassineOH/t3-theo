import Image from "next/image";
import { getImage } from "~/server/queries";

interface Params {
  id: string;
}

async function ImageModal({ params }: { params: Params }) {
  const id = Number(params.id);

  if (Number.isNaN(id)) throw new Error("Invalid Id");

  const img = await getImage(id);
  return (
    <div className="">
      <Image
        src={img.url}
        alt={img.name}
        className="h-auto w-96"
        width={384}
        height={384}
      />
    </div>
  );
}

export default ImageModal;
