import { ArrowRight, BookOpen, Clock3 } from "lucide-react";
import { courses } from "../../data/catalog.js";

const FEATURED_COURSES = courses.slice(0, 3);

export function LandingCourses({ onBrowse }) {
  return (
    <section className="landing-section landing-courses" id="landing-courses">
      <div className="landing-section-head">
        <div>
          <div className="landing-overline">START WITH THE GOOD STUFF</div>
          <h2>Find your first “I made this.”</h2>
          <p>Short, practical courses that turn curious into capable.</p>
        </div>
        <button className="landing-text-link" onClick={onBrowse}>
          See all courses <ArrowRight size={15} />
        </button>
      </div>

      <div className="landing-course-grid">
        {FEATURED_COURSES.map((course, index) => (
          <button className="landing-course" key={course.id} onClick={onBrowse}>
            <div className={`landing-course-art art-${course.color}`}>
              <span className="landing-course-number">0{index + 1}</span>
              <div className="landing-course-glyph">{course.icon}</div>
              <span className="landing-course-spark">✳</span>
            </div>
            <div className="landing-course-info">
              <div>
                <span>{course.category}</span>
                <span className="landing-level">{course.level}</span>
              </div>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="landing-course-foot">
                <span>
                  <BookOpen size={13} />
                  {course.lessons} lessons
                </span>
                <span>
                  <Clock3 size={13} />
                  {course.duration}
                </span>
                <ArrowRight size={15} />
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
