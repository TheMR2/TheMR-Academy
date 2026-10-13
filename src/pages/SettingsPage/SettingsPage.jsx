import { UserRound } from "lucide-react";
import { AppearanceSection } from "./AppearanceSection.jsx";
import { MembershipSection } from "./MembershipSection.jsx";
import { NotificationsSection } from "./NotificationsSection.jsx";
import { AccountDetailsSection } from "./AccountDetailsSection.jsx";
import { DataSection } from "./DataSection.jsx";
import "./SettingsPage.css";

export function SettingsPage({
  isDarkMode,
  onToggleTheme,
  isMonthlyMember,
  plan,
  onManagePlan,
  enrolledCount,
  savedCount,
  onResetData,
  onProfile,
}) {
  return (
    <div className="settings-page">
      <div className="dashboard-page-heading">
        <div>
          <div className="section-overline">YOUR ACCOUNT</div>
          <h1>Settings</h1>
          <p>
            Choose how your learning space looks, what we remind you about, and
            manage your data.
          </p>
        </div>
        <button className="profile-edit-button" onClick={onProfile}>
          <UserRound size={14} /> My profile
        </button>
      </div>

      <div className="settings-grid">
        <AppearanceSection
          isDarkMode={isDarkMode}
          onToggleTheme={onToggleTheme}
        />
        <MembershipSection
          isMonthlyMember={isMonthlyMember}
          plan={plan}
          onManagePlan={onManagePlan}
        />
        <NotificationsSection />
        <AccountDetailsSection
          enrolledCount={enrolledCount}
          savedCount={savedCount}
        />
        <DataSection onResetData={onResetData} />
      </div>
    </div>
  );
}
