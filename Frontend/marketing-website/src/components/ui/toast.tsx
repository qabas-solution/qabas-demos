import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ToastTone = "success" | "error" | "info";

interface ToastProps {
  children: ReactNode;
  className?: string;
  onClose?: () => void;
  tone?: ToastTone;
}

const toneClasses: Record<ToastTone, string> = {
  success: "border-success/40 bg-success/10",
  error: "border-error/40 bg-error/10",
  info: "border-sky/40 bg-sky/10",
};

export function Toast({ children, className, onClose, tone = "info" }: ToastProps) {
  return (
    <div aria-live="polite" className={cn("flex items-start gap-3 rounded-card border p-4 text-sm shadow-sm", toneClasses[tone], className)} role="status">
      <div className="flex-1">{children}</div>
      {onClose && <button aria-label="Close notification" className="size-8 rounded-control text-lg leading-none text-ink-muted hover:bg-surface-soft hover:text-ink" type="button" onClick={onClose}>×</button>}
    </div>
  );
}
