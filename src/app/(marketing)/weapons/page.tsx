import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { weaponCategories } from "@/config/game";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { WeaponCard } from "@/components/game/weapon-card";
import { LineCta } from "@/components/cta/line-cta";
import { weapons } from "@/content/game-data/weapons";

export const metadata: Metadata = createMetadata({
  title: "武器攻略",
  description: "全武器のダメージ・リコイル・おすすめアタッチメントを詳細解説",
  path: "/weapons",
});

export default function WeaponsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumb items={[{ label: "武器攻略" }]} />

      <header className="mb-10">
        <h1 className="font-heading text-3xl font-black md:text-4xl">
          武器攻略
        </h1>
        <p className="mt-3 text-text-muted">
          全武器のダメージ・DPS・リコイルパターンを詳細解説。
          カテゴリ別に最適な武器を見つけよう。
        </p>
      </header>

      {/* カテゴリ別武器一覧 */}
      {weaponCategories.map((category) => {
        const categoryWeapons = weapons.filter(
          (w) => w.category === category
        );
        if (categoryWeapons.length === 0) return null;

        return (
          <section key={category} className="mb-12">
            <h2 className="mb-4 font-heading text-xl font-black">
              {category}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categoryWeapons.map((weapon) => (
                <WeaponCard
                  key={weapon.id}
                  name={weapon.name}
                  nameJa={weapon.nameJa}
                  category={weapon.category}
                  ammoType={weapon.ammoType}
                  damage={weapon.damage}
                  dps={weapon.dps}
                  tier={weapon.tier}
                  magazine={weapon.magazine}
                />
              ))}
            </div>
          </section>
        );
      })}

      <LineCta />
    </div>
  );
}
