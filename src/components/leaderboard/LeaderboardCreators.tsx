import { flamePlaceholder } from "@/lib/placeholder";
import { formatNumber } from "@/lib/utils";
import { RankBadge } from "./RankBadge";

interface Creator {
  id: string;
  username?: string;
  wallet: string;
  tokensCreated: number;
  totalMarketCap: number;
  avgPerformance: number;
  bestTicker: string;
}

function generateCreators(): Creator[] {
  const names = [
    "vlad",
    "satoshi",
    undefined,
    "vitalik",
    "cz",
    undefined,
    "anatoly",
    undefined,
    undefined,
    "hayes",
    undefined,
    "elonbot",
    undefined,
    "charles",
    undefined,
  ];
  const bestTickers = ["VLAD", "COX", "PEPE", "DOGE", "WIF", "BONK", "MOG", "HELL", "FIRE", "BURN", "ASH", "FLAME", "GMI", "MOON", "SHIB"];
  let h = 11;
  const rand = () => {
    h = (h * 9301 + 49297) % 233280;
    return h / 233280;
  };
  const randStr = (n: number) => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz123456789";
    let s = "";
    for (let i = 0; i < n; i++) s += chars[Math.floor(rand() * chars.length)] ?? "X";
    return s;
  };
  return names.map((name, i) => ({
    id: `cr_${i}`,
    username: name,
    wallet: `${randStr(4)}...${randStr(4)}`,
    tokensCreated: 28 - i * 2 - Math.floor(rand() * 2),
    totalMarketCap: 4_800_000 - i * 320_000 - rand() * 50_000,
    avgPerformance: 320 - i * 24 - rand() * 10,
    bestTicker: bestTickers[i] ?? "TKN",
  }));
}

export function LeaderboardCreators() {
  const creators = generateCreators();

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-[60px_2fr_1fr_1fr_1fr_1fr] items-center px-4 h-10 text-xs font-bold text-muted uppercase tracking-wider">
        <div>Rank</div>
        <div>Creator</div>
        <div className="text-center">Tokens</div>
        <div className="text-center">Total MCap</div>
        <div className="text-center">Avg Perf</div>
        <div className="text-center">Best</div>
      </div>
      <div className="divide-y divide-[#0D0D14]">
        {creators.map((c, i) => (
          <div
            key={c.id}
            className="grid grid-cols-[60px_2fr_1fr_1fr_1fr_1fr] items-center px-4 h-16 text-xs hover:bg-[#1A1A22] transition-colors cursor-pointer"
          >
            <div>
              <RankBadge rank={i + 1} />
            </div>
            <div className="flex items-center gap-3 min-w-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={flamePlaceholder(c.wallet)}
                alt=""
                className="h-10 w-10 rounded-full bg-[#0D0D14] shrink-0 object-cover"
              />
              <div className="min-w-0 flex flex-col gap-1">
                <span className="text-white font-bold text-sm leading-none truncate">
                  {c.username ?? c.wallet}
                </span>
                <span className="text-muted text-[10px] leading-none truncate">{c.wallet}</span>
              </div>
            </div>
            <div className="text-center text-white font-bold">{c.tokensCreated}</div>
            <div className="text-center text-white font-bold">
              {formatNumber(c.totalMarketCap, { compact: true })}
            </div>
            <div className="text-center text-orange font-bold">
              {c.avgPerformance >= 0 ? "+" : ""}
              {c.avgPerformance.toFixed(0)}%
            </div>
            <div className="text-center text-orange font-bold uppercase">{c.bestTicker}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
