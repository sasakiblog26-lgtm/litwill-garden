import Link from "next/link";
import { brand } from "@/config/brand";
import { Button } from "@/components/ui/button";
import { ArticleCard } from "@/components/article/article-card";
import { TierList } from "@/components/game/tier-list";
import { LineCta } from "@/components/cta/line-cta";
import { YoutubeCta } from "@/components/cta/youtube-cta";
import { JsonLd, websiteJsonLd } from "@/components/seo/json-ld";
import { legendTierList } from "@/content/game-data/tier-list";
import type { Tier } from "@/config/game";

/** サンプル記事データ（プレースホルダー） */
const sampleArticles = [
  {
    title: "【初心者必見】Apex Legends を始めたらまずやるべき10のこと",
    slug: "beginner-guide-top10",
    excerpt:
      "Apexを始めたばかりの方向けに、設定・立ち回り・練習方法を体系的に解説します。",
    category: "初心者ガイド",
    publishedAt: "2026-03-25",
  },
  {
    title: "シーズン22 最強キャラランキング｜メタ環境を徹底解説",
    slug: "season22-meta-characters",
    excerpt:
      "最新シーズンのメタ環境を分析し、ランクマッチで勝てるキャラクターを紹介。",
    category: "メタ分析",
    publishedAt: "2026-03-20",
  },
  {
    title: "エイム練習の完全ガイド｜毎日15分で劇的に上達する方法",
    slug: "aim-training-complete-guide",
    excerpt:
      "Aim Lab・Kovaak'sを使った効率的な練習メニューと、意識すべきポイントを解説。",
    category: "エイム練習",
    publishedAt: "2026-03-15",
  },
];

export default function Home() {
  // ティアリストデータをTierListコンポーネント用に変換
  const tierListItems = Object.entries(legendTierList.tiers).flatMap(
    ([tier, names]) =>
      names.map((name) => ({ name, tier: tier as Tier }))
  );

  return (
    <>
      <JsonLd data={websiteJsonLd()} />

      {/* ヒーローセクション */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <h1 className="font-heading text-4xl font-black leading-tight tracking-tight md:text-6xl">
            <span className="text-primary">{brand.tagline}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-text-muted md:text-xl">
            エイム練習・立ち回り・キャラ選び・ランク攻略をデータと実践に基づいて体系的に解説。
            <br className="hidden sm:block" />
            初心者からダイヤを目指す中級者まで、あなたのランクアップを全力サポート。
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/guides">
              <Button variant="default" size="lg">
                攻略ガイドを読む
              </Button>
            </Link>
            <Link href="/characters">
              <Button variant="outline" size="lg">
                キャラクター攻略
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 最新記事セクション */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-heading text-2xl font-black md:text-3xl">
            最新の攻略記事
          </h2>
          <Link
            href="/guides"
            className="text-sm font-semibold text-primary hover:underline"
          >
            すべて見る &rarr;
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sampleArticles.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))}
        </div>
      </section>

      {/* キャラティアリストプレビュー */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-heading text-2xl font-black md:text-3xl">
              キャラクターティアリスト
            </h2>
            <p className="mt-1 text-sm text-text-muted">
              {legendTierList.season} | 更新日: {legendTierList.lastUpdated}
            </p>
          </div>
          <Link
            href="/tier-list"
            className="text-sm font-semibold text-primary hover:underline"
          >
            詳しく見る &rarr;
          </Link>
        </div>
        <TierList items={tierListItems} type="legend" />
      </section>

      {/* CTA セクション */}
      <section className="mx-auto max-w-6xl space-y-6 px-4 py-16">
        <LineCta />
        <YoutubeCta />
      </section>
    </>
  );
}
