import { courses } from "../../data/catalog.js";
import { WelcomeSection } from "./WelcomeSection.jsx";
import { ContinueLearningCard } from "./ContinueLearningCard.jsx";
import { LearningPathsSection } from "./LearningPathsSection.jsx";
import { CoursesSection } from "./CoursesSection.jsx";
import { MentorPromo } from "./MentorPromo.jsx";
import { OverviewFooter } from "./OverviewFooter.jsx";
import "../../app/App.css";

export function OverviewPage({
  activeNav,
  activeCategory,
  onSelectCategory,
  query,
  onQueryChange,
  courses: visibleCourses,
  savedIds,
  onSave,
  onOpenCourse,
  onSelectTrack,
  onExploreAll,
  onResetFilters,
  onNotify,
  onHome,
}) {
  return (
    <>
      <WelcomeSection />

      <ContinueLearningCard onContinue={() => onOpenCourse(courses[0])} />

      <LearningPathsSection
        onSelectTrack={onSelectTrack}
        onExploreAll={onExploreAll}
      />

      <CoursesSection
        activeNav={activeNav}
        activeCategory={activeCategory}
        onSelectCategory={onSelectCategory}
        query={query}
        onQueryChange={onQueryChange}
        courses={visibleCourses}
        savedIds={savedIds}
        onSave={onSave}
        onOpenCourse={onOpenCourse}
        onResetFilters={onResetFilters}
      />

      <MentorPromo
        onEncourage={() => onNotify("Your mentors are cheering you on!")}
      />

      <OverviewFooter onHome={onHome} />
    </>
  );
}
