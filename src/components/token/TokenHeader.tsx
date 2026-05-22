"use client";

import { Copy, Globe, Send } from "lucide-react";
import { useState } from "react";
import type { Token } from "@/lib/types";
import { shortenAddress } from "@/lib/utils";

export function TokenHeader({ token }: { token: Token }) {
  const [copied, setCopied] = useState(false);

  function copyAddress() {
    navigator.clipboard.writeText(token.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="bg-section shadow-inset rounded-[16px] p-4 flex items-center gap-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={token.imageUrl}
        alt={token.ticker}
        className="h-14 w-14 rounded-[10px] object-cover shrink-0 bg-[#0D0D14]"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-3">
          <span className="text-xl font-extrabold text-white uppercase">{token.ticker}</span>
          <span className="text-sm font-medium text-muted truncate">{token.name}</span>
        </div>
        <button
          type="button"
          onClick={copyAddress}
          className="mt-1 inline-flex items-center gap-1.5 text-xs font-bold text-orange hover:brightness-125 transition"
        >
          <span>{shortenAddress(token.address, 6, 4)}</span>
          <Copy className="h-3 w-3" strokeWidth={2.5} />
          {copied && <span className="ml-1 text-white">Copied!</span>}
        </button>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {token.socials.twitter && (
          <SocialBtn href={token.socials.twitter} ariaLabel="X">
            <XIcon className="h-4 w-4" />
          </SocialBtn>
        )}
        {token.socials.telegram && (
          <SocialBtn href={token.socials.telegram} ariaLabel="Telegram">
            <Send className="h-4 w-4" strokeWidth={2} />
          </SocialBtn>
        )}
        {token.socials.website && (
          <SocialBtn href={token.socials.website} ariaLabel="Website">
            <Globe className="h-4 w-4" strokeWidth={2} />
          </SocialBtn>
        )}
      </div>
    </div>
  );
}

function SocialBtn({
  href,
  ariaLabel,
  children,
}: {
  href: string;
  ariaLabel: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="h-10 w-10 flex items-center justify-center rounded-[10px] bg-[#0D0D14] shadow-inset text-white hover:text-orange transition-colors"
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
