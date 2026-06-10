import "./CTAButton.css";

interface CTAButtonProps {
  onClick: () => void;
  label?: string;
}

export function CTAButton({ onClick, label = "About Us" }: CTAButtonProps) {
  return (
    <button className="cta-button" onClick={onClick} type="button" aria-label={label}>
      <span className="cta-button__label font-display">{label}</span>
      <span className="cta-button__circle">
        <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
          <path
            d="M9 6l6 6-6 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}
