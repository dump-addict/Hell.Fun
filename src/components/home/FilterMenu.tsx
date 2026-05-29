"use client";

import { ListFilter } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface FilterValues {
  mcapMin?: number;
  mcapMax?: number;
  volMin?: number;
  volMax?: number;
}

export function FilterMenu() {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({});
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const hasFilters = Object.values(filters).some((v) => v !== undefined);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Filter"
        aria-expanded={open}
        className={cn(
          "h-10 px-3.5 inline-flex items-center gap-2 rounded-[10px] shadow-inset text-xs font-bold transition-colors",
          hasFilters ? "bg-orange text-white shadow-glow" : "bg-section text-white hover:text-orange",
        )}
      >
        Filter
        <ListFilter className="h-3.5 w-3.5" strokeWidth={2.5} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-[400px] bg-section shadow-inset rounded-[16px] p-4 flex flex-col gap-3"
        >
          <RangeFilter
            label="Mcap"
            min={1000}
            max={50_000_000}
            valueMin={filters.mcapMin}
            valueMax={filters.mcapMax}
            onChange={(min, max) =>
              setFilters((f) => ({ ...f, mcapMin: min, mcapMax: max }))
            }
          />

          <RangeFilter
            label="24h Vol"
            min={0}
            max={500_000}
            valueMin={filters.volMin}
            valueMax={filters.volMax}
            onChange={(min, max) =>
              setFilters((f) => ({ ...f, volMin: min, volMax: max }))
            }
          />

          <div className="flex items-center gap-[10px] pt-1">
            <button
              type="button"
              onClick={() => setFilters({})}
              className="flex-1 h-11 rounded-[10px] bg-[#0D0D14] shadow-inset text-white font-bold text-[13px] hover:text-orange transition-colors"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex-1 h-11 rounded-[10px] bg-orange shadow-glow text-white font-bold text-[13px] hover:brightness-110 active:scale-[0.99] transition-all"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

interface RangeFilterProps {
  label: string;
  min: number;
  max: number;
  valueMin?: number;
  valueMax?: number;
  onChange: (min: number | undefined, max: number | undefined) => void;
}

function RangeFilter({ label, min, max, valueMin, valueMax, onChange }: RangeFilterProps) {
  const currentMin = valueMin ?? min;
  const currentMax = valueMax ?? max;
  const leftPct = ((currentMin - min) / (max - min)) * 100;
  const rightPct = ((currentMax - min) / (max - min)) * 100;

  return (
    <div className="bg-[#0D0D14] shadow-inset rounded-[12px] p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-muted uppercase tracking-wider">{label}</span>
        <span className="text-xs font-bold text-white">
          {formatValue(currentMin)} <span className="text-muted">→</span> {formatValue(currentMax)}
          {currentMax === max && "+"}
        </span>
      </div>

      {/* Slider track avec 2 thumbs */}
      <div className="relative h-5 flex items-center">
        {/* Track de fond (gris foncé partout) */}
        <div className="absolute inset-x-0 h-2 bg-section shadow-inset rounded-full" />
        {/* Range actif (orange) — entre les 2 thumbs */}
        <div
          className="absolute h-2 bg-orange shadow-glow rounded-full"
          style={{ left: `${leftPct}%`, right: `${100 - rightPct}%` }}
        />
        {/* Input range min */}
        <input
          type="range"
          min={min}
          max={max}
          value={currentMin}
          onChange={(e) => {
            const v = Number(e.target.value);
            onChange(v >= currentMax ? currentMax : v, valueMax);
          }}
          className="range-thumb absolute inset-x-0 w-full appearance-none bg-transparent pointer-events-none"
        />
        {/* Input range max */}
        <input
          type="range"
          min={min}
          max={max}
          value={currentMax}
          onChange={(e) => {
            const v = Number(e.target.value);
            onChange(valueMin, v <= currentMin ? currentMin : v);
          }}
          className="range-thumb absolute inset-x-0 w-full appearance-none bg-transparent pointer-events-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Minimum</label>
          <input
            type="text"
            placeholder={formatValue(min)}
            value={valueMin === undefined ? "" : formatValue(valueMin)}
            onChange={(e) => {
              const v = parseShorthand(e.target.value);
              onChange(v, valueMax);
            }}
            className="h-10 bg-section shadow-inset rounded-[10px] px-3 text-sm text-white placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-orange/60 transition-shadow"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Maximum</label>
          <input
            type="text"
            placeholder={`${formatValue(max)}+`}
            value={valueMax === undefined ? "" : formatValue(valueMax)}
            onChange={(e) => {
              const v = parseShorthand(e.target.value);
              onChange(valueMin, v);
            }}
            className="h-10 bg-section shadow-inset rounded-[10px] px-3 text-sm text-white placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-orange/60 transition-shadow"
          />
        </div>
      </div>
    </div>
  );
}

function formatValue(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(2)}K`;
  return `$${n.toFixed(0)}`;
}

function parseShorthand(s: string): number | undefined {
  const cleaned = s.trim().toLowerCase().replace(/[$,\s]/g, "");
  if (!cleaned) return undefined;
  const match = cleaned.match(/^(\d+(?:\.\d+)?)([kmb])?$/);
  if (!match) return undefined;
  const value = parseFloat(match[1]);
  const unit = match[2];
  if (unit === "b") return value * 1_000_000_000;
  if (unit === "m") return value * 1_000_000;
  if (unit === "k") return value * 1_000;
  return value;
}
