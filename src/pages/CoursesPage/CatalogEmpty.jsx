import { Search } from "lucide-react";

export function CatalogEmpty({ onReset }) {
  return (
    <div className="catalog-empty">
      <div>
        <Search size={20} />
      </div>
      <h3>No courses match that search</h3>
      <p>Try another keyword or choose a different category.</p>
      <button onClick={onReset}>Show all courses</button>
    </div>
  );
}
