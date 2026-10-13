import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "../../components/Logo/Logo.jsx";
import { ThemeToggle } from "../../components/ThemeToggle/ThemeToggle.jsx";

export function LandingHeader({
  menuOpen,
  onToggleMenu,
  onBrowse,
  onEnter,
  onJump,
  isDarkMode,
  onToggleTheme,
}) {
  return (
    <header className="landing-header">
      <Logo
        small
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />

      <nav className={`landing-nav ${menuOpen ? "landing-nav-open" : ""}`}>
        <button onClick={onBrowse}>Courses</button>
        <button onClick={() => onJump("landing-paths")}>Learning paths</button>
        <button onClick={() => onJump("landing-about")}>Why TheMR</button>
      </nav>

      <div className="landing-actions">
        <ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
        <button className="login-link" onClick={onEnter}>
          Log in
        </button>
        <button className="landing-cta" onClick={onEnter}>
          Start learning <ArrowRight size={15} />
        </button>
      </div>

      <button
        className="landing-menu-toggle"
        aria-label="Open navigation"
        onClick={onToggleMenu}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </header>
  );
}
