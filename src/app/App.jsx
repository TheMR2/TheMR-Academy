import { useEffect, useMemo, useRef, useState } from "react";
import { courses } from "../data/catalog.js";
import { useReveal } from "../hooks/useReveal.js";
import { Sidebar } from "../components/Sidebar/Sidebar.jsx";
import { TopBar } from "../components/TopBar/TopBar.jsx";
import { Toast } from "../components/Toast/Toast.jsx";
import { CourseModal } from "../components/CourseModal/CourseModal.jsx";
import { DashboardLibrary } from "../pages/DashboardLibrary/DashboardLibrary.jsx";
import { ProfilePage } from "../pages/ProfilePage/ProfilePage.jsx";
import { SettingsPage } from "../pages/SettingsPage/SettingsPage.jsx";
import { Landing } from "../pages/LandingPage/Landing.jsx";
import { CoursesPage } from "../pages/CoursesPage/CoursesPage.jsx";
import { OverviewPage } from "../pages/OverviewPage/OverviewPage.jsx";
import { CoursePlayer } from "../pages/CoursePlayer/CoursePlayer.jsx";
import { SubscriptionPage } from "../pages/SubscriptionPage/SubscriptionPage.jsx";
import "./App.css";
import "../theme.css";
import "../animations.css";

const STORAGE_KEYS = {
  theme: "themr-academy-theme",
  enrollments: "themr-academy-enrollments",
  membership: "themr-academy-monthly-member",
  plan: "themr-academy-plan",
  savedCourses: "themr-academy-saved-courses",
  lessonProgress: "themr-academy-lesson-progress",
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

function readStoredMap(key) {
  try {
    const stored = JSON.parse(window.localStorage.getItem(key) || "{}");
    return stored && typeof stored === "object" && !Array.isArray(stored)
      ? stored
      : {};
  } catch {
    return {};
  }
}

export default function App() {
  const appRef = useRef(null);
  const [inAcademy, setInAcademy] = useState(false);
  const [publicPage, setPublicPage] = useState("home");
  const [isDarkMode, setIsDarkMode] = useState(
    () => window.localStorage.getItem(STORAGE_KEYS.theme) === "dark",
  );
  const [isMonthlyMember, setIsMonthlyMember] = useState(
    () => window.localStorage.getItem(STORAGE_KEYS.membership) === "true",
  );
  const [plan, setPlan] = useState(
    () => window.localStorage.getItem(STORAGE_KEYS.plan) ?? "monthly",
  );
  const [enrolledCourseIds, setEnrolledCourseIds] = useState(() =>
    readStoredList(STORAGE_KEYS.enrollments),
  );
  const [saved, setSaved] = useState(() =>
    readStoredList(STORAGE_KEYS.savedCourses),
  );
  const [lessonProgress, setLessonProgress] = useState(() =>
    readStoredMap(STORAGE_KEYS.lessonProgress),
  );

  const [activeNav, setActiveNav] = useState("Overview");
  const [activeCategory, setActiveCategory] = useState("All courses");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [playerCourseId, setPlayerCourseId] = useState(null);
  const [activeLessonId, setActiveLessonId] = useState(null);

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
      STORAGE_KEYS.lessonProgress,
      JSON.stringify(lessonProgress),
    );
  }, [lessonProgress]);

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEYS.membership,
      String(isMonthlyMember),
    );
  }, [isMonthlyMember]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.plan, plan);
  }, [plan]);

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEYS.theme,
      isDarkMode ? "dark" : "light",
    );
  }, [isDarkMode]);

  const completedIdsFor = (course) => {
    const stored = lessonProgress[course.id];
    if (Array.isArray(stored)) return stored;
    const seeded = Math.round((course.progress / 100) * course.syllabus.length);
    return course.syllabus.slice(0, seeded).map((lesson) => lesson.id);
  };

  const progressFor = (course) => {
    const total = course.syllabus.length;
    const done = completedIdsFor(course).length;
    const percent = total ? Math.round((done / total) * 100) : 0;
    return Math.max(course.progress, percent);
  };

  const allCourses = useMemo(
    () =>
      courses.map((course) => ({ ...course, progress: progressFor(course) })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lessonProgress],
  );

  const filteredCourses = useMemo(
    () =>
      allCourses.filter(
        (course) =>
          (activeCategory === "All courses" ||
            course.category === activeCategory) &&
          `${course.title} ${course.category} ${course.description}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [allCourses, activeCategory, query],
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
      allCourses.filter(
        (course) =>
          course.progress > 0 || enrolledCourseIds.includes(course.id),
      ),
    [allCourses, enrolledCourseIds],
  );

  useReveal(appRef, [
    inAcademy,
    activeNav,
    playerCourseId,
    activeLessonId,
    publicPage,
  ]);

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

  const firstThemeRender = useRef(true);
  useEffect(() => {
    if (firstThemeRender.current) {
      firstThemeRender.current = false;
      return undefined;
    }
    const root = document.querySelector(".app-shell, .theme-frame");
    if (!root) return undefined;
    root.classList.add("theme-animating");
    const timer = window.setTimeout(() => {
      root.classList.remove("theme-animating");
    }, 650);
    return () => window.clearTimeout(timer);
  }, [isDarkMode]);

  const goTo = (nav) => {
    setActiveNav(nav);
    setMenuOpen(false);
    setProfileOpen(false);
    setPlayerCourseId(null);
    setActiveLessonId(null);
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

  const toggleLessonComplete = (course, lessonId) => {
    setLessonProgress((current) => {
      const existing = Array.isArray(current[course.id])
        ? current[course.id]
        : completedIdsFor(course);
      const next = existing.includes(lessonId)
        ? existing.filter((id) => id !== lessonId)
        : [...existing, lessonId];
      return { ...current, [course.id]: next };
    });
  };

  const openPlayer = (course, lessonId) => {
    const completedIds = completedIdsFor(course);
    const firstIncomplete =
      course.syllabus.find((lesson) => !completedIds.includes(lesson.id)) ??
      course.syllabus[0];
    enrollCourse(course.id);
    setSelectedCourse(null);
    setPlayerCourseId(course.id);
    setActiveLessonId(lessonId ?? firstIncomplete.id);
    setActiveNav("My learning");
    window.scrollTo({ top: 0 });
  };

  const closePlayer = () => {
    setPlayerCourseId(null);
    setActiveLessonId(null);
    window.scrollTo({ top: 0 });
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

  const resetLearningData = () => {
    setEnrolledCourseIds([]);
    setSaved([]);
    setLessonProgress({});
    notify("Your learning progress was cleared.");
  };

  const choosePlan = (planId) => {
    if (planId === "free") {
      setIsMonthlyMember(false);
      notify("You're back on the free plan.");
      return;
    }
    setPlan(planId);
    setIsMonthlyMember(true);
    notify(
      planId === "yearly"
        ? "Yearly plan active — welcome in!"
        : "Monthly plan active — welcome in!",
    );
  };

  const playerCourse = playerCourseId
    ? (allCourses.find((course) => course.id === playerCourseId) ?? null)
    : null;

  const continueCourse =
    allCourses.find((course) => course.progress > 0) ?? allCourses[0];
  const continueCompletedIds = completedIdsFor(continueCourse);
  const continueNextLesson =
    continueCourse.syllabus.find(
      (lesson) => !continueCompletedIds.includes(lesson.id),
    ) ?? continueCourse.syllabus[0];

  if (!inAcademy) {
    return (
      <div
        ref={appRef}
        key={`public-${publicPage}`}
        className={`theme-frame ${isDarkMode ? "dark-mode" : ""}`}
      >
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

        <div
          ref={appRef}
          key={`page-${activeNav}-${playerCourseId ?? "none"}-${playerCourseId ? activeLessonId : "none"}`}
          className="page-content"
        >
          {playerCourse ? (
            <CoursePlayer
              course={playerCourse}
              completedLessonIds={completedIdsFor(playerCourse)}
              activeLessonId={activeLessonId}
              onSelectLesson={setActiveLessonId}
              onToggleComplete={() =>
                toggleLessonComplete(playerCourse, activeLessonId)
              }
              onBack={closePlayer}
              onNotify={notify}
            />
          ) : activeNav === "Overview" ? (
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
              continueCourse={continueCourse}
              continueDone={continueCompletedIds.length}
              continueTotal={continueCourse.syllabus.length}
              continueNextLesson={continueNextLesson}
              onContinue={() => openPlayer(continueCourse)}
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
              plan={plan}
              onExplore={() => goTo("Explore")}
              onMyLearning={() => goTo("My learning")}
              onSaved={() => goTo("Saved")}
              onSettings={() => goTo("Settings")}
              onManagePlans={() => goTo("Subscription")}
            />
          ) : activeNav === "Settings" ? (
            <SettingsPage
              isDarkMode={isDarkMode}
              onToggleTheme={toggleTheme}
              isMonthlyMember={isMonthlyMember}
              plan={plan}
              onManagePlan={() => goTo("Subscription")}
              enrolledCount={enrolledCourses.length}
              savedCount={saved.length}
              onResetData={resetLearningData}
              onProfile={() => goTo("Profile")}
            />
          ) : activeNav === "Subscription" ? (
            <SubscriptionPage
              isMonthlyMember={isMonthlyMember}
              plan={plan}
              onChoosePlan={choosePlan}
              onExploreCourses={() => goTo("Explore")}
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
              onPlay={openPlayer}
              onViewPlans={() => goTo("Subscription")}
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
          completedIds={completedIdsFor(selectedCourse)}
          onClose={() => setSelectedCourse(null)}
          onStart={openPlayer}
        />
      )}
    </div>
  );
}
