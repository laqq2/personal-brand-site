import { STORY } from "../data/content";

export function StoryContent() {
  return (
    <>
      <p className="section-label font-display">STORY</p>
      {STORY.map((s) => (
        <div key={s.age} className="story-row">
          <div className="story-age font-display">{s.age}</div>
          <div>
            <h3 className="story-head font-display">{s.head}</h3>
            <p className="story-text">{s.body}</p>
          </div>
        </div>
      ))}
    </>
  );
}
