import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Tier-specific and general-purpose badge colour variants.
 *
 * Tier colours follow common community conventions:
 * - **S** - Gold / legendary
 * - **A** - Red / high-tier
 * - **B** - Cyan / mid-tier
 * - **C** - Lime green / serviceable
 * - **D** - Zinc / low-tier
 */
const variants = {
  /** General-purpose badge using the primary lime-green. */
  default: "border-[#84CC16]/40 bg-[#84CC16]/15 text-[#84CC16]",
  /** Secondary cyan badge. */
  secondary: "border-[#22D3EE]/40 bg-[#22D3EE]/15 text-[#22D3EE]",
  /** Accent orange badge for CTAs or warnings. */
  accent: "border-[#F97316]/40 bg-[#F97316]/15 text-[#F97316]",
  /** Outline-only badge. */
  outline: "border-[#3F3F46] bg-transparent text-[#A1A1AA]",
  /** S-tier: gold / legendary. */
  "tier-s": "border-[#FACC15]/40 bg-[#FACC15]/15 text-[#FACC15]",
  /** A-tier: red / high-tier. */
  "tier-a": "border-[#EF4444]/40 bg-[#EF4444]/15 text-[#EF4444]",
  /** B-tier: cyan / mid-tier. */
  "tier-b": "border-[#22D3EE]/40 bg-[#22D3EE]/15 text-[#22D3EE]",
  /** C-tier: lime green / serviceable. */
  "tier-c": "border-[#84CC16]/40 bg-[#84CC16]/15 text-[#84CC16]",
  /** D-tier: zinc / low-tier. */
  "tier-d": "border-[#71717A]/40 bg-[#71717A]/15 text-[#A1A1AA]",
} as const;

/** Props accepted by the {@link Badge} component. */
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual style variant. @default "default" */
  variant?: keyof typeof variants;
}

/**
 * Small label badge for tier rankings (S/A/B/C/D) and general tags.
 *
 * Renders a styled `<span>` with a tinted background, matching border,
 * and coloured text based on the chosen variant.
 *
 * @example
 * ```tsx
 * <Badge variant="tier-s">S</Badge>
 * <Badge variant="accent">NEW</Badge>
 * <Badge>SMG</Badge>
 * ```
 */
const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5",
        "text-xs font-semibold uppercase tracking-wider",
        "transition-colors duration-150",
        variants[variant],
        className,
      )}
      {...props}
    />
  ),
);
Badge.displayName = "Badge";

export { Badge };
