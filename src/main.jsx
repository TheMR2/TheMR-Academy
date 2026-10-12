import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Bell, BookOpen, Bookmark, Check,
  ChevronDown, ChevronRight, CircleHelp, Clock3, Code2, Compass, Flame, GraduationCap,
  LayoutDashboard, Lightbulb, Menu, Moon, Play, Search, Settings, Sparkles, Terminal,
  Sun, Trophy, UserRound, X, Zap,
} from 'lucide-react';
import './styles.css';
import './catalog.css';
import './dashboard-pages.css';
import './membership.css';
import './theme.css';
import './theme-art.css';

const courses = [
  { id: 1, title: 'HTML & CSS Foundations', category: 'Web development', level: 'Beginner', lessons: 18, duration: '4h 20m', color: 'mint', icon: '‹ ›', progress: 68, description: 'Build beautiful, responsive websites from scratch.', tag: 'Continue learning', mentor: 'Sofia Chen' },
  { id: 2, title: 'JavaScript, Made Simple', category: 'JavaScript', level: 'Beginner', lessons: 24, duration: '6h 10m', color: 'yellow', icon: 'JS', progress: 0, description: 'Make your pages come alive with JavaScript.', tag: 'New course', mentor: 'Marcus Reed' },
  { id: 3, title: 'React for Real Projects', category: 'Frontend', level: 'Intermediate', lessons: 20, duration: '5h 45m', color: 'blue', icon: '⚛', progress: 0, description: 'Turn your ideas into modern, interactive apps.', tag: 'Popular', mentor: 'Aisha Patel' },
  { id: 4, title: 'Python: Your First Steps', category: 'Python', level: 'Beginner', lessons: 16, duration: '3h 50m', color: 'violet', icon: 'Py', progress: 0, description: 'Write your first programs and think like a developer.', tag: 'Great for beginners', mentor: 'Daniel Kim' },
  { id: 5, title: 'Git & GitHub Essentials', category: 'Developer tools', level: 'Beginner', lessons: 12, duration: '2h 30m', color: 'coral', icon: '⌘', progress: 0, description: 'Save your work and collaborate like a pro.', tag: 'Essential skills', mentor: 'Nora James' },
  { id: 6, title: 'Designing with Figma', category: 'Design', level: 'Beginner', lessons: 14, duration: '3h 15m', color: 'pink', icon: '◈', progress: 0, description: 'Plan your next great app before you code it.', tag: 'Creative path', mentor: 'Leo Martin' },
];
const tracks = [
  { name: 'Frontend Developer', label: 'MOST POPULAR', detail: 'From your first page to your first app.', modules: 5, time: '32 hours', color: 'track-mint', symbol: '</>' },
  { name: 'Python Developer', label: 'START HERE', detail: 'A friendly start to a whole new world.', modules: 4, time: '24 hours', color: 'track-blue', symbol: 'Py' },
  { name: 'Creative Coder', label: 'DESIGN + CODE', detail: 'Bring your creative ideas to the web.', modules: 4, time: '28 hours', color: 'track-lilac', symbol: '✳' },
];
const categories = ['All courses', 'Web development', 'JavaScript', 'Frontend', 'Python', 'Developer tools', 'Design'];

function Logo({ small = false, onClick }) {
  return <button className={`brand ${small ? 'brand-small' : ''}`} onClick={onClick} aria-label="TheMR Academy home">
    <svg className="brand-mark" viewBox="0 0 46 54" fill="none" aria-hidden="true">
      <path d="M22.7 1 43 7.7 22.7 14 2 7.7 22.7 1Z" fill="#149C76"/>
      <circle cx="23" cy="12.3" r="6.8" fill="#F6F5EE"/>
      <path d="M5 21h36v31H5z" fill="#F6F5EE"/>
      <path d="m13 20 10 13 10-13" stroke="#159A77" strokeWidth="2.4" strokeLinejoin="round"/>
      <path d="M23 32v20" stroke="#17201E" strokeWidth="2"/>
      <path d="M2 8 23 14 43 8" stroke="#0B1210" strokeWidth="1.3"/>
    </svg>
    <span className="brand-word"><strong>The</strong><b>MR</b> <i>Academy</i></span>
  </button>;
}

function ThemeToggle({ isDarkMode, onToggle }) {
  return <button className="theme-toggle" type="button" onClick={onToggle} aria-label={isDarkMode?'Switch to light mode':'Switch to dark mode'} title={isDarkMode?'Switch to light mode':'Switch to dark mode'}>{isDarkMode?<Sun size={16}/>:<Moon size={16}/>}</button>;
}

