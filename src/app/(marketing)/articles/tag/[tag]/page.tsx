import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionHeader from "@/components/sections/section-header";
import ConstellationField from "@/components/visual/constellation-field";
import { ArticleGrid } from "@/components/article/article-grid";
import { TaxonomyBar } from "@/components/article/taxonomy-bar";
import {
  getArticlesByTag,
  getAllCategories,
  getAllTags,
} from "@/lib/markdown";

type PageProps = {
  params: Promise<{ tag: string }>;
};

export function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: encodeURIComponent(t.name) }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const name = decodeURIComponent(tag);
  return {
    title: `#${name}のコラム一覧`,
    description: `「${name}」タグのついた占い・心理学コラムの一覧です。Litwill Garden が自己理解・恋愛・人間関係のヒントをお届けします。`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const name = decodeURIComponent(tag);
  const articles = getArticlesByTag(name);

  if (articles.length === 0) notFound();

  return (
    <section style={{ background: "var(--bg-main)" }}>
      <ConstellationField density="sparse">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
          <SectionHeader
            eyebrow="Tag"
            title={`#${name}`}
            sub={`「${name}」のコラム ${articles.length} 件`}
          />

          <TaxonomyBar
            categories={getAllCategories()}
            tags={getAllTags()}
            activeTag={name}
          />

          <ArticleGrid articles={articles} />
        </div>
      </ConstellationField>
    </section>
  );
}
