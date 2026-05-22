"use client";

import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "w-full bg-[#0D0D14] border border-[#262631] rounded-[10px] px-4 py-3 text-white text-sm placeholder:text-muted focus:outline-none focus:border-orange/60 resize-none min-h-[100px] transition-colors",
        className,
      )}
      {...props}
    />
  );
}
