import { useTheme } from "../../hooks/useTheme";
import "./ThemeToggle.css";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className={`theme-toggle__track ${isDark ? "" : "theme-toggle__track--light"}`}>
        <span className="theme-toggle__knob" />
      </span>
    </button>
  );
}
