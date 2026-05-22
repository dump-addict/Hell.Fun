import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "sm" | "md";
}

export function IconButton({ children, className, size = "md", ...props }: IconButtonProps) {
  const sizes = {
    sm: "h-9 w-9",
    md: "h-[43px] w-[43px]",
  };

  return (
    <button
      type="button"
      className={cn(
        "flex items-center justify-center rounded-[10px] bg-section shadow-inset text-white",
        "hover:text-orange transition-colors disabled:opacity-50",
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
