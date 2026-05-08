import Link from "next/link";
import { brand } from "@/config/brand";
import { ArticleCard } from "@/components/article/article-card";
import { LineCta } from "@/components/cta/line-cta";
import { YoutubeCta } from "@/components/cta/youtube-cta";
import { JsonLd, websiteJsonLd } from "@/components/seo/json-ld";

const featuredReadings = [
  {
    title: "今日の気持ちを整えるワンカードリーディング",
    slug: "fortune",
    href: "/fortune",
    excerpt:
      "迷いがある朝に、いま必要な問いと小さな行動をカードから受け取ります。",
    category: "占い",
    publishedAt: "2026-05-01",
  },
  {
    title: "星座占いで見る、今月の心のテーマ",
    slug: "zodiac",
    href: "/tools/zodiac",
    excerpt:
      "12星座ごとの流れを、恋愛、仕事、人間関係のヒントとして読み解きます。",
    category: "星座",
    publishedAt: "2026-04-25",
  },
  {
    title: "心理学でほどく、恋愛のすれ違い",
    slug: "compatibility",
    href: "/tools/compatibility",
    excerpt:
      "相手との距離感や反応の違いを、責めずに理解するための診断です。",
    category: "心理",
    publishedAt: "2026-04-15",
  },
];

const tools = [
  {
    title: "MBTI診断",
    href: "/tools/mbti",
    text: "性格タイプから思考と行動のクセを見つめる",
  },
  {
    title: "相性診断",
    href: "/tools/compatibility",
    text: "恋愛や人間関係のすれ違いをやさしく整理する",
  },
  {
    title: "数秘術",
    href: "/tools/numerology",
    text: "生年月日の数字から人生テーマを読み解く",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />

      <section className="relative isolate min-h-[76vh] overflow-hidden px-5 py-20 text-white md:px-6 md:py-24">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/backgrounds.jpg')" }}
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(26,20,48,0.86),rgba(45,36,72,0.58)_48%,rgba(26,20,48,0.25))]" />
        <div className="mx-auto flex min-h-[54vh] max-w-[1100px] items-center">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-bold tracking-[0.24em] text-secondary">
              SPIRITUAL READING MEDIA
            </p>
            <h1 className="font-display text-5xl font-bold leading-tight tracking-normal md:text-7xl">
              {brand.name}
            </h1>
            <p className="mt-4 font-heading text-2xl font-semibold leading-relaxed md:text-4xl">
              {brand.tagline}
            </p>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#F0EAF8] md:text-lg">
              {brand.subtagline}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/fortune"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-7 text-sm font-bold text-white shadow-[0_16px_38px_rgba(155,139,191,0.32)] transition hover:bg-primary-dark"
              >
                無料で診断する
              </Link>
              <Link
                href="/articles/self-understanding-guide"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/55 bg-white/10 px-7 text-sm font-bold text-white backdrop-blur transition hover:bg-white/18"
              >
                コラムを読む
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1100px] gap-4 px-5 py-12 md:grid-cols-3 md:px-6">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="celestial-panel rounded-lg p-5 transition-all hover:border-primary/35 hover:shadow-[0_18px_48px_rgba(80,64,120,0.15)]"
          >
            <p className="mb-2 text-xs font-bold tracking-[0.14em] text-primary">
              FREE TOOL
            </p>
            <h2 className="font-heading text-xl font-black text-text">
              {tool.title}
            </h2>
            <p className="mt-2 text-sm leading-7 text-text-muted">{tool.text}</p>
          </Link>
        ))}
      </section>

      <section className="mx-auto max-w-[1100px] px-5 py-12 md:px-6">
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.18em] text-primary">
              FEATURED
            </p>
            <h2 className="font-heading text-3xl font-black text-text">
              今のあなたに届く読みもの
            </h2>
          </div>
          <Link
            href="/guides"
            className="text-sm font-bold text-primary transition-colors hover:text-primary-dark"
          >
            すべて見る
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredReadings.map((item) => (
            <ArticleCard key={item.slug} {...item} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1100px] gap-6 px-5 py-12 md:px-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="overflow-hidden rounded-lg">
          <img
            src="/images/reader.jpg"
            alt="カードリーディングのイメージ"
            className="h-full min-h-[320px] w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="mb-3 text-xs font-bold tracking-[0.18em] text-primary">
            PHILOSOPHY
          </p>
          <h2 className="font-heading text-3xl font-black leading-snug text-text md:text-4xl">
            占いは未来を決めるものではなく、心の声を聞くための鏡です。
          </h2>
          <p className="mt-5 text-base leading-8 text-text-muted">
            Litwill Gardenでは、星やカードの象徴を心理学の視点と合わせて読み解きます。
            答えを急がず、あなたが本当に大切にしたいものへ静かに戻れる場所を目指しています。
          </p>
          <div className="mt-7">
            <Link
              href="/team"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-primary/35 bg-white/45 px-6 text-sm font-bold text-text-muted transition hover:border-primary hover:bg-white/75"
            >
              Litwill Gardenについて
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1100px] gap-5 px-5 py-14 md:px-6 lg:grid-cols-2">
        <LineCta />
        <YoutubeCta />
      </section>
    </>
  );
}
