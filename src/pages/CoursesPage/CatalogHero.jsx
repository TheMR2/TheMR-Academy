import { Check, GraduationCap, Play, Sparkles } from "lucide-react";

export function CatalogHero() {
  return (
    <section className="catalog-hero">
      <div className="catalog-hero-copy">
        <div className="landing-eyebrow">
          <span />
          YOUR NEXT STEP STARTS HERE
        </div>
        <h1>
          Learn a skill.
          <br />
          <span>Make it yours.</span>
        </h1>
        <p>
          Pick a course, follow along, and build something you’re proud of.
          Every course is designed to help you learn by doing.
        </p>
        <div className="catalog-hero-meta">
          <span>
            <Check size={13} /> Beginner-friendly
          </span>
          <i />
          <span>
            <Check size={13} /> Learn at your pace
          </span>
          <i />
          <span>
            <Check size={13} /> Monthly membership
          </span>
        </div>
      </div>

      <div className="catalog-hero-art">
        <div className="catalog-circle circle-one" />
        <div className="catalog-circle circle-two" />
        <div className="catalog-hero-chip">
          <GraduationCap size={18} />
          <span>YOUR LEARNING PATH</span>
        </div>
        <div className="catalog-step step-one">
          <b>01</b>
          <span>Choose a course</span>
          <Check size={14} />
        </div>
        <div className="catalog-step step-two">
          <b>02</b>
          <span>Learn by building</span>
          <span className="step-play">
            <Play size={10} fill="currentColor" />
          </span>
        </div>
        <div className="catalog-step step-three">
          <b>03</b>
          <span>See what you can do</span>
          <Sparkles size={14} />
        </div>
        <div className="catalog-path-line" />
      </div>
    </section>
  );
}
