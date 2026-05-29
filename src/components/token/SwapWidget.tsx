"use client";

import { Info, RotateCcw, Settings } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { Token } from "@/lib/types";

type Side = "buy" | "sell";

const PERCENTAGES = [25, 50, 75, 100] as const;
const DEFAULT_QUICK_BUY = [0.5, 1, 2, 5];
const QUICK_SELL_PCT = [10, 25, 50, 100];

export function SwapWidget({ token }: { token: Token }) {
  const [side, setSide] = useState<Side>("buy");
  const [amount, setAmount] = useState("");

  // Settings : montants LIT par défaut pour les boutons quick-buy
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [quickBuy, setQuickBuy] = useState<string[]>(
    DEFAULT_QUICK_BUY.map((v) => String(v)),
  );
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!settingsOpen) return;
    function onDocClick(e: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setSettingsOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [settingsOpen]);

  const fromLabel = side === "buy" ? "LIT" : token.ticker;
  const toLabel = side === "buy" ? token.ticker : "LIT";

  // Mock balances
  const balance = side === "buy" ? 4.21 : 0;
  const estimatedOutput =
    amount && !isNaN(parseFloat(amount))
      ? (parseFloat(amount) * (side === "buy" ? 16025 : 0.0000624)).toLocaleString("en-US", {
          maximumFractionDigits: 4,
        })
      : "0";

  function applyPercentage(pct: number) {
    setAmount(((balance * pct) / 100).toFixed(4));
  }

  function updateQuickBuy(i: number, v: string) {
    setQuickBuy((arr) => arr.map((x, idx) => (idx === i ? v : x)));
  }

  function resetQuickBuy() {
    setQuickBuy(DEFAULT_QUICK_BUY.map((v) => String(v)));
  }

  return (
    <section className="bg-section shadow-inset rounded-[16px] p-4 flex flex-col gap-4">
      {/* Buy / Sell toggle + Settings */}
      <div className="flex items-center gap-2">
        <div className="relative flex flex-1 bg-[#0D0D14] shadow-inset rounded-[10px] p-[3px]">
          <span
            aria-hidden
            className={cn(
              "absolute top-[3px] bottom-[3px] w-[calc(50%-3px)] bg-orange shadow-glow rounded-[8px] transition-transform duration-300",
              side === "sell" && "translate-x-full",
            )}
          />
          <button
            type="button"
            onClick={() => setSide("buy")}
            className={cn(
              "relative z-10 flex-1 h-9 text-sm font-bold transition-colors",
              side === "buy" ? "text-white" : "text-muted hover:text-white",
            )}
          >
            Buy
          </button>
          <button
            type="button"
            onClick={() => setSide("sell")}
            className={cn(
              "relative z-10 flex-1 h-9 text-sm font-bold transition-colors",
              side === "sell" ? "text-white" : "text-muted hover:text-white",
            )}
          >
            Sell
          </button>
        </div>

        {/* Settings dropdown : edit quick-buy LIT amounts */}
        <div className="relative shrink-0" ref={settingsRef}>
          <button
            type="button"
            aria-label="Edit quick buy amounts"
            aria-expanded={settingsOpen}
            onClick={() => setSettingsOpen((v) => !v)}
            className={cn(
              "h-10 w-10 flex items-center justify-center rounded-[10px] shadow-inset transition-colors",
              settingsOpen
                ? "bg-orange text-white shadow-glow"
                : "bg-[#0D0D14] text-white hover:text-orange",
            )}
          >
            <Settings className="h-4 w-4" strokeWidth={2} />
          </button>

          {settingsOpen && (
            <div
              role="dialog"
              className="absolute right-0 top-[calc(100%+8px)] z-50 w-[300px] bg-section shadow-inset rounded-[16px] p-4 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-muted uppercase tracking-wider">
                  Quick Buy (LIT)
                </span>
                <button
                  type="button"
                  onClick={resetQuickBuy}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-orange hover:brightness-125 transition"
                >
                  <RotateCcw className="h-3 w-3" strokeWidth={2.5} />
                  Reset
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {quickBuy.map((value, i) => (
                  <div
                    key={i}
                    className="flex items-center h-10 bg-[#0D0D14] shadow-inset rounded-[10px] px-3 focus-within:ring-1 focus-within:ring-orange/60 transition-shadow"
                  >
                    <input
                      type="text"
                      inputMode="decimal"
                      value={value}
                      onChange={(e) => updateQuickBuy(i, e.target.value)}
                      className="flex-1 min-w-0 bg-transparent text-sm font-bold text-white focus:outline-none"
                    />
                    <span className="text-xs text-muted font-bold shrink-0 ml-2">LIT</span>
                  </div>
                ))}
              </div>

              <p className="text-[10px] text-muted leading-relaxed">
                These amounts appear as quick-buy buttons below the input.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Available to Trade */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted">Available to Trade</span>
        <span className="text-white font-bold">
          {balance.toFixed(2)} {fromLabel}
        </span>
      </div>

      {/* Amount input */}
      <div className="flex items-center gap-3 h-14 bg-[#0D0D14] border border-[#262631] rounded-[12px] px-4 focus-within:border-orange/60 transition-colors">
        <input
          inputMode="decimal"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="flex-1 bg-transparent text-white text-2xl font-bold placeholder:text-muted focus:outline-none min-w-0"
        />
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-sm font-bold text-white">{fromLabel}</span>
          {fromLabel === "LIT" ? (
            <Image
              src="/lighter-logo.jpeg"
              alt="LIT"
              width={20}
              height={20}
              className="h-5 w-5 rounded-full object-cover"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={token.imageUrl}
              alt={token.ticker}
              className="h-5 w-5 rounded-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Percentage row */}
      <div className="grid grid-cols-4 gap-3">
        {PERCENTAGES.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => applyPercentage(p)}
            className="h-7 text-xs font-bold text-muted hover:text-orange transition-colors"
          >
            {p}%
          </button>
        ))}
      </div>

      {/* Quick amounts row */}
      <div className="grid grid-cols-4 gap-2">
        {(side === "buy" ? quickBuy : QUICK_SELL_PCT.map(String)).map((v, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              if (side === "buy") {
                setAmount(v);
              } else {
                applyPercentage(parseFloat(v));
              }
            }}
            className="h-9 rounded-[8px] bg-[#0D0D14] border border-[#262631] text-xs font-bold text-white hover:border-orange/60 hover:text-orange transition-colors"
          >
            {side === "buy" ? v : `${v}%`}
          </button>
        ))}
      </div>

      {/* Info rows */}
      <div className="flex flex-col gap-2 text-xs">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-muted">
            Estimated Output
            <Info className="h-3 w-3" strokeWidth={2} />
          </span>
          <span className="text-white font-bold">
            {estimatedOutput} {toLabel}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted">Fees</span>
          <span className="text-white font-bold">1% / 1%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted">Slippage</span>
          <span className="text-white font-bold">0.5%</span>
        </div>
      </div>

      {/* CTA */}
      <button
        type="button"
        disabled={!amount || parseFloat(amount) <= 0}
        className="h-12 w-full rounded-[10px] bg-orange shadow-glow text-white font-bold text-sm hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {amount ? `${side === "buy" ? "Buy" : "Sell"} ${token.ticker}` : "Connect Wallet"}
      </button>
    </section>
  );
}
