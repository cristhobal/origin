"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  name: string;
  previewUrl: string;
  href?: string;
}

export function PrivateRepoPreview({ name, previewUrl, href }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [pos, setPos] = useState({ left: 0, top: 0 });
  const ref = useRef<HTMLAnchorElement | HTMLSpanElement>(null);

  useEffect(() => {
    if (isHovered && ref.current) {
      const r = ref.current.getBoundingClientRect();
      setPos({
        left: r.left + r.width / 2,
        top: r.top - 8,
      });
    }
  }, [isHovered]);

  const Tag = href ? "a" : "span";

  return (
    <Tag
      ref={ref}
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener" : undefined}
      className="relative cursor-pointer inline-flex"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="font-medium truncate underline-offset-2 decoration-1 decoration-neutral-400/30 dark:decoration-neutral-600/30"
        style={{ textDecoration: isHovered ? "underline" : "none" }}
      >
        {name}
      </span>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="fixed pointer-events-none"
            style={{ zIndex: 9999, left: pos.left, top: pos.top }}
            initial={{ opacity: 0, scale: 0.6, y: 4 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{ opacity: 0, scale: 0.6, y: 4 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
          >
            <div style={{ transform: "translateX(-50%)" }}>
              <div className="rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-xl overflow-hidden">
                <img
                  src={previewUrl}
                  alt={`${name} preview`}
                  className="w-auto"
                  style={{ maxWidth: "240px", maxHeight: "160px", objectFit: "cover" }}
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Tag>
  );
}
