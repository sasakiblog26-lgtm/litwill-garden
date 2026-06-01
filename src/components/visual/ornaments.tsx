import React from "react";

// ─────────────────────────────────────────────────────────────────────────────
// GarlandDivider
// セクション間の装飾ライン — ガーランド曲線 + 菱形
// ─────────────────────────────────────────────────────────────────────────────

interface GarlandDividerProps {
  opacity?: number;
  className?: string;
}

export function GarlandDivider({ opacity = 0.4, className }: GarlandDividerProps) {
  // 菱形の x 座標（中心含む7点を均等に配置）
  const diamonds = [0.1, 0.25, 0.4, 0.5, 0.6, 0.75, 0.9];

  return (
    <div
      className={className}
      style={{ width: "100%", lineHeight: 0, opacity }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 800 40"
        preserveAspectRatio="none"
        width="100%"
        height="40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/*
          ガーランド曲線:
          中心(400, 8)から左端(0, 4)と右端(800, 4)に向かって
          緩やかな弧を描くように垂れ下がる2セグメント
        */}
        <path
          d="M 0 4 Q 200 32 400 8 Q 600 32 800 4"
          stroke="#C8B8E0"
          strokeWidth="1"
          fill="none"
        />

        {/* 菱形装飾 */}
        {diamonds.map((ratio, i) => {
          const cx = ratio * 800;
          // ガーランド上のおよその y 値を二次ベジェで近似
          // Q 200 32 400 8 の t = (cx/400) for left half, (cx-400)/400 for right
          const t = cx <= 400 ? cx / 400 : (cx - 400) / 400;
          const controlY = cx <= 400 ? 32 : 32;
          const startY = cx <= 400 ? 4 : 8;
          const endY = cx <= 400 ? 8 : 4;
          const cy =
            (1 - t) * (1 - t) * startY +
            2 * (1 - t) * t * controlY +
            t * t * endY;

          const size = i === 3 ? 5 : 3.5; // 中心を少し大きく
          return (
            <path
              key={i}
              d={`M ${cx} ${cy - size} L ${cx + size} ${cy} L ${cx} ${cy + size} L ${cx - size} ${cy} Z`}
              stroke="#C8B8E0"
              strokeWidth="1"
              fill="none"
            />
          );
        })}
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// OrnamentDivider
// 水平装飾ライン — 左右の線 + 中心の ✦ 装飾
// ─────────────────────────────────────────────────────────────────────────────

interface OrnamentDividerProps {
  opacity?: number;
  symbol?: "star" | "diamond";
  className?: string;
}

export function OrnamentDivider({
  opacity = 0.35,
  symbol = "star",
  className,
}: OrnamentDividerProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width: "100%",
        opacity,
      }}
      aria-hidden="true"
    >
      {/* 左線 */}
      <svg
        style={{ flex: 1 }}
        height="1"
        viewBox="0 0 100 1"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="#C8B8E0" strokeWidth="1" />
      </svg>

      {/* 中心装飾 */}
      {symbol === "star" ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0 }}
        >
          {/* ✦ 四芒星 */}
          <path
            d="M8 1 L9 7 L15 8 L9 9 L8 15 L7 9 L1 8 L7 7 Z"
            stroke="#C8B8E0"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      ) : (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0 }}
        >
          {/* ◇ 菱形 */}
          <path
            d="M6 0 L12 6 L6 12 L0 6 Z"
            stroke="#C8B8E0"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      )}

      {/* 右線 */}
      <svg
        style={{ flex: 1 }}
        height="1"
        viewBox="0 0 100 1"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="#C8B8E0" strokeWidth="1" />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CornerFrame
// カードの四隅を囲む蔦フレーム
// ─────────────────────────────────────────────────────────────────────────────

