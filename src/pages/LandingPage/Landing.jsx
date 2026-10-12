import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Check, Clock3, Menu, Play, X } from 'lucide-react';
import { courses, tracks } from '../../data/catalog.js';
import { Logo } from '../../components/Logo/Logo.jsx';
import { ThemeToggle } from '../../components/ThemeToggle/ThemeToggle.jsx';
import './LandingPage.css';
import '../../theme-art.css';

export function Landing({ onEnter, onBrowse, isDarkMode, onToggleTheme }) {
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
