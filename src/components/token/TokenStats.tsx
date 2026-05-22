import type { Token } from "@/lib/types";
import { formatNumber, timeAgo } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function TokenStats({ token }: { token: Token }) {
  return (
    <section className="bg-section shadow-inset rounded-[16px] p-4 flex flex-col gap-4 flex-1">
      <div className="flex flex-col gap-2">
        <h3 className="text-xs font-bold text-muted uppercase tracking-wider">Bonding curve</h3>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-extrabold text-white">{token.bondingCurveProgress}%</span>
          <span className="text-xs text-muted">to graduation</span>
        </div>
        <ProgressBar progress={token.bondingCurveProgress} />
        <p className="text-xs text-muted leading-relaxed">
          When the bonding curve reaches 100%, all liquidity is deposited to a DEX and burned forever.
        </p>
      </div>

      <div className="h-px bg-[#0D0D14]" />

      <div className="grid grid-cols-2 gap-3 text-xs">
        <Stat label="Market Cap" value={formatNumber(token.marketCap, { compact: true })} accent />
        <Stat label="Volume (24h)" value={formatNumber(token.volume24h, { compact: true })} />
        <Stat label="Holders" value={token.holders.toLocaleString("en-US")} />
        <Stat label="TXNS (24h)" value={token.txns24h.toLocaleString("en-US")} />
        <Stat label="Created" value={timeAgo(token.createdAt)} />
        <Stat label="Replies" value={token.replies.toLocaleString("en-US")} />
      </div>
    </section>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex flex-col gap-1 p-3 bg-[#0D0D14] shadow-inset rounded-[10px]">
      <span className="text-muted">{label}</span>
      <span className={accent ? "text-orange font-bold" : "text-white font-bold"}>{value}</span>
    </div>
  );
}
