export function AccountDetailsSection({ enrolledCount, savedCount }) {
  return (
    <section className="settings-card settings-card-wide profile-details-card">
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
        <small>Courses in My Learning</small>
        <b>{enrolledCount} enrolled</b>
      </div>
      <div>
        <small>Saved courses</small>
        <b>{savedCount} saved</b>
      </div>
    </section>
  );
}
