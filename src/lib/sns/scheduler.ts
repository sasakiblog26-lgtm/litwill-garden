/**
 * SNS投稿スケジューラー
 *
 * 各プラットフォームの投稿スケジュールを管理する。
 * X: 毎日2投稿（朝8:00 / 夜21:00 JST）
 * TikTok/YouTubeショート: 毎日1本（20:00 JST）
 */

/** スケジュール定義 */
export type PostSchedule = {
  /** プラットフォーム */
  platform: "twitter" | "tiktok" | "youtube_short";
  /** 投稿時刻（JST HH:mm） */
  timeJst: string;
  /** 説明 */
  description: string;
};

/** 定期投稿スケジュール */
export const regularSchedules: PostSchedule[] = [
  {
    platform: "twitter",
    timeJst: "08:00",
    description: "朝のX投稿（Tips or メタ解説）",
  },
  {
    platform: "twitter",
    timeJst: "21:00",
    description: "夜のX投稿（ゲーマーアクティブ時間帯）",
  },
  {
    platform: "tiktok",
    timeJst: "20:00",
    description: "TikTok / YouTubeショート投稿",
  },
  {
    platform: "youtube_short",
    timeJst: "20:00",
    description: "YouTubeショート投稿（TikTokと同時）",
  },
];

/**
 * JSTの時刻文字列からUTC Dateオブジェクトを生成する
 *
 * @param timeJst - HH:mm形式のJST時刻
 * @param date - 日付（省略時は今日）
 * @returns UTC Date
 */
export function jstTimeToUtc(timeJst: string, date?: Date): Date {
  const baseDate = date || new Date();
  const [hours, minutes] = timeJst.split(":").map(Number);

  const jstDate = new Date(baseDate);
  jstDate.setUTCHours(hours - 9, minutes, 0, 0); // JST → UTC（-9時間）

  return jstDate;
}

/**
 * 次の投稿スケジュールを計算する
 *
 * @param schedule - スケジュール定義
 * @returns 次の投稿日時（UTC）
 */
export function getNextScheduledTime(schedule: PostSchedule): Date {
  const now = new Date();
  const today = jstTimeToUtc(schedule.timeJst, now);

  if (today > now) {
    return today;
  }

  // 今日の時刻を過ぎている場合は翌日
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow;
}

/**
 * スケジュール済みの投稿情報
 */
export type ScheduledPost = {
  /** プラットフォーム */
  platform: "twitter" | "tiktok" | "youtube_short";
  /** 投稿内容 */
  content: string;
  /** 投稿予定日時（UTC） */
  scheduledAt: Date;
  /** ステータス */
  status: "pending" | "posted" | "failed";
  /** メディアURL（任意） */
  mediaUrl?: string;
};

/**
 * 投稿をスケジュールに登録する
 *
 * @param platform - プラットフォーム
 * @param content - 投稿内容
 * @param scheduledAt - 投稿予定日時
 * @returns スケジュール情報
 */
export function createScheduledPost(
  platform: ScheduledPost["platform"],
  content: string,
  scheduledAt: Date,
  mediaUrl?: string
): ScheduledPost {
  return {
    platform,
    content,
    scheduledAt,
    status: "pending",
    mediaUrl,
  };
}
