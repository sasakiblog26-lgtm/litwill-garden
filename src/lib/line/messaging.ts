/**
 * LINE Messaging API連携
 *
 * LINE公式アカウントのメッセージ送信・ユーザー管理を行う。
 * 全メッセージに特商法解除導線を含める。
 */

import { notifySlack } from "@/lib/notifications/slack";
import { appendTokushoho, type StepMessage } from "./step-delivery";
import type { LineSegment } from "./segments";

/** LINE Messaging API のベースURL */
const LINE_API_BASE = "https://api.line.me/v2/bot";

/** LINEメッセージ型 */
export type LineMessage = {
  type: "text" | "template" | "flex";
  text?: string;
  template?: Record<string, unknown>;
  contents?: Record<string, unknown>;
};

/**
 * アクセストークンを取得する
 */
function getAccessToken(): string {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!token) {
    throw new Error("LINE_CHANNEL_ACCESS_TOKEN is not set");
  }
  return token;
}

/**
 * リトライ付きAPIリクエスト
 */
async function withRetry<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) {
        await notifySlack(
          `LINE API エラー（${maxRetries}回リトライ後）: ${error instanceof Error ? error.message : String(error)}`
        );
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }
  throw new Error("Unreachable");
}

/**
 * ユーザーにプッシュメッセージを送信する
 *
 * @param userId - LINEユーザーID
 * @param messages - 送信するメッセージ配列
 */
export async function pushMessage(
  userId: string,
  messages: LineMessage[]
): Promise<void> {
  const token = getAccessToken();

  await withRetry(async () => {
    const response = await fetch(`${LINE_API_BASE}/message/push`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ to: userId, messages }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`LINE API error: ${response.status} - ${errorBody}`);
    }
  });
}

/**
 * ステップメッセージをLINEメッセージ形式に変換して送信する
 *
 * @param userId - LINEユーザーID
 * @param stepMessage - ステップメッセージ
 */
export async function sendStepMessage(
  userId: string,
  stepMessage: StepMessage
): Promise<void> {
  const bodyWithTokushoho = appendTokushoho(stepMessage.body);

  const messages: LineMessage[] = [{ type: "text", text: bodyWithTokushoho }];

  // CTAボタン付きの場合はテンプレートメッセージを追加
  if (stepMessage.ctaUrl && stepMessage.ctaLabel) {
    messages.push({
      type: "template",
      template: {
        type: "buttons",
        text: stepMessage.ctaLabel,
        actions: [
          {
            type: "uri",
            label: stepMessage.ctaLabel,
            uri: stepMessage.ctaUrl,
          },
        ],
      },
    });
  }

  await pushMessage(userId, messages);
}

/**
 * マルチキャストメッセージ（セグメント別配信）を送信する
 *
 * @param userIds - 送信先ユーザーID配列
 * @param messages - 送信するメッセージ配列
 */
export async function multicastMessage(
  userIds: string[],
  messages: LineMessage[]
): Promise<void> {
  const token = getAccessToken();

  // LINE APIのマルチキャストは500件まで
  const batchSize = 500;
  for (let i = 0; i < userIds.length; i += batchSize) {
    const batch = userIds.slice(i, i + batchSize);

    await withRetry(async () => {
      const response = await fetch(`${LINE_API_BASE}/message/multicast`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ to: batch, messages }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`LINE API error: ${response.status} - ${errorBody}`);
      }
    });
  }
}

/**
 * 週次ニュースまとめを全ユーザーにブロードキャスト配信する
 *
 * @param newsContent - ニュース内容
 * @param recommendedArticles - おすすめ記事リスト
 */
export async function broadcastWeeklyNews(
  newsContent: string,
  recommendedArticles: string[]
): Promise<void> {
  const token = getAccessToken();

  const articleList = recommendedArticles.map((a) => `▶ ${a}`).join("\n");
  const body = `📰 今週のApexニュースまとめ

${newsContent}

━━━━━━━━━━━━━
📖 今週のおすすめ記事
${articleList}

🎮 来週も一緒に上達しましょう！`;

  const bodyWithTokushoho = appendTokushoho(body);

  await withRetry(async () => {
    const response = await fetch(`${LINE_API_BASE}/message/broadcast`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        messages: [{ type: "text", text: bodyWithTokushoho }],
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`LINE API error: ${response.status} - ${errorBody}`);
    }
  });
}

/**
 * ランクセグメント質問のクイックリプライメッセージを送信する
 *
 * @param userId - LINEユーザーID
 */
export async function sendSegmentQuestion(userId: string): Promise<void> {
  const token = getAccessToken();

  await withRetry(async () => {
    const response = await fetch(`${LINE_API_BASE}/message/push`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        to: userId,
        messages: [
          {
            type: "text",
            text: "あなたの現在のランクは？\nあなたに合った攻略情報をお届けします！",
            quickReply: {
              items: [
                {
                  type: "action",
                  action: {
                    type: "postback",
                    label: "ルーキー〜ブロンズ",
                    data: "segment=beginner",
                    displayText: "ルーキー〜ブロンズ",
                  },
                },
                {
                  type: "action",
                  action: {
                    type: "postback",
                    label: "シルバー〜ゴールド",
                    data: "segment=intermediate",
                    displayText: "シルバー〜ゴールド",
                  },
                },
                {
                  type: "action",
                  action: {
                    type: "postback",
                    label: "プラチナ以上",
                    data: "segment=advanced",
                    displayText: "プラチナ以上",
                  },
                },
              ],
            },
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`LINE API error: ${response.status} - ${errorBody}`);
    }
  });
}
