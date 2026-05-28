"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface Chain {
  id: string;
  name: string;
  symbol: string;
  color: string;
}

export const CHAINS: Chain[] = [
  { id: "lit", name: "Lighter", symbol: "LIT", color: "#FF4617" },
  { id: "sol", name: "Solana", symbol: "SOL", color: "#9945FF" },
  { id: "eth", name: "Ethereum", symbol: "ETH", color: "#627EEA" },
  { id: "base", name: "Base", symbol: "BASE", color: "#0052FF" },
  { id: "arb", name: "Arbitrum", symbol: "ARB", color: "#28A0F0" },
  { id: "bsc", name: "BNB Chain", symbol: "BNB", color: "#F0B90B" },
];

interface ChainSelectorProps {
  value: Chain;
  onChange: (chain: Chain) => void;
  exclude?: string;
}

export function ChainSelector({ value, onChange, exclude }: ChainSelectorProps) {
  const [open, setOpen] = useState(false);
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

  const available = CHAINS.filter((c) => c.id !== exclude);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full h-14 px-4 flex items-center gap-3 bg-[#0D0D14] border border-[#262631] rounded-[12px] text-white hover:border-orange/60 transition-colors"
      >
        <ChainIcon chain={value} className="h-7 w-7" />
        <div className="flex-1 text-left">
          <div className="text-sm font-bold leading-none">{value.name}</div>
          <div className="text-[10px] text-muted mt-0.5 leading-none">{value.symbol}</div>
        </div>
        <ChevronDown
          className={cn("h-4 w-4 text-muted transition-transform", open && "rotate-180")}
          strokeWidth={2.5}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 bg-section shadow-inset rounded-[12px] p-2 flex flex-col gap-1 max-h-[260px] overflow-y-auto no-scrollbar">
          {available.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                onChange(c);
                setOpen(false);
              }}
              className={cn(
                "flex items-center gap-3 h-11 px-2.5 rounded-[8px] transition-colors text-left",
                c.id === value.id ? "bg-orange text-white" : "text-white hover:bg-[#1A1A22]",
              )}
            >
              <ChainIcon chain={c} className="h-7 w-7" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold leading-none truncate">{c.name}</div>
                <div className="text-[10px] text-muted mt-0.5 leading-none">{c.symbol}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** Logo placeholder : disque coloré avec la première lettre du symbol */
function ChainIcon({ chain, className }: { chain: Chain; className?: string }) {
  return (
    <span
      className={cn("flex items-center justify-center rounded-full shrink-0 font-extrabold text-white", className)}
      style={{
        background: `radial-gradient(circle at 35% 30%, ${chain.color}, color-mix(in oklab, ${chain.color} 60%, #000))`,
        fontSize: "10px",
      }}
    >
      {chain.symbol.charAt(0)}
    </span>
  );
}
