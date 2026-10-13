import { ArrowRight } from "lucide-react";
import { Logo } from "../../components/Logo/Logo.jsx";

export function LandingFooter({ onBrowse, onEnter, onJump }) {
  return (
    <footer className="landing-footer">
      <div className="landing-footer-top">
        <div>
          <Logo
            small
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
          <p>Learn to code. Build what you imagine.</p>
        </div>

        <div className="footer-links">
          <button onClick={onBrowse}>Courses</button>
          <button onClick={() => onJump("landing-paths")}>
            Learning paths
          </button>
          <button onClick={() => onJump("landing-about")}>About us</button>
          <button onClick={onEnter}>Log in</button>
        </div>

        <button className="landing-footer-cta" onClick={onBrowse}>
          Explore courses <ArrowRight size={14} />
        </button>
      </div>

      <div className="landing-footer-bottom">
        <span>© 2026 TheMR Academy</span>
        <span>
          Made for curious minds, everywhere.{" "}
          <span className="footer-heart">♥</span>
        </span>
        <span>
          Learn something new today <span className="footer-star">✳</span>
        </span>
      </div>
    </footer>
  );
}
