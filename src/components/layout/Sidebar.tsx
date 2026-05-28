"use client";

import { Home, Wallet, Crown, ArrowLeftRight, User, Send, Headphones, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

const NAV: { href: string; label: string; icon: typeof Home }[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/portfolio", label: "Porrfolio", icon: Wallet },
  { href: "/leaderboard", label: "Leaderboard", icon: Crown },
  { href: "/bridge", label: "Bridge", icon: ArrowLeftRight },
  { href: "/profil", label: "Profil", icon: User },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex flex-col gap-[15px] w-[202px] shrink-0",
        // Desktop : sticky standard
        "lg:sticky lg:top-[15px] lg:h-[calc(100vh-30px)]",
        // Mobile : fixed drawer
        "max-lg:fixed max-lg:inset-y-[15px] max-lg:left-[15px] max-lg:z-50",
        "max-lg:transition-transform max-lg:duration-300 max-lg:ease-out",
        !mobileOpen && "max-lg:-translate-x-[calc(100%+30px)]",
      )}
    >
      {/* Card 1 : Logo + close button (mobile) */}
      <div className="bg-section shadow-inset rounded-[16px] p-2.5 flex items-center justify-between gap-2">
        <Logo />
        <button
          type="button"
          onClick={onMobileClose}
          aria-label="Close menu"
          className="lg:hidden h-9 w-9 flex items-center justify-center rounded-[8px] bg-[#0D0D14] shadow-inset text-white hover:text-orange transition-colors shrink-0"
        >
          <X className="h-4 w-4" strokeWidth={2.5} />
        </button>
      </div>

      {/* Card 2 : Nav items */}
      <div className="flex-1 bg-section shadow-inset rounded-[16px] p-2 flex flex-col">
        <nav className="flex flex-col gap-1">
          {NAV.map(({ href, label, icon: Icon }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={onMobileClose}
                className={cn(
                  "flex items-center gap-2.5 h-10 px-3 rounded-[10px] text-sm font-bold transition-colors text-left",
                  isActive
                    ? "bg-orange text-white shadow-glow"
                    : "text-white hover:bg-[#1A1A22]",
                )}
              >
                <Icon className="h-[18px] w-[18px] shrink-0 text-white" strokeWidth={2} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Socials row — 4 carrés 43x43, gap 10px */}
      <div className="flex items-center gap-[10px]">
        <SocialBtn ariaLabel="X (Twitter)">
          <XIcon className="h-4 w-4" />
        </SocialBtn>
        <SocialBtn ariaLabel="Telegram">
          <Send className="h-4 w-4" strokeWidth={2} />
        </SocialBtn>
        <SocialBtn ariaLabel="GitHub">
          <GithubIcon className="h-4 w-4" />
        </SocialBtn>
        <SocialBtn ariaLabel="Support">
          <Headphones className="h-4 w-4" strokeWidth={2} />
        </SocialBtn>
      </div>

      {/* CTA Create Token */}
      <Link
        href="/create"
        onClick={onMobileClose}
        className="h-11 w-full inline-flex items-center justify-center rounded-[10px] bg-orange shadow-glow text-white font-bold text-[13px] hover:brightness-110 active:scale-[0.99] transition-all"
      >
        Create Token
      </Link>
    </aside>
  );
}

function SocialBtn({ children, ariaLabel }: { children: React.ReactNode; ariaLabel: string }) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="h-[43px] w-[43px] flex items-center justify-center rounded-[10px] bg-section shadow-inset text-white hover:text-orange transition-colors"
    >
      {children}
    </button>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.468-2.381 1.235-3.221-.124-.303-.535-1.524.118-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.371.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.299 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}
