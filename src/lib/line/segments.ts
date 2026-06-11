/**
 * LINEセグメント定義
 *
 * ユーザーの悩み・関心カテゴリに基づくセグメントを管理する。
 */

/** LINEセグメント */
export type LineSegment = "beginner" | "intermediate" | "advanced";

/** セグメント定義 */
export type SegmentDefinition = {
  id: LineSegment;
  label: string;
  concernType: string;
  description: string;
};

/** セグメント一覧 */
export const segments: SegmentDefinition[] = [
  {
    id: "beginner",
    label: "占い・心理学に興味を持ち始めた",
    concernType: "占い入門・自己理解",
    description: "占星術や心理学に初めて触れる方。自分を知るきっかけを探している",
  },
  {
    id: "intermediate",
    label: "恋愛・人間関係を深く知りたい",
    concernType: "恋愛・対人関係",
    description: "パートナーシップや人間関係のパターンをより深く理解したい",
  },
  {
    id: "advanced",
    label: "自分の使命や人生テーマを探りたい",
    concernType: "ライフパーパス・魂の目的",
    description: "ライフパーパスや深い自己理解、スピリチュアルな探求に関心がある",
  },
];

/**
 * ランクセグメント質問の選択肢
 *
 * @deprecated `concernType` ベースの選択肢へ移行中。
 * フィールド名は後方互換のため維持。
 */
export const rankSegmentQuestion = {
  text: "あなたの一番の関心事は？",
  options: [
    { label: "占い・心理学に興味を持ち始めた", value: "beginner" as LineSegment },
    { label: "恋愛・人間関係を深く知りたい", value: "intermediate" as LineSegment },
    { label: "自分の使命や人生テーマを探りたい", value: "advanced" as LineSegment },
  ],
} as const;

/**
 * 選択テキストからセグメントを判定する
 *
 * @param choice - ユーザーが選択した選択肢テキスト
 * @returns セグメントID
 */
export function determineSegment(choice: string): LineSegment {
  if (
    choice.includes("興味を持ち") ||
    choice.includes("入門") ||
    choice.includes("beginner")
  ) {
    return "beginner";
  }
  if (
    choice.includes("恋愛") ||
    choice.includes("人間関係") ||
    choice.includes("intermediate")
  ) {
    return "intermediate";
  }
  return "advanced";
}
