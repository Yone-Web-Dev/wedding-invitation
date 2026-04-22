interface GoldDividerProps {
  maxWidth?: number;
  className?: string;
  ornament?: string;
  full?: boolean;
}

export default function GoldDivider({
  maxWidth = 400,
  className = "",
  ornament,
  full = false,
}: GoldDividerProps) {
  if (ornament) {
    return (
      <div className={`gold-ornament ${className}`} style={{ maxWidth: maxWidth }}>
        <span
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "0.75rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--gold)",
          }}
        >
          {ornament}
        </span>
      </div>
    );
  }

  return (
    <hr
      className={`${full ? "gold-divider-full" : "gold-divider"} ${className}`}
      style={!full ? { maxWidth } : undefined}
    />
  );
}
