import Image from "next/image";
import { getImage } from "~/server/queries";
import { Modal } from "./modal";

interface Params {
  id: string;
}

async function ImageModal({ params }: { params: Params }) {
  const id = Number(params.id);

  if (Number.isNaN(id)) throw new Error("Invalid Id");

  const img = await getImage(id);
  return (
    <Modal>
      <Image
        src={img.url}
        alt={img.name}
        className="h-auto w-[40rem]"
        width={640}
        height={384}
      />
    </Modal>
  );
}

export default ImageModal;
