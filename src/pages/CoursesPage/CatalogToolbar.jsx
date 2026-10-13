import { Search, X } from "lucide-react";
import { categories, courses } from "../../data/catalog.js";

export function CatalogToolbar({
  activeCategory,
  onSelectCategory,
  query,
  onQueryChange,
}) {
  return (
    <div className="catalog-tools">
      <div className="catalog-categories">
        {categories.map((category, index) => (
          <button
            key={category}
            className={
              activeCategory === category ? "catalog-category-active" : ""
            }
            onClick={() => onSelectCategory(category)}
          >
            {category}
            {index === 0 && <span>{courses.length}</span>}
          </button>
        ))}
      </div>

      <label className="catalog-search">
        <Search size={16} />
        <input
          aria-label="Search courses"
          placeholder="Search the course library"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => onQueryChange("")}
          >
            <X size={13} />
          </button>
        )}
      </label>
    </div>
  );
}
