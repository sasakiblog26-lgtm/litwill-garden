import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo/metadata";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { StatsDisplay } from "@/components/game/stats-display";
import { CharacterCard } from "@/components/game/character-card";
import { LineCta } from "@/components/cta/line-cta";
import { legends } from "@/content/game-data/legends";
import type { Tier } from "@/config/game";

/** ティアをバッジvariantに変換 */
const tierVariant: Record<Tier, "tier-s" | "tier-a" | "tier-b" | "tier-c" | "tier-d"> = {
  S: "tier-s",
  A: "tier-a",
  B: "tier-b",
  C: "tier-c",
  D: "tier-d",
};

/** アビリティタイプのラベル */
const abilityLabels: Record<string, string> = {
  passive: "パッシブ",
  tactical: "戦術アビリティ",
  ultimate: "アルティメット",
};

/** アビリティタイプのアイコンカラー */
const abilityColors: Record<string, string> = {
  passive: "border-l-secondary",
  tactical: "border-l-primary",
  ultimate: "border-l-accent",
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return legends.map((legend) => ({ slug: legend.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const legend = legends.find((l) => l.slug === slug);
  if (!legend) return {};

  return createMetadata({
    title: `${legend.nameJa}（${legend.name}）攻略`,
    description: legend.description,
    path: `/characters/${slug}`,
  });
}

export default async function CharacterDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const legend = legends.find((l) => l.slug === slug);
  if (!legend) notFound();

  const relatedLegends = legends.filter(
    (l) => l.legendClass === legend.legendClass && l.id !== legend.id
  );

  const stats = [
    { label: "ピックレート", value: legend.pickRate },
    { label: "勝率", value: legend.winRate },
    { label: "ティア", value: legend.tier },
    { label: "難易度", value: legend.difficulty },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Breadcrumb
        items={[
          { label: "キャラクター攻略", href: "/characters" },
          { label: legend.nameJa },
        ]}
      />

      {/* ヘッダー */}
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <Badge variant={tierVariant[legend.tier]}>Tier {legend.tier}</Badge>
          <Badge variant="secondary">{legend.legendClass}</Badge>
          <Badge variant="outline">{legend.difficulty}</Badge>
        </div>
        <h1 className="font-heading text-3xl font-black md:text-4xl">
          {legend.nameJa}
          <span className="ml-3 text-lg text-text-muted">{legend.name}</span>
        </h1>
        <p className="mt-3 text-text-muted">{legend.description}</p>
      </header>

      {/* 統計情報 */}
      <section className="mb-12">
        <h2 className="mb-4 font-heading text-xl font-black">統計データ</h2>
        <StatsDisplay stats={stats} />
      </section>

      {/* アビリティ */}
      <section className="mb-12">
        <h2 className="mb-4 font-heading text-xl font-black">アビリティ</h2>
        <div className="space-y-4">
          {legend.abilities.map((ability) => (
            <div
              key={ability.type}
              className={`rounded-xl border border-bg-elevated bg-bg-card p-5 border-l-4 ${abilityColors[ability.type]}`}
            >
              <div className="mb-1 flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-text-dim">
                  {abilityLabels[ability.type]}
                </span>
              </div>
              <h3 className="font-heading text-lg font-bold">{ability.name}</h3>
              <p className="mt-1 text-sm text-text-muted">
                {ability.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 立ち回りのコツ */}
      <section className="mb-12">
        <h2 className="mb-4 font-heading text-xl font-black">
          立ち回りのコツ
        </h2>
        <ul className="space-y-3">
          {legend.tips.map((tip, i) => (
            <li
              key={i}
              className="flex gap-3 rounded-lg border border-bg-elevated bg-bg-card p-4"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                {i + 1}
              </span>
              <span className="text-sm text-text-muted">{tip}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 関連キャラクター */}
      {relatedLegends.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 font-heading text-xl font-black">
            同じクラスのレジェンド
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedLegends.map((related) => (
              <CharacterCard
                key={related.id}
                name={related.name}
                nameJa={related.nameJa}
                legendClass={related.legendClass}
                tier={related.tier}
                difficulty={related.difficulty}
                pickRate={related.pickRate}
                winRate={related.winRate}
                description={related.description}
              />
            ))}
          </div>
        </section>
      )}

      <LineCta />
    </div>
  );
}