function App() {
  const [inAcademy, setInAcademy] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => window.localStorage.getItem('themr-academy-theme') === 'dark');
  const [publicPage, setPublicPage] = useState('home');
  const [enrolledCourseIds, setEnrolledCourseIds] = useState(() => {
    try { const stored = JSON.parse(window.localStorage.getItem('themr-academy-enrollments') || '[]'); return Array.isArray(stored) ? stored : []; }
    catch { return []; }
  });
  const [isMonthlyMember, setIsMonthlyMember] = useState(() => window.localStorage.getItem('themr-academy-monthly-member') === 'true');
  const [activeNav, setActiveNav] = useState('Overview');
  const [activeCategory, setActiveCategory] = useState('All courses');
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useState(() => {
    try { const stored = JSON.parse(window.localStorage.getItem('themr-academy-saved-courses') || '[]'); return Array.isArray(stored) ? stored : []; }
    catch { return []; }
  });
  const [notice, setNotice] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(3);

  const filteredCourses = useMemo(() => courses.filter(course =>
    (activeCategory === 'All courses' || course.category === activeCategory) &&
    `${course.title} ${course.category} ${course.description}`.toLowerCase().includes(query.toLowerCase())
  ), [activeCategory, query]);

  const notify = message => { setNotice(message); window.clearTimeout(window.__noticeTimer); window.__noticeTimer = window.setTimeout(() => setNotice(''), 2600); };
  const toggleSaved = id => setSaved(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  const enrollCourse = id => setEnrolledCourseIds(current => current.includes(id) ? current : [...current, id]);
  useEffect(() => {
    window.localStorage.setItem('themr-academy-enrollments', JSON.stringify(enrolledCourseIds));
  }, [enrolledCourseIds]);
  useEffect(() => {
    window.localStorage.setItem('themr-academy-saved-courses', JSON.stringify(saved));
  }, [saved]);
  useEffect(() => {
    window.localStorage.setItem('themr-academy-monthly-member', String(isMonthlyMember));
  }, [isMonthlyMember]);
  useEffect(() => {
    window.localStorage.setItem('themr-academy-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);
  const goTo = (nav, id) => {
    setActiveNav(nav); setMenuOpen(false); setProfileOpen(false);
    if (nav !== 'Explore') { setActiveCategory('All courses'); setQuery(''); }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const visibleCourses = useMemo(() => {
    const list = activeNav === 'Saved'
      ? filteredCourses.filter(course => saved.includes(course.id))
      : activeNav === 'My learning'
        ? filteredCourses.filter(course => enrolledCourseIds.includes(course.id) || course.progress > 0)
        : filteredCourses;
    return list;
  }, [activeNav, filteredCourses, enrolledCourseIds, saved]);

  if (!inAcademy) return <div className={`theme-frame ${isDarkMode?'dark-mode':''}`}>{publicPage === 'courses'
    ? <CoursesPage onHome={() => setPublicPage('home')} onEnter={() => setInAcademy(true)} onMyLearning={() => { setActiveNav('My learning'); setInAcademy(true); window.scrollTo({ top: 0 }); }} enrolledIds={enrolledCourseIds} onEnroll={enrollCourse} isMonthlyMember={isMonthlyMember} onSubscribe={() => setIsMonthlyMember(true)} isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(current=>!current)} />
    : <Landing onEnter={() => setInAcademy(true)} onBrowse={() => setPublicPage('courses')} isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(current=>!current)} />}</div>;

  return <div className={`app-shell ${isDarkMode?'dark-mode':''}`}>
    <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
      <div className="sidebar-top"><Logo onClick={() => goTo('Overview')} /><button className="mobile-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}><X size={19}/></button></div>
      <div className="nav-label">MENU</div>
      <nav className="side-nav">
        <button className={`nav-item ${activeNav === 'Overview' ? 'active' : ''}`} onClick={() => goTo('Overview')}><LayoutDashboard size={18}/>Overview</button>
        <button className={`nav-item ${activeNav === 'My learning' ? 'active' : ''}`} onClick={() => goTo('My learning')}><BookOpen size={18}/>My learning<span className="nav-count">{courses.filter(course => course.progress > 0 || enrolledCourseIds.includes(course.id)).length}</span></button>
        <button className={`nav-item ${activeNav === 'Explore' ? 'active' : ''}`} onClick={() => goTo('Explore')}><Compass size={18}/>Explore courses</button>
        <button className={`nav-item ${activeNav === 'Saved' ? 'active' : ''}`} onClick={() => goTo('Saved')}><Bookmark size={18}/>Saved courses{saved.length > 0 && <span className="nav-count">{saved.length}</span>}</button>
        <button className={`nav-item ${activeNav === 'Profile' ? 'active' : ''}`} onClick={() => goTo('Profile')}><UserRound size={18}/>My profile</button>
      </nav>
      <div className="nav-label nav-label-second">YOUR LEARNING</div>
      <div className="week-card">
        <div className="week-card-head"><span className="flame-icon"><Flame size={16} fill="currentColor"/></span><strong>5 day streak</strong><span className="streak-count">5/7</span></div>
        <div className="week-days">{['M','T','W','T','F','S','S'].map((d,i)=><div className="day-wrap" key={i}><span className={`day-dot ${i<5?'day-done':''} ${i===4?'day-today':''}`}>{i<4?<Check size={11}/>:d}</span><small>{d}</small></div>)}</div>
        <div className="week-foot">Keep your momentum going <ArrowRight size={13}/></div>
      </div>
      <div className="sidebar-spacer"/>
      <div className="sidebar-bottom">
        <button className="nav-item" onClick={() => notify('Help center is coming soon.')}><CircleHelp size={18}/>Help center</button>
        <button className="nav-item" onClick={() => notify('Settings will be available soon.')}><Settings size={18}/>Settings</button>
        <div className="profile-wrap">
          {profileOpen && <div className="profile-menu"><button onClick={() => goTo('Profile')}>My profile</button><button onClick={() => { setProfileOpen(false); notify('You’re all set — see you next time!'); }}>Sign out</button></div>}
          <button className="profile-card" onClick={() => setProfileOpen(!profileOpen)}><div className="avatar">M</div><span className="profile-info"><strong>Mohamed Reda</strong><small>{isMonthlyMember?'Monthly plan preview':'Learner account'}</small></span><ChevronDown size={16}/></button>
        </div>
      </div>
    </aside>

    <main className="main-area">
      <header className="topbar">
        <button className="mobile-menu" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu size={20}/></button>
        <div className="breadcrumb"><span>Academy</span><ChevronRight size={14}/><strong>{activeNav}</strong></div>
        <div className="topbar-right"><span className="topbar-date">MONDAY, OCTOBER 13</span><ThemeToggle isDarkMode={isDarkMode} onToggle={()=>setIsDarkMode(current=>!current)}/><button className="icon-button notification-button" aria-label="Notifications" onClick={() => notify('You’re all caught up!')}><Bell size={18}/><i/></button><button className="top-avatar" aria-label="Open profile" onClick={() => goTo('Profile')}>M</button></div>
      </header>
      <div className="page-content">
        {activeNav === 'Overview' ? <>
        <section className="welcome-row"><div><div className="eyebrow"><span className="online-dot"/>YOUR LEARNING SPACE</div><h1>Good morning, Mohamed <span className="wave">✳</span></h1><p className="welcome-subtitle">A little progress each day adds up to big results.</p></div><div className="welcome-stats"><div className="stat-card"><div className="stat-icon stat-mint"><Zap size={17}/></div><div><strong>5 days</strong><small>Learning streak</small></div></div><div className="stat-card"><div className="stat-icon stat-peach"><Clock3 size={17}/></div><div><strong>2.5 hrs</strong><small>This week</small></div></div></div></section>

        <section className="hero-card" id="continue-learning">
          <div className="hero-copy"><span className="hero-kicker"><span className="hero-kicker-dot"/>PICK UP WHERE YOU LEFT OFF</span><h2>You're building<br/>something great.</h2><p>Every line of code gets you closer to your goal. Keep learning HTML & CSS Foundations.</p><button className="primary-button" onClick={() => setSelectedCourse(courses[0])}>Continue learning <ArrowRight size={16}/></button><div className="hero-progress-meta"><span>YOUR PROGRESS</span><b>12 of 18 lessons</b><span>68%</span></div><div className="progress-track"><div style={{width:'68%'}}/></div></div>
          <div className="hero-visual" aria-label="Illustration of code on a laptop"><div className="visual-orbit orbit-one"/><div className="visual-orbit orbit-two"/><div className="floating-badge float-code"><Code2 size={16}/><span>Clean code</span></div><div className="floating-badge float-check"><span className="mini-check"><Check size={12}/></span>Nice work!</div><div className="laptop"><div className="laptop-screen"><div className="screen-bar"><span/><span/><span/><i>index.html</i><span className="screen-bar-lock">⌑</span></div><div className="code-lines"><div><i>01</i><span className="syntax-pink">&lt;section</span> <span className="syntax-blue">class</span>=<span className="syntax-green">"hero"</span><span className="syntax-pink">&gt;</span></div><div><i>02</i><span className="indent"/><span className="syntax-pink">&lt;h1&gt;</span><span>Make it yours.</span><span className="syntax-pink">&lt;/h1&gt;</span></div><div><i>03</i><span className="indent"/><span className="syntax-pink">&lt;p&gt;</span><span className="syntax-gray">Your ideas, online.</span><span className="syntax-pink">&lt;/p&gt;</span></div><div><i>04</i><span className="syntax-pink">&lt;/section&gt;</span></div><div className="code-cursor"/></div></div><div className="laptop-base"/></div><div className="visual-caption"><span>LESSON 12</span><b>Styling your first page</b><span className="caption-play"><Play size={13} fill="currentColor"/></span></div></div>
        </section>

        <section className="learning-paths" id="paths"><div className="section-heading"><div><div className="section-overline">A CLEAR WAY FORWARD</div><h2>Choose your learning path</h2><p>Follow a guided path and build skills that open doors.</p></div><button className="text-button" onClick={() => goTo('Explore','explore')}>Explore all paths <ArrowRight size={16}/></button></div><div className="tracks-grid">{tracks.map((track,index)=><button key={track.name} className={`track-card ${track.color}`} onClick={()=>{setActiveCategory(index===1?'Python':index===2?'Design':'All courses');goTo('Explore','explore');}}><div className="track-top"><span className="track-badge">{track.label}</span><span className="track-arrow"><ArrowUpRight size={17}/></span></div><div className="track-lower"><div className="track-text"><h3>{track.name}</h3><p>{track.detail}</p><div className="track-meta"><span><BookOpen size={13}/>{track.modules} courses</span><span><Clock3 size={13}/>{track.time}</span></div></div><div className="track-symbol">{track.symbol}</div></div><div className="track-decoration"/></button>)}</div></section>

        <section className="courses-section" id="explore"><div className="section-heading course-heading"><div><div className="section-overline">YOUR NEXT CHAPTER</div><h2>{activeNav === 'Saved' ? 'Your saved courses' : activeNav === 'My learning' ? 'Courses in your learning' : 'Courses picked for you'}</h2><p>{activeNav === 'Saved' ? 'The courses you bookmarked for later.' : activeNav === 'My learning' ? 'Pick up a lesson or start an enrolled course.' : 'Practical skills, friendly teachers, and real projects.'}</p></div></div>
          <div className="course-toolbar"><div className="category-tabs">{categories.map((category,index)=><button key={category} className={activeCategory===category?'category-active':''} onClick={()=>{setActiveCategory(category);setActiveNav('Explore')}}>{category}{index===0&&<span>6</span>}</button>)}</div><label className="search-box"><Search size={16}/><input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search courses" aria-label="Search courses"/><kbd>⌘ K</kbd></label></div>
          {visibleCourses.length ? <div className="courses-grid">{visibleCourses.map(course=><article className="course-card" key={course.id}><div className={`course-art art-${course.color}`}><span className="art-label">{course.tag}</span><button className={`save-button ${saved.includes(course.id)?'is-saved':''}`} aria-label={saved.includes(course.id)?'Remove saved course':'Save course'} onClick={()=>toggleSaved(course.id)}><Bookmark size={16} fill={saved.includes(course.id)?'currentColor':'none'}/></button><div className="art-shape shape-one"/><div className="art-shape shape-two"/><div className="course-glyph">{course.icon}</div><span className="art-star">✳</span></div><div className="course-body"><div className="course-eyebrow"><span>{course.category}</span><i/><span>{course.level}</span></div><h3>{course.title}</h3><p>{course.description}</p><div className="course-footer"><div className="mentor-avatar">{course.mentor.split(' ').map(part=>part[0]).join('')}</div><span className="mentor-name">{course.mentor}</span><span className="course-duration"><Clock3 size={13}/>{course.duration}</span></div>{course.progress>0?<div className="course-progress"><span><b>{course.progress}%</b> complete</span><i><em style={{width:`${course.progress}%`}}/></i></div>:<div className="course-bottom-meta"><span><Play size={12}/>{course.lessons} lessons</span><button onClick={()=>setSelectedCourse(course)}>View course <ArrowRight size={14}/></button></div>}</div></article>)}</div> : <div className="empty-state"><div className="empty-icon"><Search size={21}/></div><h3>{activeNav === 'Saved'?'No saved courses yet':'No courses found'}</h3><p>{activeNav === 'Saved'?'Save courses with the bookmark icon to find them here.':'Try a different search or course category.'}</p><button className="text-button" onClick={()=>{setQuery('');setActiveCategory('All courses');setActiveNav('Explore')}}>Browse all courses <ArrowRight size={15}/></button></div>}
        </section>

        <section className="bottom-promo"><div className="promo-icon"><Lightbulb size={21}/></div><div className="promo-copy"><span>A NOTE FROM YOUR MENTORS</span><h3>Don't worry about getting it right. Just get started.</h3><p>Every expert was once a beginner. You've got this.</p></div><button className="promo-link" onClick={()=>notify('Your mentors are cheering you on!')}>A little encouragement <Sparkles size={16}/></button><div className="promo-decoration">✳</div></section>
        <footer className="footer"><Logo small onClick={()=>goTo('Overview')}/><span>Made for curious minds, everywhere.</span><span>© 2026 TheMR Academy</span></footer>
        </> : activeNav === 'Profile'
          ? <ProfilePage enrolledCourses={courses.filter(course => course.progress > 0 || enrolledCourseIds.includes(course.id))} isMonthlyMember={isMonthlyMember} onExplore={() => goTo('Explore')} onMyLearning={() => goTo('My learning')} onSaved={() => goTo('Saved')} onSettings={() => notify('Profile settings will be available soon.')} />
          : <DashboardLibrary mode={activeNav} courses={visibleCourses} savedIds={saved} isMonthlyMember={isMonthlyMember} activeCategory={activeCategory} setActiveCategory={setActiveCategory} query={query} setQuery={setQuery} onSave={toggleSaved} onDetails={setSelectedCourse} onSubscribe={() => setIsMonthlyMember(true)} onEnroll={enrollCourse} enrolledIds={enrolledCourseIds} onBrowse={() => goTo('Explore')} />}
      </div>
    </main>

    {notice && <div className="toast"><span><Check size={14}/></span>{notice}<button aria-label="Dismiss" onClick={()=>setNotice('')}><X size={14}/></button></div>}
    {selectedCourse && <div className="modal-backdrop" onClick={()=>setSelectedCourse(null)}><section className="course-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={event=>event.stopPropagation()}><button className="modal-close" aria-label="Close course details" onClick={()=>setSelectedCourse(null)}><X size={19}/></button><div className={`modal-art art-${selectedCourse.color}`}><div className="modal-course-glyph">{selectedCourse.icon}</div><span>{selectedCourse.category}</span></div><div className="modal-content"><div className="section-overline">{selectedCourse.level.toUpperCase()} COURSE</div><h2 id="modal-title">{selectedCourse.title}</h2><p>{selectedCourse.description}</p><div className="modal-stats"><span><BookOpen size={15}/>{selectedCourse.lessons} bite-sized lessons</span><span><Clock3 size={15}/>{selectedCourse.duration}</span></div><div className="lesson-list-title">{selectedCourse.progress>0?'CONTINUE YOUR COURSE':'WHAT YOU’LL LEARN'}</div><button className={`lesson-row ${activeLesson===1?'lesson-selected':''}`} onClick={()=>setActiveLesson(1)}><span className="lesson-number">{activeLesson>1?<Check size={13}/>:<span>01</span>}</span><span><b>Getting started</b><small>Meet your tools and write your first line</small></span><span className="lesson-length">08 min</span></button><button className={`lesson-row ${activeLesson===2?'lesson-selected':''}`} onClick={()=>setActiveLesson(2)}><span className="lesson-number">{activeLesson>2?<Check size={13}/>:<span>02</span>}</span><span><b>The building blocks</b><small>Give your page structure and meaning</small></span><span className="lesson-length">12 min</span></button><button className={`lesson-row ${activeLesson===3?'lesson-selected':''}`} onClick={()=>setActiveLesson(3)}><span className="lesson-number"><span>03</span></span><span><b>Styling your first page</b><small>Bring your ideas to life with color</small></span><span className="lesson-length">15 min</span></button><button className="modal-start-button" onClick={()=>{setActiveNav('My learning');setSelectedCourse(null);notify('Lesson ready — let’s keep going!')}}><Play size={15} fill="currentColor"/>{selectedCourse.progress>0?'Continue lesson':'Start learning'}<ArrowRight size={16}/></button></div></section></div>}
  </div>;
}

function DashboardLibrary({ mode, courses: listedCourses, savedIds, isMonthlyMember, activeCategory, setActiveCategory, query, setQuery, onSave, onDetails, onSubscribe, onEnroll, enrolledIds, onBrowse }) {
  const [membershipMessage, setMembershipMessage] = useState('');
  const isExplore = mode === 'Explore';
  const isSaved = mode === 'Saved';
  const pageTitle = isExplore ? 'Explore all courses' : isSaved ? 'Saved courses' : 'My learning';
  const pageIntro = isExplore ? 'Explore every course in TheMR Academy and choose what to learn next.' : isSaved ? 'Your bookmarked courses, all in one place.' : 'Your courses and learning progress, together in one place.';
  const openPlan = () => {
    onSubscribe();
    setMembershipMessage('Monthly membership activated in this preview. Payment processing is not connected yet.');
  };
  return <div className="dashboard-page">
    <div className="dashboard-page-heading"><div><div className="section-overline">THEMR ACADEMY</div><h1>{pageTitle}</h1><p>{pageIntro}</p></div>{isExplore&&<span className="catalog-total"><BookOpen size={14}/>{courses.length} courses</span>}</div>
    {isExplore&&<section className={`membership-banner ${isMonthlyMember?'membership-active':''}`}><div className="membership-icon"><GraduationCap size={20}/></div><div className="membership-copy"><span>{isMonthlyMember?'YOUR MEMBERSHIP PREVIEW':'ONE MEMBERSHIP, EVERY COURSE'}</span><h2>{isMonthlyMember?'Monthly membership preview active':'Learn everything with one monthly plan'}</h2><p>{isMonthlyMember?'You can add any course to My Learning.':'Monthly billing gives you access to the full course library. Price to be set.'}</p>{membershipMessage&&<small className="membership-message">{membershipMessage}</small>}</div><button onClick={isMonthlyMember?()=>setMembershipMessage('Your monthly membership preview is active.'):openPlan()}>{isMonthlyMember?<><Check size={14}/> Preview active</>:<>Choose monthly plan <ArrowRight size={14}/></>}</button></section>}
    <div className="library-toolbar"><div className="library-tabs">{categories.map((category,index)=><button key={category} className={activeCategory===category?'library-tab-active':''} onClick={()=>setActiveCategory(category)}>{category}{index===0&&<span>{courses.length}</span>}</button>)}</div><label className="library-search"><Search size={15}/><input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search courses" aria-label="Search courses"/>{query&&<button aria-label="Clear search" onClick={()=>setQuery('')}><X size={13}/></button>}</label></div>
    <div className="library-results"><span><b>{listedCourses.length}</b> {listedCourses.length===1?'course':'courses'}</span><span>{isExplore?'All courses on the platform':isSaved?'Saved for later':'Based on your learning account'}</span></div>
    {listedCourses.length ? <div className="library-grid">{listedCourses.map(course=>{
      const isEnrolled=enrolledIds.includes(course.id)||course.progress>0;
      return <article className="library-course" key={course.id}>
        <div className={`library-course-art art-${course.color}`}><span className="library-course-label">{course.tag}</span>{isExplore&&<button className={`save-button ${savedIds.includes(course.id)?'is-saved':''}`} aria-label={savedIds.includes(course.id)?'Remove saved course':'Save course'} onClick={()=>onSave(course.id)}><Bookmark size={16} fill={savedIds.includes(course.id)?'currentColor':'none'}/></button>}<div className="art-shape shape-one"/><div className="art-shape shape-two"/><div className="course-glyph">{course.icon}</div></div>
        <div className="library-course-body"><div className="library-course-meta"><span>{course.category}</span><span>{course.level}</span></div><h2>{course.title}</h2><p>{course.description}</p><div className="library-course-info"><span><BookOpen size={13}/>{course.lessons} lessons</span><span><Clock3 size={13}/>{course.duration}</span><span className="library-mentor">{course.mentor}</span></div>{course.progress>0&&<div className="library-progress"><span><b>{course.progress}%</b> complete</span><i><em style={{width:`${course.progress}%`}}/></i></div>}
          <div className="library-course-actions">{isSaved?<button className="library-remove-save" onClick={()=>onSave(course.id)}><Bookmark size={13} fill="currentColor"/> Remove from saved</button>:<button className="library-details" onClick={()=>onDetails(course)}>Course details <ArrowRight size={13}/></button>}
            {isExplore?<button className={`library-main-action ${isEnrolled?'library-enrolled':''}`} onClick={()=>{if(isEnrolled){onDetails(course);return}if(!isMonthlyMember){openPlan();return}onEnroll(course.id)}}>{isEnrolled?<><Play size={12} fill="currentColor"/> Continue</>:isMonthlyMember?<>Add to My Learning <ArrowRight size={13}/></>:<>Monthly plan <ArrowRight size={13}/></>}</button>:isSaved?<button className={`library-main-action ${isEnrolled?'library-enrolled':''}`} onClick={()=>isEnrolled?onDetails(course):isMonthlyMember?onEnroll(course.id):openPlan()}>{isEnrolled?<><Play size={12} fill="currentColor"/> Continue</>:isMonthlyMember?<>Add to My Learning <ArrowRight size={13}/></>:<>Choose monthly plan <ArrowRight size={13}/></>}</button>:<button className="library-main-action" onClick={()=>onDetails(course)}><Play size={12} fill="currentColor"/> Continue learning</button>}
          </div>
        </div>
      </article>;
    })}</div>:<div className="library-empty"><div><Bookmark size={19}/></div><h2>{isSaved?'No saved courses yet':isExplore?'No courses match your search':'Your learning starts here'}</h2><p>{isSaved?'Save courses from Explore Courses to keep them here.':isExplore?'Try another search or category.':'Explore the catalog and add courses to your learning list.'}</p><button onClick={()=>isExplore?(setActiveCategory('All courses'),setQuery('')):onBrowse()}>{isExplore?'Show all courses':'Browse courses'} <ArrowRight size={14}/></button></div>}
  </div>;
}

function ProfilePage({ enrolledCourses, isMonthlyMember, onExplore, onMyLearning, onSaved, onSettings }) {
  return <div className="profile-page">
    <div className="dashboard-page-heading"><div><div className="section-overline">YOUR ACCOUNT</div><h1>My profile</h1><p>Your learning details, membership, and course shortcuts.</p></div><button className="profile-edit-button" onClick={onSettings}><Settings size={14}/> Profile settings</button></div>
    <section className="profile-hero-card"><div className="profile-avatar-large">M</div><div className="profile-hero-copy"><span>LEARNER PROFILE</span><h2>Mohamed Reda</h2><p>Learning member since October 2026</p></div><div className="profile-plan-pill"><span className={isMonthlyMember?'plan-dot plan-active':'plan-dot'}/>{isMonthlyMember?'Monthly plan preview':'No active plan'}</div></section>
    <div className="profile-stats-grid"><div><span className="profile-stat-icon"><BookOpen size={17}/></span><b>{enrolledCourses.length}</b><small>Courses in My Learning</small></div><div><span className="profile-stat-icon profile-stat-yellow"><Flame size={17}/></span><b>5 days</b><small>Current learning streak</small></div><div><span className="profile-stat-icon profile-stat-blue"><Clock3 size={17}/></span><b>2.5 hrs</b><small>Learning time this week</small></div></div>
    <div className="profile-content-grid"><section className="profile-membership-card"><div className="profile-card-label">MEMBERSHIP</div><div className="profile-membership-head"><div className="membership-icon"><GraduationCap size={20}/></div><div><h3>Monthly membership</h3><p>{isMonthlyMember?'Preview active · no payment processed':'Access the full course library with one monthly plan.'}</p></div></div><div className="profile-membership-foot"><span>{isMonthlyMember?'Monthly preview':'Price to be set'}</span><button onClick={onExplore}>{isMonthlyMember?'Explore your courses':'View monthly plan'} <ArrowRight size={13}/></button></div></section><section className="profile-details-card"><div className="profile-card-label">ACCOUNT DETAILS</div><div><small>Full name</small><b>Mohamed Reda</b></div><div><small>Account type</small><b>Academy learner</b></div><div><small>Learning goal</small><b>Become a frontend developer</b></div></section></div>
    <section className="profile-shortcuts"><div className="profile-shortcuts-heading"><div><div className="section-overline">YOUR ACADEMY</div><h2>Quick links</h2></div></div><div className="profile-shortcut-grid"><button onClick={onMyLearning}><span><BookOpen size={17}/></span><b>My Learning</b><small>{enrolledCourses.length} courses in progress</small><ArrowRight size={15}/></button><button onClick={onExplore}><span><Compass size={17}/></span><b>Explore Courses</b><small>Browse all courses</small><ArrowRight size={15}/></button><button onClick={onSaved}><span><Bookmark size={17}/></span><b>Saved Courses</b><small>Your bookmarked courses</small><ArrowRight size={15}/></button></div></section>
  </div>;
}

function Landing({ onEnter, onBrowse, isDarkMode, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const jumpTo = id => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  const submitEmail = event => {
    event.preventDefault();
    if (!email.trim()) return;
    setMessage('You’re on the list! Your first lesson is waiting.');
    setEmail('');
  };

  return <main className="landing-page">
    <header className="landing-header">
      <Logo small onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}/>
      <nav className={`landing-nav ${menuOpen ? 'landing-nav-open' : ''}`}>
        <button onClick={onBrowse}>Courses</button>
        <button onClick={() => jumpTo('landing-paths')}>Learning paths</button>
        <button onClick={() => jumpTo('landing-about')}>Why TheMR</button>
      </nav>
      <div className="landing-actions"><ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme}/><button className="login-link" onClick={onEnter}>Log in</button><button className="landing-cta" onClick={onEnter}>Start learning <ArrowRight size={15}/></button></div>
      <button className="landing-menu-toggle" aria-label="Open navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen?<X size={20}/>:<Menu size={20}/>}</button>
    </header>

    <section className="landing-hero">
      <div className="landing-hero-copy"><div className="landing-eyebrow"><span/>A FRIENDLY PLACE TO LEARN TO CODE</div><h1>Your ideas deserve<br/>to be <span>built.</span></h1><p>Learn programming one small win at a time. Make real things, ask questions, and grow into the developer you want to be.</p><div className="landing-hero-actions"><button className="landing-primary" onClick={onBrowse}>Explore courses <ArrowRight size={17}/></button><button className="landing-secondary" onClick={() => jumpTo('landing-courses')}><Play size={14} fill="currentColor"/> See what you can learn</button></div><div className="landing-social-proof"><div className="learner-avatars"><i>M</i><i>A</i><i>Y</i><i>+</i></div><span><strong>A good place to begin.</strong><br/>Built for curious minds at every level.</span></div></div>
      <div className="landing-hero-art"><div className="landing-sun"/><div className="hero-sticker sticker-top"><span>✳</span> Made for beginners</div><div className="landing-window"><div className="landing-window-top"><div><i/><i/><i/></div><span>your-first-website.html</span><ArrowUpRight size={13}/></div><div className="landing-code"><div><i>01</i><span className="syntax-pink">&lt;h1&gt;</span><span className="landing-code-text">Hello, world!</span><span className="syntax-pink">&lt;/h1&gt;</span></div><div><i>02</i><span className="syntax-pink">&lt;p&gt;</span><span className="syntax-gray">Your next chapter starts here.</span><span className="syntax-pink">&lt;/p&gt;</span></div><div><i>03</i><span className="syntax-pink">&lt;button</span> <span className="syntax-blue">class</span>=<span className="syntax-green">"dream-big"</span><span className="syntax-pink">&gt;</span></div><div><i>04</i><span className="indent"/><span className="landing-code-text">Build something.</span></div><div><i>05</i><span className="syntax-pink">&lt;/button&gt;</span></div><span className="landing-cursor"/></div><div className="landing-preview"><div className="preview-label">YOUR FIRST PROJECT</div><div className="preview-content"><span className="preview-sparkle">✳</span><b>A little page<br/>with big ideas.</b><i>Keep building <ArrowRight size={11}/></i></div></div></div><div className="hero-sticker sticker-bottom"><span><Check size={13}/></span> First line of code: done</div><div className="landing-hero-orbit orbit-a"/><div className="landing-hero-orbit orbit-b"/></div>
    </section>

    <div className="landing-trust"><span>SMALL STEPS. REAL SKILLS.</span><i/><span>Learn at your own pace</span><i/><span>Build as you go</span><i/><span>Get unstuck together</span></div>

    <section className="landing-section landing-courses" id="landing-courses"><div className="landing-section-head"><div><div className="landing-overline">START WITH THE GOOD STUFF</div><h2>Find your first “I made this.”</h2><p>Short, practical courses that turn curious into capable.</p></div><button className="landing-text-link" onClick={onBrowse}>See all courses <ArrowRight size={15}/></button></div><div className="landing-course-grid">{courses.slice(0,3).map((course,index)=><button className="landing-course" key={course.id} onClick={onBrowse}><div className={`landing-course-art art-${course.color}`}><span className="landing-course-number">0{index+1}</span><div className="landing-course-glyph">{course.icon}</div><span className="landing-course-spark">✳</span></div><div className="landing-course-info"><div><span>{course.category}</span><span className="landing-level">{course.level}</span></div><h3>{course.title}</h3><p>{course.description}</p><div className="landing-course-foot"><span><BookOpen size={13}/>{course.lessons} lessons</span><span><Clock3 size={13}/>{course.duration}</span><ArrowRight size={15}/></div></div></button>)}</div></section>

    <section className="landing-paths-section" id="landing-paths"><div className="landing-paths-inner"><div className="landing-path-copy"><div className="landing-overline">NO GUESSING WHAT TO LEARN NEXT</div><h2>A little direction<br/>goes a long way.</h2><p>Follow a learning path made to take you from “where do I start?” to “look what I built.”</p><button className="landing-secondary" onClick={onEnter}>Explore learning paths <ArrowRight size={15}/></button></div><div className="landing-path-stack">{tracks.map((track,index)=><button key={track.name} className={`landing-path-item path-row-${index+1}`} onClick={onEnter}><span className={`landing-path-icon ${track.color}`}>{track.symbol}</span><span className="landing-path-details"><b>{track.name}</b><small>{track.detail}</small></span><span className="landing-path-count">{track.modules} courses</span><ArrowRight size={16}/></button>)}</div></div></section>

    <section className="landing-about" id="landing-about"><div className="about-art"><div className="about-card"><span className="about-spark">✳</span><small>REMEMBER</small><b>You don't have<br/>to know everything<br/>to get started.</b><span className="about-underline"/></div><div className="about-note">One step at a time <ArrowLeft size={14}/></div></div><div className="about-copy"><div className="landing-overline">LEARNING THAT FEELS HUMAN</div><h2>New to coding?<br/>You're in the right place.</h2><p>We believe everyone can learn to code. No experience required, no pressure to be perfect. Just clear lessons, supportive mentors, and space to figure things out.</p><div className="about-points"><div><span><Check size={13}/></span><b>Start from the beginning</b><small>No setup or experience needed</small></div><div><span><Check size={13}/></span><b>Learn by actually doing</b><small>Build projects as you learn</small></div><div><span><Check size={13}/></span><b>Go at your own pace</b><small>Your learning, on your time</small></div></div><button className="landing-text-link" onClick={onEnter}>Meet your learning space <ArrowRight size={15}/></button></div></section>

    <section className="landing-signup"><div className="signup-deco signup-deco-one">✳</div><div className="signup-deco signup-deco-two">{ '</>' }</div><div className="landing-overline">YOUR NEXT CHAPTER CAN START TODAY</div><h2>Ready when you are.</h2><p>Your first step doesn’t have to be a big one. Pick a course, open a lesson, and see where it takes you.</p><form className="signup-form" onSubmit={submitEmail}><label><span className="sr-only">Email address</span><input type="email" required placeholder="Your email address" value={email} onChange={event=>setEmail(event.target.value)}/></label><button type="submit">Get started <ArrowRight size={15}/></button></form>{message?<span className="signup-message"><Check size={14}/>{message}</span>:<span className="signup-note"><Check size={12}/> Monthly membership planned <i/> Learn at your own pace</span>}</section>

    <footer className="landing-footer"><div className="landing-footer-top"><div><Logo small onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}/><p>Learn to code. Build what you imagine.</p></div><div className="footer-links"><button onClick={onBrowse}>Courses</button><button onClick={()=>jumpTo('landing-paths')}>Learning paths</button><button onClick={()=>jumpTo('landing-about')}>About us</button><button onClick={onEnter}>Log in</button></div><button className="landing-footer-cta" onClick={onBrowse}>Explore courses <ArrowRight size={14}/></button></div><div className="landing-footer-bottom"><span>© 2026 TheMR Academy</span><span>Made for curious minds, everywhere. <span className="footer-heart">♥</span></span><span>Learn something new today <span className="footer-star">✳</span></span></div></footer>
  </main>;
}

function CoursesPage({ onHome, onEnter, onMyLearning, enrolledIds, onEnroll, isMonthlyMember, onSubscribe, isDarkMode, onToggleTheme }) {
  const [activeCategory, setActiveCategory] = useState('All courses');
  const [query, setQuery] = useState('');
  const [detailsId, setDetailsId] = useState(null);
  const [confirmation, setConfirmation] = useState('');
  const shownCourses = courses.filter(course =>
    (activeCategory === 'All courses' || course.category === activeCategory) &&
    `${course.title} ${course.category} ${course.description} ${course.level}`.toLowerCase().includes(query.toLowerCase())
  );
  const enroll = course => {
    if (!isMonthlyMember) {
      onSubscribe();
      setConfirmation('Monthly membership is activated in this preview. Choose a course below to add it to My Learning.');
      return;
    }
    onEnroll(course.id);
    setConfirmation(`You’re enrolled in ${course.title}. Your course is ready whenever you are.`);
  };

  return <main className="catalog-page">
    <header className="landing-header catalog-header">
      <Logo small onClick={onHome}/>
      <nav className="landing-nav catalog-nav"><button onClick={onHome}>Home</button><button className="catalog-nav-active">Courses</button><button onClick={onEnter}>Learning space</button></nav>
      <div className="landing-actions"><ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme}/><button className="login-link" onClick={onEnter}>Log in</button><button className="landing-cta" onClick={onMyLearning}>My learning <ArrowRight size={15}/></button></div>
    </header>

    <section className="catalog-hero"><div className="catalog-hero-copy"><div className="landing-eyebrow"><span/>YOUR NEXT STEP STARTS HERE</div><h1>Learn a skill.<br/><span>Make it yours.</span></h1><p>Pick a course, follow along, and build something you’re proud of. Every course is designed to help you learn by doing.</p><div className="catalog-hero-meta"><span><Check size={13}/> Beginner-friendly</span><i/><span><Check size={13}/> Learn at your pace</span><i/><span><Check size={13}/> Monthly membership</span></div></div><div className="catalog-hero-art"><div className="catalog-circle circle-one"/><div className="catalog-circle circle-two"/><div className="catalog-hero-chip"><GraduationCap size={18}/><span>YOUR LEARNING PATH</span></div><div className="catalog-step step-one"><b>01</b><span>Choose a course</span><Check size={14}/></div><div className="catalog-step step-two"><b>02</b><span>Learn by building</span><span className="step-play"><Play size={10} fill="currentColor"/></span></div><div className="catalog-step step-three"><b>03</b><span>See what you can do</span><Sparkles size={14}/></div><div className="catalog-path-line"/></div></section>

    <section className="catalog-content"><div className="catalog-heading"><div><div className="landing-overline">THE COURSE LIBRARY</div><h2>What would you like to learn?</h2><p>Start at the beginning or build on what you already know.</p></div><button className="catalog-my-learning" onClick={onMyLearning}><BookOpen size={15}/> My learning{enrolledIds.length > 0&&<b>{enrolledIds.length}</b>}</button></div>
      <div className={`catalog-membership ${isMonthlyMember?'catalog-member-active':''}`}><div className="membership-icon"><GraduationCap size={19}/></div><div><strong>{isMonthlyMember?'Monthly membership preview active':'One monthly membership, every course'}</strong><small>{isMonthlyMember?'Add courses to My Learning and keep your progress together.':'Monthly price to be set. Payment processing is not connected in this preview.'}</small></div><button onClick={()=>isMonthlyMember?onMyLearning():onSubscribe()}>{isMonthlyMember?<><Check size={13}/> Preview active</>:<>Join monthly plan <ArrowRight size={13}/></>}</button></div>
      {confirmation && <div className="enroll-confirmation"><span className="confirmation-check"><Check size={15}/></span><div><strong>{confirmation}</strong><small>Membership and enrollments are saved in this browser preview.</small></div><button onClick={onMyLearning}>Go to my learning <ArrowRight size={14}/></button><button className="confirmation-close" aria-label="Dismiss" onClick={()=>setConfirmation('')}><X size={15}/></button></div>}
      <div className="catalog-tools"><div className="catalog-categories">{categories.map((category,index)=><button key={category} className={activeCategory===category?'catalog-category-active':''} onClick={()=>setActiveCategory(category)}>{category}{index===0&&<span>{courses.length}</span>}</button>)}</div><label className="catalog-search"><Search size={16}/><input aria-label="Search courses" placeholder="Search the course library" value={query} onChange={event=>setQuery(event.target.value)}/>{query&&<button type="button" aria-label="Clear search" onClick={()=>setQuery('')}><X size={13}/></button>}</label></div>
      <div className="catalog-results"><span><b>{shownCourses.length}</b> courses</span><span>All courses include guided lessons and projects</span></div>
      {shownCourses.length ? <div className="catalog-grid">{shownCourses.map((course,index)=>{
        const isEnrolled = enrolledIds.includes(course.id) || course.progress > 0;
        const isExpanded = detailsId === course.id;
        return <article className={`catalog-course ${isExpanded?'catalog-course-expanded':''}`} key={course.id}>
          <div className={`catalog-course-art art-${course.color}`}><span className="catalog-course-index">COURSE 0{index+1}</span><div className="catalog-course-glyph">{course.icon}</div><div className="catalog-art-rings"/><span className="catalog-level-badge">{course.level}</span></div>
          <div className="catalog-course-body"><div className="catalog-course-meta"><span>{course.category}</span><span><Clock3 size={12}/>{course.duration}</span></div><h3>{course.title}</h3><p>{course.description}</p><div className="catalog-course-facts"><span><BookOpen size={13}/>{course.lessons} lessons</span><span className="catalog-fact-dot"/><span>Projects included</span></div>
            {isExpanded&&<div className="catalog-syllabus"><strong>WHAT YOU’LL LEARN</strong><ul><li>Get comfortable with the essential tools</li><li>Practice each skill with a guided project</li><li>Build something you can share</li></ul><div className="catalog-mentor"><span>{course.mentor.split(' ').map(part=>part[0]).join('')}</span><small>Learn with <b>{course.mentor}</b></small></div></div>}
            <div className="catalog-course-actions"><button className="details-toggle" onClick={()=>setDetailsId(isExpanded?null:course.id)}>{isExpanded?'Hide details':'Course details'}<ChevronDown size={14}/></button><button className={`enroll-button ${isEnrolled?'enrolled-button':''}`} onClick={()=>isEnrolled?onMyLearning():enroll(course)}>{isEnrolled?<><Check size={14}/> Go to My Learning</>:isMonthlyMember?<>Add to My Learning <ArrowRight size={14}/></>:<>Join monthly plan <ArrowRight size={14}/></>}</button></div>
          </div>
        </article>;
      })}</div> : <div className="catalog-empty"><div><Search size={20}/></div><h3>No courses match that search</h3><p>Try another keyword or choose a different category.</p><button onClick={()=>{setQuery('');setActiveCategory('All courses')}}>Show all courses</button></div>}
      <div className="catalog-bottom-note"><span><Lightbulb size={17}/></span><p><b>Not sure where to start?</b> HTML & CSS Foundations is a great first step for most new learners.</p><button onClick={()=>{setActiveCategory('Web development');window.scrollTo({top:400,behavior:'smooth'})}}>Explore beginner courses <ArrowRight size={14}/></button></div>
    </section>
    <footer className="catalog-footer"><Logo small onClick={onHome}/><span>Made for curious minds, everywhere.</span><span>© 2026 TheMR Academy</span><button onClick={onHome}>Back to home <ArrowRight size={13}/></button></footer>
  </main>;
}

createRoot(document.getElementById('root')).render(<App/>);
