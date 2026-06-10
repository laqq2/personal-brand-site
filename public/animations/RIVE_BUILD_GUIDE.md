# Terminal Iris — Rive Build Guide

Build this in [Rive Editor](https://rive.app), then export to `terminal-iris.riv` in this folder.

## Artboard

- **Size:** 800×800px
- **State machine name:** `TerminalIris` (exact match required)
- **Default:** Dark mode, iris nearly closed (~12% aperture), portrait visible

## Image assets (import from repo)

| Rive asset name | Source file |
|-----------------|-------------|
| `slide_0` | `/public/images/iris/lockonai.png` |
| `slide_1` | `/public/images/iris/focal.png` |
| `slide_2` | `/public/images/iris/code.png` |
| `slide_3` | `/public/images/iris/portrait.png` |
| `studio` | `/public/images/iris/studio.png` |

## Layer stack (bottom → top)

1. Drop shadow — soft ellipse under lens
2. Outer bezel — matte black (dark) / brushed chrome (light)
3. Outer label ring — curved: AI PRODUCTS, VCE EDTECH, FULL-STACK, FOUNDER + arrows
4. Tick ring — 36–48 mechanical ticks
5. Inner ring — secondary bezel
6. Iris blades — 8 blades, open driven by `scrollProgress`
7. Content layer — circular mask, `portraitIndex` switches slides 0–3
8. Studio layer — opacity driven by `scrollProgress` (visible when iris opens)
9. Ecosystem overlay — chromatic rings on `ecosystemClick` trigger

## State machine inputs

| Input | Type | Driven by React |
|-------|------|-----------------|
| `scrollProgress` | Number 0→1 | Lenis scroll |
| `mouseX` | Number -1→1 | Cursor X |
| `mouseY` | Number -1→1 | Cursor Y |
| `isDark` | Boolean | Theme toggle |
| `ecosystemClick` | Trigger | About Us CTA |
| `portraitIndex` | Number 0→3 | 3s auto-cycle |

## Animation notes

- **Mouse tilt:** 2–4° max on entire lens, lagged follow of mouseX/mouseY
- **Scroll:** Map scrollProgress to blade rotation; studio fully visible at ~0.75
- **isDark:** Swap bezel materials (black anodized ↔ chrome)
- **ecosystemClick:** Scale ~1.6x + holographic ring pulse over 2.4s
- **Idle:** Iris closed, portrait only — studio hidden until scroll

## Export

Save as `public/animations/terminal-iris.riv`. The site auto-detects it and disables the CSS fallback.

## Verify after drop-in

1. `npm run dev` — lens should render (no CSS fallback rings)
2. Scroll — iris opens, studio fades in
3. Move mouse — subtle tilt
4. Toggle theme — material swap
5. Click About Us — ecosystem burst
6. Wait 3s — portrait slides cycle

Or run: `npm run verify:rive` (checks file exists + lists input contract)
