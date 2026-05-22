import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/home/Header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg p-[15px] flex gap-[15px]">
      <Sidebar />
      <main className="flex-1 min-w-0 flex flex-col gap-[15px]">
        <Header />
        {children}
      </main>
    </div>
  );
}
