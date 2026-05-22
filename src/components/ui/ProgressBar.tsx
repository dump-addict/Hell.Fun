import { cn } from "@/lib/utils";

interface ProgressBarProps {
  /** 0 à 100 */
  progress: number;
  className?: string;
}

const CHECKPOINTS = [0, 25, 50, 75] as const;

export function ProgressBar({ progress, className }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, progress));

  return (
    <div className={cn("relative h-2 w-full", className)}>
      {/* fond non rempli (zone restante à droite) */}
      <div className="absolute inset-0 rounded-[3px] bg-[#0D0D14] shadow-inset" />

      {/* zone remplie en orange foncé (rouille) */}
      <div
        className="absolute inset-y-0 left-0 rounded-[3px] bg-orange-soft"
        style={{ width: `${clamped}%` }}
      />

      {/* checkpoints carrés (0, 25, 50, 75) */}
      {CHECKPOINTS.map((cp) => (
        <span
          key={cp}
          aria-hidden
          className={cn(
            "absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-[2px]",
            cp <= clamped ? "bg-orange" : "bg-[#2A2A35]",
          )}
          style={{ left: `${cp}%` }}
        />
      ))}

      {/* handle (slider) — gros carré orange avec inset glow jaune */}
      <span
        aria-hidden
        className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-[4px] bg-orange shadow-glow"
        style={{ left: `${clamped}%` }}
      />

      {/* marqueur 100% (carré gris) */}
      <span
        aria-hidden
        className="absolute top-1/2 right-0 h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-[2px] bg-[#3A3A48]"
      />
    </div>
  );
}
