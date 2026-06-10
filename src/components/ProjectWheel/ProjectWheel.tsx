import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PROJECTS } from "../../data/content";
import { useApp } from "../../hooks/useAppContext";
import { StrikethroughLine } from "../StrikethroughLine/StrikethroughLine";
import "./ProjectWheel.css";

const WHEEL_PROJECTS = PROJECTS.filter((p) => p.href !== "#");

/** Radial positions: top, left, right (desktop). Mobile uses grid. */
const POSITIONS = ["top", "left", "right"] as const;

export function ProjectWheel() {
  const navigate = useNavigate();
  const { mouseX, mouseY, isMobile } = useApp();
  const [hovered, setHovered] = useState<string | null>(null);

  const handleProjectClick = (href: string) => {
    if (href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className="project-wheel"
      style={
        isMobile
          ? undefined
          : {
              transform: `perspective(800px) rotateX(${mouseY * -3}deg) rotateY(${mouseX * 3}deg)`,
            }
      }
      aria-label="Project navigation"
    >
      <div className="project-wheel__ring" aria-hidden="true" />
      <div className="project-wheel__spokes" aria-hidden="true">
        {(["top", "left", "right"] as const).map((pos) => (
          <span key={pos} className={`project-wheel__spoke project-wheel__spoke--${pos}`} />
        ))}
      </div>

      <div className="project-wheel__hub">
        <img
          className="project-wheel__portrait"
          src="/images/iris/portrait.png"
          alt="Evan"
          draggable={false}
        />
        <span className="project-wheel__monogram font-display" aria-hidden="true">
          E
        </span>
      </div>

      <div className="project-wheel__nodes">
        {WHEEL_PROJECTS.map((project, i) => {
          const pos = POSITIONS[i] ?? "bottom";
          const isHovered = hovered === project.name;

          return (
            <button
              key={project.name}
              type="button"
              className={`project-wheel__node project-wheel__node--${pos}`}
              onMouseEnter={() => setHovered(project.name)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleProjectClick(project.href)}
              aria-label={`${project.name} — ${project.tagline}`}
            >
              <span className="project-wheel__node-inner">
                {isHovered && (
                  <span className="project-wheel__strike">
                    <StrikethroughLine color="var(--accent)" animate />
                  </span>
                )}
                <span className="project-wheel__node-name font-display">{project.name}</span>
                <span
                  className={`project-wheel__node-status ${
                    project.status === "LIVE" ? "project-wheel__node-status--live" : ""
                  }`}
                >
                  {project.status}
                </span>
                <span className="project-wheel__node-tagline">{project.tagline}</span>
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className="project-wheel__all font-display"
        onClick={() => navigate("/building")}
      >
        All work →
      </button>
    </div>
  );
}
