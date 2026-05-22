import { Clock, Users, Globe, Send, Reply } from "lucide-react";
import Link from "next/link";
import type { Token } from "@/lib/types";
import { formatNumber, shortenAddress, timeAgo } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface TokenCardProps {
  token: Token;
}

export function TokenCard({ token }: TokenCardProps) {
  return (
    <Link href={`/token/${token.id}`} className="block">
    <article className="bg-section shadow-inset rounded-[16px] p-4 flex flex-col gap-3 hover:ring-1 hover:ring-orange/40 transition-all">
      {/* Header : avatar + info + socials. Le bloc texte fait pile la hauteur de l'avatar. */}
      <header className="flex gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={token.imageUrl}
          alt={token.ticker}
          className="h-14 w-14 rounded-[10px] object-cover shrink-0 bg-[#0D0D14]"
        />

        <div className="flex-1 min-w-0 h-14 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 leading-none">
            <div className="flex items-baseline gap-2 min-w-0">
              <span className="text-sm font-extrabold text-white">{token.ticker}</span>
              <span className="text-[11px] font-bold text-orange truncate">
                {shortenAddress(token.address)}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
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
          </div>

          <p className="text-xs font-bold text-white truncate leading-none">{token.name}</p>
          <p className="text-[11px] text-muted leading-none line-clamp-1">
            {token.description}
          </p>
        </div>
      </header>

      {/* Stats */}
      <div className="flex flex-col gap-1.5 text-xs">
        <Stat label="Market Cap" value={formatNumber(token.marketCap, { compact: true })} />
        <Stat label="Volume (24h)" value={formatNumber(token.volume24h, { compact: true })} />
        <Stat
          label="Price change (24h)"
          value={`${token.priceChange24h > 0 ? "+" : ""}${token.priceChange24h}%`}
          accent
        />
        <Stat label="Bonding Curve Progress" value={`${token.bondingCurveProgress}%`} accent />
        <ProgressBar progress={token.bondingCurveProgress} className="mt-1" />
      </div>

      {/* Footer : 3 infos space-between */}
      <footer className="flex items-center justify-between text-muted-2 text-xs pt-1">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" strokeWidth={2} />
          {timeAgo(token.createdAt)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" strokeWidth={2} />
          {token.holders}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Reply className="h-3.5 w-3.5" strokeWidth={2} />
          {token.replies}
        </span>
      </footer>
    </article>
    </Link>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted">{label}</span>
      <span className={accent ? "text-orange font-bold" : "text-white font-bold"}>{value}</span>
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
