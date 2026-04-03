/**
 * AI記事生成エンジン
 *
 * Claude APIを使用してApex Legends攻略記事を自動生成する。
 * ペルソナ・トーン・記事テンプレートをプロンプトに組み込み、
 * SEO最適化された記事ドラフトを出力する。
 */

import Anthropic from "@anthropic-ai/sdk";
import { persona, toneGuide } from "@/content/prompts/persona";
import { articleTemplates, type ArticleTemplateType } from "@/content/prompts/templates";
import { insertInternalLinks } from "./internal-linker";
import { insertCtas } from "./cta-inserter";
import { type ArticleStatus } from "./article-status";
import { notifySlack } from "@/lib/notifications/slack";

/** 記事生成入力 */
export type ArticleGenerationInput = {
  /** ターゲットキーワード */
  keyword: string;
  /** 記事テンプレートタイプ */
  templateType: ArticleTemplateType;
  /** 記事カテゴリ */
  category: "beginner" | "aim" | "positioning" | "ranking" | "character" | "weapon";
  /** ターゲットランク帯（ランク攻略型の場合） */
  targetRank?: string;
  /** 関連レジェンド名（キャラ攻略型の場合） */
  relatedLegend?: string;
  /** 関連武器名（武器攻略型の場合） */
  relatedWeapon?: string;
  /** 追加の指示 */
  additionalInstructions?: string;
};

/** 記事生成出力 */
export type ArticleGenerationOutput = {
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
  /** 記事ステータス（生成直後はdraft） */
  status: ArticleStatus;
};

/**
 * 記事テンプレートに基づくシステムプロンプトを構築する
 */
function buildSystemPrompt(templateType: ArticleTemplateType): string {
  const template = articleTemplates[templateType];

  const structureGuide = template.structure
    .map((section, i) => {
      const guide = template.sectionGuide[section] || "";
      return `${i + 1}. **${section}**${guide ? `\n   ${guide}` : ""}`;
    })
    .join("\n");

  return `あなたは「Litwill Garden 編集部」のライターです。Apex Legends™ の攻略記事を執筆します。

## ターゲットペルソナ
${persona.description}

## トーン & スタイル
${toneGuide}

## 記事構成（${template.label}）
${structureGuide}

## SEO要件
- タイトル: 30〜40文字、メインキーワードを前方に配置
- メタディスクリプション: 120〜160文字
- H2見出しにサブキーワードを含める
- 記事全体で3000〜5000文字
- 内部リンク用のキャラ名・武器名は[[キャラ名]]や[[武器名]]の形式で記載

## 出力形式
以下のJSON形式で出力してください：
{
  "title": "記事タイトル（30〜40文字）",
  "slug": "url-slug-in-english",
  "content": "Markdown形式の記事本文",
  "seoMeta": {
    "title": "SEOタイトル（30〜40文字）",
    "description": "メタディスクリプション（120〜160文字）",
    "keywords": ["キーワード1", "キーワード2", ...]
  }
}

## 禁止事項
- 個人名義での記事公開（必ず「Litwill Garden 編集部」名義）
- 公式画像の無断使用
- 根拠のないティア評価
- 他サイトからのコピー
- Apex Legends™ の初出時には™を付与すること`;
}

/**
 * 記事生成用のユーザープロンプトを構築する
 */
function buildUserPrompt(input: ArticleGenerationInput): string {
  let prompt = `以下の条件で攻略記事を生成してください。

**ターゲットキーワード**: ${input.keyword}
**カテゴリ**: ${input.category}`;

  if (input.targetRank) {
    prompt += `\n**ターゲットランク帯**: ${input.targetRank}`;
  }
  if (input.relatedLegend) {
    prompt += `\n**対象レジェンド**: ${input.relatedLegend}`;
  }
  if (input.relatedWeapon) {
    prompt += `\n**対象武器**: ${input.relatedWeapon}`;
  }
  if (input.additionalInstructions) {
    prompt += `\n\n**追加指示**: ${input.additionalInstructions}`;
  }

  return prompt;
}

/**
 * Claude APIクライアントを生成する
 */
function getClient(): Anthropic {
  const apiKey = process.env.CLAUDE_API_KEY;
  if (!apiKey) {
    throw new Error("CLAUDE_API_KEY is not set");
  }
  return new Anthropic({ apiKey });
}

/**
 * リトライ付きでAPIリクエストを実行する
 */
async function withRetry<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) {
        await notifySlack(
          `記事生成APIエラー（${maxRetries}回リトライ後）: ${error instanceof Error ? error.message : String(error)}`
        );
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }
  throw new Error("Unreachable");
}

/**
 * AI記事を生成する
 *
 * @param input - 記事生成入力パラメータ
 * @returns 生成された記事（CTA・内部リンク挿入済み）
 */
export async function generateArticle(
  input: ArticleGenerationInput
): Promise<ArticleGenerationOutput> {
  const client = getClient();
  const systemPrompt = buildSystemPrompt(input.templateType);
  const userPrompt = buildUserPrompt(input);

  const response = await withRetry(() =>
    client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 8192,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    })
  );

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text content in API response");
  }

  const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Failed to parse JSON from API response");
  }

  const parsed = JSON.parse(jsonMatch[0]) as {
    title: string;
    slug: string;
    content: string;
    seoMeta: { title: string; description: string; keywords: string[] };
  };

  // 内部リンク挿入
  const contentWithLinks = insertInternalLinks(parsed.content);
  // CTA挿入
  const contentWithCtas = insertCtas(contentWithLinks, input.templateType);

  return {
    title: parsed.title,
    slug: parsed.slug,
    content: contentWithCtas,
    seoMeta: parsed.seoMeta,
    status: "draft",
  };
}

/**
 * パッチノート連動の記事ドラフトを自動生成する
 *
 * @param patchVersion - パッチバージョン
 * @param changes - パッチ変更内容のJSON
 * @returns 生成された記事
 */
export async function generatePatchArticle(
  patchVersion: string,
  changes: Record<string, unknown>
): Promise<ArticleGenerationOutput> {
  return generateArticle({
    keyword: `Apex パッチノート ${patchVersion}`,
    templateType: "guide",
    category: "beginner",
    additionalInstructions: `新パッチ ${patchVersion} の変更内容に基づくティアリスト更新記事を作成してください。
変更内容: ${JSON.stringify(changes, null, 2)}

記事構成は以下に変更：
1. パッチ変更点サマリー
2. 各キャラ/武器への影響分析
3. 新メタ予測
4. おすすめ構成の更新
5. まとめ`,
  });
}
