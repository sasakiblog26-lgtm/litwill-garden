"use client";

import {
  useRef,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface TiltCardProps {
  children: ReactNode;
  /** Maximum tilt angle in degrees. @default 6 */
  maxTilt?: number;
  /** CSS perspective depth. @default "800px" */
  perspective?: string;
  /** Additional inline styles applied to the outer wrapper. */
  style?: CSSProperties;
  /** Additional CSS class names applied to the outer wrapper. */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Wraps children with a subtle 3-D tilt effect driven by the mouse position.
 *
 * - rotateX / rotateY are clamped to ±maxTilt degrees.
 * - Perspective is applied to the outer wrapper; the inner div carries the
 *   actual transform so children are not affected by perspective flattening.
 * - On mouse-leave the tilt resets smoothly via CSS transition.
 */
export function TiltCard({
  children,
  maxTilt = 6,
  perspective = "800px",
  style,
  className,
}: TiltCardProps) {
  const innerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = innerRef.current;
    if (!el) return;

    const rect = e.currentTarget.getBoundingClientRect();
    // Normalised position: -0.5 … +0.5
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;

    const rotateY = nx * maxTilt * 2;   // left→right tilt
    const rotateX = -ny * maxTilt * 2;  // top→bottom tilt

    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    el.style.transition = "transform 80ms linear";
  };

  const handleMouseLeave = () => {
    const el = innerRef.current;
    if (!el) return;
    el.style.transform = "rotateX(0deg) rotateY(0deg)";
    el.style.transition = "transform 400ms cubic-bezier(.4,0,.2,1)";
  };

  const outerStyle: CSSProperties = {
    perspective,
    ...style,
  };

  const innerStyle: CSSProperties = {
    transformStyle: "preserve-3d",
    willChange: "transform",
  };

  return (
    <div
      style={outerStyle}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={innerRef} style={innerStyle}>
        {children}
      </div>
    </div>
  );
}
