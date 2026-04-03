/**
 * X（Twitter）投稿管理
 *
 * X API v2を使用した投稿作成・スケジューリング・パフォーマンス取得。
 */

import { notifySlack } from "@/lib/notifications/slack";
import {
  defaultHashtags,
  xPostTemplates,
  articlePublishTemplate,
  type XPostTemplateType,
} from "./templates";

/** X API認証情報 */
type XApiCredentials = {
  apiKey: string;
  apiSecret: string;
  accessToken: string;
  accessTokenSecret: string;
};

/** 投稿結果 */
export type XPostResult = {
  id: string;
  text: string;
  createdAt: string;
};

/** 投稿パフォーマンス */
export type XPostMetrics = {
  impressions: number;
  likes: number;
  retweets: number;
  replies: number;
  clicks: number;
};

/**
 * X API認証情報を取得する
 */
function getCredentials(): XApiCredentials {
  const apiKey = process.env.X_API_KEY;
  const apiSecret = process.env.X_API_SECRET;
  const accessToken = process.env.X_ACCESS_TOKEN;
  const accessTokenSecret = process.env.X_ACCESS_TOKEN_SECRET;

  if (!apiKey || !apiSecret || !accessToken || !accessTokenSecret) {
    throw new Error("X API credentials are not fully configured");
  }

  return { apiKey, apiSecret, accessToken, accessTokenSecret };
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
          `X API エラー（${maxRetries}回リトライ後）: ${error instanceof Error ? error.message : String(error)}`
        );
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }
  throw new Error("Unreachable");
}

/**
 * X APIにツイートを投稿する
 *
 * @param text - 投稿テキスト
 * @returns 投稿結果
 */
export async function postTweet(text: string): Promise<XPostResult> {
  const credentials = getCredentials();

  // 文字数チェック（280文字制限）
  if (text.length > 280) {
    throw new Error(`Tweet exceeds 280 characters (${text.length} chars)`);
  }

  return withRetry(async () => {
    const response = await fetch("https://api.twitter.com/2/tweets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${credentials.accessToken}`,
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`X API error: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as { data: { id: string; text: string } };
    return {
      id: data.data.id,
      text: data.data.text,
      createdAt: new Date().toISOString(),
    };
  });
}

/**
 * テンプレートを使ってX投稿テキストを生成する
 *
 * @param templateType - テンプレートタイプ
 * @param variables - テンプレート変数
 * @returns 生成されたツイートテキスト
 */
export function generateXPost(
  templateType: XPostTemplateType,
  variables: Record<string, string>
): string {
  const template = xPostTemplates.find((t) => t.type === templateType);
  if (!template) {
    throw new Error(`Unknown template type: ${templateType}`);
  }

  let text = template.format;
  for (const [key, value] of Object.entries(variables)) {
    text = text.replace(new RegExp(`\\{${key}\\}`, "g"), value);
  }

  // ハッシュタグ挿入
  text = text.replace("{hashtags}", defaultHashtags.join(" "));

  // 文字数チェック
  if (text.length > template.maxLength) {
    console.warn(
      `[X] Generated post exceeds ${template.maxLength} chars (${text.length}). Truncating.`
    );
    text = text.slice(0, template.maxLength - 3) + "...";
  }

  return text;
}

/**
 * 記事公開連動のX投稿を生成する
 *
 * @param title - 記事タイトル
 * @param excerpt - 記事抜粋
 * @param articleUrl - 記事URL
 * @returns 生成された投稿テキスト
 */
export function generateArticlePost(
  title: string,
  excerpt: string,
  articleUrl: string
): string {
  let text = articlePublishTemplate
    .replace("{title}", title)
    .replace("{excerpt}", excerpt)
    .replace("{article_url}", articleUrl)
    .replace("{hashtags}", defaultHashtags.join(" "));

  if (text.length > 280) {
    // 抜粋を短縮して制限内に収める
    const maxExcerpt = 280 - text.length + excerpt.length - 3;
    if (maxExcerpt > 20) {
      text = text.replace(excerpt, excerpt.slice(0, maxExcerpt) + "...");
    }
  }

  return text;
}

/**
 * 投稿のパフォーマンスデータを取得する
 *
 * @param tweetId - ツイートID
 * @returns パフォーマンスメトリクス
 */
export async function getPostMetrics(tweetId: string): Promise<XPostMetrics> {
  const credentials = getCredentials();

  return withRetry(async () => {
    const response = await fetch(
      `https://api.twitter.com/2/tweets/${tweetId}?tweet.fields=public_metrics`,
      {
        headers: {
          Authorization: `Bearer ${credentials.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`X API error: ${response.status}`);
    }

    const data = (await response.json()) as {
      data: {
        public_metrics: {
          impression_count: number;
          like_count: number;
          retweet_count: number;
          reply_count: number;
          url_link_clicks?: number;
        };
      };
    };

    const metrics = data.data.public_metrics;
    return {
      impressions: metrics.impression_count,
      likes: metrics.like_count,
      retweets: metrics.retweet_count,
      replies: metrics.reply_count,
      clicks: metrics.url_link_clicks ?? 0,
    };
  });
}
