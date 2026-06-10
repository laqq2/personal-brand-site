import { useApp } from "../../hooks/useAppContext";
import { BRAND } from "../../lib/constants";
import "./HeroTagline.css";

export function HeroTagline() {
  const { scrollProgress } = useApp();
  const hidden = scrollProgress > 0.15;
  const opacity = Math.max(0, 1 - scrollProgress / 0.15);

  return (
    <div
      className={`hero-tagline ${hidden ? "hero-tagline--hidden" : ""}`}
      style={{ opacity, transform: `translateY(${scrollProgress * 24}px)` }}
      aria-hidden={hidden}
    >
      {BRAND.tagline.map((line) => (
        <span key={line} className="hero-tagline__line font-display">
          {line}
        </span>
      ))}
    </div>
  );
}
