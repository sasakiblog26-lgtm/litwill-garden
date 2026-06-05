import Link from "next/link";
import type { CSSProperties } from "react";
import type { TaxonomyTerm } from "@/lib/markdown";

type TaxonomyBarProps = {
  categories: TaxonomyTerm[];
  tags?: TaxonomyTerm[];
  activeCategory?: string;
  activeTag?: string;
  /** タグの表示上限（多すぎる時に省略） */
  tagLimit?: number;
};

const wrapStyle: CSSProperties = {
  marginTop: 28,
  display: "flex",
  flexDirection: "column",
  gap: 16,
};

const rowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 8,
};

const labelStyle: CSSProperties = {
  fontFamily: "var(--lg-font-heading)",
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.1em",
  color: "var(--text-muted)",
  marginRight: 4,
};

function chipStyle(active: boolean): CSSProperties {
  return {
    fontSize: 13,
    fontWeight: 500,
    padding: "6px 14px",
    borderRadius: 999,
    textDecoration: "none",
    border: "1px solid var(--border-card)",
    background: active ? "var(--lg-lavender-500)" : "var(--bg-card)",
    color: active ? "#fff" : "var(--text-secondary)",
    transition: "background 0.2s ease, color 0.2s ease",
    whiteSpace: "nowrap",
  };
}

/** カテゴリ／タグのチップ導線。記事一覧・カテゴリ/タグページ上部に置く */
export function TaxonomyBar({
  categories,
  tags = [],
  activeCategory,
  activeTag,
  tagLimit = 20,
}: TaxonomyBarProps) {
  const shownTags = tags.slice(0, tagLimit);

  return (
    <div style={wrapStyle}>
      <div style={rowStyle}>
        <span style={labelStyle}>カテゴリ</span>
        <Link href="/articles" style={chipStyle(!activeCategory && !activeTag)}>
          すべて
        </Link>
        {categories.map((c) => (
          <Link
            key={c.name}
            href={`/articles/category/${encodeURIComponent(c.name)}`}
            style={chipStyle(activeCategory === c.name)}
          >
            {c.name}（{c.count}）
          </Link>
        ))}
      </div>

      {shownTags.length > 0 && (
        <div style={rowStyle}>
          <span style={labelStyle}>タグ</span>
          {shownTags.map((t) => (
            <Link
              key={t.name}
              href={`/articles/tag/${encodeURIComponent(t.name)}`}
              style={chipStyle(activeTag === t.name)}
            >
              #{t.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
