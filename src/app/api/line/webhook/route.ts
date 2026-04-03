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
            // TODO: DBにLINE登録者を保存
            console.log(`[LINE] New subscriber: ${userId}`);
          },
          onSegmentSelected: async (userId, segment) => {
            // TODO: DBのセグメントを更新
            console.log(`[LINE] Segment selected: ${userId} -> ${segment}`);
          },
          onUnsubscribe: async (userId) => {
            // TODO: DBのisActiveをfalseに更新
            console.log(`[LINE] Unsubscribed: ${userId}`);
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
