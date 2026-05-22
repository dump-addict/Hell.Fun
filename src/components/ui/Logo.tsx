import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="h-10 w-10 rounded-[8px] overflow-hidden shrink-0">
        <Image
          src="/logo.png"
          alt="Hell.fun"
          width={40}
          height={40}
          className="h-full w-full object-cover"
          priority
        />
      </div>
      <span className="text-xl font-extrabold italic tracking-tight text-white leading-none">
        Hell<span className="text-orange">.</span>fun
      </span>
    </div>
  );
}