interface CornerFrameProps {
  children: React.ReactNode;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

/** 四隅の蔦SVG（60×60px） */
function CornerSvg({ flip }: { flip?: "h" | "v" | "both" }) {
  const transform =
    flip === "h"
      ? "scale(-1, 1)"
      : flip === "v"
      ? "scale(1, -1)"
      : flip === "both"
      ? "scale(-1, -1)"
      : undefined;

  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
      aria-hidden="true"
    >
      <g transform={transform ? `translate(60,60) ${transform}` : undefined}
         transform-origin="30 30">
        {/* メイン蔦 */}
        <path
          d="M 4 4 Q 4 28 18 28 Q 32 28 28 14 Q 24 4 10 6"
          stroke="#C8B8E0"
          strokeWidth="1"
          fill="none"
        />
        {/* 小枝1 */}
        <path
          d="M 18 28 Q 10 38 6 52"
          stroke="#C8B8E0"
          strokeWidth="0.8"
          fill="none"
        />
        {/* 小枝2 */}
        <path
          d="M 28 14 Q 38 8 52 6"
          stroke="#C8B8E0"
          strokeWidth="0.8"
          fill="none"
        />
        {/* 葉1 */}
        <path
          d="M 18 28 Q 24 22 30 24 Q 24 28 18 28 Z"
          stroke="#C8B8E0"
          strokeWidth="0.8"
          fill="none"
        />
        {/* 葉2 */}
        <path
          d="M 28 14 Q 22 8 18 12 Q 22 16 28 14 Z"
          stroke="#C8B8E0"
          strokeWidth="0.8"
          fill="none"
        />
        {/* 小花（円） */}
        <circle cx="6" cy="52" r="2" stroke="#C8B8E0" strokeWidth="0.8" fill="none" />
        <circle cx="52" cy="6" r="2" stroke="#C8B8E0" strokeWidth="0.8" fill="none" />
        {/* 菱形アクセント */}
        <path
          d="M 4 4 L 7 7 L 4 10 L 1 7 Z"
          stroke="#C8B8E0"
          strokeWidth="0.8"
          fill="none"
        />
      </g>
    </svg>
  );
}

export function CornerFrame({ children, opacity = 0.5, className, style }: CornerFrameProps) {
  const cornerStyle: React.CSSProperties = {
    position: "absolute",
    opacity,
    pointerEvents: "none",
  };

  return (
    <div
      className={className}
      style={{ position: "relative", ...style }}
    >
      {/* 左上 */}
      <div style={{ ...cornerStyle, top: 0, left: 0 }}>
        <CornerSvg />
      </div>
      {/* 右上 */}
      <div style={{ ...cornerStyle, top: 0, right: 0, transform: "scaleX(-1)" }}>
        <CornerSvg />
      </div>
      {/* 左下 */}
      <div style={{ ...cornerStyle, bottom: 0, left: 0, transform: "scaleY(-1)" }}>
        <CornerSvg />
      </div>
      {/* 右下 */}
      <div
        style={{
          ...cornerStyle,
          bottom: 0,
          right: 0,
          transform: "scale(-1, -1)",
        }}
      >
        <CornerSvg />
      </div>

      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MirrorFrame
// 円形ポートレート用の装飾フレーム
// ─────────────────────────────────────────────────────────────────────────────

interface MirrorFrameProps {
  children: React.ReactNode;
  size?: number;
  opacity?: number;
  className?: string;
}

export function MirrorFrame({
  children,
  size = 120,
  opacity = 0.6,
  className,
}: MirrorFrameProps) {
  const outerSize = size + 24; // 装飾リング分

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: outerSize,
        height: outerSize,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {/* 外周装飾リング（SVG） */}
      <svg
        width={outerSize}
        height={outerSize}
        viewBox={`0 0 ${outerSize} ${outerSize}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          opacity,
        }}
        aria-hidden="true"
      >
        {/* 外側点線リング */}
        <circle
          cx={outerSize / 2}
          cy={outerSize / 2}
          r={outerSize / 2 - 4}
          stroke="#C8B8E0"
          strokeWidth="0.8"
          strokeDasharray="3 5"
        />
        {/* 内側ソリッドリング */}
        <circle
          cx={outerSize / 2}
          cy={outerSize / 2}
          r={outerSize / 2 - 10}
          stroke="#C8B8E0"
          strokeWidth="1"
        />
        {/* 四方位の菱形アクセント */}
        {[0, 90, 180, 270].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const r = outerSize / 2 - 4;
          const cx2 = outerSize / 2 + r * Math.sin(rad);
          const cy2 = outerSize / 2 - r * Math.cos(rad);
          const d = 4;
          return (
            <path
              key={deg}
              d={`M ${cx2} ${cy2 - d} L ${cx2 + d} ${cy2} L ${cx2} ${cy2 + d} L ${cx2 - d} ${cy2} Z`}
              stroke="#C8B8E0"
              strokeWidth="0.8"
              fill="rgba(200,184,224,0.15)"
            />
          );
        })}
        {/* 斜め45度の小サークル */}
        {[45, 135, 225, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const r = outerSize / 2 - 4;
          const cx2 = outerSize / 2 + r * Math.sin(rad);
          const cy2 = outerSize / 2 - r * Math.cos(rad);
          return (
            <circle
              key={deg}
              cx={cx2}
              cy={cy2}
              r="2"
              stroke="#C8B8E0"
              strokeWidth="0.8"
              fill="none"
            />
          );
        })}
      </svg>

      {/* 子要素を円形にクリップ */}
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          overflow: "hidden",
          position: "relative",
          flexShrink: 0,
        }}
      >
        {children}
      </div>
    </div>
  );
}
