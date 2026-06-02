"use client";

import Link from "next/link";
import {
  forwardRef,
  useRef,
  type ButtonHTMLAttributes,
  type CSSProperties,
} from "react";

// ---------------------------------------------------------------------------
// Design tokens (inline — mirrors globals.css)
// ---------------------------------------------------------------------------

type Variant = "primary" | "secondary" | "accent" | "gold" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface VariantStyle {
  background: CSSProperties["background"];
  color: string;
  border?: string;
  glowColor: string;
}

const variantStyles: Record<Variant, VariantStyle> = {
  primary: {
    background: "#9B8BBF",
    color: "#ffffff",
    glowColor: "rgba(155,139,191,0.4)",
  },
  secondary: {
    background: "#C8D8F0",
    color: "#2D2448",
    glowColor: "rgba(200,216,240,0.5)",
  },
  accent: {
    background: "#E8D0E0",
    color: "#5E4D8A",
    glowColor: "rgba(232,208,224,0.5)",
  },
  gold: {
    background: "linear-gradient(135deg, #D4C090, #E8D8B0)",
    color: "#2D2448",
    glowColor: "rgba(212,192,144,0.45)",
  },
  outline: {
    background: "transparent",
    color: "#9B8BBF",
    border: "1.5px solid #C0B3DC",
    glowColor: "rgba(155,139,191,0.25)",
  },
  ghost: {
    background: "transparent",
    color: "#5E4D8A",
    glowColor: "rgba(155,139,191,0.15)",
  },
};

interface SizeStyle {
  height: string;
  padding: string;
  fontSize: string;
  borderRadius: string;
}

const sizeStyles: Record<Size, SizeStyle> = {
  sm: { height: "34px", padding: "0 16px", fontSize: "12px", borderRadius: "20px" },
  md: { height: "42px", padding: "0 24px", fontSize: "14px", borderRadius: "28px" },
  lg: { height: "50px", padding: "0 36px", fontSize: "16px", borderRadius: "28px" },
};

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant. @default "primary" */
  variant?: Variant;
  /** Size preset. @default "md" */
  size?: Size;
  /** Stretch to fill the parent's width. */
  fullWidth?: boolean;
  /** If provided, renders as a Next.js Link instead of a button. */
  href?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      href,
      style,
      onMouseEnter,
      onMouseLeave,
      onClick,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const innerRef = useRef<HTMLButtonElement>(null);
    const resolvedRef = (ref as React.RefObject<HTMLButtonElement>) ?? innerRef;

    const vs = variantStyles[variant];
    const ss = sizeStyles[size];

    // -------------------------------------------------------------------------
    // Hover state managed via plain DOM event handlers to avoid re-renders
    // -------------------------------------------------------------------------
    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      const el = e.currentTarget;
      el.style.filter = "brightness(1.08)";
      el.style.boxShadow = `0 4px 20px ${vs.glowColor}`;
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      const el = e.currentTarget;
      el.style.filter = "";
      el.style.boxShadow = "";
      onMouseLeave?.(e);
    };

    // -------------------------------------------------------------------------
    // Ripple
    // -------------------------------------------------------------------------
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = e.currentTarget;
      const rect = btn.getBoundingClientRect();
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      const ripple = document.createElement("span");
      ripple.className = "ripple"; // defined in globals.css
      ripple.style.width = ripple.style.height = `${diameter}px`;
      ripple.style.left = `${e.clientX - rect.left - radius}px`;
      ripple.style.top = `${e.clientY - rect.top - radius}px`;

      btn.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });

      onClick?.(e);
    };

    // -------------------------------------------------------------------------
    // Compose inline style
    // -------------------------------------------------------------------------
    const baseStyle: CSSProperties = {
      // layout
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      // sizing
      height: ss.height,
      padding: ss.padding,
      borderRadius: ss.borderRadius,
      // typography
      fontFamily: "var(--lg-font-body)",
      fontSize: ss.fontSize,
      fontWeight: 600,
      letterSpacing: "0.02em",
      whiteSpace: "nowrap",
      // colours
      background: vs.background,
      color: vs.color,
      border: vs.border ?? "none",
      // behaviour
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.55 : 1,
      userSelect: "none",
      // animation
      transition: "all 250ms cubic-bezier(.4,0,.2,1)",
      // width
      width: fullWidth ? "100%" : undefined,
      ...style,
    };

    if (href) {
      return (
        <Link
          href={href}
          style={baseStyle as React.CSSProperties}
          onMouseEnter={handleMouseEnter as unknown as React.MouseEventHandler<HTMLAnchorElement>}
          onMouseLeave={handleMouseLeave as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={resolvedRef}
        disabled={disabled}
        style={baseStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
