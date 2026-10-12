import React, { useState } from 'react';
import { ArrowRight, Bookmark, BookOpen, Check, Clock3, Compass, GraduationCap, Search, Sparkles, Play, X } from 'lucide-react';
import { courses, categories } from '../../data/catalog.js';
import './DashboardLibrary.css';
import '../../membership.css';

export function DashboardLibrary({ mode, courses: listedCourses, savedIds, isMonthlyMember, activeCategory, setActiveCategory, query, setQuery, onSave, onDetails, onSubscribe, onEnroll, enrolledIds, onBrowse }) {
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
