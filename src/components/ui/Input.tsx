"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  containerClassName?: string;
}

export function Input({ icon, containerClassName, className, ...props }: InputProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 h-11 bg-[#0D0D14] border border-[#262631] rounded-[10px] px-4 w-full",
        "focus-within:border-orange/60 transition-colors",
        containerClassName,
      )}
    >
      {icon && <span className="text-muted shrink-0">{icon}</span>}
      <input
        className={cn(
          "flex-1 bg-transparent text-white text-sm placeholder:text-muted focus:outline-none min-w-0",
          className,
        )}
        {...props}
      />
    </div>
  );
}
