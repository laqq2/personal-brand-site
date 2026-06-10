import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useLenis, useIsMobile } from "./useLenis";
import { useMouseParallax } from "./useMouseParallax";
import { IRIS_SLIDES } from "../data/content";

interface AppContextValue {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
  normX: number;
  portraitIndex: number;
  ecosystemOpen: boolean;
  isMobile: boolean;
  triggerEcosystem: () => void;
  resetEcosystem: () => void;
  resetScroll: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();
  const { scrollProgress, resetScroll } = useLenis({ enabled: !isMobile });
  const mouse = useMouseParallax(!isMobile);
  const [portraitIndex, setPortraitIndex] = useState(0);
  const [ecosystemOpen, setEcosystemOpen] = useState(false);

  useEffect(() => {
    resetScroll();
  }, [resetScroll]);

  useEffect(() => {
    const id = setInterval(() => {
      setPortraitIndex((i) => (i + 1) % IRIS_SLIDES.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const triggerEcosystem = useCallback(() => {
    setEcosystemOpen(true);
    setTimeout(() => setEcosystemOpen(false), 2400);
  }, []);

  const resetEcosystem = useCallback(() => setEcosystemOpen(false), []);

  return (
    <AppContext.Provider
      value={{
        scrollProgress: isMobile ? 0 : scrollProgress,
        mouseX: mouse.x,
        mouseY: mouse.y,
        normX: mouse.normX,
        portraitIndex,
        ecosystemOpen,
        isMobile,
        triggerEcosystem,
        resetEcosystem,
        resetScroll,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
