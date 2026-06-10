import type { SectionId } from "./constants";

export type LoaderVariant = "home" | SectionId;

export interface TransitionConfig {
  accent: string;
  sectionId?: SectionId;
  loader: LoaderVariant;
}

const INTRO_SEEN_KEY = "evan-intro-seen";

export function hasSeenHomeIntro(): boolean {
  try {
    return sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

export function markHomeIntroSeen(): void {
  try {
    sessionStorage.setItem(INTRO_SEEN_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function getTransitionForPath(pathname: string): TransitionConfig {
  switch (pathname) {
    case "/building":
      return { accent: "#E63946", sectionId: "building", loader: "building" };
    case "/story":
      return { accent: "#2A9D8F", sectionId: "story", loader: "story" };
    case "/stack":
      return { accent: "#457B9D", sectionId: "stack", loader: "stack" };
    case "/now":
      return { accent: "#E9C46A", sectionId: "now", loader: "now" };
    default:
      return { accent: "#6FFF00", loader: "home" };
  }
}

export function shouldShowFullIntro(pathname: string): boolean {
  return pathname === "/" && !hasSeenHomeIntro();
}

export function shouldShowSectionLoader(pathname: string): boolean {
  return pathname !== "/";
}
