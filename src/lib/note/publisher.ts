/**
 * note記事パブリッシャー
 *
 * サイト記事→note記事への変換パイプライン。
 * Markdown記事をnote向けに変換し、API経由で投稿する。
 */

import Anthropic from "@anthropic-ai/sdk";
import { notifySlack } from "@/lib/notifications/slack";
import { type NoteArticleCategory } from "./categories";

/** note記事投稿入力 */
export type NotePublishInput = {
  /** 元記事のタイトル */
  title: string;
  /** 元記事のMarkdownコンテンツ */
  content: string;
  /** note記事カテゴリ */
  category: NoteArticleCategory;
  /** 追加の編集指示（任意） */
  editInstructions?: string;
};

/** note記事投稿結果 */
export type NotePublishResult = {
  /** note記事ID */
  noteId: string;
  /** note記事URL */
  url: string;
  /** 公開ステータス */
  status: "draft" | "published";
};

/** note向け変換済み記事 */
export type NoteArticleDraft = {
  /** タイトル */
  title: string;
  /** note向けに変換された本文 */
  body: string;
  /** 価格 */
  price: number;
  /** 無料公開部分の割合（0-1） */
  freePreviewRatio: number;
  /** タグ */
  tags: string[];
};

/**
 * サイト記事をnote向けに変換する
 *
 * サイト記事のMarkdownをnoteのフォーマットに合わせて変換。
 * 有料記事の場合は無料プレビュー部分と有料部分を分割。
 *
 * @param input - 変換入力
 * @returns note向け記事ドラフト
 */
export async function convertToNoteArticle(
  input: NotePublishInput
): Promise<NoteArticleDraft> {
  const apiKey = process.env.CLAUDE_API_KEY;
  if (!apiKey) {
    throw new Error("CLAUDE_API_KEY is not set");
  }

  const client = new Anthropic({ apiKey });

  const isPaid = input.category.price > 0;
  const priceInfo = isPaid ? `価格: ${input.category.price}円` : "無料記事";

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: `あなたはnote記事の編集者です。ブログ記事をnote向けに変換してください。

## 変換ルール
- noteの読者に合わせた文体に調整（よりパーソナルで読みやすい文体）
- 見出しはH2（##）とH3（###）のみ使用
- 箇条書きを活用して視認性を高める
- 冒頭に「この記事で学べること」セクションを追加
- 末尾に著者プロフィールとLitwill Gardenへのリンクを追加

${isPaid ? `## 有料記事の構成
- 無料プレビュー部分（記事の30%程度）: 問題提起と概要
- 有料部分（記事の70%程度）: 具体的な解決策とテクニック
- 無料部分の末尾に「ここから先は有料です」の区切りを明示` : ""}

## 出力形式
以下のJSON形式で出力：
{
  "title": "note向けタイトル",
  "body": "変換後の本文（Markdown）",
  "tags": ["タグ1", "タグ2", ...]
}`,
      messages: [
        {
          role: "user",
          content: `以下の記事をnote向けに変換してください。

${priceInfo}
カテゴリ: ${input.category.title}

元記事タイトル: ${input.title}

元記事内容:
${input.content}

${input.editInstructions ? `追加指示: ${input.editInstructions}` : ""}`,
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
      body: string;
      tags: string[];
    };

    return {
      title: parsed.title,
      body: parsed.body,
      price: input.category.price,
      freePreviewRatio: isPaid ? 0.3 : 1.0,
      tags: [
        ...parsed.tags,
        "ApexLegends",
        "Apex",
        "エーペックス",
        "ゲーム攻略",
        "LitwillGarden",
      ],
    };
  } catch (error) {
    await notifySlack(
      `note記事変換エラー: ${error instanceof Error ? error.message : String(error)}`
    );
    throw error;
  }
}

/**
 * note APIに記事を投稿する
 *
 * @param draft - 投稿する記事ドラフト
 * @returns 投稿結果
 */
export async function publishToNote(draft: NoteArticleDraft): Promise<NotePublishResult> {
  const apiToken = process.env.NOTE_API_TOKEN;
  if (!apiToken) {
    throw new Error("NOTE_API_TOKEN is not set");
  }

  try {
    const response = await fetch("https://note.com/api/v2/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify({
        title: draft.title,
        body: draft.body,
        price: draft.price,
        status: "draft", // 必ずdraftで作成（レビュー後に公開）
        tags: draft.tags,
      }),
    });

    if (!response.ok) {
      throw new Error(`note API error: ${response.status} ${response.statusText}`);
    }

    const data = (await response.json()) as {
      data: { id: string; key: string };
    };

    return {
      noteId: data.data.id,
      url: `https://note.com/litwill_garden/n/${data.data.key}`,
      status: "draft",
    };
  } catch (error) {
    await notifySlack(
      `note投稿エラー: ${error instanceof Error ? error.message : String(error)}`
    );
    throw error;
  }
}

/**
 * サイト記事からnote記事を一括で変換・投稿するパイプライン
 *
 * @param input - 変換入力
 * @returns 投稿結果
 */
export async function publishArticleToNote(
  input: NotePublishInput
): Promise<NotePublishResult> {
  // 1. 記事をnote向けに変換
  const draft = await convertToNoteArticle(input);

  // 2. noteに投稿（draftとして）
  const result = await publishToNote(draft);

  return result;
}
