/**
 * コンテンツ生成エージェント
 *
 * ターゲットキーワードと記事プロンプトを元に、
 * 占いブランドの記事ドラフトを自動生成する。
 * Claude APIを使用してSEO最適化された記事を生成する。
 */

import Anthropic from "@anthropic-ai/sdk";
import { readFileSync } from "fs";
import { join } from "path";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export type ContentWriterInput = {
  keyword: string;
  category: "astrology" | "psychology" | "tarot" | "crystal" | "diagnosis";
  additionalInstructions?: string;
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
以下の条件で占いブランド「Litwill Garden」向けの記事を生成してください。

## 記事条件
- メインキーワード: ${input.keyword}
- カテゴリ: ${input.category}
${input.additionalInstructions ? `- 追加指示: ${input.additionalInstructions}` : ""}

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

export async function generateArticle(
  input: ContentWriterInput
): Promise<ContentWriterOutput | null> {
  const prompt = buildPrompt(input);

  const message = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 8192,
    messages: [{ role: "user", content: prompt }],
  });

  const rawText = message.content[0].type === "text" ? message.content[0].text : null;
  if (!rawText) return null;

  const jsonMatch = rawText.match(/```json\n([\s\S]*?)\n```/);
  const jsonStr = jsonMatch ? jsonMatch[1] : rawText;

  return JSON.parse(jsonStr) as ContentWriterOutput;
}
