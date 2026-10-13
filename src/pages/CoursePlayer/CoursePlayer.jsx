import { PlayerHeader } from "./PlayerHeader.jsx";
import { VideoStage } from "./VideoStage.jsx";
import { LessonList } from "./LessonList.jsx";
import { LessonContent } from "./LessonContent.jsx";
import { PlayerNav } from "./PlayerNav.jsx";
import "./CoursePlayer.css";

export function CoursePlayer({
  course,
  completedLessonIds,
  activeLessonId,
  onSelectLesson,
  onToggleComplete,
  onBack,
  onNotify,
}) {
  const lessons = course.syllabus;
  const activeIndex = Math.max(
    lessons.findIndex((lesson) => lesson.id === activeLessonId),
    0,
  );
  const activeLesson = lessons[activeIndex];
  const isCompleted = completedLessonIds.includes(activeLesson.id);

  const handleNext = () => {
    if (activeIndex < lessons.length - 1) {
      onSelectLesson(lessons[activeIndex + 1].id);
    }
  };

  const handleCompleteAndNext = () => {
    if (!isCompleted) onToggleComplete();
    handleNext();
  };

  return (
    <div className="player-page">
      <PlayerHeader
        course={course}
        completedCount={completedLessonIds.length}
        totalLessons={lessons.length}
        percent={course.progress}
        onBack={onBack}
      />

      <div className="player-layout">
        <div className="player-main">
          <VideoStage
            course={course}
            lesson={activeLesson}
            lessonNumber={activeIndex + 1}
            onEnded={() => {
              if (!isCompleted) onToggleComplete();
            }}
          />

          <LessonContent
            lesson={activeLesson}
            lessonNumber={activeIndex + 1}
            isCompleted={isCompleted}
            onToggleComplete={onToggleComplete}
            onNotify={onNotify}
          />

          <PlayerNav
            hasPrevious={activeIndex > 0}
            hasNext={activeIndex < lessons.length - 1}
            isLastLesson={activeIndex === lessons.length - 1}
            isCompleted={isCompleted}
            onPrevious={() => onSelectLesson(lessons[activeIndex - 1].id)}
            onNext={handleNext}
            onCompleteAndNext={handleCompleteAndNext}
          />
        </div>

        <LessonList
          lessons={lessons}
          completedIds={completedLessonIds}
          activeLessonId={activeLesson.id}
          onSelect={onSelectLesson}
        />
      </div>
    </div>
  );
}
