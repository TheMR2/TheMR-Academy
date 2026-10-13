import { ArrowRight, BookOpen, Check, ChevronDown, Clock3 } from "lucide-react";

function mentorInitials(mentor) {
  return mentor
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export function CatalogCourseCard({
  course,
  index,
  isEnrolled,
  isExpanded,
  isMonthlyMember,
  onToggleDetails,
  onEnroll,
  onMyLearning,
}) {
  return (
    <article
      className={`catalog-course ${isExpanded ? "catalog-course-expanded" : ""}`}
    >
      <div className={`catalog-course-art art-${course.color}`}>
        <span className="catalog-course-index">COURSE 0{index + 1}</span>
        <div className="catalog-course-glyph">{course.icon}</div>
        <div className="catalog-art-rings" />
        <span className="catalog-level-badge">{course.level}</span>
      </div>

      <div className="catalog-course-body">
        <div className="catalog-course-meta">
          <span>{course.category}</span>
          <span>
            <Clock3 size={12} />
            {course.duration}
          </span>
        </div>
        <h3>{course.title}</h3>
        <p>{course.description}</p>

        <div className="catalog-course-facts">
          <span>
            <BookOpen size={13} />
            {course.lessons} lessons
          </span>
          <span className="catalog-fact-dot" />
          <span>Projects included</span>
        </div>

        {isExpanded && (
          <div className="catalog-syllabus">
            <strong>WHAT YOU’LL LEARN</strong>
            <ul>
              <li>Get comfortable with the essential tools</li>
              <li>Practice each skill with a guided project</li>
              <li>Build something you can share</li>
            </ul>
            <div className="catalog-mentor">
              <span>{mentorInitials(course.mentor)}</span>
              <small>
                Learn with <b>{course.mentor}</b>
              </small>
            </div>
          </div>
        )}

        <div className="catalog-course-actions">
          <button
            className="details-toggle"
            onClick={() => onToggleDetails(course)}
          >
            {isExpanded ? "Hide details" : "Course details"}
            <ChevronDown size={14} />
          </button>

          <button
            className={`enroll-button ${isEnrolled ? "enrolled-button" : ""}`}
            onClick={() => (isEnrolled ? onMyLearning() : onEnroll(course))}
          >
            {isEnrolled ? (
              <>
                <Check size={14} /> Go to My Learning
              </>
            ) : isMonthlyMember ? (
              <>
                Add to My Learning <ArrowRight size={14} />
              </>
            ) : (
              <>
                Join monthly plan <ArrowRight size={14} />
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
