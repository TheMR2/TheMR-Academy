import { CreditCard } from "lucide-react";
import { SettingRow } from "./SettingRow.jsx";

export function MembershipSection({ isMonthlyMember, plan, onManagePlan }) {
  const planName =
    plan === "yearly"
      ? "Yearly plan preview active"
      : "Monthly plan preview active";

  return (
    <section className="settings-card">
      <div className="profile-card-label">MEMBERSHIP</div>
      <SettingRow
        icon={CreditCard}
        title={isMonthlyMember ? planName : "No active plan"}
        description={
          isMonthlyMember
            ? "Preview active · no payment processed."
            : "One plan unlocks every course — from $12/month."
        }
      >
        <button className="settings-primary-button" onClick={onManagePlan}>
          Manage plan
        </button>
      </SettingRow>
    </section>
  );
}
