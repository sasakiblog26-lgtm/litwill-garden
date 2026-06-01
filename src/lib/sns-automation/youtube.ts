/**
 * YouTube metadata management module for Litwill Garden.
 *
 * Generates video metadata (titles, descriptions, tags, thumbnail text)
 * from article data. Does NOT handle video uploading.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Metadata generated for a YouTube video */
export interface VideoMetadata {
  /** 3 title candidates for the video */
  titleCandidates: string[];
  /** Full video description (with site URL, LINE link, chapter placeholder) */
  description: string;
  /** Suggested tags for the video */
  tags: string[];
  /** Thumbnail title suggestions (short, attention-grabbing text) */
  thumbnailTitleCandidates: string[];
  /** Video category */
  category: string;
}

/** Schedule information for a video category */
export interface VideoCategoryInfo {
  /** Category identifier */
  id: string;
  /** Japanese display name */
  label: string;
  /** Posting frequency */
  schedule: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/**
 * YouTube video categories with their posting schedules.
 *
 * - beginner-guide: 週1本
 * - character-guide: 週1本
 * - vod-review: 月2本
 * - patch-note: パッチ配信時
 */
export const VIDEO_CATEGORIES: readonly VideoCategoryInfo[] = [
  { id: "beginner-guide", label: "初心者ガイド", schedule: "週1本" },
  { id: "character-guide", label: "キャラガイド", schedule: "週1本" },
  { id: "vod-review", label: "VODレビュー", schedule: "月2本" },
  { id: "patch-note", label: "パッチノート", schedule: "パッチ配信時" },
] as const;

/** Site base URL */
const SITE_URL = "https://litwill-garden.com";

// ---------------------------------------------------------------------------
// Functions
// ---------------------------------------------------------------------------

/**
 * Generates YouTube video metadata from article data.
 *
 * Produces 3 title candidates, a full description with site URL and LINE link,
 * relevant tags, and thumbnail title suggestions.
 *
 * @param articleData - Source article data
 * @param articleData.title - Article title
 * @param articleData.content - Article body content
 * @param articleData.category - Article category (e.g. "beginner-guide", "character-guide")
 * @returns Complete video metadata ready for YouTube upload
 */
export function generateVideoMetadata(articleData: {
  title: string;
  content: string;
  category: string;
}): VideoMetadata {
  const { title, content, category } = articleData;

  // Extract key terms from the content for tags (first 500 chars for efficiency)
  const contentSnippet = content.slice(0, 500);

  // Generate 3 title candidates with different styles
  const titleCandidates = generateTitleCandidates(title, category);

  // Generate description
  const description = generateDescriptionTemplate(title);

  // Generate tags based on category and content
  const tags = generateTags(category, title, contentSnippet);

  // Generate thumbnail text candidates
  const thumbnailTitleCandidates = generateThumbnailCandidates(title, category);

  return {
    titleCandidates,
    description,
    tags,
    thumbnailTitleCandidates,
    category,
  };
}

/**
 * Generates a standard YouTube description with site URL, LINE registration link,
 * chapter markers placeholder, and disclaimer.
 *
 * @param videoTitle - The title of the video
 * @returns Formatted YouTube description string
 */
export function generateDescriptionTemplate(videoTitle: string): string {
  return [
    videoTitle,
    "",
    "▼ 記事で詳しく読む",
    SITE_URL,
    "",
    "▼ LINE登録で限定コンテンツ配信中！",
    "https://lin.ee/litwillgarden（※リンクはプロフィールから）",
    "",
    "━━━━━━━━━━━━━━━━",
    "📋 チャプター",
    "━━━━━━━━━━━━━━━━",
    "0:00 オープニング",
    "0:30 （※チャプターを追加してください）",
    "",
    "━━━━━━━━━━━━━━━━",
    "📌 関連動画・リンク",
    "━━━━━━━━━━━━━━━━",
    `▼ Litwill Garden（Apex攻略サイト）: ${SITE_URL}`,
    "▼ X (Twitter): https://x.com/litwillgarden",
    "",
    "━━━━━━━━━━━━━━━━",
    "⚠️ 免責事項",
    "━━━━━━━━━━━━━━━━",
    "この動画はApex Legendsの攻略情報を提供するものであり、",
    "ゲーム内のバージョンアップにより情報が古くなる場合があります。",
    "最新情報は公式サイトおよび当サイトの記事をご確認ください。",
    "",
    "Apex Legends™ はElectronic Artsの商標です。",
    "当チャンネルはEAとは無関係の非公式コンテンツです。",
    "",
    `#ApexLegends #エーペックス #Apex攻略 #LitwillGarden`,
  ].join("\n");
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Generates 3 title candidates with different styles.
 */
function generateTitleCandidates(title: string, category: string): string[] {
  const categoryPrefixes: Record<string, string[]> = {
    "beginner-guide": [
      "【初心者必見】",
      "【Apex入門】",
      "【完全ガイド】",
    ],
    "character-guide": [
      "【キャラ解説】",
      "【立ち回り解説】",
      "【完全攻略】",
    ],
    "vod-review": [
      "【VODレビュー】",
      "【試合分析】",
      "【プロが解説】",
    ],
    "patch-note": [
      "【パッチノート速報】",
      "【最新アプデ】",
      "【環境激変】",
    ],
  };

  const prefixes = categoryPrefixes[category] ?? [
    "【Apex攻略】",
    "【徹底解説】",
    "【保存版】",
  ];

  return prefixes.map((prefix) => {
    const candidate = `${prefix}${title}`;
    // YouTube title limit is 100 chars
    if (candidate.length > 100) {
      return candidate.slice(0, 99) + "…";
    }
    return candidate;
  });
}

/**
 * Generates tags from category, title, and content snippet.
 */
function generateTags(
  category: string,
  title: string,
  contentSnippet: string
): string[] {
  const baseTags = [
    "Apex Legends",
    "エーペックス",
    "Apex",
    "FPS",
    "バトロワ",
    "Litwill Garden",
  ];

  const categoryTags: Record<string, string[]> = {
    "beginner-guide": ["初心者", "入門", "上達", "コツ"],
    "character-guide": ["キャラ", "レジェンド", "立ち回り", "アビリティ"],
    "vod-review": ["VODレビュー", "試合分析", "ランクマッチ"],
    "patch-note": ["パッチノート", "アップデート", "バフ", "ナーフ"],
  };

  const extraTags = categoryTags[category] ?? [];

  // Extract potential legend names from title
  const legendNames = [
    "レイス", "オクタン", "パスファインダー", "ブラッドハウンド",
    "ライフライン", "バンガロール", "ジブラルタル", "コースティック",
    "ミラージュ", "ワットソン", "クリプト", "レヴナント",
    "ローバ", "ランパート", "ホライゾン", "ヒューズ",
    "ヴァルキリー", "シア", "アッシュ", "マッドマギー",
    "ニューキャッスル", "ヴァンテージ", "カタリスト", "バリスティック",
    "コンジット", "オルター",
  ];

  const titleTags = legendNames.filter(
    (name) => title.includes(name) || contentSnippet.includes(name)
  );

  return [...baseTags, ...extraTags, ...titleTags];
}

/**
 * Generates thumbnail title candidates (short, punchy text for thumbnails).
 */
function generateThumbnailCandidates(title: string, category: string): string[] {
  // Extract the core topic from the title, keeping it short for thumbnail
  const shortTitle = title.length > 15 ? title.slice(0, 15) : title;

  const styles: Record<string, (t: string) => string[]> = {
    "beginner-guide": (t) => [
      `${t}\n初心者必見`,
      `知らないと損\n${t}`,
      `${t}\nこれだけでOK`,
    ],
    "character-guide": (t) => [
      `${t}\n完全攻略`,
      `最強の\n${t}`,
      `${t}\n使い方`,
    ],
    "vod-review": (t) => [
      `${t}\nプロが分析`,
      `ここが違う\n${t}`,
      `${t}\n勝因はコレ`,
    ],
    "patch-note": (t) => [
      `${t}\n環境激変！`,
      `速報\n${t}`,
      `${t}\nバフ＆ナーフ`,
    ],
  };

  const generator = styles[category];
  if (generator) {
    return generator(shortTitle);
  }

  return [
    `${shortTitle}\n徹底解説`,
    `${shortTitle}\n攻略ガイド`,
    `保存版\n${shortTitle}`,
  ];
}
