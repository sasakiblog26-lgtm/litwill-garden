"use client";

import React, { useMemo } from "react";

// ── Types ────────────────────────────────────────────────────────────────────

interface NatalChartProps {
  /** ISO 形式または "YYYY-MM-DD" の誕生日文字列 */
  birthDate: string;
  /** SVG の表示サイズ（px）。デフォルト 280 */
  size?: number;
}

interface PlanetData {
  symbol: string;
  name: string;
  angle: number; // 度（0〜360）
  color: string;
}

// ── 惑星定義 ─────────────────────────────────────────────────────────────────

const PLANET_SYMBOLS = [
  { symbol: "☉", name: "Sun" },
  { symbol: "☽", name: "Moon" },
  { symbol: "♀", name: "Venus" },
  { symbol: "♂", name: "Mars" },
  { symbol: "♃", name: "Jupiter" },
  { symbol: "♄", name: "Saturn" },
  { symbol: "☿", name: "Mercury" },
];

const ZODIAC_SYMBOLS = [
  "♈", "♉", "♊", "♋", "♌", "♍",
  "♎", "♏", "♐", "♑", "♒", "♓",
];

// ── シード生成 ────────────────────────────────────────────────────────────────

/** 誕生日文字列から決定論的な数値シードを生成 */
function dateToSeed(dateStr: string): number {
  return dateStr
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
}

/** シードと惑星インデックスから 0〜360 の角度を生成 */
function seedToAngle(seed: number, planetIndex: number): number {
  const x = Math.sin(seed * (planetIndex + 1) * 9301 + 49297) * 233280;
  return ((x - Math.floor(x)) * 360);
}

// ── Helper ───────────────────────────────────────────────────────────────────

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

