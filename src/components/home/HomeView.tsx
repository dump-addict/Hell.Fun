"use client";

import { useState } from "react";
import type { Leader, SortKey, StatusFilter, Token, ViewMode } from "@/lib/types";
import { LeadersCarousel } from "./LeadersCarousel";
import { FilterBar } from "./FilterBar";
import { TokenCard } from "./TokenCard";
import { TokenTable } from "./TokenTable";

interface HomeViewProps {
  tokens: Token[];
  leaders: Leader[];
}

export function HomeView({ tokens, leaders }: HomeViewProps) {
  const [status, setStatus] = useState<StatusFilter>("inProgress");
  const [sort, setSort] = useState<SortKey>("marketCap");
  const [view, setView] = useState<ViewMode>("grid");

  return (
    <div className="flex flex-col gap-[15px]">
      <LeadersCarousel leaders={leaders} />
      <FilterBar
        status={status}
        onStatusChange={setStatus}
        sort={sort}
        onSortChange={setSort}
        view={view}
        onViewChange={setView}
      />

      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[15px]">
          {tokens.map((t) => (
            <TokenCard key={t.id} token={t} />
          ))}
        </div>
      ) : (
        <TokenTable tokens={tokens} />
      )}
    </div>
  );
}
