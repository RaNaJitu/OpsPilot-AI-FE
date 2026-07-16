export default function Badge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-[#e07830] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white ${className}`}
    >
      {children}
    </span>
  );
}
