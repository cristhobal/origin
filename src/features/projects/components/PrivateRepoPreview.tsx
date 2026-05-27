"use client";

import { useState } from "react";

interface Props {
  name: string;
  previewUrl: string;
  href?: string;
}

export function PrivateRepoPreview({ name, previewUrl, href }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  const Tag = href ? "a" : "span";

  return (
    <Tag
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener" : undefined}
      className="relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="font-medium truncate underline-offset-2 decoration-1 decoration-neutral-400/30 dark:decoration-neutral-600/30"
        style={{ textDecoration: isHovered ? "underline" : "none" }}
      >
        {name}
      </span>

      {isHovered && (
        <div
          className="fixed pointer-events-none"
          style={{
            zIndex: 9999,
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
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
      )}
    </Tag>
  );
}
