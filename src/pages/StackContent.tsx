import { EDUCATION, STACK } from "../data/content";

export function StackContent() {
  return (
    <>
      <p className="section-label font-display">STACK</p>
      <div className="stack-grid">
        {STACK.map(([name, tag]) => (
          <div key={name} className="skill-chip">
            <span>{name}</span>
            <span className="skill-tag">{tag}</span>
          </div>
        ))}
      </div>
      <p className="study-line">
        <strong>Currently studying:</strong> {EDUCATION}
      </p>
    </>
  );
}
