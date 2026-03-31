import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Button variant style definitions.
 *
 * - `default` - Primary lime-green button with glow hover effect.
 * - `secondary` - Cyan button for secondary actions.
 * - `accent` - Orange CTA button for high-emphasis actions.
 * - `outline` - Transparent button with a border, fills on hover.
 * - `ghost` - Minimal button with no border, subtle hover background.
 */
const variants = {
  default:
    "bg-[#84CC16] text-[#18181B] hover:shadow-[0_0_16px_rgba(132,204,22,0.5)] hover:brightness-110",
  secondary:
    "bg-[#22D3EE] text-[#18181B] hover:shadow-[0_0_16px_rgba(34,211,238,0.5)] hover:brightness-110",
  accent:
    "bg-[#F97316] text-[#FAFAFA] hover:shadow-[0_0_16px_rgba(249,115,22,0.5)] hover:brightness-110",
  outline:
    "border border-[#84CC16] text-[#84CC16] bg-transparent hover:bg-[#84CC16]/10 hover:shadow-[0_0_12px_rgba(132,204,22,0.3)]",
  ghost:
    "bg-transparent text-[#FAFAFA] hover:bg-[#FAFAFA]/10",
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
          "inline-flex items-center justify-center font-semibold uppercase tracking-wider",
          "transition-all duration-200 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#84CC16] focus-visible:ring-offset-2 focus-visible:ring-offset-[#18181B]",
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
