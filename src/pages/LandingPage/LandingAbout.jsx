import { ArrowLeft, ArrowRight, Check } from "lucide-react";

const ABOUT_POINTS = [
  {
    title: "Start from the beginning",
    detail: "No setup or experience needed",
  },
  {
    title: "Learn by actually doing",
    detail: "Build projects as you learn",
  },
  {
    title: "Go at your own pace",
    detail: "Your learning, on your time",
  },
];

export function LandingAbout({ onEnter }) {
  return (
    <section className="landing-about" id="landing-about">
      <div className="about-art">
        <div className="about-card">
          <span className="about-spark">✳</span>
          <small>REMEMBER</small>
          <b>
            You don't have
            <br />
            to know everything
            <br />
            to get started.
          </b>
          <span className="about-underline" />
        </div>
        <div className="about-note">
          One step at a time <ArrowLeft size={14} />
        </div>
      </div>

      <div className="about-copy">
        <div className="landing-overline">LEARNING THAT FEELS HUMAN</div>
        <h2>
          New to coding?
          <br />
          You're in the right place.
        </h2>
        <p>
          We believe everyone can learn to code. No experience required, no
          pressure to be perfect. Just clear lessons, supportive mentors, and
          space to figure things out.
        </p>

        <div className="about-points">
          {ABOUT_POINTS.map((point) => (
            <div key={point.title}>
              <span>
                <Check size={13} />
              </span>
              <b>{point.title}</b>
              <small>{point.detail}</small>
            </div>
          ))}
        </div>

        <button className="landing-text-link" onClick={onEnter}>
          Meet your learning space <ArrowRight size={15} />
        </button>
      </div>
    </section>
  );
}
