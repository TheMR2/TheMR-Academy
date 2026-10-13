import { Check, FileText, Paperclip } from "lucide-react";

export function LessonContent({
  lesson,
  lessonNumber,
  isCompleted,
  onToggleComplete,
  onNotify,
}) {
  return (
    <section className="lesson-content">
      <div className="lesson-content-main">
        <div className="section-overline">
          LESSON {String(lessonNumber).padStart(2, "0")}
        </div>
        <h2>{lesson.title}</h2>
        <p className="lesson-content-summary">{lesson.summary}</p>

        <div className="lesson-notes">
          <strong>In this lesson</strong>
          <p>
            Follow along with the example, pause whenever you need to, and try
            the small exercise at the end. Progress is saved automatically — you
            can pick up right where you left off.
          </p>
        </div>

        <div className="lesson-resources">
          <button onClick={() => onNotify("Lesson files are coming soon.")}>
            <Paperclip size={13} /> Lesson files
          </button>
          <button onClick={() => onNotify("Transcript is coming soon.")}>
            <FileText size={13} /> Transcript
          </button>
        </div>
      </div>

      <div className="lesson-content-side">
        <button
          className={`lesson-complete-button ${isCompleted ? "lesson-complete-done" : ""}`}
          onClick={onToggleComplete}
        >
          <Check size={14} />
          {isCompleted ? "Completed" : "Mark as complete"}
        </button>
        <small>
          Completing lessons updates your course progress across the academy.
        </small>
      </div>
    </section>
  );
}
