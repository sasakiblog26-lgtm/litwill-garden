/**
 * Performance tracking module for Litwill Garden SNS automation.
 *
 * Fetches engagement metrics from platform APIs, updates post records,
 * and generates weekly performance reports.
 */

import { eq, and, gte, lte, isNotNull } from "drizzle-orm";
import { snsPosts, snsWeeklyReports } from "@/lib/db/schema";
import type { AppDb } from "@/lib/db";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Engagement metrics for a single post */
export interface EngagementData {
  /** Number of times the post was displayed */
  impressions: number;
  /** Number of likes */
  likes: number;
  /** Number of retweets / shares */
  retweets: number;
  /** Number of replies / comments */
  replies: number;
  /** Number of link clicks */
  clicks: number;
}

/** Weekly performance report for a platform */
export interface WeeklyReport {
  /** Platform name */
  platform: string;
  /** Start of the reporting week */
  weekStart: Date;
  /** End of the reporting week */
  weekEnd: Date;
  /** Total number of posts during the week */
  totalPosts: number;
  /** Total impressions across all posts */
  totalImpressions: number;
  /** Total engagement (likes + retweets + replies + clicks) */
  totalEngagement: number;
  /** ID of the top-performing post (by impressions) */
  topPostId: number;
  /** Human-readable summary of the week's performance */
  summary: string;
}

// ---------------------------------------------------------------------------
// Functions
// ---------------------------------------------------------------------------

/**
 * Fetches engagement metrics for a specific tweet from the X (Twitter) API.
 *
 * Uses `X_API_KEY` and `X_ACCESS_TOKEN` environment variables.
 *
 * @param postId - The external tweet ID to fetch metrics for
 * @returns Engagement data including impressions, likes, retweets, replies, and clicks
 * @throws Error if API credentials are missing or the API request fails
 */
export async function fetchTwitterEngagement(
  postId: string
): Promise<EngagementData> {
  const accessToken = process.env.X_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error("X_ACCESS_TOKEN is not configured in environment variables");
  }

  const url = `https://api.twitter.com/2/tweets/${postId}?tweet.fields=public_metrics,non_public_metrics`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`X API error (${response.status}): ${errorBody}`);
  }

  const data = (await response.json()) as {
    data: {
      public_metrics: {
        impression_count: number;
        like_count: number;
        retweet_count: number;
        reply_count: number;
      };
      non_public_metrics?: {
        url_link_clicks?: number;
      };
    };
  };

  const publicMetrics = data.data.public_metrics;
  const nonPublicMetrics = data.data.non_public_metrics;

  return {
    impressions: publicMetrics.impression_count,
    likes: publicMetrics.like_count,
    retweets: publicMetrics.retweet_count,
    replies: publicMetrics.reply_count,
    clicks: nonPublicMetrics?.url_link_clicks ?? 0,
  };
}

/**
 * Updates engagement data for all recently posted SNS posts across all platforms.
 *
 * Iterates through posts that have been posted (have a postedAt timestamp and externalId)
 * within the last 7 days, fetches their latest engagement metrics from the
 * respective platform APIs, and updates the database records.
 *
 * @param db - Drizzle ORM database instance
 */
export async function fetchAllPlatformEngagement(db: AppDb): Promise<void> {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  // Get all recently posted posts that have external IDs
  const recentPosts = await db
    .select()
    .from(snsPosts)
    .where(
      and(
        isNotNull(snsPosts.postedAt),
        isNotNull(snsPosts.externalId),
        gte(snsPosts.postedAt, sevenDaysAgo)
      )
    );

  for (const post of recentPosts) {
    try {
      let engagement: EngagementData | null = null;

      if (post.platform === "twitter") {
        engagement = await fetchTwitterEngagement(post.externalId!);
      } else {
        // Other platforms can be added here
        console.warn(
          `[Performance] Engagement fetching not implemented for platform "${post.platform}"`
        );
        continue;
      }

      if (engagement) {
        await db
          .update(snsPosts)
          .set({
            impressions: engagement.impressions,
            likes: engagement.likes,
            retweets: engagement.retweets,
            replies: engagement.replies,
            clicks: engagement.clicks,
            engagement: engagement,
          })
          .where(eq(snsPosts.id, post.id));
      }
    } catch (err) {
      console.error(
        `[Performance] Failed to fetch engagement for post ${post.id}:`,
        err instanceof Error ? err.message : err
      );
    }
  }
}

/**
 * Generates a weekly performance report for a given platform.
 *
 * Aggregates metrics from the past 7 days: total posts, total impressions,
 * total engagement (likes + retweets + replies + clicks), identifies the
 * top-performing post, and produces a human-readable summary.
 *
 * @param db - Drizzle ORM database instance
 * @param platform - Platform to generate report for (e.g. "twitter")
 * @returns The weekly report with aggregated metrics and summary
 */
export async function generateWeeklyReport(
  db: AppDb,
  platform: string
): Promise<WeeklyReport> {
  const weekEnd = new Date();
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 7);

  // Fetch all posted posts in the date range for the platform
  const posts = await db
    .select()
    .from(snsPosts)
    .where(
      and(
        eq(snsPosts.platform, platform),
        isNotNull(snsPosts.postedAt),
        gte(snsPosts.postedAt, weekStart),
        lte(snsPosts.postedAt, weekEnd)
      )
    );

  const totalPosts = posts.length;
  let totalImpressions = 0;
  let totalEngagement = 0;
  let topPostId = 0;
  let topPostImpressions = -1;

  for (const post of posts) {
    const impressions = post.impressions ?? 0;
    const likes = post.likes ?? 0;
    const retweets = post.retweets ?? 0;
    const replies = post.replies ?? 0;
    const clicks = post.clicks ?? 0;

    totalImpressions += impressions;
    totalEngagement += likes + retweets + replies + clicks;

    if (impressions > topPostImpressions) {
      topPostImpressions = impressions;
      topPostId = post.id;
    }
  }

  const engagementRate =
    totalImpressions > 0
      ? ((totalEngagement / totalImpressions) * 100).toFixed(2)
      : "0.00";

  const summary = [
    `【${platform}週次レポート】`,
    `期間: ${formatDate(weekStart)} 〜 ${formatDate(weekEnd)}`,
    `投稿数: ${totalPosts}件`,
    `総インプレッション: ${totalImpressions.toLocaleString()}`,
    `総エンゲージメント: ${totalEngagement.toLocaleString()}`,
    `エンゲージメント率: ${engagementRate}%`,
    topPostId
      ? `トップ投稿ID: ${topPostId}（${topPostImpressions.toLocaleString()}インプレッション）`
      : "トップ投稿: なし",
  ].join("\n");

  return {
    platform,
    weekStart,
    weekEnd,
    totalPosts,
    totalImpressions,
    totalEngagement,
    topPostId,
    summary,
  };
}

/**
 * Saves a weekly report to the snsWeeklyReports table.
 *
 * @param db - Drizzle ORM database instance
 * @param report - The weekly report to persist
 */
export async function saveWeeklyReport(
  db: AppDb,
  report: WeeklyReport
): Promise<void> {
  await db.insert(snsWeeklyReports).values({
    platform: report.platform,
    weekStart: report.weekStart,
    weekEnd: report.weekEnd,
    totalPosts: report.totalPosts,
    totalImpressions: report.totalImpressions,
    totalEngagement: report.totalEngagement,
    topPostId: report.topPostId || null,
    reportJson: {
      summary: report.summary,
      generatedAt: new Date().toISOString(),
    },
  });
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Formats a Date as YYYY/MM/DD for display in reports.
 */
function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}/${m}/${d}`;
}
