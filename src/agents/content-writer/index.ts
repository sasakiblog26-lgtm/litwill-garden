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

import {
  generateArticle as generateArticleContent,
  generatePatchArticle as generatePatchArticleContent,
  type ArticleGenerationInput,
  type ArticleGenerationOutput,
} from "@/lib/content";
import type { ArticleTemplateType } from "@/content/prompts/templates";

/** 記事生成入力型 */
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
}
