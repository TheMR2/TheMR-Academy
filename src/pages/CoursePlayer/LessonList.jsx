import { Check } from "lucide-react";

export function LessonList({
  lessons,
  completedIds,
  activeLessonId,
  onSelect,
}) {
  const doneCount = lessons.filter((lesson) =>
    completedIds.includes(lesson.id),
  ).length;

  return (
    <aside className="lesson-panel">
      <div className="lesson-panel-head">
        <strong>Course content</strong>
        <small>
          {doneCount} of {lessons.length} completed
        </small>
      </div>

      <div className="lesson-panel-list">
        {lessons.map((lesson, index) => {
          const isCompleted = completedIds.includes(lesson.id);
          const isActive = lesson.id === activeLessonId;
          return (
            <button
              key={lesson.id}
              className={`lesson-item ${isActive ? "lesson-item-active" : ""} ${isCompleted ? "lesson-item-done" : ""}`}
              onClick={() => onSelect(lesson.id)}
            >
              <span className="lesson-item-number">
                {isCompleted ? (
                  <Check size={12} />
                ) : (
                  String(index + 1).padStart(2, "0")
                )}
              </span>
              <span className="lesson-item-copy">
                <b>{lesson.title}</b>
                <small>{lesson.minutes} min</small>
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
