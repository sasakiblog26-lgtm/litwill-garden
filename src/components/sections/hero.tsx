"use client";

import type { CSSProperties } from "react";
import CelestialVisual from "@/components/visual/celestial-visual";
import { Button } from "@/components/ui/button";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Hero() {
  const sectionStyle: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    minHeight: "600px",
    padding: "120px 24px 80px",
    background: "var(--bg-hero)",
  };

  const bgImageStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    backgroundImage: "url('/images/backgrounds.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.08,
    pointerEvents: "none",
  };

  const innerStyle: CSSProperties = {
    position: "relative",
    maxWidth: "1100px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "48px",
  };

  const textColStyle: CSSProperties = {
    flex: "1 1 0",
    minWidth: 0,
  };

  const visualColStyle: CSSProperties = {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const eyebrowStyle: CSSProperties = {
    display: "block",
    fontFamily: "var(--lg-font-display)",
    fontStyle: "italic",
    fontSize: "13px",
    color: "#9B8BBF",
    letterSpacing: "0.12em",
    marginBottom: "16px",
  };

  const titleStyle: CSSProperties = {
    fontFamily: "var(--lg-font-heading)",
    fontWeight: 700,
    fontSize: "42px",
    color: "var(--text-primary)",
    lineHeight: 1.25,
    letterSpacing: "0.03em",
    margin: "0 0 20px",
  };

  const subStyle: CSSProperties = {
    fontSize: "16px",
    color: "var(--text-secondary)",
    lineHeight: 1.9,
    margin: "0 0 36px",
    maxWidth: "480px",
  };

  const buttonRowStyle: CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    alignItems: "center",
  };

  return (
    <section style={sectionStyle} className="resp-hero">
      {/* 背景画像オーバーレイ */}
      <div style={bgImageStyle} aria-hidden="true" />

      <div style={innerStyle} className="resp-hero-inner">
        {/* 左: テキストコンテンツ */}
        <div style={textColStyle}>
          <span style={eyebrowStyle}>AI × ASTROLOGY × PSYCHOLOGY</span>

          <h1 style={titleStyle} className="resp-hero-title">
            あなたの魂が描く、人生の星図
          </h1>

          <p style={subStyle}>
            AIが西洋占星術・インド占星術・四柱推命・心理学の4つの視点を統合し、ブレない一貫性と誠実さで、あなたの悩みを深く読み解きます。
          </p>

          <div style={buttonRowStyle} className="resp-hero-buttons">
            <Button variant="primary" size="lg" href="/diagnosis">
              ✦ 無料で魂のテーマを診断する
            </Button>
            <Button variant="outline" size="lg" href="/readings">
              鑑定メニューを見る
            </Button>
          </div>
        </div>

        {/* 右: 天体ビジュアル */}
        <div style={visualColStyle}>
          <CelestialVisual />
        </div>
      </div>
    </section>
  );
}
