/** レジェンドクラス */
export const legendClasses = [
  "アサルト",
  "スカーミッシャー",
  "リコン",
  "コントローラー",
  "サポート",
] as const;

export type LegendClass = (typeof legendClasses)[number];

/** 武器カテゴリ */
export const weaponCategories = [
  "アサルトライフル",
  "サブマシンガン",
  "ライトマシンガン",
  "マークスマンライフル",
  "スナイパーライフル",
  "ショットガン",
  "ピストル",
] as const;

export type WeaponCategory = (typeof weaponCategories)[number];

/** ティア定義 */
export const tiers = ["S", "A", "B", "C", "D"] as const;
export type Tier = (typeof tiers)[number];

/** 難易度定義 */
export const difficulties = ["初級", "中級", "上級"] as const;
export type Difficulty = (typeof difficulties)[number];

/** 弾薬タイプ */
export const ammoTypes = [
  "ライト",
  "ヘビー",
  "エネルギー",
  "ショットガン",
  "スナイパー",
  "専用",
] as const;

export type AmmoType = (typeof ammoTypes)[number];

/** マップ一覧 */
export const maps = [
  "ワールズエッジ",
  "ストームポイント",
  "ブロークンムーン",
  "キングスキャニオン",
  "Eディストリクト",
] as const;

export type MapName = (typeof maps)[number];
