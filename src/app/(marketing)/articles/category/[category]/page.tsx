import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionHeader from "@/components/sections/section-header";
import ConstellationField from "@/components/visual/constellation-field";
import { ArticleGrid } from "@/components/article/article-grid";
import { TaxonomyBar } from "@/components/article/taxonomy-bar";
import {
  getArticlesByCategory,
  getAllCategories,
  getAllTags,
} from "@/lib/markdown";

type PageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  // Next.js が自動でURLエンコードするため、生の文字列を渡す（encodeすると二重エンコードになる）
  return getAllCategories().map((c) => ({ category: c.name }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;
  const name = decodeURIComponent(category);
  return {
    title: `${name}のコラム一覧`,
    description: `「${name}」に関する占い・心理学コラムの一覧です。Litwill Garden が自己理解・恋愛・人間関係のヒントをお届けします。`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const name = decodeURIComponent(category);
  const articles = getArticlesByCategory(name);

  if (articles.length === 0) notFound();

  return (
    <section style={{ background: "var(--bg-main)" }}>
      <ConstellationField density="sparse">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
          <SectionHeader
            eyebrow="Category"
            title={name}
            sub={`「${name}」のコラム ${articles.length} 件`}
          />

          <TaxonomyBar
            categories={getAllCategories()}
            tags={getAllTags()}
            activeCategory={name}
          />

          <ArticleGrid articles={articles} />
        </div>
      </ConstellationField>
    </section>
  );
}
