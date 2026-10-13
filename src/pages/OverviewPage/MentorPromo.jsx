import { Lightbulb, Sparkles } from "lucide-react";

export function MentorPromo({ onEncourage }) {
  return (
    <section className="bottom-promo">
      <div className="promo-icon">
        <Lightbulb size={21} />
      </div>
      <div className="promo-copy">
        <span>A NOTE FROM YOUR MENTORS</span>
        <h3>Don't worry about getting it right. Just get started.</h3>
        <p>Every expert was once a beginner. You've got this.</p>
      </div>
      <button className="promo-link" onClick={onEncourage}>
        A little encouragement <Sparkles size={16} />
      </button>
      <div className="promo-decoration">✳</div>
    </section>
  );
}
