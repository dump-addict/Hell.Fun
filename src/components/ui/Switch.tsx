"use client";

import { cn } from "@/lib/utils";

interface SwitchProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  ariaLabel?: string;
}

/**
 * Switch ON/OFF dans la DA Hell.fun :
 * - Forme arrondie carrée (pas circulaire comme un toggle iOS classique)
 * - OFF : track creusé (shadow-inset, fond #13131A)
 * - ON : track orange #FF4617 avec inset glow jaune
 * - Handle blanc carré arrondi qui slide
 */
export function Switch({ checked, onChange, ariaLabel }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 rounded-[8px] p-[3px] transition-colors duration-200 shrink-0",
        checked ? "bg-orange shadow-glow" : "bg-section shadow-inset",
      )}
    >
      <span
        className={cn(
          "block h-[18px] w-[18px] rounded-[5px] bg-white transition-transform duration-300 ease-out",
          checked ? "translate-x-5" : "translate-x-0",
        )}
      />
    </button>
  );
}
