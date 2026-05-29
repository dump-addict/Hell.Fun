"use client";

import { useState } from "react";
import { flamePlaceholder } from "@/lib/placeholder";

interface TokenAvatarProps {
  src: string;
  alt: string;
  /** Seed pour le placeholder fallback (généralement le ticker ou ID) */
  fallbackSeed: string;
  className?: string;
  /** Image wide pour les banners */
  wide?: boolean;
}

/**
 * Avatar / image de token avec fallback automatique vers le placeholder flamme orange
 * si l'URL externe ne charge pas.
 */
export function TokenAvatar({ src, alt, fallbackSeed, className, wide }: TokenAvatarProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [errored, setErrored] = useState(false);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (!errored) {
          setErrored(true);
          setCurrentSrc(flamePlaceholder(fallbackSeed, { wide }));
        }
      }}
    />
  );
}
