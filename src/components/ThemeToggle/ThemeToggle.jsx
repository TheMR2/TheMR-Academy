import { Moon, Sun } from "lucide-react";
import "./ThemeToggle.css";

export function ThemeToggle({ isDarkMode, onToggle }) {
  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={onToggle}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? <Sun key="sun" size={16} /> : <Moon key="moon" size={16} />}
    </button>
  );
}
