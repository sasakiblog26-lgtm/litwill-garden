import Link from "next/link";
import { brand } from "@/config/brand";
import { Button } from "@/components/ui/button";
import { ArticleCard } from "@/components/article/article-card";
import { LineCta } from "@/components/cta/line-cta";
import { YoutubeCta } from "@/components/cta/youtube-cta";
import { JsonLd, websiteJsonLd } from "@/components/seo/json-ld";

const featuredTools = [
  {
    title: "MBTIで見る思考と行動のクセ",
    slug: "mbti",
    href: "/tools/mbti",
    excerpt:
      "性格タイプを入口に、意思決定・対人関係・ストレス反応の傾向を整理します。",
    category: "心理診断",
    publishedAt: "2026-04-20",
  },
  {
    title: "相性診断｜関係性のすれ違いを見つめる",
    slug: "compatibility",
    href: "/tools/compatibility",
    excerpt:
      "恋愛や人間関係で起きやすい距離感の違いを、心理学の視点で読み解きます。",
    category: "恋愛心理",
    publishedAt: "2026-04-15",
  },
  {
    title: "数秘術で知る人生テーマ",
    slug: "numerology",
    href: "/tools/numerology",
    excerpt:
      "生年月日から導く数字を、自己理解のヒントとしてやさしく読み解きます。",
    category: "数秘術",
    publishedAt: "2026-04-10",
  },
];

const featuredFortune = [
  {
    title: "今日の気持ちを整える占い",
    slug: "fortune",
    href: "/fortune",
    excerpt:
      "一日の選択に迷ったとき、自分の内側を見つめるための占いコンテンツ。",
    category: "占い",
    publishedAt: "2026-05-01",
  },
  {
    title: "星座占いで見る今のテーマ",
    slug: "zodiac",
    href: "/tools/zodiac",
    excerpt:
      "星座ごとの傾向を、恋愛・仕事・人間関係のヒントとして受け取れます。",
    category: "星座占い",
    publishedAt: "2026-04-25",
  },
  {
    title: "鑑定で言葉にする、今の悩み",
    slug: "fortune-reading",
    href: "/fortune/reading",
    excerpt:
      "占いをきっかけに、いま抱えている感情や選択肢を整理していきます。",
    category: "鑑定",
    publishedAt: "2026-04-18",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />

      {/* ヒーローセクション */}
      <section className="relative overflow-hidden px-4 py-16 md:py-24">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_360px]">
          <div className="text-center lg:text-left">
            <p className="mx-auto mb-4 w-fit rounded-full border border-primary/20 bg-white/50 px-4 py-1.5 text-xs font-bold tracking-[0.18em] text-primary lg:mx-0">
              PSYCHOLOGY AND FORTUNE
            </p>
            <h1 className="font-heading text-4xl font-black leading-tight tracking-tight md:text-6xl">
              <span className="text-primary">{brand.tagline}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-text-muted md:text-xl lg:mx-0">
              心理学をベースに、性格診断・恋愛分析・占いを通じて、自分らしさを発見するメディア。
              <br className="hidden sm:block" />
              占いは未来を決めつけるものではなく、自分の気持ちを見つめるためのやさしい入口です。
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Link href="/tools">
                <Button variant="default" size="lg">
                  心理診断を受ける
                </Button>
              </Link>
              <Link href="/fortune">
                <Button variant="outline" size="lg">
                  占いを見る
                </Button>
              </Link>
            </div>
          </div>

          <div className="celestial-panel mx-auto aspect-square w-full max-w-[360px] rounded-full p-8">
            <div className="relative h-full rounded-full border border-primary/25 bg-[radial-gradient(circle,rgba(124,107,168,0.2),rgba(255,255,255,0.48)_54%,rgba(134,168,216,0.16))]">
              <div className="absolute inset-8 rounded-full border border-white/70" />
              <div className="absolute inset-14 rounded-full border border-primary/20" />
              <div className="absolute left-1/2 top-6 h-[calc(100%-48px)] w-px -translate-x-1/2 bg-white/70" />
              <div className="absolute left-6 top-1/2 h-px w-[calc(100%-48px)] -translate-y-1/2 bg-white/70" />
              <div className="absolute inset-[30%] rotate-45 border border-primary/20" />
              <div className="absolute left-1/2 top-1/2 h-20 w-14 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[40%_60%_45%_55%] border border-white/80 bg-white/45 shadow-[0_0_40px_rgba(255,255,255,0.8)]" />
              <div className="absolute left-[22%] top-[24%] h-2 w-2 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.9)]" />
              <div className="absolute right-[20%] top-[30%] h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
              <div className="absolute bottom-[24%] left-[28%] h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
              <div className="absolute bottom-[22%] right-[24%] h-2 w-2 rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.9)]" />
              <p className="absolute inset-x-0 bottom-8 text-center text-xs font-bold tracking-[0.22em] text-primary/80">
                SOUL MAP
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 人気の心理診断 */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-heading text-2xl font-black md:text-3xl">
            人気の心理診断
          </h2>
          <Link
            href="/tools"
            className="text-sm font-semibold text-primary hover:underline"
          >
            すべて見る &rarr;
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((item) => (
            <ArticleCard key={item.slug} {...item} />
          ))}
        </div>
      </section>

      {/* 占いコンテンツ */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-heading text-2xl font-black md:text-3xl">
            占いコンテンツ
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
