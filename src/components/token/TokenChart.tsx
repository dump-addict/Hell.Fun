"use client";

import {
  CandlestickSeries,
  HistogramSeries,
  createChart,
  type CandlestickData,
  type HistogramData,
  type IChartApi,
  type ISeriesApi,
  type Time,
} from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Range = "5M" | "1H" | "6H" | "1D" | "1W" | "1M";

const RANGES: Range[] = ["5M", "1H", "6H", "1D", "1W", "1M"];

// Granularité (en secondes) par range
const STEP_SECONDS: Record<Range, number> = {
  "5M": 5,
  "1H": 60,
  "6H": 60 * 10,
  "1D": 60 * 30,
  "1W": 60 * 60 * 4,
  "1M": 60 * 60 * 24,
};
const CANDLE_COUNT = 120;

export function TokenChart({ tokenId }: { tokenId: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);
  const [range, setRange] = useState<Range>("1H");

  // Init du chart une seule fois
  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      autoSize: true,
      layout: {
        background: { color: "transparent" },
        textColor: "#8A8A95",
        fontFamily: "var(--font-manrope), system-ui, sans-serif",
      },
      grid: {
        vertLines: { color: "#1A1A22" },
        horzLines: { color: "#1A1A22" },
      },
      crosshair: {
        vertLine: { color: "#FF4617", width: 1, style: 2 },
        horzLine: { color: "#FF4617", width: 1, style: 2 },
      },
      rightPriceScale: {
        borderColor: "#262631",
        textColor: "#A0A0AC",
      },
      timeScale: {
        borderColor: "#262631",
        timeVisible: true,
        secondsVisible: false,
      },
      handleScroll: true,
      handleScale: true,
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#FF4617",
      downColor: "#3A3A48",
      borderUpColor: "#FF4617",
      borderDownColor: "#3A3A48",
      wickUpColor: "#FF6B1A",
      wickDownColor: "#4A4A55",
    });

    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: { type: "volume" },
      priceScaleId: "volume",
      color: "#FF4617",
    });
    chart.priceScale("volume").applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    });

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;
    volumeSeriesRef.current = volumeSeries;

    return () => {
      chart.remove();
      chartRef.current = null;
      candleSeriesRef.current = null;
      volumeSeriesRef.current = null;
    };
  }, []);

  // Update data quand tokenId ou range change
  useEffect(() => {
    if (!candleSeriesRef.current || !volumeSeriesRef.current || !chartRef.current) return;
    const { candles, volumes } = generateData(tokenId, range);
    candleSeriesRef.current.setData(candles);
    volumeSeriesRef.current.setData(volumes);
    chartRef.current.timeScale().fitContent();
  }, [tokenId, range]);

  const { lastPrice, change } = derivePriceInfo(tokenId, range);

  return (
    <section className="bg-section shadow-inset rounded-[16px] p-4 flex flex-col gap-3 h-[480px]">
      <header className="flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-white">
              ${lastPrice.toFixed(8)}
            </span>
            <span
              className={
                change >= 0 ? "text-sm font-bold text-orange" : "text-sm font-bold text-muted-2"
              }
            >
              {change >= 0 ? "+" : ""}
              {change.toFixed(2)}%
            </span>
          </div>
          <span className="text-xs text-muted">Powered by TradingView</span>
        </div>
        <div className="flex bg-[#0D0D14] shadow-inset rounded-[10px] p-[3px]">
          {RANGES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={cn(
                "px-3 h-7 rounded-[7px] text-[11px] font-bold transition-colors",
                range === r ? "bg-orange text-white shadow-glow" : "text-muted hover:text-white",
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </header>

      <div ref={containerRef} className="flex-1 min-h-0" />
    </section>
  );
}

/** Génère des candles déterministes à partir d'un seed (tokenId + range) */
function generateData(seed: string, range: Range): {
  candles: CandlestickData<Time>[];
  volumes: HistogramData<Time>[];
} {
  const step = STEP_SECONDS[range];
  const now = Math.floor(Date.now() / 1000);
  const start = now - step * CANDLE_COUNT;

  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  for (let i = 0; i < range.length; i++) h = (h * 31 + range.charCodeAt(i)) | 0;
  const rand = () => {
    h = (h * 9301 + 49297) % 233280;
    return h / 233280;
  };

  const candles: CandlestickData<Time>[] = [];
  const volumes: HistogramData<Time>[] = [];

  let price = 0.00004 + rand() * 0.0001;
  for (let i = 0; i < CANDLE_COUNT; i++) {
    const time = (start + i * step) as Time;
    const change = (rand() - 0.48) * price * 0.18;
    const open = price;
    const close = Math.max(0.000001, open + change);
    const high = Math.max(open, close) + rand() * Math.abs(change) * 0.6;
    const low = Math.min(open, close) - rand() * Math.abs(change) * 0.6;
    candles.push({ time, open, high, low, close });

    const vol = 50 + rand() * 1000;
    volumes.push({
      time,
      value: vol,
      color: close >= open ? "rgba(255, 70, 23, 0.4)" : "rgba(74, 74, 85, 0.4)",
    });

    price = close;
  }

  return { candles, volumes };
}

function derivePriceInfo(seed: string, range: Range): { lastPrice: number; change: number } {
  const { candles } = generateData(seed, range);
  const last = candles[candles.length - 1];
  const first = candles[0];
  if (!last || !first) return { lastPrice: 0, change: 0 };
  return {
    lastPrice: last.close,
    change: ((last.close - first.open) / first.open) * 100,
  };
}
