"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { LeaderboardTokens } from "./LeaderboardTokens";
import { LeaderboardTraders } from "./LeaderboardTraders";
import { LeaderboardCreators } from "./LeaderboardCreators";
import { cn } from "@/lib/utils";
import type { Token } from "@/lib/types";

type Tab = "tokens" | "traders" | "creators";
type Range = "24h" | "7D" | "30D" | "ALL";

const RANGES: Range[] = ["24h", "7D", "30D", "ALL"];

export function LeaderboardView({ tokens }: { tokens: Token[] }) {
  const [tab, setTab] = useState<Tab>("tokens");
  const [range, setRange] = useState<Range>("24h");
  const [query, setQuery] = useState("");

  const searchPlaceholder =
    tab === "tokens" ? "Search token or address..." : "Search wallet address...";

  return (
    <div className="flex flex-col gap-[15px] h-[calc(100vh-85px)]">
      {/* Header : titre + filtre période + search */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-lg font-extrabold text-white leading-none">Leaderboard</h1>
        <div className="flex items-center gap-[10px]">
          <div className="flex bg-section shadow-inset rounded-[10px] p-[3px]">
            {RANGES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRange(r)}
                className={cn(
                  "px-4 h-8 rounded-[7px] text-xs font-bold transition-colors",
                  range === r ? "bg-orange text-white shadow-glow" : "text-muted hover:text-white",
                )}
              >
                {r}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 h-10 w-[260px] bg-section shadow-inset rounded-[10px] px-3.5">
            <Search className="h-4 w-4 text-muted shrink-0" strokeWidth={2.5} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="flex-1 bg-transparent text-white text-xs placeholder:text-muted focus:outline-none min-w-0"
            />
          </div>
        </div>
      </div>

      {/* Section principale : tabs + contenu */}
      <section className="bg-section shadow-inset rounded-[16px] p-4 flex flex-col gap-4 flex-1 min-h-0">
        <SegmentedControl<Tab>
          segments={[
            { value: "tokens", label: "Top Tokens", width: "33.33%" },
            { value: "traders", label: "Top Traders", width: "33.33%" },
            { value: "creators", label: "Top Creators", width: "33.33%" },
          ]}
          value={tab}
          onChange={setTab}
          className="w-[360px]"
        />

        <div className="flex-1 overflow-y-auto no-scrollbar min-h-0">
          {tab === "tokens" && <LeaderboardTokens tokens={tokens} />}
          {tab === "traders" && <LeaderboardTraders />}
          {tab === "creators" && <LeaderboardCreators />}
        </div>
      </section>
    </div>
  );
}
