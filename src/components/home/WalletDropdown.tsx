"use client";

import { ArrowDownLeft, ArrowLeftRight, ChevronDown, Copy, CreditCard, Eye, History } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn, shortenAddress } from "@/lib/utils";
import { flamePlaceholder } from "@/lib/placeholder";

interface WalletDropdownProps {
  /** mock "connecté" pour montrer l'UI. Le dev back branchera sur la vraie connexion */
  balanceUsd?: number;
  balanceNative?: number;
  address?: string;
}

export function WalletDropdown({
  balanceUsd = 0,
  balanceNative = 0,
  address = "2bvtABcD1234EfGh5678IjKl9012MnOpQrStUvWxFHXE",
}: WalletDropdownProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  function copyAddress() {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const avatarUrl = flamePlaceholder(`wallet-${address}`);

  return (
    <div className="relative flex items-center gap-[10px]" ref={ref}>
      {/* Pill balance — déclenche le dropdown */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="h-10 px-3 flex items-center gap-2 bg-section shadow-inset rounded-[10px] text-white text-[13px] font-bold transition-colors hover:text-orange"
      >
        <Image
          src="/lighter-logo.jpeg"
          alt="LIT"
          width={18}
          height={18}
          className="h-[18px] w-[18px] rounded-full object-cover"
        />
        <span>${balanceUsd.toFixed(2)}</span>
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
          strokeWidth={2.5}
        />
      </button>

      {/* Avatar — carré comme les boutons */}
      <div className="h-10 w-10 rounded-[10px] overflow-hidden bg-section shadow-inset">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={avatarUrl} alt="Profile" className="h-full w-full object-cover" />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-[380px] bg-section shadow-inset rounded-[16px] p-5 flex flex-col gap-4">
          {/* Header balance — colonne gauche (texte) | colonne droite (address pill + icônes) */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span className="text-xs font-bold text-muted uppercase tracking-wider">
                Your Balance
              </span>
              <div className="text-3xl font-extrabold text-white mt-1 leading-none truncate">
                ${balanceUsd.toFixed(2)}
              </div>
              <div className="text-xs text-muted mt-2">
                <span className="text-white font-bold">{balanceNative}</span> LIT{" "}
                <span className="ml-1">Available</span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3 shrink-0">
              {/* Address pill (au-dessus) */}
              <button
                type="button"
                onClick={copyAddress}
                className="inline-flex items-center gap-2 px-3 h-8 rounded-full bg-[#0D0D14] shadow-inset text-xs font-bold text-orange hover:brightness-125 transition"
              >
                <span>{shortenAddress(address)}</span>
                <Copy className="h-3 w-3" strokeWidth={2.5} />
                {copied && <span className="ml-1 text-white">Copied!</span>}
              </button>

              {/* Icônes (swap + eye) en dessous */}
              <div className="flex items-center gap-3 text-muted">
                <button type="button" aria-label="Swap" className="hover:text-orange transition-colors">
                  <ArrowLeftRight className="h-4 w-4" strokeWidth={2} />
                </button>
                <button type="button" aria-label="Hide balance" className="hover:text-orange transition-colors">
                  <Eye className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>

          {/* Grid d'actions 2x2 */}
          <div className="grid grid-cols-2 gap-3">
            <ActionTile icon={ArrowDownLeft} title="Deposit" subtitle="Crypto transfer" />
            <ActionTile icon={ArrowLeftRight} title="Trade" subtitle="Browse coins" />
            <ActionTile icon={CreditCard} title="Buy crypto" subtitle="Card / bank" />
            <ActionTile icon={History} title="History" subtitle="All activity" />
          </div>
        </div>
      )}
    </div>
  );
}

function ActionTile({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: typeof ArrowDownLeft;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      type="button"
      className="bg-[#0D0D14] shadow-inset rounded-[12px] p-4 text-left hover:ring-1 hover:ring-orange/40 transition-all flex flex-col gap-2"
    >
      <div className="h-9 w-9 rounded-[8px] bg-section flex items-center justify-center text-orange">
        <Icon className="h-4 w-4" strokeWidth={2.5} />
      </div>
      <div>
        <div className="text-sm font-bold text-white leading-none">{title}</div>
        <div className="text-xs text-muted mt-1">{subtitle}</div>
      </div>
    </button>
  );
}
