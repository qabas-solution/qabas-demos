import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./container";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function Section({ children, className, ...props }: SectionProps) {
  return <section className={cn("py-16 md:py-24", className)} {...props}><Container>{children}</Container></section>;
}
