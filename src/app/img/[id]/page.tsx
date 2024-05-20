import React from "react";

interface Params {
  id: string;
}

function ImageModal({ params }: { params: Params }) {
  return <div>{params.id}</div>;
}

export default ImageModal;
