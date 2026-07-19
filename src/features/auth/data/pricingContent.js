/**
 * Static pricing content for the Pricing page.
 */

export const PRICING_COPY = {
  heroTitle: "Simple, transparent pricing",
  heroLead:
    "Start free with core AI incident workflows. Upgrade when your team needs higher limits, collaboration, and priority analysis.",
  heroNote: "Hackathon preview pricing — no credit card required to explore.",
  billingHint: "All plans include AI analysis, runbooks, and the incident assistant.",
  ctaTitle: "Ready to reduce MTTR?",
  ctaBody: "Explore OpsPilot AI free, or talk to us about team rollout.",
};

export const PRICING_PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Perfect for individuals exploring AI-powered incident response.",
    ctaLabel: "Get Started",
    ctaTo: "/#get-started",
    featured: false,
    features: [
      "Up to 10 incident uploads / month",
      "AI root-cause analysis",
      "Incident assistant chat",
      "Basic runbook generation",
      "Dashboard analytics",
      "Community support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$29",
    period: "/ month",
    description: "For engineers who want faster investigations with higher limits.",
    ctaLabel: "Start Pro",
    ctaTo: "/#get-started",
    featured: true,
    badge: "Most popular",
    features: [
      "Up to 100 incident uploads / month",
      "Priority AI analysis",
      "Full runbook + PDF export",
      "Unlimited assistant conversations",
      "Incident history & search",
      "Email support",
    ],
  },
  {
    id: "team",
    name: "Team",
    price: "$99",
    period: "/ month",
    description: "Built for SRE and platform teams collaborating on incidents.",
    ctaLabel: "Contact Sales",
    ctaHref: "mailto:jitendra.2609.jk@gmail.com?subject=OpsPilot%20Team%20Plan",
    featured: false,
    features: [
      "Unlimited incident uploads",
      "Shared team workspace",
      "Advanced analytics",
      "Priority model access",
      "SSO-ready roadmap",
      "Priority support",
    ],
  },
];

export const PRICING_FAQ = [
  {
    id: "free",
    question: "Is the Starter plan really free?",
    answer:
      "Yes. Starter is free forever with monthly upload limits so you can evaluate OpsPilot AI without a card.",
  },
  {
    id: "limits",
    question: "What counts as an incident upload?",
    answer:
      "Each production log file you upload for AI analysis counts as one incident toward your plan limit.",
  },
  {
    id: "upgrade",
    question: "Can I change plans later?",
    answer:
      "Yes. Start on Starter and move to Pro or Team when your investigation volume grows.",
  },
  {
    id: "hackathon",
    question: "Is this production billing?",
    answer:
      "This is preview pricing for demos and evaluation. Contact us for custom team or enterprise terms.",
  },
];

export const PRICING_TRUST = [
  "AI-powered analysis",
  "Cookie-based secure auth",
  "Exportable runbooks",
  "Built for SRE workflows",
];
