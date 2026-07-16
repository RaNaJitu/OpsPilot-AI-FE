export default function UserAvatar({ name = "User", avatarUrl, size = "md" }) {
  const sizeClass =
    size === "lg" ? "h-14 w-14 text-lg" : size === "xl" ? "h-28 w-28 text-3xl" : "h-8 w-8 text-xs";

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className={`${sizeClass} rounded-full object-cover ring-1`}
        style={{ boxShadow: "0 0 0 1px var(--app-border)" }}
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <span
      className={`flex ${sizeClass} items-center justify-center rounded-full font-semibold`}
      style={{
        backgroundColor: "var(--app-toggle-bg)",
        color: "var(--app-brand)",
      }}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
