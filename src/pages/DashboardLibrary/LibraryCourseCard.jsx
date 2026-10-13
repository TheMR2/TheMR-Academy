import { ArrowRight, Bookmark, BookOpen, Clock3, Play } from "lucide-react";

function buildMainLabel({ isEnrolled, isMonthlyMember }) {
  if (isEnrolled) return "Continue";
  if (isMonthlyMember) return "Add to My Learning";
  return "View plans";
}

export function LibraryCourseCard({
  course,
  isExplore,
  isSaved,
  isEnrolled,
  isSavedCourse,
  isMonthlyMember,
  onSave,
  onDetails,
  onPlay,
  onEnroll,
  onSubscribePlan,
}) {
  const isLearning = !isExplore && !isSaved;

  const handleMainAction = () => {
    if (isEnrolled) {
      onPlay(course);
      return;
    }
    if (!isMonthlyMember) {
      onSubscribePlan();
      return;
    }
    if (isLearning) {
      onDetails(course);
      return;
    }
    onEnroll(course.id);
  };

  return (
    <article className="library-course">
      <div className={`library-course-art art-${course.color}`}>
        <span className="library-course-label">{course.tag}</span>
        {isExplore && (
          <button
            className={`save-button ${isSavedCourse ? "is-saved" : ""}`}
            aria-label={isSavedCourse ? "Remove saved course" : "Save course"}
            onClick={() => onSave(course.id)}
          >
            <Bookmark
              size={16}
              fill={isSavedCourse ? "currentColor" : "none"}
            />
          </button>
        )}
        <div className="art-shape shape-one" />
        <div className="art-shape shape-two" />
        <div className="course-glyph">{course.icon}</div>
      </div>

      <div className="library-course-body">
        <div className="library-course-meta">
          <span>{course.category}</span>
          <span>{course.level}</span>
        </div>
        <h2>{course.title}</h2>
        <p>{course.description}</p>

        <div className="library-course-info">
          <span>
            <BookOpen size={13} />
            {course.lessons} lessons
          </span>
          <span>
            <Clock3 size={13} />
            {course.duration}
          </span>
          <span className="library-mentor">{course.mentor}</span>
        </div>

        {course.progress > 0 && (
          <div className="library-progress">
            <span>
              <b>{course.progress}%</b> complete
            </span>
            <i>
              <em style={{ width: `${course.progress}%` }} />
            </i>
          </div>
        )}

        <div className="library-course-actions">
          {isSaved ? (
            <button
              className="library-remove-save"
              onClick={() => onSave(course.id)}
            >
              <Bookmark size={13} fill="currentColor" /> Remove from saved
            </button>
          ) : (
            <button
              className="library-details"
              onClick={() => onDetails(course)}
            >
              Course details <ArrowRight size={13} />
            </button>
          )}

          <button
            className={`library-main-action ${isEnrolled ? "library-enrolled" : ""}`}
            onClick={handleMainAction}
          >
            {(isLearning || isEnrolled) && (
              <Play size={12} fill="currentColor" />
            )}{" "}
            {isLearning
              ? "Continue learning"
              : buildMainLabel({ isEnrolled, isMonthlyMember })}
            {!isLearning && !isEnrolled && <ArrowRight size={13} />}
          </button>
        </div>
      </div>
    </article>
  );
}
