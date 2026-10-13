import { ArrowRight, Check, GraduationCap } from "lucide-react";

export function MembershipBanner({
  isMonthlyMember,
  message,
  onMessage,
  onSubscribe,
}) {
  const handleAction = () => {
    if (isMonthlyMember) {
      onMessage("Your monthly membership preview is active.");
      return;
    }
    onSubscribe();
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
          {isMonthlyMember
            ? "YOUR MEMBERSHIP PREVIEW"
            : "ONE MEMBERSHIP, EVERY COURSE"}
        </span>
        <h2>
          {isMonthlyMember
            ? "Monthly membership preview active"
            : "Learn everything with one monthly plan"}
        </h2>
        <p>
          {isMonthlyMember
            ? "You can add any course to My Learning."
            : "Monthly billing gives you access to the full course library. Price to be set."}
        </p>
        {message && <small className="membership-message">{message}</small>}
      </div>

      <button onClick={handleAction}>
        {isMonthlyMember ? (
          <>
            <Check size={14} /> Preview active
          </>
        ) : (
          <>
            Choose monthly plan <ArrowRight size={14} />
          </>
        )}
      </button>
    </section>
  );
}
