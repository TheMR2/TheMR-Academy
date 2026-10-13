import { ArrowRight, ChevronLeft } from "lucide-react";

export function PlayerNav({
  hasPrevious,
  hasNext,
  isLastLesson,
  isCompleted,
  onPrevious,
  onNext,
  onCompleteAndNext,
}) {
  return (
    <nav className="player-nav">
      <button
        className="player-nav-previous"
        disabled={!hasPrevious}
        onClick={onPrevious}
      >
        <ChevronLeft size={14} /> Previous lesson
      </button>

      <div className="player-nav-next-group">
        {isCompleted && !isLastLesson && (
          <button
            className="player-nav-complete-next"
            onClick={onCompleteAndNext}
          >
            Complete &amp; next <ArrowRight size={14} />
          </button>
        )}
        <button
          className="player-nav-next"
          disabled={!hasNext}
          onClick={onNext}
        >
          {isLastLesson ? "Last lesson" : "Next lesson"}{" "}
          <ArrowRight size={14} />
        </button>
      </div>
    </nav>
  );
}
