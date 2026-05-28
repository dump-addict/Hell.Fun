import { cn } from "@/lib/utils";

/**
 * Badge de rang pour les leaderboards.
 * - Top 1-3 : carré orange brûlant avec inset glow
 * - Top 4-10 : carré orange foncé
 * - >10 : carré creusé neutre
 */
export function RankBadge({ rank }: { rank: number }) {
  const isTop3 = rank <= 3;
  const isTop10 = rank <= 10;

  return (
    <span
      className={cn(
        "h-10 w-10 flex items-center justify-center rounded-[8px] text-xs font-extrabold shrink-0",
        isTop3 && "bg-orange shadow-glow text-white",
        !isTop3 && isTop10 && "bg-orange-soft text-white",
        !isTop10 && "bg-[#0D0D14] shadow-inset text-muted-2",
      )}
    >
      {rank}
    </span>
  );
}
