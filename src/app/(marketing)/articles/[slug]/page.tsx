import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AdSlot } from "@/components/ads/ad-slot";
import { JsonLd, articleJsonLd, faqJsonLd } from "@/components/seo/json-ld";
import { ArticleGrid } from "@/components/article/article-grid";
import { ArticleToc } from "@/components/article/article-toc";
import { AuthorBox } from "@/components/article/author-box";
import { PopularArticles } from "@/components/article/popular-articles";
import {
  getArticleBySlug,
  getAllArticleSlugs,
  getRelatedArticles,
  getPopularArticles,
} from "@/lib/markdown";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** 記事カテゴリに応じて、最も関連の深い無料診断へのCTAを返す（記事→診断の内部リンク） */
function diagnosisCtaFor(category: string): { text: string; href: string; label: string } {
  switch (category) {
    case "タロット":
      return { text: "今日のあなたへのメッセージは？カードを1枚引いてみましょう。", href: "/tools/tarot", label: "✦ 無料でタロットを引く" };
    case "四柱推命":
      return { text: "あなたの生まれ持った五行タイプを調べてみませんか？", href: "/tools/gogyo", label: "✦ 無料で五行タイプ診断" };
    case "心理学":
    case "心理テスト":
    case "診断":
      return { text: "占星術×心理学であなたの本質を診断。あなたは16タイプのどれ？", href: "/tools/16types", label: "✦ 無料で16タイプ性格診断" };
    case "数秘術":
      return { text: "生年月日からあなたの数字を計算してみませんか？", href: "/tools/numerology", label: "✦ 無料で数秘術を計算" };
    default:
      return { text: "あなたの星座が映し出すメッセージを受け取りませんか？", href: "/diagnosis", label: "✦ 無料で星座診断する" };
  }
}

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
    maxWidth: "760px",
    margin: "40px auto",
    padding: "56px",
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 4px 28px rgba(45,36,72,0.08)",
  };

  const h1Style: CSSProperties = {
    fontFamily: "var(--lg-font-heading)",
    fontWeight: 700,
    fontSize: "28px",
    lineHeight: 1.4,
    color: "#1A1A1A",
    margin: "16px 0 8px",
  };

  const bylineStyle: CSSProperties = {
    fontSize: "14px",
    color: "#888",
    marginBottom: "28px",
  };

  const bodyStyle: CSSProperties = {
    fontSize: "16px",
    lineHeight: 1.95,
    letterSpacing: "0.02em",
    color: "#2A2A2A",
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

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  const formattedDate = fmtDate(article.date);
  const hasUpdate = !!article.updatedAt && article.updatedAt !== article.date;
  const formattedUpdated = article.updatedAt ? fmtDate(article.updatedAt) : "";

  const related = getRelatedArticles(slug, 3);
  const popular = getPopularArticles(5).filter((a) => a.slug !== slug);
  const faqs = article.faq ?? [];
  const diagCta = diagnosisCtaFor(article.category);

  return (
    <div style={outerStyle} className="article-paper">
      <JsonLd
        data={articleJsonLd({
          title: article.title,
          description: article.excerpt,
          slug,
          publishedAt: article.date,
          updatedAt: article.updatedAt,
        })}
      />
      {faqs.length > 0 && (
        <JsonLd
          data={faqJsonLd(
            faqs.map((f) => ({ question: f.q, answer: f.a }))
          )}
        />
      )}

      {/* Meta row */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
        <Link
          href={`/articles/category/${encodeURIComponent(article.category)}`}
          style={{ textDecoration: "none" }}
        >
          <Badge variant="lavender">{article.category}</Badge>
        </Link>
        <span style={{ fontSize: "13px", color: "#9A95B4" }}>
          公開 {formattedDate}
          {hasUpdate && (
            <span style={{ marginLeft: 8 }}>／更新 {formattedUpdated}</span>
          )}
        </span>
      </div>

      {/* Title */}
      <h1 style={h1Style}>{article.title}</h1>

      {/* Byline */}
      <p style={bylineStyle}>by Litwill Garden 編集部</p>

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "0 0 28px" }}>
          {article.tags.map((tag) => (
            <Link
              key={tag}
              href={`/articles/tag/${encodeURIComponent(tag)}`}
              style={{
                fontSize: 12,
                color: "var(--lg-lavender-700)",
                background: "var(--lg-lavender-100)",
                padding: "4px 12px",
                borderRadius: 999,
                textDecoration: "none",
              }}
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      {/* 目次（全記事・自動生成） */}
      <ArticleToc toc={article.toc} />

      {/* Body */}
      <div
        style={bodyStyle}
        className="article-body"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />

      {/* FAQ（frontmatter の faq があれば表示＋FAQ構造化データ） */}
      {faqs.length > 0 && (
        <div className="lg-faq">
          <h2
            style={{
              fontFamily: "var(--lg-font-heading)",
              fontWeight: 700,
              fontSize: "22px",
              color: "#1A1A1A",
              margin: "0 0 16px",
              paddingBottom: "10px",
              borderBottom: "2px solid var(--lg-gold)",
            }}
          >
            よくある質問
          </h2>
          {faqs.map((f, i) => (
            <div key={i} className="lg-faq-item">
              <p className="lg-faq-q">{f.q}</p>
              <p className="lg-faq-a">{f.a}</p>
            </div>
          ))}
        </div>
      )}

      {/* 記事内広告（NEXT_PUBLIC_ADSENSE_CLIENT / SLOT 設定時のみ表示） */}
      <AdSlot
        slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE}
        style={{ margin: "32px 0" }}
      />

      {/* CTA — 記事カテゴリに応じた診断へ送客（内部リンク） */}
      <div style={ctaStyle}>
        <p style={ctaTextStyle}>{diagCta.text}</p>
        <Button variant="primary" href={diagCta.href}>
          {diagCta.label}
        </Button>
      </div>

      {/* この記事を書いた人（信頼性・E-E-A-T） */}
      <AuthorBox />

      {/* 関連記事 */}
      {related.length > 0 && (
        <div style={{ marginTop: "48px" }}>
          <h2
            style={{
              fontFamily: "var(--lg-font-heading)",
              fontWeight: 700,
              fontSize: "20px",
              color: "#1A1A1A",
              margin: "0 0 4px",
              paddingBottom: "10px",
              borderBottom: "2px solid var(--lg-gold)",
            }}
          >
            あわせて読みたい
          </h2>
          <ArticleGrid articles={related} />
        </div>
      )}

      {/* 人気のコラム（キュレーション型ランキング） */}
      <PopularArticles articles={popular.slice(0, 5)} />
    </div>
  );
}
