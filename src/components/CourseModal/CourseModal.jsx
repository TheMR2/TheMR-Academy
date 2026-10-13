import { useState } from "react";
import { ArrowRight, BookOpen, Check, Clock3, Play, X } from "lucide-react";
import "../../app/App.css";

export function CourseModal({ course, completedIds, onClose, onStart }) {
  const isStarted = course.progress > 0;
  const firstIncomplete =
    course.syllabus.find((lesson) => !completedIds.includes(lesson.id)) ??
    course.syllabus[0];
  const [activeLessonId, setActiveLessonId] = useState(firstIncomplete.id);

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

          {course.syllabus.map((lesson, index) => {
            const isCompleted = completedIds.includes(lesson.id);
            return (
              <button
                key={lesson.id}
                className={`lesson-row ${activeLessonId === lesson.id ? "lesson-selected" : ""}`}
                onClick={() => setActiveLessonId(lesson.id)}
              >
                <span className="lesson-number">
                  {isCompleted ? (
                    <Check size={13} />
                  ) : (
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  )}
                </span>
                <span>
                  <b>{lesson.title}</b>
                  <small>{lesson.summary}</small>
                </span>
                <span className="lesson-length">
                  {String(lesson.minutes).padStart(2, "0")} min
                </span>
              </button>
            );
          })}

          <button
            className="modal-start-button"
            onClick={() => onStart(course, activeLessonId)}
          >
            <Play size={15} fill="currentColor" />
            {isStarted ? "Continue lesson" : "Start learning"}
            <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
