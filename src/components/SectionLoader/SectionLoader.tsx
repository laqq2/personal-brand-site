import { useEffect, useRef, useState } from "react";
import { PROJECTS, STACK, STORY, NOW } from "../../data/content";
import type { LoaderVariant } from "../../lib/transitions";
import "./SectionLoader.css";

interface SectionLoaderProps {
  variant: Exclude<LoaderVariant, "home" | "about">;
  accent: string;
  active: boolean;
  onComplete: () => void;
}

const DURATION_MS = 1050;

function BuildingLoader({ accent, progress }: { accent: string; progress: number }) {
  const names = PROJECTS.filter((p) => p.href !== "#").map((p) => p.name);
  const index = Math.min(
    Math.floor(progress * names.length),
    names.length - 1,
  );

  return (
    <div className="section-loader__building">
      <span className="section-loader__kicker font-display">Scanning builds</span>
      <span className="section-loader__headline font-display" style={{ color: accent }}>
        {names[index]}
      </span>
      <div className="section-loader__bar">
        <div
          className="section-loader__bar-fill"
          style={{ width: `${progress * 100}%`, background: accent }}
        />
      </div>
      <span className="section-loader__meta">
        {names.length} projects indexed
      </span>
    </div>
  );
}

function StoryLoader({ accent, progress }: { accent: string; progress: number }) {
  const age = STORY[Math.min(Math.floor(progress * STORY.length), STORY.length - 1)];

  return (
    <div className="section-loader__story">
      <span className="section-loader__kicker font-display">Timeline</span>
      <span className="section-loader__age font-display" style={{ color: accent }}>
        {age.age}
      </span>
      <span className="section-loader__headline section-loader__headline--sm font-display">
        {age.head}
      </span>
    </div>
  );
}

function StackLoader({ accent, progress }: { accent: string; progress: number }) {
  const lines = [
    "> resolving dependencies...",
    `> ${STACK[0][0]} ✓`,
    `> ${STACK[3][0]} ✓`,
    `> ${STACK[6][0]} ✓`,
    `> ${STACK[9][0]} ✓`,
    "> stack ready",
  ];
  const visible = Math.min(Math.ceil(progress * lines.length), lines.length);

  return (
    <div className="section-loader__stack">
      <span className="section-loader__kicker font-display">Environment</span>
      <div className="section-loader__terminal">
        {lines.slice(0, visible).map((line, i) => (
          <span
            key={line}
            className={`section-loader__line ${i === visible - 1 ? "section-loader__line--active" : ""}`}
            style={line.startsWith(">") && line.includes("✓") ? { color: accent } : undefined}
          >
            {line}
          </span>
        ))}
        <span className="section-loader__cursor" style={{ background: accent }} />
      </div>
    </div>
  );
}

function NowLoader({ accent, progress }: { accent: string; progress: number }) {
  const item = NOW[Math.min(Math.floor(progress * NOW.length), NOW.length - 1)];

  return (
    <div className="section-loader__now">
      <span className="section-loader__kicker font-display">
        <span className="section-loader__live-dot" style={{ background: accent }} />
        Live sync
      </span>
      <span className="section-loader__headline section-loader__headline--sm font-display">
        {item.left}
      </span>
      <span className="section-loader__meta">{item.right}</span>
    </div>
  );
}

export function SectionLoader({ variant, accent, active, onComplete }: SectionLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    if (!active) return;
    completedRef.current = false;
    setProgress(0);
    setExiting(false);

    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased);

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setExiting(true);
        setTimeout(() => {
          if (!completedRef.current) {
            completedRef.current = true;
            onComplete();
          }
        }, 280);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, variant, onComplete]);

  if (!active) return null;

  return (
    <div
      className={`section-loader ${exiting ? "section-loader--exit" : ""}`}
      style={{ "--loader-accent": accent } as React.CSSProperties}
    >
      {variant === "building" && <BuildingLoader accent={accent} progress={progress} />}
      {variant === "story" && <StoryLoader accent={accent} progress={progress} />}
      {variant === "stack" && <StackLoader accent={accent} progress={progress} />}
      {variant === "now" && <NowLoader accent={accent} progress={progress} />}
      <span className="section-loader__pct">{String(Math.round(progress * 100)).padStart(2, "0")}</span>
    </div>
  );
}
