import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";

// ---------------------------------------------------------------------------
// Variant definitions
// ---------------------------------------------------------------------------

type Variant = "default" | "gold";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Visual style variant. @default "default" */
  variant?: Variant;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", style, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const border =
      variant === "gold"
        ? "1px solid rgba(212,192,144,0.25)"
        : "1px solid var(--border-card)";

    const baseStyle: CSSProperties = {
      background: "var(--bg-card)",
      borderRadius: "20px",
      border,
      padding: "24px",
      transition: "all 300ms cubic-bezier(.4,0,.2,1)",
      ...style,
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      el.style.transform = "translateY(-2px)";
      el.style.boxShadow = "var(--shadow-glow-lavender)";
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      el.style.transform = "";
      el.style.boxShadow = "";
      onMouseLeave?.(e);
    };

    return (
      <div
        ref={ref}
        style={baseStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      />
    );
  },
);

Card.displayName = "Card";

// ---------------------------------------------------------------------------
// Sub-components (structural helpers)
// ---------------------------------------------------------------------------

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ style, ...props }, ref) => (
    <div
      ref={ref}
      style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px", ...style }}
      {...props}
    />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ style, ...props }, ref) => (
    <h3
      ref={ref}
      style={{
        margin: 0,
        fontFamily: "var(--lg-font-heading)",
        fontSize: "18px",
        fontWeight: 700,
        color: "var(--text-primary)",
        ...style,
      }}
      {...props}
    />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ style, ...props }, ref) => (
    <p
      ref={ref}
      style={{
        margin: 0,
        fontFamily: "var(--lg-font-body)",
        fontSize: "14px",
        color: "var(--text-muted)",
        ...style,
      }}
      {...props}
    />
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ style, ...props }, ref) => (
    <div ref={ref} style={{ ...style }} {...props} />
  ),
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ style, ...props }, ref) => (
    <div
      ref={ref}
      style={{ display: "flex", alignItems: "center", marginTop: "16px", ...style }}
      {...props}
    />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
