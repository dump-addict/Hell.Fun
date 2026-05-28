"use client";

import {
  AreaSeries,
  createChart,
  type AreaData,
  type IChartApi,
  type ISeriesApi,
  type Time,
} from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Range = "1D" | "1W" | "1M" | "3M" | "ALL";
const RANGES: Range[] = ["1D", "1W", "1M", "3M", "ALL"];

const STEPS: Record<Range, { count: number; stepSec: number }> = {
  "1D": { count: 96, stepSec: 60 * 15 },
  "1W": { count: 168, stepSec: 60 * 60 },
  "1M": { count: 120, stepSec: 60 * 60 * 6 },
  "3M": { count: 90, stepSec: 60 * 60 * 24 },
  ALL: { count: 180, stepSec: 60 * 60 * 24 * 2 },
};

export function PortfolioChart() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const areaRef = useRef<ISeriesApi<"Area"> | null>(null);
  const [range, setRange] = useState<Range>("1W");

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
      rightPriceScale: { borderColor: "#262631", textColor: "#A0A0AC" },
      timeScale: { borderColor: "#262631", timeVisible: true, secondsVisible: false },
    });

    const area = chart.addSeries(AreaSeries, {
      lineColor: "#FF4617",
      lineWidth: 2,
      topColor: "rgba(255, 70, 23, 0.45)",
      bottomColor: "rgba(255, 70, 23, 0.02)",
    });

    chartRef.current = chart;
    areaRef.current = area;
    return () => {
      chart.remove();
      chartRef.current = null;
      areaRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!areaRef.current || !chartRef.current) return;
    const data = generateAreaData(range);
    areaRef.current.setData(data);
    chartRef.current.timeScale().fitContent();
  }, [range]);

  return (
    <section className="bg-section shadow-inset rounded-[16px] p-4 flex flex-col gap-3 h-[340px]">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-muted uppercase tracking-wider">
            Portfolio Performance
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-xl font-extrabold text-white">$12,847.32</span>
            <span className="text-sm font-bold text-orange">+$1,247.83 (+10.74%)</span>
          </div>
        </div>
        <div className="self-start sm:self-auto flex bg-[#0D0D14] shadow-inset rounded-[10px] p-[3px]">
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

function generateAreaData(range: Range): AreaData<Time>[] {
  const { count, stepSec } = STEPS[range];
  const now = Math.floor(Date.now() / 1000);
  const start = now - stepSec * count;
  let h = range.charCodeAt(0) * 31 + range.length;
  const rand = () => {
    h = (h * 9301 + 49297) % 233280;
    return h / 233280;
  };
  const data: AreaData<Time>[] = [];
  let value = 7600;
  for (let i = 0; i < count; i++) {
    value += (rand() - 0.45) * 250;
    value = Math.max(2000, value);
    data.push({ time: (start + i * stepSec) as Time, value: Math.round(value) });
  }
  return data;
}
