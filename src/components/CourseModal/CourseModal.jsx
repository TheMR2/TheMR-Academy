import { ArrowRight, BookOpen, Check, Clock3, Play, X } from "lucide-react";
import "../../app/App.css";

const LESSONS = [
  {
    id: 1,
    number: "01",
    title: "Getting started",
    summary: "Meet your tools and write your first line",
    length: "08 min",
  },
  {
    id: 2,
    number: "02",
    title: "The building blocks",
    summary: "Give your page structure and meaning",
    length: "12 min",
  },
  {
    id: 3,
    number: "03",
    title: "Styling your first page",
    summary: "Bring your ideas to life with color",
    length: "15 min",
  },
];

export function CourseModal({
  course,
  activeLesson,
  onSelectLesson,
  onClose,
  onStart,
}) {
  const isStarted = course.progress > 0;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section
        className="course-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          aria-label="Close course details"
          onClick={onClose}
        >
          <X size={19} />
        </button>

        <div className={`modal-art art-${course.color}`}>
          <div className="modal-course-glyph">{course.icon}</div>
          <span>{course.category}</span>
        </div>

        <div className="modal-content">
          <div className="section-overline">
            {course.level.toUpperCase()} COURSE
          </div>
          <h2 id="modal-title">{course.title}</h2>
          <p>{course.description}</p>

          <div className="modal-stats">
            <span>
              <BookOpen size={15} />
              {course.lessons} bite-sized lessons
            </span>
            <span>
              <Clock3 size={15} />
              {course.duration}
            </span>
          </div>

          <div className="lesson-list-title">
            {isStarted ? "CONTINUE YOUR COURSE" : "WHAT YOU’LL LEARN"}
          </div>

          {LESSONS.map((lesson) => (
            <button
              key={lesson.id}
              className={`lesson-row ${activeLesson === lesson.id ? "lesson-selected" : ""}`}
              onClick={() => onSelectLesson(lesson.id)}
            >
              <span className="lesson-number">
                {activeLesson > lesson.id ? (
                  <Check size={13} />
                ) : (
                  <span>{lesson.number}</span>
                )}
              </span>
              <span>
                <b>{lesson.title}</b>
                <small>{lesson.summary}</small>
              </span>
              <span className="lesson-length">{lesson.length}</span>
            </button>
          ))}

          <button className="modal-start-button" onClick={onStart}>
            <Play size={15} fill="currentColor" />
            {isStarted ? "Continue lesson" : "Start learning"}
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
