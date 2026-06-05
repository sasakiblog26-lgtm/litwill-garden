import type { Metadata } from "next";
import SectionHeader from "@/components/sections/section-header";
import ConstellationField from "@/components/visual/constellation-field";
import { ArticleGrid } from "@/components/article/article-grid";
import { TaxonomyBar } from "@/components/article/taxonomy-bar";
import {
  getSortedArticles,
  getAllCategories,
  getAllTags,
} from "@/lib/markdown";

export const metadata: Metadata = {
  title: "占いコラム一覧",
  description:
    "占星術・タロット・数秘術・四柱推命、そして心理学の知恵をやさしく解説。自己理解・恋愛・人間関係のヒントが見つかる占いコラム一覧です。",
};

export default function ArticlesIndexPage() {
  const articles = getSortedArticles();
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <section style={{ background: "var(--bg-main)" }}>
      <ConstellationField density="sparse">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
          <SectionHeader
            eyebrow="Columns"
            title="占いコラム"
            sub="占星術・タロット・数秘術・四柱推命、そして心理学の知恵で、日々をもっと豊かに。"
          />

          <TaxonomyBar categories={categories} tags={tags} />

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
            <ArticleGrid articles={articles} />
          )}
        </div>
      </ConstellationField>
    </section>
  );
}
