import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { legendClasses, tiers, difficulties } from "@/config/game";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { CharacterCard } from "@/components/game/character-card";
import { Badge } from "@/components/ui/badge";
import { LineCta } from "@/components/cta/line-cta";
import { legends } from "@/content/game-data/legends";

export const metadata: Metadata = createMetadata({
  title: "キャラクター攻略",
  description: "全レジェンドのアビリティ解説・立ち回り・おすすめ武器を徹底攻略",
  path: "/characters",
});

export default function CharactersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumb items={[{ label: "キャラクター攻略" }]} />

      <header className="mb-10">
        <h1 className="font-heading text-3xl font-black md:text-4xl">
          キャラクター攻略
        </h1>
        <p className="mt-3 text-text-muted">
          全レジェンドのアビリティ解説・立ち回り・おすすめ武器を徹底攻略。
          あなたのメインキャラ選びをサポートします。
        </p>
      </header>

      {/* フィルターエリア */}
      <div className="mb-8 rounded-xl border border-bg-elevated bg-bg-card p-5">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-text-muted">
          フィルター
        </h2>
        <div className="space-y-3">
          <div>
            <span className="mr-3 text-xs text-text-dim">クラス:</span>
            <div className="inline-flex flex-wrap gap-2">
              {legendClasses.map((cls) => (
                <Badge key={cls} variant="secondary">
                  {cls}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <span className="mr-3 text-xs text-text-dim">ティア:</span>
            <div className="inline-flex flex-wrap gap-2">
              {tiers.map((tier) => (
                <Badge
                  key={tier}
                  variant={
                    `tier-${tier.toLowerCase()}` as
                      | "tier-s"
                      | "tier-a"
                      | "tier-b"
                      | "tier-c"
                      | "tier-d"
                  }
                >
                  {tier}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <span className="mr-3 text-xs text-text-dim">難易度:</span>
            <div className="inline-flex flex-wrap gap-2">
              {difficulties.map((diff) => (
                <Badge key={diff} variant="outline">
                  {diff}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* キャラクター一覧 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {legends.map((legend) => (
          <CharacterCard
            key={legend.id}
            name={legend.name}
            nameJa={legend.nameJa}
            legendClass={legend.legendClass}
            tier={legend.tier}
            difficulty={legend.difficulty}
            pickRate={legend.pickRate}
            winRate={legend.winRate}
            description={legend.description}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16">
        <LineCta />
      </div>
    </div>
  );
}
