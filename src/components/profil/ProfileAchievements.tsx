import { Crown, Flame, Lock, Rocket, Sparkles, Star, Trophy, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface Achievement {
  icon: typeof Flame;
  title: string;
  description: string;
  unlocked: boolean;
}

const ACHIEVEMENTS: Achievement[] = [
  { icon: Flame, title: "First Burn", description: "Created your first token", unlocked: true },
  { icon: Rocket, title: "Liftoff", description: "Token graduated to DEX", unlocked: true },
  { icon: Trophy, title: "Top 100", description: "Top 100 on the leaderboard", unlocked: true },
  { icon: Zap, title: "Speed Trader", description: "10+ trades in an hour", unlocked: true },
  { icon: Sparkles, title: "Early Adopter", description: "First 1000 users", unlocked: true },
  { icon: Star, title: "Diamond Hands", description: "Held a position 30+ days", unlocked: false },
  { icon: Crown, title: "Hall of Fame", description: "Reached #1 on leaderboard", unlocked: false },
  { icon: Flame, title: "Inferno", description: "100+ tokens created", unlocked: false },
];

export function ProfileAchievements() {
  const unlockedCount = ACHIEVEMENTS.filter((a) => a.unlocked).length;
  return (
    <section className="bg-section shadow-inset rounded-[16px] p-5 flex flex-col gap-4">
      <div className="flex items-baseline justify-between">
        <h2 className="text-sm font-bold text-white">Achievements</h2>
        <span className="text-xs font-bold text-muted">
          <span className="text-orange">{unlockedCount}</span> / {ACHIEVEMENTS.length} unlocked
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {ACHIEVEMENTS.map(({ icon: Icon, title, description, unlocked }) => (
          <div
            key={title}
            className={cn(
              "bg-[#0D0D14] shadow-inset rounded-[12px] p-4 flex items-start gap-3",
              !unlocked && "opacity-50",
            )}
          >
            <div
              className={cn(
                "h-10 w-10 flex items-center justify-center rounded-[10px] shrink-0",
                unlocked ? "bg-orange shadow-glow text-white" : "bg-section text-muted",
              )}
            >
              {unlocked ? (
                <Icon className="h-5 w-5" strokeWidth={2} />
              ) : (
                <Lock className="h-4 w-4" strokeWidth={2.5} />
              )}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold text-white leading-none truncate">{title}</div>
              <div className="text-[11px] text-muted mt-1.5 leading-snug">{description}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
