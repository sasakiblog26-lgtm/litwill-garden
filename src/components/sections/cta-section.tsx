import type { CSSProperties } from "react";
import { Button } from "@/components/ui/button";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface CtaSectionProps {
  /** 夜バージョン（暗い背景 + フル鑑定CTA）を表示する */
  night?: boolean;
}

// ---------------------------------------------------------------------------
// Light version
// ---------------------------------------------------------------------------

function LightCta() {
  const sectionStyle: CSSProperties = {
    background: "var(--bg-lavender-band)",
    padding: "80px 24px",
    textAlign: "center",
  };

  const innerStyle: CSSProperties = {
    maxWidth: "640px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "24px",
  };

  const titleStyle: CSSProperties = {
    fontFamily: "var(--lg-font-heading)",
    fontWeight: 700,
    fontSize: "26px",
    color: "var(--text-primary)",
    letterSpacing: "0.03em",
    margin: 0,
    lineHeight: 1.4,
  };

  const subStyle: CSSProperties = {
    fontSize: "15px",
    color: "var(--text-secondary)",
    lineHeight: 1.8,
    margin: 0,
    maxWidth: "500px",
  };

  const buttonRowStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    justifyContent: "center",
  };

  return (
    <section style={sectionStyle}>
      <div style={innerStyle}>
        <h2 style={titleStyle}>あなたの魂のテーマを知る — 無料診断</h2>
        <p style={subStyle}>
          生年月日を入力するだけで、西洋占星術・数秘術に基づいたリーディングが届きます。
        </p>
        <div style={buttonRowStyle}>
          <Button variant="primary" size="lg" href="/diagnosis">
            ✦ 無料で診断する
          </Button>
          <Button variant="outline" size="lg" href="/readings">
            鑑定を申し込む
          </Button>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Night version
// ---------------------------------------------------------------------------

function NightCta() {
  const sectionStyle: CSSProperties = {
    background: "linear-gradient(160deg, #1A1428 0%, #2D2448 100%)",
    padding: "96px 24px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  };

  // 背景装飾: 淡いグロー
  const glowStyle: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "600px",
    height: "400px",
    background:
      "radial-gradient(ellipse, rgba(155,139,191,0.12) 0%, transparent 70%)",
    pointerEvents: "none",
  };

  const innerStyle: CSSProperties = {
    position: "relative",
    maxWidth: "640px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "24px",
  };

  const titleStyle: CSSProperties = {
    fontFamily: "var(--lg-font-heading)",
    fontWeight: 700,
    fontSize: "28px",
    color: "#F0EAF8",
    letterSpacing: "0.05em",
    margin: 0,
    lineHeight: 1.4,
  };

  const subStyle: CSSProperties = {
    fontSize: "15px",
    color: "#C0B3DC",
    lineHeight: 1.8,
    margin: 0,
    maxWidth: "520px",
  };

  const priceStyle: CSSProperties = {
    fontFamily: "var(--lg-font-display)",
    fontWeight: 700,
    fontSize: "28px",
    color: "#D4C090",
    letterSpacing: "0.04em",
    margin: 0,
  };

  return (
    <section style={sectionStyle}>
      <div style={glowStyle} aria-hidden="true" />
      <div style={innerStyle}>
        <h2 style={titleStyle}>✦ 人生の星図 フル鑑定 ✦</h2>
        <p style={subStyle}>
          魂のテーマ・恋愛・仕事・人間関係・運気サイクルまで — あなただけの美しい星図にまとめてお届けします。
        </p>
        <p style={priceStyle}>¥11,000</p>
        <Button variant="gold" size="lg" href="/readings/full">
          ✦ フル鑑定を申し込む
        </Button>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

export default function CtaSection({ night = false }: CtaSectionProps) {
  return night ? <NightCta /> : <LightCta />;
}
