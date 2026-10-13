import { ArrowRight, Bookmark, Clock3, Play } from "lucide-react";

function mentorInitials(mentor) {
  return mentor
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export function CourseCard({ course, isSaved, onSave, onOpen }) {
  return (
    <article className="course-card">
      <div className={`course-art art-${course.color}`}>
        <span className="art-label">{course.tag}</span>
        <button
          className={`save-button ${isSaved ? "is-saved" : ""}`}
          aria-label={isSaved ? "Remove saved course" : "Save course"}
          onClick={() => onSave(course.id)}
        >
          <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
        </button>
        <div className="art-shape shape-one" />
        <div className="art-shape shape-two" />
        <div className="course-glyph">{course.icon}</div>
        <span className="art-star">✳</span>
      </div>

      <div className="course-body">
        <div className="course-eyebrow">
          <span>{course.category}</span>
          <i />
          <span>{course.level}</span>
        </div>
        <h3>{course.title}</h3>
        <p>{course.description}</p>

        <div className="course-footer">
          <div className="mentor-avatar">{mentorInitials(course.mentor)}</div>
          <span className="mentor-name">{course.mentor}</span>
          <span className="course-duration">
            <Clock3 size={13} />
            {course.duration}
          </span>
        </div>

        {course.progress > 0 ? (
          <div className="course-progress">
            <span>
              <b>{course.progress}%</b> complete
            </span>
            <i>
              <em style={{ width: `${course.progress}%` }} />
            </i>
          </div>
        ) : (
          <div className="course-bottom-meta">
            <span>
              <Play size={12} />
              {course.lessons} lessons
            </span>
            <button onClick={() => onOpen(course)}>
              View course <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
