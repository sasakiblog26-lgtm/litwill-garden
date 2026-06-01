import type { CSSProperties } from "react";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  sub?: string;
  /** @default true */
  center?: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function SectionHeader({
  eyebrow,
  title,
  sub,
  center = true,
}: SectionHeaderProps) {
  const wrapperStyle: CSSProperties = {
    textAlign: center ? "center" : "left",
  };

  const eyebrowStyle: CSSProperties = {
    display: "block",
    fontFamily: "var(--lg-font-display)",
    fontStyle: "italic",
    fontWeight: 600,
    fontSize: "13px",
    color: "#9B8BBF",
    letterSpacing: "0.10em",
    marginBottom: "0",
  };

  const titleStyle: CSSProperties = {
    fontFamily: "var(--lg-font-heading)",
    fontWeight: 700,
    fontSize: "28px",
    color: "var(--text-primary)",
    letterSpacing: "0.03em",
    margin: "8px 0",
    lineHeight: 1.3,
  };

  const subStyle: CSSProperties = {
    fontFamily: "var(--lg-font-body)",
    fontWeight: 400,
    fontSize: "15px",
    color: "var(--text-secondary)",
    lineHeight: 1.8,
    marginTop: "0",
    marginBottom: "0",
  };

  return (
    <div style={wrapperStyle}>
      <span style={eyebrowStyle}>{eyebrow}</span>
      <h2 style={titleStyle}>{title}</h2>
      {sub && <p style={subStyle}>{sub}</p>}
    </div>
  );
}
