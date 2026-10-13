import { ArrowRight, Check, GraduationCap } from "lucide-react";

export function CatalogMembership({
  isMonthlyMember,
  onSubscribe,
  onMyLearning,
}) {
  return (
    <div
      className={`catalog-membership ${isMonthlyMember ? "catalog-member-active" : ""}`}
    >
      <div className="membership-icon">
        <GraduationCap size={19} />
      </div>
      <div>
        <strong>
          {isMonthlyMember
            ? "Monthly membership preview active"
            : "One monthly membership, every course"}
        </strong>
        <small>
          {isMonthlyMember
            ? "Add courses to My Learning and keep your progress together."
            : "Monthly price to be set. Payment processing is not connected in this preview."}
        </small>
      </div>
      <button
        onClick={() => (isMonthlyMember ? onMyLearning() : onSubscribe())}
      >
        {isMonthlyMember ? (
          <>
            <Check size={13} /> Preview active
          </>
        ) : (
          <>
            Join monthly plan <ArrowRight size={13} />
          </>
        )}
      </button>
    </div>
  );
}
