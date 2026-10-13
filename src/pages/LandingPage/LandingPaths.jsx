import { ArrowRight } from "lucide-react";
import { tracks } from "../../data/catalog.js";

export function LandingPaths({ onEnter }) {
  return (
    <section className="landing-paths-section" id="landing-paths">
      <div className="landing-paths-inner">
        <div className="landing-path-copy">
          <div className="landing-overline">NO GUESSING WHAT TO LEARN NEXT</div>
          <h2>
            A little direction
            <br />
            goes a long way.
          </h2>
          <p>
            Follow a learning path made to take you from “where do I start?” to
            “look what I built.”
          </p>
          <button className="landing-secondary" onClick={onEnter}>
            Explore learning paths <ArrowRight size={15} />
          </button>
        </div>

        <div className="landing-path-stack">
          {tracks.map((track, index) => (
            <button
              key={track.name}
              className={`landing-path-item path-row-${index + 1}`}
              onClick={onEnter}
            >
              <span className={`landing-path-icon ${track.color}`}>
                {track.symbol}
              </span>
              <span className="landing-path-details">
                <b>{track.name}</b>
                <small>{track.detail}</small>
              </span>
              <span className="landing-path-count">
                {track.modules} courses
              </span>
              <ArrowRight size={16} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
