import React, { useState } from 'react';
import { ArrowRight, BookOpen, Check, ChevronDown, Clock3, GraduationCap, Lightbulb, Play, Search, Sparkles, X } from 'lucide-react';
import { courses, categories } from '../../data/catalog.js';
import { Logo } from '../../components/Logo/Logo.jsx';
import { ThemeToggle } from '../../components/ThemeToggle/ThemeToggle.jsx';
import './CoursesPage.css';
import '../../membership.css';

export function CoursesPage({ onHome, onEnter, onMyLearning, enrolledIds, onEnroll, isMonthlyMember, onSubscribe, isDarkMode, onToggleTheme }) {
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
