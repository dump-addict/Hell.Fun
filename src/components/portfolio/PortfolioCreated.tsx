import Link from "next/link";
import type { Token } from "@/lib/types";
import { formatNumber, timeAgo } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function PortfolioCreated({ tokens }: { tokens: Token[] }) {
  if (tokens.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
        <span className="text-sm text-muted">You haven&apos;t created any token yet.</span>
        <Link
          href="/create"
          className="h-10 px-5 inline-flex items-center rounded-[10px] bg-orange shadow-glow text-white font-bold text-[13px] hover:brightness-110 active:scale-[0.99] transition-all"
        >
          Create Token
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[15px]">
      {tokens.map((t) => (
        <Link
          key={t.id}
          href={`/token/${t.id}`}
          className="bg-[#0D0D14] shadow-inset rounded-[12px] p-4 flex flex-col gap-3 hover:ring-1 hover:ring-orange/40 transition-all"
        >
          <header className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={t.imageUrl}
              alt={t.ticker}
              className="h-12 w-12 rounded-[10px] object-cover bg-section shrink-0"
            />
            <div className="min-w-0">
              <div className="text-sm font-bold text-orange uppercase leading-none">{t.ticker}</div>
              <div className="text-xs text-white font-medium mt-1 truncate">{t.name}</div>
            </div>
          </header>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex flex-col gap-0.5">
              <span className="text-muted">Market Cap</span>
              <span className="text-white font-bold">
                {formatNumber(t.marketCap, { compact: true })}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-muted">Created</span>
              <span className="text-white font-bold">{timeAgo(t.createdAt)}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-muted">Bonding</span>
              <span className="text-orange font-bold">{t.bondingCurveProgress}%</span>
            </div>
            <ProgressBar progress={t.bondingCurveProgress} />
          </div>
        </Link>
      ))}
    </div>
  );
}
