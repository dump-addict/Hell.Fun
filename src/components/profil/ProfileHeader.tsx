"use client";

import { Copy, Globe, Pencil, Send } from "lucide-react";
import { useState } from "react";
import { flamePlaceholder } from "@/lib/placeholder";
import { shortenAddress } from "@/lib/utils";

interface ProfileHeaderProps {
  username: string;
  address: string;
  bio: string;
  socials: { twitter?: string; telegram?: string; website?: string };
  joinedAt: Date;
}

export function ProfileHeader({ username, address, bio, socials, joinedAt }: ProfileHeaderProps) {
  const [copied, setCopied] = useState(false);

  function copyAddress() {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const avatarUrl = flamePlaceholder(`profile-${address}`);
  const bannerUrl = flamePlaceholder(`banner-${address}`, { wide: true });

  return (
    <section className="bg-section shadow-inset rounded-[16px] overflow-hidden">
      {/* Banner */}
      <div className="relative aspect-[6/1] bg-[#0D0D14]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={bannerUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
      </div>

      {/* Dark zone : avatar (bas-gauche overlap moitié-moitié) | infos | actions (centrées vertical) */}
      <div className="px-[15px] pb-[15px] flex items-center gap-4">
        {/* Avatar — bas-gauche, moitié banner / moitié dark, premier plan */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={avatarUrl}
          alt={username}
          className="self-start relative z-10 h-32 w-32 rounded-[16px] object-cover bg-[#0D0D14] shadow-inset shrink-0 -mt-16 ring-4 ring-section"
        />

        {/* Identity (droite de l'avatar) */}
        <div className="self-start flex-1 min-w-0 flex flex-col gap-2 pt-[15px]">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h2 className="text-xl font-extrabold text-white leading-none">{username}</h2>
            <button
              type="button"
              onClick={copyAddress}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-orange hover:brightness-125 transition shrink-0"
            >
              <span>{shortenAddress(address, 6, 4)}</span>
              <Copy className="h-3 w-3" strokeWidth={2.5} />
              {copied && <span className="ml-1 text-white">Copied!</span>}
            </button>
            <span className="text-[11px] text-muted">
              · Joined {joinedAt.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </span>
          </div>
          <p className="text-sm text-white leading-snug">{bio}</p>
        </div>

        {/* Actions (extrême droite — centrées verticalement par items-center du parent) */}
        <div className="flex items-center gap-2 shrink-0">
          {socials.twitter && (
            <SocialBtn href={socials.twitter} label="X">
              <XIcon className="h-4 w-4" />
            </SocialBtn>
          )}
          {socials.telegram && (
            <SocialBtn href={socials.telegram} label="Telegram">
              <Send className="h-4 w-4" strokeWidth={2} />
            </SocialBtn>
          )}
          {socials.website && (
            <SocialBtn href={socials.website} label="Website">
              <Globe className="h-4 w-4" strokeWidth={2} />
            </SocialBtn>
          )}
          <button
            type="button"
            className="h-10 px-4 inline-flex items-center gap-2 rounded-[10px] bg-orange shadow-glow text-white font-bold text-[13px] hover:brightness-110 active:scale-[0.99] transition-all"
          >
            <Pencil className="h-3.5 w-3.5" strokeWidth={2.5} />
            Edit
          </button>
        </div>
      </div>
    </section>
  );
}

function SocialBtn({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
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
