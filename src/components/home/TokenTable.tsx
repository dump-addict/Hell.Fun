import { Globe, Send } from "lucide-react";
import type { Token } from "@/lib/types";
import { formatNumber, shortenAddress, timeAgo } from "@/lib/utils";
import { TokenAvatar } from "@/components/ui/TokenAvatar";

interface TokenTableProps {
  tokens: Token[];
}

// CSS Grid garantit que les labels du header et les valeurs des rows sont
// PILE alignés sur les mêmes colonnes.
// Ratios rééquilibrés — Bonding rétréci pour être proche des autres colonnes.
// Les 3 dernières colonnes (5M, 1H, 24H) ont le même fr pour un spacing visuel uniforme.
const GRID_COLS = "180fr 110fr 170fr 100fr 80fr 90fr 100fr 110fr 100fr 100fr 100fr 100fr";

const HEADERS = [
  "Token",
  "",
  "Bonding",
  "Market Cap",
  "Age",
  "Holders",
  "TXNS (24)",
  "Creator",
  "Vol (24H)",
  "5M",
  "1H",
  "24H",
];

export function TokenTable({ tokens }: TokenTableProps) {
  return (
    <div className="bg-section shadow-inset rounded-[16px] p-1.5 overflow-x-auto no-scrollbar [&>*]:min-w-[1100px]">
      {/* Header */}
      <div
        className="bg-orange shadow-glow rounded-[12px] h-11 grid items-center px-4 gap-6 text-white text-xs font-extrabold"
        style={{ gridTemplateColumns: GRID_COLS }}
      >
        {HEADERS.map((label, i) => (
          <div key={i}>{label}</div>
        ))}
      </div>

      {/* Rows */}
      <div className="flex flex-col divide-y divide-[#0D0D14]">
        {tokens.map((t) => (
          <Row key={t.id} token={t} />
        ))}
      </div>
    </div>
  );
}

function Row({ token }: { token: Token }) {
  return (
    <div
      role="button"
      tabIndex={0}
      className="grid items-center px-4 h-[60px] gap-6 hover:bg-[#1A1A22] transition-colors text-xs text-white"
      style={{ gridTemplateColumns: GRID_COLS }}
    >
      {/* Token (avatar + ticker + name) */}
      <div className="flex items-center gap-3 min-w-0">
        <TokenAvatar
          src={token.imageUrl}
          alt={token.ticker}
          fallbackSeed={`${token.id}-${token.ticker}`}
          className="h-10 w-10 rounded-[8px] object-cover shrink-0 bg-[#0D0D14]"
        />
        <div className="min-w-0 flex flex-col gap-1.5">
          <span className="text-orange font-bold text-sm leading-none uppercase truncate">
            {token.ticker}
          </span>
          <span className="text-white text-xs font-medium leading-none truncate">
            {token.name}
          </span>
        </div>
      </div>

      {/* Socials — centrés dans la colonne, espace égal à gauche et à droite */}
      <div className="flex items-center justify-center gap-3">
        <SocialLink href={token.socials.twitter} label="X">
          <XIcon className="h-3.5 w-3.5" />
        </SocialLink>
        <SocialLink href={token.socials.telegram} label="Telegram">
          <Send className="h-3.5 w-3.5" strokeWidth={2.2} />
        </SocialLink>
        <SocialLink href={token.socials.website} label="Website">
          <Globe className="h-3.5 w-3.5" strokeWidth={2.2} />
        </SocialLink>
      </div>

      {/* Bonding (bar + % badge) — pr pour pousser le badge loin de Market Cap */}
      <div className="flex items-center gap-2 min-w-0 pr-6">
        <div className="relative flex-1 h-2 rounded-[3px] bg-[#0D0D14] shadow-inset overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-orange rounded-[3px]"
            style={{ width: `${token.bondingCurveProgress}%` }}
          />
        </div>
        <span className="h-6 px-2 inline-flex items-center justify-center rounded-[6px] bg-orange text-white text-[11px] font-extrabold shadow-glow shrink-0">
          {token.bondingCurveProgress}%
        </span>
      </div>

      {/* Market Cap */}
      <div className="font-bold truncate">
        {formatNumber(token.marketCap, { compact: true })}
      </div>

      {/* Age */}
      <div className="font-bold truncate">{timeAgo(token.createdAt)}</div>

      {/* Holders */}
      <div className="font-bold truncate">{token.holders.toLocaleString("en-US")}</div>

      {/* TXNS */}
      <div className="font-bold truncate">{token.txns24h.toLocaleString("en-US")}</div>

      {/* Creator */}
      <div className="font-bold truncate">{shortenAddress(token.address, 3, 4)}</div>

      {/* Vol 24H */}
      <div className="font-bold truncate">
        {formatNumber(token.volume24h, { compact: true })}
      </div>

      {/* 5M */}
      <div className="text-orange font-bold truncate">
        {token.priceChange5m >= 0 ? "+" : ""}
        {token.priceChange5m.toFixed(2)}%
      </div>

      {/* 1H */}
      <div className="text-orange font-bold truncate">
        {token.priceChange1h >= 0 ? "+" : ""}
        {token.priceChange1h.toLocaleString("en-US", { maximumFractionDigits: 2 })}%
      </div>

      {/* 24H */}
      <div className="text-orange font-bold truncate">
        {token.priceChange24h >= 0 ? "+" : ""}
        {token.priceChange24h.toLocaleString("en-US", { maximumFractionDigits: 2 })}%
      </div>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href?: string;
  label: string;
  children: React.ReactNode;
}) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-white hover:text-orange transition-colors"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </a>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
