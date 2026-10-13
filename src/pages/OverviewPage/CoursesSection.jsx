import { ArrowRight, Search } from "lucide-react";
import { CourseCard } from "./CourseCard.jsx";
import { CourseToolbar } from "./CourseToolbar.jsx";

const SECTION_COPY = {
  Saved: {
    title: "Your saved courses",
    intro: "The courses you bookmarked for later.",
  },
  "My learning": {
    title: "Courses in your learning",
    intro: "Pick up a lesson or start an enrolled course.",
  },
  Overview: {
    title: "Courses picked for you",
    intro: "Practical skills, friendly teachers, and real projects.",
  },
};

export function CoursesSection({
  activeNav,
  activeCategory,
  onSelectCategory,
  query,
  onQueryChange,
  courses,
  savedIds,
  onSave,
  onOpenCourse,
  onResetFilters,
}) {
  const copy = SECTION_COPY[activeNav] ?? SECTION_COPY.Overview;
  const isSavedView = activeNav === "Saved";

  return (
    <section className="courses-section" id="explore">
      <div className="section-heading course-heading">
        <div>
          <div className="section-overline">YOUR NEXT CHAPTER</div>
          <h2>{copy.title}</h2>
          <p>{copy.intro}</p>
        </div>
      </div>

      <CourseToolbar
        activeCategory={activeCategory}
        onSelectCategory={onSelectCategory}
        query={query}
        onQueryChange={onQueryChange}
      />

      {courses.length ? (
        <div className="courses-grid">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isSaved={savedIds.includes(course.id)}
              onSave={onSave}
              onOpen={onOpenCourse}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">
            <Search size={21} />
          </div>
          <h3>{isSavedView ? "No saved courses yet" : "No courses found"}</h3>
          <p>
            {isSavedView
              ? "Save courses with the bookmark icon to find them here."
              : "Try a different search or course category."}
          </p>
          <button className="text-button" onClick={onResetFilters}>
            Browse all courses <ArrowRight size={15} />
          </button>
        </div>
      )}
    </section>
  );
}
