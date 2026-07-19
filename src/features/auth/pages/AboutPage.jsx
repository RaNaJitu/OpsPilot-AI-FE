import { Link } from "react-router-dom";
import {
  ArrowDown,
  BookOpen,
  Brain,
  FileText,
  FileUp,
  MessageSquare,
  Search,
  Sparkles,
  Wrench,
  Zap,
} from "lucide-react";

import FounderAvatar from "../components/FounderAvatar";
import LandingFooter from "../components/LandingFooter";
import LandingNav from "../components/LandingNav";
import {
  ABOUT_COPY,
  CTA_ACTIONS,
  FEATURE_CHIPS,
  FOUNDERS,
  HERO_CHIPS,
  HERO_STATS,
  HERO_WORKFLOW,
  IMPACT_STATS,
  TECH_STACK,
  TRUSTED_TECH,
  VALUE_CARDS,
  WORKFLOW_STEPS,
} from "../data/aboutContent";

const LUCIDE_ICONS = {
  Zap,
  Brain,
  BookOpen,
  FileUp,
  FileText,
  Sparkles,
  Search,
  MessageSquare,
  Wrench,
};

function IconX({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

function IconLinkedin({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1-.004-4.124 2.062 2.062 0 0 1 .004 4.124zM7.119 20.452H3.555V9h3.564v11.452z" />
    </svg>
  );
}

function IconGithub({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function FounderSocial({ socials }) {
  if (!socials) return null;
  const links = [
    socials.x && { label: "X", href: socials.x, Icon: IconX },
    socials.linkedin && { label: "LinkedIn", href: socials.linkedin, Icon: IconLinkedin },
    socials.github && { label: "GitHub", href: socials.github, Icon: IconGithub },
  ].filter(Boolean);

  return (
    <ul className="flex items-center gap-3">
      {links.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="about-social-link inline-flex h-11 w-11 items-center justify-center rounded-full border transition duration-200 ease-out"
            style={{
              borderColor: "var(--app-border)",
              color: "var(--app-text-muted)",
              backgroundColor: "var(--app-bg)",
            }}
          >
            <Icon size={18} />
          </a>
        </li>
      ))}
    </ul>
  );
}

function FounderCard({ person }) {
  return (
    <article className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
      <div className="mx-auto shrink-0 sm:mx-0">
        <FounderAvatar
          name={person.name}
          initials={person.initials}
          image={person.image}
          size={176}
        />
      </div>

      <div className="min-w-0 flex-1 text-center sm:text-left">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3
              className="text-2xl font-bold tracking-tight md:text-[1.75rem]"
              style={{ color: "var(--app-text)" }}
            >
              {person.name}
            </h3>
            <p
              className="mt-1 text-xs font-bold uppercase tracking-[0.12em]"
              style={{ color: "var(--app-text-muted)" }}
            >
              {person.role}
            </p>
          </div>
          <FounderSocial socials={person.socials} />
        </div>
        <p
          className="mt-5 text-sm leading-relaxed md:text-[15px] md:leading-7"
          style={{ color: "var(--app-text-muted)" }}
        >
          {person.bio}
        </p>
      </div>
    </article>
  );
}

function SectionHeading({ eyebrow, title, centered = true }) {
  return (
    <div className={centered ? "text-center" : ""}>
      {eyebrow ? (
        <p
          className="text-xs font-semibold uppercase tracking-[0.16em]"
          style={{ color: "var(--app-brand)" }}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`text-3xl font-bold tracking-tight md:text-4xl ${eyebrow ? "mt-2" : ""}`}
        style={{ color: "var(--app-text)" }}
      >
        {title}
      </h2>
    </div>
  );
}

/** Visual division between About sections (border + optional tint). */
function AboutSection({ children, className = "", tint = false, id }) {
  return (
    <section
      id={id}
      className={`about-section border-t px-4 py-14 md:px-6 md:py-20 ${className}`}
      style={{
        borderColor: "var(--app-border)",
        backgroundColor: tint
          ? "color-mix(in srgb, var(--app-bg-elevated) 45%, transparent)"
          : "transparent",
      }}
    >
      {children}
    </section>
  );
}

function CtaButton({ action }) {
  const primaryStyle = {
    backgroundColor: "var(--app-brand)",
    color: "#ffffff",
  };
  const ghostStyle = {
    borderColor: "var(--app-border)",
    color: "var(--app-text)",
    backgroundColor: "transparent",
  };

  const className = action.primary
    ? "inline-flex rounded-md px-5 py-2.5 text-sm font-bold transition hover:opacity-90"
    : "inline-flex rounded-md border-2 px-5 py-2.5 text-sm font-bold transition hover:bg-[var(--app-nav-hover)]";

  if (action.external) {
    return (
      <a
        href={action.href}
        target={action.href?.startsWith("mailto:") ? undefined : "_blank"}
        rel={action.href?.startsWith("mailto:") ? undefined : "noopener noreferrer"}
        className={className}
        style={action.primary ? primaryStyle : ghostStyle}
      >
        {action.label}
      </a>
    );
  }

  return (
    <Link
      to={action.to}
      className={className}
      style={action.primary ? primaryStyle : ghostStyle}
    >
      {action.label}
    </Link>
  );
}

export default function AboutPage() {
  return (
    <div className="auth-shell relative min-h-screen" style={{ color: "var(--app-text)" }}>
      <div className="auth-shell__glow" aria-hidden="true" />
      <div className="auth-shell__grid" aria-hidden="true" />

      <LandingNav />

      <div className="relative z-10">
        {/* Hero — Stripe-style, landing shell background */}
        <section className="about-hero relative overflow-hidden border-b px-4 pt-20 md:pt-24" style={{ borderColor: "var(--app-border)" }}>
          {/* Subtle workflow illustration */}
          <div
            className="pointer-events-none absolute inset-y-8 right-0 hidden w-[220px] flex-col items-center justify-center gap-1 opacity-[0.08] lg:flex xl:right-10 xl:w-[260px]"
            aria-hidden="true"
            style={{ color: "var(--app-text)" }}
          >
            {HERO_WORKFLOW.map((step, index) => (
              <div key={step} className="flex flex-col items-center">
                <span className="rounded-lg border px-3 py-2 text-xs font-semibold tracking-wide">
                  {step}
                </span>
                {index < HERO_WORKFLOW.length - 1 ? (
                  <ArrowDown size={14} className="my-1.5 opacity-80" />
                ) : null}
              </div>
            ))}
          </div>

          <div className="relative z-10 mx-auto max-w-3xl py-14 text-center md:max-w-4xl md:py-20">
            <p
              className="text-xs font-semibold uppercase tracking-[0.16em] md:text-[13px]"
              style={{ color: "var(--app-brand)" }}
            >
              {ABOUT_COPY.heroLabel}
            </p>

            <h1
              className="mt-3 text-4xl font-bold tracking-tight md:text-5xl lg:text-[3.25rem]"
              style={{ color: "var(--app-text)" }}
            >
              {ABOUT_COPY.heroTitle}
            </h1>

            <p
              className="mx-auto mt-4 max-w-2xl text-lg font-semibold leading-snug md:text-xl"
              style={{ color: "var(--app-text)" }}
            >
              {ABOUT_COPY.heroSubtitle}
            </p>

            <p
              className="mx-auto mt-3 max-w-xl text-base font-medium md:text-lg"
              style={{ color: "var(--app-brand)" }}
            >
              {ABOUT_COPY.heroIntro}
            </p>

            <p
              className="mx-auto mt-5 max-w-3xl text-base leading-relaxed md:text-lg md:leading-8"
              style={{ color: "var(--app-text-muted)" }}
            >
              {ABOUT_COPY.heroDescription}
            </p>

            <div
              className="mx-auto mt-8 inline-flex max-w-full items-center rounded-full border px-4 py-2 text-sm font-semibold"
              style={{
                borderColor: "var(--app-border)",
                color: "var(--app-text)",
                backgroundColor:
                  "color-mix(in srgb, var(--app-bg-elevated) 70%, transparent)",
              }}
            >
              {ABOUT_COPY.heroBadge}
            </div>


          </div>
        </section>

        <AboutSection id="what-we-do">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading eyebrow="What we do" title="Incident response, powered by AI" />
            <p
              className="mt-5 text-base leading-relaxed md:text-lg md:leading-8"
              style={{ color: "var(--app-text-muted)" }}
            >
              {ABOUT_COPY.whatWeDo}
            </p>
          </div>
        </AboutSection>

        <AboutSection id="why" tint>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading title={ABOUT_COPY.whyTitle} />
            <p
              className="mt-5 text-base font-medium leading-relaxed md:text-lg"
              style={{ color: "var(--app-text)" }}
            >
              {ABOUT_COPY.whyLead}
            </p>
            <p
              className="mt-4 text-base leading-relaxed md:text-lg md:leading-8"
              style={{ color: "var(--app-text-muted)" }}
            >
              {ABOUT_COPY.whyBody}
            </p>
          </div>
        </AboutSection>

        <AboutSection id="mission">
          <div className="mx-auto max-w-5xl">
            <SectionHeading title={ABOUT_COPY.missionTitle} />
            <p
              className="mx-auto mt-5 max-w-3xl text-center text-base leading-relaxed md:text-lg md:leading-8"
              style={{ color: "var(--app-text-muted)" }}
            >
              {ABOUT_COPY.mission}
            </p>

            <ul className="mt-12 grid gap-5 sm:grid-cols-3">
              {VALUE_CARDS.map((card) => {
                const Icon = LUCIDE_ICONS[card.icon] || Zap;
                return (
                  <li
                    key={card.id}
                    className="rounded-2xl border px-5 py-6 text-center backdrop-blur-sm"
                    style={{
                      backgroundColor:
                        "color-mix(in srgb, var(--app-bg-elevated) 72%, transparent)",
                      borderColor: "var(--app-border)",
                    }}
                  >
                    <span
                      className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor:
                          "color-mix(in srgb, var(--app-brand) 14%, transparent)",
                        color: "var(--app-brand)",
                      }}
                    >
                      <Icon size={22} strokeWidth={1.9} aria-hidden="true" />
                    </span>
                    <h3
                      className="mt-3 text-base font-semibold"
                      style={{ color: "var(--app-text)" }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="mt-2 text-sm leading-relaxed"
                      style={{ color: "var(--app-text-muted)" }}
                    >
                      {card.description}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </AboutSection>

        <AboutSection id="features" className="!py-12 md:!py-14" tint>
          <div className="mx-auto max-w-5xl text-center">
            <p
              className="text-xs font-semibold uppercase tracking-[0.16em]"
              style={{ color: "var(--app-text-muted)" }}
            >
              Features
            </p>
            <ul className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
              {FEATURE_CHIPS.map((item) => (
                <li
                  key={item}
                  className="rounded-full border px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
                  style={{
                    borderColor: "var(--app-border)",
                    color: "var(--app-text)",
                    backgroundColor:
                      "color-mix(in srgb, var(--app-bg-elevated) 72%, transparent)",
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </AboutSection>

        <AboutSection id="impact" className="!py-12 md:!py-14">
          <div className="mx-auto max-w-5xl">
            <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
              {IMPACT_STATS.map((stat) => (
                <li
                  key={stat.id}
                  className="rounded-2xl border px-4 py-5 text-center backdrop-blur-sm"
                  style={{
                    borderColor: "var(--app-border)",
                    backgroundColor:
                      "color-mix(in srgb, var(--app-bg-elevated) 72%, transparent)",
                  }}
                >
                  <p
                    className="text-2xl font-bold tracking-tight md:text-3xl"
                    style={{ color: "var(--app-brand)" }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="mt-1 text-xs font-semibold uppercase tracking-wide md:text-sm"
                    style={{ color: "var(--app-text-muted)" }}
                  >
                    {stat.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </AboutSection>

       

        <AboutSection id="founder">
          <div className="mx-auto max-w-4xl">
            <SectionHeading title="Who Built OpsPilot AI" />
            <ul className="mt-12 space-y-14 md:mt-14">
              {FOUNDERS.map((person) => (
                <li key={person.id}>
                  <FounderCard person={person} />
                </li>
              ))}
            </ul>
          </div>
        </AboutSection>

        <AboutSection id="technology">
          <div className="mx-auto max-w-5xl text-center">
            <SectionHeading eyebrow="Built with" title="Technology Stack" />
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {TECH_STACK.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border px-5 py-2.5 text-sm font-semibold backdrop-blur-sm"
                  style={{
                    borderColor: "var(--app-border)",
                    backgroundColor:
                      "color-mix(in srgb, var(--app-bg-elevated) 72%, transparent)",
                    color: "var(--app-text)",
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </AboutSection>

        <AboutSection id="connect" tint className="about-cta text-center">
          <div className="mx-auto max-w-2xl">
            <h2
              className="text-3xl font-bold tracking-tight md:text-4xl"
              style={{ color: "var(--app-text)" }}
            >
              {ABOUT_COPY.ctaTitle}
            </h2>
            <p
              className="mt-3 text-base md:text-lg"
              style={{ color: "var(--app-text-muted)" }}
            >
              {ABOUT_COPY.ctaBody}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {CTA_ACTIONS.map((action) => (
                <CtaButton key={action.id} action={action} />
              ))}
            </div>
          </div>
        </AboutSection>

        <LandingFooter />
      </div>
    </div>
  );
}
