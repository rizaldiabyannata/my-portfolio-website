"use client";

import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

interface SpotlightSurfaceProps extends PropsWithChildren {
  className?: string;
}

const SpotlightSurface = ({ children, className }: SpotlightSurfaceProps) => {
  return (
    <div
      className={cn(
        "surface-panel group relative isolate overflow-hidden border border-border/80 transition-[border-color,box-shadow] duration-200 hover:border-primary/30 hover:shadow-primary/10 focus-within:border-primary/40 focus-within:shadow-primary/10",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-[-4.5rem] h-32 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default SpotlightSurface;
