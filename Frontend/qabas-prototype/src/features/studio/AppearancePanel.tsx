import { siteConfigService } from "@/config/site-config.service"
import type { SiteConfig } from "@/config/site-config.schema"
import ControlGroup from "./ControlGroup"
import SegmentedControl from "./SegmentedControl"
import ToggleRow from "./ToggleRow"

export default function AppearancePanel({
  config,
  label,
}: {
  config: SiteConfig
  label: (key: string) => string
}) {
  const theme = <K extends keyof SiteConfig["theme"],>(
    key: K,
    value: SiteConfig["theme"][K],
  ) => siteConfigService.patch({ theme: { ...config.theme, [key]: value } })
  const effect = <K extends keyof SiteConfig["effects"],>(
    key: K,
    value: SiteConfig["effects"][K],
  ) => siteConfigService.patch({ effects: { ...config.effects, [key]: value } })
  return (
    <>
      <h2>{label("appearance")}</h2>
      <ControlGroup title={label("theme")}>
        <SegmentedControl
          value={config.theme.mode}
          options={[
            { value: "light", label: "☀" },
            { value: "dark", label: "◐" },
            { value: "system", label: "▣" },
          ]}
          onChange={(value) => theme("mode", value)}
        />
      </ControlGroup>
      <ControlGroup title={label("shape")}>
        <SegmentedControl
          value={config.theme.shape}
          options={[
            { value: "soft", label: "□" },
            { value: "rounded", label: "▢" },
            { value: "pill", label: "▢" },
          ]}
          onChange={(value) => theme("shape", value)}
        />
      </ControlGroup>
      <h2>{label("color")}</h2>
      {(["brand", "accent", "neutral"] as const).map((key) => (
        <ControlGroup title={key} key={key}>
          <div className="studio-swatches">
            {(key === "neutral"
              ? ["ink", "surface", "soft"]
              : [
                  "indigo",
                  "purple",
                  "orange",
                  "amber",
                  "coral",
                  "gold",
                  "sky",
                  "pink",
                  "mint",
                  "lemon",
                ]
            ).map((token) => (
              <button
                type="button"
                className={`swatch-${token} ${
                  config.theme[key] === token ? "selected" : ""
                }`}
                onClick={() => theme(key, token)}
                aria-label={token}
                key={token}
              />
            ))}
          </div>
        </ControlGroup>
      ))}
      <h2>{label("effects")}</h2>
      <ControlGroup title={label("style")}>
        <SegmentedControl value={config.theme.solidStyle} options={[{ value: "color", label: "Color" }, { value: "inverse", label: "Inverse" }]} onChange={(value) => theme("solidStyle", value)} />
      </ControlGroup>
      <ControlGroup title={label("effect")}>
        <SegmentedControl value={config.theme.solidEffect} options={[{ value: "flat", label: "Flat" }, { value: "plastic", label: "Plastic" }]} onChange={(value) => theme("solidEffect", value)} />
      </ControlGroup>
      <ControlGroup title={label("surface")}>
        <SegmentedControl value={config.theme.surface} options={[{ value: "filled", label: "Filled" }, { value: "translucent", label: "Translucent" }]} onChange={(value) => theme("surface", value)} />
      </ControlGroup>
      <ControlGroup title={label("scaling")}>
        <SegmentedControl value={config.theme.scaling} options={(["90", "95", "100", "105", "110"] as const).map((value) => ({ value, label: `${value}%` }))} onChange={(value) => theme("scaling", value)} />
      </ControlGroup>
      <ControlGroup title={label("transition")}>
        <SegmentedControl value={config.theme.transition} options={(["all", "micro", "macro"] as const).map((value) => ({ value, label: value }))} onChange={(value) => theme("transition", value)} />
      </ControlGroup>
      <SegmentedControl value={config.effects.backgroundPosition} options={[{ value: "fixed", label: "Fixed" }, { value: "scroll", label: "Scroll" }]} onChange={(value) => effect("backgroundPosition", value)} />
      {([
        "cursorMask",
        "grid",
        "lines",
        "gradient",
        "particles",
        "splashCursor",
      ] as const).map((key) => (
        <ToggleRow
          label={key}
          value={config.effects[key]}
          onChange={(value) => effect(key, value)}
          key={key}
        />
      ))}
      <ToggleRow
        label="dots"
        value={config.effects.dots.on}
        onChange={(on) => effect("dots", { ...config.effects.dots, on })}
      />
      <input
        aria-label="Dot opacity"
        type="range"
        min="0"
        max="1"
        step=".05"
        value={config.effects.dots.opacity}
        onChange={(event) =>
          effect("dots", {
            ...config.effects.dots,
            opacity: Number(event.target.value),
          })
        }
      />
    </>
  )
}
