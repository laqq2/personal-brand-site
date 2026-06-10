import { createContext, useContext, useState, type ReactNode } from "react";

interface IntroContextValue {
  contentVisible: boolean;
  setContentVisible: (v: boolean) => void;
}

const IntroContext = createContext<IntroContextValue | null>(null);

export function IntroProvider({ children }: { children: ReactNode }) {
  const [contentVisible, setContentVisible] = useState(false);
  return (
    <IntroContext.Provider value={{ contentVisible, setContentVisible }}>
      {children}
    </IntroContext.Provider>
  );
}

export function useIntro() {
  const ctx = useContext(IntroContext);
  if (!ctx) throw new Error("useIntro must be used within IntroProvider");
  return ctx;
}
