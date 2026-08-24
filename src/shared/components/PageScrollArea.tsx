"use client";

import type { ReactNode } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  children: ReactNode;
}

/**
 * Reemplaza el scroll nativo del documento por Radix ScrollArea: su
 * scrollbar es un overlay que no ocupa espacio de layout, evitando
 * cualquier salto/franja al aparecer o desaparecer (a diferencia del
 * scrollbar nativo del navegador).
 */
export function PageScrollArea({ children }: Props) {
  return (
    <ScrollArea className="h-dvh w-full">
      <div className="flex min-h-dvh flex-col">{children}</div>
    </ScrollArea>
  );
}
