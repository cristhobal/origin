import { type ReactNode } from "react";

interface SlideUpFadeProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function SlideUpFade({ children, className, delay = 0 }: SlideUpFadeProps) {
  return (
    <div
      className={className}
      style={{
        animationDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}