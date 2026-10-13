import { useState } from "react";
import { BookOpen } from "lucide-react";
import { courses } from "../../data/catalog.js";
import { CatalogHeader } from "./CatalogHeader.jsx";
import { CatalogHero } from "./CatalogHero.jsx";
import { CatalogMembership } from "./CatalogMembership.jsx";
import { EnrollConfirmation } from "./EnrollConfirmation.jsx";
import { CatalogToolbar } from "./CatalogToolbar.jsx";
import { CatalogCourseCard } from "./CatalogCourseCard.jsx";
import { CatalogEmpty } from "./CatalogEmpty.jsx";
import { CatalogStartNote } from "./CatalogStartNote.jsx";
import { CatalogFooter } from "./CatalogFooter.jsx";
import "./CoursesPage.css";
import "../../membership.css";

export function CoursesPage({
  onHome,
  onEnter,
  onMyLearning,
  enrolledIds,
  onEnroll,
  isMonthlyMember,
  onSubscribe,
  isDarkMode,
  onToggleTheme,
}) {
  const [activeCategory, setActiveCategory] = useState("All courses");
  const [query, setQuery] = useState("");
  const [detailsId, setDetailsId] = useState(null);
  const [confirmation, setConfirmation] = useState("");

  const shownCourses = courses.filter(
    (course) =>
      (activeCategory === "All courses" ||
        course.category === activeCategory) &&
      `${course.title} ${course.category} ${course.description} ${course.level}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );

  const enroll = (course) => {
    if (!isMonthlyMember) {
      onSubscribe();
      setConfirmation(
        "Monthly membership is activated in this preview. Choose a course below to add it to My Learning.",
      );
      return;
    }
    onEnroll(course.id);
    setConfirmation(
      `You’re enrolled in ${course.title}. Your course is ready whenever you are.`,
    );
  };

  const resetFilters = () => {
    setQuery("");
    setActiveCategory("All courses");
  };

  const showBeginnerCourses = (category) => {
    setActiveCategory(category);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  return (
    <main className="catalog-page">
      <CatalogHeader
        onHome={onHome}
        onEnter={onEnter}
        onMyLearning={onMyLearning}
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
      />

      <CatalogHero />

      <section className="catalog-content">
        <div className="catalog-heading">
          <div>
            <div className="landing-overline">THE COURSE LIBRARY</div>
            <h2>What would you like to learn?</h2>
            <p>Start at the beginning or build on what you already know.</p>
          </div>
          <button className="catalog-my-learning" onClick={onMyLearning}>
            <BookOpen size={15} /> My learning
            {enrolledIds.length > 0 && <b>{enrolledIds.length}</b>}
          </button>
        </div>

        <CatalogMembership
          isMonthlyMember={isMonthlyMember}
          onSubscribe={onSubscribe}
          onMyLearning={onMyLearning}
        />

        {confirmation && (
          <EnrollConfirmation
            message={confirmation}
            onMyLearning={onMyLearning}
            onDismiss={() => setConfirmation("")}
          />
        )}

        <CatalogToolbar
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          query={query}
          onQueryChange={setQuery}
        />

        <div className="catalog-results">
          <span>
            <b>{shownCourses.length}</b> courses
          </span>
          <span>All courses include guided lessons and projects</span>
        </div>

        {shownCourses.length ? (
          <div className="catalog-grid">
            {shownCourses.map((course, index) => (
              <CatalogCourseCard
                key={course.id}
                course={course}
                index={index}
                isEnrolled={
                  enrolledIds.includes(course.id) || course.progress > 0
                }
                isExpanded={detailsId === course.id}
                isMonthlyMember={isMonthlyMember}
                onToggleDetails={(selected) =>
                  setDetailsId((current) =>
                    current === selected.id ? null : selected.id,
                  )
                }
                onEnroll={enroll}
                onMyLearning={onMyLearning}
              />
            ))}
          </div>
        ) : (
          <CatalogEmpty onReset={resetFilters} />
        )}

        <CatalogStartNote onSelectCategory={showBeginnerCourses} />
      </section>

      <CatalogFooter onHome={onHome} />
    </main>
  );
}
