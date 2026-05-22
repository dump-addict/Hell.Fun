import { shortenAddress, timeAgo } from "@/lib/utils";
import { flamePlaceholder } from "@/lib/placeholder";

interface Tx {
  id: string;
  type: "buy" | "sell";
  user: string;
  solAmount: number;
  tokenAmount: number;
  at: Date;
}

function generateTxs(seed: string, n: number): Tx[] {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  const rand = () => {
    h = (h * 9301 + 49297) % 233280;
    return h / 233280;
  };
  return Array.from({ length: n }, (_, i) => ({
    id: `tx_${i}`,
    type: rand() > 0.55 ? "buy" : "sell",
    user: `${randStr(rand)}${randStr(rand)}...${randStr(rand)}${randStr(rand)}`,
    solAmount: 0.05 + rand() * 4.2,
    tokenAmount: Math.floor(10_000 + rand() * 500_000),
    at: new Date(Date.now() - i * 60_000 * (1 + rand() * 5)),
  }));
}
function randStr(rand: () => number): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz123456789";
  return chars[Math.floor(rand() * chars.length)] ?? "X";
}

export function TokenTransactions({ tokenId }: { tokenId: string }) {
  const txs = generateTxs(tokenId, 14);

  return (
    <div className="flex flex-col gap-3">
      {/* Header — header line on same bg as parent */}
      <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center px-4 h-10 text-xs font-bold text-muted uppercase tracking-wider">
        <div>Type</div>
        <div>Wallet</div>
        <div className="text-center">LIT</div>
        <div className="text-center">{tokenId.toUpperCase()}</div>
        <div className="text-center">Time</div>
      </div>

      {/* Rows — scroll interne */}
      <div className="divide-y divide-[#0D0D14] max-h-[360px] overflow-y-auto">
        {txs.map((tx) => (
          <div
            key={tx.id}
            className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center px-4 h-14 text-xs text-white"
          >
            <div>
              <span
                className={
                  tx.type === "buy"
                    ? "text-orange font-bold uppercase"
                    : "text-[#E54339] font-bold uppercase"
                }
              >
                {tx.type}
              </span>
            </div>
            <div className="flex items-center gap-2.5 min-w-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={flamePlaceholder(tx.user)}
                alt=""
                className="h-8 w-8 rounded-full shrink-0 object-cover bg-[#0D0D14]"
              />
              <span className="font-bold text-white truncate">{shortenAddress(tx.user)}</span>
            </div>
            <div className="text-center font-bold">{tx.solAmount.toFixed(2)}</div>
            <div className="text-center font-bold">
              {tx.tokenAmount.toLocaleString("en-US")}
            </div>
            <div className="text-center text-muted">{timeAgo(tx.at)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
