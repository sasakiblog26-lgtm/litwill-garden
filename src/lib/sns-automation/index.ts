/**
 * SNS Automation module for Litwill Garden.
 *
 * Barrel export file that re-exports all sub-modules for convenient access.
 *
 * @module sns-automation
 */

/** X (Twitter) posting, promo generation, hashtags, and schedule */
export {
  postToTwitter,
  generateArticlePromoPost,
  HASHTAG_SET,
  POSTING_SCHEDULE as TWITTER_POSTING_SCHEDULE,
} from "./twitter";

/** SNS post templates for X and TikTok/Shorts */
export {
  patchNewsTemplate,
  metaAnalysisTemplate,
  quickTipsTemplate,
  matchResultTemplate,
  clipTipsTemplate,
  quickExplainerTemplate,
  beforeAfterTemplate,
} from "./templates";
export type {
  XPostTemplate,
  ShortVideoTemplate,
  PatchNewsData,
  MetaAnalysisData,
  QuickTipData,
  MatchResultData,
  ClipTipsData,
  QuickExplainerData,
  BeforeAfterData,
} from "./templates";

/** YouTube metadata generation */
export {
  generateVideoMetadata,
  generateDescriptionTemplate,
  VIDEO_CATEGORIES,
} from "./youtube";
export type { VideoMetadata, VideoCategoryInfo } from "./youtube";

/** TikTok posting and schedule */
export {
  postToTikTok,
  POSTING_SCHEDULE as TIKTOK_POSTING_SCHEDULE,
} from "./tiktok";
export type { TikTokPostData } from "./tiktok";

/** Post scheduling engine */
export {
  schedulePost,
  getScheduledPosts,
  executeScheduledPosts,
  scheduleArticlePromo,
} from "./scheduler";
export type { SchedulePostInput, ScheduledPost } from "./scheduler";

/** Performance tracking and weekly reports */
export {
  fetchTwitterEngagement,
  fetchAllPlatformEngagement,
  generateWeeklyReport,
  saveWeeklyReport,
} from "./performance";
export type { EngagementData, WeeklyReport } from "./performance";
