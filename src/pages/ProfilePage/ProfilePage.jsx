import { Settings } from "lucide-react";
import { ProfileHero } from "./ProfileHero.jsx";
import { ProfileStats } from "./ProfileStats.jsx";
import { ProfileAccountCards } from "./ProfileAccountCards.jsx";
import { ProfileShortcuts } from "./ProfileShortcuts.jsx";
import "./ProfilePage.css";

export function ProfilePage({
  enrolledCourses,
  isMonthlyMember,
  plan,
  onExplore,
  onMyLearning,
  onSaved,
  onSettings,
  onManagePlans,
}) {
  return (
    <div className="profile-page">
      <div className="dashboard-page-heading">
        <div>
          <div className="section-overline">YOUR ACCOUNT</div>
          <h1>My profile</h1>
          <p>Your learning details, membership, and course shortcuts.</p>
        </div>
        <button className="profile-edit-button" onClick={onSettings}>
          <Settings size={14} /> Profile settings
        </button>
      </div>

      <ProfileHero isMonthlyMember={isMonthlyMember} plan={plan} />

      <ProfileStats enrolledCount={enrolledCourses.length} />

      <ProfileAccountCards
        isMonthlyMember={isMonthlyMember}
        plan={plan}
        onExplore={onExplore}
        onManagePlans={onManagePlans}
      />

      <ProfileShortcuts
        enrolledCount={enrolledCourses.length}
        onMyLearning={onMyLearning}
        onExplore={onExplore}
        onSaved={onSaved}
      />
    </div>
  );
}
