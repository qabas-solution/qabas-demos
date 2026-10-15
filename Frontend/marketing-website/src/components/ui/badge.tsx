import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type BadgeTone = "purple" | "mint" | "pink" | "amber" | "neutral";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  tone?: BadgeTone;
}

const toneClasses: Record<BadgeTone, string> = {
  purple: "bg-purple/10 text-purple",
  mint: "bg-mint/15 text-ink",
  pink: "bg-pink/15 text-ink",
  amber: "bg-amber/20 text-ink",
  neutral: "bg-surface-soft text-ink-muted",
};

export function Badge({ children, className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn("inline-flex items-center rounded-control px-3 py-1 text-xs font-bold", toneClasses[tone], className)}
      {...props}
    >
      {children}
    </span>
  );
}
