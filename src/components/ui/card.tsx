import { forwardRef, type CSSProperties, type HTMLAttributes } from "react";

<<<<<<< HEAD
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
=======
/**
 * Card container with a translucent celestial background and soft border.
 *
 * Compose with {@link CardHeader}, {@link CardTitle}, {@link CardDescription},
 * {@link CardContent}, and {@link CardFooter} for consistent structure.
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Wingman</CardTitle>
 *     <CardDescription>Heavy pistol</CardDescription>
 *   </CardHeader>
 *   <CardContent>Stats and details here.</CardContent>
 *   <CardFooter>Actions here.</CardFooter>
 * </Card>
 * ```
 */
const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "celestial-panel rounded-xl text-[#3D3158]",
        "transition-all duration-200 ease-out",
        "hover:border-[#7C6BA8]/45 hover:shadow-[0_20px_55px_rgba(80,64,120,0.16)]",
        className,
      )}
      {...props}
    />
  ),
>>>>>>> origin/main
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
<<<<<<< HEAD
      style={{
        margin: 0,
        fontFamily: "var(--lg-font-heading)",
        fontSize: "18px",
        fontWeight: 700,
        color: "var(--text-primary)",
        ...style,
      }}
=======
      className={cn(
        "text-lg font-bold tracking-wide text-[#3D3158]",
        className,
      )}
>>>>>>> origin/main
      {...props}
    />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ style, ...props }, ref) => (
    <p
      ref={ref}
<<<<<<< HEAD
      style={{
        margin: 0,
        fontFamily: "var(--lg-font-body)",
        fontSize: "14px",
        color: "var(--text-muted)",
        ...style,
      }}
=======
      className={cn("text-sm text-[#6E6385]", className)}
>>>>>>> origin/main
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
