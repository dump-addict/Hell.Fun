import type { Token } from "@/lib/types";
import { formatNumber, cn } from "@/lib/utils";

/**
 * Grid stats juste sous la chart : Vol 24h / Price / 5m / 1h / 6h
 * Layout : row 1 (3 cellules) + row 2 (2 cellules plus larges).
 */
export function TokenPriceStats({ token }: { token: Token }) {
  // Prix mock dérivé du marketCap (à brancher sur la vraie data plus tard)
  const price = token.marketCap / 800_000_000_000;

  return (
    <section className="grid grid-cols-6 gap-[10px]">
      <StatCell className="col-span-2" label="Vol 24h" value={formatNumber(token.volume24h, { compact: true })} />
      <StatCell className="col-span-2" label="Price" value={`$${price.toFixed(8)}`} />
      <StatCell className="col-span-2" label="5m" value={token.priceChange5m} accent />

      <StatCell className="col-span-3" label="1h" value={token.priceChange1h} accent />
      <StatCell className="col-span-3" label="6h" value={token.priceChange6h} accent />
    </section>
  );
}

function StatCell({
  label,
  value,
  accent,
  className,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
  className?: string;
}) {
  const isPercent = typeof value === "number";
  const display = isPercent ? `${value >= 0 ? "+" : ""}${value.toFixed(2)}%` : value;
  const valueColor = accent
    ? isPercent && (value as number) < 0
      ? "text-muted-2"
      : "text-orange"
    : "text-white";

  return (
    <div className={cn("bg-section shadow-inset rounded-[12px] px-4 py-3 flex flex-col items-center gap-1", className)}>
      <span className="text-xs text-muted">{label}</span>
      <span className={cn("text-sm font-bold", valueColor)}>{display}</span>
    </div>
  );
}
