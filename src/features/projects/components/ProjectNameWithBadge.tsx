"use client";

import { ImagesBadge } from "@/components/ui/images-badge";

interface Props {
  name: string;
  logo: string | undefined;
  href: string | undefined;
  isPrivate: boolean;
}

export function ProjectNameWithBadge({ name, logo, href, isPrivate }: Props) {
  const images: string[] = logo ? [logo] : [];

  return (
    <div className="flex items-center gap-2 min-w-0">
      {images.length > 0 ? (
        <ImagesBadge
          text={name}
          images={images}
          href={href}
          target="_blank"
          folderSize={{ width: 32, height: 24 }}
          teaserImageSize={{ width: 24, height: 16 }}
          hoverImageSize={{ width: 96, height: 64 }}
          hoverTranslateY={-65}
          hoverSpread={20}
          className="min-w-0"
        />
      ) : href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener"
          className="group/l flex items-center gap-1.5 font-medium relative min-w-0"
        >
          <span className="relative truncate">
            {name}
            <span className="absolute left-0 bottom-0 h-px w-0 bg-current opacity-30 transition-all duration-200 group-hover/l:w-full" />
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 opacity-50 transition-all duration-200 group-hover/l:translate-x-[1.5px] group-hover/l:opacity-100">
            <path d="M7 7h10v10"></path>
            <path d="M7 17 17 7"></path>
          </svg>
        </a>
      ) : (
        <p className="font-medium truncate">{name}</p>
      )}
      {isPrivate && (
        <span className="cursor-default text-[10px] px-2 py-0.5 rounded border border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 whitespace-nowrap flex-shrink-0">
          Private
        </span>
      )}
    </div>
  );
}
