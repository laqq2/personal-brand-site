import { PROJECTS } from "../data/content";

export function BuildingContent() {
  const liveCount = PROJECTS.filter((p) => p.status === "LIVE").length;

  return (
    <>
      <p className="section-label font-display">BUILDING // 03</p>
      <div className="building-intro">
        <p className="building-intro__lead">
          I build AI products from problems I've lived personally — {liveCount} live,{" "}
          {PROJECTS.length - liveCount} from hackathons & experiments.
        </p>
      </div>
      {PROJECTS.map((p) => (
        <a
          key={p.name}
          className="content-row content-row--featured"
          href={p.href}
          target={p.href.startsWith("http") ? "_blank" : undefined}
          rel={p.href.startsWith("http") ? "noreferrer" : undefined}
          onClick={p.href === "#" ? (e) => e.preventDefault() : undefined}
        >
          <h3 className="content-row-title font-display">
            {p.name}
            {p.href.startsWith("http") && (
              <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
                <path
                  d="M7 17L17 7M8 7h9v9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </h3>
          <p className="content-row-tagline font-display">{p.tagline}</p>
          <p className="content-row-desc">{p.desc}</p>
          {p.meta && <p className="content-row-meta">{p.meta}</p>}
          <span
            className={`status-pill ${p.status === "LIVE" ? "status-live" : "status-hack"}`}
          >
            {p.status}
          </span>
        </a>
      ))}
    </>
  );
}
