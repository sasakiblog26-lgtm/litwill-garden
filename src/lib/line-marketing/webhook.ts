/**
 * LINE Webhook event handling for Litwill Garden.
 *
 * Processes incoming webhook events from the LINE Platform including
 * follow, unfollow, and message events.
 *
 * @module line-marketing/webhook
 */

import { eq } from "drizzle-orm";
import { createHmac } from "crypto";

import { lineSubscribers } from "@/lib/db/schema";
import type { AppDb } from "@/lib/db";
import { replyMessage, createTextMessage } from "./client";
import { SEGMENT_CONFIG, assignSegment, createRankQuestionMessage } from "./segments";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A LINE Platform webhook event. */
export type LineWebhookEvent = {
  type: "message" | "follow" | "unfollow" | "postback";
  replyToken?: string;
  source: {
    type: "user" | "group" | "room";
    userId: string;
  };
  message?: {
    type: string;
    text?: string;
  };
  postback?: {
    data: string;
  };
  timestamp: number;
};

// ---------------------------------------------------------------------------
// Signature Verification
// ---------------------------------------------------------------------------

/**
 * Verifies the LINE webhook signature using HMAC-SHA256.
 *
 * @param body            - The raw request body as a string.
 * @param signature       - The `x-line-signature` header value.
 * @param channelSecret   - The LINE channel secret (defaults to env var).
 * @returns `true` if the signature is valid.
 */
export function verifySignature(
  body: string,
  signature: string,
  channelSecret: string = process.env.LINE_CHANNEL_SECRET ?? "",
): boolean {
  const hash = createHmac("sha256", channelSecret)
    .update(body)
    .digest("base64");

  return hash === signature;
}

// ---------------------------------------------------------------------------
// Event Handler
// ---------------------------------------------------------------------------

/**
 * Handles a single LINE webhook event.
 *
 * Supported events:
 * - **follow**: Registers the subscriber and asks for their rank.
 * - **unfollow**: Marks the subscriber as unsubscribed.
 * - **message (text)**: Processes rank selection or replies with help text.
 *
 * @param db    - Drizzle ORM database instance.
 * @param event - The webhook event to process.
 */
export async function handleWebhookEvent(
  db: AppDb,
  event: LineWebhookEvent,
): Promise<void> {
  const userId = event.source.userId;

  switch (event.type) {
    case "follow":
      await handleFollow(db, userId, event.replyToken);
      break;

    case "unfollow":
      await handleUnfollow(db, userId);
      break;

    case "message":
      if (event.message?.type === "text" && event.message.text) {
        await handleTextMessage(
          db,
          userId,
          event.message.text,
          event.replyToken,
        );
      }
      break;
  }
}

// ---------------------------------------------------------------------------
// Internal handlers
// ---------------------------------------------------------------------------

/**
 * Handles a follow event — registers the new subscriber and asks for rank.
 */
async function handleFollow(
  db: AppDb,
  userId: string,
  replyToken?: string,
): Promise<void> {
  // Upsert subscriber
  const existing = await db
    .select()
    .from(lineSubscribers)
    .where(eq(lineSubscribers.userId, userId))
    .limit(1);

  if (existing.length > 0) {
    // Re-subscribe (previously unfollowed)
    await db
      .update(lineSubscribers)
      .set({ unsubscribedAt: null })
      .where(eq(lineSubscribers.userId, userId));
  } else {
    await db.insert(lineSubscribers).values({
      userId,
      subscribedAt: new Date(),
    });
  }

  // Ask for their rank
  if (replyToken) {
    const welcome = createTextMessage(
      "リトウィルガーデンへようこそ！\nApex Legendsの攻略情報をお届けします。\n\nまず、あなたのランクを教えてください。",
    );
    const rankQuestion = createRankQuestionMessage();
    await replyMessage(replyToken, [welcome, rankQuestion]);
  }
}

/**
 * Handles an unfollow event — marks the subscriber as unsubscribed.
 */
async function handleUnfollow(db: AppDb, userId: string): Promise<void> {
  await db
    .update(lineSubscribers)
    .set({ unsubscribedAt: new Date() })
    .where(eq(lineSubscribers.userId, userId));
}

/**
 * Handles an incoming text message.
 *
 * If the text matches a rank choice, assigns the segment.
 * Otherwise, replies with a default help message.
 */
async function handleTextMessage(
  db: AppDb,
  userId: string,
  text: string,
  replyToken?: string,
): Promise<void> {
  // Check if the text is a rank selection
  if (text in SEGMENT_CONFIG) {
    const segment = await assignSegment(db, userId, text);
    if (replyToken) {
      const segmentNames: Record<string, string> = {
        beginner: "ルーキー〜ブロンズ",
        "silver-gold": "シルバー〜ゴールド",
        "platinum-above": "プラチナ以上",
      };
      await replyMessage(replyToken, [
        createTextMessage(
          `ランクを「${segmentNames[segment]}」に設定しました！\nあなたに合った攻略情報をお届けしますね。\n\n明日から配信が始まります。お楽しみに！`,
        ),
      ]);
    }
    return;
  }

  // Default reply
  if (replyToken) {
    await replyMessage(replyToken, [
      createTextMessage(
        "メッセージありがとうございます！\n\nメニューから攻略記事やガイドにアクセスできます。\nランクを変更したい場合は、以下から選び直してください。",
      ),
      createRankQuestionMessage(),
    ]);
  }
}
