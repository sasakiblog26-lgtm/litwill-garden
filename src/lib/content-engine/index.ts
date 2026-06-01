/**
 * コンテンツエンジン — Apex Legends 攻略記事の自動生成パイプライン
 *
 * このモジュールは以下の機能を提供する:
 *
 * - **generator**: Claude API を使った記事の自動生成
 * - **templates**: 記事構造テンプレートと SEO 対象キーワード
 * - **internal-links**: 本文中のレジェンド名・武器名への内部リンク自動挿入
 * - **cta-inserter**: CTA ブロックの自動挿入
 * - **status**: 記事ステータスのライフサイクル管理
 * - **notifier**: Slack 通知ヘルパー
 *
 * @module content-engine
 */

// Generator -------------------------------------------------------------------
export {
  generateArticle,
  generatePatchArticleDraft,
  slugify,
} from "./generator";
export type {
  ArticleGenerationInput,
  GeneratedArticle,
  SeoMeta,
  PatchData,
} from "./generator";

// Templates -------------------------------------------------------------------
export { articleTemplates, TARGET_KEYWORDS } from "./templates";
export type {
  ArticleTemplate,
  ArticleType,
  TemplateSection,
  CtaPosition,
} from "./templates";

// Internal links --------------------------------------------------------------
export { insertInternalLinks } from "./internal-links";

// CTA inserter ----------------------------------------------------------------
export { insertCtas } from "./cta-inserter";

// Status management -----------------------------------------------------------
export {
  transitionStatus,
  updateArticleStatus,
  scheduleArticle,
  publishScheduledArticles,
} from "./status";
export type { ArticleStatus } from "./status";

// Notifier --------------------------------------------------------------------
export { notifySlack } from "./notifier";
