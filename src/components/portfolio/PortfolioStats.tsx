import { cn } from "@/lib/utils";

interface StatCard {
  label: string;
  value: string;
  sub?: string;
  subTone?: "positive" | "negative" | "muted";
}

const STATS: StatCard[] = [
  { label: "Portfolio Value", value: "$12,847.32", sub: "across 6 tokens", subTone: "muted" },
  { label: "P&L (24h)", value: "+$1,247.83", sub: "+10.74%", subTone: "positive" },
  { label: "P&L All-Time", value: "+$4,892.10", sub: "+61.42%", subTone: "positive" },
  { label: "Available Balance", value: "4.21 LIT", sub: "~$842.00", subTone: "muted" },
];

export function PortfolioStats() {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-[15px]">
      {STATS.map((s) => (
        <div key={s.label} className="bg-section shadow-inset rounded-[16px] p-4 flex flex-col gap-2">
          <span className="text-xs font-bold text-muted uppercase tracking-wider">{s.label}</span>
          <span className="text-2xl font-extrabold text-white leading-none">{s.value}</span>
          {s.sub && (
            <span
              className={cn(
                "text-xs font-bold",
                s.subTone === "positive" && "text-orange",
                s.subTone === "negative" && "text-[#E54339]",
                s.subTone === "muted" && "text-muted",
              )}
            >
              {s.sub}
            </span>
          )}
        </div>
      ))}
    </section>
  );
}
