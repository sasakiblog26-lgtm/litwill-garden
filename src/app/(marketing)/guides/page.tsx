import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { ArticleCard } from "@/components/article/article-card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = createMetadata({
  title: "記事・コラム",
  description: "心理学・自己理解・人間関係に関する読み応えあるコラム記事",
  path: "/guides",
});

const categories = [
  "すべて",
  "初心者ガイド",
  "立ち回り",
  "エイム練習",
  "メタ分析",
  "チーム戦術",
];

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
  {
    title: "勝てるランドマークの選び方｜初動で生き残るための降下戦略",
    slug: "landing-spot-strategy",
    excerpt:
      "マップごとのおすすめランドマークと、安全に初動を乗り切るためのポイントを解説。",
    category: "立ち回り",
    publishedAt: "2026-03-10",
  },
  {
    title: "3v3で勝つためのチーム連携術｜報告・カバー・フォーカスの基本",
    slug: "team-coordination-basics",
    excerpt:
      "チーム戦で差がつく連携のコツ。VC報告のテンプレートからカバーの動き方まで。",
    category: "チーム戦術",
    publishedAt: "2026-03-05",
  },
  {
    title: "リコイル制御の練習法｜R-301・フラットラインを完璧にコントロール",
    slug: "recoil-control-practice",
    excerpt:
      "主要武器のリコイルパターンと、射撃訓練場での効率的な練習方法をまとめました。",
    category: "エイム練習",
    publishedAt: "2026-02-28",
  },
];

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumb items={[{ label: "攻略ガイド" }]} />

      <header className="mb-10">
        <h1 className="font-heading text-3xl font-black md:text-4xl">
          攻略ガイド
        </h1>
        <p className="mt-3 text-text-muted">
          Apex Legends
          の立ち回り・エイム・戦術を体系的に解説する攻略ガイド集。
          初心者から中級者まで、ランクアップに必要な知識がここに。
        </p>
      </header>

      {/* カテゴリフィルター */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Badge
            key={cat}
            variant={cat === "すべて" ? "lavender" : "outline"}
            className="cursor-pointer"
          >
            {cat}
          </Badge>
        ))}
      </div>

      {/* 記事一覧 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sampleArticles.map((article) => (
          <ArticleCard key={article.slug} {...article} />
        ))}
      </div>
    </div>
  );
}
