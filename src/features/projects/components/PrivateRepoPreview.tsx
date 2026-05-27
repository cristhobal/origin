"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  name: string;
  previewUrl: string;
  href?: string;
}

const MAX_LANDSCAPE_W = 220;
const MAX_LANDSCAPE_H = 140;
const MAX_PORTRAIT_W = 160;
const MAX_PORTRAIT_H = 240;

function computeSize(naturalW: number, naturalH: number) {
  if (!naturalW || !naturalH) {
    return { width: MAX_LANDSCAPE_W, height: MAX_LANDSCAPE_H };
  }
  const ratio = naturalW / naturalH;
  if (ratio >= 1) {
    const width = MAX_LANDSCAPE_W;
    const height = Math.min(MAX_LANDSCAPE_H, Math.round(width / ratio));
    return { width, height };
  }
  const height = MAX_PORTRAIT_H;
  const width = Math.min(MAX_PORTRAIT_W, Math.round(height * ratio));
  return { width, height };
}

export function PrivateRepoPreview({ name, previewUrl, href }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [pos, setPos] = useState({ left: 0, top: 0 });
  const [mounted, setMounted] = useState(false);
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null,
  );
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (cancelled) return;
      setSize(computeSize(img.naturalWidth, img.naturalHeight));
    };
    img.src = previewUrl;
    return () => {
      cancelled = true;
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!isHovered) return;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setPos({ left: r.left + r.width / 2, top: r.top });
    };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [isHovered]);

  const Tag = (href ? "a" : "span") as "a";

  const { width, height } = size ?? {
    width: MAX_LANDSCAPE_W,
    height: MAX_LANDSCAPE_H,
  };

  const badge =
    mounted && typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="fixed pointer-events-none"
                style={{
                  zIndex: 9999,
                  left: pos.left,
                  top: pos.top - 12,
                  x: "-50%",
                  y: "-100%",
                  transformOrigin: "bottom center",
                }}
                initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.6, rotate: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <div
                  className="rounded-xl overflow-hidden border-2 border-white dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xl"
                  style={{ width, height }}
                >
                  <img
                    src={previewUrl}
                    alt={`${name} preview`}
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    loading="lazy"
                    draggable={false}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <Tag
      ref={ref as React.Ref<HTMLAnchorElement>}
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener" : undefined}
      className="group/l relative inline-flex font-medium min-w-0 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative truncate">
        {name}
        <span className="absolute left-0 bottom-0 h-px w-0 bg-current opacity-30 transition-all duration-200 group-hover/l:w-full"></span>
      </span>
      {badge}
    </Tag>
  );
}
