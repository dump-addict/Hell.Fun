import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "ghost" | "inset";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center font-bold rounded-[10px] transition-transform active:scale-[0.98] disabled:opacity-50";

  const variants: Record<Variant, string> = {
    // bouton orange "saillant" avec inset jaune (style braise)
    primary: "bg-orange text-white shadow-glow hover:brightness-110",
    // bouton "creusé" (icônes secondaires)
    inset: "bg-section text-white shadow-inset hover:bg-[#181820]",
    // pas de fond, juste hover
    ghost: "bg-transparent text-white hover:bg-section",
  };

  return (
    <button
      className={cn(base, sizeClasses[size], variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
