/**
 * SNS投稿エージェント
 *
 * 記事公開時に各SNSプラットフォームへの投稿を自動生成・スケジューリング。
 * X（Twitter）、YouTube概要欄、TikTok/ショート動画構成を自動作成。
 *
 * 入力: 記事情報
 * 出力: プラットフォーム別投稿テキスト
 */

import { generateArticlePost, generateXPost, postTweet } from "@/lib/sns/twitter";
import { generateVideoMetadata, type VideoMetadata } from "@/lib/sns/youtube";
import { generateShortVideoScript, type ShortVideoScript } from "@/lib/sns/tiktok";
import { createScheduledPost, type ScheduledPost } from "@/lib/sns/scheduler";
import { defaultHashtags } from "@/lib/sns/templates";
import type { XPostTemplateType } from "@/lib/sns/templates";
import type { YouTubeVideoCategory } from "@/lib/sns/templates";
import type { ShortVideoTemplateType } from "@/lib/sns/templates";

/** SNS投稿ドラフト */
export type SnsPostDraft = {
  /** プラットフォーム */
  platform: "twitter" | "youtube" | "tiktok" | "line";
  /** 投稿内容 */
  content: string;
  /** ハッシュタグ */
  hashtags?: string[];
  /** 投稿予定日時 */
  scheduledAt?: Date;
};

/**
 * 記事公開時の全SNS投稿を一括生成する
 *
 * @param articleTitle - 記事タイトル
 * @param articleUrl - 記事URL
 * @param excerpt - 記事抜粋
 * @returns プラットフォーム別の投稿ドラフト配列
 */
export async function generateSnsPosts(
  articleTitle: string,
  articleUrl: string,
  excerpt: string
): Promise<SnsPostDraft[]> {
  const drafts: SnsPostDraft[] = [];

  // X（Twitter）投稿を生成
  const tweetText = generateArticlePost(articleTitle, excerpt, articleUrl);
  drafts.push({
    platform: "twitter",
    content: tweetText,
    hashtags: [...defaultHashtags],
  });

  return drafts;
}

/**
 * テンプレートベースのX投稿を生成する
 *
 * @param templateType - テンプレートタイプ
 * @param variables - テンプレート変数
 * @returns 投稿ドラフト
 */
export function generateTemplatePost(
  templateType: XPostTemplateType,
  variables: Record<string, string>
): SnsPostDraft {
  const content = generateXPost(templateType, variables);
  return {
    platform: "twitter",
    content,
    hashtags: [...defaultHashtags],
  };
}

/**
 * X投稿を即座に実行する
 *
 * @param content - 投稿内容
 * @returns 投稿結果
 */
export async function postToTwitter(content: string) {
  return postTweet(content);
}

/**
 * YouTube動画メタデータを記事から自動生成する
 *
 * @param articleTitle - 元記事タイトル
 * @param articleContent - 元記事コンテンツ
 * @param category - 動画カテゴリ
 * @param articleUrl - 元記事URL
 * @returns 動画メタデータ
 */
export async function generateYouTubeMetadata(
  articleTitle: string,
  articleContent: string,
  category: YouTubeVideoCategory,
  articleUrl: string
): Promise<VideoMetadata> {
  return generateVideoMetadata(articleTitle, articleContent, category, articleUrl);
}

/**
 * TikTok/YouTubeショートの構成案を生成する
 *
 * @param articleTitle - 元記事タイトル
 * @param articleContent - 元記事コンテンツ
 * @param templateType - テンプレートタイプ
 * @returns ショート動画構成案
 */
export async function generateShortVideo(
  articleTitle: string,
  articleContent: string,
  templateType: ShortVideoTemplateType
): Promise<ShortVideoScript> {
  return generateShortVideoScript(articleTitle, articleContent, templateType);
}

/**
 * 投稿をスケジュールに登録する
 *
 * @param draft - 投稿ドラフト
 * @param scheduledAt - 投稿予定日時
 * @returns スケジュール済み投稿
 */
export function schedulePost(
  draft: SnsPostDraft,
  scheduledAt: Date
): ScheduledPost {
  const platform = draft.platform === "tiktok" || draft.platform === "line"
    ? "tiktok" as const
    : draft.platform === "youtube"
      ? "youtube_short" as const
      : "twitter" as const;

  return createScheduledPost(platform, draft.content, scheduledAt);
}
