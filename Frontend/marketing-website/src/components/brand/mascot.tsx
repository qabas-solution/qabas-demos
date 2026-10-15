import { useId } from "react";
import { cn } from "@/lib/cn";

export type MascotPose =
  | "hero"
  | "idle"
  | "reading"
  | "thinking"
  | "success"
  | "error"
  | "lost"
  | "sleeping";

interface MascotProps {
  className?: string;
  label?: string;
  pose?: MascotPose;
}

export function Mascot({ className, label = "QABAS mascot", pose = "idle" }: MascotProps) {
  const gradientId = `q-mascot-${useId().replace(/:/g, "")}`;
  const closedEyes = pose === "success" || pose === "sleeping";
  const worried = pose === "error" || pose === "lost";
  const thinking = pose === "thinking";

  return (
    <svg
      className={cn("qabas-mascot", `q-${pose}`, className)}
      viewBox="0 0 400 400"
      role="img"
      aria-label={label}
    >
      <defs>
        <linearGradient id={gradientId} x1=".2" y1="1" x2=".75" y2="0">
          <stop stopColor="var(--q-primary)" />
          <stop offset=".38" stopColor="var(--q-purple)" />
          <stop offset=".72" stopColor="var(--q-coral)" />
          <stop offset="1" stopColor="var(--q-amber)" />
        </linearGradient>
        <symbol id={`q-spark-${gradientId}`} viewBox="0 0 40 40">
          <path d="M20 0c2 13 7 18 20 20-13 2-18 7-20 20-2-13-7-18-20-20C13 18 18 13 20 0Z" />
        </symbol>
      </defs>
      <g id="body">
        <path
          d="M196 42c24 61 78 79 91 142 18 91-34 158-89 158-70 0-111-52-99-121 9-51 52-74 65-135 12 37 21 48 35 58-7-38-5-72-3-102Z"
          fill={`url(#${gradientId})`}
        />
        <path
          id="flame-tip"
          d="M196 42c24 61 78 79 91 142-28-36-51-44-88-40-7-38-5-72-3-102Z"
          fill="var(--q-amber)"
          opacity=".8"
        />
        <path d="M132 171c10-45 31-65 45-82-5 47 8 64 19 76-29 6-48 23-64 51Z" fill="var(--q-surface)" opacity=".18" />
        <g id="eyes">
          {closedEyes ? (
            <>
              <path id="eye-left" d="M151 190q15 12 30 0" />
              <path id="eye-right" d="M213 190q15 12 30 0" />
            </>
          ) : (
            <>
              <ellipse id="eye-left" cx={thinking ? 170 : pose === "lost" ? 161 : 166} cy={thinking ? 178 : worried ? 190 : 185} rx="12" ry="16" />
              <ellipse id="eye-right" cx={thinking ? 232 : pose === "lost" ? 223 : 228} cy={thinking ? 178 : worried ? 190 : 185} rx="12" ry="16" />
              <circle cx={thinking ? 166 : 162} cy={thinking ? 173 : worried ? 185 : 180} r="4" fill="var(--q-surface)" />
              <circle cx={thinking ? 228 : 224} cy={thinking ? 173 : worried ? 185 : 180} r="4" fill="var(--q-surface)" />
            </>
          )}
        </g>
        {thinking ? (
          <circle id="mouth" cx="200" cy="220" r="7" />
        ) : worried ? (
          <path id="mouth" d="M181 229Q198 213 215 229" />
        ) : pose === "success" ? (
          <path id="mouth" d="M176 215Q198 242 220 215Z" />
        ) : (
          <path id="mouth" d="M180 215Q198 231 216 215" />
        )}
        <g id="cheeks">
          <ellipse cx="140" cy="215" rx="17" ry="8" />
          <ellipse cx="255" cy="215" rx="17" ry="8" />
        </g>
        <g id="arm-left">
          <path d="M126 226Q91 239 79 217" />
        </g>
        <g id="arm-right">
          <path d={pose === "hero" ? "M274 226Q314 198 306 167" : "M274 226Q309 239 321 217"} />
        </g>
        <g id="braille-dots">
          {[1, 2, 3, 4, 5, 6].map((dot) => (
            <circle id={`dot-${dot}`} key={dot} cx={dot % 2 ? 183 : 217} cy={dot <= 2 ? 270 : dot <= 4 ? 292 : 314} r="7" />
          ))}
        </g>
        <g fill="var(--q-gold)">
          <use id="sparkle-1" href={`#q-spark-${gradientId}`} x="82" y="98" width="22" />
          <use id="sparkle-2" href={`#q-spark-${gradientId}`} x="291" y="102" width="18" />
          <use id="sparkle-3" href={`#q-spark-${gradientId}`} x="292" y="302" width="15" />
        </g>
      </g>
    </svg>
  );
}
