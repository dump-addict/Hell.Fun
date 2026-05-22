"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { SearchInput } from "@/components/ui/SearchInput";
import { WalletDropdown } from "@/components/home/WalletDropdown";

export function Header() {
  // Mock — à brancher sur la vraie connexion wallet plus tard
  const [connected, setConnected] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const showBack = pathname !== "/";

  return (
    <header className="sticky top-0 z-20 bg-bg -mt-[15px] pt-[15px] flex items-center gap-[10px] w-full relative after:content-[''] after:absolute after:left-0 after:right-0 after:top-full after:h-[7.5px] after:bg-bg after:pointer-events-none">
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
      <div className="flex-1 max-w-md">
        <SearchInput />
      </div>

      <div className="ml-auto flex items-center gap-[10px]">
        <Link
          href="/create"
          className="h-10 px-4 inline-flex items-center rounded-[10px] bg-orange shadow-glow text-white font-bold text-[13px] hover:brightness-110 active:scale-[0.99] transition-all"
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
    </header>
  );
}
