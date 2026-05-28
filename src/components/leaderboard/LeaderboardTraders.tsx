import { flamePlaceholder } from "@/lib/placeholder";
import { formatNumber } from "@/lib/utils";
import { RankBadge } from "./RankBadge";

interface Trader {
  id: string;
  username?: string;
  wallet: string;
  pnlUsd: number;
  winRate: number;
  trades: number;
  volumeUsd: number;
}

function generateTraders(): Trader[] {
  const names = [
    "infernovault",
    "ashking",
    "molten",
    "burnboy",
    "pyrolord",
    undefined,
    undefined,
    "smokingjay",
    undefined,
    "embergod",
    undefined,
    "soloflame",
    undefined,
    undefined,
    "vlad",
  ];
  let h = 7;
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
    id: `tr_${i}`,
    username: name,
    wallet: `${randStr(4)}...${randStr(4)}`,
    pnlUsd: 245_000 - i * 17_500 - rand() * 5_000,
    winRate: 88 - i * 2 - rand() * 4,
    trades: 2400 - i * 100 - Math.floor(rand() * 50),
    volumeUsd: 1_280_000 - i * 60_000 - rand() * 20_000,
  }));
}

export function LeaderboardTraders() {
  const traders = generateTraders();

  return (
    <div className="flex flex-col">
      <div className="divide-y divide-[#0D0D14]">
        {traders.map((t, i) => (
          <div
            key={t.id}
            className="grid grid-cols-[40px_1.5fr_1fr_1fr] gap-3 lg:grid-cols-[60px_2fr_1fr_1fr_1fr_1fr] lg:gap-0 items-center px-4 h-16 text-xs hover:bg-[#1A1A22] transition-colors cursor-pointer"
          >
            <div>
              <RankBadge rank={i + 1} />
            </div>
            <div className="flex items-center gap-3 min-w-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={flamePlaceholder(t.wallet)}
                alt=""
                className="h-10 w-10 rounded-full bg-[#0D0D14] shrink-0 object-cover"
              />
              <div className="min-w-0 flex flex-col gap-1">
                <span className="text-white font-bold text-sm leading-none truncate">
                  {t.username ?? t.wallet}
                </span>
                <span className="text-muted text-[10px] leading-none truncate">
                  {t.wallet}
                </span>
              </div>
            </div>
            <div className={t.pnlUsd >= 0 ? "text-center text-orange font-bold" : "text-center text-[#E54339] font-bold"}>
              {t.pnlUsd >= 0 ? "+" : "-"}
              {formatNumber(Math.abs(t.pnlUsd), { compact: true })}
            </div>
            <div className="hidden lg:block text-center text-white font-bold">{t.winRate.toFixed(1)}%</div>
            <div className="hidden lg:block text-center text-white font-bold">
              {t.trades.toLocaleString("en-US")}
            </div>
            <div className="text-center text-white font-bold">
              {formatNumber(t.volumeUsd, { compact: true })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
