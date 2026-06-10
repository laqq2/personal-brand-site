import { useNavigate } from "react-router-dom";
import { useLocalClock } from "../../hooks/useCityClock";
import { BRAND } from "../../lib/constants";
import "./TopBar.css";

interface TopBarProps {
  onMenuOpen: () => void;
  onWorkOpen: () => void;
}

export function TopBar({ onMenuOpen, onWorkOpen }: TopBarProps) {
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
      <div className="top-bar__right">
        <button className="top-bar__work font-display" onClick={onWorkOpen} type="button">
          WORK
        </button>
        <button className="top-bar__menu font-display" onClick={onMenuOpen} type="button">
          MENU
        </button>
      </div>
    </header>
  );
}
