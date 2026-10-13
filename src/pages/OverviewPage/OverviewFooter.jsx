import { Logo } from "../../components/Logo/Logo.jsx";

export function OverviewFooter({ onHome }) {
  return (
    <footer className="footer">
      <Logo small onClick={onHome} />
      <span>Made for curious minds, everywhere.</span>
      <span>© 2026 TheMR Academy</span>
    </footer>
  );
}
