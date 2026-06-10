import { BRAND } from "../lib/constants";
import { CONTACT, NOW } from "../data/content";

export function NowContent() {
  return (
    <>
      <p className="section-label font-display">NOW</p>
      {NOW.map((n, i) => (
        <div key={i} className="now-row">
          <span>
            <span className={`now-bullet ${n.live ? "" : "idle"}`} />
            {n.left}
          </span>
          <span style={{ color: "#999" }}>{n.right}</span>
        </div>
      ))}

      <div style={{ marginTop: 48 }}>
        <p className="section-label font-display">{CONTACT.heading}</p>
        <h3
          className="font-display"
          style={{ fontSize: 24, fontWeight: 700, margin: "0 0 12px" }}
        >
          {CONTACT.title}
        </h3>
        <p className="content-row-desc">{CONTACT.body}</p>
        <div className="contact-links">
          <a className="contact-link" href={`mailto:${BRAND.email}`}>
            Email →
          </a>
          <a className="contact-link" href={BRAND.github} target="_blank" rel="noreferrer">
            GitHub →
          </a>
        </div>
        <div className="footer-bar">
          <div>© 2026 Evan. Built with React + Vite + Rive.</div>
          <div className="ping">
            <span className="ping-dot" /> AVAILABLE FOR WORK
          </div>
        </div>
      </div>
    </>
  );
}
