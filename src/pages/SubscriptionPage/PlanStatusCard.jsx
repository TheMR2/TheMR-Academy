import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export function PlanStatusCard({ isMonthlyMember, plan }) {
  const planLabel =
    plan === "yearly" ? "Yearly membership" : "Monthly membership";
  const price = plan === "yearly" ? "$99 / year" : "$12 / month";

  return (
    <section
      className={`plan-status ${isMonthlyMember ? "plan-status-active" : ""}`}
    >
      <div className="plan-status-icon">
        {isMonthlyMember ? <Sparkles size={20} /> : <CheckCircle2 size={20} />}
      </div>

      <div className="plan-status-copy">
        <span>{isMonthlyMember ? "YOUR PLAN" : "YOUR CURRENT PLAN"}</span>
        <h2>{isMonthlyMember ? planLabel : "Free learner plan"}</h2>
        <p>
          {isMonthlyMember
            ? "Active in this preview · no payment processed. Switch or cancel anytime."
            : "You can browse everything and save courses — opening lessons needs a paid plan."}
        </p>
      </div>

      <div className="plan-status-price">
        <b>{isMonthlyMember ? price : "$0"}</b>
        <small>{isMonthlyMember ? "preview access" : "forever"}</small>
        <a href="#choose-plan">
          {isMonthlyMember ? "Change plan" : "See plans"}{" "}
          <ArrowRight size={12} />
        </a>
      </div>
    </section>
  );
}
