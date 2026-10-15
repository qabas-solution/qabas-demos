import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

export function Input({ className, error, id, label, ...props }: InputProps) {
  const inputId = id ?? props.name;
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold text-ink" htmlFor={inputId}>
      {label}
      <input
        className={cn(
          "min-h-12 rounded-xl border border-line bg-bg px-4 text-ink outline-none transition focus:border-primary focus:ring-4 focus:ring-amber/30",
          error && "border-error",
          className,
        )}
        aria-describedby={error ? `${inputId}-error` : undefined}
        aria-invalid={Boolean(error)}
        id={inputId}
        {...props}
      />
      {error && <span className="text-sm font-normal text-error" id={`${inputId}-error`}>{error}</span>}
    </label>
  );
}
