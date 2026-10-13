import { BookOpen, Clock3, Flame } from "lucide-react";

export function ProfileStats({ enrolledCount }) {
  return (
    <div className="profile-stats-grid">
      <div>
        <span className="profile-stat-icon">
          <BookOpen size={17} />
        </span>
        <b>{enrolledCount}</b>
        <small>Courses in My Learning</small>
      </div>
      <div>
        <span className="profile-stat-icon profile-stat-yellow">
          <Flame size={17} />
        </span>
        <b>5 days</b>
        <small>Current learning streak</small>
      </div>
      <div>
        <span className="profile-stat-icon profile-stat-blue">
          <Clock3 size={17} />
        </span>
        <b>2.5 hrs</b>
        <small>Learning time this week</small>
      </div>
    </div>
  );
}
