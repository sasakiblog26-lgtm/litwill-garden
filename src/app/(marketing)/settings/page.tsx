import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import { categorySeo } from "@/config/seo";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { LineCta } from "@/components/cta/line-cta";
import { proSettings } from "@/content/game-data/pro-settings";

export const metadata: Metadata = createMetadata({
  title: categorySeo.settings.title,
  description: categorySeo.settings.description,
  path: "/settings",
});

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumb items={[{ label: "設定・デバイス" }]} />

      <header className="mb-10">
        <h1 className="font-heading text-3xl font-black md:text-4xl">
          設定・デバイス
        </h1>
        <p className="mt-3 text-text-muted">
          プロゲーマーの感度設定・デバイス環境を徹底調査。
          最適な設定を見つけて、あなたのパフォーマンスを最大化しよう。
        </p>
      </header>

      {/* プロ設定テーブル */}
      <section className="mb-12">
        <h2 className="mb-4 font-heading text-xl font-black">
          プロプレイヤー設定一覧
        </h2>
        <div className="overflow-x-auto rounded-xl border border-bg-elevated">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-bg-elevated bg-bg-card">
                <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-text-muted">
                  選手
                </th>
                <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-text-muted">
                  チーム
                </th>
                <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-text-muted">
                  地域
                </th>
                <th className="px-4 py-3 text-right font-bold uppercase tracking-wider text-text-muted">
                  DPI
                </th>
                <th className="px-4 py-3 text-right font-bold uppercase tracking-wider text-text-muted">
                  感度
                </th>
                <th className="px-4 py-3 text-right font-bold uppercase tracking-wider text-text-muted">
                  cm/360
                </th>
              </tr>
            </thead>
            <tbody>
              {proSettings.map((player) => (
                <tr
                  key={player.name}
                  className="border-b border-bg-elevated transition-colors hover:bg-bg-card/60"
                >
                  <td className="px-4 py-3 font-bold text-text">
                    {player.name}
                  </td>
                  <td className="px-4 py-3 text-text-muted">{player.team}</td>
                  <td className="px-4 py-3">
                    <Badge variant="outline">{player.region}</Badge>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-text">
                    {player.dpi}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-text">
                    {player.inGameSens}
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-primary">
                    {player.cm360}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* デバイスカテゴリ */}
      <section className="mb-12">
        <h2 className="mb-4 font-heading text-xl font-black">
          デバイスカテゴリ別
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* マウス */}
          <div className="rounded-xl border border-bg-elevated bg-bg-card p-5">
            <h3 className="mb-3 font-heading font-bold text-primary">
              マウス
            </h3>
            <ul className="space-y-2">
              {[...new Set(proSettings.map((p) => p.mouse))].map((mouse) => (
                <li key={mouse} className="text-sm text-text-muted">
                  {mouse}
                </li>
              ))}
            </ul>
          </div>

          {/* マウスパッド */}
          <div className="rounded-xl border border-bg-elevated bg-bg-card p-5">
            <h3 className="mb-3 font-heading font-bold text-secondary">
              マウスパッド
            </h3>
            <ul className="space-y-2">
              {[...new Set(proSettings.map((p) => p.mousepad))].map((pad) => (
                <li key={pad} className="text-sm text-text-muted">
                  {pad}
                </li>
              ))}
            </ul>
          </div>

          {/* キーボード */}
          <div className="rounded-xl border border-bg-elevated bg-bg-card p-5">
            <h3 className="mb-3 font-heading font-bold text-accent">
              キーボード
            </h3>
            <ul className="space-y-2">
              {[...new Set(proSettings.map((p) => p.keyboard))].map((kb) => (
                <li key={kb} className="text-sm text-text-muted">
                  {kb}
                </li>
              ))}
            </ul>
          </div>

          {/* モニター */}
          <div className="rounded-xl border border-bg-elevated bg-bg-card p-5">
            <h3 className="mb-3 font-heading font-bold">モニター</h3>
            <ul className="space-y-2">
              {[...new Set(proSettings.map((p) => p.monitor))].map(
                (monitor) => (
                  <li key={monitor} className="text-sm text-text-muted">
                    {monitor}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </section>

      <LineCta />
    </div>
  );
}
