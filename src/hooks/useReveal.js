import { useEffect } from "react";

const REVEAL_SELECTOR =
  "section, .footer, .landing-footer, .catalog-footer, .settings-confirm";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function useReveal(ref, deps = []) {
  useEffect(() => {
    const root = ref.current;
    if (
      !root ||
      typeof IntersectionObserver === "undefined" ||
      prefersReducedMotion()
    ) {
      return undefined;
    }

    const targets = Array.from(root.querySelectorAll(REVEAL_SELECTOR)).filter(
      (el) =>
        !el.classList.contains("will-reveal") &&
        !el.classList.contains("revealed"),
    );

    const belowFold = targets.filter(
      (el) => el.getBoundingClientRect().top > window.innerHeight * 0.92,
    );
    belowFold.forEach((el) => el.classList.add("will-reveal"));

    const order = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const parent = el.parentElement;
          const index = order.get(parent) ?? 0;
          order.set(parent, index + 1);
          el.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
          el.classList.add("revealed");
          observer.unobserve(el);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -36px 0px" },
    );

    belowFold.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
