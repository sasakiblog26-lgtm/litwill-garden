"use client";

import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** Props accepted by the {@link Select} component. */
export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

/**
 * Styled `<select>` dropdown for filtering and sorting controls.
 *
 * Marked as a Client Component because native `<select>` elements require
 * browser interactivity for change events.
 *
 * @example
 * ```tsx
 * <Select defaultValue="all" onChange={(e) => setFilter(e.target.value)}>
 *   <option value="all">All Weapons</option>
 *   <option value="smg">SMGs</option>
 *   <option value="ar">Assault Rifles</option>
 * </Select>
 * ```
 */
const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "flex h-10 w-full appearance-none rounded-lg border border-[#3F3F46] bg-[#27272A] px-3 py-2 pr-8",
        "text-sm text-[#FAFAFA]",
        "transition-colors duration-150",
        "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23A1A1AA%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[position:right_8px_center] bg-no-repeat",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#84CC16] focus-visible:ring-offset-2 focus-visible:ring-offset-[#18181B]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  ),
);
Select.displayName = "Select";

export { Select };
