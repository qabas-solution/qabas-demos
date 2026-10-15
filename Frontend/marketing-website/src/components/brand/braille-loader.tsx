import { cn } from "@/lib/cn";

interface BrailleLoaderProps {
  className?: string;
  label?: string;
}

export function BrailleLoader({ className, label = "Loading" }: BrailleLoaderProps) {
  return (
    <span className={cn("q-cell-loader", className)} role="status" aria-label={label}>
      {Array.from({ length: 6 }, (_, index) => <i key={index} />)}
    </span>
  );
}
