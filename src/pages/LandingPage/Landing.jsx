import { useState } from "react";
import { LandingHeader } from "./LandingHeader.jsx";
import { LandingHero } from "./LandingHero.jsx";
import { LandingTrustStrip } from "./LandingTrustStrip.jsx";
import { LandingCourses } from "./LandingCourses.jsx";
import { LandingPaths } from "./LandingPaths.jsx";
import { LandingAbout } from "./LandingAbout.jsx";
import { LandingSignup } from "./LandingSignup.jsx";
import { LandingFooter } from "./LandingFooter.jsx";
import "./LandingPage.css";
import "../../theme-art.css";

export function Landing({ onEnter, onBrowse, isDarkMode, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const jumpTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="landing-page">
      <LandingHeader
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((current) => !current)}
        onBrowse={onBrowse}
        onEnter={onEnter}
        onJump={jumpTo}
        isDarkMode={isDarkMode}
        onToggleTheme={onToggleTheme}
      />

      <LandingHero onBrowse={onBrowse} onJump={jumpTo} />

      <LandingTrustStrip />

      <LandingCourses onBrowse={onBrowse} />

      <LandingPaths onEnter={onEnter} />

      <LandingAbout onEnter={onEnter} />

      <LandingSignup />

      <LandingFooter onBrowse={onBrowse} onEnter={onEnter} onJump={jumpTo} />
    </main>
  );
}
