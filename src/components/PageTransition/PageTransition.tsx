import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IntroLoader } from "../IntroLoader/IntroLoader";
import { getTransitionForPath } from "../../lib/transitions";
import { useIntro } from "../../hooks/useIntroContext";
import { useApp } from "../../hooks/useAppContext";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const { setContentVisible } = useIntro();
  const { resetScroll } = useApp();
  const [showIntro, setShowIntro] = useState(true);
  const [visible, setVisible] = useState(false);
  const transition = getTransitionForPath(location.pathname);

  useEffect(() => {
    setShowIntro(true);
    setVisible(false);
    setContentVisible(false);
    resetScroll();
  }, [location.pathname, setContentVisible, resetScroll]);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
    setVisible(true);
    setContentVisible(true);
    resetScroll();
  }, [setContentVisible, resetScroll]);

  return (
    <>
      <IntroLoader
        accent={transition.accent}
        active={showIntro}
        onComplete={handleIntroComplete}
      />
      <div
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 400ms ease",
        }}
      >
        {children}
      </div>
    </>
  );
}
