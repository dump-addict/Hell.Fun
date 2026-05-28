import Link from "next/link";
import type { Token } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { RankBadge } from "./RankBadge";

export function LeaderboardTokens({ tokens }: { tokens: Token[] }) {
  // Trier par market cap décroissant (mock — le back triera selon la période choisie)
  const ranked = [...tokens].sort((a, b) => b.marketCap - a.marketCap);

  return (
    <div className="flex flex-col">
      <div className="divide-y divide-[#0D0D14]">
        {ranked.map((t, i) => (
          <Link
            key={t.id}
            href={`/token/${t.id}`}
            className="grid grid-cols-[40px_1.5fr_1fr_1fr] gap-3 lg:grid-cols-[60px_2fr_1fr_1fr_1fr_1fr] lg:gap-0 items-center px-4 h-16 text-xs hover:bg-[#1A1A22] transition-colors"
          >
            <div>
              <RankBadge rank={i + 1} />
            </div>
            <div className="flex items-center gap-3 min-w-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.imageUrl}
                alt={t.ticker}
                className="h-10 w-10 rounded-[8px] object-cover bg-[#0D0D14] shrink-0"
              />
              <div className="min-w-0 flex flex-col gap-1">
                <span className="text-orange font-bold text-sm leading-none uppercase truncate">
                  {t.ticker}
                </span>
                <span className="text-white text-xs font-medium leading-none truncate">
                  {t.name}
                </span>
              </div>
            </div>
            <div className="text-center text-white font-bold">
              {formatNumber(t.marketCap, { compact: true })}
            </div>
            <div className="hidden lg:block text-center text-white font-bold">
              {formatNumber(t.volume24h, { compact: true })}
            </div>
            <div className="hidden lg:block text-center text-white font-bold">
              {t.holders.toLocaleString("en-US")}
            </div>
            <div className="text-center text-orange font-bold">
              {t.priceChange24h >= 0 ? "+" : ""}
              {t.priceChange24h}%
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
