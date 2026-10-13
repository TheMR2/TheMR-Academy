import { ArrowRight, GraduationCap } from "lucide-react";

export function ProfileAccountCards({ isMonthlyMember, onExplore }) {
  return (
    <div className="profile-content-grid">
      <section className="profile-membership-card">
        <div className="profile-card-label">MEMBERSHIP</div>
        <div className="profile-membership-head">
          <div className="membership-icon">
            <GraduationCap size={20} />
          </div>
          <div>
            <h3>Monthly membership</h3>
            <p>
              {isMonthlyMember
                ? "Preview active · no payment processed"
                : "Access the full course library with one monthly plan."}
            </p>
          </div>
        </div>
        <div className="profile-membership-foot">
          <span>{isMonthlyMember ? "Monthly preview" : "Price to be set"}</span>
          <button onClick={onExplore}>
            {isMonthlyMember ? "Explore your courses" : "View monthly plan"}{" "}
            <ArrowRight size={13} />
          </button>
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
