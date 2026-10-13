import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function LandingSignup() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submitEmail = (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    setMessage("You’re on the list! Your first lesson is waiting.");
    setEmail("");
  };

  return (
    <section className="landing-signup">
      <div className="signup-deco signup-deco-one">✳</div>
      <div className="signup-deco signup-deco-two">{"</>"}</div>

      <div className="landing-overline">YOUR NEXT CHAPTER CAN START TODAY</div>
      <h2>Ready when you are.</h2>
      <p>
        Your first step doesn’t have to be a big one. Pick a course, open a
        lesson, and see where it takes you.
      </p>

      <form className="signup-form" onSubmit={submitEmail}>
        <label>
          <span className="sr-only">Email address</span>
          <input
            type="email"
            required
            placeholder="Your email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <button type="submit">
          Get started <ArrowRight size={15} />
        </button>
      </form>

      {message ? (
        <span className="signup-message">
          <Check size={14} />
          {message}
        </span>
      ) : (
        <span className="signup-note">
          <Check size={12} /> Monthly membership planned <i /> Learn at your own
          pace
        </span>
      )}
    </section>
  );
}
