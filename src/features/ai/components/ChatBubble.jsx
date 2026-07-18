import { Bot, User } from "lucide-react";

export default function ChatBubble({ role, message }) {
  const isUser = role === "USER";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <span
        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
        style={{
          backgroundColor: isUser
            ? "color-mix(in srgb, var(--app-brand) 14%, transparent)"
            : "color-mix(in srgb, var(--app-brand-secondary) 14%, transparent)",
          color: isUser ? "var(--app-brand)" : "var(--app-brand-secondary)",
        }}
      >
        {isUser ? <User size={15} /> : <Bot size={15} />}
      </span>

      <div className={`max-w-[min(100%,36rem)] ${isUser ? "items-end" : "items-start"}`}>
        <p
          className="mb-1 text-[11px] font-semibold uppercase tracking-wide"
          style={{ color: "var(--app-text-muted)", textAlign: isUser ? "right" : "left" }}
        >
          {isUser ? "You" : "AI"}
        </p>
        <div
          className="rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap"
          style={{
            backgroundColor: isUser
              ? "color-mix(in srgb, var(--app-brand) 12%, transparent)"
              : "var(--app-nav-hover)",
            color: "var(--app-text)",
            borderTopRightRadius: isUser ? "0.35rem" : undefined,
            borderTopLeftRadius: isUser ? undefined : "0.35rem",
          }}
        >
          {message}
        </div>
      </div>
    </div>
  );
}
