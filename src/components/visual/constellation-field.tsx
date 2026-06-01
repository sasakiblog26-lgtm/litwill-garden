"use client";

import React, { useMemo } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

type Density = "sparse" | "normal";

interface ConstellationFieldProps {
  children: React.ReactNode;
  density?: Density;
}

interface ConstellationData {
  id: number;
  left: string;
  top: string;
  delay: string;
  scale: string;
  rotation: string;
  pattern: "triangle" | "vshape" | "cross" | "arc" | "diamond";
}

// ── Deterministic helpers ────────────────────────────────────────────────────

function pseudoRandom(seed: number, max: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return (x - Math.floor(x)) * max;
}

// ── Constellation SVG patterns ────────────────────────────────────────────────

const PATTERNS = {
  triangle: (
    <>
      {/* 頂点 */}
      <circle cx="20" cy="2" r="1.5" fill="currentColor" />
      <circle cx="2" cy="32" r="1.5" fill="currentColor" />
      <circle cx="38" cy="32" r="1.5" fill="currentColor" />
      {/* 辺 */}
      <line x1="20" y1="2" x2="2" y2="32" stroke="currentColor" strokeWidth="0.8" />
      <line x1="20" y1="2" x2="38" y2="32" stroke="currentColor" strokeWidth="0.8" />
      <line x1="2" y1="32" x2="38" y2="32" stroke="currentColor" strokeWidth="0.8" />
    </>
  ),
  vshape: (
    <>
      <circle cx="2" cy="2" r="1.5" fill="currentColor" />
      <circle cx="20" cy="24" r="1.5" fill="currentColor" />
      <circle cx="38" cy="2" r="1.5" fill="currentColor" />
      {/* 追加星 */}
      <circle cx="11" cy="13" r="1" fill="currentColor" />
      <circle cx="29" cy="13" r="1" fill="currentColor" />
      <line x1="2" y1="2" x2="20" y2="24" stroke="currentColor" strokeWidth="0.8" />
      <line x1="38" y1="2" x2="20" y2="24" stroke="currentColor" strokeWidth="0.8" />
    </>
  ),
  cross: (
    <>
      <circle cx="20" cy="2" r="1.5" fill="currentColor" />
      <circle cx="20" cy="38" r="1.5" fill="currentColor" />
      <circle cx="2" cy="20" r="1.5" fill="currentColor" />
      <circle cx="38" cy="20" r="1.5" fill="currentColor" />
      <circle cx="20" cy="20" r="2" fill="currentColor" />
      <line x1="20" y1="2" x2="20" y2="38" stroke="currentColor" strokeWidth="0.8" />
      <line x1="2" y1="20" x2="38" y2="20" stroke="currentColor" strokeWidth="0.8" />
    </>
  ),
  arc: (
    <>
      <circle cx="2" cy="20" r="1.5" fill="currentColor" />
      <circle cx="12" cy="6" r="1.5" fill="currentColor" />
      <circle cx="28" cy="6" r="1.5" fill="currentColor" />
      <circle cx="38" cy="20" r="1.5" fill="currentColor" />
      <path
        d="M 2 20 Q 10 -2 20 2 Q 30 -2 38 20"
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
      />
    </>
  ),
  diamond: (
    <>
      <circle cx="20" cy="2" r="1.5" fill="currentColor" />
      <circle cx="38" cy="20" r="1.5" fill="currentColor" />
      <circle cx="20" cy="38" r="1.5" fill="currentColor" />
      <circle cx="2" cy="20" r="1.5" fill="currentColor" />
      <line x1="20" y1="2" x2="38" y2="20" stroke="currentColor" strokeWidth="0.8" />
      <line x1="38" y1="20" x2="20" y2="38" stroke="currentColor" strokeWidth="0.8" />
      <line x1="20" y1="38" x2="2" y2="20" stroke="currentColor" strokeWidth="0.8" />
      <line x1="2" y1="20" x2="20" y2="2" stroke="currentColor" strokeWidth="0.8" />
    </>
  ),
} as const;

type PatternKey = keyof typeof PATTERNS;
const PATTERN_KEYS: PatternKey[] = ["triangle", "vshape", "cross", "arc", "diamond"];

// ── Main Component ───────────────────────────────────────────────────────────

export default function ConstellationField({
  children,
  density = "normal",
}: ConstellationFieldProps) {
  const count = density === "sparse" ? 3 : 5;

  const constellations = useMemo<ConstellationData[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(10 + pseudoRandom(i * 7 + 1, 80)).toFixed(1)}%`,
      top: `${(5 + pseudoRandom(i * 11 + 3, 85)).toFixed(1)}%`,
      delay: `${(pseudoRandom(i * 13 + 5, 12)).toFixed(1)}s`,
      scale: `${(0.7 + pseudoRandom(i * 17 + 7, 0.6)).toFixed(2)}`,
      rotation: `${(pseudoRandom(i * 19 + 9, 360)).toFixed(0)}deg`,
      pattern: PATTERN_KEYS[Math.floor(pseudoRandom(i * 23, PATTERN_KEYS.length))],
    }));
  }, [count]);

  return (
    <div style={{ position: "relative" }}>
      {/* 星座レイヤー */}
      {constellations.map((c) => (
        <div
          key={c.id}
          style={{
            position: "absolute",
            left: c.left,
            top: c.top,
            zIndex: 0,
            pointerEvents: "none",
            opacity: 0.15,
            transform: `scale(${c.scale}) rotate(${c.rotation})`,
            animation: `constellation-drift 20s ${c.delay} ease-in-out infinite`,
            willChange: "transform",
          }}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 40 40"
            width="40"
            height="40"
            color="#9B8BBF"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {PATTERNS[c.pattern]}
          </svg>
        </div>
      ))}

      {/* コンテンツ */}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
