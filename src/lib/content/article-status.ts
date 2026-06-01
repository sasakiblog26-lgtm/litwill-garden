/**
 * 記事ステータス管理
 *
 * 記事のライフサイクル: draft → review → scheduled → published
 * 全AI生成コンテンツは公開前にreviewステータスを必ず経由する。
 */

/** 記事ステータス */
export type ArticleStatus = "draft" | "review" | "scheduled" | "published";

/** ステータス遷移ルール */
const validTransitions: Record<ArticleStatus, ArticleStatus[]> = {
  draft: ["review"],
  review: ["draft", "scheduled"],
  scheduled: ["review", "published"],
  published: ["review"],
};

/** ステータス表示ラベル */
export const statusLabels: Record<ArticleStatus, string> = {
  draft: "下書き",
  review: "レビュー中",
  scheduled: "公開予約",
  published: "公開済み",
};

/**
 * ステータス遷移が有効かどうかを検証する
 *
 * @param currentStatus - 現在のステータス
 * @param nextStatus - 遷移先のステータス
 * @returns 遷移が有効ならtrue
 */
export function isValidTransition(
  currentStatus: ArticleStatus,
  nextStatus: ArticleStatus
): boolean {
  return validTransitions[currentStatus].includes(nextStatus);
}

/**
 * ステータスを遷移する（バリデーション付き）
 *
 * @param currentStatus - 現在のステータス
 * @param nextStatus - 遷移先のステータス
 * @returns 新しいステータス
 * @throws 無効な遷移の場合エラー
 */
export function transitionStatus(
  currentStatus: ArticleStatus,
  nextStatus: ArticleStatus
): ArticleStatus {
  if (!isValidTransition(currentStatus, nextStatus)) {
    throw new Error(
      `Invalid status transition: ${currentStatus} → ${nextStatus}. ` +
        `Valid transitions from ${currentStatus}: ${validTransitions[currentStatus].join(", ")}`
    );
  }
  return nextStatus;
}

/**
 * 次に遷移可能なステータス一覧を返す
 *
 * @param currentStatus - 現在のステータス
 * @returns 遷移可能なステータスの配列
 */
export function getNextStatuses(currentStatus: ArticleStatus): ArticleStatus[] {
  return validTransitions[currentStatus];
}
