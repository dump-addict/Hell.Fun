"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/home/Header";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg p-[15px] flex gap-[15px]">
      {/* Sidebar : sticky desktop / drawer mobile */}
      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

      {/* Overlay mobile (click pour fermer) */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <main className="flex-1 min-w-0 flex flex-col gap-[15px]">
        <Header onMenuClick={() => setMobileOpen(true)} />
        {children}
      </main>
    </div>
  );
}
