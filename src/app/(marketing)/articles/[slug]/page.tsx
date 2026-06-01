import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const metadata: Metadata = { title: "占いコラム" };

export default async function ArticleDetailPage({ params }: PageProps) {
  await params;

  // ── Layout ──────────────────────────────────────────────────────────────
  const outerStyle: CSSProperties = {
    maxWidth: "720px",
    margin: "0 auto",
    padding: "48px 24px",
  };

  // ── Typography ───────────────────────────────────────────────────────────
  const h1Style: CSSProperties = {
    fontFamily: "var(--lg-font-heading)",
    fontWeight: 700,
    fontSize: "28px",
    lineHeight: 1.4,
    color: "var(--text-primary)",
    margin: "16px 0 8px",
  };

  const bylineStyle: CSSProperties = {
    fontSize: "14px",
    color: "#9A95B4",
    marginBottom: "28px",
  };

  const bodyStyle: CSSProperties = {
    fontSize: "15px",
    lineHeight: 2.0,
    color: "var(--text-secondary)",
  };

  const h2Style: CSSProperties = {
    fontFamily: "var(--lg-font-heading)",
    fontWeight: 600,
    fontSize: "22px",
    color: "var(--text-primary)",
    margin: "36px 0 12px",
  };

  const blockquoteStyle: CSSProperties = {
    fontFamily: "var(--lg-font-heading)",
    fontStyle: "italic",
    fontSize: "17px",
    color: "#7B6AA8",
    borderLeft: "2px solid #D6CFEA",
    padding: "16px 0 16px 20px",
    margin: "24px 0",
  };

  // ── Inline CTA ───────────────────────────────────────────────────────────
  const ctaStyle: CSSProperties = {
    background: "var(--bg-lavender-band)",
    textAlign: "center",
    padding: "24px",
    borderRadius: "20px",
    marginTop: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
  };

  const ctaTextStyle: CSSProperties = {
    fontFamily: "var(--lg-font-heading)",
    fontWeight: 600,
    fontSize: "16px",
    color: "var(--text-primary)",
    margin: 0,
  };

  return (
    <div style={outerStyle}>
      {/* Meta row */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
        <Badge variant="lavender">占星術</Badge>
        <span style={{ fontSize: "13px", color: "#9A95B4" }}>2026年5月15日</span>
      </div>

      {/* Title */}
      <h1 style={h1Style}>満月の夜のセルフリーディング — 月のエネルギーを使った直感の磨き方</h1>

      {/* Byline */}
      <p style={bylineStyle}>by Litwill Garden 編集部</p>

      {/* Eye-catch image */}
      <div
        style={{
          height: "320px",
          borderRadius: "20px",
          overflow: "hidden",
          position: "relative",
          marginBottom: "36px",
        }}
      >
        <Image
          src="/images/backgrounds.jpg"
          alt="満月の夜のセルフリーディング"
          fill
          style={{ objectFit: "cover", objectPosition: "100% 0%" }}
          priority
        />
      </div>

      {/* Body */}
      <div style={bodyStyle}>
        <p>
          満月は「手放し」と「完了」のエネルギーに満ちた特別な夜です。この夜に行うセルフリーディングは、普段より深い洞察を得られるとされています。
        </p>

        <h2 style={h2Style}>なぜ満月の夜にリーディングを行うのか</h2>

        <p>
          月は私たちの無意識に深く影響を与えています。ユング心理学では、月は「影（シャドウ）」や「アニマ」の象徴とされ、普段意識しない感情や欲求が表面化しやすい時期だと考えられています。
        </p>

        <blockquote style={blockquoteStyle}>
          「月の光は、太陽が照らさない心の奥底を静かに映し出す。」
        </blockquote>

        <h2 style={h2Style}>セルフリーディングの手順</h2>

        <p>
          静かな環境を整え、深呼吸を3回。クリスタル（ムーンストーンやセレナイトがおすすめ）を手に持ち、今気になっていることをカードに問いかけましょう。
        </p>
      </div>

      {/* Inline CTA */}
      <div style={ctaStyle}>
        <p style={ctaTextStyle}>あなたも月のエネルギーを味方にしませんか？</p>
        <Button variant="primary" href="/diagnosis">
          ✦ 無料で月星座を診断する
        </Button>
      </div>
    </div>
  );
}
