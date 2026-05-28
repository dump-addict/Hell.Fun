"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { PortfolioStats } from "./PortfolioStats";
import { PortfolioChart } from "./PortfolioChart";
import { PortfolioHoldings, type Holding } from "./PortfolioHoldings";
import { PortfolioCreated } from "./PortfolioCreated";
import { PortfolioTrades } from "./PortfolioTrades";
import type { Token } from "@/lib/types";

type Tab = "holdings" | "created" | "trades";

interface PortfolioViewProps {
  /** Tokens détenus (mocké via les tokens existants) */
  tokens: Token[];
}

export function PortfolioView({ tokens }: PortfolioViewProps) {
  const [tab, setTab] = useState<Tab>("holdings");

  // Mock holdings — combine 5 premiers tokens avec des amounts/avg entries fictives
  const holdings: Holding[] = tokens.slice(0, 5).map((t, i) => ({
    token: t,
    amount: 100_000 + i * 50_000,
    avgEntry: 0.0000045 + i * 0.0000008,
    currentPrice: 0.0000062 + i * 0.0000005,
  }));

  // Mock tokens créés par l'utilisateur — 2 tokens
  const created: Token[] = tokens.slice(5, 7);

  return (
    <div className="flex flex-col gap-[15px] lg:h-[calc(100vh-85px)]">
      {/* Titre */}
      <div>
        <h1 className="text-lg font-extrabold text-white leading-none">Portfolio</h1>
        {/* <p className="text-xs text-muted mt-1.5">
          Your holdings, performance, and trade history at a glance.
        </p> */}
      </div>

      {/* Stats cards */}
      <PortfolioStats />

      {/* Chart */}
      <PortfolioChart />

      {/* Tabs SORTIS de la section */}
      <SegmentedControl<Tab>
        segments={[
          { value: "holdings", label: "Holdings", width: "33.33%" },
          { value: "created", label: "Created", width: "33.33%" },
          { value: "trades", label: "Trades", width: "33.33%" },
        ]}
        value={tab}
        onChange={setTab}
        className="w-full sm:w-[300px]"
      />

      {/* Section principale : contenu seul */}
      <section className="bg-section shadow-inset rounded-[16px] p-4 lg:flex-1 lg:min-h-0">
        <div className="lg:h-full lg:overflow-y-auto no-scrollbar">
          {tab === "holdings" && <PortfolioHoldings holdings={holdings} />}
          {tab === "created" && <PortfolioCreated tokens={created} />}
          {tab === "trades" && <PortfolioTrades />}
        </div>
      </section>
    </div>
  );
}
