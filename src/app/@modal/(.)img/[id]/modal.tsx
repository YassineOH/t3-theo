"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <div className="absolute inset-0 flex h-screen w-screen items-center justify-center gap-y-1 bg-black/50">
      <dialog ref={dialogRef} className="bg-transparent" onClose={onDismiss}>
        {children}
        <button
          onClick={onDismiss}
          className="rounded-md bg-white px-4 py-2 font-bold text-slate-900 "
        >
          close
        </button>
      </dialog>
    </div>,
    document.getElementById("root-modal")!,
  );
}
