export const SUGGESTED_CHIPS = [
  {
    id: "root-cause",
    icon: "✨",
    label: "Root Cause",
    prompt: "What is the root cause of this incident?",
  },
  {
    id: "timeline",
    icon: "📈",
    label: "Timeline",
    prompt: "Show the timeline of this incident.",
  },
  {
    id: "runbook",
    icon: "📄",
    label: "Runbook",
    prompt: "Generate a recovery plan / runbook for this incident.",
  },
  {
    id: "prevention",
    icon: "🛡",
    label: "Prevention",
    prompt: "How can we prevent this from happening again?",
  },
  {
    id: "services",
    icon: "🖥",
    label: "Services",
    prompt: "Which services were affected?",
  },
  {
    id: "summary",
    icon: "📝",
    label: "Summary",
    prompt: "Summarize this incident clearly.",
  },
  {
    id: "fix",
    icon: "🔧",
    label: "Fix",
    prompt: "How can we fix this incident right now?",
  },
];

export const EMPTY_STATE_PROMPTS = [
  { icon: "✨", text: "What is the root cause?" },
  { icon: "🖥", text: "Which services were affected?" },
  { icon: "📄", text: "Generate a recovery plan." },
  { icon: "🛡", text: "How can we prevent this?" },
  { icon: "📝", text: "Summarize the incident." },
  { icon: "📈", text: "Show the timeline." },
];
