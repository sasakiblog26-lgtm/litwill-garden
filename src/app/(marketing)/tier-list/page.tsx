"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TierList } from "@/components/game/tier-list";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { legendTierList, weaponTierList } from "@/content/game-data/tier-list";
import type { Tier } from "@/config/game";

/** TierListDataからTierListItem[]に変換するヘルパー */
function toTierListItems(data: typeof legendTierList) {
  return Object.entries(data.tiers).flatMap(([tier, names]) =>
    names.map((name) => ({ name, tier: tier as Tier }))
  );
}

export default function TierListPage() {
  const legendItems = toTierListItems(legendTierList);
  const weaponItems = toTierListItems(weaponTierList);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumb items={[{ label: "ティアリスト" }]} />

      <header className="mb-10">
        <h1 className="font-heading text-3xl font-black md:text-4xl">
          ティアリスト
        </h1>
        <p className="mt-3 text-text-muted">
          最新シーズンのキャラクター・武器ティアリストをメタ環境に基づいて評価。
          ランクマッチでのピック判断に活用してください。
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-text-dim">
          <span>シーズン: {legendTierList.season}</span>
          <span>最終更新: {legendTierList.lastUpdated}</span>
        </div>
      </header>

      <Tabs defaultValue="legends">
        <TabsList>
          <TabsTrigger value="legends">キャラクター</TabsTrigger>
          <TabsTrigger value="weapons">武器</TabsTrigger>
        </TabsList>

        <TabsContent value="legends">
          <div className="space-y-6">
            <TierList items={legendItems} type="legend" />
            <div className="rounded-xl border border-bg-elevated bg-bg-card p-5">
              <h3 className="mb-2 font-heading text-lg font-bold">
                評価基準について
              </h3>
              <p className="text-sm text-text-muted">
                キャラクターティアリストは、ランクマッチ（ダイヤ帯以上）における
                ピック率・勝率・プロシーンでの採用率・アビリティの汎用性を総合的に評価しています。
                パーティ構成やプレイスタイルによって最適な選択は異なるため、
                あくまで参考としてご活用ください。
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="weapons">
          <div className="space-y-6">
            <TierList items={weaponItems} type="weapon" />
            <div className="rounded-xl border border-bg-elevated bg-bg-card p-5">
              <h3 className="mb-2 font-heading text-lg font-bold">
                評価基準について
              </h3>
              <p className="text-sm text-text-muted">
                武器ティアリストは、DPS・汎用性・リコイルの扱いやすさ・
                アタッチメント依存度・各距離での性能を総合的に評価しています。
                プレイヤーのエイム力やプレイスタイルによって評価は変わるため、
                実際に使って自分に合う武器を見つけることが大切です。
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
