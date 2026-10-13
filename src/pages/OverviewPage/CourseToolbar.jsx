import { Search } from "lucide-react";
import { categories, courses } from "../../data/catalog.js";

export function CourseToolbar({
  activeCategory,
  onSelectCategory,
  query,
  onQueryChange,
}) {
  return (
    <div className="course-toolbar">
      <div className="category-tabs">
        {categories.map((category, index) => (
          <button
            key={category}
            className={activeCategory === category ? "category-active" : ""}
            onClick={() => onSelectCategory(category)}
          >
            {category}
            {index === 0 && <span>{courses.length}</span>}
          </button>
        ))}
      </div>

      <label className="search-box">
        <Search size={16} />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search courses"
          aria-label="Search courses"
        />
        <kbd>⌘ K</kbd>
      </label>
    </div>
  );
}
