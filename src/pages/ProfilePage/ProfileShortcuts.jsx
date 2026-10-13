import { ArrowRight, BookOpen, Bookmark, Compass } from "lucide-react";

export function ProfileShortcuts({
  enrolledCount,
  onMyLearning,
  onExplore,
  onSaved,
}) {
  return (
    <section className="profile-shortcuts">
      <div className="profile-shortcuts-heading">
        <div>
          <div className="section-overline">YOUR ACADEMY</div>
          <h2>Quick links</h2>
        </div>
      </div>

      <div className="profile-shortcut-grid">
        <button onClick={onMyLearning}>
          <span>
            <BookOpen size={17} />
          </span>
          <b>My Learning</b>
          <small>{enrolledCount} courses in progress</small>
          <ArrowRight size={15} />
        </button>
        <button onClick={onExplore}>
          <span>
            <Compass size={17} />
          </span>
          <b>Explore Courses</b>
          <small>Browse all courses</small>
          <ArrowRight size={15} />
        </button>
        <button onClick={onSaved}>
          <span>
            <Bookmark size={17} />
          </span>
          <b>Saved Courses</b>
          <small>Your bookmarked courses</small>
          <ArrowRight size={15} />
        </button>
      </div>
    </section>
  );
}
