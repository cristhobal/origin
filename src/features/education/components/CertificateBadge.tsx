"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { BadgeCheck, X } from "lucide-react";

interface Props {
  name: string;
  certificateUrl: string;
}

export function CertificateBadge({ name, certificateUrl }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    // No usamos `overflow: hidden` en el body: `scrollbar-gutter: stable`
    // (global.css) solo reserva el espacio del scrollbar mientras
    // overflow-y es auto/scroll, así que forzar "hidden" liberaba ese
    // espacio y producía el salto de layout al abrir el modal. En vez de
    // eso "congelamos" el scroll fijando la posición del body, sin tocar
    // overflow.
    const scrollY = window.scrollY;
    const { position, top, width } = document.body.style;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.position = position;
      document.body.style.top = top;
      document.body.style.width = width;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  const modal =
    mounted && typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                role="dialog"
                aria-modal="true"
                aria-label={`Certificado: ${name}`}
              >
                <motion.div
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <motion.div
                  className="relative z-10 max-h-[95vh] max-w-[95vw] overflow-hidden rounded-xl bg-neutral-100 shadow-2xl dark:bg-neutral-950"
                  initial={{ opacity: 0, scale: 0.95, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Cerrar"
                    title="Cerrar"
                    className="absolute right-3 top-3 z-20 rounded-full bg-white/90 p-1.5 text-neutral-700 shadow-md backdrop-blur-sm hover:bg-white hover:text-black dark:bg-neutral-800/90 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
                  >
                    <X size={18} />
                  </button>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={certificateUrl}
                    alt={`Certificado: ${name}`}
                    className="block max-h-[95vh] max-w-[95vw] object-contain"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Ver certificado de ${name}`}
        title="Certificado verificado"
        className="inline-flex shrink-0 items-center text-blue-500 transition-colors hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
      >
        <BadgeCheck size={16} />
      </button>
      {modal}
    </>
  );
}
