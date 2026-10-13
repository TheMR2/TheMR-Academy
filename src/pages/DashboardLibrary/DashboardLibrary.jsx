import { useState } from "react";
import { BookOpen } from "lucide-react";
import { courses } from "../../data/catalog.js";
import { MembershipBanner } from "./MembershipBanner.jsx";
import { LibraryToolbar } from "./LibraryToolbar.jsx";
import { LibraryCourseCard } from "./LibraryCourseCard.jsx";
import { LibraryEmpty } from "./LibraryEmpty.jsx";
import "./DashboardLibrary.css";
import "../../membership.css";

const PAGE_COPY = {
  Explore: {
    title: "Explore all courses",
    intro:
      "Explore every course in TheMR Academy and choose what to learn next.",
    results: "All courses on the platform",
  },
  Saved: {
    title: "Saved courses",
    intro: "Your bookmarked courses, all in one place.",
    results: "Saved for later",
  },
  "My learning": {
    title: "My learning",
    intro: "Your courses and learning progress, together in one place.",
    results: "Based on your learning account",
  },
};

export function DashboardLibrary({
  mode,
  courses: listedCourses,
  savedIds,
  isMonthlyMember,
  activeCategory,
  setActiveCategory,
  query,
  setQuery,
  onSave,
  onDetails,
  onSubscribe,
  onEnroll,
  enrolledIds,
  onBrowse,
}) {
  const [membershipMessage, setMembershipMessage] = useState("");

  const isExplore = mode === "Explore";
  const isSaved = mode === "Saved";
  const copy = PAGE_COPY[mode] ?? PAGE_COPY["My learning"];

  const openPlan = () => {
    onSubscribe();
    setMembershipMessage(
      "Monthly membership activated in this preview. Payment processing is not connected yet.",
    );
  };

  const resetFilters = () => {
    setActiveCategory("All courses");
    setQuery("");
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-heading">
        <div>
          <div className="section-overline">THEMR ACADEMY</div>
          <h1>{copy.title}</h1>
          <p>{copy.intro}</p>
        </div>
        {isExplore && (
          <span className="catalog-total">
            <BookOpen size={14} />
            {courses.length} courses
          </span>
        )}
      </div>

      {isExplore && (
        <MembershipBanner
          isMonthlyMember={isMonthlyMember}
          message={membershipMessage}
          onMessage={setMembershipMessage}
          onSubscribe={openPlan}
        />
      )}

      <LibraryToolbar
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        query={query}
        onQueryChange={setQuery}
      />

      <div className="library-results">
        <span>
          <b>{listedCourses.length}</b>{" "}
          {listedCourses.length === 1 ? "course" : "courses"}
        </span>
        <span>{copy.results}</span>
      </div>

      {listedCourses.length ? (
        <div className="library-grid">
          {listedCourses.map((course) => (
            <LibraryCourseCard
              key={course.id}
              course={course}
              isExplore={isExplore}
              isSaved={isSaved}
              isEnrolled={
                enrolledIds.includes(course.id) || course.progress > 0
              }
              isSavedCourse={savedIds.includes(course.id)}
              isMonthlyMember={isMonthlyMember}
              onSave={onSave}
              onDetails={onDetails}
              onEnroll={onEnroll}
              onSubscribePlan={openPlan}
            />
          ))}
        </div>
      ) : (
        <LibraryEmpty
          isExplore={isExplore}
          isSaved={isSaved}
          onReset={resetFilters}
          onBrowse={onBrowse}
        />
      )}
    </div>
  );
}
