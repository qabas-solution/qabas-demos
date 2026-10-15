import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "avatar" | "card";
}

export function Skeleton({ className, variant = "text", ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse bg-line/70",
        variant === "text" && "h-4 rounded-control",
        variant === "avatar" && "size-16 rounded-full",
        variant === "card" && "min-h-40 rounded-card",
        className,
      )}
      {...props}
    />
  );
}
