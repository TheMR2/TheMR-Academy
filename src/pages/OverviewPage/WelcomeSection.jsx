import { Clock3, Zap } from "lucide-react";

export function WelcomeSection() {
  return (
    <section className="welcome-row">
      <div>
        <div className="eyebrow">
          <span className="online-dot" />
          YOUR LEARNING SPACE
        </div>
        <h1>
          Good morning, Mohamed <span className="wave">✳</span>
        </h1>
        <p className="welcome-subtitle">
          A little progress each day adds up to big results.
        </p>
      </div>

      <div className="welcome-stats">
        <div className="stat-card">
          <div className="stat-icon stat-mint">
            <Zap size={17} />
          </div>
          <div>
            <strong>5 days</strong>
            <small>Learning streak</small>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon stat-peach">
            <Clock3 size={17} />
          </div>
          <div>
            <strong>2.5 hrs</strong>
            <small>This week</small>
          </div>
        </div>
      </div>
    </section>
  );
}
