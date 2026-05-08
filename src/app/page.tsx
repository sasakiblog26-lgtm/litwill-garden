import Link from "next/link";
import { brand } from "@/config/brand";
import { Button } from "@/components/ui/button";
import { ArticleCard } from "@/components/article/article-card";
import { LineCta } from "@/components/cta/line-cta";
import { YoutubeCta } from "@/components/cta/youtube-cta";
import { JsonLd, websiteJsonLd } from "@/components/seo/json-ld";

const featuredTests = [
  {
    title: "【5分でわかる】あなたの本当の性格タイプ診断",
    slug: "personality-type-test",
    excerpt:
      "16タイプの性格分類をもとに、あなたの思考パターン・行動傾向・強みを分析します。",
    category: "性格診断",
    publishedAt: "2026-04-20",
  },
  {
    title: "恋愛スタイル診断｜あなたはどのタイプ？",
    slug: "love-style-test",
    excerpt:
      "心理学の愛着理論をベースに、あなたの恋愛パターンと相性のいい相手の特徴を診断。",
    category: "恋愛診断",
    publishedAt: "2026-04-15",
  },
  {
    title: "強み診断｜才能を言語化して仕事・人生に活かす",
    slug: "strengths-test",
    excerpt:
      "あなたが自然と発揮できる強みを可視化。キャリアや人間関係への活かし方まで解説。",
    category: "強み診断",
    publishedAt: "2026-04-10",
  },
];

const featuredFortune = [
  {
    title: "今月の星座占い｜12星座の運勢まとめ",
    slug: "monthly-horoscope",
    excerpt:
      "5月の総合運・恋愛運・仕事運を星座別に詳しく読み解きます。",
    category: "星座占い",
    publishedAt: "2026-05-01",
  },
  {
    title: "数秘術で知る｜あなたの本質数と人生テーマ",
    slug: "numerology-life-path",
    excerpt:
      "生年月日から導き出す「ライフパスナンバー」で、あなたの本質と使命を読み解きます。",
    category: "数秘術",
    publishedAt: "2026-04-25",
  },
  {
    title: "タロット占い入門｜カードが語るあなたへのメッセージ",
    slug: "tarot-introduction",
    excerpt:
      "大アルカナ22枚の意味と読み方を解説。日常の選択や迷いへのヒントを見つけましょう。",
    category: "タロット",
    publishedAt: "2026-04-18",
  },
];

export default function Home() {
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
            心理テスト・性格診断・占いを通じて、自分らしさを発見するメディア。
            <br className="hidden sm:block" />
            科学的な心理学をベースに、あなたの内面を楽しく、深く掘り下げます。
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/tests">
              <Button variant="default" size="lg">
                心理テストを受ける
              </Button>
            </Link>
            <Link href="/fortune">
              <Button variant="outline" size="lg">
                占いを見る
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 人気の心理テスト */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-heading text-2xl font-black md:text-3xl">
            人気の心理テスト
          </h2>
          <Link
            href="/tests"
            className="text-sm font-semibold text-primary hover:underline"
          >
            すべて見る &rarr;
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTests.map((item) => (
            <ArticleCard key={item.slug} {...item} />
          ))}
        </div>
      </section>

      {/* 占いコンテンツ */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-heading text-2xl font-black md:text-3xl">
            占い・スピリチュアル
          </h2>
          <Link
            href="/fortune"
            className="text-sm font-semibold text-primary hover:underline"
          >
            すべて見る &rarr;
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredFortune.map((item) => (
            <ArticleCard key={item.slug} {...item} />
          ))}
        </div>
      </section>

      {/* CTA セクション */}
      <section className="mx-auto max-w-6xl space-y-6 px-4 py-16">
        <LineCta />
        <YoutubeCta />
      </section>
    </>
  );
}
