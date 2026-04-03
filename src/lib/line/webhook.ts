/**
 * LINE Webhook ハンドラー
 *
 * LINE Messaging APIからのWebhookイベントを処理する。
 * フォローイベント、ポストバックイベント（セグメント選択）を処理。
 */

import crypto from "crypto";
import { sendStepMessage, sendSegmentQuestion } from "./messaging";
import { welcomeMessage, getStepMessages } from "./step-delivery";
import { type LineSegment } from "./segments";
import { notifySlack } from "@/lib/notifications/slack";

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

  // ウェルカムメッセージ送信
  await sendStepMessage(userId, welcomeMessage);

  // セグメント質問を送信
  await sendSegmentQuestion(userId);

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

    // Day 1メッセージを取得して送信予約（実際にはDBでスケジュール管理）
    const steps = getStepMessages(segment);
    const day1Message = steps.find((s) => s.dayOffset === 1);
    if (day1Message) {
      // Day1は翌日に自動送信されるので、ここでは確認メッセージのみ
      await sendStepMessage(userId, {
        dayOffset: 0,
        title: "セグメント設定完了",
        body: `ランク設定ありがとうございます！\nあなたに合った攻略情報を配信していきます。\n\n明日から毎日、上達に役立つ情報をお届けしますのでお楽しみに！`,
        segment: null,
      });
    }

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

  const text = event.message.text;
  const userId = event.source.userId;

  // 「無料ガイドが欲しい」へのリッチメニュー応答
  if (text.includes("無料ガイド")) {
    await sendStepMessage(userId, {
      dayOffset: 0,
      title: "無料ガイド",
      body: `📖 無料ガイドはこちらからダウンロードできます！\n\n「Apex初心者スタートダッシュガイド」\n✅ 最初にやるべき設定5つ\n✅ 初心者おすすめキャラ3選\n✅ 射撃訓練場の15分練習メニュー`,
      ctaUrl: "https://litwill-garden.com/guides/starter-pdf",
      ctaLabel: "無料PDFをダウンロード",
      segment: null,
    });
  }

  // コーチング希望
  if (text.includes("コーチング希望")) {
    await sendStepMessage(userId, {
      dayOffset: 0,
      title: "コーチング申し込み",
      body: `コーチングにご興味いただきありがとうございます！\n\n現在サービス準備中です。開始時に優先的にご案内いたします。\n\nしばらくお待ちください。`,
      segment: null,
    });
  }
}
