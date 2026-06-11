"use client";

import React, { useMemo } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

interface AmbientMotifsProps {
  /** ダークモード切替（将来用。現在は CSS カスタムプロパティから判断） */
  dark?: boolean;
}

interface ParticleData {
  id: number;
  left: string;
  top: string;
  width: string;
  height: string;
  color: string;
  duration: string;
  delay: string;
  dx: string;
}

// ── Deterministic helpers ────────────────────────────────────────────────────

/** index ベースで 0〜max の決定論的な疑似乱数を返す */
function pseudoRandom(seed: number, max: number): number {
  // 簡易ハッシュ
  const x = Math.sin(seed + 1) * 10000;
  return ((x - Math.floor(x)) * max);
}

// ── Module-level constants ───────────────────────────────────────────────────

/** 粒子カラーパレット（useMemo依存から外すためモジュール定数化） */
const PARTICLE_COLORS = ["#C8D8F0", "#E8D0E0", "#D4C090"];

// ── Sub-components ───────────────────────────────────────────────────────────

/** Layer 4 / VineSVG: アールヌーヴォー蔦のSVG本体（レンダー外で定義） */
function VineSvg({ vineStyle }: { vineStyle: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 80 300"
      width="80"
      height="300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* メイン蔓 */}
      <path
        d="M 40 0 Q 20 50 35 100 Q 55 150 30 200 Q 10 250 40 300"
        stroke="#C8B8E0"
        strokeWidth="1.5"
        fill="none"
        style={vineStyle}
      />
      {/* 枝葉1 */}
      <path
        d="M 32 70 Q 15 60 10 45 Q 18 55 32 70"
        stroke="#C8B8E0"
        strokeWidth="1"
        fill="none"
        style={{ ...vineStyle, animationDelay: "0.5s" }}
      />
      {/* 枝葉2 */}
      <path
        d="M 42 120 Q 62 108 68 92 Q 58 105 42 120"
        stroke="#C8B8E0"
        strokeWidth="1"
        fill="none"
        style={{ ...vineStyle, animationDelay: "1s" }}
      />
      {/* 枝葉3 */}
      <path
        d="M 33 175 Q 14 165 8 148 Q 16 160 33 175"
        stroke="#C8B8E0"
        strokeWidth="1"
        fill="none"
        style={{ ...vineStyle, animationDelay: "1.5s" }}
      />
      {/* 小花1 */}
      <circle
        cx="9"
        cy="44"
        r="3"
        stroke="#C8B8E0"
        strokeWidth="1"
        fill="none"
        style={{ ...vineStyle, animationDelay: "0.8s" }}
      />
      {/* 小花2 */}
      <circle
        cx="69"
        cy="91"
        r="3"
        stroke="#C8B8E0"
        strokeWidth="1"
        fill="none"
        style={{ ...vineStyle, animationDelay: "1.3s" }}
      />
      {/* 小花3 */}
      <circle
        cx="7"
        cy="147"
        r="2.5"
        stroke="#C8B8E0"
        strokeWidth="1"
        fill="none"
        style={{ ...vineStyle, animationDelay: "1.8s" }}
      />
    </svg>
  );
}

/** Layer 1: オーロラグラデーション */
function AuroraGradient({ dark }: { dark: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "400%",
        height: "400%",
        top: "-150%",
        left: "-150%",
        background:
          "linear-gradient(135deg, #9B8BBF 0%, #C8D8F0 25%, #E8D0E0 50%, #9B8BBF 75%, #C8D8F0 100%)",
        backgroundSize: "400% 400%",
        animation: "aurora-shift 15s ease infinite",
        opacity: dark ? 0.12 : 0.06,
        zIndex: 44,
      }}
      aria-hidden="true"
    />
  );
}

/** Layer 2: 浮遊光粒子（25個・決定論的） */
function LightParticles() {
  const particles = useMemo<ParticleData[]>(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: `${pseudoRandom(i * 7, 100).toFixed(1)}%`,
      top: `${pseudoRandom(i * 13, 100).toFixed(1)}%`,
      width: `${(2 + pseudoRandom(i * 3, 2)).toFixed(1)}px`,
      height: `${(2 + pseudoRandom(i * 3, 2)).toFixed(1)}px`,
      color: PARTICLE_COLORS[Math.floor(pseudoRandom(i * 5, PARTICLE_COLORS.length))],
      duration: `${(8 + pseudoRandom(i * 11, 7)).toFixed(1)}s`,
      delay: `${(pseudoRandom(i * 17, 10)).toFixed(1)}s`,
      dx: `${(-20 + pseudoRandom(i * 19, 40)).toFixed(1)}px`,
    }));
  }, []);

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          style={
            {
              position: "absolute",
              left: p.left,
              top: p.top,
              width: p.width,
              height: p.height,
              borderRadius: "50%",
              backgroundColor: p.color,
              animation: `float-particle ${p.duration} ${p.delay} ease-in-out infinite`,
              "--dx": p.dx,
              willChange: "transform, opacity",
            } as React.CSSProperties
          }
          aria-hidden="true"
        />
      ))}
    </>
  );
}

/** Layer 3: クリスタルオーラ（六角形 × 2） */
function CrystalAura({ dark }: { dark: boolean }) {
  const hexClip =
    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

  const shapeStyle = (
    pos: React.CSSProperties
  ): React.CSSProperties => ({
    position: "fixed",
    width: "320px",
    height: "320px",
    clipPath: hexClip,
    background: `rgba(155, 139, 191, ${dark ? 0.12 : 0.08})`,
    animation: "crystal-pulse 6s ease-in-out infinite",
    willChange: "opacity, transform",
    ...pos,
  });

  return (
    <>
      {/* 右上 */}
      <div
        style={shapeStyle({ top: "-80px", right: "-80px" })}
        aria-hidden="true"
      />
      {/* 左下 */}
      <div
        style={shapeStyle({
          bottom: "-80px",
          left: "-80px",
          animationDelay: "3s",
        })}
        aria-hidden="true"
      />
    </>
  );
}

/** Layer 4: アールヌーヴォー蔦（SVG） */
function ArtNouveauVines({ dark }: { dark: boolean }) {
  const strokeOpacity = dark ? 0.2 : 0.35;
  const dashLen = 1000;
  const vineStyle: React.CSSProperties = {
    animation: `vine-draw 4s ease forwards`,
    strokeDasharray: dashLen,
    strokeDashoffset: dashLen,
  };

  return (
    <>
      {/* 左側 */}
      <div
        style={{
          position: "fixed",
          left: 0,
          top: "15%",
          opacity: strokeOpacity,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <VineSvg vineStyle={vineStyle} />
      </div>

      {/* 右側（水平反転） */}
      <div
        style={{
          position: "fixed",
          right: 0,
          top: "30%",
          opacity: strokeOpacity,
          pointerEvents: "none",
          transform: "scaleX(-1)",
        }}
        aria-hidden="true"
      >
        <VineSvg vineStyle={vineStyle} />
      </div>
    </>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export function AmbientMotifs({ dark = false }: AmbientMotifsProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 45,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      {/* Layer 1: Aurora */}
      <AuroraGradient dark={dark} />

      {/* Layer 2: Floating particles */}
      <LightParticles />

      {/* Layer 3: Crystal aura hexagons */}
      <CrystalAura dark={dark} />

      {/* Layer 4: Art nouveau vines */}
      <ArtNouveauVines dark={dark} />
    </div>
  );
}

export default AmbientMotifs;
