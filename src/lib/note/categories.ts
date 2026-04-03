/**
 * note記事カテゴリ設計
 *
 * 無料記事（集客用）、有料記事（各価格帯）、月額マガジンの
 * カテゴリとコンテンツ設計を管理する。
 */

/** note記事の価格帯 */
export type NotePriceType = "free" | "low" | "mid" | "high" | "subscription";

/** note記事カテゴリ */
export type NoteArticleCategory = {
  /** カテゴリID */
  id: string;
  /** 記事タイトル */
  title: string;
  /** 説明 */
  description: string;
  /** 価格帯 */
  priceType: NotePriceType;
  /** 価格（円） */
  price: number;
  /** シリーズ展開の有無 */
  isSeries: boolean;
};

/** 価格帯ラベル */
export const priceLabels: Record<NotePriceType, string> = {
  free: "無料（集客用）",
  low: "有料（980円）",
  mid: "有料（2,980円）",
  high: "高単価（4,980円）",
  subscription: "月額マガジン（980円/月）",
};

/** note記事カテゴリ一覧 */
export const noteCategories: NoteArticleCategory[] = [
  // ===== 無料記事（集客用） =====
  {
    id: "free-beginner-guide",
    title: "Apex Legends 完全初心者ガイド",
    description: "Apexを始めたばかりの人向けの総合ガイド。基本操作から最初の目標設定まで。",
    priceType: "free",
    price: 0,
    isSeries: false,
  },
  {
    id: "free-character-quiz",
    title: "初心者おすすめキャラ診断チャート",
    description: "プレイスタイルに合ったキャラを診断。フローチャート形式で簡単に最適キャラがわかる。",
    priceType: "free",
    price: 0,
    isSeries: false,
  },
  {
    id: "free-training-range",
    title: "射撃訓練場の使い方と練習メニュー",
    description: "射撃訓練場を最大限活用する方法。15分の日課練習メニュー付き。",
    priceType: "free",
    price: 0,
    isSeries: false,
  },

  // ===== 有料記事（980円） =====
  {
    id: "paid-character-guide",
    title: "キャラ別完全攻略ガイド",
    description: "各キャラのアビリティ活用、立ち回り、武器構成を徹底解説。キャラごとに1記事、シリーズ展開。",
    priceType: "low",
    price: 980,
    isSeries: true,
  },
  {
    id: "paid-recoil-manual",
    title: "武器別リコイル制御マニュアル（GIF付き）",
    description: "全武器のリコイルパターンと制御方法をGIFアニメーション付きで解説。",
    priceType: "low",
    price: 980,
    isSeries: false,
  },
  {
    id: "paid-beginner-to-silver",
    title: "Apex初心者→シルバー到達ガイド",
    description: "ブロンズからシルバーに上がるための具体的なロードマップ。練習メニュー付き。",
    priceType: "low",
    price: 980,
    isSeries: false,
  },

  // ===== 有料記事（2,980円） =====
  {
    id: "paid-rank-roadmap",
    title: "ランク攻略ロードマップ ブロンズ→ダイヤ完全版",
    description: "ブロンズからダイヤまでのランク帯別攻略法。RP管理、キャラ選択、立ち回りを網羅。",
    priceType: "mid",
    price: 2980,
    isSeries: false,
  },
  {
    id: "paid-positioning-textbook",
    title: "立ち回り教科書（ポジショニング・射線管理・詰め引き判断の全て）",
    description: "立ち回りの全てを体系的に解説。マップ別のポジション解説付き。",
    priceType: "mid",
    price: 2980,
    isSeries: false,
  },

  // ===== 高単価記事（4,980円） =====
  {
    id: "paid-vod-review",
    title: "VODレビューで学ぶ上達メソッド（自分の試合を分析する方法）",
    description: "自分のプレイを録画・分析して上達する方法。チェックリスト・分析テンプレート付き。",
    priceType: "high",
    price: 4980,
    isSeries: false,
  },
  {
    id: "paid-pro-settings",
    title: "プロの感度設定＆デバイス選びの完全ガイド",
    description: "プロゲーマーの感度設定データベースとデバイス選びの科学的アプローチ。",
    priceType: "high",
    price: 4980,
    isSeries: false,
  },

  // ===== 月額マガジン（980円/月） =====
  {
    id: "subscription-meta-report",
    title: "Apexメタレポート",
    description: "パッチノート分析 + キャラ/武器ティアリスト更新 + 週間メタ解説。毎週更新。",
    priceType: "subscription",
    price: 980,
    isSeries: false,
  },
];

/**
 * 価格帯でカテゴリをフィルタリングする
 *
 * @param priceType - 価格帯
 * @returns 該当するカテゴリ一覧
 */
export function getCategoriesByPrice(priceType: NotePriceType): NoteArticleCategory[] {
  return noteCategories.filter((c) => c.priceType === priceType);
}

/**
 * カテゴリIDで記事カテゴリを取得する
 *
 * @param id - カテゴリID
 * @returns カテゴリ情報
 */
export function getCategoryById(id: string): NoteArticleCategory | undefined {
  return noteCategories.find((c) => c.id === id);
}
