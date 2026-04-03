/**
 * Post scheduling engine for Litwill Garden SNS automation.
 *
 * Manages scheduled posts in the snsPosts table, executes them
 * at the designated time via platform-specific posting functions,
 * and auto-schedules article promotion posts.
 */

import { eq, and, lte, gte, isNull } from "drizzle-orm";
import { snsPosts } from "@/lib/db/schema";
import { postToTwitter, generateArticlePromoPost, HASHTAG_SET } from "./twitter";
import { postToTikTok } from "./tiktok";
import type { TikTokPostData } from "./tiktok";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Input for scheduling a new post */
export interface SchedulePostInput {
  /** Target platform: "twitter" | "tiktok" | "youtube" */
  platform: string;
  /** Template type (e.g. "patch-news", "article-promo") */
  templateType?: string;
  /** Post content text */
  content: string;
  /** Hashtags array */
  hashtags?: string[];
  /** Media URL (for video posts) */
  mediaUrl?: string;
  /** Related article ID */
  articleId?: number;
  /** When to post */
  scheduledAt: Date;
}

/** A scheduled post retrieved from the database */
export interface ScheduledPost {
  /** Post ID */
  id: number;
  /** Target platform */
  platform: string;
  /** Template type */
  templateType: string | null;
  /** Post content */
  content: string;
  /** Hashtags */
  hashtags: string[] | null;
  /** Media URL */
  mediaUrl: string | null;
  /** Related article ID */
  articleId: number | null;
  /** Scheduled posting time */
  scheduledAt: Date | null;
  /** Actual posting time (null if not yet posted) */
  postedAt: Date | null;
  /** External post ID (null if not yet posted) */
  externalId: string | null;
}

// ---------------------------------------------------------------------------
// Functions
// ---------------------------------------------------------------------------

/**
 * Inserts a scheduled post into the snsPosts table.
 *
 * The post will remain in a "pending" state (postedAt = null) until
 * it is picked up by `executeScheduledPosts`.
 *
 * @param db - Drizzle ORM database instance
 * @param post - The post data to schedule
 * @returns The ID of the newly created post record
 */
export async function schedulePost(
  db: any,
  post: SchedulePostInput
): Promise<number> {
  const result = await db
    .insert(snsPosts)
    .values({
      platform: post.platform,
      templateType: post.templateType ?? null,
      content: post.content,
      hashtags: post.hashtags ?? null,
      mediaUrl: post.mediaUrl ?? null,
      articleId: post.articleId ?? null,
      scheduledAt: post.scheduledAt,
    })
    .returning({ id: snsPosts.id });

  return result[0].id;
}

/**
 * Retrieves scheduled (pending) posts for a given platform within a time range.
 *
 * Only returns posts that have not yet been posted (postedAt is null).
 *
 * @param db - Drizzle ORM database instance
 * @param platform - Platform to filter by (e.g. "twitter", "tiktok")
 * @param from - Start of the time range (inclusive)
 * @param to - End of the time range (inclusive)
 * @returns Array of scheduled posts matching the criteria
 */
export async function getScheduledPosts(
  db: any,
  platform: string,
  from: Date,
  to: Date
): Promise<ScheduledPost[]> {
  const posts = await db
    .select()
    .from(snsPosts)
    .where(
      and(
        eq(snsPosts.platform, platform),
        isNull(snsPosts.postedAt),
        gte(snsPosts.scheduledAt, from),
        lte(snsPosts.scheduledAt, to)
      )
    );

  return posts as ScheduledPost[];
}

/**
 * Finds all posts that are due for posting (scheduledAt <= now, not yet posted)
 * and executes them via the appropriate platform-specific posting function.
 *
 * After posting, each record is updated with `postedAt` and `externalId`.
 * Failed posts are logged but do not prevent other posts from executing.
 *
 * @param db - Drizzle ORM database instance
 * @returns Summary of how many posts succeeded and failed
 */
