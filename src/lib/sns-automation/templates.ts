/**
 * SNS post templates for X (Twitter) and TikTok/Shorts content.
 *
 * All X templates enforce the 280-character limit.
 * All TikTok/Shorts templates include editing notes for video production.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Return type for X post templates */
export interface XPostTemplate {
  /** The full tweet text (max 280 chars) */
  content: string;
  /** Hashtags to include */
  hashtags: string[];
}

/** Return type for TikTok/Shorts video templates */
export interface ShortVideoTemplate {
  /** Video title */
  title: string;
  /** Video description */
  description: string;
  /** Hashtags to include */
  hashtags: string[];
  /** Editing and production notes (telop, effects, etc.) */
  editingNotes: string;
}

/** Input for patchNewsTemplate */
export interface PatchNewsData {
  /** Patch version string (e.g. "S22.1") */
  version: string;
  /** Array of up to 3 key buff/nerf highlights */
  highlights: string[];
  /** Optional link to full article */
  articleUrl?: string;
}

/** Input for metaAnalysisTemplate */
export interface MetaAnalysisData {
  /** Current season or patch identifier */
  season: string;
  /** Top legends in the current meta */
  topLegends: string[];
  /** Top weapons in the current meta */
  topWeapons: string[];
  /** One-line meta summary */
  summary: string;
}

/** Input for quickTipsTemplate */
export interface QuickTipData {
  /** Tip title / technique name */
  title: string;
  /** Short description of the tip */
  description: string;
}

/** Input for matchResultTemplate */
export interface MatchResultData {
  /** Tournament or ranked session name */
  eventName: string;
  /** Placement result (e.g. "1位", "Top 5") */
  placement: string;
  /** Kill / damage stats summary */
  stats: string;
  /** Optional comment */
  comment?: string;
}

/** Input for clipTipsTemplate */
export interface ClipTipsData {
  /** Original YouTube video title */
  sourceVideoTitle: string;
  /** The specific tip or technique being highlighted */
  tipTitle: string;
  /** Timestamp range in the original video */
  timestampRange: string;
  /** Key point to display as telop */
  keyPoint: string;
}

/** Input for quickExplainerTemplate */
export interface QuickExplainerData {
  /** Technique or topic name */
  topic: string;
  /** Step-by-step explanation (2-3 steps) */
  steps: string[];
  /** Difficulty level */
  difficulty: "初心者" | "中級者" | "上級者";
}

