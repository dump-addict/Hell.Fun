import Link from "next/link";
import type { Token } from "@/lib/types";
import { TokenCard } from "@/components/home/TokenCard";

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
        <TokenCard key={t.id} token={t} className="bg-[#0D0D14]" />
      ))}
    </div>
  );
}
