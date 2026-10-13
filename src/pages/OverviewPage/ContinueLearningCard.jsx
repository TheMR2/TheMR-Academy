import { ArrowRight, Check, Code2, Play } from "lucide-react";

export function ContinueLearningCard({
  course,
  doneLessons,
  totalLessons,
  nextLesson,
  onContinue,
}) {
  const percent = course.progress;
  const lessonNumber = String(Math.min(doneLessons + 1, totalLessons)).padStart(
    2,
    "0",
  );

  return (
    <section className="hero-card" id="continue-learning">
      <div className="hero-copy">
        <span className="hero-kicker">
          <span className="hero-kicker-dot" />
          PICK UP WHERE YOU LEFT OFF
        </span>
        <h2>
          You're building
          <br />
          something great.
        </h2>
        <p>
          Every line of code gets you closer to your goal. Keep learning{" "}
          {course.title}.
        </p>
        <button className="primary-button" onClick={onContinue}>
          Continue learning <ArrowRight size={16} />
        </button>
        <div className="hero-progress-meta">
          <span>YOUR PROGRESS</span>
          <b>
            {doneLessons} of {totalLessons} lessons
          </b>
          <span>{percent}%</span>
        </div>
        <div className="progress-track">
          <div style={{ width: `${percent}%` }} />
        </div>
      </div>

      <div
        className="hero-visual"
        aria-label="Illustration of code on a laptop"
      >
        <div className="visual-orbit orbit-one" />
        <div className="visual-orbit orbit-two" />

        <div className="floating-badge float-code">
          <Code2 size={16} />
          <span>Clean code</span>
        </div>
        <div className="floating-badge float-check">
          <span className="mini-check">
            <Check size={12} />
          </span>
          Nice work!
        </div>

        <div className="laptop">
          <div className="laptop-screen">
            <div className="screen-bar">
              <span />
              <span />
              <span />
              <i>index.html</i>
              <span className="screen-bar-lock">⌑</span>
            </div>
            <div className="code-lines">
              <div>
                <i>01</i>
                <span className="syntax-pink">&lt;section</span>{" "}
                <span className="syntax-blue">class</span>=
                <span className="syntax-green">"hero"</span>
                <span className="syntax-pink">&gt;</span>
              </div>
              <div>
                <i>02</i>
                <span className="indent" />
                <span className="syntax-pink">&lt;h1&gt;</span>
                <span>Make it yours.</span>
                <span className="syntax-pink">&lt;/h1&gt;</span>
              </div>
              <div>
                <i>03</i>
                <span className="indent" />
                <span className="syntax-pink">&lt;p&gt;</span>
                <span className="syntax-gray">Your ideas, online.</span>
                <span className="syntax-pink">&lt;/p&gt;</span>
              </div>
              <div>
                <i>04</i>
                <span className="syntax-pink">&lt;/section&gt;</span>
              </div>
              <div className="code-cursor" />
            </div>
          </div>
          <div className="laptop-base" />
        </div>

        <div className="visual-caption">
          <span>LESSON {lessonNumber}</span>
          <b>{nextLesson.title}</b>
          <span className="caption-play">
            <Play size={13} fill="currentColor" />
          </span>
        </div>
      </div>
    </section>
  );
}
