import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Bot,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";

import Logo from "../../../components/common/Logo";
import ThemeToggle from "../../../components/common/ThemeToggle";
import Spinner from "../../../components/ui/Spinner";
import config from "../../../config";
import { getProfile, googleLogin } from "../services/auth.service";

const FEATURES = [
  {
    icon: LayoutDashboard,
    title: "Dashboard Analytics",
    description: "Track incident trends, severity, and AI confidence at a glance.",
  },
  {
    icon: Sparkles,
    title: "AI Incident Analysis",
    description: "Turn raw logs into root cause, timeline, evidence, and recommendations.",
  },
  {
    icon: Bot,
    title: "AI Assistant",
    description: "Ask follow-up questions scoped to a completed incident analysis.",
  },
  {
    icon: BookOpen,
    title: "Runbook Generator",
    description: "Produce recovery steps, verification checks, and prevention actions.",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const signInRef = useRef(null);
  const buttonWrapRef = useRef(null);
  const [buttonWidth, setButtonWidth] = useState(360);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        await getProfile();
        if (!cancelled) navigate("/dashboard", { replace: true });
      } catch {
        if (!cancelled) setCheckingSession(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  useEffect(() => {
    const el = buttonWrapRef.current;
    if (!el || checkingSession) return;

    const updateWidth = () => {
      const width = Math.floor(el.getBoundingClientRect().width);
      if (width > 0) setButtonWidth(Math.min(width, 400));
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);
    return () => observer.disconnect();
  }, [checkingSession]);

  useEffect(() => {
    if (checkingSession) return;
    if (window.location.hash === "#sign-in") {
      requestAnimationFrame(() => {
        signInRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  }, [checkingSession]);

  const scrollToSignIn = () => {
    signInRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleSuccess = async (response) => {
    if (isSigningIn) return;

    setIsSigningIn(true);
    setError("");

    try {
      await googleLogin(response.credential);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error(err);
      setError("Sign-in failed. Please try again.");
      setIsSigningIn(false);
    }
  };

  if (checkingSession) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: "var(--app-bg)", color: "var(--app-text)" }}
      >
        <div className="inline-flex items-center gap-2 text-sm" style={{ color: "var(--app-text-muted)" }}>
          <Spinner size="sm" />
          Loading OpsPilot…
        </div>
      </div>
    );
  }

  return (
    <div className="auth-shell relative min-h-screen" style={{ color: "var(--app-text)" }}>
      <div className="auth-shell__glow" aria-hidden="true" />
      <div className="auth-shell__grid" aria-hidden="true" />

      <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-5 md:px-6">
        <Logo to="/" size="md" />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={scrollToSignIn}
            className="rounded-lg border px-3 py-2 text-sm font-semibold transition hover:opacity-90"
            style={{ borderColor: "var(--app-border)", color: "var(--app-text)" }}
          >
            Sign in
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-col px-4 pb-16 pt-8 md:px-6 md:pt-14">
        {/* Hero */}
        <section className="landing-hero mx-auto max-w-3xl text-center">
          <p
            className="text-sm font-semibold tracking-[0.18em] uppercase"
            style={{ color: "var(--app-brand)" }}
          >
            {config.APP_NAME}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl md:leading-tight">
            AI-Powered Incident Management Platform
          </h1>
          <p
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed md:text-lg"
            style={{ color: "var(--app-text-muted)" }}
          >
            Analyze logs, identify root causes, chat with AI, and generate automated runbooks.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={scrollToSignIn}
              className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ backgroundColor: "var(--app-brand)" }}
            >
              Get Started
            </button>
          </div>
        </section>

        {/* Features */}
        <section className="landing-features mt-16 border-t pt-12 md:mt-20" style={{ borderColor: "var(--app-border)" }}>
          <h2 className="text-center text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: "var(--app-text-muted)" }}>
            Features
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <li
                key={title}
                className="rounded-2xl border p-5 transition hover:border-[var(--app-brand)]"
                style={{
                  backgroundColor: "color-mix(in srgb, var(--app-bg-elevated) 88%, transparent)",
                  borderColor: "var(--app-border)",
                }}
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--app-brand) 12%, transparent)",
                    color: "var(--app-brand)",
                  }}
                >
                  <Icon size={18} />
                </span>
                <h3 className="mt-4 text-base font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--app-text-muted)" }}>
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Sign in */}
        <section
          id="sign-in"
          ref={signInRef}
          className="landing-signin mt-16 border-t pt-12 md:mt-20"
          style={{ borderColor: "var(--app-border)" }}
        >
          <div
            className="mx-auto max-w-md rounded-2xl border p-6 shadow-xl sm:p-8"
            style={{
              backgroundColor: "var(--app-bg-elevated)",
              borderColor: "var(--app-border)",
            }}
          >
            <h2 className="text-center text-xl font-semibold tracking-tight">
              Sign in to continue
            </h2>
            <p className="mt-2 text-center text-sm" style={{ color: "var(--app-text-muted)" }}>
              After login, you’ll land on your dashboard.
            </p>

            <div className="relative mt-6" ref={buttonWrapRef}>
              <div
                className={isSigningIn ? "pointer-events-none opacity-40" : ""}
                aria-hidden={isSigningIn}
              >
                <GoogleLogin
                  onSuccess={handleSuccess}
                  onError={() => {
                    setError("Google sign-in was cancelled or failed.");
                    setIsSigningIn(false);
                  }}
                  width={String(buttonWidth)}
                  size="large"
                  text="signin_with"
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
              <p className="mt-3 text-center text-sm" style={{ color: "var(--app-danger)" }}>
                {error}
              </p>
            )}

            <p className="mt-4 text-center text-xs" style={{ color: "var(--app-text-muted)" }}>
              Secure authentication powered by Google OAuth 2.0
            </p>
          </div>
        </section>
      </main>

      <footer
        className="relative z-10 px-4 pb-8 text-center text-xs"
        style={{ color: "var(--app-text-muted)" }}
      >
        <p>
          © {new Date().getFullYear()} {config.APP_NAME}
        </p>
        <p className="mt-1 opacity-80">Built for modern engineering teams</p>
      </footer>
    </div>
  );
}
