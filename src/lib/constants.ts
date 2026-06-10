export const BRAND = {
  name: "EVAN•DEV",
  tagline: ["BUILDING AI PRODUCTS", "FROM PERSONAL PROBLEMS"] as const,
  homeAccent: "#6FFF00",
  email: "evankonggg@gmail.com",
  github: "https://github.com/laqq2",
} as const;

export const SECTIONS = {
  about: { id: "about", label: "ABOUT", route: null, accent: "#0A0A0A" },
  building: { id: "building", label: "BUILDING", route: "/building", accent: "#E63946", primary: true },
  story: { id: "story", label: "STORY", route: "/story", accent: "#2A9D8F" },
  stack: { id: "stack", label: "STACK", route: "/stack", accent: "#457B9D" },
  now: { id: "now", label: "NOW", route: "/now", accent: "#E9C46A" },
} as const;

export type SectionId = keyof typeof SECTIONS;

export const MOBILE_BREAKPOINT = 768;
