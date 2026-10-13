import { Search, X } from "lucide-react";
import { categories, courses } from "../../data/catalog.js";

export function LibraryToolbar({
  activeCategory,
  onSelectCategory,
  query,
  onQueryChange,
}) {
  return (
    <div className="library-toolbar">
      <div className="library-tabs">
        {categories.map((category, index) => (
          <button
            key={category}
            className={activeCategory === category ? "library-tab-active" : ""}
            onClick={() => onSelectCategory(category)}
          >
            {category}
            {index === 0 && <span>{courses.length}</span>}
          </button>
        ))}
      </div>

      <label className="library-search">
        <Search size={15} />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search courses"
          aria-label="Search courses"
        />
        {query && (
          <button aria-label="Clear search" onClick={() => onQueryChange("")}>
            <X size={13} />
          </button>
        )}
      </label>
    </div>
  );
}
