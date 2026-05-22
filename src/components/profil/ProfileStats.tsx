interface Stat {
  label: string;
  value: string;
  sub?: string;
}

const STATS: Stat[] = [
  { label: "Tokens Created", value: "7", sub: "2 active" },
  { label: "Total Trades", value: "342", sub: "78% win" },
  { label: "Volume", value: "$1.28M", sub: "+12% (30d)" },
  { label: "Followers", value: "1,247", sub: "+47 this week" },
];

export function ProfileStats() {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-[15px]">
      {STATS.map((s) => (
        <div key={s.label} className="bg-section shadow-inset rounded-[16px] p-4 flex flex-col gap-2">
          <span className="text-xs font-bold text-muted uppercase tracking-wider">{s.label}</span>
          <span className="text-2xl font-extrabold text-white leading-none">{s.value}</span>
          {s.sub && <span className="text-xs font-bold text-orange">{s.sub}</span>}
        </div>
      ))}
    </section>
  );
}
