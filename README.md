# Personal Brand Site

Original dark editorial portfolio at `/` (April 2026). Motion / Steven-inspired revamp preserved at **`/studio`**.

## Routes

| URL | Version |
|-----|---------|
| `/` | Original single-page site — neon green, DM Serif, scroll sections |
| `/studio` | Vite + React motion site — project wheel, panels, theme toggle |

## Design system (studio)

- **Identity**: EVAN•DEV with bullet-dot brand mark
- **Default theme**: Dark (pure black `#000000`)
- **Hero**: Bottom-left tagline + About Us CTA (steven.com layout)
- **Accent**: `#6FFF00` neon green
- **Section colors**: Building (red), Story (green), Stack (blue), Now (gold)

## Stack (studio)

React 19 · Vite · TypeScript · React Router

## Development

```bash
npm install
npm run dev
```

- `http://localhost:5173/` — original site
- `http://localhost:5173/studio` — motion version

Clear `localStorage.evan-theme` in devtools if you want to reset to dark default on studio.

## Live

[evanbuilds.vercel.app](https://evanbuilds.vercel.app) · [studio](https://evanbuilds.vercel.app/studio)
