import { cn } from "@/lib/cn";

interface BrailleCellProps {
  activeDots?: readonly number[];
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function BrailleCell({
  activeDots = [1, 2, 3, 4, 5, 6],
  className,
  size = "md",
}: BrailleCellProps) {
  return (
    <span className={cn("q-braille-cell", `q-braille-cell--${size}`, className)} aria-hidden="true">
      {Array.from({ length: 6 }, (_, index) => (
        <i className={activeDots.includes(index + 1) ? "is-active" : undefined} key={index} />
      ))}
    </span>
  );
}
