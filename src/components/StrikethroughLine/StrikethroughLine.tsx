interface StrikethroughLineProps {
  color: string;
  variant?: "chalk" | "accent";
  className?: string;
  animate?: boolean;
}

export function StrikethroughLine({
  color,
  variant = "accent",
  className = "",
  animate = true,
}: StrikethroughLineProps) {
  const strokeColor = variant === "chalk" ? "#aaaaaa" : color;
  const strokeWidth = variant === "chalk" ? 2.5 : 3;

  return (
    <svg
      className={`strikethrough-svg ${className}`}
      viewBox="0 0 200 40"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M -10 38 Q 50 8, 110 28 T 210 12"
        fill="none"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        pathLength={1}
        style={{
          strokeDasharray: 1,
          strokeDashoffset: animate ? 0 : 1,
          animation: animate ? "drawStrike 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards" : undefined,
        }}
      />
    </svg>
  );
}

const STRIKE_PATHS: Record<string, string> = {
  building: "M -4 13 Q 58 3, 122 15 T 208 7",
  story: "M 0 11 Q 64 6, 128 13 T 200 9",
  stack: "M 2 14 Q 62 2, 115 17 T 198 5",
  now: "M -2 12 Q 56 8, 118 11 T 202 10",
  about: "M 0 12 Q 60 4, 120 14 T 200 8",
};

interface NavStrikethroughProps {
  color: string;
  visible: boolean;
  sectionId?: string;
}

export function NavStrikethrough({ color, visible, sectionId = "building" }: NavStrikethroughProps) {
  const path = STRIKE_PATHS[sectionId] ?? STRIKE_PATHS.building;

  return (
    <svg
      className="nav-strikethrough"
      viewBox="0 0 200 20"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <defs>
        <filter id={`strike-${sectionId}`} x="-2%" y="-20%" width="104%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" />
        </filter>
      </defs>
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        pathLength={1}
        style={{
          strokeDasharray: 1,
          strokeDashoffset: visible ? 0 : 1,
          transition: "stroke-dashoffset 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
          filter: `url(#strike-${sectionId})`,
        }}
      />
    </svg>
  );
}
