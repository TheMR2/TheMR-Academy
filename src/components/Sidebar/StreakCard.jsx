import { ArrowRight, Check, Flame } from "lucide-react";

const WEEK_DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const COMPLETED_DAYS = 4;
const TODAY_INDEX = 4;

export function StreakCard() {
  return (
    <div className="week-card">
      <div className="week-card-head">
        <span className="flame-icon">
          <Flame size={16} fill="currentColor" />
        </span>
        <strong>5 day streak</strong>
        <span className="streak-count">5/7</span>
      </div>

      <div className="week-days">
        {WEEK_DAYS.map((day, index) => (
          <div className="day-wrap" key={index}>
            <span
              className={`day-dot ${index < 5 ? "day-done" : ""} ${index === TODAY_INDEX ? "day-today" : ""}`}
            >
              {index < COMPLETED_DAYS ? <Check size={11} /> : day}
            </span>
            <small>{day}</small>
          </div>
        ))}
      </div>

      <div className="week-foot">
        Keep your momentum going <ArrowRight size={13} />
      </div>
    </div>
  );
}
