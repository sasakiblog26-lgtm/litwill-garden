import Link from "next/link";
import type { CSSProperties } from "react";
import type { ArticleListItem } from "@/lib/markdown";

const wrapStyle: CSSProperties = {
  margin: "48px 0 0",
};

const headingStyle: CSSProperties = {
  fontFamily: "var(--lg-font-heading)",
  fontWeight: 700,
  fontSize: "20px",
  color: "#1A1A1A",
  margin: "0 0 16px",
  paddingBottom: "10px",
  borderBottom: "2px solid var(--lg-gold)",
};

const itemStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  padding: "12px 0",
  borderBottom: "1px solid var(--border-card)",
  textDecoration: "none",
};

function rankStyle(rank: number): CSSProperties {
  const colors = ["#D4AF37", "#A9A9B5", "#C08552"]; // 金・銀・銅
  return {
    flexShrink: 0,
    width: 28,
    height: 28,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 14,
    color: rank <= 3 ? "#fff" : "var(--text-secondary)",
    background: rank <= 3 ? colors[rank - 1] : "var(--lg-lavender-100)",
  };
}

/** 人気記事ランキング（キュレーション型） */
export function PopularArticles({
  articles,
  title = "人気のコラム",
}: {
  articles: ArticleListItem[];
  title?: string;
}) {
  if (articles.length === 0) return null;

  return (
    <div style={wrapStyle}>
      <h2 style={headingStyle}>{title}</h2>
      {articles.map((a, i) => (
        <Link key={a.slug} href={`/articles/${a.slug}`} style={itemStyle}>
          <span style={rankStyle(i + 1)}>{i + 1}</span>
          <span
            style={{
              fontFamily: "var(--lg-font-heading)",
              fontSize: 15,
              color: "var(--text-primary)",
              lineHeight: 1.5,
            }}
          >
            {a.title}
          </span>
        </Link>
      ))}
    </div>
  );
}
