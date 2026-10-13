import { useEffect, useMemo, useState } from "react";
import { courses } from "../data/catalog.js";
import { Sidebar } from "../components/Sidebar/Sidebar.jsx";
import { TopBar } from "../components/TopBar/TopBar.jsx";
import { Toast } from "../components/Toast/Toast.jsx";
import { CourseModal } from "../components/CourseModal/CourseModal.jsx";
import { DashboardLibrary } from "../pages/DashboardLibrary/DashboardLibrary.jsx";
import { ProfilePage } from "../pages/ProfilePage/ProfilePage.jsx";
import { Landing } from "../pages/LandingPage/Landing.jsx";
import { CoursesPage } from "../pages/CoursesPage/CoursesPage.jsx";
import { OverviewPage } from "../pages/OverviewPage/OverviewPage.jsx";
import "./App.css";
import "../theme.css";

const STORAGE_KEYS = {
  theme: "themr-academy-theme",
  enrollments: "themr-academy-enrollments",
  membership: "themr-academy-monthly-member",
  savedCourses: "themr-academy-saved-courses",
};

let noticeTimer;

function readStoredList(key) {
  try {
    const stored = JSON.parse(window.localStorage.getItem(key) || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [inAcademy, setInAcademy] = useState(false);
  const [publicPage, setPublicPage] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(
    () => window.localStorage.getItem(STORAGE_KEYS.theme) === "dark",
  );
  const [isMonthlyMember, setIsMonthlyMember] = useState(
    () => window.localStorage.getItem(STORAGE_KEYS.membership) === "true",
  );
  const [enrolledCourseIds, setEnrolledCourseIds] = useState(() =>
    readStoredList(STORAGE_KEYS.enrollments),
  );
  const [saved, setSaved] = useState(() =>
    readStoredList(STORAGE_KEYS.savedCourses),
  );

  const [activeNav, setActiveNav] = useState("Overview");
  const [activeCategory, setActiveCategory] = useState("All courses");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(3);

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEYS.enrollments,
      JSON.stringify(enrolledCourseIds),
    );
  }, [enrolledCourseIds]);

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEYS.savedCourses,
      JSON.stringify(saved),
    );
  }, [saved]);

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEYS.membership,
      String(isMonthlyMember),
    );
  }, [isMonthlyMember]);

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEYS.theme,
      isDarkMode ? "dark" : "light",
    );
  }, [isDarkMode]);

  const filteredCourses = useMemo(
    () =>
      courses.filter(
        (course) =>
          (activeCategory === "All courses" ||
            course.category === activeCategory) &&
          `${course.title} ${course.category} ${course.description}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [activeCategory, query],
  );

  const visibleCourses = useMemo(() => {
    if (activeNav === "Saved") {
      return filteredCourses.filter((course) => saved.includes(course.id));
    }
    if (activeNav === "My learning") {
      return filteredCourses.filter(
        (course) =>
          enrolledCourseIds.includes(course.id) || course.progress > 0,
      );
    }
    return filteredCourses;
  }, [activeNav, filteredCourses, enrolledCourseIds, saved]);

  const enrolledCourses = useMemo(
    () =>
      courses.filter(
        (course) =>
          course.progress > 0 || enrolledCourseIds.includes(course.id),
      ),
    [enrolledCourseIds],
  );

  const notify = (message) => {
    setNotice(message);
    window.clearTimeout(noticeTimer);
    noticeTimer = window.setTimeout(() => setNotice(""), 2600);
  };

  const toggleSaved = (id) =>
    setSaved((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );

  const enrollCourse = (id) =>
    setEnrolledCourseIds((current) =>
      current.includes(id) ? current : [...current, id],
    );

  const toggleTheme = () => setIsDarkMode((current) => !current);

  const goTo = (nav) => {
    setActiveNav(nav);
    setMenuOpen(false);
    setProfileOpen(false);
    if (nav !== "Explore") {
      setActiveCategory("All courses");
      setQuery("");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectCategory = (category) => {
    setActiveCategory(category);
    goTo("Explore");
  };

  const resetCourseFilters = () => {
    setQuery("");
    setActiveCategory("All courses");
    goTo("Explore");
  };

  const startLesson = () => {
    setActiveNav("My learning");
    setSelectedCourse(null);
    notify("Lesson ready — let’s keep going!");
  };

  const enterAcademy = () => {
    setInAcademy(true);
    window.scrollTo({ top: 0 });
  };

  const goMyLearning = () => {
    setActiveNav("My learning");
    setInAcademy(true);
    window.scrollTo({ top: 0 });
  };

  if (!inAcademy) {
    return (
      <div className={`theme-frame ${isDarkMode ? "dark-mode" : ""}`}>
        {publicPage === "courses" ? (
          <CoursesPage
            onHome={() => setPublicPage("home")}
            onEnter={enterAcademy}
            onMyLearning={goMyLearning}
            enrolledIds={enrolledCourseIds}
            onEnroll={enrollCourse}
            isMonthlyMember={isMonthlyMember}
            onSubscribe={() => setIsMonthlyMember(true)}
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
          />
        ) : (
          <Landing
            onEnter={enterAcademy}
            onBrowse={() => setPublicPage("courses")}
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
          />
        )}
      </div>
    );
  }

  return (
    <div className={`app-shell ${isDarkMode ? "dark-mode" : ""}`}>
      <Sidebar
        activeNav={activeNav}
        isOpen={menuOpen}
        learningCount={enrolledCourses.length}
        savedCount={saved.length}
        profileOpen={profileOpen}
        isMonthlyMember={isMonthlyMember}
        onNavigate={goTo}
        onClose={() => setMenuOpen(false)}
        onToggleProfile={() => setProfileOpen((current) => !current)}
        onSignOut={() => {
          setProfileOpen(false);
          notify("You’re all set — see you next time!");
        }}
        onNotify={notify}
      />

      <main className="main-area">
        <TopBar
          activeNav={activeNav}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
          onOpenMenu={() => setMenuOpen(true)}
          onNotify={notify}
          onOpenProfile={() => goTo("Profile")}
        />

        <div className="page-content">
          {activeNav === "Overview" ? (
            <OverviewPage
              activeNav={activeNav}
              activeCategory={activeCategory}
              onSelectCategory={selectCategory}
              query={query}
              onQueryChange={setQuery}
              courses={visibleCourses}
              savedIds={saved}
              onSave={toggleSaved}
              onOpenCourse={setSelectedCourse}
              onSelectTrack={(category) => {
                setActiveCategory(category);
                goTo("Explore");
              }}
              onExploreAll={() => goTo("Explore")}
              onResetFilters={resetCourseFilters}
              onNotify={notify}
              onHome={() => goTo("Overview")}
            />
          ) : activeNav === "Profile" ? (
            <ProfilePage
              enrolledCourses={enrolledCourses}
              isMonthlyMember={isMonthlyMember}
              onExplore={() => goTo("Explore")}
              onMyLearning={() => goTo("My learning")}
              onSaved={() => goTo("Saved")}
              onSettings={() =>
                notify("Profile settings will be available soon.")
              }
            />
          ) : (
            <DashboardLibrary
              mode={activeNav}
              courses={visibleCourses}
              savedIds={saved}
              isMonthlyMember={isMonthlyMember}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              query={query}
              setQuery={setQuery}
              onSave={toggleSaved}
              onDetails={setSelectedCourse}
              onSubscribe={() => setIsMonthlyMember(true)}
              onEnroll={enrollCourse}
              enrolledIds={enrolledCourseIds}
              onBrowse={() => goTo("Explore")}
            />
          )}
        </div>
      </main>

      {notice && <Toast message={notice} onDismiss={() => setNotice("")} />}

      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          activeLesson={activeLesson}
          onSelectLesson={setActiveLesson}
          onClose={() => setSelectedCourse(null)}
          onStart={startLesson}
        />
      )}
    </div>
  );
}
