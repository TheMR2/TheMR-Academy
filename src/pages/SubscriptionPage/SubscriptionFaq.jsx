import { planFaqs } from "../../data/plans.js";

export function SubscriptionFaq() {
  return (
    <section className="subscription-faq">
      <div className="section-overline">GOOD TO KNOW</div>
      <h2>Questions, answered.</h2>
      <div className="faq-grid">
        {planFaqs.map((faq) => (
          <article key={faq.question} className="faq-card">
            <strong>{faq.question}</strong>
            <p>{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
