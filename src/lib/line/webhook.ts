/**
 * LINE Webhook ハンドラー
 *
 * LINE Messaging APIからのWebhookイベントを処理する。
 * フォローイベント、ポストバックイベント（セグメント選択）を処理。
 */

import crypto from "crypto";
import { notifySlack } from "@/lib/notifications/slack";
import { type LineSegment } from "./segments";

/** LINE Webhookイベント型 */
export type LineWebhookEvent = {
  type: "follow" | "unfollow" | "message" | "postback";
  source: {
    type: "user" | "group" | "room";
    userId: string;
  };
  timestamp: number;
  replyToken?: string;
  message?: {
    type: string;
    text?: string;
  };
  postback?: {
    data: string;
  };
};

/** Webhookリクエストボディ */
export type LineWebhookBody = {
  events: LineWebhookEvent[];
  destination: string;
};

/**
 * Webhook署名を検証する
 *
 * @param body - リクエストボディ文字列
 * @param signature - X-Line-Signature ヘッダー値
 * @returns 署名が有効ならtrue
 */
export function verifySignature(body: string, signature: string): boolean {
  const channelSecret = process.env.LINE_CHANNEL_SECRET;
  if (!channelSecret) {
    throw new Error("LINE_CHANNEL_SECRET is not set");
  }

  const hmac = crypto.createHmac("SHA256", channelSecret);
  hmac.update(body);
  const expectedSignature = hmac.digest("base64");

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

/**
 * Webhookイベントを処理する
 *
 * @param event - LINE Webhookイベント
 * @param callbacks - イベント処理コールバック
 */
export async function handleWebhookEvent(
  event: LineWebhookEvent,
  callbacks: {
    onNewSubscriber?: (userId: string) => Promise<void>;
    onSegmentSelected?: (userId: string, segment: LineSegment) => Promise<void>;
    onUnsubscribe?: (userId: string) => Promise<void>;
  } = {}
): Promise<void> {
  try {
    switch (event.type) {
      case "follow":
        await handleFollow(event, callbacks.onNewSubscriber);
        break;
      case "unfollow":
        if (callbacks.onUnsubscribe) {
          await callbacks.onUnsubscribe(event.source.userId);
        }
        break;
      case "postback":
        await handlePostback(event, callbacks.onSegmentSelected);
        break;
      case "message":
        await handleMessage(event);
        break;
    }
  } catch (error) {
    await notifySlack(
      `LINE Webhookエラー: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * フォローイベント（新規登録）を処理する
 */
async function handleFollow(
  event: LineWebhookEvent,
  onNewSubscriber?: (userId: string) => Promise<void>
): Promise<void> {
  const userId = event.source.userId;
  console.log(`[LINE Webhook] 新規フォロー: ${userId}`);

  // コールバック（DB登録など）
  if (onNewSubscriber) {
    await onNewSubscriber(userId);
  }
}

/**
 * ポストバックイベント（セグメント選択）を処理する
 */
async function handlePostback(
  event: LineWebhookEvent,
  onSegmentSelected?: (userId: string, segment: LineSegment) => Promise<void>
): Promise<void> {
  if (!event.postback) return;

  const data = event.postback.data;
  const userId = event.source.userId;

  // セグメント選択の処理
  const segmentMatch = data.match(/^segment=(\w+)$/);
  if (segmentMatch) {
    const segment = segmentMatch[1] as LineSegment;
    if (onSegmentSelected) {
      await onSegmentSelected(userId, segment);
    }
  }
}

/**
 * メッセージイベントを処理する（キーワード応答）
 */
async function handleMessage(event: LineWebhookEvent): Promise<void> {
  if (!event.message?.text) return;
  // メッセージ応答ロジックはアプリケーション層で実装
  console.log(`[LINE Webhook] メッセージ受信: ${event.source.userId}`);
}
