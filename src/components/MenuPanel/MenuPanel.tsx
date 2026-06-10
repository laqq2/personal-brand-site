import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavStrikethrough } from "../StrikethroughLine/StrikethroughLine";
import { BRAND, SECTIONS, type SectionId } from "../../lib/constants";
import "./MenuPanel.css";

interface MenuPanelProps {
  open: boolean;
  onClose: () => void;
  onAboutOpen: () => void;
}

const NAV_ITEMS: { id: SectionId; isRoute: boolean }[] = [
  { id: "building", isRoute: true },
  { id: "about", isRoute: false },
  { id: "story", isRoute: true },
  { id: "stack", isRoute: true },
  { id: "now", isRoute: true },
];

export function MenuPanel({ open, onClose, onAboutOpen }: MenuPanelProps) {
  const [hovered, setHovered] = useState<SectionId | null>(null);
  const navigate = useNavigate();

  const handleClick = (id: SectionId, isRoute: boolean) => {
    onClose();
    if (id === "about") {
      onAboutOpen();
    } else if (isRoute) {
      const section = SECTIONS[id];
      if (section.route) navigate(section.route);
    }
  };

  return (
    <>
      <div
        className={`dim-overlay ${open ? "is-visible" : ""}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <nav
        className={`slide-panel menu-panel ${open ? "is-open" : ""}`}
        aria-hidden={!open}
        aria-label="Main navigation"
      >
        <button className="panel-close" onClick={onClose} type="button">
          Close
        </button>
        <div className="slide-panel-inner">
          <ul className="menu-list">
            {NAV_ITEMS.map(({ id, isRoute }) => {
              const section = SECTIONS[id];
              const isPrimary = "primary" in section && section.primary;
              return (
                <li key={id} className="menu-item">
                  <button
                    className={`menu-link font-display ${isPrimary ? "menu-link--primary" : ""}`}
                    onMouseEnter={() => setHovered(id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => handleClick(id, isRoute)}
                    type="button"
                  >
                    <span
                      className="menu-dot"
                      style={{
                        background: hovered === id ? section.accent : isPrimary ? "#0a0a0a" : "transparent",
                        borderColor: hovered === id || isPrimary ? section.accent : "#ccc",
                      }}
                    />
                    <span className="menu-link-text">{section.label}</span>
                    {!isPrimary && (
                      <NavStrikethrough
                        color={section.accent}
                        visible={hovered === id}
                        sectionId={id}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="menu-footer">
            <a className="menu-footer-link font-display" href={`mailto:${BRAND.email}`}>
              JOIN / CONTACT
            </a>
            <div className="menu-footer-meta">
              <a href={BRAND.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <span>·</span>
              <a href={`mailto:${BRAND.email}`}>Email</a>
            </div>
            <p className="menu-credits">
              © 2026 Evan · Built with React + Vite
            </p>
          </div>
        </div>
      </nav>
    </>
  );
}

export function ContentPanel({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        className={`dim-overlay ${open ? "is-visible" : ""}`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        className={`slide-panel content-panel ${open ? "is-open" : ""}`}
        aria-hidden={!open}
      >
        <button className="panel-close" onClick={onClose} type="button">
          Close
        </button>
        <div className="slide-panel-inner">
          <h2 className="panel-heading font-display">{title}</h2>
          <div className="panel-body">{children}</div>
        </div>
      </aside>
    </>
  );
}
