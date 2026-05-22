import Link from "next/link";
import type { Token } from "@/lib/types";
import { formatNumber } from "@/lib/utils";

interface Holding {
  token: Token;
  amount: number;
  avgEntry: number;
  currentPrice: number;
}

function calcPnl(h: Holding) {
  const currentValue = h.amount * h.currentPrice;
  const cost = h.amount * h.avgEntry;
  const pnlUsd = currentValue - cost;
  const pnlPct = cost === 0 ? 0 : (pnlUsd / cost) * 100;
  return { currentValue, pnlUsd, pnlPct };
}

export function PortfolioHoldings({ holdings }: { holdings: Holding[] }) {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center px-4 h-10 text-xs font-bold text-muted uppercase tracking-wider">
        <div>Token</div>
        <div className="text-center">Amount</div>
        <div className="text-center">Avg Entry</div>
        <div className="text-center">Value</div>
        <div className="text-center">P&L</div>
      </div>
      {/* Rows */}
      <div className="divide-y divide-[#0D0D14]">
        {holdings.map((h) => {
          const { currentValue, pnlUsd, pnlPct } = calcPnl(h);
          const positive = pnlUsd >= 0;
          return (
            <Link
              key={h.token.id}
              href={`/token/${h.token.id}`}
              className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center px-4 h-16 text-xs hover:bg-[#1A1A22] transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={h.token.imageUrl}
                  alt={h.token.ticker}
                  className="h-10 w-10 rounded-[8px] object-cover shrink-0 bg-[#0D0D14]"
                />
                <div className="min-w-0 flex flex-col gap-1">
                  <span className="text-orange font-bold text-sm leading-none uppercase truncate">
                    {h.token.ticker}
                  </span>
                  <span className="text-white text-xs font-medium leading-none truncate">
                    {h.token.name}
                  </span>
                </div>
              </div>
              <div className="text-center text-white font-bold">
                {h.amount.toLocaleString("en-US", { maximumFractionDigits: 2 })}
              </div>
              <div className="text-center text-white font-bold">${h.avgEntry.toFixed(8)}</div>
              <div className="text-center text-white font-bold">
                {formatNumber(currentValue, { compact: true })}
              </div>
              <div className="text-center">
                <div className={positive ? "text-orange font-bold" : "text-[#E54339] font-bold"}>
                  {positive ? "+" : "-"}${Math.abs(pnlUsd).toFixed(2)}
                </div>
                <div className={positive ? "text-orange/70 text-[10px]" : "text-[#E54339]/70 text-[10px]"}>
                  {positive ? "+" : ""}
                  {pnlPct.toFixed(1)}%
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export type { Holding };
