import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { IntroLoader } from "../IntroLoader/IntroLoader";
import { SectionLoader } from "../SectionLoader/SectionLoader";
import {
  getTransitionForPath,
  markHomeIntroSeen,
  shouldShowFullIntro,
  shouldShowSectionLoader,
} from "../../lib/transitions";
import { useIntro } from "../../hooks/useIntroContext";
import { useApp } from "../../hooks/useAppContext";

interface PageTransitionProps {
  children: React.ReactNode;
}

type LoaderMode = "full" | "section" | "none";

function getLoaderMode(pathname: string): LoaderMode {
  if (shouldShowFullIntro(pathname)) return "full";
  if (shouldShowSectionLoader(pathname)) return "section";
  return "none";
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const { setContentVisible } = useIntro();
  const { resetScroll } = useApp();
  const [loaderMode, setLoaderMode] = useState<LoaderMode>(() => getLoaderMode(location.pathname));
  const [visible, setVisible] = useState(loaderMode === "none");
  const transition = getTransitionForPath(location.pathname);
  const isFirstMount = useRef(true);

  useEffect(() => {
    const mode = getLoaderMode(location.pathname);
    setLoaderMode(mode);
    setVisible(mode === "none");
    setContentVisible(mode === "none");

    if (mode !== "none") {
      resetScroll();
    }
  }, [location.pathname, setContentVisible, resetScroll]);

  const handleComplete = useCallback(() => {
    if (loaderMode === "full") {
      markHomeIntroSeen();
    }
    setLoaderMode("none");
    setVisible(true);
    setContentVisible(true);
    resetScroll();
  }, [loaderMode, setContentVisible, resetScroll]);

  useEffect(() => {
    isFirstMount.current = false;
  }, []);

  const showFull = loaderMode === "full";
  const sectionVariant =
    transition.sectionId && transition.sectionId !== "about"
      ? transition.sectionId
      : null;
  const showSection = loaderMode === "section" && sectionVariant;

  return (
    <>
      <IntroLoader
        accent={transition.accent}
        active={showFull}
        onComplete={handleComplete}
      />
      {showSection && sectionVariant && (
        <SectionLoader
          variant={sectionVariant}
          accent={transition.accent}
          active
          onComplete={handleComplete}
        />
      )}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 350ms ease",
        }}
      >
        {children}
      </div>
    </>
  );
}
