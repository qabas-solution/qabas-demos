import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white shadow-sm hover:bg-primary-hover",
  secondary: "border border-line bg-surface text-ink hover:bg-surface-soft",
  ghost: "bg-transparent text-ink-muted hover:bg-surface-soft hover:text-ink",
  icon: "border border-line bg-surface text-ink hover:bg-surface-soft",
};

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-control px-6 font-semibold transition-transform duration-150 hover:-translate-y-0.5 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0",
        variantClasses[variant],
        variant === "icon" && "size-12 px-0",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
