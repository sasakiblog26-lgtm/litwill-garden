/**
 * YouTube動画メタデータ管理
 *
 * 動画メタデータ（タイトル案、ディスクリプション、タグ、サムネタイトル案）を
 * 記事データから自動生成する。動画アップロードは手動。
 */

import Anthropic from "@anthropic-ai/sdk";
import { notifySlack } from "@/lib/notifications/slack";
import {
  youtubeCategories,
  youtubeDescriptionTemplate,
  type YouTubeVideoCategory,
} from "./templates";

/** 動画メタデータ */
export type VideoMetadata = {
  /** タイトル案（複数） */
  titleCandidates: string[];
  /** ディスクリプション */
  description: string;
  /** タグ */
  tags: string[];
  /** サムネタイトル案（複数） */
  thumbnailTitles: string[];
  /** カテゴリ */
  category: YouTubeVideoCategory;
};

/**
 * 記事データから動画メタデータを自動生成する
 *
 * @param articleTitle - 元記事のタイトル
 * @param articleContent - 元記事のコンテンツ（Markdown）
 * @param category - 動画カテゴリ
 * @param articleUrl - 元記事のURL
 * @returns 生成された動画メタデータ
 */
export async function generateVideoMetadata(
  articleTitle: string,
  articleContent: string,
  category: YouTubeVideoCategory,
  articleUrl: string
): Promise<VideoMetadata> {
  const apiKey = process.env.CLAUDE_API_KEY;
  if (!apiKey) {
    throw new Error("CLAUDE_API_KEY is not set");
  }

  const client = new Anthropic({ apiKey });
  const categoryInfo = youtubeCategories[category];

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      system: `あなたはApex Legends攻略YouTubeチャンネル「Litwill Garden」の動画企画担当です。
記事データをもとに、YouTube動画のメタデータを生成してください。

動画カテゴリ: ${categoryInfo.label}（${categoryInfo.frequency}、${categoryInfo.duration}）

以下のJSON形式で出力してください：
{
  "titleCandidates": ["タイトル案1", "タイトル案2", "タイトル案3"],
  "description": "動画の説明文",
  "tags": ["タグ1", "タグ2", ...],
  "thumbnailTitles": ["サムネ文言1", "サムネ文言2"]
}

タイトルは以下を意識：
- 60文字以内
- 数字を含める（「3つの」「5分で」など）
- 感情を動かすワードを入れる（「衝撃」「必見」「神」など）

サムネタイトルは：
- 10〜15文字程度
- インパクト重視
- 視認性の高いワード選び`,
      messages: [
        {
          role: "user",
          content: `以下の記事をもとに動画メタデータを生成してください。\n\n記事タイトル: ${articleTitle}\n\n記事内容:\n${articleContent.slice(0, 3000)}`,
        },
      ],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("No text content in API response");
    }

    const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Failed to parse JSON from API response");
    }

    const parsed = JSON.parse(jsonMatch[0]) as {
      titleCandidates: string[];
      description: string;
      tags: string[];
      thumbnailTitles: string[];
    };

    // 説明欄テンプレートを適用
    const lineUrl = process.env.NEXT_PUBLIC_LINE_URL || "https://litwill-garden.com/line";
    const fullDescription = youtubeDescriptionTemplate
      .replace("{video_description}", parsed.description)
      .replace("{related_article_url}", articleUrl)
      .replace("{line_url}", lineUrl);

    return {
      ...parsed,
      description: fullDescription,
      category,
    };
  } catch (error) {
    await notifySlack(
      `YouTube メタデータ生成エラー: ${error instanceof Error ? error.message : String(error)}`
    );
    throw error;
  }
}

/**
 * YouTube説明欄テンプレートにサイトURL・LINE登録リンクを挿入して返す
 *
 * @param videoDescription - 動画の説明文
 * @param relatedArticleUrl - 関連記事URL
 * @returns 完成した説明欄テキスト
 */
export function buildDescription(
  videoDescription: string,
  relatedArticleUrl: string
): string {
  const lineUrl = process.env.NEXT_PUBLIC_LINE_URL || "https://litwill-garden.com/line";
  return youtubeDescriptionTemplate
    .replace("{video_description}", videoDescription)
    .replace("{related_article_url}", relatedArticleUrl)
    .replace("{line_url}", lineUrl);
}
