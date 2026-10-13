import { CreditCard } from "lucide-react";
import { plans } from "../../data/plans.js";
import { PlanStatusCard } from "./PlanStatusCard.jsx";
import { PlanCard } from "./PlanCard.jsx";
import { SubscriptionFaq } from "./SubscriptionFaq.jsx";
import "./SubscriptionPage.css";

export function SubscriptionPage({
  isMonthlyMember,
  plan,
  onChoosePlan,
  onExploreCourses,
}) {
  const activePlanId = isMonthlyMember ? plan : "free";

  return (
    <div className="subscription-page">
      <div className="dashboard-page-heading">
        <div>
          <div className="section-overline">MEMBERSHIP</div>
          <h1>One plan. Every course.</h1>
          <p>
            Pick the plan that fits how you learn — switch or cancel whenever
            you want.
          </p>
        </div>
        <button className="profile-edit-button" onClick={onExploreCourses}>
          <CreditCard size={14} /> Browse courses
        </button>
      </div>

      <PlanStatusCard isMonthlyMember={isMonthlyMember} plan={plan} />

      <div className="plans-grid" id="choose-plan">
        {plans.map((item) => (
          <PlanCard
            key={item.id}
            plan={item}
            isActive={item.id === activePlanId}
            isPaid={isMonthlyMember}
            onChoose={onChoosePlan}
          />
        ))}
      </div>

      <p className="plans-note">
        This is a preview — switching plans changes your access instantly and no
        payment is processed.
      </p>

      <SubscriptionFaq />
    </div>
  );
}
