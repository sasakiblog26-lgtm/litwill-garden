import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/seo/metadata";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { StatsDisplay } from "@/components/game/stats-display";
import { LineCta } from "@/components/cta/line-cta";
import { weapons } from "@/content/game-data/weapons";
import type { Tier } from "@/config/game";

const tierVariant: Record<Tier, "tier-s" | "tier-a" | "tier-b" | "tier-c" | "tier-d"> = {
  S: "tier-s",
  A: "tier-a",
  B: "tier-b",
  C: "tier-c",
  D: "tier-d",
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return weapons.map((weapon) => ({ slug: weapon.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const weapon = weapons.find((w) => w.slug === slug);
  if (!weapon) return {};

  return createMetadata({
    title: `${weapon.nameJa}（${weapon.name}）攻略`,
    description: weapon.description,
    path: `/weapons/${slug}`,
  });
}

export default async function WeaponDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const weapon = weapons.find((w) => w.slug === slug);
  if (!weapon) notFound();

  const stats = [
    { label: "ダメージ", value: weapon.damage },
    { label: "ヘッドショット", value: weapon.headshot },
    { label: "発射レート", value: weapon.fireRate, unit: "RPM" },
    { label: "DPS", value: weapon.dps },
    { label: "マガジン", value: weapon.magazine, unit: "発" },
  ];

  const relatedWeapons = weapons.filter(
    (w) => w.category === weapon.category && w.id !== weapon.id
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Breadcrumb
        items={[
          { label: "武器攻略", href: "/weapons" },
          { label: weapon.nameJa },
        ]}
      />

      {/* ヘッダー */}
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <Badge variant={tierVariant[weapon.tier]}>Tier {weapon.tier}</Badge>
          <Badge variant="outline">{weapon.category}</Badge>
          <Badge variant="secondary">{weapon.ammoType}弾</Badge>
        </div>
        <h1 className="font-heading text-3xl font-black md:text-4xl">
          {weapon.nameJa}
          <span className="ml-3 text-lg text-text-muted">{weapon.name}</span>
        </h1>
        <p className="mt-3 text-text-muted">{weapon.description}</p>
      </header>

      {/* ステータス */}
      <section className="mb-12">
        <h2 className="mb-4 font-heading text-xl font-black">武器ステータス</h2>
        <StatsDisplay stats={stats} />
      </section>

      {/* カテゴリ情報 */}
      <section className="mb-12">
        <h2 className="mb-4 font-heading text-xl font-black">カテゴリ情報</h2>
        <div className="rounded-xl border border-bg-elevated bg-bg-card p-5">
          <p className="text-text-muted">
            <strong className="text-text">{weapon.category}</strong>
            カテゴリの武器です。弾薬タイプは
            <strong className="text-text">{weapon.ammoType}</strong>
            を使用します。
          </p>
        </div>
      </section>

      {/* 同カテゴリの武器 */}
      {relatedWeapons.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 font-heading text-xl font-black">
            同じカテゴリの武器
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {relatedWeapons.map((w) => (
              <div
                key={w.id}
                className="rounded-xl border border-bg-elevated bg-bg-card p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-heading font-bold">{w.nameJa}</p>
                    <p className="text-xs text-text-muted">{w.name}</p>
                  </div>
                  <Badge variant={tierVariant[w.tier]}>{w.tier}</Badge>
                </div>
                <div className="mt-2 flex gap-4 text-xs text-text-dim">
                  <span>DMG: {w.damage}</span>
                  <span>DPS: {w.dps}</span>
                  <span>MAG: {w.magazine}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <LineCta />
    </div>
  );
}
