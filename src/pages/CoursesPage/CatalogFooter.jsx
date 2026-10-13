import { ArrowRight } from "lucide-react";
import { Logo } from "../../components/Logo/Logo.jsx";

export function CatalogFooter({ onHome }) {
  return (
    <footer className="catalog-footer">
      <Logo small onClick={onHome} />
      <span>Made for curious minds, everywhere.</span>
      <span>© 2026 TheMR Academy</span>
      <button onClick={onHome}>
        Back to home <ArrowRight size={13} />
      </button>
    </footer>
  );
}
