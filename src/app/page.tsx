import type { CSSProperties } from "react";
import Link from "next/link";
import LpHero from "@/components/lp/lp-hero";
import LpMenuCards from "@/components/lp/lp-menu-cards";
import LpWorries from "@/components/lp/lp-worries";
import LpReasons from "@/components/lp/lp-reasons";
import LpFlow from "@/components/lp/lp-flow";
import LpPricing from "@/components/lp/lp-pricing";
import LpFaq from "@/components/lp/lp-faq";
import LpFinalCta from "@/components/lp/lp-final-cta";
import LpSectionHeader from "@/components/lp/lp-section-header";
import ArticleCard from "@/components/sections/article-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getAllArticles } from "@/lib/markdown";

// ---------------------------------------------------------------------------
// トップページ（理想LP再現 — feat/lp-redesign）
//   白ベース＋ラベンダー紫グラデ＋金アクセント＋夜空紺。
//   各セクションは src/components/lp/ に分割。
//   文言・価格・FAQは現行ブランドの実データのみ（架空実績・証言の捏造なし）。
//   JSON-LD・GA4・フローティングドック・metadata は layout.tsx 側で維持。
// ---------------------------------------------------------------------------

export default function Home() {
  const articles = getAllArticles()
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3)
    .map((article) => ({
      title: article.title,
      category: article.category,
      publishedAt: article.date,
      excerpt: article.excerpt,
      thumbnail: article.thumbnail,
      seed: article.slug,
      href: `/articles/${article.slug}`,
    }));

  const columnsSection: CSSProperties = { background: "#FFFFFF", padding: "80px 24px" };

  return (
    // theme-light: トップLPは白ベース。サイト全体は <html class="theme-dark"> のため、
    // ここで CSS 変数を明色に上書きしてLP内の共有部品（記事カード等）も白基調に統一する。
    <div className="theme-light" style={{ background: "#FFFFFF" }}>
      {/* 2. ヒーロー */}
      <LpHero />

      {/* 3. 鑑定メニュー */}
      <LpMenuCards />

      {/* 4. お悩み共感 */}
      <LpWorries />

      {/* 5. 選ばれる理由 */}
      <LpReasons />

      {/* 6. 鑑定までの流れ */}
      <LpFlow />

      {/* 7. 料金プラン */}
      <LpPricing />

      {/* 8. よくあるご質問 */}
      <LpFaq />

      {/* 占いコラム（最新3件・実データ） */}
      <section style={columnsSection}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <LpSectionHeader
            eyebrow="Columns"
            title="占いコラム"
            sub="占星術・タロット・心理学の知恵で、日々をもっと豊かに。"
          />
          <div
            className="lp-grid-3"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 48 }}
          >
            {articles.map((article, i) => (
              <ScrollReveal key={article.href} delay={(i % 3) as 0 | 1 | 2 | 3}>
                <ArticleCard {...article} />
              </ScrollReveal>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link href="/articles" style={{ color: "#7B6AA8", fontSize: 14, fontWeight: 600 }}>
              すべてのコラムを見る →
            </Link>
          </div>
        </div>
      </section>

      {/* 9. 最終CTA帯 */}
      <LpFinalCta />
    </div>
  );
}
