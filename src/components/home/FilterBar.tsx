"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { ViewToggle } from "@/components/ui/ViewToggle";
import { SettingsMenu } from "@/components/home/SettingsMenu";
import { FilterMenu } from "@/components/home/FilterMenu";
import type { SortKey, StatusFilter, ViewMode } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  status: StatusFilter;
  onStatusChange: (s: StatusFilter) => void;
  sort: SortKey;
  onSortChange: (s: SortKey) => void;
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
}

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "newPair", label: "New Pair" },
  { key: "marketCap", label: "Market Cap" },
  { key: "volume24h", label: "volume (24h)" },
  { key: "lastTxns", label: "Last TXNS" },
  { key: "lastReply", label: "Last Reply" },
];

export function FilterBar({
  status,
  onStatusChange,
  sort,
  onSortChange,
  view,
  onViewChange,
}: FilterBarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex items-center gap-[10px] lg:gap-[15px] lg:justify-between flex-wrap">
      {/* ZONE 1 : GAUCHE — Slider statut */}
      <SegmentedControl<StatusFilter>
        segments={[
          { value: "inProgress", label: "In Progress", width: "56%" },
          { value: "bonded", label: "Bonded", width: "44%" },
        ]}
        value={status}
        onChange={onStatusChange}
        className="w-[184px]"
      />

      {/* ZONE 2 : MILIEU — Filtres (cachés sur mobile, visibles desktop) */}
      <div className="hidden lg:flex items-center gap-[10px] flex-wrap">
        <button
          type="button"
          onClick={() => setDropdownOpen((v) => !v)}
          aria-label="Toggle sort options"
          className={cn(
            "h-10 w-10 flex items-center justify-center rounded-[10px] bg-orange shadow-glow text-white transition-transform",
            dropdownOpen && "rotate-180",
          )}
        >
          <ChevronDown className="h-4 w-4" strokeWidth={2.5} />
        </button>

        {SORT_OPTIONS.map((opt) => {
          const active = sort === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onSortChange(opt.key)}
              className={cn(
                "h-10 px-4 rounded-[10px] text-xs font-bold whitespace-nowrap transition-all",
                active
                  ? "bg-orange text-white shadow-glow"
                  : "bg-section text-white shadow-inset hover:text-orange",
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* ZONE 3 : DROITE — Filter + Vue */}
      <div className="flex items-center gap-[10px]">
        <FilterMenu />

        <div className="hidden lg:block">
          <ViewToggle value={view} onChange={onViewChange} />
        </div>
        <SettingsMenu />
      </div>
    </div>
  );
}
