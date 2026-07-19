import { Link } from "react-router-dom";
import { Check, Shield } from "lucide-react";

import LandingFooter from "../components/LandingFooter";
import LandingNav from "../components/LandingNav";
import {
  PRICING_COPY,
  PRICING_FAQ,
  PRICING_PLANS,
  PRICING_TRUST,
} from "../data/pricingContent";

function PlanCta({ plan }) {
  const className = plan.featured
    ? "mt-8 inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
    : "mt-8 inline-flex w-full items-center justify-center rounded-lg border px-4 py-2.5 text-sm font-bold transition hover:bg-[var(--app-nav-hover)]";

  const style = plan.featured
    ? { backgroundColor: "var(--app-brand)" }
    : {
        borderColor: "var(--app-border)",
        color: "var(--app-text)",
        backgroundColor: "transparent",
      };

  if (plan.ctaHref) {
    return (
      <a href={plan.ctaHref} className={className} style={style}>
        {plan.ctaLabel}
      </a>
    );
  }

  return (
    <Link to={plan.ctaTo || "/#get-started"} className={className} style={style}>
      {plan.ctaLabel}
    </Link>
  );
}

function PricingCard({ plan }) {
  return (
    <article
      className={`relative flex h-full flex-col rounded-2xl border p-6 backdrop-blur-sm md:p-7 ${
        plan.featured ? "pricing-card--featured" : ""
      }`}
      style={{
        borderColor: plan.featured ? "var(--app-brand)" : "var(--app-border)",
        backgroundColor: plan.featured
          ? "color-mix(in srgb, var(--app-brand) 10%, var(--app-bg-elevated))"
          : "color-mix(in srgb, var(--app-bg-elevated) 78%, transparent)",
        boxShadow: plan.featured
          ? "0 0 0 1px color-mix(in srgb, var(--app-brand) 35%, transparent), 0 18px 40px color-mix(in srgb, var(--app-brand) 16%, transparent)"
          : "none",
      }}
    >
      {plan.badge ? (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white"
          style={{ backgroundColor: "var(--app-brand)" }}
        >
          {plan.badge}
        </span>
      ) : null}

      <div>
        <h2 className="text-lg font-bold" style={{ color: "var(--app-text)" }}>
          {plan.name}
        </h2>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--app-text-muted)" }}>
          {plan.description}
        </p>
      </div>

      <div className="mt-6 flex items-end gap-1">
        <span
          className="text-4xl font-bold tracking-tight md:text-5xl"
          style={{ color: "var(--app-text)" }}
        >
          {plan.price}
        </span>
        <span className="mb-1.5 text-sm font-medium" style={{ color: "var(--app-text-muted)" }}>
          {plan.period}
        </span>
      </div>

      <PlanCta plan={plan} />

      <ul className="mt-8 space-y-3 border-t pt-6" style={{ borderColor: "var(--app-border)" }}>
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm">
            <span
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
              style={{
                backgroundColor: "color-mix(in srgb, var(--app-success) 16%, transparent)",
                color: "var(--app-success)",
              }}
            >
              <Check size={13} strokeWidth={2.4} aria-hidden="true" />
            </span>
            <span style={{ color: "var(--app-text)" }}>{feature}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function PricingPage() {
  return (
    <div className="auth-shell relative min-h-screen" style={{ color: "var(--app-text)" }}>
      <div className="auth-shell__glow" aria-hidden="true" />
      <div className="auth-shell__grid" aria-hidden="true" />

      <LandingNav />

      <div className="relative z-10">
        {/* Hero */}
        <section className="about-hero border-b px-4 pt-20 md:pt-24" style={{ borderColor: "var(--app-border)" }}>
          <div className="mx-auto max-w-3xl py-14 text-center md:py-20">
            <p
              className="text-xs font-semibold uppercase tracking-[0.16em]"
              style={{ color: "var(--app-brand)" }}
            >
              Pricing
            </p>
            <h1
              className="mt-3 text-4xl font-bold tracking-tight md:text-5xl"
              style={{ color: "var(--app-text)" }}
            >
              {PRICING_COPY.heroTitle}
            </h1>
            <p
              className="mx-auto mt-5 max-w-2xl text-base leading-relaxed md:text-lg md:leading-8"
              style={{ color: "var(--app-text-muted)" }}
            >
              {PRICING_COPY.heroLead}
            </p>
            <p className="mt-4 text-sm font-medium" style={{ color: "var(--app-text-muted)" }}>
              {PRICING_COPY.heroNote}
            </p>
          </div>
        </section>

        {/* Plans */}
        <section className="px-4 py-14 md:px-6 md:py-20">
          <div className="mx-auto max-w-6xl">
            <p
              className="mb-10 text-center text-sm"
              style={{ color: "var(--app-text-muted)" }}
            >
              {PRICING_COPY.billingHint}
            </p>

            <div className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-5">
              {PRICING_PLANS.map((plan) => (
                <PricingCard key={plan.id} plan={plan} />
              ))}
            </div>

            <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {PRICING_TRUST.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 text-sm font-medium"
                  style={{ color: "var(--app-text-muted)" }}
                >
                  <Shield size={14} style={{ color: "var(--app-brand)" }} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section
          className="border-t px-4 py-14 md:px-6 md:py-20"
          style={{
            borderColor: "var(--app-border)",
            backgroundColor: "color-mix(in srgb, var(--app-bg-elevated) 45%, transparent)",
          }}
        >
          <div className="mx-auto max-w-3xl">
            <h2
              className="text-center text-3xl font-bold tracking-tight"
              style={{ color: "var(--app-text)" }}
            >
              Frequently asked questions
            </h2>
            <ul className="mt-10 space-y-4">
              {PRICING_FAQ.map((item) => (
                <li
                  key={item.id}
                  className="rounded-2xl border px-5 py-5 backdrop-blur-sm"
                  style={{
                    borderColor: "var(--app-border)",
                    backgroundColor:
                      "color-mix(in srgb, var(--app-bg-elevated) 72%, transparent)",
                  }}
                >
                  <h3 className="text-base font-semibold" style={{ color: "var(--app-text)" }}>
                    {item.question}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: "var(--app-text-muted)" }}
                  >
                    {item.answer}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Bottom CTA */}
        <section
          className="border-t px-4 py-16 text-center md:px-6 md:py-20"
          style={{ borderColor: "var(--app-border)" }}
        >
          <div className="mx-auto max-w-2xl">
            <h2
              className="text-3xl font-bold tracking-tight md:text-4xl"
              style={{ color: "var(--app-text)" }}
            >
              {PRICING_COPY.ctaTitle}
            </h2>
            <p className="mt-3 text-base md:text-lg" style={{ color: "var(--app-text-muted)" }}>
              {PRICING_COPY.ctaBody}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/#get-started"
                className="inline-flex rounded-md px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
                style={{ backgroundColor: "var(--app-brand)" }}
              >
                Explore Platform
              </Link>
              <Link
                to="/about"
                className="inline-flex rounded-md border-2 px-5 py-2.5 text-sm font-bold transition hover:bg-[var(--app-nav-hover)]"
                style={{ borderColor: "var(--app-border)", color: "var(--app-text)" }}
              >
                About OpsPilot
              </Link>
            </div>
          </div>
        </section>

        <LandingFooter />
      </div>
    </div>
  );
}
