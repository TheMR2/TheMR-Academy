import { ArrowRight, ArrowUpRight, Check, Play } from "lucide-react";

export function LandingHero({ onBrowse, onJump }) {
  return (
    <section className="landing-hero">
      <div className="landing-hero-copy">
        <div className="landing-eyebrow">
          <span />A FRIENDLY PLACE TO LEARN TO CODE
        </div>
        <h1>
          Your ideas deserve
          <br />
          to be <span>built.</span>
        </h1>
        <p>
          Learn programming one small win at a time. Make real things, ask
          questions, and grow into the developer you want to be.
        </p>
        <div className="landing-hero-actions">
          <button className="landing-primary" onClick={onBrowse}>
            Explore courses <ArrowRight size={17} />
          </button>
          <button
            className="landing-secondary"
            onClick={() => onJump("landing-courses")}
          >
            <Play size={14} fill="currentColor" /> See what you can learn
          </button>
        </div>
        <div className="landing-social-proof">
          <div className="learner-avatars">
            <i>M</i>
            <i>A</i>
            <i>Y</i>
            <i>+</i>
          </div>
          <span>
            <strong>A good place to begin.</strong>
            <br />
            Built for curious minds at every level.
          </span>
        </div>
      </div>

      <div className="landing-hero-art">
        <div className="landing-sun" />
        <div className="hero-sticker sticker-top">
          <span>✳</span> Made for beginners
        </div>

        <div className="landing-window">
          <div className="landing-window-top">
            <div>
              <i />
              <i />
              <i />
            </div>
            <span>your-first-website.html</span>
            <ArrowUpRight size={13} />
          </div>
          <div className="landing-code">
            <div>
              <i>01</i>
              <span className="syntax-pink">&lt;h1&gt;</span>
              <span className="landing-code-text">Hello, world!</span>
              <span className="syntax-pink">&lt;/h1&gt;</span>
            </div>
            <div>
              <i>02</i>
              <span className="syntax-pink">&lt;p&gt;</span>
              <span className="syntax-gray">
                Your next chapter starts here.
              </span>
              <span className="syntax-pink">&lt;/p&gt;</span>
            </div>
            <div>
              <i>03</i>
              <span className="syntax-pink">&lt;button</span>{" "}
              <span className="syntax-blue">class</span>=
              <span className="syntax-green">"dream-big"</span>
              <span className="syntax-pink">&gt;</span>
            </div>
            <div>
              <i>04</i>
              <span className="indent" />
              <span className="landing-code-text">Build something.</span>
            </div>
            <div>
              <i>05</i>
              <span className="syntax-pink">&lt;/button&gt;</span>
            </div>
            <span className="landing-cursor" />
          </div>

          <div className="landing-preview">
            <div className="preview-label">YOUR FIRST PROJECT</div>
            <div className="preview-content">
              <span className="preview-sparkle">✳</span>
              <b>
                A little page
                <br />
                with big ideas.
              </b>
              <i>
                Keep building <ArrowRight size={11} />
              </i>
            </div>
          </div>
        </div>

        <div className="hero-sticker sticker-bottom">
          <span>
            <Check size={13} />
          </span>{" "}
          First line of code: done
        </div>

        <div className="landing-hero-orbit orbit-a" />
        <div className="landing-hero-orbit orbit-b" />
      </div>
    </section>
  );
}
