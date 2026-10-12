import React, { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Bell, BookOpen, Bookmark, Check, ChevronDown, ChevronRight, CircleHelp, Clock3, Code2, Compass, Flame, LayoutDashboard, Lightbulb, Menu, Play, Search, Settings, Sparkles, UserRound, X, Zap } from 'lucide-react';
import { courses, tracks, categories } from '../data/catalog.js';
import { Logo } from '../components/Logo/Logo.jsx';
import { ThemeToggle } from '../components/ThemeToggle/ThemeToggle.jsx';
import { DashboardLibrary } from '../pages/DashboardLibrary/DashboardLibrary.jsx';
import { ProfilePage } from '../pages/ProfilePage/ProfilePage.jsx';
import { Landing } from '../pages/LandingPage/Landing.jsx';
import { CoursesPage } from '../pages/CoursesPage/CoursesPage.jsx';
import './App.css';
import '../theme.css';

export default function App() {
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
