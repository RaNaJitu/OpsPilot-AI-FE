/**
 * Clean illustrated avatar when no photo is provided.
 * To use a real photo: put it in public/founder.jpg and set image: "/founder.jpg" on the founder.
 */
export default function FounderAvatar({ name, initials, image, size = 176 }) {
  if (image) {
    return (
      <img
        src={image}
        alt={name}
        width={size}
        height={size}
        className="rounded-2xl object-cover shadow-lg"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-lg"
      style={{ width: size, height: size }}
      role="img"
      aria-label={name}
    >
      <svg width={size} height={size} viewBox="0 0 176 176" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="founderBg" x1="0" y1="0" x2="176" y2="176">
            <stop offset="0%" stopColor="#0d9488" />
            <stop offset="45%" stopColor="#1e3a5f" />
            <stop offset="100%" stopColor="#0b1220" />
          </linearGradient>
          <linearGradient id="founderGlow" x1="88" y1="20" x2="88" y2="160">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="176" height="176" fill="url(#founderBg)" />
        <circle cx="88" cy="40" r="56" fill="url(#founderGlow)" />
        {/* Soft geometric marks */}
        <path
          d="M20 140h136M40 152h96"
          stroke="#7dd3fc"
          strokeOpacity="0.25"
          strokeWidth="2"
        />
        <circle cx="140" cy="36" r="18" stroke="#facc15" strokeOpacity="0.35" strokeWidth="1.5" />
        <circle cx="36" cy="48" r="10" stroke="#5eead4" strokeOpacity="0.4" strokeWidth="1.5" />
        {/* Person silhouette */}
        <circle cx="88" cy="68" r="28" fill="#e2e8f0" fillOpacity="0.95" />
        <path
          d="M40 158c8-32 28-48 48-48s40 16 48 48"
          fill="#e2e8f0"
          fillOpacity="0.95"
        />
        {/* Initials badge */}
        <rect x="118" y="118" width="42" height="42" rx="12" fill="#0b1220" fillOpacity="0.55" />
        <text
          x="139"
          y="145"
          textAnchor="middle"
          fill="white"
          fontSize="14"
          fontWeight="700"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
        >
          {initials || "JK"}
        </text>
      </svg>
    </div>
  );
}
