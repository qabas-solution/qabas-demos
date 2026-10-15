import { useId } from "react";
import { Sparkles } from "./sparkles";

interface LogoProps {
  compact?: boolean;
  className?: string;
}

export function Logo({ compact = false, className }: LogoProps) {
  const gradientId = `q-logo-${useId().replace(/:/g, "")}`;

  return (
    <span className={`q-logo ${className ?? ""}`.trim()} aria-label="QABAS Arabic Braille Solutions">
      <span className="q-logo__mark">
        <svg viewBox="0 0 52 58" role="img" aria-label="QABAS flame with Braille dots">
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="var(--q-primary)" />
              <stop offset=".35" stopColor="var(--q-purple)" />
              <stop offset=".7" stopColor="var(--q-coral)" />
              <stop offset="1" stopColor="var(--q-amber)" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#${gradientId})`}
            d="M27 1c4 11-3 15 5 22 2-7 7-9 8-15 8 8 13 18 10 30-3 12-13 19-25 19S3 49 2 37C1 25 9 17 18 10c0 7 1 10 4 13 2-8 3-14 5-22Z"
          />
          {[18, 27, 36].flatMap((y) =>
            [20, 30].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" fill="var(--q-surface)" />),
          )}
        </svg>
        <Sparkles className="q-logo__spark" />
      </span>
      {!compact && (
        <span className="q-logo__copy">
          <b>قبس</b>
          <small>QABAS</small>
        </span>
      )}
    </span>
  );
}
