"use client";

import { useEffect, useRef, useState } from "react";
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
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // El nombre de la carrera (<h3>) vive fuera de esta isla React, en el
    // Astro que la envuelve, para que translate.astro (que traduce vía
    // data-i18n directamente en el DOM) no choque con la hidratación de
    // React. Lo hacemos clickeable también buscándolo como hermano
    // anterior del custom element que hospeda esta isla.
    const island = triggerRef.current?.parentElement;
    const heading = island?.previousElementSibling;
    if (!(heading instanceof HTMLElement)) return;

    heading.style.cursor = "pointer";
    heading.setAttribute("role", "button");
    heading.setAttribute("tabindex", "0");
    heading.title = "Ver certificado";

    const onClick = () => setOpen(true);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(true);
      }
    };

    heading.addEventListener("click", onClick);
    heading.addEventListener("keydown", onKeyDown);
    return () => {
      heading.removeEventListener("click", onClick);
      heading.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    // El scroll de la página ya no es nativo del documento: vive dentro del
    // viewport de Radix ScrollArea (ver PageScrollArea). Lo bloqueamos ahí
    // directamente; como su scrollbar es un overlay que no reserva espacio
    // de layout, no hay salto al bloquear/desbloquear.
    const viewport = document.querySelector<HTMLElement>(
      '[data-slot="scroll-area-viewport"]',
    );
    const previousOverflow = viewport?.style.overflow;
    if (viewport) viewport.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (viewport) viewport.style.overflow = previousOverflow ?? "";
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
        ref={triggerRef}
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
