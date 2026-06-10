import type { SectionId } from "./constants";

export type TransitionAccent = string;

export interface TransitionConfig {
  accent: TransitionAccent;
  sectionId?: SectionId;
}

export function getTransitionForPath(pathname: string): TransitionConfig {
  switch (pathname) {
    case "/building":
      return { accent: "#E63946", sectionId: "building" };
    case "/story":
      return { accent: "#2A9D8F", sectionId: "story" };
    case "/stack":
      return { accent: "#457B9D", sectionId: "stack" };
    case "/now":
      return { accent: "#E9C46A", sectionId: "now" };
    default:
      return { accent: "#6FFF00" };
  }
}
