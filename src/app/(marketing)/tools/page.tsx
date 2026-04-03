"use client";

import { useState, useMemo } from "react";
import { Breadcrumb } from "@/components/seo/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { proSettings } from "@/content/game-data/pro-settings";

type SortKey = "name" | "cm360" | "dpi" | "inGameSens";
type SortDir = "asc" | "desc";

export default function ToolsPage() {
  const [dpi, setDpi] = useState("");
  const [sens, setSens] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const [sortKey, setSortKey] = useState<SortKey>("cm360");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const calculate = () => {
    const dpiNum = parseFloat(dpi);
    const sensNum = parseFloat(sens);
    if (isNaN(dpiNum) || isNaN(sensNum) || dpiNum <= 0 || sensNum <= 0) {
      setResult(null);
      return;
    }
    // cm/360 = (360 × 2.54) / (DPI × sensitivity × 0.022)
    const cm360 = (360 * 2.54) / (dpiNum * sensNum * 0.022);
    setResult(Math.round(cm360 * 10) / 10);
  };

  const sortedSettings = useMemo(() => {
    return [...proSettings].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return sortDir === "asc"
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });
  }, [sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sortIndicator = (key: SortKey) => {
    if (sortKey !== key) return "";
    return sortDir === "asc" ? " ↑" : " ↓";
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumb items={[{ label: "ツール" }]} />

      <header className="mb-10">
        <h1 className="font-heading text-3xl font-black md:text-4xl">
          感度計算機
        </h1>
        <p className="mt-3 text-text-muted">
          DPIとゲーム内感度から cm/360 を計算します。
          プロプレイヤーの設定と比較して、最適な感度を見つけましょう。
        </p>
      </header>

      {/* 計算ツール */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>cm/360 計算機</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-text-muted">
                DPI
              </label>
              <Input
                type="number"
                placeholder="例: 800"
                value={dpi}
                onChange={(e) => setDpi(e.target.value)}
                min={1}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-text-muted">
                ゲーム内感度
              </label>
              <Input
                type="number"
                placeholder="例: 1.5"
                value={sens}
                onChange={(e) => setSens(e.target.value)}
                min={0.1}
                step={0.1}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={calculate} variant="default" size="md">
                計算する
              </Button>
            </div>
            <div className="flex items-end">
              {result !== null && (
                <div className="rounded-lg border border-primary/40 bg-primary/10 px-6 py-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-text-muted">
                    cm/360
                  </p>
                  <p className="font-heading text-3xl font-black text-primary">
                    {result}
                    <span className="ml-1 text-sm text-text-muted">cm</span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <p className="mt-4 text-xs text-text-dim">
            計算式: cm/360 = (360 &times; 2.54) / (DPI &times; ゲーム内感度
            &times; 0.022)
          </p>
        </CardContent>
      </Card>

      {/* プロ設定参考テーブル */}
      <section>
        <h2 className="mb-4 font-heading text-xl font-black">
          プロプレイヤー設定一覧
        </h2>
        <p className="mb-4 text-sm text-text-muted">
          列ヘッダーをクリックするとソートできます。
        </p>
        <div className="overflow-x-auto rounded-xl border border-bg-elevated">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-bg-elevated bg-bg-card">
                <th
                  className="cursor-pointer px-4 py-3 text-left font-bold uppercase tracking-wider text-text-muted hover:text-primary"
                  onClick={() => handleSort("name")}
                >
                  選手{sortIndicator("name")}
                </th>
                <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-text-muted">
                  チーム
                </th>
                <th
                  className="cursor-pointer px-4 py-3 text-right font-bold uppercase tracking-wider text-text-muted hover:text-primary"
                  onClick={() => handleSort("dpi")}
                >
                  DPI{sortIndicator("dpi")}
                </th>
                <th
                  className="cursor-pointer px-4 py-3 text-right font-bold uppercase tracking-wider text-text-muted hover:text-primary"
                  onClick={() => handleSort("inGameSens")}
                >
                  感度{sortIndicator("inGameSens")}
                </th>
                <th
                  className="cursor-pointer px-4 py-3 text-right font-bold uppercase tracking-wider text-text-muted hover:text-primary"
                  onClick={() => handleSort("cm360")}
                >
                  cm/360{sortIndicator("cm360")}
                </th>
                <th className="px-4 py-3 text-left font-bold uppercase tracking-wider text-text-muted">
                  マウス
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedSettings.map((player) => (
                <tr
                  key={player.name}
                  className="border-b border-bg-elevated transition-colors hover:bg-bg-card/60"
                >
                  <td className="px-4 py-3 font-bold text-text">
                    {player.name}
                  </td>
                  <td className="px-4 py-3 text-text-muted">{player.team}</td>
                  <td className="px-4 py-3 text-right font-mono text-text">
                    {player.dpi}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-text">
                    {player.inGameSens}
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-bold text-primary">
                    {player.cm360}
                  </td>
                  <td className="px-4 py-3 text-text-muted">{player.mouse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
