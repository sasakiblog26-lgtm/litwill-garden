/** Apex Tracker API連携（戦績取得） - スタブ実装 */

type PlayerStats = {
  name: string;
  platform: "PC" | "PS" | "XBOX";
  level: number;
  rankScore: number;
  rankTier: string;
  kills: number;
  damage: number;
  wins: number;
  topLegend: string;
};

/**
 * プレイヤーの戦績を取得する
 * TODO: Apex Legends Status API または TRN API と連携
 */
export async function getPlayerStats(
  _name: string,
  _platform: "PC" | "PS" | "XBOX" = "PC"
): Promise<PlayerStats | null> {
  // API連携は後日実装
  return null;
}

/**
 * レジェンド別のピック率・勝率を取得する
 * TODO: 外部APIからメタデータを取得
 */
export async function getLegendMeta(): Promise<
  { legend: string; pickRate: number; winRate: number }[]
> {
  // API連携は後日実装
  return [];
}
