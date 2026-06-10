import { useNavigate } from "react-router-dom";
import { useLocalClock } from "../../hooks/useCityClock";
import { BRAND } from "../../lib/constants";
import "./TopBar.css";

interface TopBarProps {
  onMenuOpen: () => void;
}

export function TopBar({ onMenuOpen }: TopBarProps) {
  const time = useLocalClock();
  const navigate = useNavigate();

  return (
    <header className="top-bar">
      <button
        className="top-bar__left font-display"
        onClick={() => navigate("/")}
        type="button"
      >
        {BRAND.name}
      </button>
      <div className="top-bar__center font-display">
        ( MEL )&nbsp;&nbsp;{time}
      </div>
      <button className="top-bar__menu font-display" onClick={onMenuOpen} type="button">
        MENU
      </button>
    </header>
  );
}
