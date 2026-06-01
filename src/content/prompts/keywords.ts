/**
 * ターゲットSEOキーワード定義
 *
 * Apex Legends 初心者〜中級者向けの攻略メディアとして
 * 狙うべきキーワード群を管理する。
 */

/** SEOキーワード定義 */
export type TargetKeyword = {
  /** キーワード */
  keyword: string;
  /** 想定カテゴリ */
  category: "beginner" | "aim" | "positioning" | "ranking" | "character" | "weapon";
  /** 想定記事テンプレート */
  templateType: "guide" | "character" | "weapon" | "ranking";
  /** 優先度 */
  priority: "high" | "medium" | "low";
};

/** ターゲットSEOキーワード一覧 */
export const targetKeywords: TargetKeyword[] = [
  {
    keyword: "Apex 初心者 上達",
    category: "beginner",
    templateType: "guide",
    priority: "high",
  },
  {
    keyword: "Apex エイム 練習方法",
    category: "aim",
    templateType: "guide",
    priority: "high",
  },
  {
    keyword: "Apex キャラ おすすめ 初心者",
    category: "character",
    templateType: "character",
    priority: "high",
  },
  {
    keyword: "Apex 立ち回り 基本",
    category: "positioning",
    templateType: "guide",
    priority: "high",
  },
  {
    keyword: "Apex ランク 上げ方",
    category: "ranking",
    templateType: "ranking",
    priority: "high",
  },
  {
    keyword: "Apex 感度設定 おすすめ",
    category: "aim",
    templateType: "guide",
    priority: "medium",
  },
  {
    keyword: "Apex 武器 最強 2026",
    category: "weapon",
    templateType: "weapon",
    priority: "medium",
  },
  {
    keyword: "Apex リコイル制御 コツ",
    category: "aim",
    templateType: "weapon",
    priority: "medium",
  },
  {
    keyword: "Apex ランク ダイヤ 行き方",
    category: "ranking",
    templateType: "ranking",
    priority: "medium",
  },
  {
    keyword: "Apex 初心者 やること",
    category: "beginner",
    templateType: "guide",
    priority: "high",
  },
] as const;
