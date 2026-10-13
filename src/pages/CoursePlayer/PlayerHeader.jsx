import { ArrowLeft, BookOpen, Clock3 } from "lucide-react";

function ProgressBar({ percent }) {
  return (
    <div className="player-progress">
      <i>
        <em style={{ width: `${percent}%` }} />
      </i>
    </div>
  );
}

export function PlayerHeader({
  course,
  completedCount,
  totalLessons,
  percent,
  onBack,
}) {
  return (
    <header className="player-header">
      <button className="player-back" onClick={onBack}>
        <ArrowLeft size={14} /> Back to my learning
      </button>

      <div className="player-title-row">
        <div className={`player-course-badge art-${course.color}`}>
          {course.icon}
        </div>
        <div className="player-title-copy">
          <div className="section-overline">
            {course.category} · {course.level}
          </div>
          <h1>{course.title}</h1>
          <div className="player-title-meta">
            <span>
              <BookOpen size={12} /> {totalLessons} lessons
            </span>
            <span>
              <Clock3 size={12} /> {course.duration}
            </span>
            <span>with {course.mentor}</span>
          </div>
        </div>
        <div className="player-progress-copy">
          <b>{percent}% complete</b>
          <small>
            {completedCount} of {totalLessons} lessons done
          </small>
          <ProgressBar percent={percent} />
        </div>
      </div>
    </header>
  );
}
