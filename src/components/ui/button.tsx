import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Button variant style definitions.
 *
 * - `default` - Primary lavender button with a soft glow.
 * - `secondary` - Misty blue button for secondary actions.
 * - `accent` - Rose quartz CTA button for high-emphasis actions.
 * - `outline` - Transparent button with a border, fills on hover.
 * - `ghost` - Minimal button with no border, subtle hover background.
 */
const variants = {
  default:
    "bg-[#7C6BA8] text-white shadow-[0_10px_28px_rgba(124,107,168,0.22)] hover:bg-[#6D5D99] hover:shadow-[0_14px_36px_rgba(124,107,168,0.32)]",
  secondary:
    "bg-[#86A8D8] text-white shadow-[0_10px_28px_rgba(134,168,216,0.22)] hover:bg-[#7397CB] hover:shadow-[0_14px_36px_rgba(134,168,216,0.32)]",
  accent:
    "bg-[#C99AC1] text-white shadow-[0_10px_28px_rgba(201,154,193,0.22)] hover:bg-[#B885AE] hover:shadow-[0_14px_36px_rgba(201,154,193,0.32)]",
  outline:
    "border border-[#7C6BA8]/45 text-[#514673] bg-white/38 hover:bg-white/70 hover:border-[#7C6BA8] hover:shadow-[0_12px_30px_rgba(124,107,168,0.16)]",
  ghost:
    "bg-transparent text-[#514673] hover:bg-white/45",
} as const;

const sizes = {
  sm: "h-8 px-3 text-xs rounded-md",
  md: "h-10 px-5 text-sm rounded-lg",
  lg: "h-12 px-8 text-base rounded-lg",
} as const;

/** Props accepted by the {@link Button} component. */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant. @default "default" */
  variant?: keyof typeof variants;
  /** Size preset. @default "md" */
  size?: keyof typeof sizes;
}

/**
 * Gaming-styled button component for the Litwill Garden design system.
 *
 * Renders a `<button>` element with brand-coloured variants, size presets,
 * and a hover glow effect that reinforces the Apex Legends aesthetic.
 *
 * @example
 * ```tsx
 * <Button variant="accent" size="lg">Play Now</Button>
 * <Button variant="outline">Learn More</Button>
 * ```
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold tracking-wide",
          "transition-all duration-200 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C6BA8] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F0FA]",
          "disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
