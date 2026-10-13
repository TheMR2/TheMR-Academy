import { ArrowRight, Bookmark } from "lucide-react";

export function LibraryEmpty({ isExplore, isSaved, onReset, onBrowse }) {
  const title = isSaved
    ? "No saved courses yet"
    : isExplore
      ? "No courses match your search"
      : "Your learning starts here";

  const message = isSaved
    ? "Save courses from Explore Courses to keep them here."
    : isExplore
      ? "Try another search or category."
      : "Explore the catalog and add courses to your learning list.";

  return (
    <div className="library-empty">
      <div>
        <Bookmark size={19} />
      </div>
      <h2>{title}</h2>
      <p>{message}</p>
      <button onClick={() => (isExplore ? onReset() : onBrowse())}>
        {isExplore ? "Show all courses" : "Browse courses"}{" "}
        <ArrowRight size={14} />
      </button>
    </div>
  );
}
