/**
 * LINEセグメント定義
 *
 * ランクベースのユーザーセグメントと配信シナリオを管理する。
 */

/** LINEセグメント */
export type LineSegment = "beginner" | "intermediate" | "advanced";

/** セグメント定義 */
export type SegmentDefinition = {
  id: LineSegment;
  label: string;
  rankRange: string;
  description: string;
};

/** セグメント一覧 */
export const segments: SegmentDefinition[] = [
  {
    id: "beginner",
    label: "初心者（ルーキー〜ブロンズ）",
    rankRange: "ルーキー〜ブロンズ",
    description: "Apexを始めたばかりで基本操作やゲームの仕組みを理解中",
  },
  {
    id: "intermediate",
    label: "シルバー〜ゴールド",
    rankRange: "シルバー〜ゴールド",
    description: "基本は理解しているが、ランクが伸び悩んでいる",
  },
  {
    id: "advanced",
    label: "プラチナ以上",
    rankRange: "プラチナ〜",
    description: "ある程度のスキルがあり、さらなる高みを目指している",
  },
];

/** ランクセグメント質問の選択肢 */
export const rankSegmentQuestion = {
  text: "あなたの現在のランクは？",
  options: [
    { label: "ルーキー〜ブロンズ", value: "beginner" as LineSegment },
    { label: "シルバー〜ゴールド", value: "intermediate" as LineSegment },
    { label: "プラチナ以上", value: "advanced" as LineSegment },
  ],
} as const;

/**
 * ランク名からセグメントを判定する
 *
 * @param rank - ランク名（日本語）
 * @returns セグメントID
 */
export function determineSegment(rank: string): LineSegment {
  const lowerRank = rank.toLowerCase();
  if (
    lowerRank.includes("ルーキー") ||
    lowerRank.includes("ブロンズ") ||
    lowerRank.includes("rookie") ||
    lowerRank.includes("bronze")
  ) {
    return "beginner";
  }
  if (
    lowerRank.includes("シルバー") ||
    lowerRank.includes("ゴールド") ||
    lowerRank.includes("silver") ||
    lowerRank.includes("gold")
  ) {
    return "intermediate";
  }
  return "advanced";
}
