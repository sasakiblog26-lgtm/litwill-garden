import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";

// ---------------------------------------------------------------------------
// Variant definitions
// ---------------------------------------------------------------------------

type Variant = "lavender" | "crystal" | "moonstone" | "rose" | "gold" | "outline";

interface VariantStyle {
  background: string;
  color: string;
  border: string;
}

const variantStyles: Record<Variant, VariantStyle> = {
  lavender: {
    background: "rgba(155,139,191,0.12)",
    color: "#7B6AA8",
    border: "1px solid rgba(155,139,191,0.25)",
  },
  crystal: {
    background: "rgba(200,184,224,0.12)",
    color: "#574882",
    border: "1px solid rgba(200,184,224,0.25)",
  },
  moonstone: {
    background: "rgba(200,216,240,0.15)",
    color: "#2D2448",
    border: "1px solid rgba(200,216,240,0.30)",
  },
  rose: {
    background: "rgba(232,208,224,0.15)",
    color: "#5E4D8A",
    border: "1px solid rgba(232,208,224,0.30)",
  },
  gold: {
    background: "rgba(212,192,144,0.15)",
    color: "#7B6040",
    border: "1px solid rgba(212,192,144,0.30)",
  },
  outline: {
    background: "transparent",
    color: "#9B8BBF",
    border: "1px solid #C0B3DC",
  },
};

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual style variant. @default "lavender" */
  variant?: Variant;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "lavender", style, ...props }, ref) => {
    const vs = variantStyles[variant];

    const baseStyle: CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      borderRadius: "9999px",
      padding: "4px 12px",
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "0.04em",
      fontFamily: "var(--lg-font-body)",
      background: vs.background,
      color: vs.color,
      border: vs.border,
      transition: "opacity 150ms ease",
      ...style,
    };

    return <span ref={ref} style={baseStyle} {...props} />;
  },
);

Badge.displayName = "Badge";

export { Badge };
