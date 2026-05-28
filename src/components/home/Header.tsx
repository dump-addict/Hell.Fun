"use client";

import { ArrowLeft, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SearchInput } from "@/components/ui/SearchInput";
import { WalletDropdown } from "@/components/home/WalletDropdown";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [connected, setConnected] = useState(true);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const mobileInputRef = useRef<HTMLInputElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const showBack = pathname !== "/";

  // Auto-focus l'input quand le search overlay s'ouvre
  useEffect(() => {
    if (mobileSearchOpen) mobileInputRef.current?.focus();
  }, [mobileSearchOpen]);

  return (
    <header className="sticky top-0 z-30 bg-bg -mt-[15px] pt-[15px] flex items-center gap-[10px] w-full relative after:content-[''] after:absolute after:left-0 after:right-0 after:top-full after:h-[7.5px] after:bg-bg after:pointer-events-none">
      {/* Mobile : bouton hamburger */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open menu"
        className="lg:hidden h-10 w-10 flex items-center justify-center rounded-[10px] bg-section shadow-inset text-white hover:text-orange transition-colors shrink-0"
      >
        <Menu className="h-5 w-5" strokeWidth={2.5} />
      </button>

      {showBack && (
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Back"
          className="h-10 w-10 flex items-center justify-center rounded-[10px] bg-section shadow-inset text-white hover:text-orange transition-colors shrink-0"
        >
          <ArrowLeft className="h-5 w-5" strokeWidth={2.5} />
        </button>
      )}

      {/* Search mobile : bouton icône → ouvre l'overlay */}
      <button
        type="button"
        onClick={() => setMobileSearchOpen(true)}
        aria-label="Search"
        className="sm:hidden h-10 w-10 flex items-center justify-center rounded-[10px] bg-section shadow-inset text-white hover:text-orange transition-colors shrink-0"
      >
        <Search className="h-4 w-4" strokeWidth={2.5} />
      </button>

      {/* Search desktop : input complet */}
      <div className="hidden sm:block flex-1 max-w-md min-w-0">
        <SearchInput />
      </div>

      <div className="ml-auto flex items-center gap-[10px]">
        <Link
          href="/create"
          className="hidden sm:inline-flex h-10 px-4 items-center rounded-[10px] bg-orange shadow-glow text-white font-bold text-[13px] hover:brightness-110 active:scale-[0.99] transition-all"
        >
          Create Token
        </Link>

        {connected ? (
          <WalletDropdown balanceUsd={1247.83} balanceNative={4.21} />
        ) : (
          <button
            type="button"
            onClick={() => setConnected(true)}
            className="h-10 px-4 rounded-[10px] bg-orange shadow-glow text-white font-bold text-[13px] hover:brightness-110 active:scale-[0.99] transition-all"
          >
            Connect Wallet
          </button>
        )}
      </div>

      {/* Mobile search overlay (full-width au-dessus du header) */}
      {mobileSearchOpen && (
        <div className="absolute left-0 right-0 top-[15px] z-30 sm:hidden flex items-center gap-2 h-10 bg-section shadow-inset rounded-[10px] px-3.5">
          <Search className="h-4 w-4 text-muted shrink-0" strokeWidth={2.5} />
          <input
            ref={mobileInputRef}
            type="text"
            placeholder="Search Tokens"
            className="flex-1 bg-transparent text-white text-sm placeholder:text-muted focus:outline-none min-w-0"
          />
          <button
            type="button"
            onClick={() => setMobileSearchOpen(false)}
            aria-label="Close search"
            className="h-7 w-7 flex items-center justify-center rounded-[6px] text-muted hover:text-orange transition-colors shrink-0"
          >
            <X className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>
      )}
    </header>
  );
}
