import { ChevronDown } from "lucide-react";

export function SidebarProfile({
  isOpen,
  isMonthlyMember,
  onToggle,
  onProfile,
  onSignOut,
}) {
  return (
    <div className="profile-wrap">
      {isOpen && (
        <div className="profile-menu">
          <button onClick={onProfile}>My profile</button>
          <button onClick={onSignOut}>Sign out</button>
        </div>
      )}
      <button className="profile-card" onClick={onToggle}>
        <div className="avatar">M</div>
        <span className="profile-info">
          <strong>Mohamed Reda</strong>
          <small>
            {isMonthlyMember ? "Monthly plan preview" : "Learner account"}
          </small>
        </span>
        <ChevronDown size={16} />
      </button>
    </div>
  );
}
