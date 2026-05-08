/**
 * LINE Webhook APIルート
 *
 * LINE Messaging APIからのWebhookイベントを受信・処理する。
 * フォロー・アンフォロー・ポストバック（セグメント選択）を処理。
 */

import { NextResponse } from "next/server";
import {
  verifySignature,
  handleWebhookEvent,
  type LineWebhookBody,
} from "@/lib/line/webhook";
import { getDb } from "@/lib/db";
import { lineSubscribers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { LineSegment } from "@/lib/line/segments";

const segmentMap: Record<LineSegment, "beginner" | "silver-gold" | "platinum-above"> = {
  beginner: "beginner",
  intermediate: "silver-gold",
  advanced: "platinum-above",
};

/**
 * POST /api/line/webhook
 *
 * LINE Messaging APIからのWebhookを受信する。
 */
export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-line-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 401 });
    }

    // 署名検証
    if (!verifySignature(body, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const webhookBody = JSON.parse(body) as LineWebhookBody;

    // 各イベントを処理
    await Promise.all(
      webhookBody.events.map((event) =>
        handleWebhookEvent(event, {
          onNewSubscriber: async (userId) => {
            await getDb()
              .insert(lineSubscribers)
              .values({
                userId,
                segment: "beginner",
                step: 0,
                unsubscribedAt: null,
              })
              .onConflictDoUpdate({
                target: lineSubscribers.userId,
                set: {
                  unsubscribedAt: null,
                  nextDeliveryAt: null,
                },
              });
          },
          onSegmentSelected: async (userId, segment) => {
            await getDb()
              .update(lineSubscribers)
              .set({
                segment: segmentMap[segment],
                rankTier: segment,
                step: 0,
                nextDeliveryAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
              })
              .where(eq(lineSubscribers.userId, userId));
          },
          onUnsubscribe: async (userId) => {
            await getDb()
              .update(lineSubscribers)
              .set({ unsubscribedAt: new Date(), nextDeliveryAt: null })
              .where(eq(lineSubscribers.userId, userId));
          },
        })
      )
    );

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("[LINE Webhook] Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
