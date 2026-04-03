import type { Tier } from "@/config/game";

export type TierListData = {
  season: string;
  lastUpdated: string;
  tiers: Record<Tier, string[]>;
};

export const legendTierList: TierListData = {
  season: "シーズン22",
  lastUpdated: "2026-03-28",
  tiers: {
    S: ["レイス", "ホライゾン"],
    A: ["オクタン", "パスファインダー", "ジブラルタル", "コースティック", "コンジット"],
    B: ["ブラッドハウンド", "バンガロール", "ライフライン", "カタリスト"],
    C: ["ヒューズ"],
    D: [],
  },
};

export const weaponTierList: TierListData = {
  season: "シーズン22",
  lastUpdated: "2026-03-28",
  tiers: {
    S: ["R-301 カービン", "ウィングマン"],
    A: ["フラットライン", "R-99", "ピースキーパー", "ボルト", "プラウラー"],
    B: ["マスティフ", "ロングボウ", "ディヴォーション", "ハボック"],
    C: ["センチネル"],
    D: [],
  },
};
