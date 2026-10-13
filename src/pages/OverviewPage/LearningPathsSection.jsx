import { ArrowRight, ArrowUpRight, BookOpen, Clock3 } from "lucide-react";
import { tracks } from "../../data/catalog.js";

const TRACK_CATEGORIES = ["All courses", "Python", "Design"];

export function LearningPathsSection({ onSelectTrack, onExploreAll }) {
  return (
    <section className="learning-paths" id="paths">
      <div className="section-heading">
        <div>
          <div className="section-overline">A CLEAR WAY FORWARD</div>
          <h2>Choose your learning path</h2>
          <p>Follow a guided path and build skills that open doors.</p>
        </div>
        <button className="text-button" onClick={onExploreAll}>
          Explore all paths <ArrowRight size={16} />
        </button>
      </div>

      <div className="tracks-grid">
        {tracks.map((track, index) => (
          <button
            key={track.name}
            className={`track-card ${track.color}`}
            onClick={() => onSelectTrack(TRACK_CATEGORIES[index])}
          >
            <div className="track-top">
              <span className="track-badge">{track.label}</span>
              <span className="track-arrow">
                <ArrowUpRight size={17} />
              </span>
            </div>
            <div className="track-lower">
              <div className="track-text">
                <h3>{track.name}</h3>
                <p>{track.detail}</p>
                <div className="track-meta">
                  <span>
                    <BookOpen size={13} />
                    {track.modules} courses
                  </span>
                  <span>
                    <Clock3 size={13} />
                    {track.time}
                  </span>
                </div>
              </div>
              <div className="track-symbol">{track.symbol}</div>
            </div>
            <div className="track-decoration" />
          </button>
        ))}
      </div>
    </section>
  );
}
