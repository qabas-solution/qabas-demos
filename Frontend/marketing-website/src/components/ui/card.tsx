import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: "article" | "div" | "section";
}

export function Card({ as = "article", children, className, ...props }: CardProps) {
  const Component = as;
  return (
    <Component
      className={cn("rounded-card border border-line bg-surface p-6 shadow-sm", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
