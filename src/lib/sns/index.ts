/**
 * SNS自動投稿システム
 *
 * X（Twitter）、YouTube、TikTok/YouTubeショートの
 * 投稿管理・スケジューリング・パフォーマンス追跡。
 */

export { postTweet, generateXPost, generateArticlePost, getPostMetrics } from "./twitter";
export type { XPostResult, XPostMetrics } from "./twitter";
export { generateVideoMetadata, buildDescription } from "./youtube";
export type { VideoMetadata } from "./youtube";
export { generateShortVideoScript } from "./tiktok";
export type { ShortVideoScript } from "./tiktok";
export {
  regularSchedules,
  jstTimeToUtc,
  getNextScheduledTime,
  createScheduledPost,
} from "./scheduler";
export type { PostSchedule, ScheduledPost } from "./scheduler";
export { aggregateXPerformance, generateWeeklyReport } from "./performance";
export type { PlatformPerformance, WeeklyReport } from "./performance";
export {
  defaultHashtags,
  xPostTemplates,
  shortVideoTemplates,
  youtubeCategories,
} from "./templates";
