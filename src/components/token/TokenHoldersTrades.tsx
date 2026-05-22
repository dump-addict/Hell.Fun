"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { TokenHolders } from "./TokenHolders";
import { TokenTransactions } from "./TokenTransactions";

type Tab = "holders" | "trades";

export function TokenHoldersTrades({
  tokenId,
  ticker,
}: {
  tokenId: string;
  ticker: string;
}) {
  const [tab, setTab] = useState<Tab>("holders");

  return (
    <section className="bg-section shadow-inset rounded-[16px] p-4 flex flex-col gap-4">
      <SegmentedControl<Tab>
        segments={[
          { value: "holders", label: "Holders", width: "50%" },
          { value: "trades", label: "Trades", width: "50%" },
        ]}
        value={tab}
        onChange={setTab}
        className="w-[200px]"
      />

      {tab === "holders" ? (
        <TokenHolders tokenId={tokenId} />
      ) : (
        <TokenTransactions tokenId={ticker} />
      )}
    </section>
  );
}
