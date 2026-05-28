import { ArrowRight, CheckCircle2, Clock, ExternalLink } from "lucide-react";
import { timeAgo } from "@/lib/utils";
import { CHAINS, type Chain } from "./ChainSelector";

interface BridgeTx {
  id: string;
  from: Chain;
  to: Chain;
  amount: number;
  symbol: string;
  status: "completed" | "pending";
  at: Date;
}

const findChain = (id: string) => CHAINS.find((c) => c.id === id) ?? CHAINS[0];

const MOCK_HISTORY: BridgeTx[] = [
  {
    id: "br1",
    from: findChain("sol"),
    to: findChain("lit"),
    amount: 12.4,
    symbol: "SOL",
    status: "completed",
    at: new Date(Date.now() - 60_000 * 5),
  },
  {
    id: "br2",
    from: findChain("eth"),
    to: findChain("lit"),
    amount: 0.85,
    symbol: "ETH",
    status: "pending",
    at: new Date(Date.now() - 60_000 * 18),
  },
  {
    id: "br3",
    from: findChain("lit"),
    to: findChain("base"),
    amount: 245,
    symbol: "LIT",
    status: "completed",
    at: new Date(Date.now() - 60_000 * 60 * 3),
  },
  {
    id: "br4",
    from: findChain("arb"),
    to: findChain("lit"),
    amount: 3.2,
    symbol: "ETH",
    status: "completed",
    at: new Date(Date.now() - 60_000 * 60 * 22),
  },
];

export function BridgeHistory() {
  return (
    <section className="bg-section shadow-inset rounded-[16px] p-4 flex flex-col gap-3">
      <h2 className="text-sm font-bold text-white">Recent Bridges</h2>

      <div className="flex flex-col">
        {MOCK_HISTORY.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center gap-3 h-14 px-2 border-b border-[#0D0D14] last:border-b-0"
          >
            <div className="flex items-center gap-2 shrink-0">
              <ChainDot color={tx.from.color} label={tx.from.symbol} />
              <ArrowRight className="h-3.5 w-3.5 text-muted" strokeWidth={2.5} />
              <ChainDot color={tx.to.color} label={tx.to.symbol} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white leading-none">
                {tx.amount} <span className="text-orange uppercase">{tx.symbol}</span>
              </div>
              <div className="text-[10px] text-muted mt-1 leading-none">
                {tx.from.name} → {tx.to.name}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {tx.status === "completed" ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-orange">
                  <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.5} />
                  Done
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-muted-2">
                  <Clock className="h-3.5 w-3.5" strokeWidth={2.5} />
                  Pending
                </span>
              )}
              <span className="text-[10px] text-muted whitespace-nowrap">{timeAgo(tx.at)}</span>
              <button
                type="button"
                aria-label="Explorer"
                className="h-7 w-7 flex items-center justify-center rounded-[6px] text-muted hover:text-orange transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ChainDot({ color, label }: { color: string; label: string }) {
  return (
    <span
      className="h-6 w-6 rounded-full flex items-center justify-center text-[9px] font-extrabold text-white shrink-0"
      style={{
        background: `radial-gradient(circle at 35% 30%, ${color}, color-mix(in oklab, ${color} 60%, #000))`,
      }}
    >
      {label.charAt(0)}
    </span>
  );
}
