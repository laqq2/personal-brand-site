export const BRAND = {
  name: "EVAN•DEV",
  tagline: ["BUILDING AI PRODUCTS", "FROM PERSONAL PROBLEMS"] as const,
  homeAccent: "#6FFF00",
  email: "evankonggg@gmail.com",
  github: "https://github.com/laqq2",
} as const;

export const RING_SEGMENTS = [
  { label: "AI PRODUCTS", route: "/building", id: "building" as const },
  { label: "VCE EDTECH", route: "/story", id: "story" as const },
  { label: "FULL-STACK", route: "/stack", id: "stack" as const },
  { label: "FOUNDER", route: "/now", id: "now" as const },
] as const;

export const RING_LABELS = RING_SEGMENTS.map((s) => s.label);

export const SECTIONS = {
  about: { id: "about", label: "ABOUT", route: null, accent: "#0A0A0A", primary: true },
  building: { id: "building", label: "BUILDING", route: "/building", accent: "#E63946" },
  story: { id: "story", label: "STORY", route: "/story", accent: "#2A9D8F" },
  stack: { id: "stack", label: "STACK", route: "/stack", accent: "#457B9D" },
  now: { id: "now", label: "NOW", route: "/now", accent: "#E9C46A" },
} as const;

export type SectionId = keyof typeof SECTIONS;

export const RIVE_CONFIG = {
  src: "/animations/terminal-iris.riv",
  stateMachine: "TerminalIris",
  inputs: {
    scrollProgress: "scrollProgress",
    mouseX: "mouseX",
    mouseY: "mouseY",
    isDark: "isDark",
    ecosystemClick: "ecosystemClick",
    portraitIndex: "portraitIndex",
  },
} as const;

export const MOBILE_BREAKPOINT = 768;
