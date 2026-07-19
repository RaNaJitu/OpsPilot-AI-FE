/**
 * Static content for the About page.
 * Add more founders/team members to FOUNDERS when needed.
 */

export const FOUNDERS = [
  {
    id: "jeet",
    name: "Jitendra Kumar Rana",
    role: "FOUNDER & BACKEND ENGINEER",
    image:
      "https://res.cloudinary.com/dfb4o9hed/image/upload/v1784483835/jitendra_iznwbp.jpg",
    initials: "JK",
    bio: "I built OpsPilot AI to help engineering teams investigate production incidents faster by combining AI-powered log analysis, conversational investigation, and automated recovery runbooks into a single workflow.",
    socials: {
      x: "https://x.com/bravejeet",
      linkedin: "https://www.linkedin.com/in/jitendrakumarrana/",
      github: "https://github.com/RaNaJitu",
      instagram: "https://www.instagram.com/brave_jeet_rana/",
      email: "mailto:jitendra.2609.jk@gmail.com",
    },
  },
];

export const ABOUT_COPY = {
  heroTitle: "About OpsPilot AI",
  heroLabel: "AI-powered Incident Response Platform",
  heroSubtitle: "AI-powered Incident Intelligence for Modern Engineering Teams",
  heroIntro: "Transform production logs into actionable insights.",
  heroDescription:
    "OpsPilot AI helps engineering teams analyze production logs, identify root causes, generate AI-powered recovery runbooks, and reduce incident resolution time — all from a single platform.",
  heroBadge: "Built for DevOps • SRE • Platform Engineering",
  whatWeDo:
    "Upload a production log, run AI analysis, investigate with a context-aware assistant, and export recovery runbooks — all in one workflow designed for real incident response.",
  missionTitle: "Our Mission",
  mission:
    "To help engineering teams investigate production incidents faster using AI-powered analysis, conversational investigation, and automated recovery runbooks.",
  whyTitle: "Why OpsPilot AI?",
  whyLead:
    "Modern production systems generate millions of log entries every day.",
  whyBody:
    "OpsPilot AI reduces investigation time by transforming logs into actionable AI-powered insights — so teams spend less time searching and more time resolving.",
  ctaTitle: "Let's Connect",
  ctaBody:
    "Interested in OpsPilot AI? Explore the platform, check the code, or reach out — happy to talk about reliability and AI tooling.",
};

export const HERO_STATS = [
  { id: "faster", icon: "Zap", label: "Faster Investigation", value: "70%" },
  { id: "ai", icon: "Brain", label: "AI Powered Analysis", value: "GPT-4o" },
  { id: "runbooks", icon: "FileText", label: "Automated Runbooks", value: "PDF Export" },
  { id: "stack", icon: "Wrench", label: "Built With", value: "React + Node.js" },
];

export const HERO_CHIPS = ["AI Analysis", "Assistant", "Runbooks"];

export const TRUSTED_TECH = ["React", "Node.js", "PostgreSQL", "OpenAI"];

export const HERO_WORKFLOW = [
  "Production Logs",
  "AI Analysis",
  "Root Cause",
  "Recovery Runbook",
];

/** icon keys map to Lucide components in AboutPage */
export const VALUE_CARDS = [
  {
    id: "faster",
    icon: "Zap",
    title: "Faster Resolution",
    description: "Reduce MTTR using AI insights grounded in your logs.",
  },
  {
    id: "ai",
    icon: "Brain",
    title: "AI Investigation",
    description: "Understand incidents in seconds with clear root-cause context.",
  },
  {
    id: "runbooks",
    icon: "BookOpen",
    title: "Automated Runbooks",
    description: "Recover systems consistently with generated recovery steps.",
  },
];

export const WORKFLOW_STEPS = [
  { id: "upload", label: "Upload Log", icon: "FileUp" },
  { id: "analysis", label: "AI Analysis", icon: "Sparkles" },
  { id: "root", label: "Root Cause", icon: "Search" },
  { id: "runbook", label: "Runbook", icon: "BookOpen" },
  { id: "assistant", label: "AI Assistant", icon: "MessageSquare" },
];

export const IMPACT_STATS = [
  { id: "features", value: "5+", label: "Core Features" },
  { id: "incidents", value: "100+", label: "Demo Incidents" },
  { id: "tech", value: "7", label: "Technologies" },
  { id: "ai", value: "AI", label: "Powered Analysis" },
];

export const FEATURE_CHIPS = [
  "AI Analysis",
  "Incident Assistant",
  "Runbooks",
  "PDF Export",
  "Dashboard Analytics",
];

export const TECH_STACK = [
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Redis",
  "OpenAI",
  "Docker",
];

/** Ordered for visitor journey: primary explore → code → demo → contact */
export const CTA_ACTIONS = [
  {
    id: "explore",
    label: "Explore Platform",
    to: "/#get-started",
    external: false,
    primary: true,
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/RaNaJitu",
    external: true,
  },
  {
    id: "demo",
    label: "View Demo",
    to: "/#how-it-works",
    external: false,
  },
  {
    id: "contact",
    label: "Contact",
    href: "mailto:jitendra.2609.jk@gmail.com",
    external: true,
  },
];

/** @deprecated Use FOUNDERS — kept so older imports don't break. */
export const LEADERSHIP = FOUNDERS;
