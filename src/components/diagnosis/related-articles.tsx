import Link from "next/link";
import { getArticlesByCategory, getArticlesByTag, type ArticleListItem } from "@/lib/markdown";

interface RelatedArticlesProps {
  /** 関連付けるカテゴリ（複数可・優先順） */
  categories?: string[];
  /** 関連付けるタグ（カテゴリで足りない場合の補完） */
  tags?: string[];
  /** 見出し */
  title?: string;
  /** 表示件数 */
  limit?: number;
}

/**
 * 診断の深掘りページから関連コラムへ送客する内部リンクセクション（サーバーコンポーネント）。
 * 指定カテゴリ→タグの順に記事を集め、重複を除いて新しい順に表示する。
 */
export default function RelatedArticles({
  categories = [],
  tags = [],
  title = "関連コラムを読む",
  limit = 4,
}: RelatedArticlesProps) {
  const seen = new Set<string>();
  const collected: ArticleListItem[] = [];

  const push = (items: ArticleListItem[]) => {
    for (const a of items) {
      if (!seen.has(a.slug)) {
        seen.add(a.slug);
        collected.push(a);
      }
    }
  };

  categories.forEach((c) => push(getArticlesByCategory(c)));
  tags.forEach((t) => push(getArticlesByTag(t)));

  const articles = collected
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, limit);

  if (articles.length === 0) return null;

  return (
    <div
      style={{
        background: "rgba(91, 33, 182, 0.12)",
        border: "1px solid rgba(167, 139, 250, 0.22)",
        borderRadius: "1rem",
        padding: "1.4rem 1.5rem",
        textAlign: "left",
        marginBottom: "1rem",
      }}
    >
      <h2 style={{ color: "#c084fc", fontSize: "1rem", fontWeight: 700, marginBottom: "1rem" }}>📖 {title}</h2>
      <div className="space-y-3">
        {articles.map((a) => (
          <Link key={a.slug} href={`/articles/${a.slug}`} className="block group">
            <div
              style={{
                background: "rgba(124,58,237,0.12)",
                border: "1px solid rgba(167,139,250,0.25)",
                borderRadius: "0.75rem",
                padding: "0.9rem 1.1rem",
              }}
              className="hover:bg-purple-700/25 transition-colors"
            >
              <span
                style={{
                  background: "rgba(109, 40, 217, 0.3)",
                  border: "1px solid rgba(167, 139, 250, 0.3)",
                  borderRadius: "9999px",
                  padding: "0.1rem 0.6rem",
                  color: "#c084fc",
                  fontSize: "0.65rem",
                }}
              >
                {a.category}
              </span>
              <p className="text-white font-bold text-sm mt-2 mb-1 leading-snug">{a.title}</p>
              <p className="text-purple-300 text-xs leading-relaxed line-clamp-2">{a.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
