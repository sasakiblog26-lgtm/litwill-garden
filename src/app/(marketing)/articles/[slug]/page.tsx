import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { ArticleLayout } from "@/components/article/article-layout";
import { TableOfContents } from "@/components/article/table-of-contents";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // プレースホルダー: 実際にはCMSやMDXからデータを取得
  return createMetadata({
    title: "記事タイトル",
    description: "記事の概要がここに入ります。",
    path: `/articles/${slug}`,
  });
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        {/* メインコンテンツ */}
        <ArticleLayout
          title="【初心者必見】Apex Legends を始めたらまずやるべき10のこと"
          category="攻略ガイド"
          categoryHref="/guides"
          publishedAt="2026-03-25"
          updatedAt="2026-03-28"
        >
          <h2 id="introduction">はじめに</h2>
          <p>
            Apex Legends
            を始めたばかりの方に向けて、最初にやるべきことを10個にまとめました。
            この記事を読めば、初心者がつまずきやすいポイントを効率的にクリアできます。
          </p>

          <h2 id="settings">1. まずは設定を見直そう</h2>
          <p>
            デフォルトの設定は必ずしも最適ではありません。
            特に感度設定とFOV（視野角）は、プレイ体験に大きく影響するため、
            最初に調整することをおすすめします。
          </p>

          <h3 id="sensitivity">感度設定のポイント</h3>
          <p>
            初心者は低めの感度から始めるのがおすすめです。
            プロプレイヤーの多くも比較的低めの感度を使用しています。
            まずはDPI 800、ゲーム内感度
            1.5程度を基準に、自分に合った設定を見つけましょう。
          </p>

          <h2 id="training">2. 射撃訓練場で練習しよう</h2>
          <p>
            射撃訓練場はApexの練習に最適な場所です。
            武器の反動パターンを覚えたり、キャラクターのアビリティを試したり、
            移動テクニックを練習したりできます。
          </p>

          <h2 id="movement">3. 基本的な移動テクニック</h2>
          <p>
            Apexでは移動速度が非常に重要です。
            スライディングやジャンプを組み合わせた移動テクニックを覚えると、
            戦闘時の生存率が大幅に向上します。
          </p>

          <h2 id="positioning">4. 遮蔽物を意識する</h2>
          <p>
            常に遮蔽物の近くで戦うことを意識しましょう。
            開けた場所で撃ち合うのは、上級者でもリスクが高い行動です。
            建物の壁や岩などを背にして戦うだけで、生存率が劇的に変わります。
          </p>

          <h2 id="summary">まとめ</h2>
          <p>
            以上が初心者のうちに意識すべき基本的なポイントです。
            一度にすべてを完璧にしようとせず、一つずつ確実に身につけていきましょう。
            練習を続ければ、必ず上達します。
          </p>
        </ArticleLayout>

        {/* サイドバー */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents />
          </div>
        </aside>
      </div>
    </div>
  );
}
