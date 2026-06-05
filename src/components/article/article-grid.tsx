import type { CSSProperties } from "react";
import ArticleCard from "@/components/sections/article-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { ArticleListItem } from "@/lib/markdown";

const THUMB_POSITIONS = ["0% 0%", "100% 0%", "0% 50%"];

const gridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 16,
  marginTop: 40,
};

/** 記事カードのグリッド（レスポンシブで 3→2→1 列） */
export function ArticleGrid({ articles }: { articles: ArticleListItem[] }) {
  return (
    <div className="resp-grid-3" style={gridStyle}>
      {articles.map((article, i) => (
        <ScrollReveal key={article.slug} delay={(i % 3) as 0 | 1 | 2 | 3}>
          <ArticleCard
            title={article.title}
            category={article.category}
            publishedAt={article.date}
            excerpt={article.excerpt}
            thumbPosition={THUMB_POSITIONS[i % THUMB_POSITIONS.length]}
            href={`/articles/${article.slug}`}
          />
        </ScrollReveal>
      ))}
    </div>
  );
}
