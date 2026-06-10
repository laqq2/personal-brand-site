import { BRAND } from "../../lib/constants";
import "./HeroTagline.css";

export function HeroTagline() {
  return (
    <div className="hero-tagline" aria-label={BRAND.tagline.join(" ")}>
      {BRAND.tagline.map((line) => (
        <span key={line} className="hero-tagline__line font-display">
          {line}
        </span>
      ))}
    </div>
  );
}
