export const plans = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    cadence: "forever",
    tagline: "Look around, save what you like.",
    features: [
      "Browse the full course catalog",
      "Save courses for later",
      "See syllabuses and mentors",
      "Progress tracking on open courses",
    ],
    cta: "Stay on free",
  },
  {
    id: "monthly",
    name: "Monthly",
    price: "$12",
    cadence: "per month",
    tag: "MOST POPULAR",
    tagline: "Everything, one month at a time.",
    features: [
      "Every course, every lesson",
      "New courses included",
      "Lesson files and transcripts",
      "Cancel anytime",
    ],
    cta: "Choose monthly",
  },
  {
    id: "yearly",
    name: "Yearly",
    price: "$99",
    cadence: "per year",
    tag: "SAVE 30%",
    tagline: "Two months free, all year long.",
    features: [
      "Everything in Monthly",
      "Two months free",
      "Priority mentor Q&A",
      "Early access to new tracks",
    ],
    cta: "Choose yearly",
  },
];

export const planFaqs = [
  {
    question: "Is payment connected?",
    answer:
      "Not yet — this preview switches access instantly so you can try every state of the app. No card is ever charged.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes. Move between monthly and yearly, or drop back to free, whenever you like from this page.",
  },
  {
    question: "What happens to my progress?",
    answer:
      "Your courses, saved list, and lesson progress stay exactly where they are — on every plan.",
  },
  {
    question: "What do I keep on the free plan?",
    answer:
      "Everything you already have. Opening new courses and lessons just needs an active paid plan.",
  },
];
