import { IRIS_SLIDES, STUDIO_IMAGE } from "../../data/content";
import "./HeroTerminal.css";

interface TerminalIrisFallbackProps {
  scrollProgress: number;
  portraitIndex: number;
  ecosystemOpen: boolean;
  isDark: boolean;
}

export function TerminalIrisFallback({
  scrollProgress,
  portraitIndex,
  ecosystemOpen,
  isDark,
}: TerminalIrisFallbackProps) {
  const irisOpen = scrollProgress * 100;
  const scale = ecosystemOpen ? 1.8 : 1;
  const showStudio = scrollProgress > 0.35;
  const portraitOpacity = showStudio ? Math.max(0, 1 - (scrollProgress - 0.35) * 2.2) : 1;
  const apertureSize = 5 + irisOpen * 43;

  return (
    <div
      className={`terminal-fallback ${isDark ? "terminal-fallback--dark" : "terminal-fallback--light"} ${ecosystemOpen ? "terminal-fallback--ecosystem" : ""}`}
      style={{ transform: `scale(${scale})` }}
    >
      {ecosystemOpen && (
        <div className="terminal-fallback__holo">
          <div className="terminal-fallback__ring terminal-fallback__ring--1" />
          <div className="terminal-fallback__ring terminal-fallback__ring--2" />
          <div className="terminal-fallback__ring terminal-fallback__ring--3" />
        </div>
      )}

      <div className="terminal-fallback__outer">
        <div className="terminal-fallback__ticks" />
        <div className="terminal-fallback__inner-ring" />

        <div
          className="terminal-fallback__iris"
          style={{
            clipPath: `circle(${apertureSize}% at 50% 50%)`,
          }}
        >
          <div
            className="terminal-fallback__portraits"
            style={{ opacity: portraitOpacity }}
          >
            {IRIS_SLIDES.map((slide, i) => (
              <img
                key={slide.src}
                className={`terminal-fallback__slide ${i === portraitIndex ? "terminal-fallback__slide--active" : ""}`}
                src={slide.src}
                alt={slide.alt}
                draggable={false}
              />
            ))}
          </div>

          <div
            className="terminal-fallback__studio"
            style={{ opacity: showStudio ? Math.min(1, (scrollProgress - 0.35) * 2.2) : 0 }}
          >
            <img
              className="terminal-fallback__studio-img"
              src={STUDIO_IMAGE.src}
              alt={STUDIO_IMAGE.alt}
              draggable={false}
            />
          </div>
        </div>

        <div
          className="terminal-fallback__blades"
          style={{ transform: `rotate(${scrollProgress * 45}deg)` }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="terminal-fallback__blade"
              style={{
                transform: `rotate(${i * 45}deg) translateY(-${scrollProgress * 18}px)`,
                opacity: 1 - scrollProgress * 0.85,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
