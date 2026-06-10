import {
  createContext,
  useCallback,
  useContext,
  type ReactNode,
} from "react";
import { useIsMobile } from "./useLenis";
import { useMouseParallax } from "./useMouseParallax";

interface AppContextValue {
  mouseX: number;
  mouseY: number;
  normX: number;
  isMobile: boolean;
  resetScroll: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();
  const mouse = useMouseParallax(!isMobile);

  const resetScroll = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AppContext.Provider
      value={{
        mouseX: mouse.x,
        mouseY: mouse.y,
        normX: mouse.normX,
        isMobile,
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
