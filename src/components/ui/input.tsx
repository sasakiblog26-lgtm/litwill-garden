import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** Props accepted by the {@link Input} component. */
export type InputProps = InputHTMLAttributes<HTMLInputElement>;

/**
 * Styled text input for the dark-themed Litwill Garden design system.
 *
 * Renders an `<input>` element with dark background, subtle border,
 * focus ring in the primary colour, and placeholder styling.
 *
 * @example
 * ```tsx
 * <Input type="text" placeholder="Search weapons..." />
 * <Input type="email" placeholder="Email address" />
 * ```
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-10 w-full rounded-lg border border-[#3F3F46] bg-[#27272A] px-3 py-2",
        "text-sm text-[#FAFAFA] placeholder:text-[#71717A]",
        "transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#84CC16] focus-visible:ring-offset-2 focus-visible:ring-offset-[#18181B]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[#FAFAFA]",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
