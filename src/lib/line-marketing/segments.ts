/**
 * LINE subscriber segment management for Litwill Garden.
 *
 * Segments subscribers based on their Apex Legends rank into three tiers,
 * enabling targeted step-delivery and content recommendations.
 *
 * @module line-marketing/segments
 */

import { eq } from "drizzle-orm";

import { lineSubscribers } from "@/lib/db/schema";
import type { LineMessage } from "./client";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Subscriber segment derived from the user's self-reported Apex rank.
 *
 * - `"beginner"` – ルーキー〜ブロンズ
 * - `"silver-gold"` – シルバー〜ゴールド
 * - `"platinum-above"` – プラチナ以上
 */
export type Segment = "beginner" | "silver-gold" | "platinum-above";

/** Subscriber row returned from the database. */
export type Subscriber = {
  id: number;
  userId: string;
  displayName: string | null;
  segment: string | null;
  rankTier: string | null;
  step: number | null;
  nextDeliveryAt: Date | null;
  richMenuId: string | null;
  tokushohoAcknowledged: boolean | null;
  subscribedAt: Date;
  unsubscribedAt: Date | null;
};

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * Maps rank choice text (as sent by the user via quick-reply) to a segment.
 */
export const SEGMENT_CONFIG: Record<string, Segment> = {
  "ルーキー〜ブロンズ": "beginner",
  "シルバー〜ゴールド": "silver-gold",
  "プラチナ以上": "platinum-above",
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Assigns a segment to a subscriber based on their rank choice.
 *
 * Updates the `segment` and `rankTier` columns in the `lineSubscribers`
 * table and schedules the first step delivery for the next day.
 *
 * @param db         - Drizzle ORM database instance.
 * @param userId     - LINE user ID.
 * @param rankChoice - The rank text the user selected (e.g. "ルーキー〜ブロンズ").
 * @returns The resolved `Segment`.
 * @throws If `rankChoice` does not match any known segment.
 */
export async function assignSegment(
  db: any,
  userId: string,
  rankChoice: string,
): Promise<Segment> {
  const segment = SEGMENT_CONFIG[rankChoice];
  if (!segment) {
    throw new Error(`Unknown rank choice: "${rankChoice}"`);
  }

  const now = new Date();
  const nextDelivery = new Date(now.getTime() + 24 * 60 * 60 * 1000); // +1 day

  await db
    .update(lineSubscribers)
    .set({
      segment,
      rankTier: rankChoice,
      step: 0,
      nextDeliveryAt: nextDelivery,
    })
    .where(eq(lineSubscribers.userId, userId));

  return segment;
}

/**
 * Retrieves all active (non-unsubscribed) subscribers belonging to a segment.
 *
 * @param db      - Drizzle ORM database instance.
 * @param segment - The target segment.
 * @returns Array of `Subscriber` records.
 */
export async function getSubscribersBySegment(
  db: any,
  segment: Segment,
): Promise<Subscriber[]> {
  const { and, isNull } = await import("drizzle-orm");

  const rows = await db
    .select()
    .from(lineSubscribers)
    .where(
      and(
        eq(lineSubscribers.segment, segment),
        isNull(lineSubscribers.unsubscribedAt),
      ),
    );

  return rows as Subscriber[];
}

/**
 * Creates a LINE quick-reply message asking the user for their current rank.
 *
 * The three choices map directly to the segments defined in
 * {@link SEGMENT_CONFIG}.
 *
 * @returns A `LineMessage` with type `"text"` and quick-reply actions.
 */
export function createRankQuestionMessage(): LineMessage {
  return {
    type: "text" as const,
    text: "あなたの現在のランクは？\n以下から選んでください👇",
    // NOTE: The quick-reply payload is attached as a top-level property.
    // LINE SDK expects `quickReply` alongside `type`/`text`, which is
    // compatible with our `LineMessage` type via structural typing.
    ...(({
      quickReply: {
        items: Object.keys(SEGMENT_CONFIG).map((label) => ({
          type: "action",
          action: {
            type: "message",
            label,
            text: label,
          },
        })),
      },
    }) as any),
  };
}
