import { ChevronDown } from "lucide-react";
import { flamePlaceholder } from "@/lib/placeholder";
import { shortenAddress } from "@/lib/utils";

interface Holder {
  id: string;
  wallet: string;
  username?: string;
  followers?: number;
  percentOfSupply: number;
  avgEntry: number;
  pnlUsd: number;
  pnlPct: number;
}

function generateHolders(seed: string): Holder[] {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  const rand = () => {
    h = (h * 9301 + 49297) % 233280;
    return h / 233280;
  };
  return Array.from({ length: 10 }, (_, i) => {
    const isPositive = rand() > 0.5;
    return {
      id: `holder_${i}`,
      wallet: `${randStr(rand, 4)}...${randStr(rand, 4)}`,
      username: i < 3 ? undefined : i === 3 ? "usernamezero" : i === 4 ? "emtwad" : undefined,
      followers: i < 3 ? undefined : i === 3 ? 70 : i === 4 ? 4 : undefined,
      percentOfSupply: 3.42 - i * 0.3,
      avgEntry: 0.0000056 + rand() * 0.000003,
      pnlUsd: (isPositive ? 1 : -1) * (5 + rand() * 80),
      pnlPct: (isPositive ? 1 : -1) * (10 + rand() * 60),
    };
  });
}

function randStr(rand: () => number, n: number): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz123456789";
  let out = "";
  for (let i = 0; i < n; i++) out += chars[Math.floor(rand() * chars.length)] ?? "X";
  return out;
}

export function TokenHolders({ tokenId }: { tokenId: string }) {
  const holders = generateHolders(tokenId);

  return (
    <div className="flex flex-col gap-3">
      {/* Sub-header : count + dropdown + bubble map */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-sm font-bold text-white">Holders</h3>
            <span className="text-xs font-bold text-muted">{holders.length}</span>
          </div>
          <p className="text-xs text-muted mt-0.5">Wallets ranked by token balance.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="h-9 px-3 inline-flex items-center gap-2 rounded-[10px] bg-[#0D0D14] shadow-inset text-xs font-bold text-white hover:text-orange transition-colors"
          >
            All holders
            <ChevronDown className="h-3.5 w-3.5" strokeWidth={2.5} />
          </button>
          <button
            type="button"
            className="h-9 px-3 rounded-[10px] bg-[#0D0D14] shadow-inset text-xs font-bold text-white hover:text-orange transition-colors"
          >
            Bubble map
          </button>
        </div>
      </div>

      {/* Table — pas de wrapper additionnel, on hérite du fond du parent */}
      <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center px-4 h-10 text-xs font-bold text-muted uppercase tracking-wider">
        <div>Holder</div>
        <div className="text-center">% of supply</div>
        <div className="text-center">Avg entry</div>
        <div className="text-center">PnL</div>
      </div>
      <div className="divide-y divide-[#0D0D14] max-h-[360px] overflow-y-auto">
        {holders.map((h) => (
          <div
            key={h.id}
            className="grid grid-cols-[1.5fr_1fr_1fr_1fr] items-center px-4 h-14 text-xs"
          >
            {/* Holder */}
            <div className="flex items-center gap-2.5 min-w-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={flamePlaceholder(h.wallet)}
                alt=""
                className="h-8 w-8 rounded-full shrink-0 object-cover bg-[#0D0D14]"
              />
              <div className="min-w-0">
                <div className="text-white font-bold truncate">
                  {h.username ?? shortenAddress(h.wallet)}
                </div>
                {h.followers != null && (
                  <div className="text-[10px] text-muted">{h.followers} followers</div>
                )}
              </div>
            </div>

            {/* % of supply */}
            <div className="text-white font-bold text-center">{h.percentOfSupply.toFixed(2)}%</div>

            {/* Avg entry */}
            <div className="text-white font-bold text-center">${h.avgEntry.toFixed(8)}</div>

            {/* PnL */}
            <div className="text-center">
              <div className={h.pnlUsd >= 0 ? "text-orange font-bold" : "text-[#E54339] font-bold"}>
                {h.pnlUsd >= 0 ? "+" : "-"}${Math.abs(h.pnlUsd).toFixed(2)}
              </div>
              <div className={h.pnlPct >= 0 ? "text-orange/70 text-[10px]" : "text-[#E54339]/70 text-[10px]"}>
                {h.pnlPct >= 0 ? "+" : ""}
                {h.pnlPct.toFixed(1)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
