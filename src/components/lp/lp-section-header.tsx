import type { CSSProperties } from "react";

// ---------------------------------------------------------------------------
// LP 専用セクション見出し
//   中央揃え「✦ 見出し ✦」＋直下に極小の英字アイキャッチ＋細い区切り
//   トップLP（白ベース）でのみ使う。配色は固定の明色（theme-dark の影響を受けない）
// ---------------------------------------------------------------------------

export interface LpSectionHeaderProps {
  /** 英字アイキャッチ（MENU / WORRIES / REASON / FLOW / PRICE / FAQ など） */
  eyebrow: string;
  /** 日本語見出し */
  title: string;
  /** 補足説明（任意） */
  sub?: string;
}

export default function LpSectionHeader({ eyebrow, title, sub }: LpSectionHeaderProps) {
  const wrap: CSSProperties = { textAlign: "center", maxWidth: 720, margin: "0 auto" };

  const titleStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 14,
    fontFamily: "var(--lg-font-heading)",
    fontWeight: 700,
    fontSize: "clamp(22px, 4vw, 30px)",
    color: "#2D2448",
    letterSpacing: "0.04em",
    lineHeight: 1.3,
    margin: 0,
  };

  const starStyle: CSSProperties = { color: "#C0B3DC", fontSize: 16, fontWeight: 400 };

  const eyebrowStyle: CSSProperties = {
    display: "block",
    fontFamily: "var(--lg-font-display)",
    fontStyle: "italic",
    fontSize: 12,
    letterSpacing: "0.28em",
    color: "#B0A0CF",
    textTransform: "uppercase",
    marginTop: 10,
  };

  const dividerStyle: CSSProperties = {
    width: 48,
    height: 2,
    borderRadius: 999,
    background: "linear-gradient(90deg, transparent, #D4C090, transparent)",
    margin: "12px auto 0",
  };

  const subStyle: CSSProperties = {
    fontSize: 15,
    color: "#5E4D8A",
    lineHeight: 1.9,
    margin: "20px auto 0",
    maxWidth: 600,
  };

  return (
    <div style={wrap}>
      <h2 style={titleStyle}>
        <span style={starStyle} aria-hidden="true">✦</span>
        {title}
        <span style={starStyle} aria-hidden="true">✦</span>
      </h2>
      <span style={eyebrowStyle}>{eyebrow}</span>
      <div style={dividerStyle} aria-hidden="true" />
      {sub && <p style={subStyle}>{sub}</p>}
    </div>
  );
}