export async function executeScheduledPosts(
  db: any
): Promise<{ posted: number; failed: number }> {
  const now = new Date();

  // Fetch all posts due for execution
  const duePosts = await db
    .select()
    .from(snsPosts)
    .where(and(isNull(snsPosts.postedAt), lte(snsPosts.scheduledAt, now)));

  let posted = 0;
  let failed = 0;

  for (const post of duePosts) {
    try {
      let externalId: string | null = null;

      if (post.platform === "twitter") {
        const hashtags = Array.isArray(post.hashtags)
          ? (post.hashtags as string[])
          : undefined;
        const result = await postToTwitter(post.content, hashtags);
        externalId = result.id;
      } else if (post.platform === "tiktok") {
        if (!post.mediaUrl) {
          throw new Error("TikTok post requires a mediaUrl");
        }
        const metadata: TikTokPostData = {
          title: post.content.slice(0, 100),
          description: post.content,
          hashtags: Array.isArray(post.hashtags)
            ? (post.hashtags as string[])
            : [],
        };
        const result = await postToTikTok(post.mediaUrl, metadata);
        externalId = result.id;
      } else {
        console.warn(
          `[Scheduler] Unsupported platform "${post.platform}" for post ${post.id}, skipping.`
        );
        failed++;
        continue;
      }

      // Update the post record with posting result
      await db
        .update(snsPosts)
        .set({
          postedAt: now,
          externalId,
        })
        .where(eq(snsPosts.id, post.id));

      posted++;
    } catch (err) {
      console.error(
        `[Scheduler] Failed to execute post ${post.id}:`,
        err instanceof Error ? err.message : err
      );
      failed++;
    }
  }

  return { posted, failed };
}

/**
 * Automatically schedules an X (Twitter) promotion post when a new article
 * is published.
 *
 * The post is scheduled for the next available evening slot (21:00 JST).
 * Uses `generateArticlePromoPost` to create the tweet content.
 *
 * @param db - Drizzle ORM database instance
 * @param article - The published article data
 * @param article.id - Article ID
 * @param article.title - Article title
 * @param article.url - Full URL to the article
 * @param article.excerpt - Short excerpt/summary of the article
 */
export async function scheduleArticlePromo(
  db: any,
  article: { id: number; title: string; url: string; excerpt: string }
): Promise<void> {
  const promoContent = generateArticlePromoPost({
    title: article.title,
    url: article.url,
    excerpt: article.excerpt,
  });

  // Schedule for the next 21:00 JST
  const scheduledAt = getNextScheduleTime(21, 0, "Asia/Tokyo");

  await schedulePost(db, {
    platform: "twitter",
    templateType: "article-promo",
    content: promoContent,
    hashtags: HASHTAG_SET,
    articleId: article.id,
    scheduledAt,
  });
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Calculates the next occurrence of a specific hour:minute in a given timezone.
 * If the target time has already passed today, schedules for tomorrow.
 */
function getNextScheduleTime(
  hour: number,
  minute: number,
  timezone: string
): Date {
  const now = new Date();

  // Create a date string in the target timezone to determine today's date there
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(now);
  const tzYear = Number(parts.find((p) => p.type === "year")?.value);
  const tzMonth = Number(parts.find((p) => p.type === "month")?.value) - 1;
  const tzDay = Number(parts.find((p) => p.type === "day")?.value);
  const tzHour = Number(parts.find((p) => p.type === "hour")?.value);
  const tzMinute = Number(parts.find((p) => p.type === "minute")?.value);

  // Determine if the target time has passed today in the target timezone
  const targetPassedToday =
    tzHour > hour || (tzHour === hour && tzMinute >= minute);

  // Build target date in the timezone
  const targetDay = targetPassedToday ? tzDay + 1 : tzDay;

  // Create an approximate target date (using UTC, then adjusting)
  // This is a simplified approach; for production, consider a timezone library
  const targetDate = new Date(
    Date.UTC(tzYear, tzMonth, targetDay, hour, minute, 0)
  );

  // Calculate the offset between UTC and the target timezone
  const utcFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    hour: "2-digit",
    hour12: false,
  });
  const tzFormatterHour = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    hour12: false,
  });

  const refDate = new Date(Date.UTC(tzYear, tzMonth, tzDay, 12, 0, 0));
  const utcHour = Number(
    utcFormatter.formatToParts(refDate).find((p) => p.type === "hour")?.value
  );
  const localHour = Number(
    tzFormatterHour.formatToParts(refDate).find((p) => p.type === "hour")?.value
  );
  const offsetHours = localHour - utcHour;

  // Adjust the target date by subtracting the timezone offset
  targetDate.setUTCHours(targetDate.getUTCHours() - offsetHours);

  return targetDate;
}
