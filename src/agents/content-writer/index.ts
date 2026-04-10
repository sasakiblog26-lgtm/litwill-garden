/**
 * 攻略記事生成エージェント
 *
 * ターゲットキーワードと記事テンプレートを元に、
 * Apex Legends の攻略記事ドラフトを自動生成する。
 *
 * 入力: キーワード、カテゴリ、ターゲットランク帯
 * 出力: Markdown形式の記事ドラフト
 */

import Anthropic from "@anthropic-ai/sdk";
import { readFileSync } from "fs";
import { join } from "path";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export type ContentWriterInput = {
  keyword: string;
  category: "beginner" | "aim" | "positioning" | "ranking" | "character" | "weapon";
  targetRank?: string;
  relatedLegend?: string;
  relatedWeapon?: string;
};

export type ContentWriterOutput = {
  title: string;
  slug: string;
  content: string;
  seoMeta: {
    title: string;
    description: string;
    keywords: string[];
  };
};

function buildPrompt(input: ContentWriterInput): string {
  const systemPrompt = readFileSync(
    join(process.cwd(), "src/content/prompts/article-generation.md"),
    "utf-8"
  );

  const userPrompt = `
以下の条件で攻略記事を生成してください。

## 記事条件
- メインキーワード: ${input.keyword}
- カテゴリ: ${input.category}
${input.targetRank ? `- ターゲットランク帯: ${input.targetRank}` : ""}
${input.relatedLegend ? `- 関連レジェンド: ${input.relatedLegend}` : ""}
${input.relatedWeapon ? `- 関連武器: ${input.relatedWeapon}` : ""}

## 出力形式
以下のJSON形式で出力してください（JSONのみ、説明文不要）:

\`\`\`json
{
  "title": "記事タイトル（30〜40文字）",
  "slug": "url-friendly-slug-in-english",
  "content": "Markdown形式の記事本文（全文）",
  "seoMeta": {
    "title": "SEOタイトル（30〜40文字）",
    "description": "メタディスクリプション（120〜160文字）",
    "keywords": ["キーワード1", "キーワード2", "キーワード3"]
  }
}
\`\`\`
`;

  return `${systemPrompt}\n\n${userPrompt}`;
}

/**
 * 攻略記事を生成する
 */
export async function generateArticle(
  input: ContentWriterInput
): Promise<ContentWriterOutput | null> {
  const prompt = buildPrompt(input);

  const message = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 4096,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const rawText = message.content[0].type === "text" ? message.content[0].text : null;
  if (!rawText) return null;

  // JSONブロックを抽出
  const jsonMatch = rawText.match(/```json\n([\s\S]*?)\n```/);
  const jsonStr = jsonMatch ? jsonMatch[1] : rawText;

  const result = JSON.parse(jsonStr) as ContentWriterOutput;
  return result;
}
