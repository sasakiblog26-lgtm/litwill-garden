/**
 * LINE subscriber segment management for Litwill Garden.
 *
 * Segments subscribers based on their area of interest (occupation, self-understanding,
 * love & relationships, or life purpose), enabling targeted step-delivery and
 * content recommendations.
 *
 * @module line-marketing/segments
 */

import { eq } from "drizzle-orm";

import { lineSubscribers } from "@/lib/db/schema";
import type { AppDb } from "@/lib/db";
import type { LineMessage } from "./client";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/**
 * Subscriber segment derived from the user's self-reported area of interest.
 *
 * - `"beginner"` – 占い・心理学に興味を持ち始めた方
 * - `"silver-gold"` – 恋愛・人間関係を深く知りたい方
 * - `"platinum-above"` – 自分の使命や人生テーマを探りたい方
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
 * Maps interest choice text (as sent by the user via quick-reply) to a segment.
 */
export const SEGMENT_CONFIG: Record<string, Segment> = {
  "占い・心理学に興味を持ち始めた": "beginner",
  "恋愛・人間関係を深く知りたい": "silver-gold",
  "自分の使命や人生テーマを探りたい": "platinum-above",
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Assigns a segment to a subscriber based on their interest choice.
 *
 * Updates the `segment` column in the `lineSubscribers` table and schedules
 * the first step delivery for the next day.
 *
 * @param db           - Drizzle ORM database instance.
 * @param userId       - LINE user ID.
 * @param interestChoice - The interest text the user selected.
 * @returns The resolved `Segment`.
 * @throws If `interestChoice` does not match any known segment.
 */
export async function assignSegment(
  db: AppDb,
  userId: string,
  interestChoice: string,
): Promise<Segment> {
  const segment = SEGMENT_CONFIG[interestChoice];
  if (!segment) {
    throw new Error(`Unknown interest choice: "${interestChoice}"`);
  }

  const now = new Date();
  const nextDelivery = new Date(now.getTime() + 24 * 60 * 60 * 1000); // +1 day

  await db
    .update(lineSubscribers)
    .set({
      segment,
      rankTier: interestChoice,
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
  db: AppDb,
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
 * Creates a LINE quick-reply message asking the user for their area of interest.
 *
 * @returns A `LineMessage` with type `"text"` and quick-reply actions.
 */
export function createInterestQuestionMessage(): LineMessage {
  return {
    type: "text" as const,
    text: "あなたの一番の関心事を教えてください✨\n以下から選んでください👇",
    ...({
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
    }),
  };
}