/** 2点間の角度差から主要アスペクト角（60/90/120/180）に該当するか判定 */
function getAspectColor(diff: number): string | null {
  const d = Math.min(diff % 360, 360 - (diff % 360));
  if (Math.abs(d - 180) < 8) return "rgba(200,160,192,0.4)"; // 対向
  if (Math.abs(d - 120) < 8) return "rgba(155,139,191,0.35)"; // トライン
  if (Math.abs(d - 90) < 8) return "rgba(200,180,130,0.3)";  // スクエア
  if (Math.abs(d - 60) < 8) return "rgba(155,139,191,0.25)"; // セクスタイル
  return null;
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function NatalChart({
  birthDate,
  size = 280,
}: NatalChartProps) {
  const center = size / 2;

  // 半径定義（sizeに比例）
  const r = {
    zodiac: center * 0.88,      // 黄道帯外周
    zodiacInner: center * 0.76, // 黄道帯内周
    house: center * 0.74,       // ハウス線外端
    houseInner: center * 0.20,  // ハウス線内端
    planet: center * 0.60,      // 惑星配置
    aspect: center * 0.58,      // アスペクト線端点
    label: center * 0.68,       // 惑星シンボルラベル
  };

  const planets = useMemo<PlanetData[]>(() => {
    const seed = dateToSeed(birthDate);
    return PLANET_SYMBOLS.map((p, i) => ({
      ...p,
      angle: seedToAngle(seed, i),
      color: "#D4C090",
    }));
  }, [birthDate]);

  // アスペクト線ペアを計算
  const aspectLines = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number; color: string }[] = [];
    for (let i = 0; i < planets.length; i++) {
      for (let j = i + 1; j < planets.length; j++) {
        const diff = Math.abs(planets[i].angle - planets[j].angle);
        const color = getAspectColor(diff);
        if (color) {
          const p1 = polarToCartesian(center, center, r.aspect, planets[i].angle);
          const p2 = polarToCartesian(center, center, r.aspect, planets[j].angle);
          lines.push({ x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y, color });
        }
      }
    }
    return lines;
  }, [planets, center, r.aspect]);

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ネイタルチャート"
      style={{ overflow: "visible" }}
    >
      {/* 黄道帯帯（外周リング） */}
      <circle
        cx={center}
        cy={center}
        r={r.zodiac}
        stroke="#9B8BBF"
        strokeWidth="0.8"
        fill="none"
        strokeOpacity="0.5"
      />
      <circle
        cx={center}
        cy={center}
        r={r.zodiacInner}
        stroke="#9B8BBF"
        strokeWidth="0.5"
        fill="rgba(155,139,191,0.04)"
        strokeOpacity="0.4"
      />

      {/* 12黄道帯セクター境界線 */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = i * 30;
        const outer = polarToCartesian(center, center, r.zodiac, angle);
        const inner = polarToCartesian(center, center, r.zodiacInner, angle);
        return (
          <line
            key={`zodiac-div-${i}`}
            x1={inner.x}
            y1={inner.y}
            x2={outer.x}
            y2={outer.y}
            stroke="#9B8BBF"
            strokeWidth="0.5"
            strokeOpacity="0.4"
          />
        );
      })}

      {/* 黄道帯シンボル */}
      {ZODIAC_SYMBOLS.map((sym, i) => {
        const angle = i * 30 + 15; // セクター中央
        const pos = polarToCartesian(center, center, (r.zodiac + r.zodiacInner) / 2, angle);
        return (
          <text
            key={`z-${i}`}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={size * 0.038}
            fill="#9B8BBF"
            fillOpacity="0.65"
            style={{ userSelect: "none" }}
          >
            {sym}
          </text>
        );
      })}

      {/* 12ハウス線 */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = i * 30;
        const outer = polarToCartesian(center, center, r.house, angle);
        const inner = polarToCartesian(center, center, r.houseInner, angle);
        const isAngular = i % 3 === 0; // 4アングル（ASC/IC/DSC/MC）
        return (
          <line
            key={`house-${i}`}
            x1={inner.x}
            y1={inner.y}
            x2={outer.x}
            y2={outer.y}
            stroke="#9B8BBF"
            strokeWidth={isAngular ? "0.8" : "0.4"}
            strokeOpacity={isAngular ? 0.5 : 0.25}
            strokeDasharray={isAngular ? undefined : "2 3"}
          />
        );
      })}

      {/* アスペクト線 */}
      {aspectLines.map((line, i) => (
        <line
          key={`aspect-${i}`}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke={line.color}
          strokeWidth="0.6"
        />
      ))}

      {/* 内側の装飾円 */}
      <circle
        cx={center}
        cy={center}
        r={r.houseInner}
        stroke="#9B8BBF"
        strokeWidth="0.5"
        fill="rgba(155,139,191,0.05)"
        strokeOpacity="0.35"
      />

      {/* 惑星ドット + シンボル */}
      {planets.map((planet, i) => {
        const dotPos = polarToCartesian(center, center, r.planet, planet.angle);
        const lblPos = polarToCartesian(center, center, r.label, planet.angle);
        return (
          <g key={`planet-${i}`}>
            {/* ドット */}
            <circle
              cx={dotPos.x}
              cy={dotPos.y}
              r={size * 0.018}
              fill="#D4C090"
              fillOpacity="0.85"
            />
            {/* 小さなグロー */}
            <circle
              cx={dotPos.x}
              cy={dotPos.y}
              r={size * 0.032}
              fill="none"
              stroke="#D4C090"
              strokeWidth="0.5"
              strokeOpacity="0.35"
            />
            {/* ラベル */}
            <text
              x={lblPos.x}
              y={lblPos.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={size * 0.05}
              fill="#D4C090"
              fillOpacity="0.9"
              style={{ userSelect: "none" }}
            >
              {planet.symbol}
            </text>
          </g>
        );
      })}

      {/* 中心点 */}
      <circle
        cx={center}
        cy={center}
        r={size * 0.012}
        fill="#9B8BBF"
        fillOpacity="0.6"
      />
    </svg>
  );
}
