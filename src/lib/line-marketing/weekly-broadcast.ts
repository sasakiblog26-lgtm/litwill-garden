/**
 * Weekly broadcast (週次一斉配信) for Litwill Garden.
 *
 * Generates a digest of the week's best content and sends it to all
 * active LINE subscribers.
 *
 * @module line-marketing/weekly-broadcast
 */

import { isNull } from "drizzle-orm";

import { lineSubscribers, articles } from "@/lib/db/schema";
import { sendMulticast, createFlexMessage } from "./client";
import type { Subscriber } from "./segments";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A compiled weekly digest ready for broadcast. */
export type WeeklyDigest = {
  weekStart: string;
  weekEnd: string;
  topArticles: {
    title: string;
    slug: string;
    excerpt: string;
  }[];
  subscriberCount: number;
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Generates a weekly digest from the latest published articles.
 *
 * Pulls the top 5 articles published in the last 7 days, ordered by
 * publication date (newest first).
 *
 * @param db - Drizzle ORM database instance.
 * @returns A `WeeklyDigest` object.
 */
export async function generateWeeklyDigest(db: any): Promise<WeeklyDigest> {
  const { gte, desc } = await import("drizzle-orm");

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const weekStart = weekAgo.toISOString().slice(0, 10);
  const weekEnd = now.toISOString().slice(0, 10);

  const recentArticles = await db
    .select({
      title: articles.title,
      slug: articles.slug,
      excerpt: articles.excerpt,
    })
    .from(articles)
    .where(gte(articles.publishedAt, weekAgo))
    .orderBy(desc(articles.publishedAt))
    .limit(5);

  const activeSubscribers: Subscriber[] = await db
    .select()
    .from(lineSubscribers)
    .where(isNull(lineSubscribers.unsubscribedAt));

  return {
    weekStart,
    weekEnd,
    topArticles: recentArticles,
    subscriberCount: activeSubscribers.length,
  };
}

/**
 * Sends the weekly digest as a LINE Flex Message to all active subscribers.
 *
 * @param db     - Drizzle ORM database instance.
 * @param digest - The weekly digest to broadcast (from {@link generateWeeklyDigest}).
 * @returns The number of subscribers the digest was sent to.
 */
export async function sendWeeklyBroadcast(
  db: any,
  digest: WeeklyDigest,
): Promise<number> {
  if (digest.topArticles.length === 0) {
    console.log("[WeeklyBroadcast] No articles this week, skipping broadcast.");
    return 0;
  }

  const activeSubscribers: Subscriber[] = await db
    .select()
    .from(lineSubscribers)
    .where(isNull(lineSubscribers.unsubscribedAt));

  if (activeSubscribers.length === 0) {
    console.log("[WeeklyBroadcast] No active subscribers, skipping.");
    return 0;
  }

  const userIds = activeSubscribers.map((s) => s.userId);

  const articleBubbles = digest.topArticles.map((article) => ({
    type: "box" as const,
    layout: "vertical" as const,
    margin: "lg" as const,
    contents: [
      {
        type: "text" as const,
        text: article.title,
        weight: "bold" as const,
        size: "sm" as const,
        wrap: true,
      },
      {
        type: "text" as const,
        text: article.excerpt || "",
        size: "xs" as const,
        color: "#888888",
        wrap: true,
        margin: "sm" as const,
      },
      {
        type: "button" as const,
        action: {
          type: "uri" as const,
          label: "読む",
          uri: `https://litwill-garden.com/articles/${article.slug}`,
        },
        style: "link" as const,
        height: "sm" as const,
      },
    ],
  }));

  const flexContents = {
    type: "bubble",
    header: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "text",
          text: `今週のおすすめ記事`,
          weight: "bold",
          size: "lg",
        },
        {
          type: "text",
          text: `${digest.weekStart} 〜 ${digest.weekEnd}`,
          size: "xs",
          color: "#888888",
        },
      ],
    },
    body: {
      type: "box",
      layout: "vertical",
      contents: articleBubbles,
    },
    footer: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "button",
          action: {
            type: "uri",
            label: "すべての記事を見る",
            uri: "https://litwill-garden.com/guides",
          },
          style: "primary",
        },
      ],
    },
  };

  const message = createFlexMessage(
    `今週のおすすめ記事 (${digest.weekStart}〜${digest.weekEnd})`,
    flexContents,
  );

  await sendMulticast(userIds, [message]);

  return userIds.length;
}
