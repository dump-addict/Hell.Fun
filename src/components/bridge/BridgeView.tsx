"use client";

import { ArrowDown, Info } from "lucide-react";
import { useState } from "react";
import { CHAINS, ChainSelector, type Chain } from "./ChainSelector";
import { BridgeHistory } from "./BridgeHistory";

export function BridgeView() {
  const [fromChain, setFromChain] = useState<Chain>(CHAINS[1]); // SOL
  const [toChain, setToChain] = useState<Chain>(CHAINS[0]); // LIT
  const [amount, setAmount] = useState("");

  function swapChains() {
    setFromChain(toChain);
    setToChain(fromChain);
  }

  const balance = 4.21;
  const estimatedOutput =
    amount && !isNaN(parseFloat(amount))
      ? (parseFloat(amount) * 0.998).toLocaleString("en-US", { maximumFractionDigits: 6 })
      : "0";

  return (
    <div className="flex flex-col gap-[15px]">
      <h1 className="text-lg font-extrabold text-white leading-none">Bridge</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-[15px]">
        {/* Panel principal de bridge */}
        <section className="bg-section shadow-inset rounded-[16px] p-5 flex flex-col gap-3 max-w-2xl">
          {/* FROM */}
          <div className="bg-[#0D0D14] shadow-inset rounded-[14px] p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted uppercase tracking-wider">From</span>
              <span className="text-xs text-muted">
                Balance <span className="text-white font-bold">{balance.toFixed(2)} {fromChain.symbol}</span>
              </span>
            </div>
            <ChainSelector value={fromChain} onChange={setFromChain} exclude={toChain.id} />
            <div className="flex items-center gap-3 h-14 bg-section border border-[#262631] rounded-[12px] px-4 focus-within:border-orange/60 transition-colors">
              <input
                inputMode="decimal"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 bg-transparent text-white text-xl font-bold placeholder:text-muted focus:outline-none min-w-0"
              />
              <button
                type="button"
                onClick={() => setAmount(String(balance))}
                className="h-7 px-3 rounded-[6px] bg-section shadow-inset text-[11px] font-bold text-orange hover:brightness-125 transition shrink-0"
              >
                MAX
              </button>
              <span className="text-sm font-bold text-white shrink-0">{fromChain.symbol}</span>
            </div>
          </div>

          {/* Swap direction button */}
          <div className="relative flex justify-center -my-1.5">
            <button
              type="button"
              onClick={swapChains}
              aria-label="Swap direction"
              className="h-10 w-10 flex items-center justify-center rounded-[10px] bg-orange shadow-glow text-white hover:brightness-110 active:scale-[0.95] transition-all"
            >
              <ArrowDown className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </div>

          {/* TO */}
          <div className="bg-[#0D0D14] shadow-inset rounded-[14px] p-4 flex flex-col gap-3">
            <span className="text-xs font-bold text-muted uppercase tracking-wider">To</span>
            <ChainSelector value={toChain} onChange={setToChain} exclude={fromChain.id} />
            <div className="flex items-center gap-3 h-14 bg-section border border-[#262631] rounded-[12px] px-4">
              <span className="flex-1 text-white text-xl font-bold truncate">
                {estimatedOutput}
              </span>
              <span className="text-sm font-bold text-white shrink-0">{toChain.symbol}</span>
            </div>
          </div>

          {/* Info rows */}
          <div className="flex flex-col gap-2 text-xs mt-1 px-1">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-muted">
                Bridge fee
                <Info className="h-3 w-3" strokeWidth={2} />
              </span>
              <span className="text-white font-bold">0.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">Estimated time</span>
              <span className="text-white font-bold">~2 min</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">Slippage</span>
              <span className="text-white font-bold">0.5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">Route</span>
              <span className="text-white font-bold">{fromChain.name} → {toChain.name}</span>
            </div>
          </div>

          {/* CTA */}
          <button
            type="button"
            disabled={!amount || parseFloat(amount) <= 0}
            className="h-12 w-full mt-1 rounded-[10px] bg-orange shadow-glow text-white font-bold text-sm hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {amount && parseFloat(amount) > 0
              ? `Bridge ${amount} ${fromChain.symbol}`
              : "Enter an amount"}
          </button>
        </section>

        {/* Historique */}
        <BridgeHistory />
      </div>
    </div>
  );
}
