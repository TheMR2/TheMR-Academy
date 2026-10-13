import { ArrowRight, GraduationCap } from "lucide-react";

export function ProfileAccountCards({
  isMonthlyMember,
  plan,
  onExplore,
  onManagePlans,
}) {
  const planLabel =
    plan === "yearly" ? "Yearly membership" : "Monthly membership";

  return (
    <div className="profile-content-grid">
      <section className="profile-membership-card">
        <div className="profile-card-label">MEMBERSHIP</div>
        <div className="profile-membership-head">
          <div className="membership-icon">
            <GraduationCap size={20} />
          </div>
          <div>
            <h3>{isMonthlyMember ? planLabel : "Monthly membership"}</h3>
            <p>
              {isMonthlyMember
                ? "Preview active · no payment processed"
                : "Access every course with one plan — from $12/month."}
            </p>
          </div>
        </div>
        <div className="profile-membership-foot">
          <span>
            {isMonthlyMember
              ? plan === "yearly"
                ? "Yearly plan"
                : "Monthly plan"
              : "From $12/month"}
          </span>
          {isMonthlyMember ? (
            <button onClick={onExplore}>
              Explore your courses <ArrowRight size={13} />
            </button>
          ) : (
            <button onClick={onManagePlans}>
              View plans <ArrowRight size={13} />
            </button>
          )}
        </div>
      </section>

      <section className="profile-details-card">
        <div className="profile-card-label">ACCOUNT DETAILS</div>
        <div>
          <small>Full name</small>
          <b>Mohamed Reda</b>
        </div>
        <div>
          <small>Account type</small>
          <b>Academy learner</b>
        </div>
        <div>
          <small>Learning goal</small>
          <b>Become a frontend developer</b>
        </div>
      </section>
    </div>
  );
}
