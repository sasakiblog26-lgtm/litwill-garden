import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getArticleBySlug, getAllArticleSlugs } from "@/lib/markdown";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const article = await getArticleBySlug(slug);
    return {
      title: article.title,
      description: article.excerpt,
    };
  } catch {
    return { title: "記事が見つかりません" };
  }
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let article;
  try {
    article = await getArticleBySlug(slug);
  } catch {
    notFound();
  }

  // ── Layout ──────────────────────────────────────────────────────────────
  const outerStyle: CSSProperties = {
    maxWidth: "720px",
    margin: "0 auto",
    padding: "48px 24px",
  };

  const h1Style: CSSProperties = {
    fontFamily: "var(--lg-font-heading)",
    fontWeight: 700,
    fontSize: "28px",
    lineHeight: 1.4,
    color: "var(--text-primary)",
    margin: "16px 0 8px",
  };

  const bylineStyle: CSSProperties = {
    fontSize: "14px",
    color: "#9A95B4",
    marginBottom: "28px",
  };

  const bodyStyle: CSSProperties = {
    fontSize: "15px",
    lineHeight: 2.0,
    color: "var(--text-secondary)",
  };

  const ctaStyle: CSSProperties = {
    background: "var(--bg-lavender-band)",
    textAlign: "center",
    padding: "24px",
    borderRadius: "20px",
    marginTop: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
  };

  const ctaTextStyle: CSSProperties = {
    fontFamily: "var(--lg-font-heading)",
    fontWeight: 600,
    fontSize: "16px",
    color: "var(--text-primary)",
    margin: 0,
  };

  const formattedDate = new Date(article.date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div style={outerStyle}>
      {/* Meta row */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
        <Badge variant="lavender">{article.category}</Badge>
        <span style={{ fontSize: "13px", color: "#9A95B4" }}>{formattedDate}</span>
      </div>

      {/* Title */}
      <h1 style={h1Style}>{article.title}</h1>

      {/* Byline */}
      <p style={bylineStyle}>by Litwill Garden 編集部</p>

      {/* Body */}
      <div
        style={bodyStyle}
        className="article-body"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />

      {/* CTA */}
      <div style={ctaStyle}>
        <p style={ctaTextStyle}>あなたの星座が映し出すメッセージを受け取りませんか？</p>
        <Button variant="primary" href="/diagnosis">
          ✦ 無料で星座診断する
        </Button>
      </div>
    </div>
  );
}
