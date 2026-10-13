import { ArrowRight, Check, GraduationCap } from "lucide-react";

export function MembershipBanner({
  isMonthlyMember,
  message,
  onMessage,
  onViewPlans,
}) {
  const handleAction = () => {
    if (isMonthlyMember) {
      onMessage("Your membership is active.");
      return;
    }
    onViewPlans();
  };

  return (
    <section
      className={`membership-banner ${isMonthlyMember ? "membership-active" : ""}`}
    >
      <div className="membership-icon">
        <GraduationCap size={20} />
      </div>

      <div className="membership-copy">
        <span>
          {isMonthlyMember ? "YOUR MEMBERSHIP" : "ONE MEMBERSHIP, EVERY COURSE"}
        </span>
        <h2>
          {isMonthlyMember
            ? "Your plan is active"
            : "Learn everything with one plan"}
        </h2>
        <p>
          {isMonthlyMember
            ? "You can add any course to My Learning."
            : "From $12/month (or $99/year) — every course in the library, cancel anytime."}
        </p>
        {message && <small className="membership-message">{message}</small>}
      </div>

      <button onClick={handleAction}>
        {isMonthlyMember ? (
          <>
            <Check size={14} /> Plan active
          </>
        ) : (
          <>
            View plans <ArrowRight size={14} />
          </>
        )}
      </button>
    </section>
  );
}
