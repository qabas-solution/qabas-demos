import { useEffect, useRef } from "react"
import { useSiteConfig } from "@/config/SiteConfigProvider"

export default function EffectsLayer({ lite }: { lite: boolean }) {
  const config = useSiteConfig()
  const layer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (
      !config.effects.cursorMask ||
      lite ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return
    let frame = 0
    const move = (event: PointerEvent) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        layer.current?.style.setProperty("--cursor-x", `${event.clientX}px`)
        layer.current?.style.setProperty("--cursor-y", `${event.clientY}px`)
        frame = 0
      })
    }
    addEventListener("pointermove", move)
    return () => {
      removeEventListener("pointermove", move)
      cancelAnimationFrame(frame)
    }
  }, [config.effects.cursorMask, lite])

  if (lite) return null
  const classes = [
    "q-effects",
    config.effects.dots.on && "has-dots",
    config.effects.grid && "has-grid",
    config.effects.lines && "has-lines",
    config.effects.gradient && "has-gradient",
    config.effects.cursorMask && "has-mask",
    config.effects.splashCursor && "has-splash",
    config.effects.backgroundPosition === "scroll" && "is-scroll",
  ]
    .filter(Boolean)
    .join(" ")
  return (
    <div
      ref={layer}
      className={classes}
      style={
        { "--dots-opacity": config.effects.dots.opacity } as React.CSSProperties
      }
      aria-hidden="true"
    >
      {config.effects.particles &&
        Array.from({ length: 12 }, (_, index) => <i key={index} />)}
    </div>
  )
}
