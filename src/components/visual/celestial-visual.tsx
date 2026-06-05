"use client";

import React from "react";

// ── 黄道帯シンボル ────────────────────────────────────────────────────────────

const ZODIAC_SYMBOLS = [
  "♈", "♉", "♊", "♋", "♌", "♍",
  "♎", "♏", "♐", "♑", "♒", "♓",
];

// ── Helper: 極座標 → デカルト ────────────────────────────────────────────────

function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleDeg: number
): { x: number; y: number } {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

// ── Sub-components ───────────────────────────────────────────────────────────

/** 三日月 */
function CrescentMoon({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx - 10}, ${cy - 12})`}>
      {/* 外側の円弧 */}
      <path
        d="M 10 0 A 12 12 0 1 1 10 24 A 8 8 0 1 0 10 0 Z"
        stroke="#9B8BBF"
        strokeWidth="1"
        fill="rgba(155,139,191,0.15)"
      />
    </g>
  );
}

/** 同心円オービット + 黄道シンボル */
function OrbitRing({
  cx,
  cy,
  radius,
  clockwise,
  symbols,
  duration,
}: {
  cx: number;
  cy: number;
  radius: number;
  clockwise: boolean;
  symbols: string[];
  duration: string;
}) {
  const animName = clockwise ? "orbit-rotate" : "orbit-rotate-reverse";

  return (
    <g
      style={{
        transformOrigin: `${cx}px ${cy}px`,
        animation: `${animName} ${duration} linear infinite`,
      }}
    >
      {/* 軌道円 */}
      <circle
        cx={cx}
        cy={cy}
        r={radius}
        stroke="#9B8BBF"
        strokeWidth="0.5"
        fill="none"
        strokeOpacity="0.4"
      />

      {/* 黄道帯シンボル */}
      {symbols.map((sym, i) => {
        const angle = (360 / symbols.length) * i;
        const pos = polarToCartesian(cx, cy, radius, angle);
        return (
          <text
            key={i}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="7"
            fill="#9B8BBF"
            fillOpacity="0.75"
            style={{ userSelect: "none" }}
          >
            {sym}
          </text>
        );
      })}
    </g>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function CelestialVisual() {
  const CX = 100;
  const CY = 100;

  // 12星座を3つのオービットに割り振る（内側は装飾のみ）
  const outerSymbols = ZODIAC_SYMBOLS; // 12個を外側リングに
  const midSymbols = ZODIAC_SYMBOLS.slice(0, 6); // 6個を中間リングに（間引き）

  return (
    <svg
      viewBox="0 0 200 200"
      width="300"
      height="300"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.6, overflow: "visible", maxWidth: "100%", height: "auto" }}
      aria-label="天体図"
    >
      {/* 最内オービット（装飾のみ・静止） */}
      <circle
        cx={CX}
        cy={CY}
        r={60}
        stroke="#9B8BBF"
        strokeWidth="0.5"
        fill="none"
        strokeOpacity="0.3"
        strokeDasharray="3 4"
      />

      {/* 中間オービット（時計回り） */}
      <OrbitRing
        cx={CX}
        cy={CY}
        radius={80}
        clockwise={true}
        symbols={midSymbols}
        duration="20s"
      />

      {/* 外側オービット（反時計回り） */}
      <OrbitRing
        cx={CX}
        cy={CY}
        radius={100}
        clockwise={false}
        symbols={outerSymbols}
        duration="30s"
      />

      {/* 十字の目盛線（アストロラーベ風） */}
      <line
        x1={CX}
        y1={CY - 55}
        x2={CX}
        y2={CY + 55}
        stroke="#9B8BBF"
        strokeWidth="0.3"
        strokeOpacity="0.25"
      />
      <line
        x1={CX - 55}
        y1={CY}
        x2={CX + 55}
        y2={CY}
        stroke="#9B8BBF"
        strokeWidth="0.3"
        strokeOpacity="0.25"
      />
      {/* 45度斜め線 */}
      <line
        x1={CX - 38}
        y1={CY - 38}
        x2={CX + 38}
        y2={CY + 38}
        stroke="#9B8BBF"
        strokeWidth="0.3"
        strokeOpacity="0.15"
      />
      <line
        x1={CX + 38}
        y1={CY - 38}
        x2={CX - 38}
        y2={CY + 38}
        stroke="#9B8BBF"
        strokeWidth="0.3"
        strokeOpacity="0.15"
      />

      {/* 中心: 三日月 */}
      <CrescentMoon cx={CX} cy={CY} />

      {/* 中心点 */}
      <circle cx={CX} cy={CY} r="2" fill="#D4C090" fillOpacity="0.8" />
    </svg>
  );
}
