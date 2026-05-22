import type { Token } from "@/lib/types";
import { TokenHeader } from "./TokenHeader";
import { TokenChart } from "./TokenChart";
import { TokenPriceStats } from "./TokenPriceStats";
import { SwapWidget } from "./SwapWidget";
import { TokenStats } from "./TokenStats";
import { TokenHoldersTrades } from "./TokenHoldersTrades";
import { TokenComments } from "./TokenComments";

export function TokenPageView({ token }: { token: Token }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-[15px]">
      {/* Colonne gauche : header + chart + price stats + holders/trades tabs + comments */}
      <div className="flex flex-col gap-[15px] min-w-0">
        <TokenHeader token={token} />
        <TokenChart tokenId={token.id} />
        <TokenPriceStats token={token} />
        <TokenHoldersTrades tokenId={token.id} ticker={token.ticker} />
        <TokenComments />
      </div>

      {/* Colonne droite : swap + stats — FIXE au scroll */}
      <aside className="flex flex-col gap-[15px] lg:sticky lg:top-[70px] lg:self-start lg:h-[calc(100vh-85px)] lg:overflow-y-auto no-scrollbar">
        <SwapWidget token={token} />
        <TokenStats token={token} />
      </aside>
    </div>
  );
}
