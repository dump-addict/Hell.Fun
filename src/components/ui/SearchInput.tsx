"use client";

import { Search } from "lucide-react";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

export function SearchInput({ containerClassName, className, ...props }: SearchInputProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 h-10 bg-section shadow-inset rounded-[10px] px-3.5 w-full",
        containerClassName,
      )}
    >
      <Search className="h-4 w-4 text-muted shrink-0" strokeWidth={2.5} />
      <input
        type="text"
        placeholder="Search Tokens"
        className={cn(
          "flex-1 bg-transparent text-white text-sm placeholder:text-muted focus:outline-none",
          className,
        )}
        {...props}
      />
    </div>
  );
}
