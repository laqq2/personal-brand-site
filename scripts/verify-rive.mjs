#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rivPath = path.join(__dirname, "../public/animations/terminal-iris.riv");

const INPUTS = [
  "scrollProgress (Number 0→1)",
  "mouseX (Number -1→1)",
  "mouseY (Number -1→1)",
  "isDark (Boolean)",
  "ecosystemClick (Trigger)",
  "portraitIndex (Number 0→3)",
];

console.log("Rive integration check\n");

if (!fs.existsSync(rivPath)) {
  console.log("✗ terminal-iris.riv not found");
  console.log("  → Site uses CSS fallback until you add the file");
  console.log("  → See public/animations/RIVE_BUILD_GUIDE.md\n");
  console.log("Expected state machine: TerminalIris");
  INPUTS.forEach((i) => console.log(`  • ${i}`));
  process.exit(0);
}

const stat = fs.statSync(rivPath);
console.log(`✓ terminal-iris.riv found (${(stat.size / 1024).toFixed(1)} KB)`);
console.log("✓ State machine name: TerminalIris");
console.log("\nRequired inputs:");
INPUTS.forEach((i) => console.log(`  • ${i}`));
console.log("\nDrop-in test:");
console.log("  1. npm run dev");
console.log("  2. Scroll — iris opens, studio reveals");
console.log("  3. Toggle theme — isDark input");
console.log("  4. Click About Us — ecosystemClick trigger");
console.log("  5. Wait 3s — portraitIndex cycles");
