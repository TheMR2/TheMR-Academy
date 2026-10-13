import { ArrowRight } from "lucide-react";
import { Logo } from "../../components/Logo/Logo.jsx";
import { ThemeToggle } from "../../components/ThemeToggle/ThemeToggle.jsx";

export function CatalogHeader({
  onHome,
  onEnter,
  onMyLearning,
  isDarkMode,
  onToggleTheme,
}) {
  return (
    <header className="landing-header catalog-header">
      <Logo small onClick={onHome} />

      <nav className="landing-nav catalog-nav">
        <button onClick={onHome}>Home</button>
        <button className="catalog-nav-active">Courses</button>
        <button onClick={onEnter}>Learning space</button>
      </nav>

      <div className="landing-actions">
        <ThemeToggle isDarkMode={isDarkMode} onToggle={onToggleTheme} />
        <button className="login-link" onClick={onEnter}>
          Log in
        </button>
        <button className="landing-cta" onClick={onMyLearning}>
          My learning <ArrowRight size={15} />
        </button>
      </div>
    </header>
  );
}
