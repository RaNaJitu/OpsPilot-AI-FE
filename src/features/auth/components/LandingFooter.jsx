import { Link } from "react-router-dom";
import { Mail, Rocket } from "lucide-react";

import OpsPilotIcon from "../../../components/common/OpsPilotIcon";
import config from "../../../config";

const SOCIAL = [
  {
    label: "X",
    href: "https://x.com/bravejeet",
    Icon: IconTwitter,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jitendrakumarrana/",
    Icon: IconLinkedin,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/brave_jeet_rana/",
    Icon: IconInstagram,
  },
  {
    label: "GitHub",
    href: "https://github.com/RaNaJitu",
    Icon: IconGithub,
  },
  {
    label: "Email",
    href: "mailto:jitendra.2609.jk@gmail.com",
    Icon: Mail,
  },
];

const TECH = [
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Redis",
  "Docker",
  "OpenAI",
];

/** Lucide-style brand marks (brand icons removed from lucide-react). */
function IconTwitter({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function IconLinkedin({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconInstagram({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function IconGithub({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function LandingFooter() {
  const year = new Date().getFullYear();
  const modelLabel = config.AI_MODEL || "OpenAI";
  const version = (config.APP_VERSION || "v1.0.0").replace(/^v/i, "");

  return (
    <footer
      className="relative z-10 mt-12 border-t md:mt-14"
      style={{
        backgroundColor: "#0B1220",
        borderColor: "#1E293B",
        color: "#94a3b8",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-14">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          {/* Brand */}
          <div className="max-w-lg">
            <div className="flex flex-wrap items-center gap-2.5">
              <OpsPilotIcon size={32} />
              <span className="text-lg font-bold tracking-tight text-white">
                Ops<span className="text-[#60a5fa]">Pilot</span>{" "}
                <span className="rounded bg-gradient-to-br from-[#2563eb] to-[#4f46e5] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  AI
                </span>
              </span>
              <span className="rounded border border-[#1E293B] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#64748b]">
                Beta
              </span>
              <span className="text-[10px] font-medium text-[#475569]">v{version}</span>
            </div>
            <p className="mt-2.5 text-sm font-semibold text-[#e2e8f0]">
              AI-powered SRE Platform
            </p>
            <p className="mt-2 text-sm leading-relaxed text-[#94a3b8]">
              Analyze production logs with AI, identify root causes,
              and generate recovery runbooks.
            </p>
            <p className="mt-2 text-xs text-[#64748b]">
              Built for modern DevOps & SRE teams.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              <Link
                to="/about"
                className="inline-flex text-sm font-semibold text-[#60a5fa] transition hover:opacity-90"
              >
                About
              </Link>
              <Link
                to="/pricing"
                className="inline-flex text-sm font-semibold text-[#60a5fa] transition hover:opacity-90"
              >
                Pricing
              </Link>
            </div>
          </div>

          {/* Social */}
          <div className="sm:text-right">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#64748b]">
              Connect
            </p>
            <ul className="mt-3.5 flex flex-wrap gap-2.5 sm:justify-end">
              {SOCIAL.map(({ label, href, Icon }) => (
                <li key={label} className="relative">
                  <a
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    aria-label={label}
                    className="group inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#1E293B] text-[#94a3b8] transition duration-200 hover:scale-110 hover:border-[#2563eb]/40 hover:text-[#60a5fa]"
                  >
                    <Icon size={18} />
                    <span
                      className="pointer-events-none absolute -bottom-7 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-[#1E293B] px-2 py-0.5 text-[10px] font-medium text-[#e2e8f0] opacity-0 transition duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                      role="tooltip"
                    >
                      {label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="mailto:jitendra.2609.jk@gmail.com"
              className="mt-4 inline-flex items-center gap-1.5 text-sm transition-colors duration-200 hover:text-[#60a5fa] sm:justify-end"
              style={{ color: "#94a3b8" }}
            >
              <Mail size={14} />
              jitendra.2609.jk@gmail.com
            </a>
          </div>
        </div>

        {/* Tech */}
        <div className="mt-10 border-t border-[#1E293B] pt-8">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-[#64748b]">
            Built With
          </p>
          <ul className="mt-3 flex flex-wrap items-center justify-center gap-2">
            {TECH.map((item) => (
              <li
                key={item}
                className="rounded-full border border-[#1E293B] px-3 py-1 text-xs font-medium text-[#94a3b8]"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Hackathon badge */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1E293B]/80 px-2.5 py-1 text-[10px] text-[#64748b]">
            <Rocket size={11} className="text-[#64748b]" aria-hidden="true" />
            <span>Hackathon 2026</span>
            <span className="text-[#334155]">·</span>
            <span>{modelLabel}</span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 border-t border-[#1E293B] pt-5 text-center text-xs text-[#64748b]">
          <p>Built with React · Node.js · PostgreSQL · Redis · OpenAI</p>
          <p className="mt-1.5 text-[#94a3b8]">
            © {year} {config.APP_NAME}
          </p>
        </div>
      </div>
    </footer>
  );
}
