# Studio control audit

| Tab | Control | Config path | Consumer | Status |
|---|---|---|---|---|
| Appearance | Theme mode | `theme.mode` | `RootLayout` and document attributes | FIXED |
| Appearance | Shape | `theme.shape` | `SiteConfigProvider`, marketing CSS | WORKING |
| Appearance | Brand/accent/neutral | `theme.brand`, `theme.accent`, `theme.neutral` | document attributes and theme tokens | FIXED |
| Appearance | Solid style/effect | `theme.solidStyle`, `theme.solidEffect` | document attributes and CSS | FIXED |
| Appearance | Surface/scaling/transition | `theme.surface`, `theme.scaling`, `theme.transition` | document attributes and CSS | FIXED |
| Appearance | Background position | `effects.backgroundPosition` | `EffectsLayer` | FIXED |
| Appearance | Dots/opacity, grid, lines, gradient, particles, cursor mask, splash cursor | `effects.*` | `EffectsLayer` and marketing CSS | FIXED |
| Hero | Scene/copy/stats/trust | `heroScene`, `heroCopyVariant`, `hero.*` | `HeroScene`, `HeroCopy`, `Home` | WORKING |
| Navigation | Visibility and order | `navbar.items[].visible/order` | `Header`, `Footer`, studio editor | FIXED |
| Pages | Enable/disable | `pages.<id>.enabled` | `RootLayout`, header/footer | FIXED |
| Pages | Section visibility/order | `pages.<id>.sections[]` | configured page renderer | PARTIAL |
| Content | Bilingual overrides | `contentOverrides` | validated export/editor | PARTIAL |
| Footer | Columns/social/map/newsletter | `footer.*` | `Footer`, studio editor | FIXED |
| Data | Visibility/order | `dataOverrides.*[]` | studio editor and validated export | PARTIAL |
| Export | Reset/import/export/copy | service and JSON | config service | FIXED |
| Defaults | Language/Lite mode | `defaults.*` | site bootstrap and runtime | FIXED |
| Contact | EmailJS setup/test | `contact.email`, env | contact service and form | FIXED |

No controls were removed: every previously exposed control has a runtime consumer or a validated editor.
