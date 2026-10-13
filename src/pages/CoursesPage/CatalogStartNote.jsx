import { ArrowRight, Lightbulb } from "lucide-react";

export function CatalogStartNote({ onSelectCategory }) {
  return (
    <div className="catalog-bottom-note">
      <span>
        <Lightbulb size={17} />
      </span>
      <p>
        <b>Not sure where to start?</b> HTML & CSS Foundations is a great first
        step for most new learners.
      </p>
      <button onClick={() => onSelectCategory("Web development")}>
        Explore beginner courses <ArrowRight size={14} />
      </button>
    </div>
  );
}
