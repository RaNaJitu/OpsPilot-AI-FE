import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Spinner from "../../../components/ui/Spinner";
import { googleLogin } from "../services/auth.service";

export default function LoginPage() {
  const navigate = useNavigate();
  const buttonWrapRef = useRef(null);
  const [buttonWidth, setButtonWidth] = useState(400);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const el = buttonWrapRef.current;
    if (!el) return;

    const updateWidth = () => {
      const width = Math.floor(el.getBoundingClientRect().width);
      if (width > 0) setButtonWidth(width);
    };

    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSuccess = async (response) => {
    if (isSigningIn) return;

    setIsSigningIn(true);
    setError("");

    try {
      await googleLogin(response.credential);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Sign-in failed. Please try again.");
      setIsSigningIn(false);
    }
  };

  return (
    <div
      className="rounded-2xl border p-8 shadow-xl sm:p-10"
      style={{
        backgroundColor: "var(--app-bg-elevated)",
        borderColor: "var(--app-border)",
      }}
    >
      <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
      <p
        className="mt-3 whitespace-pre-line text-sm leading-relaxed sm:text-base"
        style={{ color: "var(--app-text-muted)" }}
      >
        {`Sign in to analyze production incidents,
identify root causes, and reduce MTTR with AI.`}
      </p>

      <div className="relative mt-8" ref={buttonWrapRef}>
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
            style={{ backgroundColor: "color-mix(in srgb, var(--app-bg-elevated) 88%, transparent)" }}
            role="status"
            aria-live="polite"
          >
            <div className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: "var(--app-text)" }}>
              <Spinner size="sm" />
              Signing you in...
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-3 text-sm" style={{ color: "var(--app-danger)" }}>
          {error}
        </p>
      )}

      <p
        className="mt-4 text-center text-xs leading-relaxed"
        style={{ color: "var(--app-text-muted)" }}
      >
        Secure authentication powered by Google OAuth 2.0
      </p>
    </div>
  );
}
