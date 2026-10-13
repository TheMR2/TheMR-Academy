import {
  BookOpen,
  Bookmark,
  CircleHelp,
  Compass,
  LayoutDashboard,
  Settings,
  UserRound,
  X,
} from "lucide-react";
import { Logo } from "../Logo/Logo.jsx";
import { StreakCard } from "./StreakCard.jsx";
import { SidebarProfile } from "./SidebarProfile.jsx";
import "../../app/App.css";

const NAV_ITEMS = [
  { key: "Overview", label: "Overview", icon: LayoutDashboard },
  { key: "My learning", label: "My learning", icon: BookOpen },
  { key: "Explore", label: "Explore courses", icon: Compass },
  { key: "Saved", label: "Saved courses", icon: Bookmark },
  { key: "Profile", label: "My profile", icon: UserRound },
];

export function Sidebar({
  activeNav,
  isOpen,
  learningCount,
  savedCount,
  profileOpen,
  isMonthlyMember,
  onNavigate,
  onClose,
  onToggleProfile,
  onSignOut,
  onNotify,
}) {
  return (
    <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar-top">
        <Logo onClick={() => onNavigate("Overview")} />
        <button
          className="mobile-close"
          aria-label="Close menu"
          onClick={onClose}
        >
          <X size={19} />
        </button>
      </div>

      <div className="nav-label">MENU</div>

      <nav className="side-nav">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            className={`nav-item ${activeNav === key ? "active" : ""}`}
            onClick={() => onNavigate(key)}
          >
            <Icon size={18} />
            {label}
            {key === "My learning" && (
              <span className="nav-count">{learningCount}</span>
            )}
            {key === "Saved" && savedCount > 0 && (
              <span className="nav-count">{savedCount}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="nav-label nav-label-second">YOUR LEARNING</div>
      <StreakCard />

      <div className="sidebar-spacer" />

      <div className="sidebar-bottom">
        <button
          className="nav-item"
          onClick={() => onNotify("Help center is coming soon.")}
        >
          <CircleHelp size={18} />
          Help center
        </button>
        <button
          className="nav-item"
          onClick={() => onNotify("Settings will be available soon.")}
        >
          <Settings size={18} />
          Settings
        </button>
        <SidebarProfile
          isOpen={profileOpen}
          isMonthlyMember={isMonthlyMember}
          onToggle={onToggleProfile}
          onProfile={() => onNavigate("Profile")}
          onSignOut={onSignOut}
        />
      </div>
    </aside>
  );
}