/** Input for beforeAfterTemplate */
export interface BeforeAfterData {
  /** Technique or scenario being compared */
  scenario: string;
  /** What a beginner typically does */
  beforeDescription: string;
  /** What a skilled player does */
  afterDescription: string;
  /** Key takeaway */
  takeaway: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Truncates text to fit within the X 280-character limit, accounting for
 * hashtags and a newline separator.
 */
function enforceCharLimit(text: string, hashtags: string[], maxLen = 280): string {
  const hashtagStr = hashtags.join(" ");
  const combined = `${text}\n\n${hashtagStr}`;
  if (combined.length <= maxLen) {
    return text;
  }
  const available = maxLen - hashtagStr.length - 3; // 2 newlines + ellipsis
  return text.slice(0, available) + "…";
}

// ---------------------------------------------------------------------------
// X (Twitter) Templates
// ---------------------------------------------------------------------------

/**
 * パッチノート速報テンプレート
 *
 * バフ/ナーフの要点を3行で速報するX投稿を生成します。
 *
 * @param patchData - Patch note data including version and highlights
 * @returns X post template with content and hashtags
 */
export function patchNewsTemplate(patchData: PatchNewsData): XPostTemplate {
  const hashtags = ["#ApexLegends", "#エーペックス", "#パッチノート", "#Apex"];
  const highlightLines = patchData.highlights
    .slice(0, 3)
    .map((h) => `▶ ${h}`)
    .join("\n");

  const urlLine = patchData.articleUrl ? `\n詳細👉 ${patchData.articleUrl}` : "";
  const raw = `【パッチ${patchData.version} 速報】\n${highlightLines}${urlLine}`;

  return {
    content: `${enforceCharLimit(raw, hashtags)}\n\n${hashtags.join(" ")}`,
    hashtags,
  };
}

/**
 * メタ解説テンプレート
 *
 * 現環境のキャラ・武器のメタを解説するX投稿を生成します。
 *
 * @param data - Current meta analysis data
 * @returns X post template with content and hashtags
 */
export function metaAnalysisTemplate(data: MetaAnalysisData): XPostTemplate {
  const hashtags = ["#ApexLegends", "#エーペックス", "#Apex", "#メタ"];
  const legends = data.topLegends.slice(0, 3).join("・");
  const weapons = data.topWeapons.slice(0, 3).join("・");

  const raw = [
    `【${data.season} メタ解説】`,
    `🏆キャラ: ${legends}`,
    `🔫武器: ${weapons}`,
    `💡${data.summary}`,
  ].join("\n");

  return {
    content: `${enforceCharLimit(raw, hashtags)}\n\n${hashtags.join(" ")}`,
    hashtags,
  };
}

/**
 * 30秒Tipsテンプレート
 *
 * 1つの上達テクニックを簡潔に紹介するX投稿を生成します。
 *
 * @param tip - The tip data (title and description)
 * @returns X post template with content and hashtags
 */
export function quickTipsTemplate(tip: QuickTipData): XPostTemplate {
  const hashtags = ["#ApexLegends", "#エーペックス", "#Apex初心者", "#FPS"];

  const raw = `【30秒Tips】${tip.title}\n\n${tip.description}`;

  return {
    content: `${enforceCharLimit(raw, hashtags)}\n\n${hashtags.join(" ")}`,
    hashtags,
  };
}

/**
 * 試合結果テンプレート
 *
 * チームの大会・ランク結果報告を投稿するX投稿を生成します。
 *
 * @param data - Match result data
 * @returns X post template with content and hashtags
 */
export function matchResultTemplate(data: MatchResultData): XPostTemplate {
  const hashtags = ["#ApexLegends", "#エーペックス", "#Apex", "#LitwillGarden"];
  const commentLine = data.comment ? `\n💬 ${data.comment}` : "";

  const raw = [
    `【試合結果】${data.eventName}`,
    `🏅 ${data.placement}`,
    `📊 ${data.stats}`,
    commentLine,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    content: `${enforceCharLimit(raw, hashtags)}\n\n${hashtags.join(" ")}`,
    hashtags,
  };
}

// ---------------------------------------------------------------------------
// TikTok / Shorts Templates
// ---------------------------------------------------------------------------

/**
 * 切り抜きTipsテンプレート
 *
 * YouTube本編から30秒の要点切り出し指示を生成します。
 * テロップ・エフェクト指示付き。
 *
 * @param data - Clip tips data with source video info
 * @returns Short video template with title, description, hashtags, and editing notes
 */
export function clipTipsTemplate(data: ClipTipsData): ShortVideoTemplate {
  const hashtags = [
    "#ApexLegends",
    "#エーペックス",
    "#Apex初心者",
    "#FPS",
    "#ゲーム",
    "#shorts",
  ];

  return {
    title: `【切り抜き】${data.tipTitle}`,
    description: [
      `元動画「${data.sourceVideoTitle}」の${data.timestampRange}から抜粋`,
      `ポイント: ${data.keyPoint}`,
      "",
      "▼ フル動画はこちら",
      "https://litwill-garden.com",
    ].join("\n"),
    hashtags,
    editingNotes: [
      `【編集指示】`,
      `1. 元動画の ${data.timestampRange} を切り出し`,
      `2. 冒頭に「${data.tipTitle}」のテロップ（太字・白・黒縁取り）を表示`,
      `3. キーポイント「${data.keyPoint}」を画面中央にテロップ表示（2秒間）`,
      `4. 強調エフェクト: ズームイン + 効果音（ポップ音）`,
      `5. 終了時に「フル動画はプロフィールから」のCTAテロップ`,
      `6. BGM: アップテンポ（著作権フリー）`,
    ].join("\n"),
  };
}

/**
 * 30秒でわかる○○テンプレート
 *
 * 特定テクニックの超短時間解説動画の構成を生成します。
 *
 * @param data - Quick explainer data with topic and steps
 * @returns Short video template with title, description, hashtags, and editing notes
 */
export function quickExplainerTemplate(data: QuickExplainerData): ShortVideoTemplate {
  const hashtags = [
    "#ApexLegends",
    "#エーペックス",
    "#Apex初心者",
    "#FPS",
    "#ゲーム攻略",
    "#shorts",
  ];

  const stepsText = data.steps
    .map((step, i) => `${i + 1}. ${step}`)
    .join("\n");

  return {
    title: `【30秒でわかる】${data.topic}`,
    description: [
      `${data.difficulty}向け | ${data.topic}を30秒で解説！`,
      "",
      stepsText,
      "",
      "▼ 詳しい解説はサイトで",
      "https://litwill-garden.com",
    ].join("\n"),
    hashtags,
    editingNotes: [
      `【編集指示】`,
      `1. 冒頭（0-2秒）: 「30秒でわかる ${data.topic}」テロップ + フック音`,
      `2. 難易度バッジ「${data.difficulty}」を右上に常時表示`,
      ...data.steps.map(
        (step, i) =>
          `${i + 3}. ステップ${i + 1}（${Math.floor((i * 28) / data.steps.length)}-${Math.floor(((i + 1) * 28) / data.steps.length)}秒）: 「${step}」テロップ + 該当プレイ映像`
      ),
      `${data.steps.length + 3}. 終了（28-30秒）: 「もっと詳しく→プロフィール」CTA`,
      `BGM: 軽快なBGM（著作権フリー）`,
      `全体: テンポよくカットを切り替え、各ステップにトランジション`,
    ].join("\n"),
  };
}

/**
 * Before/Afterテンプレート
 *
 * 初心者の動きとプロの動きを比較する動画の構成を生成します。
 *
 * @param data - Before/After comparison data
 * @returns Short video template with title, description, hashtags, and editing notes
 */
export function beforeAfterTemplate(data: BeforeAfterData): ShortVideoTemplate {
  const hashtags = [
    "#ApexLegends",
    "#エーペックス",
    "#Apex初心者",
    "#上達",
    "#ゲーム",
    "#shorts",
  ];

  return {
    title: `【Before/After】${data.scenario}`,
    description: [
      `初心者とプロの${data.scenario}を比較！`,
      "",
      `❌ Before: ${data.beforeDescription}`,
      `✅ After: ${data.afterDescription}`,
      "",
      `💡 ${data.takeaway}`,
      "",
      "▼ 詳しい解説はサイトで",
      "https://litwill-garden.com",
    ].join("\n"),
    hashtags,
    editingNotes: [
      `【編集指示】`,
      `1. 冒頭（0-2秒）: 「${data.scenario} Before/After」テロップ + インパクト音`,
      `2. Before パート（2-12秒）:`,
      `   - 画面左上に「❌ Before」赤ラベル常時表示`,
      `   - 「${data.beforeDescription}」をテロップ表示`,
      `   - 初心者プレイ映像（失敗シーン）`,
      `   - ブザー音で締め`,
      `3. After パート（12-25秒）:`,
      `   - 画面左上に「✅ After」緑ラベル常時表示`,
      `   - 「${data.afterDescription}」をテロップ表示`,
      `   - 上級者プレイ映像（成功シーン）`,
      `   - 歓声・成功効果音`,
      `4. まとめ（25-30秒）:`,
      `   - 「💡 ${data.takeaway}」テロップを中央に大きく表示`,
      `   - 「もっと上達→プロフィールのリンク」CTA`,
      `BGM: ドラマチック系BGM（著作権フリー）、Before→After切替時にBGM転調`,
    ].join("\n"),
  };
}
