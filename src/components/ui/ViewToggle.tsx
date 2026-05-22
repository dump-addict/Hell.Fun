"use client";

import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ViewMode } from "@/lib/types";

interface ViewToggleProps {
  value: ViewMode;
  onChange: (v: ViewMode) => void;
}

const CELL = 34;
const PAD = 3;

/**
 * Toggle Grid / List : 2 cases CARRÉES côte à côte dans un container creusé.
 * L'indicateur orange CARRÉ slide d'une case à l'autre au click.
 */
export function ViewToggle({ value, onChange }: ViewToggleProps) {
  const indicatorLeft = value === "grid" ? PAD : PAD + CELL;

  return (
    <div
      className="relative inline-flex items-center bg-section shadow-inset rounded-[10px]"
      style={{ padding: `${PAD}px`, height: `${CELL + 2 * PAD}px`, width: `${2 * CELL + 2 * PAD}px` }}
    >
      {/* Indicateur orange qui slide */}
      <span
        aria-hidden
        className="absolute top-[3px] bg-orange shadow-glow rounded-[8px] transition-all duration-300 ease-out"
        style={{
          width: `${CELL}px`,
          height: `${CELL}px`,
          left: `${indicatorLeft}px`,
        }}
      />

      <Case
        active={value === "grid"}
        onClick={() => onChange("grid")}
        ariaLabel="Grid view"
      >
        <LayoutGrid className="h-5 w-5" strokeWidth={2.5} />
      </Case>
      <Case
        active={value === "list"}
        onClick={() => onChange("list")}
        ariaLabel="List view"
      >
        <List className="h-5 w-5" strokeWidth={2.5} />
      </Case>
    </div>
  );
}

function Case({
  active,
  onClick,
  ariaLabel,
  children,
}: {
  active: boolean;
  onClick: () => void;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={active}
      className={cn(
        "relative z-10 h-[34px] w-[34px] flex items-center justify-center transition-colors duration-200",
        active ? "text-white" : "text-muted hover:text-white",
      )}
    >
      {children}
    </button>
  );
}
