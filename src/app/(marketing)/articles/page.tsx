import type { Metadata } from "next";
import SectionHeader from "@/components/sections/section-header";
import ArticleCard from "@/components/sections/article-card";
import ConstellationField from "@/components/visual/constellation-field";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getAllArticles } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "占いコラム一覧",
  description:
    "占星術・タロット・数秘術・四柱推命、そして心理学の知恵をやさしく解説。自己理解・恋愛・人間関係のヒントが見つかる占いコラム一覧です。",
};

export default function ArticlesIndexPage() {
  const articles = getAllArticles().sort((a, b) =>
    a.date < b.date ? 1 : -1
  );

  return (
    <section style={{ background: "var(--bg-main)" }}>
      <ConstellationField density="sparse">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
          <SectionHeader
            eyebrow="Columns"
            title="占いコラム"
            sub="占星術・タロット・数秘術・四柱推命、そして心理学の知恵で、日々をもっと豊かに。"
          />

          {articles.length === 0 ? (
            <p
              style={{
                textAlign: "center",
                color: "var(--text-muted)",
                marginTop: 40,
              }}
            >
              準備中です。もうしばらくお待ちください。
            </p>
          ) : (
            <div
              className="resp-grid-3"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16,
                marginTop: 40,
              }}
            >
              {articles.map((article, i) => (
                <ScrollReveal key={article.slug} delay={(i % 3) as 0 | 1 | 2 | 3}>
                  <ArticleCard
                    title={article.title}
                    category={article.category}
                    publishedAt={article.date}
                    excerpt={article.excerpt}
                    href={`/articles/${article.slug}`}
                  />
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </ConstellationField>
    </section>
  );
}
