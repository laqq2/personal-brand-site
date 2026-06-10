import { useEffect, useRef, useState } from "react";
import { BRAND } from "../../lib/constants";
import { StrikethroughLine } from "../StrikethroughLine/StrikethroughLine";
import "./IntroLoader.css";

export type IntroPhase =
  | "idle"
  | "strike"
  | "counting"
  | "dissolve"
  | "dot-grow"
  | "tagline"
  | "exit"
  | "done";

interface IntroLoaderProps {
  accent: string;
  onComplete: () => void;
  active: boolean;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function IntroLoader({ accent, onComplete, active }: IntroLoaderProps) {
  const [phase, setPhase] = useState<IntroPhase>("idle");
  const [counter, setCounter] = useState(0);
  const startRef = useRef<number | null>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!active) return;
    completedRef.current = false;
    setPhase("idle");
    setCounter(0);
    const t1 = setTimeout(() => setPhase("strike"), 100);
    const t2 = setTimeout(() => setPhase("counting"), 400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [active, accent]);

  useEffect(() => {
    if (phase !== "counting") return;

    startRef.current = null;
    let raf: number;

    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / 900, 1);
      setCounter(Math.round(easeOutCubic(progress) * 100));

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setPhase("dissolve");
        setTimeout(() => setPhase("dot-grow"), 500);
        setTimeout(() => setPhase("tagline"), 1100);
        setTimeout(() => setPhase("exit"), 2000);
        setTimeout(() => {
          setPhase("done");
          if (!completedRef.current) {
            completedRef.current = true;
            onComplete();
          }
        }, 2600);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, onComplete]);

  if (!active || phase === "done") return null;

  const showText = phase === "idle" || phase === "strike" || phase === "counting";
  const showDotOnly = phase === "dissolve" || phase === "dot-grow" || phase === "tagline" || phase === "exit";
  const dotLarge = phase === "dot-grow" || phase === "tagline" || phase === "exit";
  const showTagline = phase === "tagline" || phase === "exit";

  return (
    <div className={`intro-loader ${phase === "exit" ? "intro-loader--exit" : ""}`}>
      <div className="intro-logo-wrap">
        <div
          className={`intro-logo font-display ${showText ? "" : "intro-logo--hidden"} ${phase === "dissolve" ? "intro-logo--dissolve" : ""}`}
        >
          <span className="intro-logo-text">EVAN</span>
          <span className="intro-logo-bullet">•</span>
          <span className="intro-logo-text">DEV</span>
        </div>
        {showDotOnly && (
          <div className={`intro-dot ${dotLarge ? "intro-dot--large" : ""}`} />
        )}
        {(phase === "strike" || phase === "counting") && (
          <div className="intro-strikes">
            <StrikethroughLine color="#aaaaaa" variant="chalk" />
            <StrikethroughLine color={accent} variant="accent" />
          </div>
        )}
      </div>

      {showTagline && (
        <p className="intro-tagline font-display">{BRAND.tagline.join(" ")}</p>
      )}

      {(phase === "counting" || phase === "idle" || phase === "strike") && (
        <div className="intro-counter">{String(counter).padStart(2, "0")}</div>
      )}
    </div>
  );
}
