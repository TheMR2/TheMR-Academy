import { Bell, ChevronRight, Menu } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle.jsx";
import "../../app/App.css";

const TODAY_LABEL = "MONDAY, OCTOBER 13";

export function TopBar({
  activeNav,
  isDarkMode,
  onToggleTheme,
  onOpenMenu,
  onNotify,
  onOpenProfile,
}) {
  return (
    <header className="topbar">
      <button
        className="mobile-menu"
        aria-label="Open menu"
        onClick={onOpenMenu}
      >
        <Menu size={20} />
      </button>

      <div className="breadcrumb">
        <span>Academy</span>
        <ChevronRight size={14} />
        <strong>{activeNav}</strong>
      </div>

      <div className="topbar-right">
        <span className="topbar-date">{TODAY_LABEL}</span>
        <ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
        <button
          className="icon-button notification-button"
          aria-label="Notifications"
          onClick={() => onNotify("You’re all caught up!")}
        >
          <Bell size={18} />
          <i />
        </button>
        <button
          className="top-avatar"
          aria-label="Open profile"
          onClick={onOpenProfile}
        >
          M
        </button>
      </div>
    </header>
  );
}
