import { useNavigate } from "react-router-dom";
import { RING_SEGMENTS } from "../../lib/constants";
import "./RingSegmentHitZones.css";

export function RingSegmentHitZones() {
  const navigate = useNavigate();

  return (
    <div className="ring-hit-zones" aria-label="Navigate by section">
      {RING_SEGMENTS.map((segment, i) => (
        <button
          key={segment.id}
          type="button"
          className={`ring-hit-zone ring-hit-zone--${i}`}
          aria-label={`Go to ${segment.label}`}
          onClick={() => navigate(segment.route)}
        />
      ))}
    </div>
  );
}
