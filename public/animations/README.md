# Terminal Iris Rive Asset

Drop your custom `terminal-iris.riv` file here.

**Full build guide:** [RIVE_BUILD_GUIDE.md](./RIVE_BUILD_GUIDE.md)

**Verify:** `npm run verify:rive`

## Quick contract

State machine: **TerminalIris**

| Input | Type |
|-------|------|
| `scrollProgress` | Number 0→1 |
| `mouseX` | Number -1→1 |
| `mouseY` | Number -1→1 |
| `isDark` | Boolean |
| `ecosystemClick` | Trigger |
| `portraitIndex` | Number 0→3 |

Images to import: `public/images/iris/*.png`

Until your file is ready, the site uses a CSS fallback.
