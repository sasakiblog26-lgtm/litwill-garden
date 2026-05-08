import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

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
);
Card.displayName = "Card";

/**
 * Top section of a {@link Card}, typically containing the title and description.
 */
const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1.5 p-6", className)}
      {...props}
    />
  ),
);
CardHeader.displayName = "CardHeader";

/**
 * Heading element rendered inside a {@link CardHeader}.
 */
const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-lg font-bold tracking-wide text-[#3D3158]",
        className,
      )}
      {...props}
    />
  ),
);
CardTitle.displayName = "CardTitle";

/**
 * Secondary text rendered below the {@link CardTitle}.
 */
const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-[#6E6385]", className)}
      {...props}
    />
  ),
);
CardDescription.displayName = "CardDescription";

/**
 * Main body of a {@link Card}.
 */
const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

/**
 * Bottom section of a {@link Card}, often used for action buttons.
 */
const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
