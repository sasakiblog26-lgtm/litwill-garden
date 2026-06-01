import Link from "next/link";
import Hero from "@/components/sections/hero";
import SectionHeader from "@/components/sections/section-header";
import ArticleCard from "@/components/sections/article-card";
import ReadingCard from "@/components/sections/reading-card";
import CtaSection from "@/components/sections/cta-section";
import ConstellationField from "@/components/visual/constellation-field";
import { GarlandDivider, OrnamentDivider } from "@/components/visual/ornaments";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const ARTICLES = [
  {
    title: "満月の夜に行うセルフリーディング — 月のエネルギーを味方にする方法",
    category: "占星術",
    publishedAt: "2026-03-25",
    excerpt:
      "満月は「手放し」と「完了」のエネルギー。この特別な夜にできるセルフリーディングの方法を解説します。",
    thumbPosition: "0% 0%",
    href: "/articles/full-moon-reading",
  },
  {
    title: "ユング心理学から読み解くタロットカードの象徴 — 無意識の声を聴く",
    category: "心理学",
    publishedAt: "2026-03-20",
    excerpt:
      "タロットの大アルカナとユングの元型理論の共通点を、わかりやすく解説。",
    thumbPosition: "100% 0%",
    href: "/articles/tarot-jung",
  },
  {
    title: "あなたの月星座が教える「本当の感情パターン」",
    category: "占星術",
    publishedAt: "2026-03-15",
    excerpt:
      "太陽星座だけでは見えない、月星座が示す感情の深層を探ります。",
    thumbPosition: "0% 50%",
    href: "/articles/moon-sign",
  },
];

const READINGS = [
  {
    eyebrow: "Soul Reading",
    title: "魂のテーマリーディング",
    description:
      "あなたが今世で体験したいテーマ、魂レベルの強み・課題を総合的にリーディング。",
    tags: ["占星術", "数秘術"],
    price: "¥3,300",
    href: "/readings",
  },
  {
    eyebrow: "Love Reading",
    title: "恋愛リーディング",
    description:
      "恋愛パターン、理想のパートナー像、今の恋の流れを読み解きます。",
    tags: ["タロット", "恋愛"],
    price: "¥3,300",
    href: "/readings",
  },
  {
    eyebrow: "Premium Reading",
    title: "✦ 人生の星図 フル鑑定",
    description:
      "魂のテーマ、恋愛、仕事、人間関係、運気サイクルまで — 美しい星図にまとめてお届け。",
    tags: ["占星術", "タロット", "心理学", "クリスタル"],
    price: "¥11,000",
    gold: true,
    href: "/readings",
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. GarlandDivider */}
      <GarlandDivider />

      {/* 3. 占いコラム セクション */}
      <section style={{ background: "var(--bg-main)" }}>
        <ConstellationField density="sparse">
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
            <SectionHeader
              eyebrow="Columns"
              title="占いコラム"
              sub="占星術・タロット・心理学の知恵で、日々をもっと豊かに。"
            />

            <div
              className="resp-grid-3"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16,
                marginTop: 40,
              }}
            >
              {ARTICLES.map((article, i) => (
                <ScrollReveal key={article.href} delay={(i % 3) as 0 | 1 | 2 | 3}>
                  <ArticleCard {...article} />
                </ScrollReveal>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: 32 }}>
              <Link
                href="/articles"
                style={{ color: "#9B8BBF", fontSize: 14, textDecoration: "none" }}
              >
                すべてのコラムを見る →
              </Link>
            </div>
          </div>
        </ConstellationField>
      </section>

      {/* 4. OrnamentDivider */}
      <div style={{ padding: "0 24px" }}>
        <OrnamentDivider />
      </div>

      {/* 5. 鑑定メニュー セクション */}
      <section style={{ background: "var(--bg-cream-band)" }}>
        <ConstellationField density="sparse">
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
            <SectionHeader
              eyebrow="Readings"
              title="鑑定メニュー"
              sub="あなたの魂が求める答えを、プロの占い師がリーディングします。"
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16,
                marginTop: 40,
              }}
            >
              {READINGS.map((reading) => (
                <ReadingCard key={reading.eyebrow} {...reading} />
              ))}
            </div>
          </div>
        </ConstellationField>
      </section>

      {/* 6. CTA セクション */}
      <div style={{ background: "var(--bg-lavender-band)" }}>
        <CtaSection />
        <CtaSection night />
      </div>
    </>
  );
}
