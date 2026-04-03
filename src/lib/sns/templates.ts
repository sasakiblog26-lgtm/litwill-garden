/**
 * SNS投稿テンプレート
 *
 * X（Twitter）、TikTok、YouTubeショート向けの投稿テンプレートを管理する。
 */

/** デフォルトハッシュタグセット */
export const defaultHashtags = [
  "#ApexLegends",
  "#Apex",
  "#エーペックス",
  "#Apex初心者",
  "#FPS",
  "#LitwillGarden",
] as const;

/** X投稿テンプレートタイプ */
export type XPostTemplateType = "patch_news" | "meta_analysis" | "quick_tips" | "match_result";

/** X投稿テンプレート */
export type XPostTemplate = {
  type: XPostTemplateType;
  label: string;
  format: string;
  maxLength: number;
};

/** X（Twitter）投稿テンプレート4種 */
export const xPostTemplates: XPostTemplate[] = [
  {
    type: "patch_news",
    label: "パッチノート速報",
    format: `🔔 【パッチノート速報】

{patch_summary}

▼ 詳しい解説はこちら
{article_url}

{hashtags}`,
    maxLength: 280,
  },
  {
    type: "meta_analysis",
    label: "メタ解説",
    format: `📊 【メタ解説】{title}

{meta_description}

▼ 詳細な分析記事
{article_url}

{hashtags}`,
    maxLength: 280,
  },
  {
    type: "quick_tips",
    label: "30秒Tips",
    format: `💡 【30秒Tips】{title}

{tip_content}

これだけで勝率が変わります。

▼ もっと詳しく知りたい方はこちら
{article_url}

{hashtags}`,
    maxLength: 280,
  },
  {
    type: "match_result",
    label: "試合結果",
    format: `🎮 【試合結果報告】

{result_description}

{hashtags}`,
    maxLength: 280,
  },
];

/** 記事公開連動X投稿テンプレート */
export const articlePublishTemplate = `📝 新記事公開！

{title}

{excerpt}

▼ 記事を読む
{article_url}

{hashtags}`;

/** TikTok/YouTubeショート テンプレートタイプ */
export type ShortVideoTemplateType = "clip_tips" | "quick_guide" | "before_after";

/** TikTok/YouTubeショート テンプレート */
export type ShortVideoTemplate = {
  type: ShortVideoTemplateType;
  label: string;
  format: string;
  durationSeconds: number;
  editingNotes: string;
};

/** TikTok/YouTubeショート テンプレート3種 */
export const shortVideoTemplates: ShortVideoTemplate[] = [
  {
    type: "clip_tips",
    label: "切り抜きTips",
    format: `【タイトル】{title}

【フック（0-3秒）】{hook}

【本編（3-25秒）】{main_content}

【CTA（25-30秒）】{cta}`,
    durationSeconds: 30,
    editingNotes:
      "YouTube本編から30秒の要点を切り出し。テロップは大きめのゴシック体、エフェクトはズーム+ハイライト。",
  },
  {
    type: "quick_guide",
    label: "30秒でわかる○○",
    format: `【タイトル】30秒でわかる{topic}

【イントロ（0-3秒）】{intro}

【ステップ解説（3-25秒）】{steps}

【まとめ（25-30秒）】{summary}`,
    durationSeconds: 30,
    editingNotes:
      "テンポよくカットを切り替え。各ステップにナンバリングテロップ。BGMはアップテンポ。",
  },
  {
    type: "before_after",
    label: "Before/After",
    format: `【タイトル】{title}

【Before（0-10秒）】初心者の動き: {before_description}

【After（10-25秒）】改善後の動き: {after_description}

【解説（25-30秒）】{explanation}`,
    durationSeconds: 30,
    editingNotes:
      "画面分割で初心者とプロの動きを比較。矢印やサークルで注目ポイントをハイライト。",
  },
];

/** YouTube動画カテゴリ */
export type YouTubeVideoCategory =
  | "beginner_guide"
  | "character_guide"
  | "vod_review"
  | "patch_analysis";

/** YouTube動画カテゴリ設定 */
export const youtubeCategories: Record<
  YouTubeVideoCategory,
  { label: string; frequency: string; duration: string }
> = {
  beginner_guide: {
    label: "初心者ガイド",
    frequency: "週1本",
    duration: "10〜15分",
  },
  character_guide: {
    label: "キャラ攻略",
    frequency: "週1本",
    duration: "10〜15分",
  },
  vod_review: {
    label: "VODレビュー",
    frequency: "月2本",
    duration: "15〜20分",
  },
  patch_analysis: {
    label: "パッチノート解説",
    frequency: "パッチ配信時",
    duration: "10〜15分",
  },
};

/** YouTube説明欄テンプレート */
export const youtubeDescriptionTemplate = `{video_description}

━━━━━━━━━━━━━━━━━━
📖 関連記事
{related_article_url}

📱 LINE公式で攻略情報を受け取る
{line_url}

📝 noteで有料ガイドを読む
https://note.com/litwill_garden

🎮 Litwill Garden
https://litwill-garden.com

━━━━━━━━━━━━━━━━━━
#ApexLegends #Apex #エーペックス #Apex攻略 #LitwillGarden
`;
