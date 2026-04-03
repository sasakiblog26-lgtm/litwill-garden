/**
 * 記事ステータス管理モジュール
 *
 * 記事のライフサイクル（draft → review → scheduled → published）を管理し、
 * ステータス遷移のバリデーション、スケジュール公開を提供する。
 */

import { eq, and, lte } from "drizzle-orm";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

import type * as schema from "@/lib/db/schema";
import { articles } from "@/lib/db/schema";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * 記事のステータス
 *
 * - `draft`: 下書き（AI 生成直後）
 * - `review`: レビュー中（人間による確認待ち）
 * - `scheduled`: 公開予約済み
 * - `published`: 公開済み
 */
export type ArticleStatus = "draft" | "review" | "scheduled" | "published";

/** Drizzle ORM データベースインスタンスの型 */
type Db = PostgresJsDatabase<typeof schema>;

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * 許可されたステータス遷移マップ
 *
 * 各ステータスから遷移可能な次のステータスを定義する。
 * スキップ（例: draft → published）は許可しない。
 */
const ALLOWED_TRANSITIONS: Record<ArticleStatus, ArticleStatus[]> = {
  draft: ["review"],
  review: ["scheduled", "draft"], // レビューで差し戻しも可能
  scheduled: ["published", "review"], // スケジュール取り消しも可能
  published: [], // 公開後の遷移はなし
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * ステータス遷移が有効かどうかを検証する
 *
 * 許可される遷移:
 * - draft → review
 * - review → scheduled / draft（差し戻し）
 * - scheduled → published / review（取り消し）
 * - published → （遷移不可）
 *
 * @param currentStatus - 現在のステータス
 * @param targetStatus - 遷移先のステータス
 * @returns 遷移が有効なら `true`、無効なら `false`
 */
export function transitionStatus(
  currentStatus: ArticleStatus,
  targetStatus: ArticleStatus,
): boolean {
  const allowed = ALLOWED_TRANSITIONS[currentStatus];
  return allowed.includes(targetStatus);
}

/**
 * 記事のステータスを更新する
 *
 * 遷移バリデーションを行い、不正な遷移の場合はエラーをスローする。
 * 正常な場合は DB の articles テーブルを更新し、`updatedAt` を現在時刻に設定する。
 *
 * `published` への遷移時は `publishedAt` も自動的に設定される。
 *
 * @param db - Drizzle ORM データベースインスタンス
 * @param articleId - 対象記事の ID
 * @param newStatus - 遷移先のステータス
 * @throws 記事が見つからない場合、または不正な遷移の場合にエラーをスローする
 */
export async function updateArticleStatus(
  db: Db,
  articleId: number,
  newStatus: ArticleStatus,
): Promise<void> {
  // 現在のステータスを取得
  const rows = await db
    .select({ status: articles.status })
    .from(articles)
    .where(eq(articles.id, articleId))
    .limit(1);

  if (rows.length === 0) {
    throw new Error(`記事が見つかりません: id=${articleId}`);
  }

  const currentStatus = rows[0].status as ArticleStatus;

  if (!transitionStatus(currentStatus, newStatus)) {
    throw new Error(
      `不正なステータス遷移です: ${currentStatus} → ${newStatus}`,
    );
  }

  const updateData: Record<string, unknown> = {
    status: newStatus,
    updatedAt: new Date(),
  };

  // published への遷移時は publishedAt を設定
  if (newStatus === "published") {
    updateData.publishedAt = new Date();
  }

  await db
    .update(articles)
    .set(updateData)
    .where(eq(articles.id, articleId));
}

/**
 * 記事を指定日時で公開予約する
 *
 * ステータスを `scheduled` に遷移し、`scheduledAt` を設定する。
 * 現在のステータスが `review` でない場合はエラーをスローする。
 *
 * @param db - Drizzle ORM データベースインスタンス
 * @param articleId - 対象記事の ID
 * @param publishAt - 公開予定日時
 * @throws 記事が見つからない場合、または不正な遷移の場合にエラーをスローする
 */
export async function scheduleArticle(
  db: Db,
  articleId: number,
  publishAt: Date,
): Promise<void> {
  // 現在のステータスを取得
  const rows = await db
    .select({ status: articles.status })
    .from(articles)
    .where(eq(articles.id, articleId))
    .limit(1);

  if (rows.length === 0) {
    throw new Error(`記事が見つかりません: id=${articleId}`);
  }

  const currentStatus = rows[0].status as ArticleStatus;

  if (!transitionStatus(currentStatus, "scheduled")) {
    throw new Error(
      `公開予約できないステータスです: ${currentStatus} → scheduled`,
    );
  }

  await db
    .update(articles)
    .set({
      status: "scheduled",
      scheduledAt: publishAt,
      updatedAt: new Date(),
    })
    .where(eq(articles.id, articleId));
}

/**
 * 公開予定日時を過ぎた記事を一括公開する
 *
 * `status = "scheduled"` かつ `scheduledAt <= 現在時刻` の記事を検索し、
 * それぞれのステータスを `published` に更新する。
 *
 * @param db - Drizzle ORM データベースインスタンス
 * @returns 公開した記事の件数
 */
export async function publishScheduledArticles(db: Db): Promise<number> {
  const now = new Date();

  // 公開対象の記事を検索
  const scheduledRows = await db
    .select({ id: articles.id })
    .from(articles)
    .where(
      and(
        eq(articles.status, "scheduled"),
        lte(articles.scheduledAt, now),
      ),
    );

  if (scheduledRows.length === 0) {
    return 0;
  }

  // 各記事を公開ステータスに更新
  for (const row of scheduledRows) {
    await db
      .update(articles)
      .set({
        status: "published",
        publishedAt: now,
        updatedAt: now,
      })
      .where(eq(articles.id, row.id));
  }

  return scheduledRows.length;
}
