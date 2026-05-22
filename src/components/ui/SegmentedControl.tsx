"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export interface Segment<T extends string> {
  value: T;
  label: ReactNode;
  width?: string;
}

interface SegmentedControlProps<T extends string> {
  segments: Segment<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  size?: "sm" | "md";
}

export function SegmentedControl<T extends string>({
  segments,
  value,
  onChange,
  className,
  size = "md",
}: SegmentedControlProps<T>) {
  const activeIndex = segments.findIndex((s) => s.value === value);
  const hasWidths = segments.every((s) => s.width);

  const left = hasWidths
    ? segments.slice(0, activeIndex).reduce((acc, s) => acc + parseFloat(s.width!), 0)
    : (100 / segments.length) * activeIndex;

  const indicatorWidth = hasWidths
    ? parseFloat(segments[activeIndex]?.width ?? "0")
    : 100 / segments.length;

  const heights = {
    sm: "h-9",
    md: "h-10",
  };

  return (
    <div
      className={cn(
        "relative inline-flex bg-section shadow-inset rounded-[10px] p-[3px]",
        heights[size],
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute top-[3px] bottom-[3px] bg-orange shadow-glow rounded-[8px] transition-all duration-300 ease-out"
        style={{
          left: `calc(${left}% + 3px)`,
          width: `calc(${indicatorWidth}% - 6px)`,
        }}
      />
      {segments.map((seg) => {
        const active = seg.value === value;
        return (
          <button
            key={seg.value}
            type="button"
            onClick={() => onChange(seg.value)}
            className={cn(
              "relative z-10 flex-1 px-3 text-xs font-bold whitespace-nowrap transition-colors duration-200",
              active ? "text-white" : "text-muted hover:text-white",
            )}
            style={hasWidths ? { width: seg.width, flex: "none" } : undefined}
          >
            {seg.label}
          </button>
        );
      })}
    </div>
  );
}
