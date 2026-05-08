/**
 * Article-to-note conversion pipeline.
 *
 * Transforms site articles into note.com-ready format, handling preview
 * generation for paid content, CTA stripping, and note-specific
 * header/footer injection.
 */

import type { NoteArticleInput } from "./client";
import type { NoteCategory } from "./categories";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A site article as stored in the local database. */
export interface SiteArticle {
  id: number;
  title: string;
  content: string;
  category: string;
  articleType: string;
  excerpt: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Regex matching internal-only CTA markers that should be stripped for note. */
const INTERNAL_CTA_REGEX =
  /<!--\s*CTA[:_].*?-->[\s\S]*?<!--\s*\/CTA\s*-->/gi;

/** Default ratio of content shown as free preview for paid articles. */
const DEFAULT_PREVIEW_RATIO = 0.2;

/** Tag mapping from article type to recommended note tags. */
const TAG_MAP: Record<string, string[]> = {
  "beginner-guide": ["ApexLegends", "Apex初心者", "FPS初心者", "ゲーム攻略"],
  "character-guide": ["ApexLegends", "キャラ攻略", "レジェンド", "Apex攻略"],
  "weapon-guide": ["ApexLegends", "武器攻略", "リコイル制御", "エイム練習"],
  "rank-guide": ["ApexLegends", "ランクマッチ", "ランク攻略", "立ち回り"],
  "vod-review": ["ApexLegends", "VODレビュー", "上達法", "試合分析"],
  "meta-report": ["ApexLegends", "メタ分析", "パッチノート", "ティアリスト"],
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Converts a site article into note.com article format.
 *
 * The conversion pipeline:
 * 1. Strips internal-only CTA markers from the content.
 * 2. Adjusts image URLs to absolute paths if needed.
 * 3. For paid articles, splits content into free preview and paid sections.
 * 4. Prepends a note-specific header and appends a footer.
 * 5. Attaches tags based on the article category type.
 *
 * @param article      - The source site article.
 * @param noteCategory - The note category definition (determines pricing, type, etc.).
 * @returns A `NoteArticleInput` ready for the note API.
 */
export function convertArticleToNote(
  article: SiteArticle,
  noteCategory: NoteCategory,
): NoteArticleInput {
  // Step 1: Strip internal CTAs
  let content = article.content.replace(INTERNAL_CTA_REGEX, "");

  // Step 2: Adjust relative image URLs to absolute
  content = content.replace(
    /!\[([^\]]*)\]\(\/(.*?)\)/g,
    `![$1](https://litwill-garden.com/$2)`,
  );
  content = content.replace(
    /src="\/((?!\/|https?:).*?)"/g,
    'src="https://litwill-garden.com/$1"',
  );

  // Step 3: Build header
  const header = addNoteHeader(article.title, noteCategory.price);

  // Step 4: Build footer
  const footer = addNoteFooter(noteCategory.type);

  // Step 5: Handle paid vs free content
  if (noteCategory.price > 0) {
    const { preview, paid } = generateNotePreview(content);
    content = `${header}\n\n${preview}\n\n---\n\n**ここから先は有料部分です**\n\n${paid}\n\n${footer}`;
  } else {
    content = `${header}\n\n${content}\n\n${footer}`;
  }

  // Step 6: Determine tags
  const tags = TAG_MAP[noteCategory.type] ?? ["ApexLegends", "ゲーム攻略"];

  return {
    title: article.title,
    body: content,
    status: "published",
    price: noteCategory.price,
    magazineId: noteCategory.isMagazine ? undefined : undefined,
    tags,
  };
}

/**
 * Splits article content into a free preview and a paid section.
 *
 * The split point is determined by `previewRatio` (default 20%). The function
 * attempts to split at a paragraph boundary to avoid cutting mid-sentence.
 *
 * @param content      - Full article content in Markdown.
 * @param previewRatio - Fraction of the content to show for free (0-1). Defaults to 0.2.
 * @returns An object with `preview` (free) and `paid` sections.
 */
export function generateNotePreview(
  content: string,
  previewRatio: number = DEFAULT_PREVIEW_RATIO,
): { preview: string; paid: string } {
  const targetLength = Math.floor(content.length * previewRatio);

  // Try to split at a paragraph boundary (double newline)
  const paragraphs = content.split(/\n\n+/);
  const previewParts: string[] = [];
  let currentLength = 0;

  for (const paragraph of paragraphs) {
    if (currentLength + paragraph.length > targetLength && previewParts.length > 0) {
      break;
    }
    previewParts.push(paragraph);
    currentLength += paragraph.length;
  }

  const preview = previewParts.join("\n\n");
  const paid = content.slice(preview.length).replace(/^\n+/, "");

  return { preview, paid };
}

/**
 * Generates a note article header with pricing information.
 *
 * For paid articles the header includes a brief description of what the
 * reader will learn and the price. Free articles get a simpler header.
 *
 * @param title - The article title.
 * @param price - The article price in JPY (0 for free).
 * @returns The formatted header string.
 */
export function addNoteHeader(title: string, price: number): string {
  if (price === 0) {
    return [
      `# ${title}`,
      "",
      "Litwill Garden 編集部がお届けするApex Legends攻略ガイドです。",
      "",
      "---",
    ].join("\n");
  }

  return [
    `# ${title}`,
    "",
    "Litwill Garden 編集部がお届けするApex Legends攻略ガイドです。",
    "",
    `**この記事で学べること：**`,
    "- 実戦で即使えるテクニックと知識",
    "- プロプレイヤーの戦術を分かりやすく解説",
    "- 具体的な練習メニューと上達ロードマップ",
    "",
    `**価格：${price.toLocaleString()}円**`,
    "",
    "---",
  ].join("\n");
}

/**
 * Generates a note article footer with follow CTA, related articles
 * section, and author information.
 *
 * @param articleType - The article type slug (e.g. `"rank-guide"`).
 * @returns The formatted footer string.
 */
export function addNoteFooter(articleType: string): string {
  const relatedArticlesText = getRelatedArticlesText(articleType);

  return [
    "---",
    "",
    "## 最後まで読んでいただきありがとうございます！",
    "",
    "この記事が役に立ったら、ぜひ **スキ（♡）** をお願いします。",
    "今後もApex Legendsの攻略情報を発信していきますので、 **フォロー** もお忘れなく！",
    "",
    "### 関連記事",
    relatedArticlesText,
    "",
    "### 著者について",
    "**Litwill Garden 編集部**",
    "Apex Legendsを中心としたゲーム攻略メディア「Litwill Garden」の編集チームです。",
    "初心者からダイヤ・マスターを目指すプレイヤーまで、実戦で使える攻略情報をお届けしています。",
    "",
    "🔗 サイト: https://litwill-garden.com",
    "🔗 X(Twitter): @litwill_garden",
  ].join("\n");
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Returns a Markdown list of related article suggestions based on article type.
 */
function getRelatedArticlesText(articleType: string): string {
  const suggestions: Record<string, string[]> = {
    "beginner-guide": [
      "初心者おすすめキャラ診断チャート",
      "射撃訓練場の使い方と練習メニュー",
      "Apex初心者→シルバー到達ガイド",
    ],
    "character-guide": [
      "キャラ別完全攻略ガイド（シリーズ）",
      "立ち回り教科書",
      "Apex Legends 完全初心者ガイド",
    ],
    "weapon-guide": [
      "射撃訓練場の使い方と練習メニュー",
      "プロの感度設定＆デバイス選びの完全ガイド",
      "キャラ別完全攻略ガイド",
    ],
    "rank-guide": [
      "立ち回り教科書",
      "VODレビューで学ぶ上達メソッド",
      "キャラ別完全攻略ガイド",
    ],
    "vod-review": [
      "ランク攻略ロードマップ ブロンズ→ダイヤ完全版",
      "立ち回り教科書",
      "プロの感度設定＆デバイス選びの完全ガイド",
    ],
    "meta-report": [
      "キャラ別完全攻略ガイド",
      "武器別リコイル制御マニュアル",
      "ランク攻略ロードマップ",
    ],
  };

  const items = suggestions[articleType] ?? [
    "Apex Legends 完全初心者ガイド",
    "キャラ別完全攻略ガイド",
  ];

  return items.map((item) => `- ${item}`).join("\n");
}
