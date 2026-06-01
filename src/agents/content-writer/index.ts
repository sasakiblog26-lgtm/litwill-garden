/**
 * 攻略記事生成エージェント
 *
 * ターゲットキーワードと記事テンプレートを元に、
 * Apex Legends の攻略記事ドラフトを自動生成する。
 * Claude APIを使用してSEO最適化された記事を生成し、
 * 内部リンク・CTA自動挿入を行う。
 *
 * 入力: キーワード、カテゴリ、ターゲットランク帯
 * 出力: Markdown形式の記事ドラフト（CTA・内部リンク挿入済み）
 */

<<<<<<< HEAD
import Anthropic from "@anthropic-ai/sdk";
import { readFileSync } from "fs";
import { join } from "path";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

=======
import {
  generateArticle as generateArticleContent,
  generatePatchArticle as generatePatchArticleContent,
  type ArticleGenerationInput,
  type ArticleGenerationOutput,
} from "@/lib/content";
import type { ArticleTemplateType } from "@/content/prompts/templates";

/** 記事生成入力型 */
>>>>>>> origin/main
export type ContentWriterInput = {
  /** ターゲットキーワード */
  keyword: string;
  /** 記事カテゴリ */
  category: "beginner" | "aim" | "positioning" | "ranking" | "character" | "weapon";
  /** ターゲットランク帯（ランク攻略型の場合） */
  targetRank?: string;
  /** 関連レジェンド名（キャラ攻略型の場合） */
  relatedLegend?: string;
  /** 関連武器名（武器攻略型の場合） */
  relatedWeapon?: string;
};

/** 記事生成出力型 */
export type ContentWriterOutput = {
  /** 記事タイトル */
  title: string;
  /** URLスラッグ */
  slug: string;
  /** Markdown形式の記事本文 */
  content: string;
  /** SEOメタ情報 */
  seoMeta: {
    title: string;
    description: string;
    keywords: string[];
  };
};

<<<<<<< HEAD
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
=======
/** カテゴリからテンプレートタイプへのマッピング */
const categoryToTemplate: Record<ContentWriterInput["category"], ArticleTemplateType> = {
  beginner: "guide",
  aim: "guide",
  positioning: "guide",
  ranking: "ranking",
  character: "character",
  weapon: "weapon",
};

/**
 * 攻略記事を生成する
 *
 * @param input - 記事生成入力パラメータ
 * @returns 生成された記事（CTA・内部リンク挿入済み）
 */
export async function generateArticle(
  input: ContentWriterInput
): Promise<ContentWriterOutput> {
  const templateType = categoryToTemplate[input.category];

  const generationInput: ArticleGenerationInput = {
    keyword: input.keyword,
    templateType,
    category: input.category,
    targetRank: input.targetRank,
    relatedLegend: input.relatedLegend,
    relatedWeapon: input.relatedWeapon,
  };

  const result: ArticleGenerationOutput = await generateArticleContent(generationInput);

  return {
    title: result.title,
    slug: result.slug,
    content: result.content,
    seoMeta: result.seoMeta,
  };
}

/**
 * パッチノート連動記事を生成する
 *
 * @param patchVersion - パッチバージョン
 * @param changes - パッチ変更内容
 * @returns 生成された記事
 */
export async function generatePatchArticle(
  patchVersion: string,
  changes: Record<string, unknown>
): Promise<ContentWriterOutput> {
  const result = await generatePatchArticleContent(patchVersion, changes);

  return {
    title: result.title,
    slug: result.slug,
    content: result.content,
    seoMeta: result.seoMeta,
  };
>>>>>>> origin/main
}
