import { ArrowRight, Check } from "lucide-react";

export function PlanCard({ plan, isActive, isPaid, onChoose }) {
  const label = isActive
    ? "Current plan"
    : !isPaid
      ? plan.cta
      : plan.id === "free"
        ? "Switch to free"
        : `Switch to ${plan.name.toLowerCase()}`;

  return (
    <article
      className={`plan-card ${plan.tag ? "plan-card-featured" : ""} ${isActive ? "plan-card-active" : ""}`}
    >
      {plan.tag && <span className="plan-tag">{plan.tag}</span>}

      <div className="plan-name">{plan.name}</div>
      <div className="plan-price">
        <b>{plan.price}</b>
        <span>{plan.cadence}</span>
      </div>
      <p className="plan-tagline">{plan.tagline}</p>

      <ul className="plan-features">
        {plan.features.map((feature) => (
          <li key={feature}>
            <Check size={13} />
            {feature}
          </li>
        ))}
      </ul>

      <button
        className={`plan-cta ${isActive ? "plan-cta-current" : plan.id !== "free" ? "plan-cta-primary" : ""}`}
        disabled={isActive}
        onClick={() => onChoose(plan.id)}
      >
        {label}
        {!isActive && <ArrowRight size={14} />}
      </button>
    </article>
  );
}
