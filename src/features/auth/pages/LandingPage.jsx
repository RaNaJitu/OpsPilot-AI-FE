import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Bot,
  Check,
  FileUp,
  LayoutDashboard,
  MessageSquare,
  Search,
  Sparkles,
  Wrench,
} from "lucide-react";

import Logo from "../../../components/common/Logo";
import ThemeToggle from "../../../components/common/ThemeToggle";
import Spinner from "../../../components/ui/Spinner";
import { appToast } from "../../../utils/toast";
import LandingFooter from "../components/LandingFooter";
import LandingHeroShot from "../components/LandingHeroShot";
import LandingPreviewStrip from "../components/LandingPreviewStrip";
import { googleLogin } from "../services/auth.service";

const TRUSTED = [
  "AI Analysis",
  "Incident Chat",
  "Runbook Generator",
  "Dashboard Analytics",
];

const BUILT_WITH = [
  "Node.js",
  "PostgreSQL",
  "Docker",
  "Redis",
  "OpenAI",
  "Google OAuth",
];

const STEPS = [
  { icon: FileUp, label: "Upload Logs" },
  { icon: Sparkles, label: "AI Analysis" },
  { icon: Search, label: "Investigate" },
  { icon: BookOpen, label: "Generate Runbook" },
  { icon: Wrench, label: "Resolve Incident" },
];

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI Incident Analysis",
    lines: ["Find root causes,", "timeline, evidence,", "and recommendations."],
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard Analytics",
    lines: ["Track incidents,", "severity, confidence,", "and trends."],
  },
  {
    icon: MessageSquare,
    title: "AI Assistant",
    lines: ["Chat about incidents", "with context-aware AI", "scoped to your analysis."],
  },
  {
    icon: BookOpen,
    title: "Runbook Generator",
    lines: ["Generate recovery", "steps, verification,", "and prevention automatically."],
  },
];

