"use client";

import { Settings } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Switch } from "@/components/ui/Switch";

export function SettingsMenu() {
  const [open, setOpen] = useState(false);
  const [nsfw, setNsfw] = useState(false);
  const [animations, setAnimations] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  // Click extérieur → ferme le dropdown
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

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Settings"
        aria-expanded={open}
        className="h-10 w-10 flex items-center justify-center bg-section shadow-inset rounded-[10px] text-white hover:text-orange transition-colors"
      >
        <Settings className="h-5 w-5" strokeWidth={2} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-[200px] bg-section shadow-inset rounded-[12px] p-3 flex flex-col gap-2"
        >
          <SettingRow label="NSFW" checked={nsfw} onChange={setNsfw} />
          <SettingRow label="Animations" checked={animations} onChange={setAnimations} />
        </div>
      )}
    </div>
  );
}

function SettingRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer py-1">
      <Switch checked={checked} onChange={onChange} ariaLabel={label} />
      <span className="text-white text-sm font-bold flex-1 select-none">{label}</span>
    </label>
  );
}
