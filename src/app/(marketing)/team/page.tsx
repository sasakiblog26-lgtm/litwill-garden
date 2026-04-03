import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { brand } from "@/config/brand";
import { Breadcrumb } from "@/components/seo/breadcrumb";

export const metadata: Metadata = createMetadata({
  title: "チーム紹介",
  description: `${brand.name} 編集部のチーム紹介。Apex Legends 攻略メディアの運営チームをご紹介します。`,
  path: "/team",
});

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Breadcrumb items={[{ label: "チーム紹介" }]} />

      <header className="mb-10">
        <h1 className="font-heading text-3xl font-black md:text-4xl">
          チーム紹介
        </h1>
      </header>

      {/* チーム概要 */}
      <section className="mb-12">
        <div className="rounded-xl border border-bg-elevated bg-bg-card p-6 md:p-8">
          <h2 className="mb-4 font-heading text-2xl font-black text-primary">
            {brand.name} について
          </h2>
          <div className="space-y-4 text-text-muted">
            <p>
              {brand.name}{" "}
              は、Apex Legends の初心者から中級者を対象とした上達メディアです。
              エイム練習・立ち回り・キャラ選び・ランク攻略を、
              データと実践に基づいて体系的に解説しています。
            </p>
            <p>
              私たちのコンテンツは、実際のランクマッチ経験とプロシーンの分析をもとに作成されています。
              「読んで、練習して、ランクが上がる」をモットーに、
              あなたのApexライフをサポートします。
            </p>
            <p>
              運営は <strong className="text-text">{brand.operator}</strong>{" "}
              が担当しています。
              ご質問やフィードバックがございましたら、お気軽にお問い合わせください。
            </p>
          </div>
        </div>
      </section>

      {/* 運営者情報 */}
      <section id="operator" className="mb-12">
        <h2 className="mb-4 font-heading text-xl font-black">運営者情報</h2>
        <div className="rounded-xl border border-primary/30 bg-bg-card p-6 md:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary/20">
              <span className="font-heading text-2xl font-black text-primary">
                {brand.owner.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-text">
                {brand.owner.name}
              </h3>
              <p className="mb-3 text-sm text-text-muted">
                {brand.owner.role}
              </p>
              <div className="space-y-2 text-sm text-text-muted">
                <p>
                  {brand.name}{" "}
                  の企画・運営を統括しています。
                  Webメディアの立ち上げからコンテンツ制作、
                  SEO戦略までトータルにプロデュースしています。
                </p>
                <p>
                  ゲーム攻略コンテンツを通じて、プレイヤーの上達をサポートし、
                  eスポーツコミュニティの発展に貢献することを目指しています。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 編集方針 */}
      <section className="mb-12">
        <h2 className="mb-4 font-heading text-xl font-black">編集方針</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-bg-elevated bg-bg-card p-5">
            <h3 className="mb-2 font-heading font-bold text-primary">
              データに基づく解説
            </h3>
            <p className="text-sm text-text-muted">
              感覚的なアドバイスではなく、ピック率・勝率・DPSなどの客観的データに基づいて攻略情報を提供します。
            </p>
          </div>
          <div className="rounded-xl border border-bg-elevated bg-bg-card p-5">
            <h3 className="mb-2 font-heading font-bold text-secondary">
              初心者にもわかりやすく
            </h3>
            <p className="text-sm text-text-muted">
              専門用語には解説を添え、段階的に学べるコンテンツ構成を心がけています。
            </p>
          </div>
          <div className="rounded-xl border border-bg-elevated bg-bg-card p-5">
            <h3 className="mb-2 font-heading font-bold text-accent">
              最新メタへの対応
            </h3>
            <p className="text-sm text-text-muted">
              パッチノートやプロシーンの動向を追い、ティアリストや攻略情報を迅速に更新します。
            </p>
          </div>
          <div className="rounded-xl border border-bg-elevated bg-bg-card p-5">
            <h3 className="mb-2 font-heading font-bold">
              実践重視のアドバイス
            </h3>
            <p className="text-sm text-text-muted">
              理論だけでなく、実際のランクマッチで使えるテクニックとTipsを重視しています。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
