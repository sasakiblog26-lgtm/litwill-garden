/**
 * TikTok / YouTubeショート ショート動画管理
 *
 * ショート動画の構成案・台本を記事データから自動生成する。
 * 投稿スケジュール: 毎日1本（20:00 JST）
 */

import Anthropic from "@anthropic-ai/sdk";
import { notifySlack } from "@/lib/notifications/slack";
import { shortVideoTemplates, type ShortVideoTemplateType } from "./templates";

/** ショート動画構成案 */
export type ShortVideoScript = {
  /** テンプレートタイプ */
  type: ShortVideoTemplateType;
  /** タイトル */
  title: string;
  /** フック（最初の3秒） */
  hook: string;
  /** 本編内容 */
  mainContent: string;
  /** CTA */
  cta: string;
  /** 編集指示 */
  editingNotes: string;
  /** ハッシュタグ */
  hashtags: string[];
  /** 尺（秒） */
  durationSeconds: number;
};

/**
 * 記事データからショート動画の構成案を生成する
 *
 * @param articleTitle - 元記事のタイトル
 * @param articleContent - 元記事のコンテンツ
 * @param templateType - テンプレートタイプ
 * @returns ショート動画構成案
 */
export async function generateShortVideoScript(
  articleTitle: string,
  articleContent: string,
  templateType: ShortVideoTemplateType
): Promise<ShortVideoScript> {
  const apiKey = process.env.CLAUDE_API_KEY;
  if (!apiKey) {
    throw new Error("CLAUDE_API_KEY is not set");
  }

  const client = new Anthropic({ apiKey });
  const template = shortVideoTemplates.find((t) => t.type === templateType);
  if (!template) {
    throw new Error(`Unknown template type: ${templateType}`);
  }

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: `あなたはApex Legends攻略のTikTok/YouTubeショートの構成作家です。
30秒以内のショート動画の構成案を作成してください。

テンプレート: ${template.label}
尺: ${template.durationSeconds}秒
編集指示: ${template.editingNotes}

以下のJSON形式で出力：
{
  "title": "動画タイトル",
  "hook": "最初の3秒で視聴者を引きつけるフレーズ",
  "mainContent": "本編の構成（箇条書きで）",
  "cta": "最後のCTA（チャンネル登録、記事リンクなど）",
  "hashtags": ["ハッシュタグ1", "ハッシュタグ2", ...]
}

重要：
- 最初の3秒が命。強烈なフック必須。
- テンポよく、1シーン3秒以内。
- テロップは大きく、読みやすく。`,
      messages: [
        {
          role: "user",
          content: `以下の記事をもとにショート動画の構成案を作成してください。\n\n記事タイトル: ${articleTitle}\n\n記事内容:\n${articleContent.slice(0, 2000)}`,
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
      title: string;
      hook: string;
      mainContent: string;
      cta: string;
      hashtags: string[];
    };

    return {
      ...parsed,
      type: templateType,
      editingNotes: template.editingNotes,
      durationSeconds: template.durationSeconds,
    };
  } catch (error) {
    await notifySlack(
      `ショート動画構成生成エラー: ${error instanceof Error ? error.message : String(error)}`
    );
    throw error;
  }
}
