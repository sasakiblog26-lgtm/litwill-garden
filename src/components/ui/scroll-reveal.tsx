"use client";

import { useEffect, useRef, type ReactNode } from "react";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface ScrollRevealProps {
  children: ReactNode;
  /**
   * Staggered animation delay tier.
   * 0 = no delay, 1–3 = .sr-delay-1 / .sr-delay-2 / .sr-delay-3
   * (transition-delay values defined in globals.css)
   * @default 0
   */
  delay?: 0 | 1 | 2 | 3;
  /** Additional CSS class names applied to the wrapper div. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Wraps children in a div that fades + slides in when it enters the viewport.
 *
 * Relies on the `.sr-hidden` / `.sr-visible` / `.sr-delay-N` classes
 * defined in globals.css.
 */
export function ScrollReveal({ children, delay = 0, className }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("sr-hidden");
          el.classList.add("sr-visible");
          observer.unobserve(el); // animate once
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    // Start hidden
    el.classList.add("sr-hidden");
    if (delay > 0) {
      el.classList.add(`sr-delay-${delay}`);
    }

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
