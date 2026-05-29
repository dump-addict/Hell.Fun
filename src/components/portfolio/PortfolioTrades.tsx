import { flamePlaceholder } from "@/lib/placeholder";
import { timeAgo } from "@/lib/utils";

interface UserTrade {
  id: string;
  type: "buy" | "sell";
  ticker: string;
  tokenAmount: number;
  litAmount: number;
  at: Date;
}

const MOCK_TRADES: UserTrade[] = [
  { id: "ut1", type: "buy", ticker: "VLAD", tokenAmount: 142_300, litAmount: 3.2, at: new Date(Date.now() - 60_000 * 5) },
  { id: "ut2", type: "sell", ticker: "COX", tokenAmount: 38_900, litAmount: 0.85, at: new Date(Date.now() - 60_000 * 32) },
  { id: "ut3", type: "buy", ticker: "PEPE", tokenAmount: 510_000, litAmount: 1.6, at: new Date(Date.now() - 60_000 * 95) },
  { id: "ut4", type: "buy", ticker: "DOGE", tokenAmount: 92_400, litAmount: 2.1, at: new Date(Date.now() - 60_000 * 60 * 4) },
  { id: "ut5", type: "sell", ticker: "WIF", tokenAmount: 220_000, litAmount: 4.4, at: new Date(Date.now() - 60_000 * 60 * 12) },
  { id: "ut6", type: "buy", ticker: "BONK", tokenAmount: 70_000, litAmount: 0.7, at: new Date(Date.now() - 60_000 * 60 * 24) },
  { id: "ut7", type: "buy", ticker: "MOG", tokenAmount: 88_000, litAmount: 1.1, at: new Date(Date.now() - 60_000 * 60 * 48) },
];

export function PortfolioTrades() {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-[1fr_2fr_1fr_1fr] gap-2 xl:grid-cols-[1fr_2fr_1fr_1fr_1fr] xl:gap-0 items-center px-4 h-10 text-xs font-bold text-muted uppercase tracking-wider whitespace-nowrap">
        <div>Type</div>
        <div>Token</div>
        <div className="hidden xl:block text-center">Amount</div>
        <div className="text-center">LIT</div>
        <div className="text-center">Time</div>
      </div>
      <div className="divide-y divide-[#0D0D14]">
        {MOCK_TRADES.map((tx) => (
          <div
            key={tx.id}
            className="grid grid-cols-[1fr_2fr_1fr_1fr] gap-2 xl:grid-cols-[1fr_2fr_1fr_1fr_1fr] xl:gap-0 items-center px-4 h-14 text-xs text-white"
          >
            <div>
              <span
                className={
                  tx.type === "buy"
                    ? "text-orange font-bold uppercase"
                    : "text-[#E54339] font-bold uppercase"
                }
              >
                {tx.type}
              </span>
            </div>
            <div className="flex items-center gap-2.5 min-w-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={flamePlaceholder(tx.ticker)}
                alt=""
                className="h-8 w-8 rounded-[6px] shrink-0 object-cover bg-[#0D0D14]"
              />
              <span className="font-bold text-orange uppercase">{tx.ticker}</span>
            </div>
            <div className="hidden xl:block text-center font-bold">
              {tx.tokenAmount.toLocaleString("en-US")}
            </div>
            <div className="text-center font-bold">{tx.litAmount.toFixed(2)}</div>
            <div className="text-center text-muted">{timeAgo(tx.at)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
