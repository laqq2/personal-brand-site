# Personal Brand Site

> Steven.com-inspired immersive portfolio — terminal iris hero, scroll-jacked motion, slide panels.

Vite + React + TypeScript site with Rive, Lenis, and React Router.

## Design system

- **Identity**: EVAN•DEV with bullet-dot brand mark
- **Default theme**: Dark (pure black `#000000`)
- **Hero**: Bottom-left tagline + About Us CTA (steven.com layout)
- **Accent**: `#6FFF00` neon green
- **Section colors**: Building (red), Story (green), Stack (blue), Now (gold)

## Stack

React 18 · Vite · TypeScript · Lenis · @rive-app/react-canvas · React Router

## Rive asset

Build `terminal-iris.riv` using [public/animations/RIVE_BUILD_GUIDE.md](public/animations/RIVE_BUILD_GUIDE.md), then drop it in `public/animations/`.

```bash
npm run verify:rive   # check file + list input contract
```

Until the `.riv` file exists, a CSS fallback renders the iris with your uploaded images.

## Development

```bash
npm install
npm run dev
```

Clear `localStorage.evan-theme` in devtools if you want to reset to dark default.

## Live

[evanbuilds.vercel.app](https://evanbuilds.vercel.app)
