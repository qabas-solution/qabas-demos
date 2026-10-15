import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
}

export function Textarea({ className, error, id, label, ...props }: TextareaProps) {
  const textareaId = id ?? props.name;
  return (
    <label className="flex flex-col gap-2 text-sm font-semibold text-ink" htmlFor={textareaId}>
      {label}
      <textarea
        className={cn(
          "min-h-28 resize-y rounded-xl border border-line bg-bg px-4 py-3 text-ink outline-none transition focus:border-primary focus:ring-4 focus:ring-amber/30",
          error && "border-error",
          className,
        )}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        aria-invalid={Boolean(error)}
        id={textareaId}
        {...props}
      />
      {error && <span className="text-sm font-normal text-error" id={`${textareaId}-error`}>{error}</span>}
    </label>
  );
}