function GoogleSignInButton({
  buttonWidth,
  wrapRef,
  isSigningIn,
  onSuccess,
  onError,
  error,
}) {
  return (
    <div className="w-full max-w-[320px]">
      <div className="relative" ref={wrapRef}>
        <div
          className={isSigningIn ? "pointer-events-none opacity-40" : ""}
          aria-hidden={isSigningIn}
        >
          <GoogleLogin
            onSuccess={onSuccess}
            onError={onError}
            width={String(buttonWidth)}
            size="large"
            text="continue_with"
            shape="rectangular"
            theme="outline"
          />
        </div>
        {isSigningIn && (
          <div
            className="absolute inset-0 flex items-center justify-center rounded-lg"
            style={{
              backgroundColor: "color-mix(in srgb, var(--app-bg-elevated) 88%, transparent)",
            }}
            role="status"
            aria-live="polite"
          >
            <div
              className="inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: "var(--app-text)" }}
            >
              <Spinner size="sm" />
              Signing you in…
            </div>
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm" style={{ color: "var(--app-danger)" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const getStartedRef = useRef(null);
  const buttonWrapRef = useRef(null);
  const [buttonWidth, setButtonWidth] = useState(280);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const el = buttonWrapRef.current;
    if (!el) return;

    const updateWidth = () => {
      const width = Math.floor(el.getBoundingClientRect().width);
      if (width > 0) setButtonWidth(Math.min(Math.max(width, 240), 320));
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.location.hash === "#sign-in" || window.location.hash === "#get-started") {
      requestAnimationFrame(() => {
        getStartedRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  }, []);

  const scrollToGetStarted = () => {
    getStartedRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const scrollToDemo = () => {
    document.getElementById("how-it-works")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSuccess = async (response) => {
    if (isSigningIn) return;

    setIsSigningIn(true);
    setError("");

    try {
      await googleLogin(response.credential);
      appToast.success("Login successful");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error(err);
      setError("Sign-in failed. Please try again.");
      appToast.error("Login failed");
      setIsSigningIn(false);
    }
  };

  const googleError = () => {
    setError("Google sign-in was cancelled or failed.");
    setIsSigningIn(false);
  };

  return (
    <div className="auth-shell relative min-h-screen" style={{ color: "var(--app-text)" }}>
      <div className="auth-shell__glow" aria-hidden="true" />
      <div className="auth-shell__grid" aria-hidden="true" />

      <header className="landing-header fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
          <Logo to="/" size="md" />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={scrollToGetStarted}
              className="rounded-lg border px-3 py-2 text-sm font-semibold transition hover:opacity-90"
              style={{ borderColor: "var(--app-border)", color: "var(--app-text)" }}
            >
              Sign In
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-20 pt-20 md:px-6 md:pt-24">
        {/* Hero */}
        <section className="landing-hero grid items-center gap-10 pt-2 md:grid-cols-2 md:gap-12 md:pt-4 lg:gap-16">
          <div>
            <p
              className="text-sm font-semibold tracking-[0.14em] uppercase"
              style={{ color: "var(--app-brand)" }}
            >
              OpsPilot AI
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-[2.75rem] md:leading-[1.12]">
              AI-Powered
              <br />
              Incident Response
              <br />
              <span style={{ color: "var(--app-text-muted)" }}>
                for Modern Engineering Teams
              </span>
            </h1>
            <p
              className="mt-5 max-w-lg text-base leading-relaxed md:text-lg"
              style={{ color: "var(--app-text-muted)" }}
            >
              Analyze production logs with AI, identify root causes, chat with incident
              context, and generate recovery runbooks automatically.
            </p>

            <div
              id="get-started"
              ref={getStartedRef}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-start"
            >
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--app-text-muted)" }}>
                  Get Started
                </p>
                <GoogleSignInButton
                  buttonWidth={buttonWidth}
                  wrapRef={buttonWrapRef}
                  isSigningIn={isSigningIn}
                  onSuccess={handleSuccess}
                  onError={googleError}
                  error={error}
                />
              </div>
              <button
                type="button"
                onClick={scrollToDemo}
                className="mt-0 inline-flex h-[40px] items-center justify-center rounded-lg border-2 bg-transparent px-5 text-sm font-semibold transition hover:bg-[var(--app-nav-hover)] sm:mt-7"
                style={{
                  borderColor: "color-mix(in srgb, var(--app-brand) 45%, var(--app-border))",
                  color: "var(--app-brand)",
                }}
              >
                Watch Demo
              </button>
            </div>

            <div className="mt-8">
              <p
                className="text-[11px] font-semibold uppercase tracking-wide"
                style={{ color: "var(--app-text-muted)" }}
              >
                Trusted workflow
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                {TRUSTED.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-1.5 text-sm font-medium"
                  >
                    <Check size={14} style={{ color: "var(--app-success)" }} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="landing-hero-visual relative">
            <div
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] opacity-70"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 40%, color-mix(in srgb, var(--app-brand) 22%, transparent), transparent 65%)",
              }}
              aria-hidden="true"
            />
            <LandingHeroShot />
          </div>
        </section>

        {/* Built with */}
        <section className="landing-trust mt-12 border-t pt-8 md:mt-14" style={{ borderColor: "var(--app-border)" }}>
          <p
            className="text-center text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: "var(--app-text-muted)" }}
          >
            Built With
          </p>
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {BUILT_WITH.map((tech) => (
              <li
                key={tech}
                className="rounded-full border px-3.5 py-1.5 text-xs font-semibold sm:text-sm"
                style={{
                  borderColor: "var(--app-border)",
                  backgroundColor: "color-mix(in srgb, var(--app-bg-elevated) 80%, transparent)",
                  color: "var(--app-text)",
                }}
              >
                {tech}
              </li>
            ))}
          </ul>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="landing-steps mt-12 border-t pt-9 md:mt-14"
          style={{ borderColor: "var(--app-border)" }}
        >
          <h2 className="text-center text-2xl font-semibold tracking-tight">How it works</h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm" style={{ color: "var(--app-text-muted)" }}>
            From raw logs to resolved incidents — one continuous AI workflow.
          </p>

          <ol className="mt-8 grid gap-4 sm:grid-cols-5">
            {STEPS.map(({ icon: Icon, label }, index) => (
              <li key={label} className="relative flex flex-col items-center text-center">
                {index < STEPS.length - 1 && (
                  <span
                    className="pointer-events-none absolute left-[calc(50%+28px)] top-7 hidden h-px w-[calc(100%-28px)] sm:block"
                    style={{ backgroundColor: "var(--app-border)" }}
                    aria-hidden="true"
                  />
                )}
                <span
                  className="relative z-[1] flex h-14 w-14 items-center justify-center rounded-2xl border"
                  style={{
                    borderColor: "color-mix(in srgb, var(--app-brand) 30%, var(--app-border))",
                    backgroundColor: "color-mix(in srgb, var(--app-brand) 10%, var(--app-bg-elevated))",
                    color: "var(--app-brand)",
                  }}
                >
                  <Icon size={22} />
                </span>
                <span className="mt-3 text-sm font-semibold">{label}</span>
                <span className="mt-1 text-[11px] font-medium sm:hidden" style={{ color: "var(--app-text-muted)" }}>
                  Step {index + 1}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* Features */}
        <section className="landing-features mt-12 border-t pt-9 md:mt-14" style={{ borderColor: "var(--app-border)" }}>
          <h2 className="text-center text-2xl font-semibold tracking-tight">What you get</h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm" style={{ color: "var(--app-text-muted)" }}>
            Every surface is built around AI analysis — not bolted on later.
          </p>

          <ul className="mt-8 grid gap-7 sm:grid-cols-2 lg:gap-x-12 lg:gap-y-8">
            {FEATURES.map(({ icon: Icon, title, lines }) => (
              <li
                key={title}
                className="border-t pt-5"
                style={{ borderColor: "var(--app-border)" }}
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl border"
                  style={{
                    borderColor: "color-mix(in srgb, var(--app-brand) 30%, var(--app-border))",
                    backgroundColor: "color-mix(in srgb, var(--app-brand) 10%, var(--app-bg-elevated))",
                    color: "var(--app-brand)",
                  }}
                >
                  <Icon size={20} />
                </span>
                <h3 className="mt-3 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--app-text-muted)" }}>
                  {lines.map((line, i) => (
                    <span key={line}>
                      {line}
                      {i < lines.length - 1 ? <br /> : null}
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Product screens */}
        <section
          id="see-the-product"
          className="landing-previews mt-12 border-t pt-9 md:mt-14"
          style={{ borderColor: "var(--app-border)" }}
        >
          <h2 className="text-center text-2xl font-semibold tracking-tight">See the product</h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm" style={{ color: "var(--app-text-muted)" }}>
            Dashboard, Incident Assistant, and incident details — ready for demos.
          </p>
          <div className="mt-8">
            <LandingPreviewStrip />
          </div>
        </section>

        {/* Compact CTA */}
        <section
          className="landing-cta mt-12 rounded-2xl border px-6 py-8 text-center md:mt-14 md:px-10"
          style={{
            borderColor: "color-mix(in srgb, var(--app-brand) 28%, var(--app-border))",
            backgroundColor: "color-mix(in srgb, var(--app-brand) 7%, var(--app-bg-elevated))",
          }}
        >
          <div className="mx-auto flex max-w-md flex-col items-center">
            <Bot size={28} style={{ color: "var(--app-brand)" }} />
            <h2 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">
              Ready to investigate faster?
            </h2>
            <p className="mt-2 text-sm" style={{ color: "var(--app-text-muted)" }}>
              Sign in with Google and open your dashboard in seconds.
            </p>
            <button
              type="button"
              onClick={scrollToGetStarted}
              className="mt-6 inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: "var(--app-brand)" }}
            >
              Get Started
            </button>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
