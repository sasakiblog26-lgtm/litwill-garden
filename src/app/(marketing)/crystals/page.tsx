import type { Metadata } from "next";
import type { CSSProperties } from "react";
import SectionHeader from "@/components/sections/section-header";

export const metadata: Metadata = { title: "クリスタルガイド" };

const CRYSTALS = [
  {
    name: "ラベンダーアメジスト",
    description: "直感・霊的保護・精神の浄化。占いの場を清め、チャネリングを深める。",
    color: "#9B8BBF",
  },
  {
    name: "ムーンストーン",
    description: "直感・感情のバランス・女性性。月のエネルギーを高め、リーディング精度を上げる。",
    color: "#C8D8F0",
  },
  {
    name: "セレナイト",
    description: "浄化・高次元との接続。タロットカードの浄化に最適。",
    color: "#F0EAF8",
  },
  {
    name: "ローズクォーツ",
    description: "愛・自己受容・癒し。恋愛リーディングのお供に。",
    color: "#E8D0E0",
  },
  {
    name: "シトリン",
    description: "豊かさ・自信・太陽のエネルギー。仕事運や金運のリーディングに。",
    color: "#D4C090",
  },
  {
    name: "ラピスラズリ",
    description: "真実・知恵・コミュニケーション。水星や土星の惑星エネルギーに対応。",
    color: "#7B6AA8",
  },
] as const;

export default function CrystalsPage() {
  // ── Layout ──────────────────────────────────────────────────────────────
  const outerStyle: CSSProperties = {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "80px 24px",
  };

  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginTop: "48px",
  };

  const cardStyle: CSSProperties = {
    background: "var(--bg-card)",
    borderRadius: "20px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  };

  const nameStyle: CSSProperties = {
    fontFamily: "var(--lg-font-heading)",
    fontWeight: 600,
    fontSize: "16px",
    color: "var(--text-primary)",
    margin: 0,
  };

  const descStyle: CSSProperties = {
    fontSize: "14px",
    color: "var(--text-secondary)",
    lineHeight: 1.7,
    margin: 0,
  };

  return (
    <div style={outerStyle}>
      <SectionHeader
        eyebrow="Crystals"
        title="クリスタルガイド"
        sub="占いと相性の良いパワーストーン・クリスタルの選び方と使い方を解説します。"
      />

      <div style={gridStyle} className="resp-grid-3">
        {CRYSTALS.map((crystal) => (
          <div key={crystal.name} style={cardStyle}>
            {/* Color swatch */}
            <div
              style={{
                borderRadius: "50%",
                width: "48px",
                height: "48px",
                backgroundColor: crystal.color,
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
            <p style={nameStyle}>{crystal.name}</p>
            <p style={descStyle}>{crystal.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
