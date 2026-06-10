import { ABOUT, STORY } from "../data/content";

export function AboutContent() {
  return (
    <>
      <p>{ABOUT.blurb}</p>
      <p style={{ marginTop: 16, color: "#999", fontSize: 11 }}>{ABOUT.meta}</p>
      <div style={{ marginTop: 32 }}>
        {STORY.slice(0, 3).map((s) => (
          <div key={s.age} style={{ marginBottom: 20 }}>
            <strong className="font-display" style={{ fontSize: 11, letterSpacing: "0.08em" }}>
              Age {s.age} — {s.head}
            </strong>
            <p style={{ margin: "8px 0 0", fontSize: 12, lineHeight: 1.7, color: "#555" }}>
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
