export function ProfileHero({ isMonthlyMember, plan }) {
  return (
    <section className="profile-hero-card">
      <div className="profile-avatar-large">M</div>
      <div className="profile-hero-copy">
        <span>LEARNER PROFILE</span>
        <h2>Mohamed Reda</h2>
        <p>Learning member since October 2026</p>
      </div>
      <div className="profile-plan-pill">
        <span
          className={isMonthlyMember ? "plan-dot plan-active" : "plan-dot"}
        />
        {isMonthlyMember
          ? plan === "yearly"
            ? "Yearly plan preview"
            : "Monthly plan preview"
          : "No active plan"}
      </div>
    </section>
  );
}
